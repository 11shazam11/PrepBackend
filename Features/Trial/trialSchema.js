import mongoose from "mongoose";

// Define the schema for tracking user trial usage
const trialSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true, // Each user should have a unique ID
    },
    operations: {
      type: Number,
      default: 0, // Start with 0 operations
    },
    createdAt: {
      type: Date,
      default: Date.now, // Timestamp for when the user started the trial
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model based on the schema
const Trial = mongoose.model("Trial", trialSchema);

export default Trial;
