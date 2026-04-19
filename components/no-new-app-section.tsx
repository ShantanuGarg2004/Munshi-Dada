"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function NoNewAppSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".no-app-line", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } })
      gsap.fromTo(".no-app-subtext", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.4, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } })
      gsap.fromTo(".no-app-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)", delay: 0.65, scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } })
      gsap.fromTo(".flow-item", { opacity: 0, scale: 0.85, y: 16 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "back.out(1.4)", scrollTrigger: { trigger: ".flow-diagram", start: "top 80%" } })
      gsap.fromTo(".flow-arrow", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.35, stagger: 0.15, ease: "power2.out", delay: 0.3, scrollTrigger: { trigger: ".flow-diagram", start: "top 80%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 bg-[#0b1a14] text-white relative overflow-hidden">
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #25D366 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#25D366]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-emerald-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <div>
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight">
              <span className="no-app-line block text-white/40">No NEW App.</span>
              <span className="no-app-line block text-white/70">No Extra Training.</span>
              <span className="no-app-line block text-[#25D366]">Just WhatsApp.</span>
            </h2>
            <p className="no-app-subtext mt-8 text-gray-400 text-lg leading-relaxed max-w-md">
              Your workers already use WhatsApp every day. Munshee turns it into a powerful business management system — attendance, tasks, expenses and reports — all automated.
            </p>
            <div className="no-app-cta mt-9 flex gap-3">
              <Button className="bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-full px-7 py-6 text-[15px] font-semibold shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:scale-105">
                Get Access
              </Button>
              <Button variant="outline" className="rounded-full px-7 py-6 text-[15px] font-medium border-white/15 text-white hover:bg-white/8 hover:border-white/25 transition-all duration-300 group">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          <div className="flow-diagram flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {[
                { emoji: "👷", label: "Workers" },
                { emoji: null, label: "↔", isArrow: true },
                { emoji: null, label: "WhatsApp", isWA: true },
                { emoji: null, label: "↔", isArrow: true },
                { emoji: "🤖", label: "Munshee" },
                { emoji: null, label: "↔", isArrow: true },
                { emoji: "👔", label: "Owner" },
              ].map((item, i) =>
                item.isArrow ? (
                  <span key={i} className="flow-arrow text-[#25D366] text-lg origin-left">↔</span>
                ) : item.isWA ? (
                  <div key={i} className="flow-item bg-[#25D366] rounded-2xl px-5 py-4 text-center shadow-lg shadow-[#25D366]/25">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 mx-auto mb-2" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-sm font-semibold text-white">WhatsApp</span>
                  </div>
                ) : (
                  <div key={i} className="flow-item bg-white/6 border border-white/10 rounded-2xl px-5 py-4 text-center hover:bg-white/10 transition-colors duration-200">
                    <div className="text-2xl mb-1.5">{item.emoji}</div>
                    <span className="text-sm font-medium text-white/70">{item.label}</span>
                  </div>
                )
              )}
            </div>
            <p className="text-sm text-gray-500 text-center max-w-xs leading-relaxed">Your whole operation runs through one familiar app.</p>
          </div>
        </div>
      </div>
    </section>
  )
}