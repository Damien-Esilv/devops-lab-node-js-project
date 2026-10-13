/**
 * GET /version → { version: "<package.json version>" }
 * Reads version from package.json to keep it source-of-truth.
 */
import { Router } from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packagePath = path.join(__dirname, '..', '..', '..', 'package.json')
const packageVersion = JSON.parse(fs.readFileSync(packagePath, 'utf-8')).version

const router = Router()

router.get('/version', (_req, res) => {
  res.status(200).json({ version: packageVersion })
})

export default router
