"use client"

import { Factory, HardHat, ShoppingBag, Wrench } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const businessTypes = [
  { icon: Factory, title: "Factories & Warehouses", desc: "Manage large worker teams, shifts, and production updates" },
  { icon: HardHat, title: "Construction & Field Teams", desc: "Coordinate workers across multiple job sites easily" },
  { icon: ShoppingBag, title: "Retail & Service Shops", desc: "Track staff, handle customer queries automatically" },
  { icon: Wrench, title: "Service Businesses", desc: "Automate vendor follow-ups and booking confirmations" },
]

export function BuiltForSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".built-header", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } })
      gsap.fromTo(".built-card", { opacity: 0, y: 36, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.1, ease: "back.out(1.3)", scrollTrigger: { trigger: ".built-grid", start: "top 80%" } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="built-header text-center mb-14">
          <p className="text-xs font-bold text-[#25D366] uppercase tracking-widest mb-3">WHO IT&apos;S FOR</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Built for businesses that run on WhatsApp</h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">If your business already uses WhatsApp, Munshee fits right in — no new app, no extra training.</p>
        </div>

        <div className="built-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {businessTypes.map((item, index) => (
            <div key={index} className="built-card group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#25D366]/20 transition-all duration-300 cursor-default text-center">
              <div className="w-12 h-12 bg-[#f0fdf4] rounded-xl flex items-center justify-center mb-5 mx-auto transition-all duration-300 group-hover:bg-[#25D366] group-hover:scale-110">
                <item.icon className="w-5 h-5 text-[#25D366] transition-colors duration-300 group-hover:text-white" />
              </div>
              <p className="font-bold text-gray-800 mb-2 text-sm leading-snug">{item.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}