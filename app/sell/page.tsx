"use client"

import { cn } from "@/lib/utils"

interface DeliveryMethodCardProps {
  title: string
  description: string
  icon: "package" | "truck"
  selected: boolean
  onClick: () => void
  badge?: string
}

export function DeliveryMethodCard({ title, description, icon, selected, onClick, badge }: DeliveryMethodCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-300",
        "delivery-card-border",
        selected && "delivery-card-border-selected glow-accent-soft",
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
          selected
            ? "bg-gradient-to-br from-accent/80 to-neon-blue/80 text-accent-foreground shadow-md"
            : "bg-secondary text-muted-foreground",
        )}
      >
        {icon === "package" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={cn("font-semibold transition-colors", selected ? "text-foreground" : "text-foreground/80")}>
          {title}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>

        {badge && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs font-medium text-accent">{badge}</span>
          </div>
        )}
      </div>

      <div
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
          selected ? "bg-gradient-to-br from-accent/90 to-neon-blue/90 shadow-sm" : "border-2 border-border",
        )}
      >
        {selected && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-foreground"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </button>
  )
}

export default function SellPage() {
  return (
    <div className="min-h-screen p-8">
      <DeliveryMethodCard
        title="Standard Delivery"
        description="Get your order in 5-7 business days"
        icon="package"
        selected={false}
        onClick={() => {}}
      />
    </div>
  )
}
