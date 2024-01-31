import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema.Types;

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

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
