"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

interface Case {
  id: string
  type: string
  status: string
  createdAt: string
  predictedResolutionDate: string
}

const CaseTrackingPage: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([])

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get("/api/cases")
        setCases(response.data)
      } catch (error) {
        console.error("Error fetching cases:", error)
      }
    }

    fetchCases()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Case Tracking</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Filed Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Predicted Resolution
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cases.map((case_) => (
              <tr key={case_.id}>
                <td className="px-6 py-4 whitespace-nowrap">{case_.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      case_.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {case_.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(case_.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(case_.predictedResolutionDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CaseTrackingPage

