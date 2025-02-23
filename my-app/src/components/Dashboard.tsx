"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

interface Application {
  _id: string
  name: string
  applicationType: string
  status: string
  createdAt: string
}

const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/applications")
        if (response.ok) {
          const data = await response.json()
          setApplications(data)
        } else {
          throw new Error("Failed to fetch applications")
        }
      } catch (error) {
        console.error("Error fetching applications:", error)
      }
    }

    fetchApplications()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Your Applications</h2>
      <Link to="/form" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
        New Application
      </Link>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="px-6 py-4 whitespace-nowrap">{app.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{app.applicationType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(app.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard

