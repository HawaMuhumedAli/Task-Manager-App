import { configureStore } from "@reduxjs/toolkit" // Importing the configureStore function from Redux Toolkit
import authReducer from "./slices/authSlice" // Importing the authReducer from the authSlice file
import { apiSlice } from "./slices/apiSlice" // Importing the apiSlice from the apiSlice file

// Configuring the Redux store
const store = configureStore({
    reducer: {
        // Adding the API slice reducer to the store
        [apiSlice.reducerPath]: apiSlice.reducer,
        // Adding the auth reducer to the store
        auth: authReducer,
    },
    // Adding the API slice middleware and any default middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    // Enabling Redux DevTools for debugging
    devTools: true,
})

// Exporting the configured store as the default export
export default store
