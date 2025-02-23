import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import NewApplicationPage from "./pages/NewApplicationPage"
import ChatbotPage from "./pages/ChatbotPage"
import CaseTrackingPage from "./pages/CaseTrackingPage"
import KnowledgeBasePage from "./pages/KnowledgeBasePage"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/new-application"
                element={
                  <PrivateRoute>
                    <NewApplicationPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/chatbot"
                element={
                  <PrivateRoute>
                    <ChatbotPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/case-tracking"
                element={
                  <PrivateRoute>
                    <CaseTrackingPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/knowledge-base"
                element={
                  <PrivateRoute>
                    <KnowledgeBasePage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

