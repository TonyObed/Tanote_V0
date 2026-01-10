"use client"

import * as React from "react"
import { PixelCanvas } from "@/components/ui/pixel-canvas"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ButtonWithPixelProps extends React.ComponentPropsWithoutRef<typeof Button> {
  pixelColors?: string[]
  pixelGap?: number
  pixelSpeed?: number
}

export const ButtonWithPixel = React.forwardRef<HTMLButtonElement, ButtonWithPixelProps>(
  ({ className, children, pixelColors, pixelGap = 10, pixelSpeed = 25, ...props }, ref) => {
    const defaultColors = pixelColors || ["oklch(0.7 0.19 220)", "oklch(0.6 0.19 220)", "oklch(0.5 0.19 220)"]

    return (
      <Button
        ref={ref}
        className={cn("group relative overflow-hidden transition-all duration-300", className)}
        {...props}
      >
        <PixelCanvas gap={pixelGap} speed={pixelSpeed} colors={defaultColors} variant="default" />
        <span className="relative z-10">{children}</span>
      </Button>
    )
  },
)
ButtonWithPixel.displayName = "ButtonWithPixel"
