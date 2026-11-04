/**
 * Integration tests for /api/doctors (Supertest against the Express app).
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('Doctors API', () => {
  it('GET /api/doctors should return an array', async () => {
    const res = await request(app).get('/api/doctors')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body.length).toBeGreaterThan(0)
    expect(res.body[0]).toHaveProperty('id')
    expect(res.body[0]).toHaveProperty('name')
    expect(res.body[0]).toHaveProperty('specialty')
  })

  it('POST /api/doctors should add a new doctor', async () => {
    const res = await request(app)
      .post('/api/doctors')
      .send({ name: 'Dr. Julie', specialty: 'Neurology' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body.name).toBe('Dr. Julie')
    expect(res.body.specialty).toBe('Neurology')

    const list = await request(app).get('/api/doctors')
    expect(list.body.some((d) => d.id === res.body.id)).toBe(true)
  })

  it('POST /api/doctors should give each new doctor a unique id', async () => {
    const a = await request(app).post('/api/doctors').send({ name: 'Dr. A', specialty: 'Oncology' })
    const b = await request(app).post('/api/doctors').send({ name: 'Dr. B', specialty: 'Oncology' })
    expect(a.body.id).not.toBe(b.body.id)
  })

  it('POST /api/doctors should return 400 when name is missing', async () => {
    const res = await request(app).post('/api/doctors').send({ specialty: 'Neurology' })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('POST /api/doctors should return 400 when specialty is missing', async () => {
    const res = await request(app).post('/api/doctors').send({ name: 'Dr. Julie' })
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('POST /api/doctors should return 400 for blank values', async () => {
    const res = await request(app).post('/api/doctors').send({ name: '   ', specialty: '' })
    expect(res.status).toBe(400)
  })

  it('POST /api/doctors should return 400 when there is no body at all', async () => {
    const res = await request(app).post('/api/doctors')
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('POST /api/doctors should return 400 for malformed JSON', async () => {
    const res = await request(app)
      .post('/api/doctors')
      .set('Content-Type', 'application/json')
      .send('{ "name": ')
    expect(res.status).toBe(400)
    expect(res.body.error).toBe(true)
  })
})
