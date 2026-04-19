"use client"

import { Megaphone, Users, AlertTriangle, FileText } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  {
    icon: Megaphone,
    title: "Workforce Announcements",
    description: "Send instructions, updates, and notices to all workers instantly through WhatsApp. Perfect for shift changes, production updates, and daily instructions.",
    accent: "#3B82F6",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Team Coordination",
    description: "Supervisors coordinate workers directly through WhatsApp. Assign tasks, share updates, and receive confirmations without phone calls.",
    accent: "#8B5CF6",
    bg: "bg-violet-50",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Alerts",
    description: "Notify workers immediately during machine breakdowns, safety incidents, or urgent operational changes.",
    accent: "#F59E0B",
    bg: "bg-amber-50",
  },
  {
    icon: FileText,
    title: "Automated Workforce Reports",
    description: "Managers receive daily summaries of attendance, worker activity, and operational updates directly on WhatsApp.",
    accent: "#25D366",
    bg: "bg-green-50",
  },
]

export function WhyTeamsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".why-header", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })
      gsap.fromTo(".why-card", { opacity: 0, y: 50, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.13, ease: "power3.out", scrollTrigger: { trigger: ".why-grid", start: "top 80%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="why-header text-center mb-16">
          <p className="text-xs font-bold text-[#25D366] uppercase tracking-widest mb-3">WHY TEAMS USE MUNSHEE</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything Your Workforce Needs — On WhatsApp
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Managing workers across departments, shifts, and locations becomes easier when communication happens in one place.
          </p>
        </div>

        <div className="why-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div key={index} className="why-card group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-transparent transition-all duration-300 cursor-default">
              <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110`} style={{ backgroundColor: `${feature.accent}15` }}>
                <feature.icon className="w-6 h-6 transition-colors duration-300" style={{ color: feature.accent }} />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-sm leading-snug">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}