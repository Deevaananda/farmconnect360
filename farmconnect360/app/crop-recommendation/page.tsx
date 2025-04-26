"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Thermometer, Droplet, CloudRain, Info } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define the form schema
const formSchema = z.object({
  soilType: z.string({
    required_error: "Please select a soil type.",
  }),
  region: z.string({
    required_error: "Please select a region.",
  }),
  temperature: z.number().min(0).max(50),
  humidity: z.number().min(0).max(100),
  rainfall: z.number().min(0).max(500),
  ph: z.number().min(0).max(14),
  nitrogen: z.number().min(0).max(200),
  phosphorus: z.number().min(0).max(200),
  potassium: z.number().min(0).max(200),
  useIoT: z.boolean().default(false),
})

// Sample crop data with explanations
const cropRecommendations = [
  {
    id: 1,
    name: "Rice",
    confidence: 92,
    suitability: "Excellent",
    image: "/placeholder.svg?height=100&width=100",
    explanation:
      "Rice is recommended due to the high rainfall in your region, suitable soil pH, and optimal temperature range. It thrives in your clay soil type and has historically performed well in similar conditions.",
    fertilizers: {
      organic: ["Farmyard Manure", "Green Manure", "Compost"],
      synthetic: ["Urea", "DAP", "MOP"],
    },
    expectedYield: "5.5-6.5 tons/hectare",
    marketPrice: "₹1,800-2,200/quintal",
    growingPeriod: "90-120 days",
  },
  {
    id: 2,
    name: "Wheat",
    confidence: 85,
    suitability: "Good",
    image: "/placeholder.svg?height=100&width=100",
    explanation:
      "Wheat is suitable for your loamy soil and moderate rainfall conditions. The nitrogen and phosphorus levels in your soil support wheat growth, though potassium supplementation may be beneficial.",
    fertilizers: {
      organic: ["Compost", "Vermicompost", "Bone Meal"],
      synthetic: ["Urea", "SSP", "MOP"],
    },
    expectedYield: "3.5-4.5 tons/hectare",
    marketPrice: "₹2,000-2,400/quintal",
    growingPeriod: "100-150 days",
  },
  {
    id: 3,
    name: "Maize",
    confidence: 78,
    suitability: "Moderate",
    image: "/placeholder.svg?height=100&width=100",
    explanation:
      "Maize can grow in your soil conditions, but may require additional irrigation due to the rainfall patterns in your region. The temperature range is suitable for maize cultivation.",
    fertilizers: {
      organic: ["Farmyard Manure", "Compost", "Green Manure"],
      synthetic: ["Urea", "DAP", "MOP"],
    },
    expectedYield: "4.0-5.0 tons/hectare",
    marketPrice: "₹1,700-2,100/quintal",
    growingPeriod: "80-110 days",
  },
]

