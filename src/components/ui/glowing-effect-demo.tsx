"use client";

import { ChevronRight, Building, Code, BarChart2, Zap, Globe } from 'lucide-react';
import { GlowingEffect } from "./glowing-effect";
import { cn } from "../../lib/utils";

export function GlowingEffectDemo() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-3 gap-4 lg:gap-6 my-12">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Building className="h-5 w-5 text-primary-400" />}
        title="Enterprise-Grade Solutions"
        description="AI automation that scales with your business needs, from startups to large enterprises."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Code className="h-5 w-5 text-primary-400" />}
        title="Custom AI Development"
        description="Tailored AI solutions designed for your specific industry challenges."
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<Zap className="h-5 w-5 text-primary-400" />}
        title="Accelerate Growth"
        description="Boost productivity and efficiency with AI-powered automation and insights."
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<BarChart2 className="h-5 w-5 text-primary-400" />}
        title="Data-Driven Results"
        description="Turn your data into actionable intelligence with our AI analytics solutions."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<Globe className="h-5 w-5 text-primary-400" />}
        title="Global AI Expertise"
        description="World-class AI implementation backed by a team of industry experts."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[12rem] list-none", area)}>
      <div className="relative h-full rounded-xl border border-dark-700 bg-dark-800/30 p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-lg border border-dark-700 bg-dark-900/80 backdrop-blur-sm p-5 shadow-sm">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-dark-700 bg-primary-400/10 p-2">
              {icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-gray-300">
                {description}
              </p>
            </div>
          </div>
          <div className="flex items-center text-primary-400 text-sm font-medium">
            Learn more
            <ChevronRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </div>
    </li>
  );
}; 