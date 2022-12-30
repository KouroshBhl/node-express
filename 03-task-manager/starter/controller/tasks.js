const Task = require('../models/task');

const getAllTasks = (req, res) => {
  res.send('Get all tasks');
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    console.log('Something went wrong!');
    res.status(500).json({ success: false, message: 'something went wrong' });
  }
};
const getTask = (req, res) => {
  const { id } = req.params;
  res.send(`Get single task id: ${id}`);
};
const updateTask = (req, res) => {
  res.send('Update task');
};
const deleteTask = (req, res) => {
  res.send('Delete task');
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
