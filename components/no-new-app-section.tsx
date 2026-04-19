"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Smartphone, Zap, Shield } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const benefits = [
  { icon: Smartphone, title: "No new app to install", desc: "Works on the WhatsApp your team already uses daily" },
  { icon: Zap, title: "Set up in minutes", desc: "Configure your team, roles, and workflows quickly" },
  { icon: Shield, title: "Always consistent", desc: "Munshee never forgets, never gets tired, always available" },
]

export function NoNewAppSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".no-app-title span", { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } })
      gsap.fromTo(".no-app-sub", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: 0.4, scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } })
      gsap.fromTo(".no-app-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)", delay: 0.55, scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } })
      gsap.fromTo(".benefit-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ".benefits-grid", start: "top 80%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-[#0b1a14] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, #25D366 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-emerald-900/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="no-app-title text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight mb-8">
              <span className="block text-white/35">No NEW App.</span>
              <span className="block text-white/70">No Extra Training.</span>
              <span className="block text-[#25D366]">Just WhatsApp.</span>
            </h2>
            <p className="no-app-sub text-gray-400 text-lg leading-relaxed max-w-md mb-9">
              Your workers already use WhatsApp every day. Munshee turns it into a powerful business management system — attendance, tasks, expenses and reports — all automated.
            </p>
            <div className="no-app-cta flex flex-wrap gap-3">
              <Button className="bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-full px-7 py-6 text-[15px] font-bold shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:scale-105">
                Get Access
              </Button>
              <Button variant="outline" className="rounded-full px-7 py-6 text-[15px] font-semibold border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 transition-all duration-300 group">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Flow diagram */}
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 w-full">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 text-center">How it flows</p>
              <div className="flex items-center justify-between gap-2">
                {[
                  { emoji: "👷", label: "Workers" },
                  { arrow: true },
                  { wa: true },
                  { arrow: true },
                  { emoji: "🤖", label: "Munshee" },
                  { arrow: true },
                  { emoji: "👔", label: "Owner" },
                ].map((item, i) =>
                  "arrow" in item ? (
                    <span key={i} className="text-[#25D366] text-xl font-bold">→</span>
                  ) : "wa" in item ? (
                    <div key={i} className="bg-[#25D366] rounded-2xl px-4 py-3 text-center shadow-lg shadow-[#25D366]/20 flex-shrink-0">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-1" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span className="text-xs font-bold text-white">WA</span>
                    </div>
                  ) : (
                    <div key={i} className="bg-white/6 border border-white/10 rounded-2xl px-4 py-3 text-center flex-shrink-0">
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <span className="text-xs font-medium text-white/60">{item.label}</span>
                    </div>
                  )
                )}
              </div>
              <p className="text-xs text-gray-500 text-center mt-5 leading-relaxed">Your whole operation runs through one familiar app.</p>
            </div>
          </div>
        </div>

        {/* Benefits row */}
        <div className="benefits-grid grid sm:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <div key={i} className="benefit-card bg-white/4 border border-white/8 rounded-2xl p-6 hover:bg-white/7 transition-colors duration-200">
              <div className="w-10 h-10 bg-[#25D366]/15 rounded-xl flex items-center justify-center mb-4">
                <b.icon className="w-5 h-5 text-[#25D366]" />
              </div>
              <h3 className="font-bold text-white text-sm mb-2">{b.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}