const Task = require("../models/Task");
const { DEFAULT_TASK_STATUS } = require("../config/constants");

module.exports = {
  // Получить список всех задач
  getAllTasks(req, res) {
    res.json(Task.getAll());
  },

  // Получить задачу по ID
  getTaskById(req, res) {
    const task = Task.getById(Number(req.params.id));

    if (!task) {
      return res.status(404).json({ error: "Задача не найдена" });
    }

    res.json(task);
  },

  // Создать новую задачу
  createTask(req, res) {
    const newTask = Task.create({
      title: req.body.title,
      completed: req.body.completed || DEFAULT_TASK_STATUS,
    });

    res.status(201).json(newTask);
  },

  // Обновить существующую задачу
  updateTask(req, res) {
    const updatedTask = Task.update(Number(req.params.id), req.body);

    if (!updatedTask) {
      return res.status(404).json({ error: "Задача не найдена" });
    }

    res.json(updatedTask);
  },

  // Удалить задачу
  deleteTask(req, res) {
    const isDeleted = Task.delete(Number(req.params.id));

    if (!isDeleted) {
      return res.status(404).json({ error: "Задача не найдена" });
    }

    res.status(204).send();
  },
  getTasksByUser(req, res) {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({ error: "userId обязателен" });
    }

    const tasks = Task.fetchByUserId(userId);

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ error: "Задачи для этого пользователя не найдены" });
    }

    res.json(tasks);
  },
  deleteTasksByUserId(req, res) {
    const userId = Number(req.params.userId);

    if (!userId) {
      return res.status(400).json({ error: "userId обязателен" });
    }

    const tasksRemoved = Task.deleteAllByUserId(userId);

    if (!tasksRemoved) {
      return res.status(404).json({ error: "Задачи пользователя не найдены" });
    }

    res.sendStatus(204);
  }
};
