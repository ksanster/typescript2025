interface GameCharacter {
    name: string;
    move():string;
}

function isGameCharacter(value:unknown): value is GameCharacter {
    return typeof value === 'object' && value !== null  && 'name' in value && 'move' in value;
}

const hero = { name: "Hero", move: () => "Runs forward!" };
const fake = { name: "Dog", bark: () => "Woof!" };

function processCharacter(value:unknown):string {
    if (isGameCharacter(value)) {
        return value.move();
    }

    return 'Not a game character!';
}

console.log(processCharacter(hero));
console.log(processCharacter(fake));
