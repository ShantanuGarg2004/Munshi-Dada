"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const footerLinks = {
  Product: ["Features", "How It Works", "Pricing", "FAQ"],
  Industries: ["Factories & Warehouses", "Field & Construction", "Retail", "Service Businesses"],
  Company: ["About Us", "Blog", "Contact Us", "Privacy Policy"],
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-brand", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: footerRef.current, start: "top 90%" } })
      gsap.fromTo(".footer-column", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: footerRef.current, start: "top 88%" } })
      gsap.fromTo(".footer-bottom", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", scrollTrigger: { trigger: ".footer-bottom", start: "top 96%" } })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-[#0b1410] text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="footer-brand">
            <Link href="/" className="inline-block mb-5 opacity-90 hover:opacity-100 transition-opacity duration-200">
              <Image src="/images/logo-full.png" alt="Munshee" width={140} height={34} className="h-8 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
              Run your daily business operations on WhatsApp.
            </p>
            <div className="mt-6 flex gap-3">
              {/* WhatsApp icon */}
              <a href="#" className="w-8 h-8 rounded-lg bg-white/6 hover:bg-[#25D366] flex items-center justify-center transition-all duration-200 group">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400 group-hover:fill-white transition-colors duration-200">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-8 h-8 rounded-lg bg-white/6 hover:bg-blue-600 flex items-center justify-center transition-all duration-200 group">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-gray-400 group-hover:fill-white transition-colors duration-200">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-column">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom border-t border-white/6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© 2025 Munshee. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors duration-200">Privacy Policy</Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors duration-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}