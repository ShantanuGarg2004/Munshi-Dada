"use client"

import { useState } from "react"
import { Download, RefreshCw, Shield, Users } from "lucide-react"

interface Lead {
  id: string
  name: string
  phone_number: string
  business_name: string
  description: string
  created_at: string
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState("")
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [authed, setAuthed] = useState(false)

  const fetchLeads = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/leads", {
        headers: { "x-admin-key": adminKey },
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

  const downloadCSV = () => {
    const headers = ["ID", "Name", "Phone", "Business Name", "Description", "Submitted At"]
    const rows = leads.map((l) => [
      l.id,
      l.name,
      l.phone_number,
      l.business_name,
      `"${l.description.replace(/"/g, '""')}"`,
      new Date(l.created_at).toLocaleString("en-IN"),
    ])
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `munshidada-leads-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

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
          /* Login card — centred on all screens */
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
                onKeyDown={(e) => e.key === "Enter" && fetchLeads()}
                placeholder="Enter admin key"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#25D366] transition-colors mb-4 text-sm"
              />
              {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
              <button
                onClick={fetchLeads}
                disabled={loading}
                className="w-full bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-xl py-3 text-sm font-bold transition-colors disabled:opacity-50"
              >
                {loading ? "Loading..." : "Access Dashboard"}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Stats + actions row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#25D366]/15 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#25D366]">{leads.length}</span>
                  <span className="text-gray-400 text-sm ml-2">total leads</span>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={fetchLeads}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 rounded-xl text-sm font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="sm:inline">Refresh</span>
                </button>
                <button
                  onClick={downloadCSV}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1fba5a] rounded-xl text-sm font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="text-center py-20 text-gray-500">No leads yet.</div>
            ) : (
              <>
                {/* Desktop table — hidden on mobile */}
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
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead, i) => (
                          <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="px-5 py-4 text-gray-500">{i + 1}</td>
                            <td className="px-5 py-4 font-medium text-white">{lead.name}</td>
                            <td className="px-5 py-4">
                              <a
                                href={`tel:${lead.phone_number}`}
                                className="text-[#25D366] hover:underline font-mono"
                              >
                                {lead.phone_number}
                              </a>
                            </td>
                            <td className="px-5 py-4 text-gray-300">{lead.business_name}</td>
                            <td className="px-5 py-4 text-gray-400 max-w-xs">
                              <p className="line-clamp-2">{lead.description}</p>
                            </td>
                            <td className="px-5 py-4 text-gray-500 whitespace-nowrap text-xs">
                              {new Date(lead.created_at).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile cards — shown only on small screens */}
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
                        <a
                          href={`tel:${lead.phone_number}`}
                          className="text-[#25D366] font-mono text-sm font-semibold shrink-0 hover:underline"
                        >
                          {lead.phone_number}
                        </a>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-3">{lead.description}</p>
                      <p className="text-[10px] text-gray-600">
                        {new Date(lead.created_at).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}