"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"

const NewApplicationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    applicationType: "",
    details: "",
  })
  const [language, setLanguage] = useState("en-IN")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSpeechInput = async (field: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: Blob[] = []

      recorder.ondataavailable = (e) => chunks.push(e.data)
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/wav" })
        const audioBase64 = await blobToBase64(audioBlob)

        const response = await axios.post(
          "https://api.bhashini.gov.in/v1/speech-to-text",
          {
            audio: audioBase64,
            language: language,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_BHASHINI_API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        )

        if (response.data && response.data.text) {
          setFormData((prev) => ({ ...prev, [field]: response.data.text }))
        }
      }

      recorder.start()
      setTimeout(() => recorder.stop(), 5000) // Record for 5 seconds
    } catch (error) {
      console.error("Error during speech recognition:", error)
    }
  }

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post("/api/applications", formData)
      alert("Application submitted successfully!")
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("Failed to submit application. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">New Legal Application</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">
            Select Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="en-IN">English (India)</option>
            <option value="hi-IN">Hindi</option>
            <option value="ta-IN">Tamil</option>
            <option value="te-IN">Telugu</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <div className="flex">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
              type="button"
              onClick={() => handleSpeechInput("name")}
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              🎤
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <div className="flex">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
              type="button"
              onClick={() => handleSpeechInput("address")}
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              🎤
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="applicationType" className="block text-gray-700 text-sm font-bold mb-2">
            Application Type
          </label>
          <select
            id="applicationType"
            name="applicationType"
            value={formData.applicationType}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select application type</option>
            <option value="propertyRegistration">Property Registration</option>
            <option value="marriageCertificate">Marriage Certificate</option>
            <option value="birthCertificate">Birth Certificate</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="details" className="block text-gray-700 text-sm font-bold mb-2">
            Additional Details
          </label>
          <div className="flex">
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            ></textarea>
            <button
              type="button"
              onClick={() => handleSpeechInput("details")}
              className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              🎤
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewApplicationPage

