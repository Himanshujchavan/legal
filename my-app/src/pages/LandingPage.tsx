import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Legal AI Platform</h1>
      <p className="text-xl mb-8">
        Streamline your legal processes with our AI-powered platform. Access legal assistance, track cases, and explore
        our knowledge base.
      </p>
      <Link
        to="/new-application"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Start New Application
      </Link>
    </div>
  )
}

export default LandingPage

