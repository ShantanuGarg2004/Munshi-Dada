import Database from "better-sqlite3"
import path from "path"

const db = new Database(path.join(process.cwd(), "leads.db"))

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    business_name TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`)

interface LeadInput {
  name: string
  phone_number: string
  business_name: string
  description: string
}

interface Lead extends LeadInput {
  id: number
  created_at: string
}

export function insertLead(lead: LeadInput): Lead {
  const stmt = db.prepare(`
    INSERT INTO leads (name, phone_number, business_name, description)
    VALUES (@name, @phone_number, @business_name, @description)
  `)
  const result = stmt.run(lead)
  return { id: result.lastInsertRowid as number, ...lead, created_at: new Date().toISOString() }
}

export function getAllLeads(): Lead[] {
  const stmt = db.prepare(`SELECT * FROM leads ORDER BY created_at DESC`)
  return stmt.all() as Lead[]
}