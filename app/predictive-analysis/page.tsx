"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Brain, TrendingUp, AlertTriangle, Shield, Target, 
  Activity, ChevronRight, Zap, BarChart3, LineChart, Clock
} from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart as RechartsLineChart, Bar, BarChart, Cell } from "recharts"

const threatPredictions = [
  {
    id: 1,
    region: "Eastern Europe",
    category: "Cyber Operations",
    probability: 87,
    timeframe: "7 days",
    confidence: 92,
    trend: "increasing",
    factors: ["Increased network activity", "Historical pattern match", "SIGINT indicators"],
  },
  {
    id: 2,
    region: "Middle East",
    category: "Political Instability",
    probability: 78,
    timeframe: "14 days",
    confidence: 85,
    trend: "stable",
    factors: ["Regional tensions", "Economic factors", "Leadership changes"],
  },
  {
    id: 3,
    region: "East Asia",
    category: "Economic Espionage",
    probability: 65,
    timeframe: "30 days",
    confidence: 78,
    trend: "increasing",
    factors: ["Industry targeting", "Actor movement patterns", "Technology gaps"],
  },
  {
    id: 4,
    region: "North Africa",
    category: "Extremist Activity",
    probability: 72,
    timeframe: "7 days",
    confidence: 81,
    trend: "decreasing",
    factors: ["Group communications", "Resource movements", "Historical timing"],
  },
]

const anomalyPatterns = [
  { id: 1, type: "Communication Spike", deviation: 340, baseline: 100, status: "critical" },
  { id: 2, type: "Financial Flow", deviation: 180, baseline: 100, status: "warning" },
  { id: 3, type: "Travel Patterns", deviation: 125, baseline: 100, status: "normal" },
  { id: 4, type: "Network Formation", deviation: 220, baseline: 100, status: "warning" },
]

const forecastData = [
  { date: "Week 1", actual: 45, predicted: 48, lower: 40, upper: 56 },
  { date: "Week 2", actual: 52, predicted: 55, lower: 47, upper: 63 },
  { date: "Week 3", actual: 48, predicted: 51, lower: 43, upper: 59 },
  { date: "Week 4", actual: 61, predicted: 58, lower: 50, upper: 66 },
  { date: "Week 5", actual: null, predicted: 65, lower: 57, upper: 73 },
  { date: "Week 6", actual: null, predicted: 72, lower: 64, upper: 80 },
  { date: "Week 7", actual: null, predicted: 68, lower: 60, upper: 76 },
]

const trendAnalysis = [
  { category: "Cyber", current: 85, predicted: 92, change: "+8%" },
  { category: "Political", current: 72, predicted: 78, change: "+8%" },
  { category: "Economic", current: 58, predicted: 55, change: "-5%" },
  { category: "Extremist", current: 45, predicted: 52, change: "+16%" },
]

const emergingPatterns = [
  {
    id: 1,
    pattern: "Coordinated Social Media Campaign",
    probability: 89,
    region: "Multiple",
    description: "AI-detected coordination across platforms suggests upcoming influence operation",
    timeline: "2-5 days",
  },
  {
    id: 2,
    pattern: "Resource Positioning",
    probability: 76,
    region: "Eastern Europe",
    description: "Financial and logistical movements indicate operational preparation",
    timeline: "1-2 weeks",
  },
  {
    id: 3,
    pattern: "Network Expansion",
    probability: 68,
    region: "Southeast Asia",
    description: "New entity connections forming around known threat actors",
    timeline: "2-4 weeks",
  },
]

const probabilityColor = (prob: number) => {
  if (prob >= 80) return { text: "text-red-500", bg: "bg-red-500", border: "border-red-500" }
  if (prob >= 60) return { text: "text-orange-500", bg: "bg-orange-500", border: "border-orange-500" }
  if (prob >= 40) return { text: "text-amber-500", bg: "bg-amber-500", border: "border-amber-500" }
  return { text: "text-green-500", bg: "bg-green-500", border: "border-green-500" }
}

const statusColors = {
  critical: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/30" },
  warning: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/30" },
  normal: { bg: "bg-green-500/10", text: "text-green-500", border: "border-green-500/30" },
}

