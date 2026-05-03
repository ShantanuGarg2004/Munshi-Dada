"use client"

import { useState } from "react"
import { Download, RefreshCw, Shield, Archive, ArchiveRestore, Trash2, Inbox, AlertTriangle } from "lucide-react"

interface Lead {
  id: string
  name: string
  phone_number: string
  business_name: string
  description: string
  created_at: string
}

type View = "active" | "archived"

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("")
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [authed, setAuthed] = useState(false)
  const [view, setView] = useState<View>("active")
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const fetchLeads = async (targetView: View = view, key: string = adminKey) => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/leads${targetView === "archived" ? "?view=archived" : ""}`, {
        headers: { "x-admin-key": key },
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to fetch leads")
      }
      const data = await res.json()
      setLeads(data.leads)
      setAuthed(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const switchView = async (next: View) => {
    setView(next)
    await fetchLeads(next)
  }

  const handleArchive = async (id: string) => {
    setActionLoading(id)
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ id, action: "archive" }),
      })
      setLeads((prev) => prev.filter((l) => l.id !== id))
    } finally {
      setActionLoading(null)
    }
  }

  const handleUnarchive = async (id: string) => {
    setActionLoading(id)
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ id, action: "unarchive" }),
      })
      setLeads((prev) => prev.filter((l) => l.id !== id))
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    setConfirmId(null)
    setActionLoading(id)
    try {
      await fetch("/api/leads", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ id }),
      })
      setLeads((prev) => prev.filter((l) => l.id !== id))
    } finally {
      setActionLoading(null)
    }
  }

  const downloadCSV = () => {
    const headers = ["ID", "Name", "Phone", "Business Name", "Description", "Submitted At"]
    const rows = leads.map((l) => [
      l.id, l.name, l.phone_number, l.business_name,
      `"${l.description.replace(/"/g, '""')}"`,
      new Date(l.created_at).toLocaleString("en-IN"),
    ])
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `munshidada-${view}-leads-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })

  return (
    <div className="min-h-screen bg-[#0f1a14] text-white">
      {/* Top bar */}
      <div className="border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white leading-tight">Munshee Admin</h1>
            <p className="text-gray-500 text-xs">Leads Dashboard</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
        {!authed ? (
          <div className="flex items-start justify-center pt-4 sm:pt-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-sm">
              <div className="w-12 h-12 bg-[#25D366]/15 rounded-xl flex items-center justify-center mb-5">
                <Shield className="w-5 h-5 text-[#25D366]" />
              </div>
              <h2 className="text-xl font-bold mb-1">Admin Access</h2>
              <p className="text-gray-500 text-sm mb-5">Enter your admin key to view submissions.</p>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchLeads("active", adminKey)}
                placeholder="Enter admin key"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#25D366] transition-colors mb-4 text-sm"
              />
              {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
              <button
                onClick={() => fetchLeads("active", adminKey)}
                disabled={loading}
                className="w-full bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-xl py-3 text-sm font-bold transition-colors disabled:opacity-50"
              >
                {loading ? "Loading..." : "Access Dashboard"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs + actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
                <button
                  onClick={() => switchView("active")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    view === "active" ? "bg-[#25D366] text-white shadow" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Inbox className="w-4 h-4" />
                  Active
                  {view === "active" && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white">
                      {leads.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => switchView("archived")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    view === "archived" ? "bg-amber-500 text-white shadow" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Archive className="w-4 h-4" />
                  Archived
                  {view === "archived" && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white">
                      {leads.length}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => fetchLeads()}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl text-sm font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
                <button
                  onClick={downloadCSV}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1fba5a] rounded-xl text-sm font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>

            {/* Archived info banner */}
            {view === "archived" && (
              <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 mb-5 text-sm text-amber-300">
                <Archive className="w-4 h-4 flex-shrink-0" />
                Archived leads are hidden from the active list. Restore them or permanently delete them here.
              </div>
            )}

            {loading ? (
              <div className="text-center py-20 text-gray-500">Loading...</div>
            ) : leads.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                {view === "active" ? "No active leads yet." : "No archived leads."}
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="text-left px-5 py-4 text-gray-400 font-semibold">#</th>
                          <th className="text-left px-5 py-4 text-gray-400 font-semibold">Name</th>
                          <th className="text-left px-5 py-4 text-gray-400 font-semibold">Phone</th>
                          <th className="text-left px-5 py-4 text-gray-400 font-semibold">Business</th>
                          <th className="text-left px-5 py-4 text-gray-400 font-semibold">Description</th>
                          <th className="text-left px-5 py-4 text-gray-400 font-semibold">Submitted</th>
                          <th className="text-left px-5 py-4 text-gray-400 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead, i) => (
                          <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="px-5 py-4 text-gray-500">{i + 1}</td>
                            <td className="px-5 py-4 font-medium text-white">{lead.name}</td>
                            <td className="px-5 py-4">
                              <a href={`tel:${lead.phone_number}`} className="text-[#25D366] hover:underline font-mono">
                                {lead.phone_number}
                              </a>
                            </td>
                            <td className="px-5 py-4 text-gray-300">{lead.business_name}</td>
                            <td className="px-5 py-4 text-gray-400 max-w-xs">
                              <p className="line-clamp-2">{lead.description}</p>
                            </td>
                            <td className="px-5 py-4 text-gray-500 whitespace-nowrap text-xs">{formatDate(lead.created_at)}</td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                {view === "active" ? (
                                  <button
                                    onClick={() => handleArchive(lead.id)}
                                    disabled={actionLoading === lead.id}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold transition-colors disabled:opacity-40"
                                  >
                                    <Archive className="w-3.5 h-3.5" />
                                    {actionLoading === lead.id ? "..." : "Archive"}
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => handleUnarchive(lead.id)}
                                      disabled={actionLoading === lead.id}
                                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-semibold transition-colors disabled:opacity-40"
                                    >
                                      <ArchiveRestore className="w-3.5 h-3.5" />
                                      {actionLoading === lead.id ? "..." : "Restore"}
                                    </button>
                                    <button
                                      onClick={() => setConfirmId(lead.id)}
                                      disabled={actionLoading === lead.id}
                                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-colors disabled:opacity-40"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                      {actionLoading === lead.id ? "..." : "Delete"}
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {leads.map((lead, i) => (
                    <div key={lead.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-mono">#{i + 1}</span>
                            <span className="font-semibold text-white text-sm">{lead.name}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{lead.business_name}</p>
                        </div>
                        <a href={`tel:${lead.phone_number}`} className="text-[#25D366] font-mono text-sm font-semibold shrink-0 hover:underline">
                          {lead.phone_number}
                        </a>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-3">{lead.description}</p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[10px] text-gray-600">{formatDate(lead.created_at)}</p>
                        <div className="flex gap-2">
                          {view === "active" ? (
                            <button
                              onClick={() => handleArchive(lead.id)}
                              disabled={actionLoading === lead.id}
                              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-semibold transition-colors disabled:opacity-40"
                            >
                              <Archive className="w-3 h-3" />
                              {actionLoading === lead.id ? "..." : "Archive"}
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => handleUnarchive(lead.id)}
                                disabled={actionLoading === lead.id}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366]/10 text-[#25D366] text-xs font-semibold transition-colors disabled:opacity-40"
                              >
                                <ArchiveRestore className="w-3 h-3" />
                                {actionLoading === lead.id ? "..." : "Restore"}
                              </button>
                              <button
                                onClick={() => setConfirmId(lead.id)}
                                disabled={actionLoading === lead.id}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-semibold transition-colors disabled:opacity-40"
                              >
                                <Trash2 className="w-3 h-3" />
                                {actionLoading === lead.id ? "..." : "Delete"}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Delete confirmation modal */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a2a1f] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-12 h-12 bg-red-500/15 rounded-xl flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Delete this lead?</h3>
            <p className="text-sm text-gray-400 mb-6">This action is permanent and cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmId)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}