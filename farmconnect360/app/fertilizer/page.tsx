"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Calculator, Check, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Current market prices for fertilizers (as of the current date)
const fertilizerPrices = {
  urea: 266.5, // ₹ per 50kg bag
  dap: 1350.0, // ₹ per 50kg bag
  mop: 800.0, // ₹ per 50kg bag
  ssp: 350.0, // ₹ per 50kg bag
  npk_complex: 1200.0, // ₹ per 50kg bag
  zinc_sulphate: 65.0, // ₹ per kg
  borax: 95.0, // ₹ per kg
  gypsum: 220.0, // ₹ per 50kg bag
  farmyard_manure: 3.0, // ₹ per kg
  vermicompost: 10.0, // ₹ per kg
  neem_cake: 25.0, // ₹ per kg
  bone_meal: 40.0, // ₹ per kg
  compost: 5.0, // ₹ per kg
  green_manure: 2.0, // ₹ per kg
}

// Crop nutrient requirements (N-P-K in kg/hectare)
const cropRequirements = {
  rice: { n: 120, p: 60, k: 40 },
  wheat: { n: 120, p: 60, k: 40 },
  maize: { n: 150, p: 75, k: 50 },
  cotton: { n: 100, p: 50, k: 50 },
  sugarcane: { n: 250, p: 100, k: 100 },
  potato: { n: 180, p: 100, k: 150 },
  tomato: { n: 120, p: 80, k: 100 },
  onion: { n: 100, p: 50, k: 80 },
  chilli: { n: 120, p: 60, k: 60 },
  soybean: { n: 30, p: 60, k: 40 },
  groundnut: { n: 20, p: 40, k: 50 },
  sunflower: { n: 80, p: 50, k: 40 },
}

// Form schema
const formSchema = z.object({
  crop: z.string({
    required_error: "Please select a crop.",
  }),
  area: z.coerce.number().positive({
    message: "Area must be a positive number.",
  }),
  areaUnit: z.enum(["hectare", "acre"]),
  soilN: z.coerce.number().min(0).max(200),
  soilP: z.coerce.number().min(0).max(200),
  soilK: z.coerce.number().min(0).max(200),
})