export default function PredictiveAnalysisPage() {
  const [selectedPrediction, setSelectedPrediction] = useState<typeof threatPredictions[0] | null>(null)
  const [timeframe, setTimeframe] = useState("30d")

  return (
    <DashboardLayout title="Predictive Threat Analysis">
      <div className="space-y-4">
        {/* Control Bar */}
        <Card className="bg-card border-border">
          <CardContent className="flex flex-wrap items-center gap-4 p-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-primary">AI-Powered Analysis</span>
            </div>
            <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/30">
              Models Updated 2h ago
            </Badge>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-muted-foreground">Forecast Period:</span>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[120px] h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                  <SelectItem value="90d">90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Threat Predictions */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Threat Probability Forecast</CardTitle>
                  <Badge variant="outline" className="text-[10px]">
                    {threatPredictions.length} active predictions
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                {threatPredictions.map((prediction) => {
                  const probColor = probabilityColor(prediction.probability)
                  return (
                    <button
                      key={prediction.id}
                      onClick={() => setSelectedPrediction(prediction)}
                      className={`w-full p-4 rounded-lg border transition-all text-left ${
                        selectedPrediction?.id === prediction.id 
                          ? 'bg-primary/5 border-primary/30' 
                          : 'bg-muted/30 border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-card-foreground">{prediction.region}</span>
                            <Badge variant="outline" className="text-[9px]">{prediction.category}</Badge>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            Timeframe: {prediction.timeframe} | Confidence: {prediction.confidence}%
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`text-2xl font-bold ${probColor.text}`}>{prediction.probability}%</span>
                          <p className="text-[10px] text-muted-foreground">probability</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={prediction.probability} className="h-2 flex-1" />
                        <div className="flex items-center gap-1">
                          {prediction.trend === "increasing" ? (
                            <TrendingUp className="h-3 w-3 text-red-500" />
                          ) : prediction.trend === "decreasing" ? (
                            <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />
                          ) : (
                            <Activity className="h-3 w-3 text-amber-500" />
                          )}
                          <span className={`text-[10px] ${
                            prediction.trend === "increasing" ? "text-red-500" : 
                            prediction.trend === "decreasing" ? "text-green-500" : "text-amber-500"
                          }`}>
                            {prediction.trend}
                          </span>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Forecast Chart */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Threat Activity Forecast</CardTitle>
                  <div className="flex items-center gap-3 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-4 bg-primary rounded" />
                      <span className="text-muted-foreground">Predicted</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-4 bg-primary/30 rounded" />
                      <span className="text-muted-foreground">Confidence Range</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecastData}>
                      <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                      <YAxis tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "11px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="upper"
                        stroke="transparent"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.1}
                      />
                      <Area
                        type="monotone"
                        dataKey="lower"
                        stroke="transparent"
                        fill="hsl(var(--background))"
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 0 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="hsl(var(--foreground))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "hsl(var(--foreground))", strokeWidth: 0 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panels */}
          <div className="lg:col-span-5 space-y-4">
            {/* Selected Prediction Details */}
            {selectedPrediction ? (
              <Card className="bg-card border-border">
                <CardHeader className="pb-2 pt-3 px-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Prediction Details</CardTitle>
                    <Badge className={probabilityColor(selectedPrediction.probability).bg}>
                      {selectedPrediction.probability}% PROB
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 rounded-lg bg-muted/30">
                      <p className="text-[10px] text-muted-foreground">Region</p>
                      <p className="text-sm font-medium text-card-foreground">{selectedPrediction.region}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/30">
                      <p className="text-[10px] text-muted-foreground">Category</p>
                      <p className="text-sm font-medium text-card-foreground">{selectedPrediction.category}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/30">
                      <p className="text-[10px] text-muted-foreground">Timeframe</p>
                      <p className="text-sm font-medium text-card-foreground">{selectedPrediction.timeframe}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/30">
                      <p className="text-[10px] text-muted-foreground">Confidence</p>
                      <p className="text-sm font-medium text-card-foreground">{selectedPrediction.confidence}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Contributing Factors</p>
                    <div className="space-y-1.5">
                      {selectedPrediction.factors.map((factor, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-card-foreground">
                          <ChevronRight className="h-3 w-3 text-primary" />
                          {factor}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" className="w-full text-xs">
                    <Target className="mr-1.5 h-3.5 w-3.5" />
                    Generate Response Plan
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Brain className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">Select a prediction for details</p>
                </CardContent>
              </Card>
            )}

            {/* Anomaly Detection */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Anomaly Detection</CardTitle>
                  <Badge variant="outline" className="text-[10px] bg-red-500/10 text-red-500 border-red-500/30">
                    {anomalyPatterns.filter(a => a.status === 'critical').length} CRITICAL
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {anomalyPatterns.map((anomaly) => {
                  const status = statusColors[anomaly.status as keyof typeof statusColors]
                  return (
                    <div key={anomaly.id} className={`p-3 rounded-lg border ${status.border} ${status.bg}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-card-foreground">{anomaly.type}</span>
                        <Badge variant="outline" className={`text-[9px] ${status.text}`}>
                          {anomaly.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">Deviation:</span>
                        <span className={`text-sm font-bold ${status.text}`}>{anomaly.deviation}%</span>
                        <span className="text-[10px] text-muted-foreground">of baseline</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Trend Analysis */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2 pt-3 px-4">
                <CardTitle className="text-sm font-medium">Category Trends</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-3">
                  {trendAnalysis.map((trend) => (
                    <div key={trend.category} className="flex items-center justify-between">
                      <span className="text-xs text-card-foreground">{trend.category}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-muted-foreground">{trend.current}</span>
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-medium text-card-foreground">{trend.predicted}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-[9px] ${
                            trend.change.startsWith('+') ? 'text-red-500 border-red-500/30' : 'text-green-500 border-green-500/30'
                          }`}
                        >
                          {trend.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emerging Patterns */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2 pt-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" />
                <CardTitle className="text-sm font-medium">Emerging Intelligence Patterns</CardTitle>
              </div>
              <Badge variant="outline" className="text-[10px]">AI-Detected</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {emergingPatterns.map((pattern) => {
                const probColor = probabilityColor(pattern.probability)
                return (
                  <div key={pattern.id} className="p-4 rounded-lg border border-border bg-muted/20">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-[9px]">{pattern.region}</Badge>
                      <span className={`text-lg font-bold ${probColor.text}`}>{pattern.probability}%</span>
                    </div>
                    <h4 className="text-sm font-medium text-card-foreground mb-1">{pattern.pattern}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{pattern.description}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Expected: {pattern.timeline}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
