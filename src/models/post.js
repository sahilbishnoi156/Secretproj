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
    creator: {
      type: ObjectId,
      required: true,
      ref: "User"
    },
    content: {
      type: "String",
      required: true,
    },
    reactions: {
      type: {
        likes: {
          type: Number,
          default: 0
        },
        dislikes: {
          type: Number,
          default: 0
        },
        laughs: {
          type: Number,
          default: 0
        },
      }
    },
    comments: {
      type: [ObjectId],
      ref: "Comments"
    },
    media: {
      type: {
        image: {
          type: "String", // URL or reference to image storage
          optional: true
        },
        video: {
          type: "String", // URL or reference to video storage
          optional: true
        },
      }
    },
  }
  )

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