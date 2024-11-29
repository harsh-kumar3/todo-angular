const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const User = require('../models/User')
const homeController = require("../controller/homeController");
const Todo = require('../models/Todo')


router.get('/', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        let tasks = await Todo.find({ user: userId }).sort('-createAt').populate({
            path : 'user'
        });
        return res.json({ tasks })
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.post('/createtask', fetchuser, homeController.createTask)
router.post('/deletetask', fetchuser, homeController.deleteTask)
router.put('/updatetask/:id', fetchuser, homeController.updateTask)
router.get('/isComplete/:id',fetchuser,homeController.isCompleted)
router.put('/isComplete/:id',fetchuser,homeController.toggleStatus)

module.exports = router;
