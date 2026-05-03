import { createClient, InValue } from "@libsql/client"

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const initDb = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS leads (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      name      TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      business_name TEXT NOT NULL,
      description  TEXT NOT NULL,
      created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

initDb()

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

export async function insertLead(lead: LeadInput): Promise<Lead> {
  const result = await db.execute({
    sql: `INSERT INTO leads (name, phone_number, business_name, description)
          VALUES (:name, :phone_number, :business_name, :description)`,
    args: lead as unknown as Record<string, InValue>,
  })
  return {
    id: Number(result.lastInsertRowid),
    ...lead,
    created_at: new Date().toISOString(),
  }
}

export async function getAllLeads(): Promise<Lead[]> {
  const result = await db.execute(`SELECT * FROM leads ORDER BY created_at DESC`)
  return result.rows as unknown as Lead[]
}