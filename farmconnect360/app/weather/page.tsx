"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Search, CloudRain, Droplet, Wind, Sun, Cloud, CloudLightning, AlertTriangle, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Sample weather data
const weatherData = {
  current: {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    precipitation: 0,
    condition: "Clear",
    feelsLike: 30,
    pressure: 1012,
    visibility: 10,
    uvIndex: 7,
  },
  hourly: [
    { time: "Now", temp: 28, condition: "Clear", icon: Sun },
    { time: "12 PM", temp: 30, condition: "Clear", icon: Sun },
    { time: "1 PM", temp: 31, condition: "Clear", icon: Sun },
    { time: "2 PM", temp: 32, condition: "Partly Cloudy", icon: Cloud },
    { time: "3 PM", temp: 31, condition: "Partly Cloudy", icon: Cloud },
    { time: "4 PM", temp: 30, condition: "Cloudy", icon: Cloud },
    { time: "5 PM", temp: 29, condition: "Cloudy", icon: Cloud },
    { time: "6 PM", temp: 28, condition: "Cloudy", icon: Cloud },
    { time: "7 PM", temp: 27, condition: "Cloudy", icon: Cloud },
    { time: "8 PM", temp: 26, condition: "Clear", icon: Sun },
    { time: "9 PM", temp: 25, condition: "Clear", icon: Sun },
    { time: "10 PM", temp: 24, condition: "Clear", icon: Sun },
  ],
  daily: [
    { day: "Today", high: 32, low: 24, condition: "Clear", precipitation: 0, icon: Sun },
    { day: "Tomorrow", high: 33, low: 25, condition: "Partly Cloudy", precipitation: 10, icon: Cloud },
    { day: "Wed", high: 30, low: 24, condition: "Rain", precipitation: 60, icon: CloudRain },
    { day: "Thu", high: 29, low: 23, condition: "Rain", precipitation: 70, icon: CloudRain },
    { day: "Fri", high: 28, low: 22, condition: "Thunderstorm", precipitation: 80, icon: CloudLightning },
    { day: "Sat", high: 27, low: 21, condition: "Rain", precipitation: 50, icon: CloudRain },
    { day: "Sun", high: 29, low: 22, condition: "Partly Cloudy", precipitation: 20, icon: Cloud },
  ],
  irrigation: {
    soilMoisture: 45,
    recommendedWatering: "Tomorrow",
    wateringDuration: 30,
    nextIdealTime: "6:00 AM",
    wateringSchedule: [
      { day: "Today", status: "Not Needed", time: null },
      { day: "Tomorrow", status: "Recommended", time: "6:00 AM" },
      { day: "Wed", status: "Not Needed", time: null },
      { day: "Thu", status: "Not Needed", time: null },
      { day: "Fri", status: "Not Needed", time: null },
      { day: "Sat", status: "Potential", time: "6:00 AM" },
      { day: "Sun", status: "Potential", time: "6:00 AM" },
    ],
  },
  alerts: [
    {
      type: "Heavy Rain",
      description: "Heavy rainfall expected on Wednesday and Thursday",
      severity: "moderate",
      time: "Wed-Thu",
    },
  ],
}

