import Feedback from "../models/feedback.model.js";

export const createFeedback = async (req, res) => {
    try {
        const { rating, message, userId } = req.body;

        if (!rating || !message) {
            return res.status(400).json({ error: "Rating and message are required" });
        }

        const feedback = new Feedback({
            rating,
            message,
            userId
        });

        await feedback.save();

        res.status(201).json({ message: "Feedback submitted successfully", feedback });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
