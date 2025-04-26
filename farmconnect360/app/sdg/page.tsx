"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, ExternalLink, Globe, Heart, Leaf, Users } from "lucide-react"
import Link from "next/link"

// SDG goals data
const sdgGoals = [
  {
    id: 1,
    number: 2,
    title: "Zero Hunger",
    description: "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.",
    color: "bg-yellow-500",
    icon: Leaf,
    alignment: [
      {
        feature: "Crop Recommendation System",
        description:
          "Our AI-powered crop recommendation system helps farmers choose the most suitable crops for their soil and climate conditions, leading to higher yields and food production.",
        impact: "Increased food production by 20-30% in pilot regions",
      },
      {
        feature: "Disease Detection",
        description:
          "Early detection of plant diseases helps prevent crop losses, ensuring more food reaches consumers.",
        impact: "Reduced crop losses by up to 40% through early intervention",
      },
      {
        feature: "Marketplace",
        description: "Direct connections between farmers and consumers reduce food waste in the supply chain.",
        impact: "Shortened supply chains resulting in 15% less food waste",
      },
    ],
  },
  {
    id: 2,
    number: 1,
    title: "No Poverty",
    description: "End poverty in all its forms everywhere by ensuring sustainable livelihoods for farmers.",
    color: "bg-red-500",
    icon: Heart,
    alignment: [
      {
        feature: "Price Intelligence Dashboard",
        description: "Helps farmers make informed decisions about when to sell their produce for maximum profit.",
        impact: "Increased farmer income by 15-25% through better market timing",
      },
      {
        feature: "Marketplace",
        description: "Eliminates middlemen, allowing farmers to capture more value from their produce.",
        impact: "Direct sales increased farmer revenue share by up to 40%",
      },
      {
        feature: "Loan Calculator",
        description: "Helps farmers make informed financial decisions and avoid predatory lending.",
        impact: "Reduced interest payments by 20% through better loan planning",
      },
    ],
  },
  {
    id: 3,
    number: 13,
    title: "Climate Action",
    description: "Take urgent action to combat climate change and its impacts through sustainable farming practices.",
    color: "bg-green-600",
    icon: Globe,
    alignment: [
      {
        feature: "Carbon Footprint Calculator",
        description: "Helps farmers measure and reduce their environmental impact through sustainable practices.",
        impact: "Average 25% reduction in carbon emissions after implementing recommendations",
      },
      {
        feature: "Weather Forecast & Irrigation Timer",
        description: "Optimizes water usage and helps farmers adapt to changing climate patterns.",
        impact: "Reduced water usage by 30% while maintaining crop yields",
      },
      {
        feature: "Organic Fertilizer Recommendations",
        description: "Promotes the use of organic fertilizers that reduce greenhouse gas emissions.",
        impact: "Decreased chemical fertilizer usage by 35% in participating farms",
      },
    ],
  },
  {
    id: 4,
    number: 8,
    title: "Decent Work and Economic Growth",
    description:
      "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
    color: "bg-purple-500",
    icon: Users,
    alignment: [
      {
        feature: "Labor Hub",
        description:
          "Connects farmers with skilled agricultural workers, creating employment opportunities in rural areas.",
        impact: "Created over 5,000 seasonal job opportunities in agricultural communities",
      },
      {
        feature: "Equipment Finder",
        description: "Enables equipment sharing and rental, reducing capital costs for small farmers.",
        impact: "Reduced equipment costs by 40% through shared access models",
      },
      {
        feature: "Retail Connections",
        description: "Helps farmers establish stable business relationships with retailers for consistent income.",
        impact: "Established long-term contracts for 200+ small-scale farmers",
      },
    ],
  },
]

// Success stories data
const successStories = [
  {
    id: 1,
    title: "Transforming Rice Cultivation in Karnataka",
    farmer: "Rajesh Kumar",
    location: "Mandya, Karnataka",
    story:
      "Rajesh Kumar, a rice farmer with 3 hectares of land, was struggling with declining yields due to unpredictable weather patterns and pest infestations. After using FarmConnect 360's crop recommendation and disease detection features, he was able to switch to a more suitable rice variety and identify a fungal infection early. His yield increased by 30%, and his income grew by 45% in just one season.",
    impact: [
      "30% increase in rice yield",
      "45% increase in income",
      "60% reduction in pesticide usage",
      "Created employment for 5 additional farm workers",
    ],
    sdgGoals: [2, 1, 13],
  },
  {
    id: 2,
    title: "Building a Sustainable Vegetable Business",
    farmer: "Lakshmi Devi",
    location: "Coimbatore, Tamil Nadu",
    story:
      "Lakshmi Devi, a vegetable farmer, was selling her produce to middlemen at low prices. Through FarmConnect 360's marketplace, she connected directly with urban consumers and restaurants. She also implemented the irrigation timer to optimize water usage. As a result, her income doubled, and she reduced her water consumption by 40%, making her farm more resilient to drought conditions.",
    impact: [
      "100% increase in income through direct sales",
      "40% reduction in water usage",
      "Expanded farm from 1 to 3 acres",
      "Hired 3 women from her village as permanent employees",
    ],
    sdgGoals: [1, 2, 8, 13],
  },
  {
    id: 3,
    title: "Reducing Carbon Footprint in Wheat Farming",
    farmer: "Venkat Reddy",
    location: "Guntur, Andhra Pradesh",
    story:
      "Venkat Reddy, a wheat farmer with 10 hectares of land, was concerned about his farm's environmental impact. Using FarmConnect 360's carbon footprint calculator, he identified that his fertilizer usage was the main source of emissions. By switching to organic fertilizers and implementing precision agriculture techniques, he reduced his carbon footprint by 35% while maintaining his yield. He also received a premium price for his environmentally friendly wheat through the marketplace.",
    impact: [
      "35% reduction in carbon emissions",
      "20% increase in income through premium pricing",
      "50% reduction in chemical fertilizer usage",
      "Improved soil health and biodiversity on the farm",
    ],
    sdgGoals: [13, 2, 1],
  },
]

