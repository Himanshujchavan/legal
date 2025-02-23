import express from "express"
import Application from "../models/Application"

const router = express.Router()

// Submit a new application
router.post("/", async (req, res) => {
  try {
    const newApplication = new Application(req.body)
    await newApplication.save()
    res.status(201).json(newApplication)
  } catch (error) {
    res.status(400).json({ message: "Error submitting application", error })
  }
})

// Get all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find()
    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error })
  }
})

// Get a specific application
router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ message: "Application not found" })
    }
    res.json(application)
  } catch (error) {
    res.status(500).json({ message: "Error fetching application", error })
  }
})

export default router

