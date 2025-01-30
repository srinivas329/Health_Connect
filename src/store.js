import { configureStore } from "@reduxjs/toolkit";
import chatbotReducer from "./Slices/ChatbotSlice";

const store = configureStore({
  reducer: {
    chatbot: chatbotReducer, // Add your slice reducer here
  },
});

export default store;
