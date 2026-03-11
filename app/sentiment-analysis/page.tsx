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
import { 
  TrendingUp, 
  TrendingDown,
  MessageSquare,
  Hash,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
  PieChart,
  Pie,
} from "recharts"

const sentimentTrends = [
  { time: "00:00", positive: 42, negative: 28, neutral: 30 },
  { time: "04:00", positive: 38, negative: 35, neutral: 27 },
  { time: "08:00", positive: 55, negative: 22, neutral: 23 },
  { time: "12:00", positive: 48, negative: 32, neutral: 20 },
  { time: "16:00", positive: 62, negative: 25, neutral: 13 },
  { time: "20:00", positive: 45, negative: 38, neutral: 17 },
  { time: "Now", positive: 52, negative: 30, neutral: 18 },
]

const socialMediaActivity = [
  { platform: "X/Twitter", mentions: 2847, change: 12.5, sentiment: "positive" },
  { platform: "Telegram", mentions: 1923, change: -5.2, sentiment: "negative" },
  { platform: "Reddit", mentions: 892, change: 8.1, sentiment: "neutral" },
  { platform: "Dark Web Forums", mentions: 456, change: 23.4, sentiment: "negative" },
  { platform: "News Sites", mentions: 1245, change: 3.2, sentiment: "positive" },
]

const keywordData = [
  { keyword: "cyberattack", count: 1247, trend: "up", severity: "high" },
  { keyword: "data breach", count: 892, trend: "up", severity: "high" },
  { keyword: "ransomware", count: 756, trend: "down", severity: "high" },
  { keyword: "espionage", count: 634, trend: "up", severity: "medium" },
  { keyword: "financial fraud", count: 521, trend: "stable", severity: "medium" },
  { keyword: "terrorism", count: 423, trend: "down", severity: "high" },
  { keyword: "smuggling", count: 398, trend: "up", severity: "medium" },
  { keyword: "sanctions", count: 312, trend: "stable", severity: "low" },
]

const hourlyActivity = [
  { hour: "00", value: 120 },
  { hour: "02", value: 85 },
  { hour: "04", value: 65 },
  { hour: "06", value: 95 },
  { hour: "08", value: 220 },
  { hour: "10", value: 340 },
  { hour: "12", value: 380 },
  { hour: "14", value: 320 },
  { hour: "16", value: 290 },
  { hour: "18", value: 250 },
  { hour: "20", value: 180 },
  { hour: "22", value: 140 },
]

const sentimentDistribution = [
  { name: "Positive", value: 35, color: "#22c55e" },
  { name: "Negative", value: 40, color: "#ef4444" },
  { name: "Neutral", value: 25, color: "#3b82f6" },
]

export default function SentimentAnalysisPage() {
  const [timeframe, setTimeframe] = useState("24h")

  return (
    <DashboardLayout title="Sentiment Analysis">
      <div className="space-y-6">
        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Real-time Sentiment Monitoring</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </Badge>
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Positive Sentiment</p>
                  <p className="text-2xl font-bold text-green-500">35%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+5.2%</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Negative Sentiment</p>
                  <p className="text-2xl font-bold text-red-500">40%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                    <span className="text-xs text-red-500">-2.1%</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Mentions</p>
                  <p className="text-2xl font-bold text-foreground">8,363</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                    <span className="text-xs text-green-500">+847 today</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Keywords Tracked</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Minus className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">No change</span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Hash className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sentiment Trends */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Sentiment Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sentimentTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="positiveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="negativeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="neutralGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                    <Area type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} fill="url(#positiveGrad)" />
                    <Area type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} fill="url(#negativeGrad)" />
                    <Area type="monotone" dataKey="neutral" stroke="#3b82f6" strokeWidth={2} fill="url(#neutralGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground">Positive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-xs text-muted-foreground">Negative</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-xs text-muted-foreground">Neutral</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Distribution */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Sentiment Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {sentimentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {sentimentDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-card-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Social Media Activity */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Social Media Activity Spikes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {socialMediaActivity.map((platform) => (
                <div key={platform.platform} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{platform.platform}</p>
                      <p className="text-xs text-muted-foreground">{platform.mentions.toLocaleString()} mentions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={
                        platform.sentiment === "positive" 
                          ? "bg-green-500/10 text-green-500 border-green-500/20" 
                          : platform.sentiment === "negative"
                          ? "bg-red-500/10 text-red-500 border-red-500/20"
                          : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                      }
                    >
                      {platform.sentiment}
                    </Badge>
                    <div className={`flex items-center gap-1 text-xs ${platform.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {platform.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {Math.abs(platform.change)}%
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Keyword Monitoring */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-card-foreground">Keyword Monitoring</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {keywordData.map((keyword) => (
                <div key={keyword.keyword} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm text-card-foreground">{keyword.keyword}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{keyword.count.toLocaleString()}</span>
                    <Badge 
                      variant="outline" 
                      className={
                        keyword.severity === "high"
                          ? "bg-red-500/10 text-red-500 border-red-500/20"
                          : keyword.severity === "medium"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : "bg-green-500/10 text-green-500 border-green-500/20"
                      }
                    >
                      {keyword.severity}
                    </Badge>
                    {keyword.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-red-500" />}
                    {keyword.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-green-500" />}
                    {keyword.trend === "stable" && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Hourly Activity Chart */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Hourly Activity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyActivity} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
