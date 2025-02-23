"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"

interface SpeechRecognitionProps {
  onResult: (result: string) => void
  language: string
}

const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({ onResult, language }) => {
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startListening = async () => {
    setIsListening(true)
    setError(null)

    try {
      // This is a placeholder URL. Replace with the actual BHASHINI API endpoint
      const response = await axios.post(
        "https://api.bhashini.gov.in/v1/speech-to-text",
        {
          audio: "base64_encoded_audio_data", // You'll need to capture audio and encode it
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
        onResult(response.data.text)
      } else {
        setError("No speech recognized")
      }
    } catch (error) {
      console.error("Speech recognition error:", error)
      setError("Error during speech recognition")
    } finally {
      setIsListening(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={startListening}
        disabled={isListening}
        className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isListening ? "Listening..." : "Start Speech Input"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}

export default SpeechRecognition

