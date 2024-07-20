// Import the createApi function and fetchBaseQuery function from Redux Toolkit
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define the API base URI, fetching it from environment variables
// const API_URI = "http://localhost:8800/api"
const API_URI = import.meta.env.VITE_APP_BASE_URL

// Create a base query using fetchBaseQuery with the base URL for the API
const baseQuery = fetchBaseQuery({ baseUrl: API_URI + "/api" })

// Define the API slice using createApi
export const apiSlice = createApi({
    // Set the base query
    baseQuery,
    // Define tag types for caching and invalidation (empty array here as no tags are defined)
    tagTypes: [],
    // Define the endpoints for the API (empty object here as no endpoints are defined)
    endpoints: (builder) => ({}),
})
