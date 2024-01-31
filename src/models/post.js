import mongoose from "mongoose"

mongoose.connect('')

const userSigninSchema = new mongoose.Schema({
    username : {
        type  : String,
        required : true,
        unique : true,
        trim: true,
        lowercase: true,
        min: [3 , "username too short"],
        max: [30 , "username to long"]

    },
    password: {
        type: String,
        required: true,
        min: [6, "passowrd too short"],
    },

})


const PostSchema = new mongoose.Schema({
    userid  : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },
    post : {
        postText : String,
        img: { data: Buffer, contentType: String },
    }
})

const commentSchema = new mongoose.Schema({
    postid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true, 
    },

    comment : {
        type : Array
    }
})


export const User = mongoose.model('User', userSigninSchema);
export const Post = mongoose.model('Post', PostSchema);
export const Comment = mongoose.model('Comment', commentSchema);