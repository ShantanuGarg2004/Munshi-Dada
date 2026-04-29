"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Check, Copy } from "lucide-react"
import { useState, useEffect } from "react"
import gsap from "gsap"
import { GetAccessModal } from "@/components/get-access-modal"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  const [accessModalOpen, setAccessModalOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      ".header-content",
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
    )
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleContactUs = () => {
    navigator.clipboard.writeText("9555105916").then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Use Cases", href: "#use-cases" },
    { label: "Privacy Policy", href: "/privacy" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/98 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.08)]"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="header-content max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center group flex-shrink-0">
              <Image
                src="/images/logo-full.png"
                alt="Munshee"
                width={148}
                height={36}
                className="h-8 w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleContactUs}
                className="relative text-sm font-semibold text-gray-700 hover:text-gray-900 transition-all duration-200 px-4 py-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#25D366]" />
                    <span className="text-[#25D366]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Contact Us
                  </>
                )}
              </button>
              <Button
                onClick={() => setAccessModalOpen(true)}
                className="bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:shadow-md"
              >
                Get Access
              </Button>
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <nav className="flex flex-col gap-1 py-4 border-t border-gray-100">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-2.5 px-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={handleContactUs}
                  className="text-sm font-semibold text-gray-700 py-2.5 px-4 rounded-full border border-gray-200 text-center hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#25D366]" />
                      <span className="text-[#25D366]">Number Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Contact Us
                    </>
                  )}
                </button>
                <Button
                  onClick={() => { setAccessModalOpen(true); setMobileMenuOpen(false); }}
                  className="bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-full font-semibold"
                >
                  Get Access
                </Button>
              </div>
            </nav>
          </div>
        </div>

        {/* Clipboard notification toast */}
        <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${
            copied ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl flex items-center gap-2.5">
            <div className="w-5 h-5 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-white" />
            </div>
            Phone number <span className="font-bold text-[#25D366]">9555105916</span> copied to clipboard!
          </div>
        </div>
      </header>

      <GetAccessModal open={accessModalOpen} onClose={() => setAccessModalOpen(false)} />
    </>
  )
}