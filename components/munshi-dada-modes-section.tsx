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

export function MunshiDadaModesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".modes-label", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })
      gsap.fromTo(".modes-title", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })
      gsap.fromTo(".mode-card-left", { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".modes-cards-grid", start: "top 75%" } })
      gsap.fromTo(".mode-card-right", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.12, scrollTrigger: { trigger: ".modes-cards-grid", start: "top 75%" } })
      gsap.fromTo(".mode-check-item", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.35, stagger: 0.07, ease: "power2.out", scrollTrigger: { trigger: ".modes-cards-grid", start: "top 70%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 bg-[#fafafa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="modes-label text-xs font-semibold text-[#25D366] uppercase tracking-widest mb-3">USE CASES</p>
          <h2 className="modes-title text-3xl sm:text-4xl font-bold text-gray-900 max-w-2xl mx-auto leading-tight">
            Munshee Works Across Different Workforces
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-base">
            Whether teams work in factories or across field locations, Munshee keeps everyone coordinated through WhatsApp.
          </p>
        </div>

        <div className="modes-cards-grid grid md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="mode-card-left bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 group">
            <div className="relative h-52 overflow-hidden">
              <Image src="/images/team-support.jpg" alt="Factory workforce" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-5 text-xs font-semibold text-white bg-[#25D366] px-3 py-1 rounded-full uppercase tracking-wide">Indoor Operations</span>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Factories & Warehouses</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">Manage large worker teams, shifts, and production updates through WhatsApp without manual coordination.</p>
              <div className="space-y-2.5 mb-8">
                {["Attendance tracking via WhatsApp", "Shift updates & announcements", "Machine breakdown alerts", "Daily workforce summaries"].map((text, i) => (
                  <div key={i} className="mode-check-item flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#25D366]" />
                    </div>
                    <span className="text-gray-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-full px-6 font-semibold transition-all duration-200 hover:scale-105">
                Get Access
              </Button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="mode-card-right bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400 group">
            <div className="relative h-52 overflow-hidden">
              <Image src="/images/team-women.jpg" alt="Field team coordination" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-5 text-xs font-semibold text-white bg-[#25D366] px-3 py-1 rounded-full uppercase tracking-wide">Distributed Teams</span>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Construction & Field Teams</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">Coordinate distributed teams across multiple locations using simple WhatsApp communication.</p>
              <div className="space-y-2.5 mb-8">
                {["Worker check-ins from job sites", "Task assignments from supervisors", "Safety alerts & notices", "Daily progress coordination"].map((text, i) => (
                  <div key={i} className="mode-check-item flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#25D366]" />
                    </div>
                    <span className="text-gray-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="rounded-full px-6 font-semibold border-gray-200 text-gray-700 hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/5 transition-all duration-200">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}