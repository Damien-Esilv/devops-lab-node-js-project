import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/app.js'

describe('Appointments API', () => {
  const appointment = { doctor: 'Dr. Lee', patient: 'Alice', date: '2026-11-15' }

  it('GET /api/appointments returns an array', async () => {
    const res = await request(app).get('/api/appointments')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST schedules appointments with unique IDs and stores them', async () => {
    const first = await request(app).post('/api/appointments').send(appointment)
    const second = await request(app).post('/api/appointments').send(appointment)
    expect(first.status).toBe(201)
    expect(first.body).toEqual({ id: expect.any(Number), ...appointment })
    expect(second.status).toBe(201)
    expect(second.body.id).toBe(first.body.id + 1)
    const list = await request(app).get('/api/appointments')
    expect(list.body).toEqual(expect.arrayContaining([first.body, second.body]))
  })

  it('trims required fields and ignores extra fields', async () => {
    const res = await request(app).post('/api/appointments').send({
      doctor: ' Dr. Lee ', patient: ' Alice ', date: ' 2026-11-15 ', id: 999, extra: true
    })
    expect(res.status).toBe(201)
    expect(res.body).toEqual({ id: expect.any(Number), ...appointment })
    expect(res.body.id).not.toBe(999)
  })

  it.each(['doctor', 'patient', 'date'])('rejects missing or invalid %s without storing it', async field => {
    const before = await request(app).get('/api/appointments')
    for (const value of [undefined, null, '', '   ', 42, {}, []]) {
      const res = await request(app).post('/api/appointments').send({ ...appointment, [field]: value })
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('error')
    }
    const after = await request(app).get('/api/appointments')
    expect(after.body).toEqual(before.body)
  })

  it('rejects a request without a body', async () => {
    const res = await request(app).post('/api/appointments')
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })
})
