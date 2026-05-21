"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GetAccessModal } from "@/components/get-access-modal"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const demoHighlights = [
  "A manager assigns attendance, inventory, and vendor follow-up tasks.",
  "Workers respond through WhatsApp, voice, image, and text.",
  "Munshi verifies proof, escalates delays, and sends leadership a summary.",
]

const demoEmbed = `
  <html>
    <body style="margin:0;background:#071209;color:white;font-family:Inter,Arial,sans-serif;">
      <div style="height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#0f1a14,#0d1f11 55%,#071209);">
        <div style="width:86%;max-width:760px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:22px;color:#25D366;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;">
            <span style="width:10px;height:10px;border-radius:999px;background:#25D366;display:inline-block;"></span>
            Munshi operations demo
          </div>
          <div style="border:1px solid rgba(255,255,255,.12);border-radius:28px;padding:26px;background:rgba(255,255,255,.06);box-shadow:0 28px 80px rgba(0,0,0,.35);">
            <div style="display:grid;gap:14px;">
              <div style="background:white;color:#1f2937;border-radius:18px;padding:16px;font-size:16px;font-weight:700;">Assign inventory audit to Shift A and follow up with packaging vendor.</div>
              <div style="background:#25D366;color:white;border-radius:18px;padding:16px;font-size:15px;font-weight:700;margin-left:42px;">Munshi delegated 3 tasks, requested photo proof, and scheduled vendor reminder.</div>
              <div style="background:white;color:#1f2937;border-radius:18px;padding:16px;font-size:15px;font-weight:700;">Team replied with voice note, photo proof, and stock count.</div>
              <div style="background:#DCFCE7;color:#166534;border-radius:18px;padding:16px;font-size:15px;font-weight:800;">Verified summary: 2 complete, 1 delayed, vendor escalated to manager.</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:center;margin-top:24px;">
            <div style="width:68px;height:68px;border-radius:999px;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 18px 42px rgba(37,211,102,.28);">
              <div style="width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-left:21px solid white;margin-left:5px;"></div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
`

export function LiveDemosSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [accessModalOpen, setAccessModalOpen] = useState(false)

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
        ".demo-panel",
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
    <>
    <section ref={sectionRef} className="py-20 sm:py-24 bg-white overflow-hidden" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="demos-header text-center mb-16">
          <p className="text-xs font-bold text-[#25D366] uppercase tracking-widest mb-3">
            DEMO
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            See Munshi Run Your Operations
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base leading-relaxed">
            Watch the operating flow: assignment, delegation, natural response, proof validation, escalation, and verified leadership summary.
          </p>
        </div>

        <div className="demos-grid grid lg:grid-cols-[1.35fr_0.85fr] gap-8 items-center max-w-6xl mx-auto">
          <div className="demo-panel bg-gray-950 rounded-3xl overflow-hidden border border-gray-900 shadow-2xl shadow-gray-900/20">
            <div className="relative aspect-video">
              <iframe
                title="Munshi operations demo"
                srcDoc={demoEmbed}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="demo-panel bg-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-100">
            <div className="w-14 h-14 bg-[#25D366] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#25D366]/25">
              <Play className="w-6 h-6 text-white fill-current ml-1" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">A walkthrough of real operating work</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              The demo focuses on the daily moments that create the most friction: assigning work, collecting reliable updates, coordinating vendors, and knowing what needs escalation.
            </p>
            <div className="space-y-3 mb-7">
              {demoHighlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{highlight}</span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => setAccessModalOpen(true)}
              className="bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-full px-6 py-5 font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#25D366]/30"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
    <GetAccessModal open={accessModalOpen} onClose={() => setAccessModalOpen(false)} />
    </>
  )
}