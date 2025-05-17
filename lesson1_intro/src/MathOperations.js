/**
 * @class
 */
class MathOperations {
    /**
     * Умножает два числа
     *
     * @param {number} a
     * @param {number} b
     * @returns {number}
     *
     * @see метод {@link MathOperations#divide} для деления.
     * @see статический метод {@link MathOperations.square} для возведения в квадрат.
     */
    multiply(a, b) {
        return a * b;
    }

    /**
     * Делит два числа
     * @param {number} a
     * @param {number} b
     * @returns {number}
     */
    divide(a, b) {
        return a / b;
    }

    /**
     * Возводит в квадрат число
     * @param {number} x
     * @returns {number}
     * См метод multiply для умножения.
     */
    static square(x) {
        return x * x;
    }
}
