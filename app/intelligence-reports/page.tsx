"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Search, 
  Filter, 
  Download, 
  FileText,
  Calendar,
  Eye,
  MoreVertical,
  Plus,
  Clock
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const reports = [
  {
    id: "RPT-2024-001",
    title: "Eastern European Cyber Threat Assessment Q1",
    date: "2024-03-15",
    category: "Cyber Operations",
    classification: "TOP SECRET",
    author: "Agent Delta",
    status: "final",
    pages: 47,
  },
  {
    id: "RPT-2024-002",
    title: "Middle East Regional Stability Analysis",
    date: "2024-03-14",
    category: "Geopolitical",
    classification: "SECRET",
    author: "Agent Sigma",
    status: "final",
    pages: 32,
  },
  {
    id: "RPT-2024-003",
    title: "Financial Crime Network Mapping - Operation Silverline",
    date: "2024-03-13",
    category: "Financial Crime",
    classification: "TOP SECRET",
    author: "Agent Echo",
    status: "draft",
    pages: 58,
  },
  {
    id: "RPT-2024-004",
    title: "Southeast Asia Drug Trafficking Routes Update",
    date: "2024-03-12",
    category: "Narcotics",
    classification: "SECRET",
    author: "Agent Foxtrot",
    status: "final",
    pages: 25,
  },
  {
    id: "RPT-2024-005",
    title: "Social Media Influence Campaign Detection",
    date: "2024-03-11",
    category: "Information Warfare",
    classification: "CONFIDENTIAL",
    author: "Agent Bravo",
    status: "under_review",
    pages: 19,
  },
  {
    id: "RPT-2024-006",
    title: "Arms Proliferation in North Africa",
    date: "2024-03-10",
    category: "Arms Trade",
    classification: "TOP SECRET",
    author: "Agent Gamma",
    status: "final",
    pages: 41,
  },
  {
    id: "RPT-2024-007",
    title: "Cryptocurrency Money Laundering Trends",
    date: "2024-03-09",
    category: "Financial Crime",
    classification: "SECRET",
    author: "Agent Omega",
    status: "final",
    pages: 36,
  },
  {
    id: "RPT-2024-008",
    title: "Critical Infrastructure Vulnerability Assessment",
    date: "2024-03-08",
    category: "Cyber Operations",
    classification: "TOP SECRET",
    author: "Agent Delta",
    status: "draft",
    pages: 52,
  },
]

const classificationColors = {
  "TOP SECRET": "bg-red-500/10 text-red-500 border-red-500/20",
  "SECRET": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "CONFIDENTIAL": "bg-blue-500/10 text-blue-500 border-blue-500/20",
}

const statusConfig = {
  final: { badge: "bg-green-500/10 text-green-500 border-green-500/20", label: "Final" },
  draft: { badge: "bg-muted text-muted-foreground border-border", label: "Draft" },
  under_review: { badge: "bg-amber-500/10 text-amber-500 border-amber-500/20", label: "Under Review" },
}

const categoryOptions = [
  "All Categories",
  "Cyber Operations",
  "Geopolitical",
  "Financial Crime",
  "Narcotics",
  "Information Warfare",
  "Arms Trade",
]

export default function IntelligenceReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [classificationFilter, setClassificationFilter] = useState("all")

  const filteredReports = reports.filter((report) => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "All Categories" || report.category === categoryFilter
    const matchesClassification = classificationFilter === "all" || report.classification === classificationFilter
    return matchesSearch && matchesCategory && matchesClassification
  })

  return (
    <DashboardLayout title="Intelligence Reports">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Reports</p>
                  <p className="text-2xl font-bold text-foreground">{reports.length}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">This Week</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Under Review</p>
                  <p className="text-2xl font-bold text-amber-500">
                    {reports.filter(r => r.status === 'under_review').length}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Drafts</p>
                  <p className="text-2xl font-bold text-muted-foreground">
                    {reports.filter(r => r.status === 'draft').length}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reports by title or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={classificationFilter} onValueChange={setClassificationFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Classification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classifications</SelectItem>
                <SelectItem value="TOP SECRET">Top Secret</SelectItem>
                <SelectItem value="SECRET">Secret</SelectItem>
                <SelectItem value="CONFIDENTIAL">Confidential</SelectItem>
              </SelectContent>
            </Select>
            <Button className="ml-auto">
              <Plus className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </CardContent>
        </Card>

        {/* Reports Table */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Reports ({filteredReports.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="text-xs font-medium text-muted-foreground">Report ID</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Title</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Date</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Category</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Classification</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground">Status</TableHead>
                    <TableHead className="text-xs font-medium text-muted-foreground text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => {
                    const status = statusConfig[report.status as keyof typeof statusConfig]
                    return (
                      <TableRow key={report.id} className="hover:bg-muted/20">
                        <TableCell className="font-mono text-xs text-muted-foreground">{report.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-card-foreground max-w-[300px] truncate">
                              {report.title}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {report.author} • {report.pages} pages
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(report.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{report.category}</span>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={classificationColors[report.classification as keyof typeof classificationColors]}
                          >
                            {report.classification}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={status.badge}>
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Report</DropdownMenuItem>
                                <DropdownMenuItem>Download PDF</DropdownMenuItem>
                                <DropdownMenuItem>Share Report</DropdownMenuItem>
                                <DropdownMenuItem>Edit Report</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {filteredReports.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No reports match your filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
