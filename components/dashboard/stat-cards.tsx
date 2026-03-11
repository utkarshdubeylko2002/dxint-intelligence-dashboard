"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Globe, Users, Bell, TrendingUp, TrendingDown, Activity, Shield, Eye, Zap } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"

const miniChartData = [
  { value: 30 }, { value: 45 }, { value: 38 }, { value: 52 }, 
  { value: 48 }, { value: 61 }, { value: 55 }, { value: 67 }
]

const stats = [
  {
    title: "Active Threats",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
    chartColor: "#ef4444",
  },
  {
    title: "Monitored Regions",
    value: "156",
    change: "+3",
    trend: "up",
    icon: Globe,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    chartColor: "#14b8a6",
  },
  {
    title: "Persons of Interest",
    value: "2,847",
    change: "+89",
    trend: "up",
    icon: Users,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    chartColor: "#f59e0b",
  },
  {
    title: "Active Alerts",
    value: "128",
    change: "-15%",
    trend: "down",
    icon: Bell,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    chartColor: "#3b82f6",
  },
  {
    title: "Intelligence Signals",
    value: "12.4K",
    change: "+8%",
    trend: "up",
    icon: Activity,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    chartColor: "#10b981",
  },
  {
    title: "Threat Level",
    value: "ELEVATED",
    change: "Stable",
    trend: "neutral",
    icon: Shield,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    chartColor: "#f59e0b",
  },
]

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, index) => (
        <Card key={stat.title} className={`bg-card border ${stat.borderColor} relative overflow-hidden`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              {stat.trend !== "neutral" && (
                <div className="flex items-center gap-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-[10px] font-medium ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}
                  </span>
                </div>
              )}
              {stat.trend === "neutral" && (
                <span className="text-[10px] font-medium text-muted-foreground">{stat.change}</span>
              )}
            </div>
            <div className="space-y-1">
              <p className={`text-xl font-bold ${stat.title === "Threat Level" ? stat.color : "text-card-foreground"}`}>
                {stat.value}
              </p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.title}</p>
            </div>
            {/* Mini Chart Background */}
            <div className="absolute bottom-0 left-0 right-0 h-8 opacity-30">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={miniChartData}>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={stat.chartColor}
                    fill={stat.chartColor}
                    strokeWidth={1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
