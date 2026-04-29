"use client"

import { Button } from "@/components/ui/button"
import { Play, ExternalLink } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const demos = [
  {
    title: "See Munshee manage a factory team",
    subtitle: "Attendance + Task Tracking Demo",
    duration: "2:34",
    thumbnail: "/images/team-support.jpg",
    videoUrl: "#", // Replace with actual YouTube/Loom embed URL
    tag: "Factory & Warehouse",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    title: "Watch Munshee handle customer queries",
    subtitle: "Customer Support Automation Demo",
    duration: "1:58",
    thumbnail: "/images/team-women.jpg",
    videoUrl: "#", // Replace with actual YouTube/Loom embed URL
    tag: "Customer Support",
    tagColor: "bg-blue-100 text-blue-700",
  },
]

export function LiveDemosSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden" id="demo-videos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="demos-header text-center mb-16">
          <p className="text-xs font-bold text-[#25D366] uppercase tracking-widest mb-3">
            DEMO VIDEOS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            See Munshee In Action
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-base leading-relaxed">
            Watch how real businesses use Munshee to automate their daily WhatsApp operations.
          </p>
        </div>

        <div className="demos-grid grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {demos.map((demo, index) => (
            <div
              key={index}
              className="demo-card bg-gray-50 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group"
            >
              {/* Video thumbnail area */}
              <div className="relative aspect-video overflow-hidden bg-gray-900">
                {/* Thumbnail image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${demo.thumbnail})` }}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setPlayingIndex(index)}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#25D366]"
                  >
                    <Play className="w-6 h-6 text-gray-900 group-hover:text-white fill-current ml-1 transition-colors duration-300" />
                  </button>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-md">
                  {demo.duration}
                </div>

                {/* Tag */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${demo.tagColor}`}>
                    {demo.tag}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-1 text-base leading-snug group-hover:text-[#25D366] transition-colors duration-300">
                  {demo.title}
                </h3>
                <p className="text-sm text-gray-400 mb-5">{demo.subtitle}</p>

                <Button
                  onClick={() => setPlayingIndex(index)}
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#25D366]/30 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Watch Demo Video
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Want a personalised walkthrough?{" "}
          <button
            className="text-[#25D366] font-semibold hover:underline inline-flex items-center gap-1"
            onClick={() => {
              navigator.clipboard.writeText("9555105916")
            }}
          >
            Contact us directly <ExternalLink className="w-3 h-3" />
          </button>
        </p>
      </div>

      {/* Video modal */}
      {playingIndex !== null && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setPlayingIndex(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video flex items-center justify-center bg-gray-900">
              {/* Replace with actual iframe embed when you have video URLs */}
              <div className="text-center text-white p-10">
                <div className="w-20 h-20 bg-[#25D366]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-[#25D366] fill-current ml-1" />
                </div>
                <p className="text-lg font-semibold mb-2">{demos[playingIndex].title}</p>
                <p className="text-gray-400 text-sm">Video coming soon. Contact us to schedule a live demo!</p>
              </div>
            </div>
            <button
              onClick={() => setPlayingIndex(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}