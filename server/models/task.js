import mongoose, { Schema } from "mongoose";

// Define the schema for a task
const taskSchema = new Schema(
    {
        // Title of the task, required field
        title: { type: String, required: true },

        // Date of the task, default to the current date
        date: { type: Date, default: new Date() },

        // Priority of the task, with default value and allowed values
        priority: {
            type: String,
            default: "normal",
            enum: ["high", "medium", "normal", "low"],
        },

        // Stage of the task, with default value and allowed values
        stage: {
            type: String,
            default: "todo",
            enum: ["todo", "in progress", "completed"],
        },

        // Array of activities associated with the task
        activities: [
            {
                // Type of activity, with default value and allowed values
                type: {
                    type: String,
                    default: "assigned",
                    enum: [
                        "assigned",
                        "started",
                        "in progress",
                        "bug",
                        "completed",
                        "commented",
                    ],
                },
                // Description of the activity
                activity: String,
                // Date of the activity, default to the current date
                date: { type: Date, default: new Date() },
                // Reference to the user who performed the activity
                by: { type: Schema.Types.ObjectId, ref: "User" },
            },
        ],

        // Array of subtasks associated with the task
        subTasks: [
            {
                // Title of the subtask
                title: String,
                // Date of the subtask
                date: Date,
                // Tag associated with the subtask
                tag: String,
            },
        ],

        // Array of asset strings associated with the task
        assets: [String],

        // Array of users associated with the task
        team: [{ type: Schema.Types.ObjectId, ref: "User" }],

        // Flag to indicate if the task is trashed
        isTrashed: { type: Boolean, default: false },
    },
    { 
        // Automatically add `createdAt` and `updatedAt` timestamps
        timestamps: true 
    }
);

// Create a model for the Task schema
const Task = mongoose.model("Task", taskSchema);

export default Task;
