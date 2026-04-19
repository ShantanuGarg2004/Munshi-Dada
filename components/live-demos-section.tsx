"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const demos = [
  {
    title: "Message a demo clinic on WhatsApp",
    image: "/images/demo-clinic.jpg"
  },
  {
    title: "Message a demo Real estate agency",
    image: "/images/demo-realestate.jpg"
  }
]

export function LiveDemosSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".demos-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Demo cards - scale and fade
      gsap.fromTo(
        ".demo-card",
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".demos-grid",
            start: "top 80%",
          },
        }
      )

      // Footer text
      gsap.fromTo(
        ".demos-footer",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".demos-footer",
            start: "top 90%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="demos-header text-center mb-16">
          <p className="text-sm font-medium text-[#25D366] uppercase tracking-wide mb-4">
            Live Demos
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            The Best Way To Understand<br />Munshi Dada Is To Try It.
          </h2>
        </div>

        <div className="demos-grid grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {demos.map((demo, index) => (
            <div 
              key={index} 
              className="demo-card bg-gray-50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={demo.image}
                  alt={demo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4 transition-colors duration-300 group-hover:text-[#25D366]">{demo.title}</h3>
                <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#25D366]/30">
                  Try it now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="demos-footer text-center text-sm text-gray-500 mt-8">
          See how it all works — and how businesses interact in the real way.
        </p>
      </div>
    </section>
  )
}
