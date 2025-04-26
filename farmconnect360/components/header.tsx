"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Logo } from "./logo"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/crop-recommendation", label: t("nav.crops") },
    { href: "/disease-detection", label: t("nav.disease") },
    { href: "/marketplace", label: t("nav.marketplace") },
    { href: "/weather", label: t("nav.weather") },
    { href: "/fertilizer", label: t("nav.fertilizer") },
    { href: "/dashboard", label: t("nav.dashboard") },
    { href: "/document-locker", label: t("nav.documents") },
    { href: "/carbon-footprint", label: t("nav.carbon") },
    { href: "/sdg", label: t("nav.sdg") },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <Link href="/" className="text-xl font-bold">
            {t("app.name")}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.slice(0, 6).map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium">
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navItems.slice(6).map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("kn")}>ಕನ್ನಡ (Kannada)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("te")}>తెలుగు (Telugu)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ta")}>தமிழ் (Tamil)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container md:hidden py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