export default function Weather() {
  const { t } = useLanguage()
  const [location, setLocation] = useState("Bangalore, Karnataka")
  const [autoIrrigation, setAutoIrrigation] = useState(false)
  const [activeTab, setActiveTab] = useState("forecast")
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Weather Forecast & Irrigation Timer</h1>
        <p className="text-muted-foreground">
          Get accurate weather forecasts and optimal irrigation timing for maximum yield
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Location Search */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search location..."
              className="pl-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Use Current Location</Button>
            <Select defaultValue="celsius">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="celsius">°C</SelectItem>
                <SelectItem value="fahrenheit">°F</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Current Weather Card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{location}</CardTitle>
                <CardDescription>
                  {currentTime.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })} •{" "}
                  {formatTime(currentTime)}
                </CardDescription>
              </div>
              {weatherData.alerts.length > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Weather Alert
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900">
                  <Sun className="h-12 w-12 text-yellow-500" />
                </div>
                <div>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">{weatherData.current.temperature}°</span>
                    <span className="ml-2 text-muted-foreground">Feels like {weatherData.current.feelsLike}°</span>
                  </div>
                  <p className="text-lg">{weatherData.current.condition}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Humidity</span>
                  </div>
                  <span className="text-xl font-bold">{weatherData.current.humidity}%</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-blue-300" />
                    <span className="text-sm font-medium">Wind</span>
                  </div>
                  <span className="text-xl font-bold">{weatherData.current.windSpeed} km/h</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium">Precipitation</span>
                  </div>
                  <span className="text-xl font-bold">{weatherData.current.precipitation} mm</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">UV Index</span>
                  </div>
                  <span className="text-xl font-bold">{weatherData.current.uvIndex} (High)</span>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="mt-6">
              <h3 className="mb-4 text-lg font-medium">Hourly Forecast</h3>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {weatherData.hourly.map((hour, i) => {
                  const HourIcon = hour.icon
                  return (
                    <div key={i} className="flex flex-col items-center space-y-1 text-center">
                      <span className="text-sm font-medium">{hour.time}</span>
                      <HourIcon className="h-6 w-6 text-blue-500" />
                      <span className="text-lg font-bold">{hour.temp}°</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Weather Alerts */}
            {weatherData.alerts.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 text-lg font-medium">Weather Alerts</h3>
                {weatherData.alerts.map((alert, i) => (
                  <div key={i} className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <span className="font-medium">{alert.type}</span>
                      <Badge variant="outline" className="ml-auto">
                        {alert.time}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm">{alert.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs for Forecast and Irrigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
            <TabsTrigger value="irrigation">Irrigation Timer</TabsTrigger>
          </TabsList>

          {/* 7-Day Forecast Tab */}
          <TabsContent value="forecast" className="space-y-4 pt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {weatherData.daily.map((day, i) => {
                    const DayIcon = day.icon
                    return (
                      <div key={i}>
                        <div className="grid grid-cols-4 items-center gap-4 py-2">
                          <div className="font-medium">{day.day}</div>
                          <div className="flex items-center justify-center">
                            <DayIcon className="h-6 w-6 text-blue-500" />
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-medium">
                              {day.high}° / {day.low}°
                            </span>
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <CloudRain className="h-4 w-4 text-blue-400" />
                            <span className="text-sm">{day.precipitation}%</span>
                          </div>
                        </div>
                        {i < weatherData.daily.length - 1 && <Separator />}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Irrigation Timer Tab */}
          <TabsContent value="irrigation" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Irrigation Timer</CardTitle>
                <CardDescription>
                  Optimize your irrigation schedule based on weather forecasts and soil conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Automatic Irrigation</Label>
                    <p className="text-sm text-muted-foreground">
                      Connect to your irrigation system for automated watering
                    </p>
                  </div>
                  <Switch checked={autoIrrigation} onCheckedChange={setAutoIrrigation} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Current Soil Moisture</h3>
                    <span className="text-lg font-bold">{weatherData.irrigation.soilMoisture}%</span>
                  </div>
                  <Progress value={weatherData.irrigation.soilMoisture} className="h-3" />
                  <div className="grid grid-cols-3 text-center text-xs">
                    <div className="text-red-500">Dry</div>
                    <div className="text-yellow-500">Moderate</div>
                    <div className="text-green-500">Optimal</div>
                  </div>
                </div>

                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Next Recommended Irrigation</span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">When</p>
                      <p className="font-medium">
                        {weatherData.irrigation.recommendedWatering} at {weatherData.irrigation.nextIdealTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{weatherData.irrigation.wateringDuration} minutes</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium">7-Day Irrigation Schedule</h3>
                  <div className="space-y-2">
                    {weatherData.irrigation.wateringSchedule.map((schedule, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                        <span className="font-medium">{schedule.day}</span>
                        <div className="flex items-center gap-2">
                          {schedule.status === "Recommended" ? (
                            <Badge className="bg-green-500">Recommended</Badge>
                          ) : schedule.status === "Potential" ? (
                            <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                              Potential
                            </Badge>
                          ) : (
                            <Badge variant="outline">Not Needed</Badge>
                          )}
                          {schedule.time && <span className="text-sm">{schedule.time}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button className="w-full" disabled={!autoIrrigation}>
                    Start Manual Irrigation
                  </Button>
                  <Button variant="outline" className="w-full">
                    Adjust Irrigation Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
