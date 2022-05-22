const { Schema, model } = require('mongoose');
const reactionSchema =require('./Reaction');

const thoughtSchema = new Schema (
    {
       thoughtText:{
           type:String,
           required:'write down your thought',
           minlength:1,
           maxlength:280
       },
       username:{
            type:String,
            required:true
        }, 
       createdAt:{
           type:Date,
           default:Date.now,
        //    get: timestamp =>dateFormate(timestamp)
       }
    }
);

const Thought =model ('Thought',thoughtSchema);

module.exports =Thought;
