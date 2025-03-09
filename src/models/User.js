let users = require("../../data/usersData");

let lastId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;

/**
 * Возвращает список всех пользователей
 * @returns {Array} Массив объектов пользователей
 */
function fetchAll() {
    return users;
}

/**
 * Ищет пользователя по его ID
 * @param {number} id - Уникальный идентификатор пользователя
 * @returns {Object|null} Объект пользователя или null, если не найден
 */
function findById(id) {
    return users.find(user => user.id === id) || null;
}

/**
 * Добавляет нового пользователя
 * @param {Object} userData - Данные нового пользователя
 * @returns {Object} Созданный объект пользователя
 */
function add(userData) {
    const newUser = {
        id: ++lastId,
        fullName: userData.fullName,
        job: userData.job,
        age: userData.age,
        city: userData.city,
    };
    users.push(newUser);
    return newUser;
}

/**
 * Обновляет данные существующего пользователя
 * @param {number} id - Идентификатор обновляемого пользователя
 * @param {Object} newData - Обновленные данные
 * @returns {Object|null} Обновленный объект пользователя или null, если пользователь не найден
 */
function modify(id, newData) {
    const user = findById(id);
    if (!user) return null;

    Object.assign(user, newData);
    return user;
}

/**
 * Удаляет пользователя по его ID
 * @param {number} id - Уникальный идентификатор пользователя
 * @returns {boolean} true, если пользователь удален, иначе false
 */
function remove(id) {
    const initialSize = users.length;
    users = users.filter(user => user.id !== id);
    return users.length !== initialSize;
}

module.exports = {
    fetchAll,
    findById,
    add,
    modify,
    remove,
};