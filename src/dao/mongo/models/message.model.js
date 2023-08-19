import mongoose from "mongoose";

const messageCollection = "messages"


const messagesSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const messagesModel = mongoose.model(messageCollection, messagesSchema);

export default messagesModel;