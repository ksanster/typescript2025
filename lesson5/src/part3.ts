interface Shape {
    type: 'circle' | 'rectangle';
    area: () => number;
}

interface Circle extends Shape {
    type: 'circle';
    radius: number;
}

interface Rectangle extends Shape {
    type: 'rectangle';
    width: number;
    height: number;
}

type CircleType = Exclude<Shape['type'], 'rectangle'>;
type RectangleType = Exclude<Shape['type'], 'circle'>;

const a: CircleType = 'circle';

const myShape = {
    type: 'rectangle',
    area: () => 42
} satisfies Shape;

const myCircle = {
    type: a,
    area: () => Math.PI * 5 * 5,
    radius: 5
} satisfies Circle;

console.log(myCircle.radius);

const myRectangle = {
    type: 'rectangle',
    area: () => 1 * 1,
    width: 1,
    height: 1
} satisfies Rectangle;

console.log(myRectangle.width);
// @ts-expect-error
console.log(myRectangle.radius);


const shape:Shape = myShape; // myShape удовлетворяет контрактам, заданным типом Shape

// @ts-ignore Only for test!
const circle:Circle = myShape as Circle; // Напрямую не кастится - tsc выдает ошибку
console.log(circle); // Если отключить проверку компилятора. то можем получить undefined
// @ts-except-error
console.log(circle.radius.toFixed()); //и exception при обращении к свойству в runtime

function isCircle(value:Shape): value is Circle {
    return value.type === 'circle';
}

if (isCircle(myShape)) {
    console.log(circle.radius.toFixed()); // Не выполнится
}

const unsafeCircle = myShape as any as Circle; //Нет ошибки компилятора
console.log(unsafeCircle.radius.toFixed()); // Тем не менее в runtime падает со страшным грохотом



