// #### Тип для идентификатора
type Identifier = string | number;

const id1:Identifier = 'aa';
const id2:Identifier = 1;
//@ts-expect-error
const id3:Identifier = 1n;

// #### Тип для доступных операций
const read = Symbol("Read");
const write = Symbol("Write");
const update = Symbol("Update");

type Operations = typeof read | typeof write | typeof update;

const a = (value:Operations) => {
    console.log(value);
}

a(read);
a(update);
// @ts-expect-error
a(Symbol("Update"));

// #### Тип для массива оценок
// Вроде бы был Proposal на range-types в typescript, пока так
type Grades = (1 | 2 | 3 | 4 | 5)[];
type GradeStatus = 'pass' | 'fail';

const checkGrades: (value:Grades) => GradeStatus = (value) => {
    return (value.find((grade) => grade === 1 || grade === 2))
        ? 'fail'
        : 'pass';
}

let result = checkGrades([3, 4]);
console.log(result === 'pass');

//ts-expect-error
console.log(result === 1);

//ts-expect-error
result = checkGrades([2, 5, 6]);


// #### Тип для функции с перегрузкой
type CalculateArea = {
    (radius:number):number;
    (width:number, height:number):number;
    (a:number, b:number, c:number):number;
}

const implementation:CalculateArea = (a, b?, c?) => {
    if (b === undefined && c === undefined) {
        return Math.PI * a * a;
    }

    if (c === undefined) {
        return a * b;
    }

    const p = 1 / 2 * (a + b + c);
    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
}

// #### Тип по строковому шаблону
type Template = `${bigint}${'px' | '%'}`

const abs:Template = '1px';
const rel:Template = '1%';
//ts-expect-error
const wtf:Template = 's12';
