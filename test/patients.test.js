import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('Patients API', () => {
  it('GET /api/patients should return an array', async () => {
    const res = await request(app).get('/api/patients')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/patients should add a new patient', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({ name: 'Sophie', age: 28 })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toMatchObject({ name: 'Sophie', age: 28 })
  })

  it('POST /api/patients should return 400 if fields are missing', async () => {
    const res = await request(app)
      .post('/api/patients')
      .send({ name: 'Sophie' }) // 'age' manquant
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error', 'Missing fields')
  })
})
