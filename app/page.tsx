import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { StatCards } from "@/components/dashboard/stat-cards"
import { ThreatHeatmap } from "@/components/dashboard/threat-heatmap"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { SentimentChart } from "@/components/dashboard/sentiment-chart"
import { ActivityTimeline } from "@/components/dashboard/activity-timeline"
import { IntelligenceFeed } from "@/components/dashboard/intelligence-feed"
import { AnomalyDetection } from "@/components/dashboard/anomaly-detection"
import { ThreatDistribution } from "@/components/dashboard/threat-distribution"
import { SystemStatus } from "@/components/dashboard/system-status"

export default function DashboardPage() {
  return (
    <DashboardLayout title="Command Center">
      <div className="space-y-4">
        {/* Stats Row */}
        <StatCards />

        {/* Main Grid - First Row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Threat Heatmap - Takes 5 columns */}
          <div className="lg:col-span-5">
            <ThreatHeatmap />
          </div>

          {/* Intelligence Feed - Takes 4 columns */}
          <div className="lg:col-span-4">
            <IntelligenceFeed />
          </div>

          {/* Alerts Panel - Takes 3 columns */}
          <div className="lg:col-span-3">
            <AlertsPanel />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Sentiment Chart - Takes 4 columns */}
          <div className="lg:col-span-4">
            <SentimentChart />
          </div>

          {/* Anomaly Detection - Takes 4 columns */}
          <div className="lg:col-span-4">
            <AnomalyDetection />
          </div>

          {/* Threat Distribution - Takes 4 columns */}
          <div className="lg:col-span-4">
            <ThreatDistribution />
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Activity Timeline - Takes 6 columns */}
          <div className="lg:col-span-6">
            <ActivityTimeline />
          </div>

          {/* System Status - Takes 6 columns */}
          <div className="lg:col-span-6">
            <SystemStatus />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
