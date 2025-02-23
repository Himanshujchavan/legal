"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"

const KnowledgeBasePage: React.FC = () => {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/knowledge-base", { query })
      setResult(response.data.result)
    } catch (error) {
      console.error("Error searching knowledge base:", error)
      setResult("An error occurred while searching. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Legal Knowledge Base</h2>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow mr-2 p-2 border rounded"
            placeholder="Search legal terms or concepts..."
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>
      </form>
      {result && (
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-xl font-bold mb-2">Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  )
}

export default KnowledgeBasePage

