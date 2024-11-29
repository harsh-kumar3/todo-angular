const Todo = require('../models/Todo')


module.exports.home = function (req, res) {
    Todo.find({}, function (err, tasks) {
        if (err) {
            console.log("Error in fetching the tasks from db");
            return;
        }
        console.log(tasks)
        return res.json({tasks})
        // return res.render('index', {
        //     title: "To do",
        //     tasks
        // })
    })
};

module.exports.isCompleted = async function (req, res) {
    let task = await Todo.findById(req.params.id);
    if (!task) { return res.status(404).send("Task Not Found") }
    return res.status(200).json({
        isComplete: task.isCompleted
    })
}

module.exports.toggleStatus = async function (req, res) {
    try {
        let task = await Todo.findById(req.params.id);
        if (!task) { return res.status(404).send("Task Not Found") }
        task.isCompleted = !task.isCompleted;
        await task.save();
        return res.json({ task });
    } catch (err) {
        return res.status(500).send("Internal Server Error");
   }
}

module.exports.createTask =async (req, res) => {
    try {
        const task = await Todo.create({
            description: req.body.description,
            category: req.body.category,
            user: req.user.id,
            dueDate : req.body.dueDate
        })
        return res.json({ task })
    } catch (err) {
        console.log("Error : ", err);
        return res.redirect('back');
    }
}

module.exports.deleteTask = (req, res) => {
    console.log("Request Query : ", req.query);
    let id = req.query.id;
    console.log("ID : ", id);
    // newid = id.split(',');
    // console.log("new ID : ", newid);
    // for (let i = 0; i < newid.length; i++) { // looping over newid  to delete all the checked value
        Todo.findByIdAndDelete(id, function (err) {
            if (err) {
                console.log('error : ', err)
                return;
            }
        })
    // }
    return res.json(200,{message : `Task having ${id} is deleted`});
}


module.exports.updateTask =async (req, res) => {
    try {
        const { edescription, ecategory, edueDate } = req.body;
        const newTask = {}
        if (edescription) { newTask.edescription = edescription };
        if (ecategory) { newTask.ecategory = ecategory };
        if (edueDate) { newTask.edueDate = edueDate };

        // Find the task to be updated and update it
        let task = await Todo.findById(req.params.id);
        if (!task) { return res.status(404).send("Not Found") }
        
        task = await Todo.findByIdAndUpdate(req.params.id, { $set: { description: newTask.edescription, category: newTask.ecategory, dueDate: newTask.edueDate } }, { new: true });
        console.log(task);
        return res.json({ task });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ "Internal Server Error": err });
    }
}