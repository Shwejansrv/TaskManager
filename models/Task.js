const  mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required : [true,'name must be provided'],
        trim:true,
        maxlength:[20,'name cannot br more than 20 characters'],
    },
    completed:{
        type:Boolean,
        default:false
    }
});

const Task = mongoose.model('Task',TaskSchema);
module.exports = Task