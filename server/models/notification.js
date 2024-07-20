import mongoose, { Schema } from "mongoose";

// Define the schema for a notification
const noticeSchema = new Schema(
    {
        // Array of user references indicating the team members associated with the notice
        team: [{ type: Schema.Types.ObjectId, ref: "User" }],

        // The notification text
        text: { type: String },

        // Reference to the related task
        task: { type: Schema.Types.ObjectId, ref: "Task" },

        // Type of the notification, with a default value of "alert" and allowed values of "alert" and "message"
        notiType: {
            type: String,
            default: "alert",
            enum: ["alert", "message"],
        },

        // Array of user references indicating which users have read the notice
        isRead: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    { 
        // Automatically add `createdAt` and `updatedAt` timestamps
        timestamps: true 
    }
);

// Create a model for the Notice schema
const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
