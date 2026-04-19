"use client"

import { ClipboardCheck, ListTodo, Megaphone } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const featureCards = [
  { icon: ClipboardCheck, title: "Attendance Tracking", desc: "Mark & track daily attendance through simple WhatsApp messages" },
  { icon: ListTodo, title: "Task Coordination", desc: "Assign work, collect updates and stop chasing people manually" },
  { icon: Megaphone, title: "Instant Workforce Broadcast", desc: "Send shift updates and announcements to your entire team at once" },
]

export function BuiltForSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".built-for-header", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } })
      gsap.fromTo(".business-type-card", { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, ease: "back.out(1.3)", scrollTrigger: { trigger: ".business-types-grid", start: "top 80%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="built-for-header mb-16">
          <p className="text-xs font-semibold text-[#25D366] uppercase tracking-widest mb-3">WHO IT&apos;S FOR</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Built for businesses that run on WhatsApp</h2>
          <p className="text-gray-400 text-base max-w-md mx-auto">If your business already uses WhatsApp, Munshee fits right in — no new app, no extra training.</p>
        </div>

        <div className="business-types-grid grid grid-cols-1 sm:grid-cols-3 gap-5">
          {featureCards.map((item, index) => (
            <div key={index} className="business-type-card group cursor-default bg-gray-50 rounded-2xl p-8 border border-transparent hover:border-[#25D366]/15 hover:bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/5 hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-5 mx-auto shadow-sm border border-gray-100 transition-all duration-300 group-hover:bg-[#25D366] group-hover:border-[#25D366] group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[#25D366]/25">
                <item.icon className="w-5 h-5 text-gray-500 transition-colors duration-300 group-hover:text-white" />
              </div>
              <p className="font-semibold text-gray-800 mb-2 text-sm">{item.title}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}