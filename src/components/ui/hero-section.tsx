import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronRight } from "lucide-react"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  description?: string
  ctaText?: string
  ctaHref?: string
  secondaryCtaText?: string
  onSecondaryCta?: () => void
  bottomImage?: {
    light: string
    dark: string
  }
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
  children?: React.ReactNode
  contentPaddingY?: string
}

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "gray",
  darkLineColor = "gray",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`,
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  )
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "Build products for everyone",
      subtitle = {
        regular: "Designing your projects faster with ",
        gradient: "the largest figma UI kit.",
      },
      description = "Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      ctaText = "Browse courses",
      ctaHref = "#",
      secondaryCtaText,
      onSecondaryCta,
      bottomImage,
      gridOptions,
      children,
      contentPaddingY,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        <div className="absolute top-0 z-[0] h-screen w-screen bg-orange-950/10 dark:bg-orange-950/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(249,115,22,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(249,115,22,0.3),rgba(255,255,255,0))]" />
        <section className="relative max-w-full mx-auto z-1" aria-labelledby="hero-heading" role="region">
          <RetroGrid {...gridOptions} />
          <div className={cn(
            "max-w-screen-xl z-10 mx-auto px-4 md:px-8",
            contentPaddingY ? contentPaddingY : "py-28",
          )}>
            <div className="space-y-5 md:space-y-7 max-w-3xl leading-0 lg:leading-5 mx-auto text-center relative">
              {/* subtle corner glow */}
              <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[60%] h-48 bg-gradient-to-b from-orange-400/5 to-transparent blur-2xl" aria-hidden="true" />
              <h1 className="text-sm text-gray-600 dark:text-gray-400 group font-geist mx-auto px-5 py-2 bg-gradient-to-tr from-zinc-300/20 via-gray-400/20 to-transparent dark:from-zinc-300/5 dark:via-gray-400/5 border-[2px] border-black/5 dark:border-white/5 rounded-3xl w-fit animate-slide-down motion-reduce:animate-none shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                {title}
                <ChevronRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 duration-300" aria-hidden="true" />
              </h1>
              <h2
                id="hero-heading"
                className="text-4xl md:text-6xl tracking-tighter leading-tight md:leading-[1.08] font-geist bg-clip-text text-transparent mx-auto [text-wrap:balance] animate-fade-in-up motion-reduce:animate-none bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] drop-shadow-[0_10px_30px_rgba(249,115,22,0.12)]"
              >
                {subtitle.regular}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 dark:from-orange-300 dark:to-yellow-200">
                  {subtitle.gradient}
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed animate-fade-in-up motion-reduce:animate-none">
                {description}
              </p>
              <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                <span className="relative inline-block overflow-hidden rounded-full p-[1.5px] shadow-[0_10px_30px_rgba(249,115,22,0.15)]">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FDE68A_0%,#F97316_50%,#FDE68A_100%)]" />
                  <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 text-xs font-medium backdrop-blur-3xl">
                    <a
                      href={ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ctaText}
                      className="inline-flex rounded-full text-center group items-center w-full justify-center bg-gradient-to-tr from-zinc-300/20 via-orange-400/30 to-transparent dark:from-zinc-300/5 dark:via-orange-400/20 text-gray-900 dark:text-white border-input border-[1px] hover:bg-gradient-to-tr hover:from-zinc-300/30 hover:via-orange-400/40 hover:to-transparent dark:hover:from-zinc-300/10 dark:hover:via-orange-400/30 transition-all sm:w-auto py-4 px-10 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      {ctaText}
                    </a>
                  </div>
                </span>
                {secondaryCtaText && onSecondaryCta && (
                  <button
                    onClick={onSecondaryCta}
                    className="inline-flex rounded-full text-center group items-center w-full justify-center bg-transparent text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all sm:w-auto py-4 px-10 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    {secondaryCtaText}
                  </button>
                )}
              </div>
            </div>
            {/* bottomImage handled in App with centered dashboard preview */}
            {children && (
              <div className="mt-16 relative z-10">
                {children}
              </div>
            )}
          </div>
        </section>
      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection, RetroGrid }
