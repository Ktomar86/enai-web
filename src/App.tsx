import { useEffect, useState, lazy, Suspense } from 'react';
import { 
  Brain, 
  Zap, 
  Mail, 
  MessageSquare, 
  Target,
  Linkedin,
  Search,
  Calendar,
  Database,
  Phone,
  Play,
  CheckCircle,
  ArrowRight,
  Activity,
  Shield,
  Clock,
  UserCheck,
  Eye,
  AlertCircle,
  Plus,
  Minus,
  Check,
  ArrowUpRight,
  Award,
  TrendingUp
} from 'lucide-react';

import { Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { HeroSection } from './components/ui/hero-section';

// Lazy load heavy components to improve initial load performance
const ProductGIFShowcase = lazy(() => import('./components/ProductGIFShowcase'));
const WorkflowIllustration = lazy(() => import('./components/WorkflowIllustration'));
const ResultsWorkflow = lazy(() => import('./components/ResultsWorkflow'));
const BookingIllustration = lazy(() => import('./components/BookingIllustration'));
const ValueProposition = lazy(() => import('./components/ValueProposition'));
const ElevenLabsOrb = lazy(() => import('./components/ElevenLabsOrb'));
const OptimizedIntegrations = lazy(() => import('./components/OptimizedIntegrations.tsx'));

// Loading fallback component
const ComponentLoader = ({ className = "w-full h-48" }: { className?: string }) => (
  <div className={`${className} bg-surface-1 animate-pulse rounded-lg flex items-center justify-center`}>
    <div className="text-text-3">Loading...</div>
  </div>
);

// Defer heavy sections until near viewport (removed storyboard per request)

const featureShowcases = [
  {
    id: 'research',
    title: 'Prospect Research',
    description: 'AI automatically researches prospects, analyzing their LinkedIn profiles, company websites, and recent activities to identify key triggers and pain points.',
    icon: <Search className="w-6 h-6 monoline-icon" />,
    mockup: {
      type: 'research',
      data: {
        prospect: 'Sarah Chen - VP Sales @ TechCorp',
        company: 'TechCorp Solutions',
        triggers: ['Recently posted about scaling challenges', 'Company hiring 50+ sales reps', 'Mentioned CRM migration'],
        icpScore: 94,
        notes: ['Strong fit for enterprise solution', 'Pain point: manual lead qualification', 'Budget cycle: Q1 2024']
      }
    }
  },
  {
    id: 'sequences',
    title: 'Channel-aware Sequences',
    description: 'Create coordinated multi-channel campaigns with AI-generated emails, call scripts, and voicemail drops that work together seamlessly.',
    icon: <MessageSquare className="w-6 h-6 monoline-icon" />,
    mockup: {
      type: 'sequences',
      data: {
        email: {
          subject: 'Quick question about scaling your sales team',
          preview: 'Hi Sarah, I noticed TechCorp is expanding rapidly...'
        },
        callScript: 'Opening: Reference LinkedIn post about scaling challenges',
        voicemail: '30-second value-focused voicemail with clear next step',
        approvalStatus: 'pending'
      }
    }
  },
  {
    id: 'booking',
    title: 'Booking & Sync',
    description: 'Automatically book meetings when prospects respond positively, hold calendar slots, and sync all activity data to your CRM in real-time.',
    icon: <Calendar className="w-6 h-6 monoline-icon" />,
    mockup: {
      type: 'booking',
      data: {
        meeting: {
          title: 'Discovery Call - TechCorp Solutions',
          time: 'Tomorrow 3:00 PM EST',
          duration: '30 minutes'
        },
        crmUpdate: {
          contactCreated: true,
          activityLogged: true,
          dealStage: 'Discovery Scheduled'
        },
        calendarHold: 'Active'
      }
    }
  }
];

// Removed pipelinePlays in favor of tighter narrative

const controlFeatures = [
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: 'Approvals & Guardrails',
    description: 'Set who approves what content and when sequences auto-execute',
    details: 'Configure approval workflows by role, content type, and recipient volume'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Deliverability & Warmup',
    description: 'Built-in rate limits and domain/IP reputation management',
    details: 'Automatic sending limits and domain warming to protect your reputation'
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: 'Opt-out Handling',
    description: 'Automatic unsubscribe processing and suppression list management',
    details: 'Instant opt-out compliance with global suppression across all campaigns'
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Audit Trail',
    description: 'Complete log of every action, approval, and sequence execution',
    details: 'Full transparency with searchable logs and compliance reporting'
  }
];

// Removed granular result metrics in favor of a single combined workflow visual

const caseStudies = [
  {
    title: 'SaaS Startup - Lead Qualification',
    problem: 'Manual lead research taking 15+ minutes per prospect',
    solution: 'AI automated research and scoring based on 40+ data points',
    outcome: '300% more qualified leads, 85% less manual work'
  },
  {
    title: 'Enterprise Sales - Follow-up Sequences',
    problem: 'Inconsistent follow-ups and missed opportunities',
    solution: 'Multi-channel sequences with automatic timing and personalization',
    outcome: '90% faster response time, 2.5x meeting booking rate'
  },
  {
    title: 'Agency - CRM Management',
    problem: 'Hours spent on manual data entry and activity logging',
    solution: 'Real-time CRM sync and automated activity tracking',
    outcome: '4 hours saved per day, 100% data accuracy'
  }
];

const integrations = [
  { name: 'Salesforce', key: 'siSalesforce', color: '#00A1E0', category: 'CRM', depth: 3 },
  { name: 'HubSpot', key: 'siHubspot', color: '#FF7A59', category: 'CRM', depth: 2 },
  { name: 'Gmail', key: 'siGmail', color: '#EA4335', category: 'Email', depth: 3 },
  { name: 'Outlook', key: 'siMicrosoftoutlook', color: '#0078D4', category: 'Email', depth: 3 },
  { name: 'LinkedIn', key: 'siLinkedin', color: '#0A66C2', category: 'Productivity', depth: 2 },
  { name: 'Slack', key: 'siSlack', color: '#4A154B', category: 'Productivity', depth: 1 },
] as const;

