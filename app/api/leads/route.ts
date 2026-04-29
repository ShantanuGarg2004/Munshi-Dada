export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { insertLead, getAllLeads } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, number, businessName, description } = body

    if (!name || !number || !businessName || !description) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const lead = insertLead({
      name,
      phone_number: number,
      business_name: businessName,
      description,
    })

    return NextResponse.json({ success: true, id: lead.id }, { status: 200 })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key")
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const leads = getAllLeads()
    return NextResponse.json({ leads }, { status: 200 })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}