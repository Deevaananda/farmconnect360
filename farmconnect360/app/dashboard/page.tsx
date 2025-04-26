"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Calendar,
  Download,
  Filter,
  TrendingDown,
  TrendingUp,
  Wheat,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample price prediction data
const pricePredictionData = {
  rice: [
    { month: "Jan", price: 2200, predicted: 2250 },
    { month: "Feb", price: 2250, predicted: 2300 },
    { month: "Mar", price: 2300, predicted: 2350 },
    { month: "Apr", price: 2350, predicted: 2400 },
    { month: "May", price: 2400, predicted: 2450 },
    { month: "Jun", price: 2450, predicted: 2500 },
    { month: "Jul", price: 2500, predicted: 2550 },
    { month: "Aug", price: 2550, predicted: 2600 },
    { month: "Sep", price: 2600, predicted: 2650 },
    { month: "Oct", price: 2650, predicted: 2700 },
    { month: "Nov", price: 2700, predicted: 2750 },
    { month: "Dec", price: 2750, predicted: 2800 },
  ],
  wheat: [
    { month: "Jan", price: 2400, predicted: 2450 },
    { month: "Feb", price: 2450, predicted: 2500 },
    { month: "Mar", price: 2500, predicted: 2550 },
    { month: "Apr", price: 2550, predicted: 2600 },
    { month: "May", price: 2600, predicted: 2650 },
    { month: "Jun", price: 2650, predicted: 2700 },
    { month: "Jul", price: 2700, predicted: 2750 },
    { month: "Aug", price: 2750, predicted: 2800 },
    { month: "Sep", price: 2800, predicted: 2850 },
    { month: "Oct", price: 2850, predicted: 2900 },
    { month: "Nov", price: 2900, predicted: 2950 },
    { month: "Dec", price: 2950, predicted: 3000 },
  ],
  maize: [
    { month: "Jan", price: 1800, predicted: 1850 },
    { month: "Feb", price: 1850, predicted: 1900 },
    { month: "Mar", price: 1900, predicted: 1950 },
    { month: "Apr", price: 1950, predicted: 2000 },
    { month: "May", price: 2000, predicted: 2050 },
    { month: "Jun", price: 2050, predicted: 2100 },
    { month: "Jul", price: 2100, predicted: 2150 },
    { month: "Aug", price: 2150, predicted: 2200 },
    { month: "Sep", price: 2200, predicted: 2250 },
    { month: "Oct", price: 2250, predicted: 2300 },
    { month: "Nov", price: 2300, predicted: 2350 },
    { month: "Dec", price: 2350, predicted: 2400 },
  ],
  cotton: [
    { month: "Jan", price: 6000, predicted: 6100 },
    { month: "Feb", price: 6100, predicted: 6200 },
    { month: "Mar", price: 6200, predicted: 6300 },
    { month: "Apr", price: 6300, predicted: 6400 },
    { month: "May", price: 6400, predicted: 6500 },
    { month: "Jun", price: 6500, predicted: 6600 },
    { month: "Jul", price: 6600, predicted: 6700 },
    { month: "Aug", price: 6700, predicted: 6800 },
    { month: "Sep", price: 6800, predicted: 6900 },
    { month: "Oct", price: 6900, predicted: 7000 },
    { month: "Nov", price: 7000, predicted: 7100 },
    { month: "Dec", price: 7100, predicted: 7200 },
  ],
}

// Sample retail connections data
const retailConnections = [
  {
    id: 1,
    name: "Organic Farmers Co-op",
    location: "Bangalore",
    products: "Vegetables, Fruits",
    rating: 4.8,
    priceOffered: "10% above market",
    contactPerson: "Rajesh Kumar",
    phone: "+91 9876543210",
  },
  {
    id: 2,
    name: "Green Harvest",
    location: "Chennai",
    products: "Grains, Pulses",
    rating: 4.6,
    priceOffered: "5% above market",
    contactPerson: "Lakshmi Devi",
    phone: "+91 9876543211",
  },
  {
    id: 3,
    name: "Farm Fresh Direct",
    location: "Hyderabad",
    products: "All Categories",
    rating: 4.7,
    priceOffered: "Market rate",
    contactPerson: "Venkat Reddy",
    phone: "+91 9876543212",
  },
  {
    id: 4,
    name: "Nature's Basket",
    location: "Multiple Locations",
    products: "Premium Produce",
    rating: 4.5,
    priceOffered: "15% above market",
    contactPerson: "Priya Singh",
    phone: "+91 9876543213",
  },
]

