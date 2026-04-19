"use client"

import { Button } from "@/components/ui/button"
import { Check, ArrowRight, MessageCircle } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const checkItems = [
  "It's like WhatsApp demo",
  "Deploy your trial assistant in 2hrs",
  "Book a walkthrough",
]

const features = [
  "Attendance & task tracking",
  "Expense & hisaab entries",
  "Issue escalation & alerts",
  "Daily owner summary report",
]

export function GetStartedSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gs-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })
      gsap.fromTo(".gs-sub", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })
      gsap.fromTo(".gs-check", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ".gs-checks", start: "top 80%" } })
      gsap.fromTo(".gs-cta", { opacity: 0, y: 24, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)", scrollTrigger: { trigger: ".gs-cta", start: "top 90%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-[#25D366] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-black/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold text-white/80 uppercase tracking-widest">Live Demos</span>
            </div>
            <h2 className="gs-title text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              The Best Way To Understand Munshee Is To Try It.
            </h2>
            <p className="gs-sub text-white/75 mb-8 text-base leading-relaxed">
              No new app. No extra training. Just WhatsApp — the one your team already uses every day.
            </p>
            <div className="gs-checks flex flex-col gap-3 mb-8">
              {checkItems.map((text, i) => (
                <div key={i} className="gs-check flex items-center gap-3">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white font-medium text-sm">{text}</span>
                </div>
              ))}
            </div>
            <div className="gs-cta flex flex-wrap gap-3">
              <Button className="bg-white text-[#25D366] hover:bg-gray-50 rounded-full px-7 py-6 text-[15px] font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
                Try It Now
              </Button>
              <Button variant="outline" className="rounded-full px-7 py-6 text-[15px] font-semibold border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 group bg-transparent">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right - Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((text, i) => (
              <div key={i} className="gs-check flex items-center gap-3 bg-white/12 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-sm font-semibold">{text}</span>
              </div>
            ))}
            <div className="sm:col-span-2 bg-white/10 border border-white/15 rounded-xl px-5 py-4 mt-1">
              <p className="text-white/70 text-xs text-center">See how it all works — and how businesses interact in the real way.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}