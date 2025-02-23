import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Legal Filing Assistant</h1>
      <p className="text-xl mb-8">
        File legal applications easily using our AI-powered speech recognition system. Supports multiple Indian
        languages and provides real-time legal guidance.
      </p>
      <Link
        to="/form"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Start New Application
      </Link>
    </div>
  )
}

export default LandingPage

