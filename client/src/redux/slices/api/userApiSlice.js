// Import the apiSlice created using Redux Toolkit
import { apiSlice } from "../apiSlice"

// Define the base URL for user-related API endpoints
const USER_URL = "/user"

console.log("USER_URL", USER_URL);

// Inject user-related endpoints into the apiSlice
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Define the mutation for updating a user profile
        updateUser: builder.mutation({
            query: (data) => ({
                // Set the URL for the update profile endpoint
                url: `${USER_URL}/profile`,
                // Set the HTTP method to PUT
                method: "PUT",
                // Set the request body to the provided data
                body: data,
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the query for getting the team list
        getTeamList: builder.query({
            query: () => ({
                // Set the URL for the get team list endpoint
                url: `${USER_URL}/get-team`,
                // Set the HTTP method to GET
                method: "GET",
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the mutation for deleting a user
        deleteUser: builder.mutation({
            query: (id) => ({
                // Set the URL for the delete user endpoint with the user ID
                url: `${USER_URL}/${id}`,
                // Set the HTTP method to DELETE
                method: "DELETE",
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the mutation for performing a user action
        userAction: builder.mutation({
            query: (data) => ({
                // Set the URL for the user action endpoint with the user ID
                url: `${USER_URL}/${data.id}`,
                // Set the HTTP method to PUT
                method: "PUT",
                // Set the request body to the provided data
                body: data,
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the query for getting notifications
        getNotifications: builder.query({
            query: () => ({
                // Set the URL for the get notifications endpoint
                url: `${USER_URL}/notifications`,
                // Set the HTTP method to GET
                method: "GET",
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the mutation for marking a notification as read
        markNotiAsRead: builder.mutation({
            query: (data) => ({
                // Set the URL for the mark notification as read endpoint with query parameters
                url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
                // Set the HTTP method to PUT
                method: "PUT",
                // Set the request body to the provided data
                body: data,
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),

        // Define the mutation for changing the user password
        changePassword: builder.mutation({
            query: (data) => ({
                // Set the URL for the change password endpoint
                url: `${USER_URL}/change-password`,
                // Set the HTTP method to PUT
                method: "PUT",
                // Set the request body to the provided data
                body: data,
                // Include credentials (such as cookies) in the request
                credentials: "include",
            }),
        }),
    }),
})

// Export hooks for the defined queries and mutations
export const {
    useUpdateUserMutation,
    useGetTeamListQuery,
    useDeleteUserMutation,
    useUserActionMutation,
    useGetNotificationsQuery,
    useMarkNotiAsReadMutation,
    useChangePasswordMutation,
} = userApiSlice
