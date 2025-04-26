"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Edit, Save, Camera, Tractor, Leaf, Award } from "lucide-react"

export default function Profile() {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)

  // Sample user data
  const userData = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 9876543210",
    location: "Bangalore, Karnataka",
    farmSize: "5 hectares",
    crops: ["Rice", "Wheat", "Vegetables"],
    memberSince: "January 2023",
    profileImage: "/placeholder.svg?height=100&width=100",
  }

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userData.profileImage || "/placeholder.svg"} alt={userData.name} />
                    <AvatarFallback>
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full bg-background"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-sm text-muted-foreground">{userData.location}</p>
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                  {userData.crops.map((crop) => (
                    <Badge key={crop} variant="outline">
                      {crop}
                    </Badge>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Member since {userData.memberSince}</p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{userData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{userData.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Tractor className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Farm Size</p>
                    <p className="text-sm text-muted-foreground">{userData.farmSize}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="space-y-6 pt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                  <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)} className="h-8 w-8">
                    {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={userData.name} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData.email} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue={userData.phone} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={userData.location} disabled={!isEditing} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Farm Details</CardTitle>
                  <CardDescription>Information about your farm</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="farmSize">Farm Size</Label>
                      <Input id="farmSize" defaultValue={userData.farmSize} disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="crops">Primary Crops</Label>
                      <Input
                        id="crops"
                        defaultValue={userData.crops.join(", ")}
                        disabled={!isEditing}
                        placeholder="e.g. Rice, Wheat, Vegetables"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="soilType">Soil Type</Label>
                      <Input id="soilType" defaultValue="Loamy" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="irrigationType">Irrigation Type</Label>
                      <Input id="irrigationType" defaultValue="Drip Irrigation" disabled={!isEditing} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {isEditing && (
                <div className="flex justify-end">
                  <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="activity" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent actions on FarmConnect 360</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      {
                        action: "Uploaded a plant image for disease detection",
                        date: "2 hours ago",
                        icon: Leaf,
                      },
                      {
                        action: "Updated crop recommendation parameters",
                        date: "Yesterday",
                        icon: Leaf,
                      },
                      {
                        action: "Listed 50 kg of organic rice on marketplace",
                        date: "3 days ago",
                        icon: Tractor,
                      },
                      {
                        action: "Calculated carbon footprint",
                        date: "1 week ago",
                        icon: Leaf,
                      },
                    ].map((activity, index) => {
                      const ActivityIcon = activity.icon
                      return (
                        <div key={index} className="flex items-start gap-4">
                          <div className="rounded-full bg-primary/10 p-2">
                            <ActivityIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Milestones and badges you've earned</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        title: "Sustainable Farmer",
                        description: "Reduced carbon footprint by 20%",
                        icon: Award,
                        date: "Earned on June 15, 2023",
                      },
                      {
                        title: "Market Leader",
                        description: "Completed 10 successful marketplace transactions",
                        icon: Award,
                        date: "Earned on May 22, 2023",
                      },
                      {
                        title: "Tech Adopter",
                        description: "Used all features of FarmConnect 360",
                        icon: Award,
                        date: "Earned on April 10, 2023",
                      },
                      {
                        title: "Community Contributor",
                        description: "Shared 5 success stories with the community",
                        icon: Award,
                        date: "Earned on March 5, 2023",
                      },
                    ].map((achievement, index) => {
                      const AchievementIcon = achievement.icon
                      return (
                        <div key={index} className="rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-primary/10 p-3">
                              <AchievementIcon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{achievement.title}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">{achievement.date}</p>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
