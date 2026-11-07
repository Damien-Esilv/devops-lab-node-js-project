/**
 * Express app configuration.
 * Responsibilities:
 *  - Base routes (/, /health)
 *  - Auto-mount all routers in src/routes/auto/*.route.js
 *  - Global error handler (consistent JSON for errors)
 */
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { errorHandler } from './utils/errorHandler.js'
import appointmentsRouter from './routes/appointments.route.js'
import metricsRouter from './routes/metrics.route.js'
import doctorsRouter from './routes/doctors.route.js'
import patientsRouter from './routes/patients.route.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)

const app = express()

// 1. Parse JSON request bodies before any route reads req.body
app.use(express.json())

// 2. Simple root + health endpoints
app.get('/', (_req, res) => res.json({ ok: true, message: 'Hello from CI/CD demo 👋' }))
app.get('/health', (_req, res) => res.status(200).send('OK'))

// 3. API routes
app.use('/api/appointments', appointmentsRouter)
app.use('/api/metrics', metricsRouter)
app.use('/api/doctors', doctorsRouter)
app.use('/api/patients', patientsRouter) // <-- Added missing mount for patients

// 4. Auto-mount all routers placed under src/routes/auto
const autoDir = path.join(__dirname, 'routes', 'auto')
if (fs.existsSync(autoDir)) {
  const files = fs.readdirSync(autoDir).filter(f => f.endsWith('.route.js'))
  for (const f of files) {
    const full = path.join(autoDir, f)
    const mod = require(full)
    const router = mod.default || mod
    if (router) app.use('/', router)
  }
}

// 5. Global error middleware last
app.use(errorHandler)

export default app
