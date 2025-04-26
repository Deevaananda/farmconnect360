"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  FolderPlus,
  Lock,
  Search,
  Share2,
  Shield,
  Upload,
  Eye,
  Download,
  Calendar,
  FileArchive,
  FileLock2,
} from "lucide-react"

// Sample documents data
const documents = [
  {
    id: 1,
    name: "Land Ownership Certificate.pdf",
    type: "Land Document",
    size: "2.4 MB",
    uploadedOn: "2023-05-10",
    shared: false,
    icon: FileText,
  },
  {
    id: 2,
    name: "Crop Insurance Policy.pdf",
    type: "Insurance",
    size: "1.8 MB",
    uploadedOn: "2023-04-22",
    shared: true,
    icon: Shield,
  },
  {
    id: 3,
    name: "Loan Agreement - State Bank.pdf",
    type: "Loan Document",
    size: "3.2 MB",
    uploadedOn: "2023-03-15",
    shared: false,
    icon: FileText,
  },
  {
    id: 4,
    name: "Soil Testing Report.pdf",
    type: "Farm Document",
    size: "1.5 MB",
    uploadedOn: "2023-06-01",
    shared: false,
    icon: FileText,
  },
  {
    id: 5,
    name: "Subsidy Approval Letter.pdf",
    type: "Government Document",
    size: "0.8 MB",
    uploadedOn: "2023-05-28",
    shared: true,
    icon: FileText,
  },
]

// Sample folders data
const folders = [
  {
    id: 1,
    name: "Land Documents",
    documentCount: 5,
    lastUpdated: "2023-06-02",
  },
  {
    id: 2,
    name: "Loan Documents",
    documentCount: 3,
    lastUpdated: "2023-05-20",
  },
  {
    id: 3,
    name: "Insurance",
    documentCount: 2,
    lastUpdated: "2023-04-15",
  },
  {
    id: 4,
    name: "Government Schemes",
    documentCount: 4,
    lastUpdated: "2023-06-01",
  },
]