// Sample government schemes data
const governmentSchemes = [
  {
    id: 1,
    name: "PM-KISAN",
    description: "Income support of ₹6,000 per year to all farmer families",
    eligibility: "All farmer families with cultivable land",
    deadline: "Ongoing",
    link: "#",
  },
  {
    id: 2,
    name: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme with minimal premium",
    eligibility: "All farmers including sharecroppers",
    deadline: "Before crop season",
    link: "#",
  },
  {
    id: 3,
    name: "Kisan Credit Card",
    description: "Credit for agriculture and allied activities at low interest rates",
    eligibility: "All farmers, sharecroppers, and tenant farmers",
    deadline: "Ongoing",
    link: "#",
  },
  {
    id: 4,
    name: "Soil Health Card Scheme",
    description: "Soil testing and recommendations for nutrients",
    eligibility: "All farmers",
    deadline: "Ongoing",
    link: "#",
  },
]

export default function Dashboard() {
  const { t } = useLanguage()
  const [selectedCrop, setSelectedCrop] = useState("rice")
  const [timeframe, setTimeframe] = useState("yearly")
  const [activeTab, setActiveTab] = useState("price-intelligence")

  // Calculate price trends
  const selectedCropData = pricePredictionData[selectedCrop as keyof typeof pricePredictionData]
  const currentPrice = selectedCropData[selectedCropData.length - 1].price
  const predictedPrice = selectedCropData[selectedCropData.length - 1].predicted
  const priceDifference = predictedPrice - currentPrice
  const percentageChange = ((priceDifference / currentPrice) * 100).toFixed(2)
  const isPriceIncreasing = priceDifference > 0

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Track crop prices, connect with retailers, and access government schemes
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="price-intelligence" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Price Intelligence</span>
          </TabsTrigger>
          <TabsTrigger value="retail-connections" className="flex items-center gap-2">
            <Wheat className="h-4 w-4" />
            <span>Retail Connections</span>
          </TabsTrigger>
          <TabsTrigger value="government-schemes" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Government Schemes</span>
          </TabsTrigger>
        </TabsList>

        {/* Price Intelligence Tab */}
        <TabsContent value="price-intelligence" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Current Price</CardTitle>
                <CardDescription>
                  {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} (per quintal)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{currentPrice.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">As of {new Date().toLocaleDateString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Predicted Price</CardTitle>
                <CardDescription>Next month forecast</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{predictedPrice.toLocaleString()}</div>
                <div className="flex items-center gap-1 text-xs">
                  {isPriceIncreasing ? (
                    <>
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">+{percentageChange}%</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-3 w-3 text-red-500" />
                      <span className="text-red-500">{percentageChange}%</span>
                    </>
                  )}
                  <span className="text-muted-foreground">from current price</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Price Trend</CardTitle>
                <CardDescription>Last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {isPriceIncreasing ? (
                      <span className="text-green-500">Upward</span>
                    ) : (
                      <span className="text-red-500">Downward</span>
                    )}
                  </div>
                  <div>
                    {isPriceIncreasing ? (
                      <ArrowUp className="h-8 w-8 text-green-500" />
                    ) : (
                      <ArrowDown className="h-8 w-8 text-red-500" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Price Prediction Chart</CardTitle>
                  <CardDescription>Historical and predicted prices for {selectedCrop}</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="maize">Maize</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer
                  config={{
                    price: {
                      label: "Actual Price",
                      color: "hsl(var(--chart-1))",
                    },
                    predicted: {
                      label: "Predicted Price",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={pricePredictionData[selectedCrop as keyof typeof pricePredictionData]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="var(--color-price)"
                        name="Actual Price"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="var(--color-predicted)"
                        name="Predicted Price"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Comparison</CardTitle>
              <CardDescription>Compare prices across different crops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    rice: {
                      label: "Rice",
                      color: "hsl(var(--chart-1))",
                    },
                    wheat: {
                      label: "Wheat",
                      color: "hsl(var(--chart-2))",
                    },
                    maize: {
                      label: "Maize",
                      color: "hsl(var(--chart-3))",
                    },
                    cotton: {
                      label: "Cotton",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          month: "Current",
                          rice: pricePredictionData.rice[pricePredictionData.rice.length - 1].price,
                          wheat: pricePredictionData.wheat[pricePredictionData.wheat.length - 1].price,
                          maize: pricePredictionData.maize[pricePredictionData.maize.length - 1].price,
                          cotton: pricePredictionData.cotton[pricePredictionData.cotton.length - 1].price / 3, // Scaled for visualization
                        },
                        {
                          month: "Predicted",
                          rice: pricePredictionData.rice[pricePredictionData.rice.length - 1].predicted,
                          wheat: pricePredictionData.wheat[pricePredictionData.wheat.length - 1].predicted,
                          maize: pricePredictionData.maize[pricePredictionData.maize.length - 1].predicted,
                          cotton: pricePredictionData.cotton[pricePredictionData.cotton.length - 1].predicted / 3, // Scaled for visualization
                        },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="rice" fill="var(--color-rice)" name="Rice" />
                      <Bar dataKey="wheat" fill="var(--color-wheat)" name="Wheat" />
                      <Bar dataKey="maize" fill="var(--color-maize)" name="Maize" />
                      <Bar dataKey="cotton" fill="var(--color-cotton)" name="Cotton (÷3)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Retail Connections Tab */}
        <TabsContent value="retail-connections" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Retail Connections</CardTitle>
                  <CardDescription>Connect with retailers to sell your produce directly</CardDescription>
                </div>
                <Button>Add New Connection</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Price Offered</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {retailConnections.map((retailer) => (
                      <TableRow key={retailer.id}>
                        <TableCell className="font-medium">{retailer.name}</TableCell>
                        <TableCell>{retailer.location}</TableCell>
                        <TableCell>{retailer.products}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              retailer.priceOffered.includes("above")
                                ? "success"
                                : retailer.priceOffered.includes("below")
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {retailer.priceOffered}
                          </Badge>
                        </TableCell>
                        <TableCell>{retailer.rating}/5</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{retailer.contactPerson}</div>
                            <div className="text-muted-foreground">{retailer.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Contact
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Price Comparison</CardTitle>
                <CardDescription>Compare prices offered by different retailers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      marketPrice: {
                        label: "Market Price",
                        color: "hsl(var(--chart-1))",
                      },
                      organicFarmersCoop: {
                        label: "Organic Farmers Co-op",
                        color: "hsl(var(--chart-2))",
                      },
                      greenHarvest: {
                        label: "Green Harvest",
                        color: "hsl(var(--chart-3))",
                      },
                      farmFreshDirect: {
                        label: "Farm Fresh Direct",
                        color: "hsl(var(--chart-4))",
                      },
                      naturesBasket: {
                        label: "Nature's Basket",
                        color: "hsl(var(--chart-5))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          {
                            crop: "Rice",
                            marketPrice: 2200,
                            organicFarmersCoop: 2420,
                            greenHarvest: 2310,
                            farmFreshDirect: 2200,
                            naturesBasket: 2530,
                          },
                          {
                            crop: "Wheat",
                            marketPrice: 2400,
                            organicFarmersCoop: 2640,
                            greenHarvest: 2520,
                            farmFreshDirect: 2400,
                            naturesBasket: 2760,
                          },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="crop" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="marketPrice" fill="var(--color-marketPrice)" name="Market Price" />
                        <Bar
                          dataKey="organicFarmersCoop"
                          fill="var(--color-organicFarmersCoop)"
                          name="Organic Farmers Co-op"
                        />
                        <Bar dataKey="greenHarvest" fill="var(--color-greenHarvest)" name="Green Harvest" />
                        <Bar dataKey="farmFreshDirect" fill="var(--color-farmFreshDirect)" name="Farm Fresh Direct" />
                        <Bar dataKey="naturesBasket" fill="var(--color-naturesBasket)" name="Nature's Basket" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Retailer Ratings</CardTitle>
                <CardDescription>Compare retailer ratings and reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {retailConnections.map((retailer) => (
                    <div key={retailer.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{retailer.name}</div>
                        <div className="text-sm">{retailer.rating}/5</div>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${(retailer.rating / 5) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Based on {Math.floor(Math.random() * 100) + 20} reviews
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Government Schemes Tab */}
        <TabsContent value="government-schemes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Government Schemes</CardTitle>
                  <CardDescription>Access government schemes and subsidies for farmers</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Schemes</SelectItem>
                      <SelectItem value="subsidy">Subsidies</SelectItem>
                      <SelectItem value="loan">Loans</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">Search</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {governmentSchemes.map((scheme) => (
                  <Card key={scheme.id}>
                    <CardHeader className="p-4">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <CardTitle className="text-lg">{scheme.name}</CardTitle>
                        <Badge variant="outline">{scheme.deadline}</Badge>
                      </div>
                      <CardDescription>{scheme.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="text-sm font-medium">Eligibility</div>
                          <div className="text-sm text-muted-foreground">{scheme.eligibility}</div>
                        </div>
                        <Button asChild>
                          <a href={scheme.link}>Apply Now</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Scheme Application Status</CardTitle>
                <CardDescription>Track your scheme applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">PM-KISAN</div>
                      <Badge className="bg-green-500">Approved</Badge>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">Application ID: PMKISAN2023456789</div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div>Next installment due: June 2023</div>
                      <Button variant="link" className="h-auto p-0">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Kisan Credit Card</div>
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                        Pending
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">Application ID: KCC2023789012</div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div>Applied on: May 15, 2023</div>
                      <Button variant="link" className="h-auto p-0">
                        Check Status
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Important dates for scheme applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-medium">Pradhan Mantri Fasal Bima Yojana</div>
                      <div className="text-sm text-muted-foreground">Kharif Season</div>
                    </div>
                    <Badge variant="destructive">15 days left</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-medium">Soil Health Card Scheme</div>
                      <div className="text-sm text-muted-foreground">Sample Collection</div>
                    </div>
                    <Badge variant="outline">30 days left</Badge>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <div className="font-medium">Agricultural Infrastructure Fund</div>
                      <div className="text-sm text-muted-foreground">Project Proposal</div>
                    </div>
                    <Badge variant="outline">45 days left</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
