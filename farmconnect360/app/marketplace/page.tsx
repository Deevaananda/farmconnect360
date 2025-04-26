"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Phone,
  MapPin,
  Star,
  ChevronDown,
  MessageSquare,
  Tractor,
  Wheat,
  Users,
  MilkIcon as Cow,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Sample marketplace data
const marketplaceItems = {
  crops: [
    {
      id: 1,
      title: "Organic Rice",
      category: "Grains",
      price: "₹2,200/quintal",
      location: "Mysore, Karnataka",
      seller: "Krishna Farms",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      description: "Freshly harvested organic rice. No pesticides or chemicals used.",
      quantity: "50 quintals available",
      contactNumber: "+91 9876543210",
    },
    {
      id: 2,
      title: "Premium Quality Wheat",
      category: "Grains",
      price: "₹2,400/quintal",
      location: "Belgaum, Karnataka",
      seller: "Patil Agro",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=300",
      description: "High-quality wheat with excellent protein content.",
      quantity: "100 quintals available",
      contactNumber: "+91 9876543211",
    },
    {
      id: 3,
      title: "Fresh Tomatoes",
      category: "Vegetables",
      price: "₹25/kg",
      location: "Coimbatore, Tamil Nadu",
      seller: "Green Valley Farms",
      rating: 4.2,
      image: "/placeholder.svg?height=200&width=300",
      description: "Fresh, ripe tomatoes harvested daily.",
      quantity: "500 kg available",
      contactNumber: "+91 9876543212",
    },
  ],
  cattle: [
    {
      id: 1,
      title: "Holstein Friesian Cow",
      category: "Dairy",
      price: "₹75,000",
      location: "Hosur, Tamil Nadu",
      seller: "Dairy Solutions",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      description: "High milk-yielding Holstein Friesian cow. Produces 25-30 liters per day.",
      age: "4 years",
      contactNumber: "+91 9876543213",
    },
    {
      id: 2,
      title: "Murrah Buffalo",
      category: "Dairy",
      price: "₹90,000",
      location: "Tirupati, Andhra Pradesh",
      seller: "Reddy Cattle Farm",
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      description: "Healthy Murrah buffalo with excellent milk production.",
      age: "5 years",
      contactNumber: "+91 9876543214",
    },
  ],
  equipment: [
    {
      id: 1,
      title: "Mahindra 575 DI Tractor",
      category: "Tractors",
      price: "₹5,50,000",
      location: "Bangalore, Karnataka",
      seller: "Agro Machinery",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
      description: "Slightly used Mahindra tractor in excellent condition. 42 HP engine.",
      condition: "Used - Like New",
      contactNumber: "+91 9876543215",
    },
    {
      id: 2,
      title: "Sprinkler Irrigation System",
      category: "Irrigation",
      price: "₹25,000",
      location: "Salem, Tamil Nadu",
      seller: "Water Solutions",
      rating: 4.4,
      image: "/placeholder.svg?height=200&width=300",
      description: "Complete sprinkler irrigation system for 2 acres of land.",
      condition: "New",
      contactNumber: "+91 9876543216",
    },
  ],
  labor: [
    {
      id: 1,
      title: "Experienced Farm Workers",
      category: "Seasonal",
      price: "₹500/day per worker",
      location: "Madurai, Tamil Nadu",
      seller: "Rural Labor Group",
      rating: 4.3,
      image: "/placeholder.svg?height=200&width=300",
      description: "Group of 10 experienced farm workers available for harvesting.",
      availability: "Immediate",
      contactNumber: "+91 9876543217",
    },
    {
      id: 2,
      title: "Tractor Operator",
      category: "Skilled",
      price: "₹700/day",
      location: "Guntur, Andhra Pradesh",
      seller: "Skilled Farm Workers",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=300",
      description: "Experienced tractor operator with knowledge of various implements.",
      availability: "Available from next week",
      contactNumber: "+91 9876543218",
    },
  ],
}

