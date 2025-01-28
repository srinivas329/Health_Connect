import React, { useState } from "react";

const Chatbot = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    try {
      // Call OpenAI API
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [...messages, { role: "user", content: input }],
          }),
        }
      );

      const data = await response.json();
      const botMessage = data.choices[0].message.content;

      // Add bot response to chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botMessage },
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
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
          <div className="p-4 bg-green-600 text-white">
            <h2 className="text-xl font-semibold">Health Connect Chat</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-lg ${
                  msg.role === "user" ? "bg-blue-100 ml-auto" : "bg-green-100"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 p-2 border rounded-l-lg"
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
