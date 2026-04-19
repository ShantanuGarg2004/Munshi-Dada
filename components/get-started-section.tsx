"use client"

import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function GetStartedSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".get-started-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })
      gsap.fromTo(".get-started-subtext", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })
      gsap.fromTo(".get-started-check", { opacity: 0, x: -32 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".get-started-checks", start: "top 80%" } })
      gsap.fromTo(".get-started-cta", { opacity: 0, y: 24, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)", scrollTrigger: { trigger: ".get-started-cta", start: "top 90%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 bg-[#25D366] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-black/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="get-started-title text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight tracking-tight">
            Start Running Your Business Operations on WhatsApp
          </h2>
          <p className="get-started-subtext text-white/75 mb-10 text-base leading-relaxed">
            No new app. No extra training. Just WhatsApp — the one your team already uses every day.
          </p>

          <div className="get-started-checks grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-lg mx-auto">
            {[
              "Attendance & task tracking",
              "Expense & hisaab entries",
              "Issue escalation & alerts",
              "Daily owner summary report",
            ].map((text, i) => (
              <div key={i} className="get-started-check flex items-center gap-3 bg-white/12 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3 text-left">
                <div className="w-4 h-4 bg-white/25 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-white text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>

          <div className="get-started-cta flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-white text-[#25D366] hover:bg-gray-50 rounded-full px-8 py-6 text-[15px] font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
              Get Access
            </Button>
            <Button variant="outline" className="rounded-full px-8 py-6 text-[15px] font-semibold border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 group">
              Contact Us
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}