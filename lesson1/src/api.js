/**
 * @typedef {Object} RequestParams
 * @property {Object.<String, String>} [headers] - Опциональный словарь строковых значений
 * @property {(String | Object | ArrayBuffer)} [body] - Опциональное тело запроса: строка, JSON-like объект или ArrayBuffer
 * @property {('json' | 'text' | 'document' | 'buffer')} [contentType] - Опциональная строка с одним из заданных значений: json, text, document, buffer
 */

/**
 * @type {RequestParams}
 */
const defaultConfig = {
    headers: {Authorization: 'myToken'}
};

/**
 * Объект, возвращаемый сервером
 * @typedef {Object} Response
 * @property {Promise<Object>} json
 * @property {Promise<String>} text
 * @property {Promise<Document>} document
 * @property {Promise<ArrayBuffer>} arrayBuffer
 */

/**
 * Делает post-запрос по адресу, заданному аргументом url с параметрами params
 * @param {String} url
 * @param {RequestParams} params
 * @return {Response}
 */
function post(url, params) {}

/**
 * Делает put-запрос по адресу, заданному аргументом url с параметрами params
 * @param {String} url
 * @param {RequestParams} params
 * @return {Response}
 */
function put(url, params) {}
