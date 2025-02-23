"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SpeechRecognition from "./SpeechRecognition"

const FormPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    applicationType: "",
    details: "",
  })
  const [language, setLanguage] = useState("en-IN")
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSpeechResult = (result: string, field: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: result,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        alert("Application submitted successfully!")
        navigate("/dashboard")
      } else {
        throw new Error("Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("Failed to submit application. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">File New Application</h2>
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
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <SpeechRecognition onResult={(result) => handleSpeechResult(result, "name")} language={language} />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <SpeechRecognition onResult={(result) => handleSpeechResult(result, "address")} language={language} />
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
          <textarea
            id="details"
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          ></textarea>
          <SpeechRecognition onResult={(result) => handleSpeechResult(result, "details")} language={language} />
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

export default FormPage