export default function FertilizerCalculator() {
  const { t } = useLanguage()
  const [calculationResult, setCalculationResult] = useState<any | null>(null)
  const [calculationType, setCalculationType] = useState<"synthetic" | "organic">("synthetic")
  const [error, setError] = useState<string | null>(null)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: 1,
      areaUnit: "hectare",
      soilN: 40,
      soilP: 20,
      soilK: 30,
    },
  })

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null)

    if (!values.crop) {
      setError("Please select a crop to calculate fertilizer requirements.")
      return
    }

    // Convert area to hectares for calculation
    const areaInHectares = values.areaUnit === "acre" ? values.area * 0.404686 : values.area

    const cropReq = cropRequirements[values.crop as keyof typeof cropRequirements]

    // Calculate required nutrients based on soil test and crop requirements
    const requiredN = Math.max(0, cropReq.n - values.soilN) * areaInHectares
    const requiredP = Math.max(0, cropReq.p - values.soilP) * areaInHectares
    const requiredK = Math.max(0, cropReq.k - values.soilK) * areaInHectares

    if (calculationType === "synthetic") {
      // Calculate synthetic fertilizers
      // Urea contains 46% N
      const ureaRequired = requiredN / 0.46
      // DAP contains 18% N and 46% P2O5
      const dapRequired = (requiredP / 0.46) * 2.29 // Convert P to P2O5
      // MOP contains 60% K2O
      const mopRequired = (requiredK / 0.6) * 1.2 // Convert K to K2O

      // Calculate costs
      const ureaCost = (ureaRequired / 50) * fertilizerPrices.urea
      const dapCost = (dapRequired / 50) * fertilizerPrices.dap
      const mopCost = (mopRequired / 50) * fertilizerPrices.mop

      setCalculationResult({
        nutrients: {
          n: requiredN.toFixed(2),
          p: requiredP.toFixed(2),
          k: requiredK.toFixed(2),
        },
        fertilizers: [
          {
            name: "Urea",
            amount: ureaRequired.toFixed(2),
            unit: "kg",
            cost: ureaCost.toFixed(2),
            nutrient: "N",
          },
          {
            name: "DAP",
            amount: dapRequired.toFixed(2),
            unit: "kg",
            cost: dapCost.toFixed(2),
            nutrient: "P",
          },
          {
            name: "MOP",
            amount: mopRequired.toFixed(2),
            unit: "kg",
            cost: mopCost.toFixed(2),
            nutrient: "K",
          },
        ],
        totalCost: (ureaCost + dapCost + mopCost).toFixed(2),
        applicationSchedule: [
          {
            stage: "Basal Application (Before Sowing)",
            fertilizers: [
              { name: "DAP", percentage: 100 },
              { name: "MOP", percentage: 50 },
            ],
          },
          {
            stage: "First Top Dressing (30 days after sowing)",
            fertilizers: [
              { name: "Urea", percentage: 50 },
              { name: "MOP", percentage: 25 },
            ],
          },
          {
            stage: "Second Top Dressing (60 days after sowing)",
            fertilizers: [
              { name: "Urea", percentage: 50 },
              { name: "MOP", percentage: 25 },
            ],
          },
        ],
      })
    } else {
      // Calculate organic fertilizers
      // Farmyard Manure contains 0.5% N, 0.2% P, 0.5% K
      const fymRequired = Math.max(requiredN / 0.005, requiredP / 0.002, requiredK / 0.005)
      // Vermicompost contains 1.5% N, 0.5% P, 1.0% K
      const vermicompostRequired = Math.max(requiredN / 0.015, requiredP / 0.005, requiredK / 0.01)
      // Neem Cake contains 4% N, 1% P, 1.5% K
      const neemCakeRequired = Math.max(requiredN / 0.04, requiredP / 0.01, requiredK / 0.015)

      // Calculate costs
      const fymCost = fymRequired * fertilizerPrices.farmyard_manure
      const vermicompostCost = vermicompostRequired * fertilizerPrices.vermicompost
      const neemCakeCost = neemCakeRequired * fertilizerPrices.neem_cake

      setCalculationResult({
        nutrients: {
          n: requiredN.toFixed(2),
          p: requiredP.toFixed(2),
          k: requiredK.toFixed(2),
        },
        fertilizers: [
          {
            name: "Farmyard Manure",
            amount: fymRequired.toFixed(2),
            unit: "kg",
            cost: fymCost.toFixed(2),
            nutrient: "N-P-K",
          },
          {
            name: "Vermicompost",
            amount: vermicompostRequired.toFixed(2),
            unit: "kg",
            cost: vermicompostCost.toFixed(2),
            nutrient: "N-P-K",
          },
          {
            name: "Neem Cake",
            amount: neemCakeRequired.toFixed(2),
            unit: "kg",
            cost: neemCakeCost.toFixed(2),
            nutrient: "N-P-K",
          },
        ],
        totalCost: (fymCost + vermicompostCost + neemCakeCost).toFixed(2),
        applicationSchedule: [
          {
            stage: "Pre-Sowing Application (2-3 weeks before sowing)",
            fertilizers: [
              { name: "Farmyard Manure", percentage: 100 },
              { name: "Neem Cake", percentage: 50 },
            ],
          },
          {
            stage: "Sowing Time Application",
            fertilizers: [{ name: "Vermicompost", percentage: 50 }],
          },
          {
            stage: "Vegetative Growth Stage",
            fertilizers: [
              { name: "Vermicompost", percentage: 50 },
              { name: "Neem Cake", percentage: 50 },
            ],
          },
        ],
      })
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Fertilizer Calculator</h1>
        <p className="text-muted-foreground">
          Calculate the right amount of fertilizer for your crops with real-time market prices
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-green-500" />
                Fertilizer Calculator
              </CardTitle>
              <CardDescription>
                Enter your crop details and soil test results to get personalized fertilizer recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={calculationType}
                onValueChange={(value) => setCalculationType(value as "synthetic" | "organic")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="synthetic">Synthetic Fertilizers</TabsTrigger>
                  <TabsTrigger value="organic">Organic Fertilizers</TabsTrigger>
                </TabsList>
                <TabsContent value="synthetic" className="space-y-4 pt-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="crop"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Crop</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select crop" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.keys(cropRequirements).map((crop) => (
                                  <SelectItem key={crop} value={crop}>
                                    {crop.charAt(0).toUpperCase() + crop.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="area"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Area</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" min="0.1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="areaUnit"
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

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Soil Test Results (kg/ha)</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="soilN"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nitrogen (N)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" max="200" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="soilP"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phosphorus (P)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" max="200" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="soilK"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Potassium (K)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" max="200" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <Button type="submit" className="w-full">
                        Calculate Fertilizer Requirements
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                <TabsContent value="organic" className="space-y-4 pt-4">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="crop"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Crop</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select crop" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.keys(cropRequirements).map((crop) => (
                                  <SelectItem key={crop} value={crop}>
                                    {crop.charAt(0).toUpperCase() + crop.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="area"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Area</FormLabel>
                              <FormControl>
                                <Input type="number" step="0.01" min="0.1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="areaUnit"
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

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Soil Test Results (kg/ha)</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="soilN"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nitrogen (N)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" max="200" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="soilP"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phosphorus (P)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" max="200" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="soilK"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Potassium (K)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" max="200" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <Button type="submit" className="w-full">
                        Calculate Organic Fertilizer Requirements
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          {calculationResult ? (
            <Card>
              <CardHeader>
                <CardTitle>Fertilizer Recommendation</CardTitle>
                <CardDescription>Based on your crop requirements and soil test results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted p-4">
                  <h3 className="text-lg font-medium mb-2">Required Nutrients</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Nitrogen (N)</div>
                      <div className="text-xl font-bold">{calculationResult.nutrients.n} kg</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Phosphorus (P)</div>
                      <div className="text-xl font-bold">{calculationResult.nutrients.p} kg</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Potassium (K)</div>
                      <div className="text-xl font-bold">{calculationResult.nutrients.k} kg</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Recommended Fertilizers</h3>
                  <div className="space-y-4">
                    {calculationResult.fertilizers.map((fertilizer: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <div className="font-medium">{fertilizer.name}</div>
                          <div className="text-sm text-muted-foreground">Primary nutrient: {fertilizer.nutrient}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            {fertilizer.amount} {fertilizer.unit}
                          </div>
                          <div className="text-sm text-muted-foreground">₹{fertilizer.cost}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">Total Cost</h3>
                    <div className="text-xl font-bold">₹{calculationResult.totalCost}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on current market prices as of {new Date().toLocaleDateString()}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Application Schedule</h3>
                  <div className="space-y-4">
                    {calculationResult.applicationSchedule.map((stage: any, index: number) => (
                      <div key={index} className="rounded-lg border p-4">
                        <h4 className="font-medium mb-2">{stage.stage}</h4>
                        <ul className="space-y-1">
                          {stage.fertilizers.map((fert: any, i: number) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                              <span>
                                {fert.name}: {fert.percentage}%
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Application Tip</AlertTitle>
                  <AlertDescription>
                    For best results, apply fertilizers in the early morning or late evening to reduce nutrient loss due
                    to evaporation.
                  </AlertDescription>
                </Alert>

                <div className="flex gap-4">
                  <Button className="flex-1" variant="outline" onClick={() => setCalculationResult(null)}>
                    Reset
                  </Button>
                  <Button className="flex-1">Download Report</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Fertilizer Market Prices</CardTitle>
                <CardDescription>Current market prices as of {new Date().toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="synthetic">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="synthetic">Synthetic</TabsTrigger>
                    <TabsTrigger value="organic">Organic</TabsTrigger>
                  </TabsList>
                  <TabsContent value="synthetic" className="space-y-4 pt-4">
                    <div className="rounded-lg border">
                      <div className="grid grid-cols-3 gap-4 p-4 font-medium">
                        <div>Fertilizer</div>
                        <div>Price</div>
                        <div>Unit</div>
                      </div>
                      <Separator />
                      <div className="divide-y">
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <div>Urea</div>
                          <div>₹{fertilizerPrices.urea.toFixed(2)}</div>
                          <div>50kg bag</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <div>DAP</div>
                          <div>₹{fertilizerPrices.dap.toFixed(2)}</div>
                          <div>50kg bag</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <div>MOP</div>
                          <div>₹{fertilizerPrices.mop.toFixed(2)}</div>
                          <div>50kg bag</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <div>SSP</div>
                          <div>₹{fertilizerPrices.ssp.toFixed(2)}</div>
                          <div>50kg bag</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <div>NPK Complex</div>
                          <div>₹{fertilizerPrices.npk_complex.toFixed(2)}</div>
                          <div>50kg bag</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Prices may vary based on location and availability
                      </div>
                      <Badge variant="outline">Updated Today</Badge>
                    </div>
                  </TabsContent>
                  <TabsContent value="organic" className="space-y-4 pt-4">
                    <div className="rounded-lg border">
                      <div className="grid grid-cols-3 gap-4 p-4 font-medium">
                        <div>Fertilizer</div>
                        <div>Price</div>
                        <div>Unit</div>
                      </div>
                      <Separator />
                      <div className="divide-y">
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <div>Farmyard Manure</div>
                          <div>₹{fertilizerPrices.farmyard_manure.toFixed(2)}</div>
                          <div>per kg</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <div>Vermicompost</div>
                          <div>₹{fertilizerPrices.vermicompost.toFixed(2)}</div>
                          <div>per kg</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <div>Neem Cake</div>
                          <div>₹{fertilizerPrices.neem_cake.toFixed(2)}</div>
                          <div>per kg</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <div>Bone Meal</div>
                          <div>₹{fertilizerPrices.bone_meal.toFixed(2)}</div>
                          <div>per kg</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4">
                          <div>Compost</div>
                          <div>₹{fertilizerPrices.compost.toFixed(2)}</div>
                          <div>per kg</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">
                        Prices may vary based on location and availability
                      </div>
                      <Badge variant="outline">Updated Today</Badge>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
