"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

interface Message {
  id: string
  text: string
  isUser: boolean
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    setMessages([{ id: "1", text: "Hello! I'm your AI legal assistant. How can I help you today?", isUser: false }])
  }, [])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { id: Date.now().toString(), text: input, isUser: true }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      const response = await axios.post("/api/chatbot", { message: input })
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: response.data.message, isUser: false }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message to chatbot:", error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">AI Legal Assistant</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="h-96 overflow-y-auto p-4">
          {messages.map((message) => (
            <div key={message.id} className={`mb-4 ${message.isUser ? "text-right" : "text-left"}`}>
              <span
                className={`inline-block p-2 rounded-lg ${message.isUser ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow mr-2 p-2 border rounded"
              placeholder="Type your message..."
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatbotPage

