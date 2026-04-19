"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const bubble1Ref = useRef<HTMLDivElement>(null)
  const bubble2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-eyebrow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.2 })
      gsap.fromTo(".hero-title", { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.35 })
      gsap.fromTo(".hero-subtitle", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 })
      gsap.fromTo(".hero-buttons", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.65 })

      if (phoneRef.current) {
        gsap.to(phoneRef.current, { yPercent: -12, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1.2 } })
        gsap.fromTo(phoneRef.current, { opacity: 0, y: 80, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.4 })
      }

      if (bubble1Ref.current) {
        gsap.fromTo(bubble1Ref.current, { opacity: 0, x: -40, y: 20 }, { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "back.out(1.5)", delay: 1.0 })
        gsap.to(bubble1Ref.current, { y: -10, duration: 3, ease: "power1.inOut", yoyo: true, repeat: -1 })
      }

      if (bubble2Ref.current) {
        gsap.fromTo(bubble2Ref.current, { opacity: 0, x: 40, y: 20 }, { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "back.out(1.5)", delay: 1.2 })
        gsap.to(bubble2Ref.current, { y: -8, duration: 3.5, ease: "power1.inOut", yoyo: true, repeat: -1, delay: 0.6 })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative pt-28 pb-20 overflow-hidden bg-white">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] via-white to-white pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none translate-x-1/4 -translate-y-1/4" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="hero-eyebrow inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-[#25D366] uppercase tracking-wider">Built for Indian SMEs</span>
            </div>

            <h1 className="hero-title text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-[1.1] tracking-tight">
              Run Your Daily<br />
              Business Operations<br />
              <span className="text-[#25D366]">on WhatsApp</span>
            </h1>

            <p className="hero-subtitle mt-6 text-lg text-gray-500 leading-relaxed max-w-[480px]">
              Attendance, task updates, issue escalation, expense tracking, vendor follow-ups and daily owner reports — all without installing any new app.
            </p>

            <div className="hero-buttons mt-10 flex flex-wrap gap-3">
              <Button className="bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-full px-7 py-6 text-[15px] font-semibold shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#25D366]/30">
                Get Access
              </Button>
              <Button variant="outline" className="rounded-full px-7 py-6 text-[15px] font-medium border-gray-200 text-gray-700 group hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                Contact Us
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#25D366]/6 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-48 h-48 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />

            <div ref={phoneRef} className="relative z-10">
              <Image
                src="/images/hero-phone.jpg"
                alt="Munshee on WhatsApp"
                width={520}
                height={600}
                className="mx-auto rounded-3xl shadow-2xl shadow-gray-200/80"
              />

              <div ref={bubble1Ref} className="absolute top-14 -left-8 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Attendance</span>
                </div>
                <p className="text-xs text-gray-700 font-medium">✅ Ramesh — Present, Shift 1</p>
              </div>

              <div ref={bubble2Ref} className="absolute bottom-20 -right-8 bg-[#f0fdf4] rounded-2xl shadow-xl border border-green-100 p-4 max-w-[200px]">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Daily Summary</p>
                <p className="text-xs text-gray-700 font-medium">42/50 present · 3 pending · ₹1,240</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}