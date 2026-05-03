export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { insertLead, getAllLeads, getArchivedLeads, archiveLead, unarchiveLead, deleteLead } from "@/lib/db"

function isAuthed(req: NextRequest) {
  return req.headers.get("x-admin-key") === process.env.ADMIN_SECRET_KEY
}

// POST /api/leads — submit a new lead (public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, number, businessName, description } = body

    if (!name || !number || !businessName || !description) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const lead = await insertLead({
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

// GET /api/leads?view=archived — fetch active or archived leads (admin)
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const view = req.nextUrl.searchParams.get("view")
    const leads = view === "archived" ? await getArchivedLeads() : await getAllLeads()
    return NextResponse.json({ leads }, { status: 200 })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

// PATCH /api/leads — archive or unarchive a lead (admin)
export async function PATCH(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id, action } = await req.json()
    if (!id || !["archive", "unarchive"].includes(action)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 })
    }
    if (action === "archive") await archiveLead(Number(id))
    else await unarchiveLead(Number(id))
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}

// DELETE /api/leads — permanently delete an archived lead (admin)
export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: "ID required." }, { status: 400 })
    await deleteLead(Number(id))
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}