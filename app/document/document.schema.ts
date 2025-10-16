import mongoose from "mongoose";
import { IDocument, IFolder } from "./document.dto";

const folderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    folderName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Document Schema
const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
      ref: "user",
    },
    uri: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "folder",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FolderSchema = mongoose.model<IFolder>("folder", folderSchema);
export default mongoose.model<IDocument>("document", documentSchema);
