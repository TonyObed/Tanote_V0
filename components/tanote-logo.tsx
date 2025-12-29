interface TaNoteLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  subtitle?: string
  light?: boolean
}

export function TaNoteLogo({ size = "md", showText = true, subtitle, light = false }: TaNoteLogoProps) {
  const textClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-5xl",
  }

  const subtitleClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  }

  return (
    <div className="flex flex-col">
      {showText && (
        <span className={`font-bold ${textClasses[size]} ${light ? "text-white" : "text-foreground"}`}>
          Ta<span className="text-primary">Note</span>
        </span>
      )}
      {subtitle && (
        <span className={`${subtitleClasses[size]} ${light ? "text-white/80" : "text-muted-foreground"} font-medium`}>
          {subtitle}
        </span>
      )}
    </div>
  )
}
