import React, { useState } from "react";
import { addMessage } from "../Slices/ChatbotSlice";
import { useDispatch, useSelector } from "react-redux";
import { apiKey } from "../constants";

const Chatbot = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState("");
  const chatMessages = useSelector((state) => state.chatbot.messages); // Get messages from Redux store
  const dispatch = useDispatch();

  console.log("Key test:", apiKey);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to Redux store
    const userMessage = { role: "user", message: input };
    dispatch(addMessage(userMessage));

    try {
      // Call OpenAI API for health-related responses
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a health advisor for a hospital management system. Provide helpful and accurate health tips, suggestions, and information. Do not provide medical diagnoses or treatments; always recommend consulting a doctor for serious issues.",
              },
              ...chatMessages.map((msg) => ({
                role: msg.role,
                content: msg.message,
              })),
              { role: "user", message: input },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("API response data:", data); // Log the response to inspect

      // Check if choices exist and are not empty
      if (data?.choices && data.choices.length > 0) {
        const botMessage =
          data.choices[0].message?.content || "No response from bot";
        dispatch(addMessage({ role: "bot", message: botMessage }));
      } else {
        throw new Error("No valid choices in API response");
      }
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      dispatch(
        addMessage({
          role: "bot",
          message:
            "Sorry, I'm unable to respond at the moment. Please try again later.",
        })
      );
    }

    // Clear input
    setInput("");
  };

  return (
    <>
      {/* Chatbot Window */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-40 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 bg-green-600 mt-16 text-white">
            <h2 className="text-xl font-semibold">Health Connect Chat</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {/* Map over chatMessages from Redux store */}
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-100 ml-auto"
                    : "bg-green-100 mr-auto"
                }`}
              >
                {msg.message}
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about health..."
                className="flex-1 p-2 border rounded-l-lg"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} // Send message on Enter key
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-600 text-white px-4 rounded-r-lg hover:bg-green-500"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
