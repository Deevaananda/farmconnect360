"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Camera, Upload, X, Check, AlertTriangle, Leaf, Droplet, Sprout } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function DiseaseDetection() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("upload")
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [description, setDescription] = useState("")
  const [fertilizer, setFertilizer] = useState<"organic" | "synthetic" | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = () => {
    // Simulate camera capture with a placeholder image
    setImage("/placeholder.svg?height=300&width=400")
    setResult(null)
  }

  const handleAnalyze = () => {
    if (!image) return

    setIsAnalyzing(true)

    // Simulate API call to PlantNet or similar service
    setTimeout(() => {
      setResult({
        disease: "Late Blight",
        confidence: 92,
        plant: "Tomato",
        scientificName: "Phytophthora infestans",
        severity: "Moderate",
        description:
          "Late blight is a potentially devastating disease of tomato and potato, infecting leaves, stems, and fruits of tomato plants. The disease spreads quickly in fields and can result in total crop failure if untreated.",
        symptoms: [
          "Water-soaked spots on leaves",
          "Dark brown lesions on stems",
          "Fuzzy white fungal growth on undersides of leaves",
          "Rapidly spreading infection",
        ],
        causes: [
          "Fungal pathogen (Phytophthora infestans)",
          "Cool, wet weather conditions",
          "Poor air circulation",
          "Overhead irrigation",
        ],
        treatments: {
          organic: ["Copper-based fungicides", "Neem oil spray", "Compost tea", "Baking soda solution"],
          synthetic: ["Chlorothalonil", "Mancozeb", "Metalaxyl", "Azoxystrobin"],
        },
        prevention: [
          "Use disease-resistant varieties",
          "Ensure proper plant spacing for air circulation",
          "Avoid overhead watering",
          "Practice crop rotation",
          "Remove and destroy infected plant material",
          "Apply preventative fungicides during wet weather",
        ],
        impact:
          "If left untreated, late blight can destroy entire crops within days under favorable conditions. It was responsible for the Irish Potato Famine in the 1840s.",
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleReset = () => {
    setImage(null)
    setResult(null)
    setDescription("")
    setFertilizer(null)
  }

  const handleSubmitDescription = () => {
    // In a real app, this would send the description to the backend
    // to refine the disease detection algorithm
    console.log("Description submitted:", description)
    // Show a success message or update UI
  }

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Plant Disease Detection</h1>
        <p className="text-muted-foreground">
          Upload or capture a photo of your plant to identify diseases and get treatment recommendations.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upload or Capture Image</CardTitle>
              <CardDescription>Take a clear photo of the affected plant part (leaves, stems, fruits)</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Image</TabsTrigger>
                  <TabsTrigger value="camera">Use Camera</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="space-y-4">
                  <div
                    className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Click to upload</h3>
                    <p className="text-sm text-muted-foreground mt-1">or drag and drop your image here</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="camera" className="space-y-4">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                    <Camera className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Use your camera</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">Take a clear photo of the affected plant</p>
                    <Button onClick={handleCameraCapture}>Capture Photo</Button>
                  </div>
                </TabsContent>
              </Tabs>

              {image && (
                <div className="mt-6 space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <img src={image || "/placeholder.svg"} alt="Plant" className="w-full h-auto object-cover" />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={handleReset}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Additional Information (Optional)</h3>
                    <Textarea
                      placeholder="Describe the symptoms, plant age, growing conditions, etc."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Fertilizer Preference</h3>
                    <RadioGroup value={fertilizer || ""} onValueChange={(value) => setFertilizer(value as any)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organic" id="organic" />
                        <Label htmlFor="organic">Organic Fertilizers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="synthetic" id="synthetic" />
                        <Label htmlFor="synthetic">Synthetic Fertilizers</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button className="w-full" onClick={handleAnalyze} disabled={isAnalyzing}>
                    {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          {isAnalyzing ? (
            <Card>
              <CardHeader>
                <CardTitle>Analyzing Image</CardTitle>
                <CardDescription>Our AI is analyzing your plant image to identify diseases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing image</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Identifying plant species</span>
                    <span>80%</span>
                  </div>
                  <Progress value={80} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Detecting diseases</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Generating recommendations</span>
                    <span>30%</span>
                  </div>
                  <Progress value={30} />
                </div>
              </CardContent>
            </Card>
          ) : result ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{result.disease}</CardTitle>
                    <CardDescription>
                      Detected on {result.plant} ({result.scientificName})
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      result.severity === "Severe"
                        ? "destructive"
                        : result.severity === "Moderate"
                          ? "warning"
                          : "outline"
                    }
                  >
                    {result.severity} Severity
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <h3 className="text-lg font-medium">About This Disease</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Leaf className="h-5 w-5 text-green-500" />
                      <h3 className="text-lg font-medium">Symptoms</h3>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {result.symptoms.map((symptom: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Sprout className="h-5 w-5 text-red-500" />
                      <h3 className="text-lg font-medium">Causes</h3>
                    </div>
                    <ul className="space-y-1 text-sm">
                      {result.causes.map((cause: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Droplet className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">Treatment Recommendations</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Organic Solutions</h4>
                      <ul className="space-y-1 text-sm">
                        {result.treatments.organic.map((treatment: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                            <span>{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Synthetic Solutions</h4>
                      <ul className="space-y-1 text-sm">
                        {result.treatments.synthetic.map((treatment: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-4 w-4 mr-2 text-blue-500 shrink-0" />
                            <span>{treatment}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-medium">Prevention</h3>
                  </div>
                  <ul className="space-y-1 text-sm">
                    {result.prevention.map((prevention: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{prevention}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="text-sm font-medium mb-2">Educational Note</h3>
                  <p className="text-sm text-muted-foreground">{result.impact}</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full" variant="outline" onClick={handleReset}>
                  Scan Another Plant
                </Button>
                <Button className="w-full">Download Detailed Report</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Disease Detection Results</CardTitle>
                <CardDescription>Upload or capture a photo to see disease detection results here</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <Leaf className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No Image Analyzed Yet</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  Upload or capture a photo of your plant to identify diseases and get treatment recommendations.
                </p>
              </CardContent>
            </Card>
          )}

          {description && !isAnalyzing && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>This information helps improve our disease detection accuracy</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{description}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSubmitDescription}>
                  Submit Additional Information
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