export default function DocumentLocker() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all-documents")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // Filter documents based on search query
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Simulate file upload
  const handleFileUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="container py-10">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-2">
          <FileLock2 className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold tracking-tight">Document Locker</h1>
        </div>
        <p className="text-muted-foreground">
          Securely store and manage your important documents like land papers and loan documents
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Storage</CardTitle>
              <CardDescription>2.5 GB of 10 GB used</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage used</span>
                  <span>25%</span>
                </div>
                <Progress value={25} />
              </div>

              <div className="space-y-4">
                {/* Fixed: Properly nesting Dialog and DialogTrigger */}
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Upload Document</DialogTitle>
                      <DialogDescription>
                        Upload your important documents securely. All files are encrypted and stored safely.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {isUploading ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Uploading...</span>
                            <span className="text-sm">{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} />
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Lock className="mr-2 h-4 w-4" />
                            Your document is being encrypted and uploaded
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium">Click to upload</h3>
                            <p className="text-sm text-muted-foreground mt-1">or drag and drop your document here</p>
                            <p className="text-xs text-muted-foreground mt-4">
                              Supported formats: PDF, DOCX, JPG, PNG (Max size: 10MB)
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                              <div className="col-span-4">
                                <Label htmlFor="documentName">Document Name</Label>
                                <Input id="documentName" placeholder="Enter document name" />
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                              <div className="col-span-2">
                                <Label htmlFor="documentType">Document Type</Label>
                                <Select>
                                  <SelectTrigger id="documentType">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="land">Land Document</SelectItem>
                                    <SelectItem value="loan">Loan Document</SelectItem>
                                    <SelectItem value="insurance">Insurance</SelectItem>
                                    <SelectItem value="government">Government Document</SelectItem>
                                    <SelectItem value="farm">Farm Document</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="col-span-2">
                                <Label htmlFor="folder">Folder</Label>
                                <Select>
                                  <SelectTrigger id="folder">
                                    <SelectValue placeholder="Select folder" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="land">Land Documents</SelectItem>
                                    <SelectItem value="loan">Loan Documents</SelectItem>
                                    <SelectItem value="insurance">Insurance</SelectItem>
                                    <SelectItem value="government">Government Schemes</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <DialogFooter className="flex items-center justify-between sm:justify-between">
                      <div className="flex items-center text-sm">
                        <Lock className="mr-2 h-4 w-4 text-green-500" />
                        End-to-end encrypted
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" disabled={isUploading} onClick={() => setIsUploadDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isUploading} onClick={handleFileUpload}>
                          {isUploading ? "Uploading..." : "Upload"}
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="w-full">
                  <FolderPlus className="mr-2 h-4 w-4" />
                  New Folder
                </Button>
              </div>

              <Separator />

              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("all-documents")}>
                  <FileText className="mr-2 h-4 w-4" />
                  All Documents
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("shared")}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Shared
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("folders")}>
                  <FileArchive className="mr-2 h-4 w-4" />
                  Folders
                </Button>
              </div>

              <Separator />

              <div className="space-y-1">
                <h3 className="text-sm font-medium">Document Types</h3>
                <div className="space-y-1 pt-2">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Land Documents
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Loan Documents
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Insurance
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Government Documents
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Farm Documents
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Manage your important documents securely</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all-documents">All Documents</TabsTrigger>
                  <TabsTrigger value="shared">Shared</TabsTrigger>
                  <TabsTrigger value="folders">Folders</TabsTrigger>
                </TabsList>

                {/* All Documents Tab */}
                <TabsContent value="all-documents" className="space-y-4 pt-4">
                  {filteredDocuments.length > 0 ? (
                    <div className="rounded-lg border">
                      <div className="grid grid-cols-12 gap-4 p-4 font-medium">
                        <div className="col-span-6">Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-2">Actions</div>
                      </div>
                      <Separator />
                      <div className="divide-y">
                        {filteredDocuments.map((doc) => {
                          const DocIcon = doc.icon
                          return (
                            <div key={doc.id} className="grid grid-cols-12 gap-4 p-4">
                              <div className="col-span-6 flex items-center gap-2">
                                <DocIcon className="h-5 w-5 text-blue-500" />
                                <div>
                                  <div className="font-medium">{doc.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    Uploaded on {new Date(doc.uploadedOn).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-2 flex items-center">
                                <Badge variant="outline">{doc.type}</Badge>
                              </div>
                              <div className="col-span-2 flex items-center">{doc.size}</div>
                              <div className="col-span-2 flex items-center gap-2">
                                <Button variant="ghost" size="icon" title="View">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Download">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Share">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-6 mb-4">
                        <FileText className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No Documents Found</h3>
                      <p className="text-sm text-muted-foreground mt-1 max-w-md">
                        {searchQuery
                          ? `No documents matching "${searchQuery}" were found. Try a different search term.`
                          : "You haven't uploaded any documents yet. Click the 'Upload Document' button to get started."}
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Shared Tab */}
                <TabsContent value="shared" className="space-y-4 pt-4">
                  {filteredDocuments.filter((doc) => doc.shared).length > 0 ? (
                    <div className="rounded-lg border">
                      <div className="grid grid-cols-12 gap-4 p-4 font-medium">
                        <div className="col-span-6">Name</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-2">Actions</div>
                      </div>
                      <Separator />
                      <div className="divide-y">
                        {filteredDocuments
                          .filter((doc) => doc.shared)
                          .map((doc) => {
                            const DocIcon = doc.icon
                            return (
                              <div key={doc.id} className="grid grid-cols-12 gap-4 p-4">
                                <div className="col-span-6 flex items-center gap-2">
                                  <DocIcon className="h-5 w-5 text-blue-500" />
                                  <div>
                                    <div className="font-medium">{doc.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      Uploaded on {new Date(doc.uploadedOn).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-2 flex items-center">
                                  <Badge variant="outline">{doc.type}</Badge>
                                </div>
                                <div className="col-span-2 flex items-center">{doc.size}</div>
                                <div className="col-span-2 flex items-center gap-2">
                                  <Button variant="ghost" size="icon" title="View">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" title="Download">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" title="Manage Sharing">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-muted p-6 mb-4">
                        <Share2 className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No Shared Documents</h3>
                      <p className="text-sm text-muted-foreground mt-1 max-w-md">
                        You haven't shared any documents yet. Share documents with others by clicking the share button.
                      </p>
                    </div>
                  )}
                </TabsContent>

                {/* Folders Tab */}
                <TabsContent value="folders" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {folders.map((folder) => (
                      <Card key={folder.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardHeader className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <FileArchive className="h-5 w-5 text-blue-500" />
                              <CardTitle className="text-base">{folder.name}</CardTitle>
                            </div>
                            <Badge variant="outline">{folder.documentCount}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            Last updated: {new Date(folder.lastUpdated).toLocaleDateString()}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
