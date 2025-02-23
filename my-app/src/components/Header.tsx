import type React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Header: React.FC = () => {
  const auth = useAuth()

  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Legal AI Platform
        </Link>
        <ul className="flex space-x-4">
          {auth?.currentUser ? (
            <>
              <li>
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/new-application" className="hover:underline">
                  New Application
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="hover:underline">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/case-tracking" className="hover:underline">
                  Case Tracking
                </Link>
              </li>
              <li>
                <Link to="/knowledge-base" className="hover:underline">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <button onClick={auth.logout} className="hover:underline">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header

