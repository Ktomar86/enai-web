import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, Users, TrendingUp, Shield, Target, AlertTriangle, Clock, Settings, Headphones, Building, Sparkles } from 'lucide-react';

interface IndustryData {
  id: string;
  title: string;
  subtitle: string;
  icon: JSX.Element;
  description: string;
  challenges: string[];
  solutions: string[];
  compliance: string[];
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  deployment: {
    timeline: string;
    integration: string;
    support: string;
  };
  caseStudy?: {
    company: string;
    challenge: string;
    solution: string;
    result: string;
  };
}

interface IndustryDetailModalProps {
  industry: IndustryData;
  onClose: () => void;
}

export default function IndustryDetailModal({ industry, onClose }: IndustryDetailModalProps) {
  // Premium theme system for modal
  const getIndustryTheme = (id: string) => {
    const themes = {
      saas: {
        gradient: 'from-blue-600/40 via-cyan-500/30 to-blue-700/40',
        border: 'border-blue-400/30',
        iconBg: 'from-blue-500 to-cyan-600',
        accentColor: 'text-blue-400'
      },
      fintech: {
        gradient: 'from-emerald-600/40 via-teal-500/30 to-emerald-700/40',
        border: 'border-emerald-400/30',
        iconBg: 'from-emerald-500 to-teal-600',
        accentColor: 'text-emerald-400'
      },
      healthcare: {
        gradient: 'from-rose-600/40 via-pink-500/30 to-rose-700/40',
        border: 'border-rose-400/30',
        iconBg: 'from-rose-500 to-pink-600',
        accentColor: 'text-rose-400'
      },
      ecommerce: {
        gradient: 'from-purple-600/40 via-violet-500/30 to-purple-700/40',
        border: 'border-purple-400/30',
        iconBg: 'from-purple-500 to-violet-600',
        accentColor: 'text-purple-400'
      },
      realestate: {
        gradient: 'from-orange-600/40 via-amber-500/30 to-orange-700/40',
        border: 'border-orange-400/30',
        iconBg: 'from-orange-500 to-amber-600',
        accentColor: 'text-orange-400'
      },
      manufacturing: {
        gradient: 'from-slate-600/40 via-gray-500/30 to-slate-700/40',
        border: 'border-slate-400/30',
        iconBg: 'from-slate-500 to-gray-600',
        accentColor: 'text-slate-400'
      }
    };
    return themes[id as keyof typeof themes] || themes.saas;
  };

  const theme = getIndustryTheme(industry.id);
  const gradient = theme.gradient;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Compact Modal */}
        <div className="flex min-h-full items-start justify-center p-4 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-3xl mx-auto bg-dark-light border border-dark-700/50 rounded-xl overflow-hidden shadow-2xl`}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-dark-light p-4 border-b border-dark-700/30">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-dark-800/80 border border-dark-600/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-dark-700/80 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3">
                <div className={`p-3 bg-gradient-to-br ${theme.iconBg} rounded-xl shadow-lg`}>
                  {industry.icon}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white mb-1">{industry.title}</h2>
                  <p className="text-sm text-primary-400 font-medium">{industry.subtitle}</p>
                  
                  {/* Results */}
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {industry.results.slice(0, 3).map((result, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-primary-400">{result.value}</div>
                        <div className="text-xs text-gray-400">{result.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-96 overflow-y-auto">
              <div className="p-4 space-y-4">
                {/* Description */}
                <div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {industry.description}
                  </p>
                </div>

                {/* Key Solutions - Top 3 only */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-primary-400" />
                    <h3 className="text-base font-semibold text-white">Key Solutions</h3>
                  </div>
                  <div className="space-y-2">
                    {industry.solutions.slice(0, 3).map((solution, index) => (
                      <div key={index} className="p-3 bg-dark-800/50 border border-dark-700/30 rounded-lg">
                        <p className="text-sm text-gray-300">{solution}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top 3 Challenges */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    <h3 className="text-base font-semibold text-white">Key Challenges</h3>
                  </div>
                  <div className="space-y-2">
                    {industry.challenges.slice(0, 3).map((challenge, index) => (
                      <div key={index} className="p-3 bg-orange-500/10 border border-orange-400/20 rounded-lg">
                        <p className="text-sm text-gray-300">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance - Top 3 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-base font-semibold text-white">Compliance & Security</h3>
                  </div>
                  <div className="grid gap-2">
                    {industry.compliance.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-emerald-500/10 border border-emerald-400/20 rounded-lg">
                        <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case Study - If exists */}
                {industry.caseStudy && (
                  <div className={`p-3 bg-gradient-to-br ${theme.gradient} border ${theme.border} rounded-lg`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4 text-white" />
                      <h4 className="text-sm font-semibold text-white">Success Story</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-white font-medium">{industry.caseStudy.company}</p>
                      <p className="text-xs text-emerald-300">{industry.caseStudy.result}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-4 border-t border-dark-700/30 bg-dark-light">
              <div className="flex flex-col sm:flex-row gap-3">
                <button className={`flex-1 px-4 py-2 bg-gradient-to-r ${theme.iconBg} rounded-lg font-medium text-white text-sm transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2`}>
                  <span>Schedule Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button className="flex-1 px-4 py-2 bg-dark-800/60 border border-dark-600/40 rounded-lg font-medium text-gray-300 text-sm transition-all duration-300 hover:border-primary-400/30 hover:text-white flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Contact Expert</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}