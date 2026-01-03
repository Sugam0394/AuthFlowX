 import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ChatBot.css";

function ChatBot() {
  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage (persistent chat)
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [lastUserMessage, setLastUserMessage] = useState("");

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // Save messages in localStorage
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Send message function
  const sendMessage = async (msg = input) => {
    if (!msg.trim()) return;

    const userMessage = { role: "user", content: msg };
    setMessages(prev => [...prev, userMessage]);
    setLastUserMessage(msg);
    if (msg === input) setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post("http://localhost:3000/api/chat", {
        messages: [...messages, userMessage]
      });
      const aiMessage = { role: "ai", content: res.data.reply };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const aiMessage = { role: "ai", content: "Error: AI response failed" };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Quick suggestion buttons
  const quickButtons = [
    "Top AI tools",
    "Student help app",
    "Dietician consultation"
  ];

  return (
     <>
  {/* Floating Toggle Button */}
  <div className="chatbot-toggle" onClick={() => setOpen(!open)}>
    🤖
  </div>

  {/* Chatbot Box */}
  <div className={`chatbot-wrapper ${open ? "open" : ""}`}>
    <div className="chat-header">
      <span>AI-Mart Assistant</span>
      <button onClick={() => setOpen(false)}>✕</button>
    </div>

    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "user-msg" : "ai-msg"}>
            {msg.content}
          </div>
        ))}

        {isTyping && <div className="ai-msg typing">AI is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-buttons">
        {quickButtons.map((btn, i) => (
          <button key={i} onClick={() => sendMessage(btn)}>
            {btn}
          </button>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask AI-Mart…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
        {lastUserMessage && (
          <button className="retry-btn" onClick={() => sendMessage(lastUserMessage)}>
            Retry
          </button>
        )}
      </div>
    </div>
  </div>
</>

  );
}

export default ChatBot;

