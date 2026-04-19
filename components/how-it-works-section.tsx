"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    number: "1",
    title: "Set up your team and workflow",
    description: "Add your staff, roles, daily tasks, reminders and reporting structure. Takes just a few minutes.",
    emoji: "⚙️",
  },
  {
    number: "2",
    title: "Staff respond on WhatsApp",
    description: "Employees send attendance, updates, issue reports, expenses, stock entries or task completion directly on WhatsApp.",
    emoji: "💬",
  },
  {
    number: "3",
    title: "Munshee follows up automatically",
    description: "It reminds people, collects updates, records entries and escalates important issues when needed.",
    emoji: "🤖",
  },
  {
    number: "4",
    title: "Owner gets one clear daily summary",
    description: "At the end of the day, you get a simple WhatsApp report with what happened, what is pending and what needs action.",
    emoji: "📊",
  }
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".how-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })
      gsap.fromTo(".how-subtext", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.15, scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })
      gsap.fromTo(".how-step", { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.18, ease: "back.out(1.4)", scrollTrigger: { trigger: ".how-steps-grid", start: "top 80%" } })
      gsap.fromTo(".step-number", { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.6, stagger: 0.18, ease: "back.out(2)", scrollTrigger: { trigger: ".how-steps-grid", start: "top 80%" } })
      gsap.fromTo(".connecting-line", { scaleX: 0 }, { scaleX: 1, duration: 0.8, stagger: 0.2, ease: "power3.inOut", scrollTrigger: { trigger: ".how-steps-grid", start: "top 75%" } })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold text-[#25D366] uppercase tracking-widest mb-3">HOW IT WORKS</p>
          <h2 className="how-title text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How Munshee Works
          </h2>
          <p className="how-subtext text-gray-400 max-w-xl mx-auto text-base">
            Set up your team → staff send updates on WhatsApp → Munshee follows up automatically → owner gets one daily summary.
          </p>
        </div>

        <div className="how-steps-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative">
          {/* Connecting lines desktop */}
          <div className="hidden lg:block absolute top-8 left-[17%] right-[17%] h-px bg-gray-200">
            <div className="connecting-line absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#25D366] origin-left"></div>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="how-step group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm text-center relative z-10 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#25D366]/20">
              <div className="step-number w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#25D366]/25 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[#25D366]/40">
                <span className="text-white font-bold text-lg">{step.number}</span>
              </div>
              <div className="text-2xl mb-3">{step.emoji}</div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm leading-snug">{step.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}