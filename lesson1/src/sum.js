/**
 * @typedef {(Number|String|BigInt)} NumberLike
 */

/**
 * Возвращает сумму двух значений одного и того же типа
 *
 * @param {NumberLike} a
 * @param {NumberLike} b
 * @returns {NumberLike}
 *
 * @description
 * Принимает два аргумента строго одного типа из множества: number, bigint или string,
 * возвращает результат сложения (конкатенации для строк).
 *
 * @example
 * console.log(sum(40, 2));
 * // → 42
 *
 */
function sum(a, b) {
    return a + b;
}
