import type React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

interface PrivateRouteProps {
  children: React.ReactElement
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuth()

  if (!auth?.currentUser) {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute

