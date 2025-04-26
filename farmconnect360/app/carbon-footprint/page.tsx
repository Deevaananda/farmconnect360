"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Leaf, Tractor, Info, Download, BarChart3 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Form schema
const formSchema = z.object({
  farmSize: z.coerce.number().positive({
    message: "Farm size must be a positive number.",
  }),
  farmUnit: z.enum(["hectare", "acre"]),
  cropType: z.string({
    required_error: "Please select a crop type.",
  }),
  fertilizer: z.coerce.number().min(0),
  pesticide: z.coerce.number().min(0),
  irrigation: z.coerce.number().min(0),
  machinery: z.coerce.number().min(0),
  livestock: z.coerce.number().min(0),
  electricityUsage: z.coerce.number().min(0),
  fuelUsage: z.coerce.number().min(0),
})

export default function CarbonFootprint() {
  const { t } = useLanguage()
  const [calculationResult, setCalculationResult] = useState<any | null>(null)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmSize: 1,
      farmUnit: "hectare",
      fertilizer: 50,
      pesticide: 20,
      irrigation: 30,
      machinery: 40,
      livestock: 0,
      electricityUsage: 100,
      fuelUsage: 50,
    },
  })

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert farm size to hectares for calculation
    const farmSizeInHectares = values.farmUnit === "acre" ? values.farmSize * 0.404686 : values.farmSize

    // Calculate carbon footprint components (simplified calculation)
    const fertilizerEmissions = values.fertilizer * 3.5 * farmSizeInHectares
    const pesticideEmissions = values.pesticide * 2.5 * farmSizeInHectares
    const irrigationEmissions = values.irrigation * 0.5 * farmSizeInHectares
    const machineryEmissions = values.machinery * 2.0 * farmSizeInHectares
    const livestockEmissions = values.livestock * 5.0
    const electricityEmissions = values.electricityUsage * 0.8
    const fuelEmissions = values.fuelUsage * 2.5

    // Total emissions
    const totalEmissions =
      fertilizerEmissions +
      pesticideEmissions +
      irrigationEmissions +
      machineryEmissions +
      livestockEmissions +
      electricityEmissions +
      fuelEmissions

    // Carbon footprint per hectare
    const emissionsPerHectare = totalEmissions / farmSizeInHectares

    // Emissions breakdown
    const emissionsBreakdown = [
      {
        name: "Fertilizer",
        value: fertilizerEmissions,
        percentage: ((fertilizerEmissions / totalEmissions) * 100).toFixed(1),
      },
      {
        name: "Pesticide",
        value: pesticideEmissions,
        percentage: ((pesticideEmissions / totalEmissions) * 100).toFixed(1),
      },
      {
        name: "Irrigation",
        value: irrigationEmissions,
        percentage: ((irrigationEmissions / totalEmissions) * 100).toFixed(1),
      },
      {
        name: "Machinery",
        value: machineryEmissions,
        percentage: ((machineryEmissions / totalEmissions) * 100).toFixed(1),
      },
      {
        name: "Livestock",
        value: livestockEmissions,
        percentage: ((livestockEmissions / totalEmissions) * 100).toFixed(1),
      },
      {
        name: "Electricity",
        value: electricityEmissions,
        percentage: ((electricityEmissions / totalEmissions) * 100).toFixed(1),
      },
      { name: "Fuel", value: fuelEmissions, percentage: ((fuelEmissions / totalEmissions) * 100).toFixed(1) },
    ]

    // Determine carbon footprint rating
    let rating
    if (emissionsPerHectare < 500) {
      rating = { label: "Low", color: "green" }
    } else if (emissionsPerHectare < 1000) {
      rating = { label: "Moderate", color: "yellow" }
    } else {
      rating = { label: "High", color: "red" }
    }

    // Reduction recommendations based on highest emission sources
    const sortedEmissions = [...emissionsBreakdown].sort((a, b) => b.value - a.value)
    const topEmissionSources = sortedEmissions.slice(0, 3)

    const reductionRecommendations = topEmissionSources.map((source) => {
      switch (source.name) {
        case "Fertilizer":
          return {
            source: "Fertilizer",
            recommendations: [
              "Switch to organic fertilizers",
              "Implement precision agriculture techniques",
              "Use nitrogen-fixing cover crops",
              "Conduct regular soil tests to optimize fertilizer application",
            ],
            potentialReduction: "20-30%",
          }
        case "Pesticide":
          return {
            source: "Pesticide",
            recommendations: [
              "Implement integrated pest management (IPM)",
              "Use biological pest control methods",
              "Plant pest-resistant crop varieties",
              "Use targeted application methods to reduce overall usage",
            ],
            potentialReduction: "15-25%",
          }
        case "Irrigation":
          return {
            source: "Irrigation",
            recommendations: [
              "Install drip irrigation systems",
              "Implement rainwater harvesting",
              "Use soil moisture sensors to optimize irrigation timing",
              "Plant drought-resistant crop varieties",
            ],
            potentialReduction: "20-40%",
          }
        case "Machinery":
          return {
            source: "Machinery",
            recommendations: [
              "Optimize field operations to reduce tractor passes",
              "Maintain equipment regularly for fuel efficiency",
              "Consider no-till or reduced tillage practices",
              "Upgrade to more fuel-efficient machinery",
            ],
            potentialReduction: "10-20%",
          }
        case "Livestock":
          return {
            source: "Livestock",
            recommendations: [
              "Improve feed quality to reduce methane emissions",
              "Implement rotational grazing",
              "Manage manure properly",
              "Consider methane capture systems for larger operations",
            ],
            potentialReduction: "15-30%",
          }
        case "Electricity":
          return {
            source: "Electricity",
            recommendations: [
              "Install solar panels or wind turbines",
              "Use energy-efficient equipment",
              "Optimize timing of electricity usage",
              "Implement energy-saving practices in farm buildings",
            ],
            potentialReduction: "30-50%",
          }
        case "Fuel":
          return {
            source: "Fuel",
            recommendations: [
              "Reduce unnecessary equipment operation",
              "Maintain vehicles and machinery for optimal efficiency",
              "Consider biofuels or electric alternatives where possible",
              "Optimize transportation routes",
            ],
            potentialReduction: "10-25%",
          }
        default:
          return {
            source: source.name,
            recommendations: [
              "Analyze usage patterns",
              "Research efficient alternatives",
              "Implement best practices for your specific operation",
            ],
            potentialReduction: "10-20%",
          }
      }
    })

    setCalculationResult({
      totalEmissions,
      emissionsPerHectare,
      emissionsBreakdown,
      rating,
      reductionRecommendations,
    })
  }

  // Colors for pie chart
  const COLORS = ["#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722"]

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold tracking-tight">Carbon Footprint Calculator</h1>
        </div>
        <p className="text-muted-foreground">
          Measure and reduce your farm's environmental impact with our carbon footprint calculator
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Carbon Footprint Calculator</CardTitle>
              <CardDescription>
                Enter your farm details and practices to calculate your carbon footprint
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="farmSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farm Size</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" min="0.1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="farmUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="hectare">Hectare</SelectItem>
                              <SelectItem value="acre">Acre</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="cropType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Crop</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select crop" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="maize">Maize</SelectItem>
                            <SelectItem value="cotton">Cotton</SelectItem>
                            <SelectItem value="sugarcane">Sugarcane</SelectItem>
                            <SelectItem value="vegetables">Vegetables</SelectItem>
                            <SelectItem value="fruits">Fruits</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Farm Inputs</h3>

                    <FormField
                      control={form.control}
                      name="fertilizer"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="flex items-center">Fertilizer Usage (kg/ha)</FormLabel>
                            <span>{field.value} kg/ha</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={200}
                              step={5}
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
                      name="pesticide"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="flex items-center">Pesticide Usage (kg/ha)</FormLabel>
                            <span>{field.value} kg/ha</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={5}
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
                      name="irrigation"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="flex items-center">Irrigation Water (1000 m³/ha)</FormLabel>
                            <span>{field.value} units</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
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

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Farm Operations</h3>

                    <FormField
                      control={form.control}
                      name="machinery"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="flex items-center">Machinery Usage (hours/ha)</FormLabel>
                            <span>{field.value} hours/ha</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={100}
                              step={5}
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
                      name="livestock"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="flex items-center">Livestock (number of animals)</FormLabel>
                            <span>{field.value} animals</span>
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
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Energy Usage</h3>

                    <FormField
                      control={form.control}
                      name="electricityUsage"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="flex items-center">Electricity Usage (kWh/month)</FormLabel>
                            <span>{field.value} kWh/month</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={500}
                              step={10}
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
                      name="fuelUsage"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="flex items-center">Fuel Usage (liters/month)</FormLabel>
                            <span>{field.value} liters/month</span>
                          </div>
                          <FormControl>
                            <Slider
                              min={0}
                              max={500}
                              step={10}
                              defaultValue={[field.value]}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Calculate Carbon Footprint
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          {calculationResult ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Footprint Results</CardTitle>
                  <CardDescription>Based on your farm practices and operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Carbon Emissions</h3>
                      <div className="text-2xl font-bold">{calculationResult.totalEmissions.toFixed(2)} kg CO₂e</div>
                    </div>
                    <div className="rounded-lg bg-muted p-4 text-center">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Per Hectare</h3>
                      <div className="text-2xl font-bold">
                        {calculationResult.emissionsPerHectare.toFixed(2)} kg CO₂e/ha
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium mb-2">Carbon Footprint Rating</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-4 w-4 rounded-full ${
                            calculationResult.rating.color === "green"
                              ? "bg-green-500"
                              : calculationResult.rating.color === "yellow"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                        ></div>
                        <span className="font-medium">{calculationResult.rating.label}</span>
                      </div>
                      <div>
                        <Badge
                          variant={
                            calculationResult.rating.color === "green"
                              ? "success"
                              : calculationResult.rating.color === "yellow"
                                ? "warning"
                                : "destructive"
                          }
                        >
                          {calculationResult.rating.label} Impact
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={`h-full rounded-full ${
                            calculationResult.rating.color === "green"
                              ? "bg-green-500"
                              : calculationResult.rating.color === "yellow"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{
                            width: `${Math.min(100, (calculationResult.emissionsPerHectare / 1500) * 100)}%`,
                          }}
                        ></div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>Low Impact</span>
                        <span>Moderate Impact</span>
                        <span>High Impact</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Emissions Breakdown</h3>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <div className="w-full md:w-1/2 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={calculationResult.emissionsBreakdown}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percentage }) => `${name}: ${percentage}%`}
                            >
                              {calculationResult.emissionsBreakdown.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value.toFixed(2)} kg CO₂e`, "Emissions"]} />
                            <Legend />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="w-full md:w-1/2">
                        <div className="space-y-2">
                          {calculationResult.emissionsBreakdown.map((item: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-3 w-3 rounded-full"
                                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span>{item.name}</span>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{item.value.toFixed(2)} kg CO₂e</div>
                                <div className="text-xs text-muted-foreground">{item.percentage}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reduction Recommendations</CardTitle>
                  <CardDescription>Actionable steps to reduce your carbon footprint</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {calculationResult.reductionRecommendations.map((rec: any, index: number) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{rec.source} Emissions</h3>
                          <Badge variant="outline">Potential Reduction: {rec.potentialReduction}</Badge>
                        </div>
                        <ul className="space-y-2 mt-2">
                          {rec.recommendations.map((item: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <Leaf className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button className="flex-1" variant="outline" onClick={() => setCalculationResult(null)}>
                  Reset Calculator
                </Button>
                <Button className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Why Calculate Your Carbon Footprint?</CardTitle>
                <CardDescription>
                  Understanding your farm's environmental impact is the first step toward sustainable agriculture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Sustainable Farming</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Measuring your carbon footprint helps identify areas where you can reduce emissions and adopt more
                    sustainable farming practices.
                  </p>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tractor className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Operational Efficiency</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Many carbon reduction strategies also improve farm efficiency, reducing costs and increasing
                    profitability.
                  </p>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-green-500" />
                    <h3 className="font-medium">Market Access</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consumers increasingly prefer products with lower carbon footprints. Measuring and reducing your
                    emissions can open new market opportunities.
                  </p>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>How it works</AlertTitle>
                  <AlertDescription>
                    Our calculator uses standardized emission factors based on agricultural research to estimate your
                    farm's carbon footprint. Fill out the form to get your personalized results.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
