/**
 * /api/doctors
 *  - GET  → list all doctors (200)
 *  - POST → add a doctor from { name, specialty } (201), 400 if a field is missing
 * Data lives in memory for this lab (no database yet).
 */
import express from 'express'

const router = express.Router()

const doctors = [
  { id: 1, name: 'Dr. Sarah Lee', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Amir Khan', specialty: 'Pediatrics' }
]

const isFilled = (value) => typeof value === 'string' && value.trim() !== ''

router.get('/', (_req, res) => res.status(200).json(doctors))

router.post('/', (req, res) => {
  const { name, specialty } = req.body ?? {}
  if (!isFilled(name) || !isFilled(specialty)) {
    return res.status(400).json({ error: 'Missing required fields: name and specialty' })
  }
  const nextId = doctors.reduce((max, d) => Math.max(max, d.id), 0) + 1
  const newDoctor = { id: nextId, name: name.trim(), specialty: specialty.trim() }
  doctors.push(newDoctor)
  res.status(201).json(newDoctor)
})

export default router
