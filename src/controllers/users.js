const User = require('../models/User');
const Task = require('../models/Task');

function getAllUsers(req, res) {
    res.json(User.fetchAll());
}

function getUserById(req, res) {
    const user = User.findById(Number(req.params.id));
    if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(user);
}

function createUser(req, res) {
    const { fullName, job, age, city } = req.body;
    if (!fullName || !job || !age || !city) {
        return res.status(400).json({ error: "Все поля обязательны" });
    }

    const newUser = User.add({ fullName, job, age, city });
    res.status(201).json(newUser);
}

function updateUser(req, res) {
    const updatedUser = User.modify(Number(req.params.id), req.body);
    if (!updatedUser) {
        return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(updatedUser);
}

function deleteUser(req, res) {
    const userId = Number(req.params.id);

    const tasksDeleted = Task.deleteAllByUserId(userId);
    if (!tasksDeleted) {
        return res.status(404).json({ error: "Задачи пользователя не найдены" });
    }

    const success = User.remove(userId);
    if (!success) {
        return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json({ message: "Пользователь и все его задачи удалены" });
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
