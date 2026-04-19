"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import gsap from "gsap"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/96 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="header-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo-full.png"
              alt="Munshee"
              width={148}
              height={36}
              className="h-9 w-auto transition-opacity duration-200 group-hover:opacity-80"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {["Features", "How It Works", "Pricing", "FAQ"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 px-2">
              Contact Us
            </Link>
            <Button className="bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm shadow-[#25D366]/20 transition-all duration-200 hover:shadow-md hover:shadow-[#25D366]/25">
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
            mobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 py-4 border-t border-gray-100">
            {["Features", "How It Works", "Pricing", "FAQ"].map((item) => (
              <Link key={item} href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-2.5 px-1">
                {item}
              </Link>
            ))}
            <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-2.5 px-1">
              Contact Us
            </Link>
            <Button className="bg-[#25D366] hover:bg-[#1fba5a] text-white rounded-full mt-3 font-semibold">
              Get Access
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}