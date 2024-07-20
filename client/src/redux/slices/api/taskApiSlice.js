// Import the apiSlice created using Redux Toolkit
import { apiSlice } from "../apiSlice"

// Define the base URL for task-related API endpoints
const TASKS_URL = "/task"

// Inject task-related endpoints into the apiSlice
export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Define the query for getting dashboard statistics
        getDashboardStats: builder.query({
            query: () => ({
                // Set the URL for the dashboard stats endpoint
                url: `${TASKS_URL}/dashboard`,
                // Set the HTTP method to GET
                method: "GET",
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the query for getting all tasks
        getAllTask: builder.query({
            query: ({ strQuery, isTrashed, search }) => ({
                // Set the URL with query parameters for filtering tasks
                url: `${TASKS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
                // Set the HTTP method to GET
                method: "GET",
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the mutation for creating a new task
        createTask: builder.mutation({
            query: (data) => ({
                // Set the URL for the create task endpoint
                url: `${TASKS_URL}/create`,
                // Set the HTTP method to POST
                method: "POST",
                // Set the request body to the provided data
                body: data,
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the mutation for duplicating a task
        duplicateTask: builder.mutation({
            query: (id) => ({
                // Set the URL for the duplicate task endpoint with the task ID
                url: `${TASKS_URL}/duplicate/${id}`,
                // Set the HTTP method to POST
                method: "POST",
                // Set an empty request body
                body: {},
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the mutation for updating a task
        updateTask: builder.mutation({
            query: (data) => ({
                // Set the URL for the update task endpoint with the task ID
                url: `${TASKS_URL}/update/${data._id}`,
                // Set the HTTP method to PUT
                method: "PUT",
                // Set the request body to the provided data
                body: data,
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the mutation for trashing a task
        trashTask: builder.mutation({
            query: ({ id }) => ({
                // Set the URL for the trash task endpoint with the task ID
                url: `${TASKS_URL}/${id}`,
                // Set the HTTP method to PUT
                method: "PUT",
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the mutation for creating a subtask
        createSubTask: builder.mutation({
            query: ({ data, id }) => ({
                // Set the URL for the create subtask endpoint with the task ID
                url: `${TASKS_URL}/create-subtask/${id}`,
                // Set the HTTP method to PUT
                method: "PUT",
                // Set the request body to the provided data
                body: data,
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the query for getting a single task by ID
        getSingleTask: builder.query({
            query: (id) => ({
                // Set the URL for the get single task endpoint with the task ID
                url: `${TASKS_URL}/${id}`,
                // Set the HTTP method to GET
                method: "GET",
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the mutation for posting a task activity
        postTaskActivity: builder.mutation({
            query: ({ data, id }) => ({
                // Set the URL for the post task activity endpoint with the task ID
                url: `${TASKS_URL}/activity/${id}`,
                // Set the HTTP method to POST
                method: "POST",
                // Set the request body to the provided data
                body: data,
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the mutation for deleting or restoring a task
        deleteRestoreTask: builder.mutation({
            query: ({ id, actionType }) => ({
                // Set the URL for the delete/restore task endpoint with the task ID and action type
                url: `${TASKS_URL}/delete-restore/${id}?actionType=${actionType}`,
                // Set the HTTP method to DELETE
                method: "DELETE",
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),
    }),
})

// Export hooks for the defined queries and mutations
export const {
    useGetDashboardStatsQuery,
    useGetAllTaskQuery,
    useCreateTaskMutation,
    useDuplicateTaskMutation,
    useUpdateTaskMutation,
    useTrashTaskMutation,
    useCreateSubTaskMutation,
    useGetSingleTaskQuery,
    usePostTaskActivityMutation,
    useDeleteRestoreTaskMutation,
} = taskApiSlice