export default function CropRecommendation() {
  const { t } = useLanguage()
  const [recommendations, setRecommendations] = useState<typeof cropRecommendations | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [weatherForecast, setWeatherForecast] = useState({
    temperature: [28, 29, 30, 31, 30, 29, 28],
    rainfall: [0, 5, 10, 15, 10, 5, 0],
    humidity: [65, 70, 75, 80, 75, 70, 65],
  })

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      temperature: 25,
      humidity: 60,
      rainfall: 100,
      ph: 7,
      nitrogen: 80,
      phosphorus: 50,
      potassium: 40,
      useIoT: false,
    },
  })

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    console.log(values)

    // Simulate API call
    setTimeout(() => {
      setRecommendations(cropRecommendations)
      setIsLoading(false)
    }, 1500)
  }

  // Soil types and regions
  const soilTypes = [
    { value: "clay", label: "Clay" },
    { value: "sandy", label: "Sandy" },
    { value: "loamy", label: "Loamy" },
    { value: "silt", label: "Silt" },
    { value: "peat", label: "Peat" },
    { value: "chalky", label: "Chalky" },
  ]

  const regions = [
    { value: "karnataka", label: "Karnataka" },
    { value: "tamilnadu", label: "Tamil Nadu" },
    { value: "andhra", label: "Andhra Pradesh" },
    { value: "telangana", label: "Telangana" },
    { value: "kerala", label: "Kerala" },
    { value: "maharashtra", label: "Maharashtra" },
  ]

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{t("crops.title")}</h1>
        <p className="text-muted-foreground">{t("crops.subtitle")}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
              <CardDescription>
                Enter your soil and environmental parameters to get personalized crop recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">Manual Input</TabsTrigger>
                  <TabsTrigger value="iot">IoT Devices</TabsTrigger>
                </TabsList>
                <TabsContent value="manual">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="soilType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("crops.soil-type")}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select soil type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {soilTypes.map((soil) => (
                                    <SelectItem key={soil.value} value={soil.value}>
                                      {soil.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="region"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("crops.region")}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select region" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {regions.map((region) => (
                                    <SelectItem key={region.value} value={region.value}>
                                      {region.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Weather Parameters</h3>
                        <FormField
                          control={form.control}
                          name="temperature"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel className="flex items-center">
                                  <Thermometer className="mr-2 h-4 w-4" />
                                  Temperature (°C)
                                </FormLabel>
                                <span>{field.value}°C</span>
                              </div>
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={50}
                                  step={1}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="humidity"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel className="flex items-center">
                                  <Droplet className="mr-2 h-4 w-4" />
                                  Humidity (%)
                                </FormLabel>
                                <span>{field.value}%</span>
                              </div>
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={100}
                                  step={1}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="rainfall"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel className="flex items-center">
                                  <CloudRain className="mr-2 h-4 w-4" />
                                  Rainfall (mm)
                                </FormLabel>
                                <span>{field.value} mm</span>
                              </div>
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={500}
                                  step={5}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Soil Parameters</h3>
                        <FormField
                          control={form.control}
                          name="ph"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel>Soil pH</FormLabel>
                                <span>{field.value}</span>
                              </div>
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={14}
                                  step={0.1}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="nitrogen"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel>Nitrogen (kg/ha)</FormLabel>
                                <span>{field.value} kg/ha</span>
                              </div>
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={200}
                                  step={1}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phosphorus"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel>Phosphorus (kg/ha)</FormLabel>
                                <span>{field.value} kg/ha</span>
                              </div>
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={200}
                                  step={1}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="potassium"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between">
                                <FormLabel>Potassium (kg/ha)</FormLabel>
                                <span>{field.value} kg/ha</span>
                              </div>
                              <FormControl>
                                <Slider
                                  min={0}
                                  max={200}
                                  step={1}
                                  defaultValue={[field.value]}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="useIoT"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Connect to IoT Devices</FormLabel>
                              <FormDescription>
                                Use data from your connected IoT devices for more accurate recommendations.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Analyzing..." : "Get Recommendations"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                <TabsContent value="iot">
                  <div className="space-y-4 py-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium mb-2">IoT Device Integration</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect your IoT devices to get real-time soil and weather data for more accurate
                        recommendations.
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Soil Moisture Sensor</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Connected</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Weather Station</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Connected</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            <span>Soil Nutrient Sensor</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Disconnected</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                            <span>Irrigation Controller</span>
                          </div>
                          <span className="text-sm text-muted-foreground">Connecting...</span>
                        </div>
                      </div>
                      <Button className="mt-4 w-full">Scan for Devices</Button>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium mb-2">Sensor Readings</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg bg-muted p-3">
                            <div className="text-sm font-medium">Soil Moisture</div>
                            <div className="text-2xl font-bold">42%</div>
                          </div>
                          <div className="rounded-lg bg-muted p-3">
                            <div className="text-sm font-medium">Soil Temperature</div>
                            <div className="text-2xl font-bold">24°C</div>
                          </div>
                          <div className="rounded-lg bg-muted p-3">
                            <div className="text-sm font-medium">Air Temperature</div>
                            <div className="text-2xl font-bold">28°C</div>
                          </div>
                          <div className="rounded-lg bg-muted p-3">
                            <div className="text-sm font-medium">Humidity</div>
                            <div className="text-2xl font-bold">65%</div>
                          </div>
                        </div>
                      </div>
                      <Button className="mt-4 w-full">Use Sensor Data</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Weather Forecast Card */}
          <Card>
            <CardHeader>
              <CardTitle>7-Day Weather Forecast</CardTitle>
              <CardDescription>Future weather predictions for your region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <span className="text-sm font-medium">{day}</span>
                    <div className="my-2">
                      {i === 2 || i === 3 ? (
                        <CloudRain className="h-8 w-8 text-blue-500" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-yellow-400"></div>
                      )}
                    </div>
                    <span className="text-sm font-bold">{weatherForecast.temperature[i]}°C</span>
                    <span className="text-xs text-muted-foreground">{weatherForecast.rainfall[i]}mm</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations Card */}
          {recommendations && (
            <Card>
              <CardHeader>
                <CardTitle>Recommended Crops</CardTitle>
                <CardDescription>Based on your soil type, region, and environmental conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recommendations.map((crop) => (
                    <div key={crop.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 overflow-hidden rounded-lg">
                            <img
                              alt={crop.name}
                              className="h-full w-full object-cover"
                              src={crop.image || "/placeholder.svg"}
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold">{crop.name}</h3>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  crop.confidence > 90
                                    ? "bg-green-100 text-green-800"
                                    : crop.confidence > 80
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-orange-100 text-orange-800"
                                }`}
                              >
                                {crop.confidence}% Match
                              </span>
                              <span className="text-sm text-muted-foreground">{crop.suitability} Suitability</span>
                            </div>
                          </div>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Info className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-sm">{crop.explanation}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      <Separator className="my-4" />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium">Recommended Fertilizers</h4>
                          <div className="mt-2 space-y-2">
                            <div>
                              <span className="text-xs font-medium">Organic:</span>
                              <ul className="ml-4 list-disc text-xs">
                                {crop.fertilizers.organic.map((f, i) => (
                                  <li key={i}>{f}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="text-xs font-medium">Synthetic:</span>
                              <ul className="ml-4 list-disc text-xs">
                                {crop.fertilizers.synthetic.map((f, i) => (
                                  <li key={i}>{f}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Crop Information</h4>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between">
                              <span className="text-xs">Expected Yield:</span>
                              <span className="text-xs font-medium">{crop.expectedYield}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs">Market Price:</span>
                              <span className="text-xs font-medium">{crop.marketPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs">Growing Period:</span>
                              <span className="text-xs font-medium">{crop.growingPeriod}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button className="w-full">View Detailed Report</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
