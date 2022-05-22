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
           get: timestamp =>dateFormate(timestamp)
       },
       reactions:[reactionSchema]
    },
    {
        toJSON:{
            get:true
        },
        id:false
    }
);

thoughtSchema.virtual('reactionCount').get(()=>{
    return this.reactions.length;
});

const Thought =model ('Thought',thoughtSchema);

module.exports =Thought;
