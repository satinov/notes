import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    originalNote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
    cover: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

noteSchema.methods.saveAndPopulate = function (doc) {
  return doc.save().then((doc) => doc.populate("user").execPopulate());
};

const Note = mongoose.model("Note", noteSchema);

export default Note;
