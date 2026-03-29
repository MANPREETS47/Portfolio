import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
  },
  message: {
    type: String,
    required: [true, "Please provide your message"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
