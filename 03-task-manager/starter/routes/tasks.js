const express = require('express')
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controller/tasks')

const router = express.Router()

router.get('/', getAllTasks)
router.post('/', createTask)
router.get('/:id', getTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router
//eovendors.com
//eovendor.com
//vendorseye.com
//rpgvendor.com
//vendorip.com
//ggvendor.com
//zana.gg
