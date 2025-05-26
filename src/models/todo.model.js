import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    id: {
      type: String,
      unique: true,
    },
    task: {
      type: String,
      unique: true,
    },
  },

  {
    timestamps: true,
  }
);

export const Todo = mongoose.model("Todo", todoSchema);
