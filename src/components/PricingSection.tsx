import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    subtitle: "For early-stage founders or teams exploring AI-driven outbound.",
    features: [
      "One outbound campaign",
      "Outreach to up to 100 leads per month",
      "Automated initial email touchpoint",
      "Basic performance insights",
      "No credit card required"
    ],
    highlight: "Best for exploring",
    cta: "Contact Sales",
    link: "https://calendly.com/enai-ai2024/30min"
  },
  {
    name: "Growth",
    price: "$59/month",
    subtitle: "For growing teams ready to scale outreach and drive consistent engagement.",
    features: [
      "Everything in Starter, plus:",
      "Outreach to up to 500 leads per month",
      "Domain search for verified lead targeting",
      "Initial email plus one follow-up per lead",
      "Two AI-powered voice calls per week to qualified leads",
      "Enhanced KPI dashboard and campaign analytics"
    ],
    highlight: "Most Popular",
    cta: "Contact Sales",
    link: "https://calendly.com/enai-ai2024/30min"
  },
  {
    name: "Enterprise",
    price: "Custom Pricing",
    subtitle: "For high-volume sales teams that want a fully managed, automated outbound engine.",
    features: [
      "Everything in Growth, plus:",
      "One-click AI campaign generation",
      "End-to-end automation of emails, follow-ups, and AI agent calls",
      "Dedicated, high-deliverability email domains for each campaign",
      "Fully managed experience — users only monitor KPIs",
      "Dedicated account manager and priority support",
      "Enterprise-grade compliance and SLAs",
      "Free access to all future feature upgrades and innovations"
    ],
    highlight: "All-Inclusive",
    cta: "Contact Sales",
    link: "https://calendly.com/enai-ai2024/30min"
  }
] as const;

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-dark-800 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold gradient-text mb-4">Pricing Plans</h2>
        <p className="text-gray-400 mb-12">Choose the plan that fits your growth stage and outbound needs.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className="bg-dark-700 border border-dark-600 text-left shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="flex-grow flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>
                  <p className="text-primary-400 text-xl font-semibold">{plan.price}</p>
                  <p className="text-gray-400 text-sm mt-2">{plan.subtitle}</p>
                  <Badge variant="outline" className="mt-4 text-sm">{plan.highlight}</Badge>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="mt-6 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="text-gray-300">• {feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full py-3 rounded-md bg-gradient-to-r from-primary-400 to-purple-500 text-white font-semibold hover:opacity-90 transition"
                >
                  {plan.cta}
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 