export default function Marketplace() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("crops")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevance")

  // Filter items based on search query
  const filteredItems = marketplaceItems[activeTab as keyof typeof marketplaceItems].filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort items based on selected option
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "price-low") {
      return Number.parseInt(a.price.replace(/[^\d]/g, "")) - Number.parseInt(b.price.replace(/[^\d]/g, ""))
    } else if (sortBy === "price-high") {
      return Number.parseInt(b.price.replace(/[^\d]/g, "")) - Number.parseInt(a.price.replace(/[^\d]/g, ""))
    } else if (sortBy === "rating") {
      return b.rating - a.rating
    }
    return 0 // Default: relevance
  })

  const categoryIcons = {
    crops: <Wheat className="h-5 w-5" />,
    cattle: <Cow className="h-5 w-5" />,
    equipment: <Tractor className="h-5 w-5" />,
    labor: <Users className="h-5 w-5" />,
  }

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Agricultural Marketplace</h1>
        <p className="text-muted-foreground">Buy and sell crops, cattle, equipment, and find labor for your farm</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Search and Filter Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search marketplace..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Filter by Location</DropdownMenuItem>
                <DropdownMenuItem>Filter by Price Range</DropdownMenuItem>
                <DropdownMenuItem>Filter by Seller Rating</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="crops" className="flex items-center gap-2">
              <Wheat className="h-4 w-4" />
              <span className="hidden sm:inline">Crops</span>
            </TabsTrigger>
            <TabsTrigger value="cattle" className="flex items-center gap-2">
              <Cow className="h-4 w-4" />
              <span className="hidden sm:inline">Cattle</span>
            </TabsTrigger>
            <TabsTrigger value="equipment" className="flex items-center gap-2">
              <Tractor className="h-4 w-4" />
              <span className="hidden sm:inline">Equipment</span>
            </TabsTrigger>
            <TabsTrigger value="labor" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Labor</span>
            </TabsTrigger>
          </TabsList>

          {/* Marketplace Items */}
          {Object.keys(marketplaceItems).map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              {/* Category Description */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                    {category.charAt(0).toUpperCase() + category.slice(1)} Marketplace
                  </h2>
                  <p className="text-sm text-muted-foreground">{sortedItems.length} items available</p>
                </div>
                <Link href={`/marketplace/sell?category=${category}`}>
                  <Button>Sell {category.charAt(0).toUpperCase() + category.slice(1)}</Button>
                </Link>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="h-full w-full object-cover transition-all hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                          <CardDescription className="line-clamp-1">{item.category}</CardDescription>
                        </div>
                        <Badge variant="outline">{item.price}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-2">
                      <p className="text-sm line-clamp-2">{item.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-1 h-4 w-4" />
                        {item.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{item.rating}</span>
                          <span className="text-muted-foreground ml-1">• {item.seller}</span>
                        </div>
                        {"quantity" in item && <span className="text-xs text-muted-foreground">{item.quantity}</span>}
                        {"condition" in item && <Badge variant="secondary">{item.condition}</Badge>}
                        {"availability" in item && <Badge variant="secondary">{item.availability}</Badge>}
                      </div>
                    </CardContent>
                    <Separator />
                    <CardFooter className="p-4 flex justify-between">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span className="hidden sm:inline">Contact</span>
                      </Button>
                      <Button size="sm" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span className="hidden sm:inline">Message</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {sortedItems.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-6 mb-4">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                  </div>
                  <h3 className="text-lg font-medium">No items found</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}

              {/* Load More Button */}
              {sortedItems.length > 0 && (
                <div className="flex justify-center">
                  <Button variant="outline" className="flex items-center gap-1">
                    Load More
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Consumer Dashboard */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Consumer Dashboard</CardTitle>
            <CardDescription>Track prices, find deals, and connect with retailers</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="prices">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="prices">Price Intelligence</TabsTrigger>
                <TabsTrigger value="retailers">Retail Connections</TabsTrigger>
                <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
              </TabsList>
              <TabsContent value="prices" className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Current Market Prices</h3>
                <div className="rounded-lg border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                    <div>Commodity</div>
                    <div>Current Price</div>
                    <div>Weekly Change</div>
                    <div>Trend</div>
                  </div>
                  <Separator />
                  {[
                    { name: "Rice", price: "₹2,200/quintal", change: "+5%", trend: "up" },
                    { name: "Wheat", price: "₹2,400/quintal", change: "+2%", trend: "up" },
                    { name: "Tomatoes", price: "₹25/kg", change: "-10%", trend: "down" },
                    { name: "Potatoes", price: "₹15/kg", change: "0%", trend: "stable" },
                  ].map((item, i) => (
                    <div key={i} className="grid grid-cols-4 gap-4 p-4">
                      <div>{item.name}</div>
                      <div>{item.price}</div>
                      <div
                        className={item.trend === "up" ? "text-green-500" : item.trend === "down" ? "text-red-500" : ""}
                      >
                        {item.change}
                      </div>
                      <div>
                        {item.trend === "up" && <span className="text-green-500">↑</span>}
                        {item.trend === "down" && <span className="text-red-500">↓</span>}
                        {item.trend === "stable" && <span>→</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  View Full Price Intelligence Report
                </Button>
              </TabsContent>
              <TabsContent value="retailers" className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Connect with Retailers</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      name: "Organic Farmers Co-op",
                      location: "Bangalore",
                      products: "Vegetables, Fruits",
                      rating: 4.8,
                    },
                    { name: "Green Harvest", location: "Chennai", products: "Grains, Pulses", rating: 4.6 },
                    { name: "Farm Fresh Direct", location: "Hyderabad", products: "All Categories", rating: 4.7 },
                    {
                      name: "Nature's Basket",
                      location: "Multiple Locations",
                      products: "Premium Produce",
                      rating: 4.5,
                    },
                  ].map((retailer, i) => (
                    <Card key={i}>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">{retailer.name}</CardTitle>
                        <CardDescription>{retailer.location}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{retailer.products}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{retailer.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Connect
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="alerts" className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Price Alerts</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Rice Price Alert</h4>
                        <p className="text-sm text-muted-foreground">Alert when price drops below ₹2,000/quintal</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Tomato Price Alert</h4>
                        <p className="text-sm text-muted-foreground">Alert when price drops below ₹20/kg</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  </div>
                  <Button className="w-full">Create New Price Alert</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
