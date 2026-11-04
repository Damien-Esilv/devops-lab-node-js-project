import express from 'express'

const router = express.Router()

/**
 * GET /api/metrics
 * Returns system and hospital statistics.
 */
router.get('/', (_req, res) => {
  const stats = {
    hospital: {
      name: 'Central Hospital',
      totalBeds: 150,
      occupiedBeds: 108,
      availableBeds: 42,
      activeDoctors: 12,
      registeredPatients: 45
    },
    system: {
      status: 'healthy',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    }
  }

  res.status(200).json(stats)
})

export default router
