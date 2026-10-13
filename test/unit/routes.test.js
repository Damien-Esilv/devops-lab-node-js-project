/**
 * Direct router tests keep the auto-mounted route modules visible to coverage.
 */
import express from 'express'
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import boomRouter from '../../src/routes/auto/boom.route.js'
import infoRouter from '../../src/routes/auto/info.route.js'
import versionRouter from '../../src/routes/auto/version.route.js'
import { errorHandler } from '../../src/utils/errorHandler.js'

describe('auto-mounted routers', () => {
  it('serves the version payload', async () => {
    const app = express().use(versionRouter)
    const res = await request(app).get('/version')

    expect(res.status).toBe(200)
    expect(res.body.version).toBe('1.0.0')
  })

  it('serves application information', async () => {
    const app = express().use(infoRouter)
    const res = await request(app).get('/info')

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('version')
  })

  it('passes route errors to the error handler', async () => {
    const app = express().use(boomRouter).use(errorHandler)
    const res = await request(app).get('/boom')

    expect(res.status).toBe(500)
    expect(res.body).toEqual({ error: true, message: 'Boom!' })
  })
})
