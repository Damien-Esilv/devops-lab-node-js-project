import { Router } from 'express'

const router = Router()
const appointments = []

router.get('/', (_req, res) => {
  res.status(200).json(appointments)
})

router.post('/', (req, res) => {
  const { doctor, patient, date } = req.body || {}

  if (![doctor, patient, date].every(value => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Doctor, patient and date are required strings' })
  }

  const appointment = {
    id: appointments.length + 1,
    doctor: doctor.trim(),
    patient: patient.trim(),
    date: date.trim()
  }
  appointments.push(appointment)
  res.status(201).json(appointment)
})

export default router
