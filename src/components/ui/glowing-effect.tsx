"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { animate } from "framer-motion";
import { isLowEndDevice, prefersReducedMotion } from "../../utils/performance";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}
const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    
    // Detect touch devices and reduced motion preference
    useEffect(() => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
      setIsReducedMotion(prefersReducedMotion() || isLowEndDevice());
    }, []);
    
    // Adjust parameters for performance
    const effectiveSpread = isReducedMotion ? Math.min(10, spread) : spread;
    const effectiveMovementDuration = isReducedMotion ? Math.min(1, movementDuration) : movementDuration;
    const shouldDisableEffect = disabled || (isTouchDevice && isReducedMotion);

    const handleMove = useCallback(
      (e?: MouseEvent | TouchEvent | { x: number; y: number }) => {
        if (!containerRef.current || shouldDisableEffect) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          let mouseX, mouseY;
          
          if (e && 'touches' in e && e.touches && e.touches[0]) {
            // Touch event
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
          } else if (e && 'clientX' in e && 'clientY' in e) {
            // Mouse event
            mouseX = (e as MouseEvent).clientX;
            mouseY = (e as MouseEvent).clientY;
          } else if (e && 'x' in e && 'y' in e) {
            // Coordinate object
            mouseX = e.x;
            mouseY = e.y;
          } else {
            mouseX = lastPosition.current.x;
            mouseY = lastPosition.current.y;
          }

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: effectiveMovementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value: number) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, effectiveMovementDuration, shouldDisableEffect]
    );

    useEffect(() => {
      if (shouldDisableEffect) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);
      const handleTouchMove = (e: TouchEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      if (isTouchDevice) {
        document.body.addEventListener("touchmove", handleTouchMove, {
          passive: true,
        });
      }

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
        if (isTouchDevice) {
          document.body.removeEventListener("touchmove", handleTouchMove);
        }
      };
    }, [handleMove, shouldDisableEffect, isTouchDevice]);

    // On touch devices with reduced motion, use a simplified effect
    const getGradientValue = () => {
      if (isReducedMotion && isTouchDevice) {
        // Simplified static gradient for low-end devices
        return variant === "white"
          ? `radial-gradient(circle at 50% 50%, var(--white) 0%, transparent 70%)`
          : `radial-gradient(circle at 50% 50%, 
              rgba(221, 123, 187, 0.4) 0%, 
              rgba(215, 159, 30, 0.3) 25%, 
              rgba(90, 146, 44, 0.2) 50%, 
              rgba(76, 120, 148, 0.1) 75%, 
              transparent 100%)`;
      }
      
      return variant === "white"
        ? `repeating-conic-gradient(
            from 236.84deg at 50% 50%,
            var(--black),
            var(--black) calc(25% / var(--repeating-conic-gradient-times))
          )`
        : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
           radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
           radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
           radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
           repeating-conic-gradient(
             from 236.84deg at 50% 50%,
             #dd7bbb 0%,
             #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
             #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
             #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
             #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
           )`;
    };

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": effectiveSpread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": isReducedMotion ? "3" : "5",
              "--gradient": getGradientValue(),
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            shouldDisableEffect && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              (isReducedMotion && isTouchDevice) ? "" : "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect }; 