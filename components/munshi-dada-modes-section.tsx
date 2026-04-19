"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const modes = [
  {
    badge: "Indoor Operations",
    title: "Factories & Warehouses",
    subtitle: "For Customers & Clients",
    desc: "Manage large worker teams, shifts, and production updates through WhatsApp without manual coordination.",
    checks: ["Attendance tracking via WhatsApp", "Shift updates & announcements", "Machine breakdown alerts", "Daily workforce summaries"],
    image: "/images/team-support.jpg",
    cta: "Get Access",
    ctaVariant: "primary" as const,
  },
  {
    badge: "Distributed Teams",
    title: "Construction & Field Teams",
    subtitle: "For Employees & Internal Operations",
    desc: "Coordinate distributed teams across multiple locations using simple WhatsApp communication.",
    checks: ["Worker check-ins from job sites", "Task assignments from supervisors", "Safety alerts & notices", "Daily progress coordination"],
    image: "/images/team-women.jpg",
    cta: "Contact Us",
    ctaVariant: "outline" as const,
  },
]

export function MunshiDadaModesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".modes-header", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })
      gsap.fromTo(".mode-card", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ".modes-grid", start: "top 78%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="modes-header text-center mb-16">
          <p className="text-xs font-bold text-[#25D366] uppercase tracking-widest mb-3">USE CASES</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-2xl mx-auto leading-tight mb-4">
            Use Munshee In Two Ways
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Whether managing customers or internal teams, Munshee adapts to how you already use WhatsApp.
          </p>
        </div>

        <div className="modes-grid grid md:grid-cols-2 gap-6">
          {modes.map((mode, index) => (
            <div key={index} className="mode-card bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 group">
              <div className="relative h-56 overflow-hidden">
                <Image src={mode.image} alt={mode.title} fill className="object-cover transition-transform duration-600 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute top-4 left-5">
                  <span className="text-xs font-bold text-gray-700 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">{mode.subtitle}</span>
                </div>
                <div className="absolute bottom-4 left-5">
                  <span className="text-xs font-bold text-white bg-[#25D366] px-3 py-1.5 rounded-full uppercase tracking-wide">{mode.badge}</span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{mode.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{mode.desc}</p>

                <div className="space-y-2.5 mb-8">
                  {mode.checks.map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#25D366]" />
                      </div>
                      <span className="text-gray-600 text-sm">{text}</span>
                    </div>
                  ))}
                </div>

                {mode.ctaVariant === "primary" ? (
                  <Button className="bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-full px-6 font-bold transition-all duration-200 hover:scale-105">
                    {mode.cta}
                  </Button>
                ) : (
                  <Button variant="outline" className="rounded-full px-6 font-bold border-gray-200 text-gray-700 hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/5 transition-all duration-200">
                    {mode.cta}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}