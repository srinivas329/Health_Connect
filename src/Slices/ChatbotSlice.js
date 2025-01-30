import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [], // Stores chat messages as objects
  isLoading: false, // Indicates if the bot is processing a response
  error: null, // Stores any errors
};

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    // Action to add a user or bot message
    addMessage: (state, action) => {
      const { role, message } = action.payload;
      const newMessage = {
        role, // 'user' or 'bot'
        time: new Date().toISOString(), // Add a timestamp
        message, // The message text
      };
      state.messages.push(newMessage);
    },
    // Action to set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // Action to handle errors
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Action to reset the chat
    resetChat: (state) => {
      state.messages = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

// Export the actions
export const { addMessage, setLoading, setError, resetChat } =
  chatbotSlice.actions;

// Export the reducer
export default chatbotSlice.reducer;