export default function SDGGoals() {
  const { t } = useLanguage()

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold tracking-tight">Sustainable Development Goals</h1>
        </div>
        <p className="text-muted-foreground">
          How FarmConnect 360 contributes to the United Nations Sustainable Development Goals
        </p>
      </div>

      <div className="space-y-10">
        <Card>
          <CardHeader>
            <CardTitle>Our Commitment to Sustainability</CardTitle>
            <CardDescription>
              FarmConnect 360 is designed to address key challenges in agriculture while supporting the UN's Sustainable
              Development Goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              At FarmConnect 360, we believe that technology can be a powerful force for positive change in agriculture.
              Our platform is built with sustainability at its core, addressing critical challenges such as food
              security, farmer livelihoods, and environmental impact.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-muted p-6">
                <h3 className="text-lg font-medium mb-2">Our Mission</h3>
                <p className="text-muted-foreground mb-4">
                  To empower farmers with technology that improves yields, increases incomes, and promotes sustainable
                  agricultural practices.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                    <span>Making advanced agricultural technology accessible to all farmers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                    <span>Reducing environmental impact through data-driven recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                    <span>Creating transparent and fair agricultural markets</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                    <span>Supporting rural livelihoods and economic development</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-muted p-6">
                <h3 className="text-lg font-medium mb-2">Our Impact</h3>
                <p className="text-muted-foreground mb-4">
                  FarmConnect 360 is making a measurable difference in agricultural communities across India.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">10,000+</div>
                    <div className="text-sm text-muted-foreground">Farmers Using Our Platform</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">25%</div>
                    <div className="text-sm text-muted-foreground">Average Yield Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">30%</div>
                    <div className="text-sm text-muted-foreground">Average Income Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">20%</div>
                    <div className="text-sm text-muted-foreground">Reduction in Carbon Footprint</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">SDG Alignment</h2>
          <p className="text-muted-foreground">
            FarmConnect 360 directly contributes to the following UN Sustainable Development Goals
          </p>

          <Tabs defaultValue={sdgGoals[0].id.toString()} className="space-y-6">
            <TabsList className="flex flex-wrap h-auto">
              {sdgGoals.map((goal) => (
                <TabsTrigger key={goal.id} value={goal.id.toString()} className="flex items-center gap-2 m-1">
                  <div
                    className={`h-6 w-6 rounded-full ${goal.color} flex items-center justify-center text-white font-bold text-xs`}
                  >
                    {goal.number}
                  </div>
                  <span className="hidden sm:inline">{goal.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {sdgGoals.map((goal) => (
              <TabsContent key={goal.id} value={goal.id.toString()} className="space-y-6">
                <Card>
                  <CardHeader className={`${goal.color} text-white`}>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        <goal.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm">Goal {goal.number}</div>
                        <CardTitle>{goal.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="mb-6">{goal.description}</p>
                    <h3 className="text-lg font-medium mb-4">How FarmConnect 360 Contributes</h3>
                    <div className="space-y-6">
                      {goal.alignment.map((item, index) => (
                        <div key={index} className="rounded-lg border p-4">
                          <h4 className="font-medium mb-2">{item.feature}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                          <Badge variant="outline" className="bg-green-50">
                            Impact: {item.impact}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Success Stories</h2>
          <p className="text-muted-foreground">
            Real-world examples of how FarmConnect 360 is helping farmers achieve sustainable development
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {successStories.map((story) => (
              <Card key={story.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{story.title}</CardTitle>
                  <CardDescription>
                    {story.farmer} • {story.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{story.story}</p>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Impact</h4>
                    <ul className="space-y-1">
                      {story.impact.map((item, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">SDG Contribution</h4>
                    <div className="flex flex-wrap gap-2">
                      {story.sdgGoals.map((goalNumber) => {
                        const goal = sdgGoals.find((g) => g.number === goalNumber)
                        return (
                          <div
                            key={goalNumber}
                            className={`h-6 w-6 rounded-full ${goal?.color} flex items-center justify-center text-white font-bold text-xs`}
                          >
                            {goalNumber}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Join Our Sustainability Journey</CardTitle>
            <CardDescription>Be part of the movement to transform agriculture for a sustainable future</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>
              FarmConnect 360 is committed to continuous improvement in our sustainability efforts. We regularly measure
              our impact and set ambitious goals for the future.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border p-4 text-center">
                <h3 className="font-medium mb-2">Become a Partner</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our network of organizations working together for sustainable agriculture
                </p>
                <Button variant="outline" className="w-full">
                  Partner With Us
                </Button>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <h3 className="font-medium mb-2">Share Your Story</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tell us how FarmConnect 360 has helped your farming journey
                </p>
                <Button variant="outline" className="w-full">
                  Submit Your Story
                </Button>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <h3 className="font-medium mb-2">Learn More</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore our detailed sustainability report and future goals
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#" className="flex items-center justify-center gap-2">
                    <span>Sustainability Report</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
