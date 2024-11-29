const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Todo = mongoose.model("TodoList", TodoSchema);
module.exports = Todo;