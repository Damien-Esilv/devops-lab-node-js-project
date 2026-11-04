import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('Metrics API', () => {
  it('GET /api/metrics should return 200 and hospital/system statistics', async () => {
    const res = await request(app).get('/api/metrics')

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('hospital')
    expect(res.body).toHaveProperty('system')

    // Hospital stats assertions
    expect(res.body.hospital.name).toBe('Central Hospital')
    expect(typeof res.body.hospital.totalBeds).toBe('number')
    expect(typeof res.body.hospital.occupiedBeds).toBe('number')
    expect(typeof res.body.hospital.availableBeds).toBe('number')
    expect(res.body.hospital.availableBeds).toBe(
      res.body.hospital.totalBeds - res.body.hospital.occupiedBeds
    )
    expect(typeof res.body.hospital.activeDoctors).toBe('number')
    expect(typeof res.body.hospital.registeredPatients).toBe('number')

    // System stats assertions
    expect(res.body.system.status).toBe('healthy')
    expect(typeof res.body.system.uptime).toBe('number')
    expect(res.body.system.uptime).toBeGreaterThanOrEqual(0)
    expect(typeof res.body.system.timestamp).toBe('string')
  })
})