const pricingPlans = [
  {
    name: 'Free Trial',
    price: '$0',
    period: '14 days',
    description: 'Try core features with limits',
    features: [
      '100 emails/month',
      '1 sequence template',
      'Basic reporting',
      'Email support'
    ],
    limitations: ['No voice features', 'No integrations', 'Single user only'],
    cta: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Starter',
    price: '$100',
    period: 'per agent/month',
    description: 'Essential automation for small teams',
    features: [
      '2,000 emails/month',
      '400 leads/month included',
      'Email sequences',
      'Basic reporting',
      'CRM integration',
      'Limited voice calling (50 mins/mo)',
      'Priority support'
    ],
    limitations: ['Voice minutes cap applies', 'Limited templates'],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$200',
    period: 'per agent/month',
    description: 'Full automation with voice and advanced features',
    features: [
      '10,000 emails/month',
      '2,000 leads/month included',
      'Email + voice sequences',
      'Domain warmup',
      'A/B testing',
      'All integrations',
      'Advanced analytics'
    ],
    limitations: [],
    cta: 'Upgrade to Pro',
    popular: true
  },
  {
    name: 'Team',
    price: 'Custom',
    period: '',
    description: 'Enterprise features with custom limits',
    features: [
      'Custom email limits',
      'Multi-seat management',
      'SSO integration',
      'SLA guarantees',
      'Custom approval workflows',
      'Dedicated success manager'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false
  }
];

const faqItems = [
  {
    question: 'Will it sound spammy?',
    answer: 'No. Our AI creates personalized messages based on real prospect data and triggers. Here\'s the difference: Generic template: "Hi [Name], hope you\'re well..." vs. AI-generated: "Hi Sarah, saw your post about scaling challenges at TechCorp. Many VPs in similar growth phases find..."'
  },
  {
    question: 'Do I approve content before it sends?',
    answer: 'Yes, absolutely. You have full control with multiple approval levels: auto-approve for reviewed templates, require approval for new content, or review everything. You can set rules by recipient type, content type, and volume.'
  },
  {
    question: 'What data do you store?',
    answer: 'We only store data necessary for the service: contact information, interaction history, and content templates. All data is encrypted and we never sell or share your data. See our Security page for complete details on data handling and compliance.'
  },
  {
    question: 'How do opt-outs and compliance work?',
    answer: 'Automatic opt-out processing with global suppression lists. We handle unsubscribes instantly across all campaigns and maintain compliance with CAN-SPAM, GDPR, and other regulations. DPA available for enterprise customers.'
  },
  {
    question: 'What about email and domain warmup?',
    answer: 'Built-in sending limits and gradual volume ramp-up to protect your domain reputation. We monitor bounce rates, spam complaints, and deliverability metrics. Custom warmup schedules for new domains.'
  },
  {
    question: 'Which CRMs and email providers do you support?',
    answer: 'We integrate with Salesforce, HubSpot, Pipedrive, Gmail, Outlook, and most major providers. Full two-way sync for contacts, activities, and deal updates. API connections for custom CRMs available.'
  }
];



function App() {
  const [activeTab, setActiveTab] = useState('research');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showApprovalAfter, setShowApprovalAfter] = useState(false);
  const [integrationFilter, setIntegrationFilter] = useState('');
  const [annualBilling, setAnnualBilling] = useState(false);
  const [faqSearchTerm, setFaqSearchTerm] = useState('');
  const [activePipelinePlay, setActivePipelinePlay] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [activeUseCase, setActiveUseCase] = useState<'sdr' | 'ae' | 'revops'>('sdr');

  const filteredFaqItems = faqItems.filter(item =>
    item.question.toLowerCase().includes(faqSearchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(faqSearchTerm.toLowerCase())
  );

  const renderMockup = (showcase: typeof featureShowcases[0]) => {
    const { mockup } = showcase;
    
    switch (mockup.type) {
      case 'research':
        const researchData = mockup.data as any;
        return (
          <div className="feature-mockup p-6">
            <div className="bg-surface-1/80 rounded-lg p-4 border border-line-weak/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-text-3 text-sm ml-4">AI Research</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">{researchData.prospect}</h4>
                  <Badge className="bg-primary-400/20 text-primary-400">ICP Score: {researchData.icpScore}%</Badge>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-text-2">Key Triggers:</h5>
                  {researchData.triggers.map((trigger: string, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      <Activity className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-text-2 text-sm">{trigger}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-1">
                  <h5 className="text-sm font-medium text-text-2">AI Notes:</h5>
                  {researchData.notes.map((note: string, i: number) => (
                    <div key={i} className="text-text-3 text-sm">• {note}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'sequences':
        const sequenceData = mockup.data as any;
        return (
          <div className="feature-mockup p-6">
            <div className="space-y-4">
              <div className="bg-surface-1/80 rounded-lg p-4 border border-line-weak/50">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <span className="text-white font-medium">Email Draft</span>
                  <Badge className={`ml-auto ${sequenceData.approvalStatus === 'pending' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-green-400/20 text-green-400'}`}>
                    {sequenceData.approvalStatus}
                  </Badge>
                </div>
                <div className="text-sm">
                  <div className="text-text-3">Subject:</div>
                  <div className="text-white">{sequenceData.email.subject}</div>
                  <div className="text-text-3 mt-2">Preview:</div>
                  <div className="text-text-2">{sequenceData.email.preview}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-1/80 rounded-lg p-3 border border-line-weak/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-primary-400" />
                    <span className="text-white text-sm font-medium">Call Script</span>
                  </div>
                  <div className="text-xs text-text-2">{sequenceData.callScript}</div>
                </div>
                
                <div className="bg-surface-1/80 rounded-lg p-3 border border-line-weak/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="w-4 h-4 text-primary-400" />
                    <span className="text-white text-sm font-medium">Voicemail</span>
                  </div>
                  <div className="text-xs text-text-2">{sequenceData.voicemail}</div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'booking':
        const bookingData = mockup.data as any;
        return (
          <div className="feature-mockup p-6">
            <div className="space-y-4">
              <div className="bg-surface-1/80 rounded-lg p-4 border border-line-weak/50">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-primary-400" />
                  <span className="text-white font-medium">Meeting Scheduled</span>
                  <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                </div>
                <div className="space-y-2">
                  <div className="text-white">{bookingData.meeting.title}</div>
                  <div className="text-text-2 text-sm">{bookingData.meeting.time}</div>
                  <div className="text-text-3 text-xs">{bookingData.meeting.duration}</div>
                </div>
              </div>
              
              <div className="bg-surface-1/80 rounded-lg p-4 border border-line-weak/50">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-4 h-4 text-primary-400" />
                  <span className="text-white font-medium">CRM Sync</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-2">Contact Created</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-2">Activity Logged</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-2">Deal Stage</span>
                    <span className="text-primary-400">{bookingData.crmUpdate.dealStage}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };



  useEffect(() => {
    // Enhanced scroll animations with better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger progress bars when they come into view
            if (entry.target.classList.contains('progress-indicator')) {
              entry.target.classList.add('active');
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
      }
    );

    // Observe scroll-fade elements
    document.querySelectorAll('.scroll-fade, .scroll-reveal, .progress-indicator').forEach(element => {
      observer.observe(element);
    });

    // Add floating animation to background elements
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element) => {
      const randomDelay = Math.random() * 2;
      const randomDuration = 6 + Math.random() * 4;
      (element as HTMLElement).style.animationDelay = `${randomDelay}s`;
      (element as HTMLElement).style.animationDuration = `${randomDuration}s`;
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-surface-0 text-white">
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        className="pt-24 pb-0"
        title="Meet Your New"
        subtitle={{
          regular: "",
          gradient: "AI WORKERS"
        }}
        description="Stop losing leads to manual prospecting. Our AI workers handle research, outreach, and booking - so your team can focus on closing deals."
        ctaText="Get Demo"
        ctaHref="https://calendly.com/enai-ai2024/30min"
        secondaryCtaText="Learn More"
        onSecondaryCta={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
        gridOptions={{
          angle: 65,
          cellSize: 60,
          opacity: 0.3,
          lightLineColor: "rgba(247, 183, 51, 0.2)",
          darkLineColor: "rgba(247, 183, 51, 0.1)"
        }}
        aria-labelledby="hero-heading"
        contentPaddingY="py-24"
      />

      {/* Trust Bar - Authentic Feature Highlights */}
      <section className="py-8 bg-surface-0" aria-label="trust-indicators">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <div className="flex items-center gap-2 text-text-2 text-sm">
              <Shield className="w-4 h-4 text-brand" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2 text-text-2 text-sm">
              <Eye className="w-4 h-4 text-brand" />
              <span>Full Transparency</span>
            </div>
            <div className="flex items-center gap-2 text-text-2 text-sm">
              <Activity className="w-4 h-4 text-brand" />
              <span>Complete Audit Trail</span>
            </div>
            <div className="flex items-center gap-2 text-text-2 text-sm font-medium">
              <Award className="w-4 h-4 text-brand" />
              <span className="text-text-1">Built for B2B Teams</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product GIFs / Visual Storytelling */}
      <Suspense fallback={<ComponentLoader className="w-full h-96" />}>
        <ProductGIFShowcase
        items={[
          {
            id: 'research-loop',
            title: 'Prospect research loop',
            caption: 'Enai analyzes profiles, sites, and signals to prep outreach in seconds.',
            media: <div className="w-full h-full flex items-center justify-center bg-surface-1/50"><WorkflowIllustration className="aspect-video w-full" /></div>,
          },
          {
            id: 'orchestrate',
            title: 'Channel‑aware sequences',
            caption: 'Email, LinkedIn, and voice—coordinated with your brand guardrails.',
            mediaSrc: '/enai-dashboard.png',
            alt: 'Sequence orchestration visualization'
          },
          {
            id: 'book-sync',
            title: 'Auto book & sync',
            caption: 'Calendar holds, confirmations, and CRM updates—handled for you.',
            media: <div className="w-full h-full flex items-center justify-center bg-surface-1/50"><BookingIllustration className="aspect-video w-full" /></div>,
          }
        ]}
        />
      </Suspense>

      {/* Value Proposition */}
      <Suspense fallback={<ComponentLoader className="w-full h-64" />}>
        <ValueProposition />
      </Suspense>

      {/* Use Cases */}
      <section className="py-24 bg-surface-0 scroll-fade" aria-labelledby="use-cases-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* state for interactive plays */}
          {/* @ts-expect-error - used in JSX below via setActivePipelinePlay */}
          {typeof activePipelinePlay === 'undefined' && setActivePipelinePlay && null}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 id="use-cases-heading" className="text-h2 md:text-6xl font-bold gradient-text mb-6 tracking-tight [text-wrap:balance]">
              See how AI workers research, write, and book—within your guardrails
            </h2>
            <Separator className="mb-8 max-w-md mx-auto" />
            <p className="text-body-lg text-text-2 max-w-3xl mx-auto leading-relaxed">
              From startups to enterprise sales orgs—spin up AI workers that match your motion.
            </p>
          </motion.div>

          {/* Interactive use-case rail */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Selector */}
            <div className="space-y-3 order-2 lg:order-1">
              {([
                { key: 'sdr', title: 'Outbound SDRs', desc: 'Find ICP accounts, draft first-touch, keep pipeline warm.' },
                { key: 'ae', title: 'AE / Closing', desc: 'Auto‑prep briefs, respond faster, and book meetings directly.' },
                { key: 'revops', title: 'RevOps', desc: 'Clean CRM, enforce guardrails, and surface performance insights.' }
              ] as const).map((uc) => (
                <button
                  key={uc.key}
                  onClick={() => setActiveUseCase(uc.key)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-300 ${
                    activeUseCase === uc.key ? 'border-primary-400/40 bg-primary-400/10' : 'border-line-weak bg-surface-2/40 hover:bg-surface-2'
                  }`}
                >
                  <div className="text-white font-medium text-sm">{uc.title}</div>
                  <div className="text-xs text-text-3">{uc.desc}</div>
                </button>
              ))}
            </div>

            {/* Animated mini-workflow per use-case */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`uc-${activeUseCase}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card glass-accent overflow-hidden border border-line-weak/50"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-white">
                      {activeUseCase === 'sdr' ? 'Outbound SDR Highlights' : activeUseCase === 'ae' ? 'AE Closing Highlights' : 'RevOps Highlights'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid sm:grid-cols-3 gap-4">
                      {(activeUseCase === 'sdr'
                        ? ['ICP discovery', 'First‑touch at scale', 'Warm pipeline']
                        : activeUseCase === 'ae'
                        ? ['Auto prep briefs', 'Faster responses', 'Calendar assist']
                        : ['Data hygiene', 'Guardrails', 'Live reporting']
                      ).map((point, i) => (
                        <motion.div
                          key={`uc-point-${i}`}
                          className="rounded-lg bg-surface-2/60 border border-line-weak p-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-yellow-400" />
                            <span className="text-sm text-white">{point}</span>
                          </div>
                          <p className="text-xs text-text-3 mt-1">
                            {activeUseCase === 'sdr' && (i === 0 ? 'Find accounts matching your ICP' : i === 1 ? 'Human‑quality personalization' : 'Keep leads engaged')}
                            {activeUseCase === 'ae' && (i === 0 ? 'Briefs from CRM + web signals' : i === 1 ? 'Turn replies into meetings' : 'Auto holds and invites')}
                            {activeUseCase === 'revops' && (i === 0 ? 'Enrich, dedupe, and validate' : i === 1 ? 'Approval + compliance rules' : 'Insights without spreadsheets')}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg" 
              className="animate-pulse-subtle"
              onClick={() => window.open('https://calendly.com/enai-ai2024/30min', '_blank')}
            >
              Schedule Live Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-24 bg-surface-0 scroll-fade" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 id="services-heading" className="text-h2 md:text-6xl font-bold gradient-text mb-6 tracking-tight [text-wrap:balance]">
              Services
            </h2>
            <Separator className="mb-8 max-w-md mx-auto" />
            <p className="text-body-lg text-text-2 max-w-3xl mx-auto leading-relaxed">
              Research, write, and book—with approval guardrails. Average teams see +8-20% reply lift in 30 days.*
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Search className="w-5 h-5 text-primary-400" />,
                title: 'AI Lead Qualification',
                points: ['Score by 40+ buying signals', 'Auto-prioritize accounts']
              },
              {
                icon: <Zap className="w-5 h-5 text-primary-400" />,
                title: 'AI Outreach Orchestration',
                points: ['Channel-aware sequences', 'Brand-safe personalization']
              },
              {
                icon: <MessageSquare className="w-5 h-5 text-primary-400" />,
                title: 'Prospect Research',
                points: ['Context from web + CRM', 'Briefs for every touchpoint']
              },
              {
                icon: <Database className="w-5 h-5 text-primary-400" />,
                title: 'CRM Sync & Reporting',
                points: ['Clean activity logging', 'Outcomes and ROI metrics']
              }
            ].map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="glass-card glass-accent h-full">
                  <CardHeader className="pb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-400/10 mb-2">
                      {svc.icon}
                    </div>
                    <CardTitle className="text-lg">{svc.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {svc.points.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-text-2">
                          <Check className="w-4 h-4 text-green-400 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              size="lg"
              className="animate-pulse-subtle"
              onClick={() => window.open('https://calendly.com/enai-ai2024/30min', '_blank')}
            >
              Schedule Live Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Product Demo Section */}
      <section className="py-24 bg-surface-0 relative overflow-hidden scroll-fade" aria-labelledby="demo-heading">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Compact badge */}
            <div className="inline-flex items-center justify-center px-3 py-1 bg-primary-400/10 border border-primary-400/20 rounded-full mb-6">
              <Zap className="w-3 h-3 mr-2 text-primary-400" />
              <span className="text-xs sm:text-sm font-medium text-primary-400">See It In Action</span>
            </div>
            
            {/* Mobile-optimized heading */}
            <h2 id="demo-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4 tracking-tight leading-tight px-4">
              <span className="block sm:inline">Watch AI Agents</span>
              <span className="block sm:inline"> Drive Results</span>
            </h2>
            <Separator className="mb-6 max-w-md mx-auto" />
            
            {/* Better mobile typography */}
            <p className="text-base sm:text-lg md:text-xl text-text-2 max-w-2xl mx-auto leading-relaxed px-4">
              See how our AI agents automatically 
              <span className="text-primary-400 font-medium">identify prospects, craft personalized outreach, and book qualified meetings</span>
              — all while you focus on closing deals.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced Interactive Demo Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="product-mockup p-6 relative">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-purple-500/20 rounded-2xl blur-xl opacity-70"></div>
                <div className="relative bg-surface-1/90 rounded-2xl p-6 border border-line-weak/50 backdrop-blur-sm">
                  {/* Decorative elements */}
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary-400/5 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
                  
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-400"></div>
                      <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                      <div className="w-4 h-4 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-text-2 text-lg ml-4 font-medium">AI Agent Dashboard</span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium">LIVE</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6 relative z-10">
                    {/* Enhanced Real-time simulation */}
                    <div className="data-viz rounded-xl p-4 border border-primary-400/30 bg-surface-2/60 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-xl font-bold text-white">Lead Qualification Pipeline</h4>
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-sm text-green-400 font-medium">LIVE</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-base">
                            <span className="text-text-2 flex items-center">
                              <Target className="w-4 h-4 mr-2 text-primary-400" />
                              Processing Prospects
                            </span>
                            <span className="text-primary-400 font-bold text-lg">847/1,200</span>
                          </div>
                          <div className="w-full bg-surface-2 rounded-full h-3 overflow-hidden">
                            <motion.div 
                              className="bg-gradient-to-r from-primary-400 to-purple-500 h-3 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: '71%' }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.5 }}
                            ></motion.div>
                          </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                          <div className="p-4 rounded-xl bg-surface-2/50 border border-line-weak/30 hover:border-primary-400/30 transition-all duration-300 group">
                            <div className="text-2xl font-bold text-primary-400 group-hover:text-primary-300 transition-colors duration-300">2,847</div>
                            <div className="text-text-3 text-sm mt-1">Qualified</div>
                          </div>
                          <div className="p-4 rounded-xl bg-surface-2/50 border border-line-weak/30 hover:border-green-400/30 transition-all duration-300 group">
                            <div className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">94%</div>
                            <div className="text-text-3 text-sm mt-1">Accuracy</div>
                          </div>
                          <div className="p-4 rounded-xl bg-surface-2/50 border border-line-weak/30 hover:border-purple-400/30 transition-all duration-300 group">
                            <div className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">4.2s</div>
                            <div className="text-text-3 text-sm mt-1">Avg Speed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Interactive workflow visualization */}
                    <div className="bg-surface-2/70 rounded-xl p-4 border border-line-weak/50 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                      <div className="relative z-10">
                        <h4 className="text-xl font-bold text-white mb-6">Workflow Execution</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 rounded-lg bg-surface-2/30 border border-line-weak/20 hover:border-primary-400/30 transition-all duration-300 group">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-primary-400 flex items-center justify-center">
                                <Check className="w-3 h-3 text-dark" />
                              </div>
                              <span className="text-text-2 text-base group-hover:text-white transition-colors duration-300">Data Analysis</span>
                            </div>
                            <span className="text-sm text-green-400 font-medium flex items-center">
                              Completed
                              <CheckCircle className="w-4 h-4 ml-1" />
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-4 rounded-lg bg-surface-2/30 border border-line-weak/20 hover:border-yellow-400/30 transition-all duration-300 group">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse flex items-center justify-center"></div>
                              <span className="text-text-2 text-base group-hover:text-white transition-colors duration-300">Pattern Recognition</span>
                            </div>
                            <span className="text-sm text-yellow-400 font-medium flex items-center">
                              In Progress
                              <Activity className="w-4 h-4 ml-1 animate-pulse" />
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-4 rounded-lg bg-surface-2/30 border border-line-weak/20 hover:border-line-strong transition-all duration-300 group">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-text-3 flex items-center justify-center"></div>
                              <span className="text-text-2 text-base group-hover:text-white transition-colors duration-300">Action Execution</span>
                            </div>
                            <span className="text-sm text-text-3 font-medium flex items-center">
                              Pending
                              <Clock className="w-4 h-4 ml-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Features List with Interactive Elements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-10"
            >
              <div className="space-y-8">
                <div className="flex items-start gap-6 group cursor-pointer p-6 rounded-2xl bg-surface-2/30 border border-line-weak/50 hover:border-primary-400/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary-400/10 flex items-center justify-center group-hover:bg-primary-400/20 transition-all duration-300 relative z-10">
                    <Zap className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">Real-time Processing</h3>
                    <p className="text-text-2 mt-3 text-lg leading-relaxed">Our AI agents process thousands of data points simultaneously, delivering insights in milliseconds with zero latency.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group cursor-pointer p-6 rounded-2xl bg-surface-2/30 border border-line-weak/50 hover:border-primary-400/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary-400/10 flex items-center justify-center group-hover:bg-primary-400/20 transition-all duration-300 relative z-10">
                    <Brain className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">Intelligent Automation</h3>
                    <p className="text-text-2 mt-3 text-lg leading-relaxed">Self-learning algorithms adapt to your business patterns, continuously improving performance and ROI.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group cursor-pointer p-6 rounded-2xl bg-surface-2/30 border border-line-weak/50 hover:border-primary-400/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary-400/10 flex items-center justify-center group-hover:bg-primary-400/20 transition-all duration-300 relative z-10">
                    <Shield className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">Enterprise Security</h3>
                    <p className="text-text-2 mt-3 text-lg leading-relaxed">Bank-grade encryption and compliance frameworks protect your sensitive business data with zero compromise.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-8">
                <Button className="bg-primary-400 hover:bg-primary-500 text-white font-semibold px-10 py-4 rounded-xl transition-colors duration-200 text-lg">
                  <a href="https://calendly.com/enai-ai2024/30min" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Schedule a Live Demo
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </a>
                </Button>
              </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview (centered) */}
      <section className="py-16 bg-surface-0 scroll-fade" aria-labelledby="dashboard-preview-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="dashboard-preview-heading" className="sr-only">ENAI Dashboard Preview</h2>
          <div className="product-mockup dashboard-frame p-2 sm:p-6">
            <img
              src="/enai-dashboard.png"
              alt="ENAI dashboard"
              loading="lazy"
              className="w-full rounded-2xl border border-line-weak shadow-lg"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl border border-line-weak/60 bg-surface-2/60 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-md bg-primary-400/10 text-primary-400 inline-flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-medium text-text-2">AI Insights</span>
              </div>
              <p className="text-sm text-text-2">Instant quality analysis and <span className="gradient-text">engagement trends</span> surfaced automatically.</p>
            </div>
            <div className="rounded-xl border border-line-weak/60 bg-surface-2/60 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-md bg-primary-400/10 text-primary-400 inline-flex items-center justify-center">
                  <Target className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-medium text-text-2">Lead Scoring</span>
              </div>
              <p className="text-sm text-text-2">Score accounts by <span className="gradient-text">40+ buying signals</span> to focus effort where it counts.</p>
            </div>
            <div className="rounded-xl border border-line-weak/60 bg-surface-2/60 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-md bg-primary-400/10 text-primary-400 inline-flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-medium text-text-2">Predicted Revenue</span>
              </div>
              <p className="text-sm text-text-2">Reliable forecasts and <span className="gradient-text">live conversions</span> in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED: Visual Sales Process Storyboard - removed per request */}

      {/* Feature Showcase Sections */}
      <section className="py-24 bg-surface-0 scroll-fade section-enhanced" aria-labelledby="feature-showcase-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 id="feature-showcase-heading" className="text-5xl font-bold gradient-text mb-6 tracking-tight [text-wrap:balance]">
              Core Features in Action
            </h2>
            <Separator className="mb-8 max-w-md mx-auto" />
            <p className="text-xl text-text-2 max-w-3xl mx-auto">
              See how our AI handles the entire sales process from research to booking
            </p>
          </motion.div>

          {/* Tab Navigation with Micro-interactions */}
          <div className="flex justify-center mb-12">
            <div className="tab-nav max-w-md bg-surface-2/50 p-1 rounded-xl border border-line-weak/50">
              {featureShowcases.map((showcase) => (
                <button
                  key={showcase.id}
                  onClick={() => setActiveTab(showcase.id)}
                  className={`tab-nav-item ${activeTab === showcase.id ? 'active' : ''} transition-all duration-300 hover:bg-surface-2/50`}
                >
                  <div className="flex items-center gap-2">
                    {showcase.icon}
                    <span className="hidden sm:inline">{showcase.title.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Feature Content */}
          {featureShowcases.map((showcase) => (
            <div
              key={showcase.id}
              className={`${activeTab === showcase.id ? 'block' : 'hidden'}`}
            >
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Text Content with Micro-interactions */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-lg bg-primary-400/10 flex items-center justify-center group-hover:bg-primary-400/20 transition-all duration-300 animate-pulse-slow">
                      {showcase.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">{showcase.title}</h3>
                  </div>
                  
                  <p className="text-xl text-text-2 leading-relaxed">
                    {showcase.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={() => window.open("https://calendly.com/enai-ai2024/30min", "_blank")}
                      className="cta-button px-6 py-3 rounded-lg font-medium shadow-lg hover-lift transition-all duration-300"
                    >
                      See Full Demo
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    <div className="text-sm text-text-3">
                      Watch in real-time
                    </div>
                  </div>
                </motion.div>

                {/* UI Mockup with Enhanced Interactions */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="feature-demo-enter hover-lift transition-all duration-300">
                    {renderMockup(showcase)}
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
          
          {/* FAQ Schema Implementation */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What are AI Agents?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Autonomous AI workers that learn and adapt to your business processes, delivering human-level performance at machine speed."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does End-to-End Automation work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Seamlessly automate complex workflows across your organization, reducing manual effort by up to 90% with multi-channel campaign orchestration and dynamic personalization."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What analytics capabilities are available?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Gain deep insights with real-time dashboards, predictive analytics, and ROI attribution to optimize performance."
                  }
                }
              ]
            })}
          </script>
        </div>
      </section>

      {/* Pipeline Plays removed for a tighter flow */}

      {/* Control & Visibility Grid */}
      <section className="py-24 bg-surface-0 scroll-fade section-enhanced" aria-labelledby="control-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 id="control-heading" className="text-5xl font-bold gradient-text mb-6">
              Control & Visibility
            </h2>
            <Separator className="mb-8 max-w-md mx-auto" />
            <p className="text-xl text-text-2 max-w-3xl mx-auto">
              Build trust with complete transparency and control over your AI automation
            </p>
          </motion.div>

          {/* Before/After Approval Slider */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Template Approval Process</h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowApprovalAfter(!showApprovalAfter)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        !showApprovalAfter 
                          ? 'bg-primary-400 text-white' 
                          : 'bg-surface-2 text-text-2 hover:bg-surface-1'
                      }`}
                    >
                      Before
                    </button>
                    <button
                      onClick={() => setShowApprovalAfter(!showApprovalAfter)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        showApprovalAfter 
                          ? 'bg-green-500 text-white' 
                          : 'bg-surface-2 text-text-2 hover:bg-surface-1'
                      }`}
                    >
                      After
                    </button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {!showApprovalAfter ? (
                      <div className="bg-surface-1/80 rounded-lg p-4 border border-yellow-400/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-medium">Pending Approval</span>
                  </div>
                        <div className="text-sm text-text-2">
                          <div className="text-text-3">Subject:</div>
                          <div className="text-white">Quick question about your sales process</div>
                          <div className="text-text-3 mt-2">Template:</div>
                          <div className="text-text-2">Hi [Name], I noticed [Company] is...</div>
                </div>
                  </div>
                    ) : (
                      <div className="bg-surface-1/80 rounded-lg p-4 border border-green-400/20">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-medium">Approved & Scheduled</span>
                </div>
                        <div className="text-sm text-text-2">
                          <div className="text-text-3">Subject:</div>
                          <div className="text-white">Quick question about your sales process</div>
                          <div className="text-text-3 mt-2">Schedule:</div>
                          <div className="text-green-300">Sequence starts in 2 hours</div>
          </div>
                  </div>
                    )}
                </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary-400/10 flex items-center justify-center mx-auto mb-4">
                        {!showApprovalAfter ? (
                          <Clock className="w-8 h-8 text-primary-400" />
                        ) : (
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        )}
                  </div>
                      <p className="text-text-2">
                        {!showApprovalAfter 
                          ? 'Awaiting manager approval' 
                          : 'Auto-executing approved sequence'
                        }
                      </p>
                </div>
          </div>
        </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Control Features Grid with Advanced Visuals */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {controlFeatures.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Card className="glass-card glass-accent h-full hover-lift transition-all duration-500 group relative overflow-hidden border border-line-weak/50 hover:border-primary-400/40 shadow-lg hover:shadow-xl hover:shadow-primary-400/10 bg-surface-2/60 backdrop-blur-sm rounded-2xl">
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-xl bg-primary-400/10 flex items-center justify-center text-primary-400 group-hover:bg-primary-400/20 transition-all duration-300 shadow-lg">
                        {feature.icon}
                      </div>
                      {/* Enhanced Status Badge */}
                      <Badge 
                        variant="secondary" 
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                          index % 3 === 0 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30' 
                            : index % 3 === 1 
                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30' 
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                        }`}
                      >
                        {index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Pending' : 'Configurable'}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-text-2 mb-4 text-lg leading-relaxed">{feature.description}</p>
                    <p className="text-text-3 text-base leading-relaxed">{feature.details}</p>
                    
                    {/* Enhanced Tooltip on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 pointer-events-none rounded-2xl">
                      <div className="text-sm text-text-2 bg-surface-2/90 p-4 rounded-xl border border-line-weak/50 backdrop-blur-sm shadow-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-2 h-2 rounded-full ${
                            index % 3 === 0 ? 'bg-green-400' : 
                            index % 3 === 1 ? 'bg-yellow-400' : 'bg-blue-400'
                          }`}></div>
                          <span className="font-medium">Status Details</span>
                        </div>
                        <p className="text-text-2 text-sm mt-3">
                          {index % 3 === 0 
                            ? 'Fully operational and monitoring in real-time with live analytics' 
                            : index % 3 === 1 
                              ? 'Awaiting configuration or approval with customizable parameters' 
                              : 'Customizable settings available with role-based access control'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Results & Proof with Advanced Visual Indicators */}
      <section className="py-32 bg-surface-0 relative overflow-hidden scroll-fade" aria-labelledby="results-heading">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="floating-element absolute top-10 right-10 w-32 h-32 bg-primary-400/10 rounded-full blur-2xl"></div>
          <div className="floating-element absolute bottom-20 left-20 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl"></div>
          <div className="floating-element absolute top-1/3 left-1/4 w-24 h-24 bg-primary-400/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-purple-500/20 rounded-full blur-xl"></div>
                <span className="relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-surface-2/50 border border-primary-400/30 text-primary-400">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Proven Results
                </span>
              </div>
            </div>
            <h2 id="results-heading" className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              <span>What Teams Report After 30 Days</span>
            </h2>
            <Separator className="mb-8 max-w-md mx-auto bg-gradient-to-r from-primary-400/50 to-purple-500/50" />
            <p className="text-xl text-text-2 max-w-3xl mx-auto leading-relaxed">
              Honest outcomes with real ranges, not fake promises
            </p>
          </motion.div>
          
          <div className="max-w-6xl mx-auto">
            {/* Combined workflow illustration for 30‑day results */}
            <div className="mb-10 rounded-2xl overflow-hidden border border-line-weak/50 bg-surface-2/60 product-mockup glass-accent">
              <div className="aspect-[16/6]">
                <Suspense fallback={<ComponentLoader className="w-full h-full" />}>
                  <ResultsWorkflow className="w-full h-full" />
                </Suspense>
              </div>
            </div>
            {/* Metrics removed; single visual conveys the story concisely */}
            
            {/* Enhanced Review Schema */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Product",
                "name": "ENAI AI Sales Platform",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "reviewCount": "127",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "review": [
                  {
                    "@type": "Review",
                    "author": {
                      "@type": "Person",
                      "name": "Sarah Johnson"
                    },
                    "datePublished": "2024-03-15",
                    "reviewBody": "ENAI increased our reply rates by 15% in just two weeks. The time savings alone are worth it.",
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "5",
                      "bestRating": "5",
                      "worstRating": "1"
                    }
                  },
                  {
                    "@type": "Review",
                    "author": {
                      "@type": "Person",
                      "name": "Michael Torres"
                    },
                    "datePublished": "2024-02-28",
                    "reviewBody": "The automation quality is impressive. Our SDRs save 3+ hours daily on manual tasks.",
                    "reviewRating": {
                      "@type": "Rating",
                      "ratingValue": "4.5",
                      "bestRating": "5",
                      "worstRating": "1"
                    }
                  }
                ]
              })}
            </script>
          </div>
        </div>
      </section>

      {/* Enhanced Case Studies Section with Advanced Visuals */}
      <section className="py-32 bg-surface-0 relative overflow-hidden scroll-fade" aria-labelledby="case-studies-heading">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="floating-element absolute top-20 left-10 w-48 h-48 bg-primary-400/5 rounded-full blur-3xl"></div>
          <div className="floating-element absolute bottom-10 right-10 w-56 h-56 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-purple-500/20 rounded-full blur-xl"></div>
                <span className="relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-surface-2/50 border border-primary-400/30 text-primary-400">
                  <Award className="w-4 h-4 mr-2" />
                  Real Results
                </span>
              </div>
            </div>
            <h2 id="case-studies-heading" className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              See How Teams Are Solving Real Problems with AI Automation
            </h2>
            <Separator className="mb-6 max-w-md mx-auto bg-gradient-to-r from-primary-400/50 to-purple-500/50" />
            <p className="text-lg md:text-xl text-text-2 max-w-3xl mx-auto leading-relaxed">
              Discover how industry leaders are leveraging our platform to transform their sales processes and achieve remarkable results.
            </p>
          </motion.div>
          
          {/* Interactive case studies rail + animated card */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Selector list */}
            <div className="space-y-3 order-2 lg:order-1">
              {caseStudies.map((study, i) => (
                <button
                  key={`cs-${i}`}
                  onClick={() => setActiveCaseStudy(i)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-300 ${
                    activeCaseStudy === i ? 'border-primary-400/40 bg-primary-400/10' : 'border-line-weak bg-surface-2/40 hover:bg-surface-2'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-400/10 flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                      <div className="text-white font-medium text-sm">{study.title}</div>
                      <div className="text-xs text-text-3">2024 Results</div>
                      </div>
                    </div>
                </button>
              ))}
                    </div>
                    
            {/* Animated detail card */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <AnimatePresence mode="wait">
                          <motion.div 
                  key={`cs-card-${activeCaseStudy}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card glass-accent overflow-hidden border border-line-weak/50"
                >
                  <CardHeader className="pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-400/10 flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary-400" />
                        </div>
                    <CardTitle className="text-lg text-white">
                      {caseStudies[activeCaseStudy].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[{label:'Problem',icon:Calendar,text:caseStudies[activeCaseStudy].problem},{label:'What Enai Did',icon:Zap,text:caseStudies[activeCaseStudy].solution},{label:'Outcome',icon:Target,text:caseStudies[activeCaseStudy].outcome}].map((b,i)=> (
                        <div key={`cs-block-${i}`} className="p-4 rounded-xl bg-surface-2/50 border border-line-weak">
                          <div className="flex items-center gap-2 text-sm mb-2">
                            <b.icon className="w-4 h-4 text-primary-400" />
                            <span className="text-text-2">{b.label}</span>
                      </div>
                          <p className="text-xs text-text-3 leading-relaxed">{b.text}</p>
                        </div>
                      ))}
                    </div>
                    {/* Animated progress strip */}
                    <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                          <motion.div 
                        className="h-full bg-gradient-to-r from-primary-400 to-yellow-400"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.2 }}
                      />
                    </div>
                  </CardContent>
              </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>  

      {/* Removed secondary Success Stories to avoid duplication with Real Results */}

      {/* Integrations with Categorization */}
      <section className="py-16 bg-surface-0 scroll-fade" aria-labelledby="integrations-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 id="integrations-heading" className="text-2xl font-bold text-white mb-4 tracking-tight [text-wrap:balance]">
              Integrates with your existing tools
            </h3>
            <p className="text-text-2">
              Connect seamlessly with the platforms you already use
            </p>
          </motion.div>
          
          {/* Integration Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['All', 'CRM', 'Email', 'Analytics', 'Productivity'].map((category) => (
              <button
                key={category}
                onClick={() => setIntegrationFilter(category === 'All' ? '' : category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  integrationFilter === category || (category === 'All' && !integrationFilter)
                    ? 'bg-primary-400 text-white'
                    : 'bg-surface-2 text-text-2 hover:bg-surface-1'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <Suspense fallback={<ComponentLoader className="w-full h-32" />}>
            <OptimizedIntegrations 
              integrations={integrations.filter(integration => 
                integrationFilter === '' || 
                integration.category === integrationFilter ||
                integrationFilter === 'All'
              )} 
            />
          </Suspense>
        </div>
      </section>

      {/* Outcomes stripe */}
      <section id="outcomes" className="py-16 bg-surface-0 scroll-fade" aria-labelledby="outcomes-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 id="outcomes-heading" className="text-4xl md:text-5xl font-bold gradient-text mb-6 tracking-tight [text-wrap:balance]">
              Proven Outcomes
            </h2>
            <p className="text-lg text-text-2 max-w-3xl mx-auto">
              Typical outcomes reported by teams within the first month. Actual results vary by baseline and implementation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card glass-accent">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary-400" />
                  <h3 className="text-white font-semibold">More replies</h3>
                </div>
                <div className="text-3xl font-bold text-primary-400">+8–20%</div>
                <p className="text-sm text-text-3 mt-1">Context‑aware messaging boosts response rates</p>
                <p className="text-[11px] text-text-3 mt-1">Typical range reported; not guaranteed</p>
              </CardContent>
            </Card>
            <Card className="glass-card glass-accent">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-primary-400" />
                  <h3 className="text-white font-semibold">More qualified meetings</h3>
                </div>
                <div className="text-3xl font-bold text-primary-400">Up to 2.5×</div>
                <p className="text-sm text-text-3 mt-1">Better targeting and prioritization</p>
              </CardContent>
            </Card>
            <Card className="glass-card glass-accent">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-primary-400" />
                  <h3 className="text-white font-semibold">Cleaner CRM</h3>
                </div>
                <div className="text-3xl font-bold text-primary-400">Automated</div>
                <p className="text-sm text-text-3 mt-1">Activity logging and sync; coverage depends on integrations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview with Toggle */}
      <section className="py-24 bg-surface-0 scroll-fade" aria-labelledby="pricing-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 id="pricing-heading" className="text-5xl font-bold gradient-text mb-6 tracking-tight [text-wrap:balance]">
              Simple, Transparent Pricing
            </h2>
            <Separator className="mb-8 max-w-md mx-auto" />
            <p className="text-xl text-text-2 max-w-3xl mx-auto">
              No hidden fees, no unlimited promises. Clear limits, fair pricing.
            </p>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-medium ${!annualBilling ? 'text-primary-400' : 'text-text-3'}`}>
                Monthly
              </span>
              <button 
                onClick={() => setAnnualBilling(!annualBilling)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-surface-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-text-1 transition-transform duration-300 ${annualBilling ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className={`text-sm font-medium ${annualBilling ? 'text-primary-400' : 'text-text-3'}`}>
                Annual <Badge className="ml-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30">Save 20%</Badge>
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`glass-card glass-accent h-full hover-lift transition-all duration-300 relative overflow-visible flex flex-col ${
                  plan.popular ? 'ring-2 ring-primary-400/60' : ''
                }`}>
                  {plan.popular && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-primary-400 text-white px-3 py-1 shadow-md">Most Popular</Badge>
                    </div>
                  )}
                  {plan.popular && (
                    <div className="absolute inset-0 pointer-events-none rounded-2xl">
                      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary-400/10 to-transparent" />
                      <div className="absolute -inset-px rounded-2xl ring-1 ring-primary-400/20" />
                    </div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-primary-400">
                        {annualBilling && plan.name !== 'Free Trial' 
                          ? `$${Math.round(parseInt(plan.price.replace('$', '')) * 0.8)}` 
                          : plan.price}
                      </span>
                      <span className="text-text-3 text-sm">
                        {plan.period ? `/${annualBilling && plan.name !== 'Free Trial' ? 'year' : plan.period}` : ''}
                      </span>
                    </div>
                    <p className="text-text-2 text-sm">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col gap-6">
                    <div className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-text-2 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <div className="border-t border-line-weak pt-4">
                        <p className="text-text-3 text-xs mb-2">Limitations:</p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Minus className="w-3 h-3 text-text-3 mt-1 flex-shrink-0" />
                              <span className="text-text-3 text-xs">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    </div>
                    
                    <Button 
                      className={`w-full font-medium py-2 px-4 rounded-lg transition-all duration-300 mt-auto ${
                        plan.popular 
                          ? 'cta-button text-white shadow-lg' 
                          : 'bg-surface-2 text-text-2 hover:bg-surface-1'
                      }`}
                      onClick={() => {
                        if (plan.name === 'Free Trial') {
                          window.open("https://calendly.com/enai-ai2024/30min", "_blank");
                        } else if (plan.name === 'Team') {
                          window.open("mailto:madhav@enai.ai?subject=Team Plan Inquiry", "_blank");
                        } else {
                          window.open("https://calendly.com/enai-ai2024/30min", "_blank");
                        }
                      }}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Feature Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 max-w-5xl mx-auto"
          >
            <Card className="glass-card glass-accent overflow-hidden border border-line-weak/50">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-white text-center">Plan Comparison</CardTitle>
                <p className="text-text-3 text-center mt-2">See what's included in each plan</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-line-weak">
                        <th className="text-left p-4 font-medium text-text-3">Feature</th>
                        <th className="text-center p-4 font-medium text-text-2">Free Trial</th>
                        <th className="text-center p-4 font-medium text-text-2">Starter</th>
                        <th className="text-center p-4 font-medium text-primary-400">Pro</th>
                        <th className="text-center p-4 font-medium text-text-2">Team</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        'Emails per month',
                        'Sequences',
                        'Voice features',
                        'Domain warmup',
                        'A/B testing',
                        'Integrations',
                        'Advanced analytics',
                        'Multi-seat management',
                        'SSO integration',
                        'SLA guarantees',
                        'Custom workflows'
                      ].map((feature, index) => (
                        <tr key={index} className="border-b border-line-weak hover:bg-surface-2/30 transition-colors">
                          <td className="p-4 text-text-2">{feature}</td>
                          <td className="p-4 text-center">
                            {index < 3 ? (
                              <Check className="w-5 h-5 text-green-400 mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-text-3 mx-auto" />
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {index < 6 ? (
                              <Check className="w-5 h-5 text-green-400 mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-text-3 mx-auto" />
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {index < 9 ? (
                              <Check className="w-5 h-5 text-primary-400 mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-text-3 mx-auto" />
                            )}
                          </td>
                          <td className="p-4 text-center">
                            <Check className="w-5 h-5 text-green-400 mx-auto" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link 
              to="/pricing" 
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              View full pricing details
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion with Search */}
      <section className="py-24 bg-surface-0 scroll-fade" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 id="faq-heading" className="text-5xl font-bold gradient-text mb-6">
              Frequently Asked Questions
            </h2>
            <Separator className="mb-8 max-w-md mx-auto" />
            <p className="text-xl text-text-2">
              Everything you need to know about our AI automation platform
            </p>
            
            {/* FAQ Search */}
            <div className="mt-8 max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-3" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="w-full pl-12 pr-4 py-3 bg-surface-2/50 border border-line-weak rounded-lg text-white placeholder-text-3 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  value={faqSearchTerm}
                  onChange={(e) => setFaqSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {filteredFaqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="glass-card hover-lift transition-all duration-300">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left p-6 focus:outline-none focus-ring-soft"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white pr-4">{item.question}</h3>
                      <div className="flex-shrink-0">
                        {expandedFaq === index ? (
                          <Minus className="w-5 h-5 text-primary-400" />
                        ) : (
                          <Plus className="w-5 h-5 text-primary-400" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-text-2 leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                      </div>
              </motion.div>
            ))}
          </div>
          
          {/* FAQPage Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqItems.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })}
          </script>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-surface-0 scroll-fade relative overflow-hidden">
        {/* Subtle background accents matching your style */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6 tracking-tight leading-tight">
              Ready to Scale with AI?
            </h2>
            <Separator className="mb-8 max-w-md mx-auto" />
            <p className="text-lg sm:text-xl text-text-2 max-w-3xl mx-auto leading-relaxed">
              Join sales teams already transforming their processes with AI workers.
              Book a demo to see how we can accelerate your revenue growth.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Primary CTA Card - Matches your existing card style */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="relative overflow-hidden glass-card glass-accent transition-all duration-500 hover-lift group">
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary-400/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-xl mb-6 mx-auto flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-primary-400" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl text-white mb-2">Book Live Demo</CardTitle>
                  <p className="text-text-3 text-xs sm:text-sm">See AI workers in action</p>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    onClick={() => window.open("https://calendly.com/enai-ai2024/30min", "_blank")}
                    className="w-full cta-button text-white px-8 py-4 rounded-lg font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 mb-4"
                  >
                    Schedule Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-xs text-text-3">30 minutes • No commitment • Live AI demo</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Secondary CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="relative overflow-hidden glass-card transition-all duration-500 hover-lift group">
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-xl mb-6 mx-auto flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl text-white mb-2">Contact Sales</CardTitle>
                  <p className="text-text-3 text-xs sm:text-sm">Get custom pricing & setup</p>
                </CardHeader>
                <CardContent className="text-center">
                  <Link to="/contact">
                    <Button 
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-lg font-semibold transition-all duration-300 mb-4"
                    >
                      Get in Touch
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <p className="text-xs text-text-3">Enterprise solutions • Custom integrations</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-dark backdrop-blur-xl text-white py-16 border-t border-line-weak/50" role="contentinfo">
        {/* Decorative accents */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/3 w-72 h-72 rounded-full bg-orange-400/5 blur-3xl"></div>
          <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-yellow-400/5 blur-3xl"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-orange-400/40 via-yellow-400/40 to-orange-400/40"></div>
            </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-12">
            <div className="md:col-span-4">
              <div className="flex items-center mb-4">
                <img 
                  src="/enai-logo.png" 
                  alt="ENAI logo" 
                  className="h-8 w-8 filter brightness-0 invert" 
                  width="32" 
                  height="32" 
                />
                <span className="ml-2 text-xl font-bold gradient-text">ENAI</span>
              </div>
              <p className="text-text-3 text-sm leading-relaxed">
                AI workers that research, engage, book, and sync—always within your guardrails and full visibility.
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-3 mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link to="/about-us" className="text-text-3 hover:text-white transition-colors">About</Link>
                </li>
                <li>
                  <button type="button" disabled className="text-text-3 cursor-not-allowed" title="Coming soon">Careers</button>
                </li>
                <li>
                  <button type="button" disabled className="text-text-3 cursor-not-allowed" title="Coming soon">Blog</button>
                </li>
                <li>
                  <button type="button" disabled className="text-text-3 cursor-not-allowed" title="Coming soon">Press</button>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-text-3 hover:text-white transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-text-3 hover:text-white transition-colors">Terms & Conditions</Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-3 mb-4">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button type="button" disabled className="text-text-3 cursor-not-allowed" title="Coming soon">Features</button>
                </li>
                <li>
                  <button type="button" disabled className="text-text-3 cursor-not-allowed" title="Coming soon">Integrations</button>
                </li>
                <li>
                  <button type="button" disabled className="text-text-3 cursor-not-allowed" title="Coming soon">Pricing</button>
                </li>
                <li>
                  <button type="button" disabled className="text-text-3 cursor-not-allowed" title="Coming soon">Roadmap</button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-3 mb-4">Contact</h4>
              <address className="not-italic text-sm text-text-2 leading-relaxed">
                Unit 3, Bradbury's Court<br />
                Lyon Rd, London HA1 2BY<br />
                United Kingdom
              </address>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-3 mb-4">Connect</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://www.linkedin.com/company/enai-ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-text-3 hover:text-white transition-colors" aria-label="Visit Enai on LinkedIn">
                    <Linkedin className="w-5 h-5" aria-hidden="true" /> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-start gap-3 text-sm text-text-3" role="status" aria-live="polite">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true"></span>
              <span className="text-text-2">System status: All systems operational</span>
            </div>
            {/* Compliance badges with names and status */}
            <div className="flex items-center flex-wrap gap-3">
              {[
                { label: 'SOC 2 Type I', logo: '🛡️', status: 'Underway' },
                { label: 'SOC 2 Type II', logo: '🛡️', status: 'Underway' },
                { label: 'ISO 27001', logo: '🔒', status: 'Underway' },
                { label: 'GDPR', logo: '🇪🇺', status: 'Compliant' },
                { label: 'HIPAA', logo: '🏥', status: 'Underway' },
              ].map((item, i) => (
                <div
                  key={`cmp-badge-${i}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2/80 border border-line-weak/60 text-xs"
                >
                  <span className="text-sm" aria-hidden="true">{item.logo}</span>
                  <span className="text-text-2 font-medium">{item.label}</span>
                  <span className={`font-semibold ${item.status === 'Compliant' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-xs text-text-3">
              *In observation period for SOC 2 Type II compliance.
            </div>
          </div>

          {/* Bottom legal row simplified and centered */}
          <div className="mt-10 flex items-center justify-center text-xs md:text-sm text-text-3">
            <p>© {new Date().getFullYear()} ENAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50">
        <Suspense fallback={<div className="w-12 h-12 bg-primary-500 rounded-full animate-pulse"></div>}>
          <ElevenLabsOrb agentId="FeDHh9EmNfMMKCvrYZyn" className="w-80 h-80" aria-label="AI Assistant Chat" />
        </Suspense>
      </div>
    </div>
  );
}

export default App;