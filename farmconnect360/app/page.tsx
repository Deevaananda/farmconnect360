"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Leaf, CloudRain, ShoppingCart, Sprout, FileText, BarChart3, Calculator } from "lucide-react"

export default function Home() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <Leaf className="h-10 w-10 text-green-500" />,
      title: "Smart Crop Recommendation",
      description:
        "Get personalized crop recommendations based on soil type, weather forecast, and geographical region.",
      href: "/crop-recommendation",
    },
    {
      icon: <Sprout className="h-10 w-10 text-green-600" />,
      title: "Plant Disease Detection",
      description: "Detect plant diseases with just a photo and get recommendations for treatment and prevention.",
      href: "/disease-detection",
    },
    {
      icon: <ShoppingCart className="h-10 w-10 text-blue-500" />,
      title: "Agricultural Marketplace",
      description: "Buy and sell crops, cattle, equipment, and find labor for your farm.",
      href: "/marketplace",
    },
    {
      icon: <CloudRain className="h-10 w-10 text-blue-400" />,
      title: "Weather Forecast & Irrigation Timer",
      description: "Get accurate weather forecasts and optimal irrigation timing for maximum yield.",
      href: "/weather",
    },
    {
      icon: <Calculator className="h-10 w-10 text-purple-500" />,
      title: "Fertilizer Calculator",
      description: "Calculate the right amount of fertilizer for your crops with real-time market prices.",
      href: "/fertilizer",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-orange-500" />,
      title: "Price Intelligence Dashboard",
      description: "Track and predict future crop prices to make informed decisions.",
      href: "/dashboard",
    },
    {
      icon: <FileText className="h-10 w-10 text-gray-500" />,
      title: "Document Locker",
      description: "Securely store and manage your important documents like land papers and loan documents.",
      href: "/document-locker",
    },
    {
      icon: <Leaf className="h-10 w-10 text-green-400" />,
      title: "Carbon Footprint Calculator",
      description: "Measure and reduce your farm's environmental impact.",
      href: "/carbon-footprint",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">{t("home.title")}</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">{t("home.subtitle")}</p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/crop-recommendation">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    {t("home.get-started")}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sdg">
                  <Button size="lg" variant="outline">
                    Learn About Our Impact
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <img
                alt="FarmConnect 360"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                height="550"
                src="/placeholder.svg?height=550&width=800"
                width="800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-800/30 dark:text-green-400">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Everything You Need for Successful Farming
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                FarmConnect 360 provides a comprehensive suite of tools to help farmers make informed decisions,
                increase yields, and improve sustainability.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href} className="group">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-800/30 dark:text-green-400">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Trusted by Farmers Across the Country
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from farmers who have transformed their agricultural practices with FarmConnect 360.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Increased Yield by 30%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "The crop recommendation system helped me choose the right crops for my soil type. I've seen a 30%
                  increase in yield since using FarmConnect 360."
                </p>
                <div className="mt-4 flex items-center">
                  <div className="ml-4">
                    <p className="text-sm font-medium">Rajesh Kumar</p>
                    <p className="text-sm text-muted-foreground">Karnataka</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Early Disease Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "The disease detection feature helped me identify a fungal infection early. I was able to treat it
                  before it spread to my entire crop."
                </p>
                <div className="mt-4 flex items-center">
                  <div className="ml-4">
                    <p className="text-sm font-medium">Lakshmi Devi</p>
                    <p className="text-sm text-muted-foreground">Tamil Nadu</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Better Market Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "The marketplace helped me connect directly with buyers. I'm now getting better prices for my produce
                  without middlemen."
                </p>
                <div className="mt-4 flex items-center">
                  <div className="ml-4">
                    <p className="text-sm font-medium">Venkat Reddy</p>
                    <p className="text-sm text-muted-foreground">Andhra Pradesh</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Transform Your Farming?
              </h2>
              <p className="max-w-[900px] text-white md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of farmers who are already using FarmConnect 360 to improve their yields and livelihoods.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/crop-recommendation">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
