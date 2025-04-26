"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Logo } from "./logo"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-6" />
              <span className="text-lg font-bold">{t("app.name")}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering farmers with technology for sustainable agriculture and better livelihoods.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/crop-recommendation" className="text-muted-foreground hover:text-foreground">
                  {t("nav.crops")}
                </Link>
              </li>
              <li>
                <Link href="/disease-detection" className="text-muted-foreground hover:text-foreground">
                  {t("nav.disease")}
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-muted-foreground hover:text-foreground">
                  {t("nav.marketplace")}
                </Link>
              </li>
              <li>
                <Link href="/weather" className="text-muted-foreground hover:text-foreground">
                  {t("nav.weather")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/fertilizer" className="text-muted-foreground hover:text-foreground">
                  {t("nav.fertilizer")}
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  {t("nav.dashboard")}
                </Link>
              </li>
              <li>
                <Link href="/loans" className="text-muted-foreground hover:text-foreground">
                  {t("nav.loans")}
                </Link>
              </li>
              <li>
                <Link href="/carbon-footprint" className="text-muted-foreground hover:text-foreground">
                  {t("nav.carbon")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} FarmConnect 360. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
