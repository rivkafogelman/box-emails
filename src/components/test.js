// #2
import React, { useEffect, useState } from 'react'
export default function Groups(props) {
    const { element, text } = props;
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        if (window.location.pathname.includes('/admin')) {
            setAdmin(true)
        }
        else {
            makeElement();
        }
    })
    const makeElement = () => {
        let elem = document.createElement(element);
        elem.innerText = text;
        document.getElementById('app').appendChild(elem)
    }
    return (
        <div id='app'>
            {admin &&
                <input type='text' value={text} />
            }
        </div>
    )

}


// #4
// #1
const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    endDate: { type: Date },
})

module.exports = mongoose.model('Tasks', taskSchema)
const userSchema = new mongoose.Schema({
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks'
    }],
    name: { type: String },
})
module.exports = mongoose.model('Users', userSchema)

module.exports = {
    // #2
    createTask: async (req, res) => {
        try {
            const newTask = await new taskSchema(req.body.task);
            const user = await userSchema.findById(req.body.userId);
            await newTask.save();
            await user.tasks.push(newTask._id);
            res.status(200).send({ user });
        } catch (error) {
            res.status(500).send({ error });
        }
    },
    // #3
    getTasksById: async (req, res) => {
        try {
            const user = await userSchema.findById(req.body.userId).populate('tasks');
            res.status(200).send({ user });
        } catch (error) {
            res.status(500).send({ error });
        }
    },
// #4
    deleteUser: async (req, res) => {
        try {
            const user = await userSchema.findByIdAndDelete(req.body.userId);
            res.status(200).send('success');
        } catch (error) {
            res.status(500).send({ error });
        }
    }
}
// #1
const Schema = new mongoose.Schema({
    name: { type: String, minLength: 10 },
    id: { unique: true },
    bool: { type: Boolean, default: true },
})
