// src/routes/patients.route.js
import express from 'express'
const router = express.Router()
const patients = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'John', age: 45 }
]
// GET all patients
router.get('/', (req, res) => res.json(patients))
// POST new patient
router.post('/', (req, res) => {
  const { name, age } = req.body
  if (!name || !age) { return res.status(400).json({ error: 'Missing fields' }) }
  const newPatient = { id: patients.length + 1, name, age }
  patients.push(newPatient)
  res.status(201).json(newPatient)
})
export default router
