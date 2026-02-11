import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // Or 'User' if you have a generic user model, but based on file structure likely Patient
        required: false // Allow anonymous feedback for now or if user not logged in context isn't passed yet
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Feedback", feedbackSchema);
