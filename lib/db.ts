import { createClient, InValue } from "@libsql/client"

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const initDb = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT NOT NULL,
      phone_number  TEXT NOT NULL,
      business_name TEXT NOT NULL,
      description   TEXT NOT NULL,
      archived      INTEGER NOT NULL DEFAULT 0,
      created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  // Add archived column if upgrading from old schema
  try {
    await db.execute(`ALTER TABLE leads ADD COLUMN archived INTEGER NOT NULL DEFAULT 0`)
  } catch {
    // Column already exists — safe to ignore
  }
}

initDb()

interface LeadInput {
  name: string
  phone_number: string
  business_name: string
  description: string
}

export interface Lead extends LeadInput {
  id: number
  archived: number
  created_at: string
}

export async function insertLead(lead: LeadInput): Promise<Lead> {
  const result = await db.execute({
    sql: `INSERT INTO leads (name, phone_number, business_name, description)
          VALUES (:name, :phone_number, :business_name, :description)`,
    args: lead as unknown as Record<string, InValue>,
  })
  return {
    id: Number(result.lastInsertRowid),
    ...lead,
    archived: 0,
    created_at: new Date().toISOString(),
  }
}

export async function getAllLeads(): Promise<Lead[]> {
  const result = await db.execute(
    `SELECT * FROM leads WHERE archived = 0 ORDER BY created_at DESC`
  )
  return result.rows as unknown as Lead[]
}

export async function getArchivedLeads(): Promise<Lead[]> {
  const result = await db.execute(
    `SELECT * FROM leads WHERE archived = 1 ORDER BY created_at DESC`
  )
  return result.rows as unknown as Lead[]
}

export async function archiveLead(id: number): Promise<void> {
  await db.execute({
    sql: `UPDATE leads SET archived = 1 WHERE id = :id`,
    args: { id } as unknown as Record<string, InValue>,
  })
}

export async function unarchiveLead(id: number): Promise<void> {
  await db.execute({
    sql: `UPDATE leads SET archived = 0 WHERE id = :id`,
    args: { id } as unknown as Record<string, InValue>,
  })
}

export async function deleteLead(id: number): Promise<void> {
  await db.execute({
    sql: `DELETE FROM leads WHERE id = :id`,
    args: { id } as unknown as Record<string, InValue>,
  })
}