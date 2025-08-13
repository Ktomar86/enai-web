import { useEffect, useState } from 'react';
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
import ElevenLabsOrb from './components/ElevenLabsOrb';
// import AIWorkflowVisualizer from './components/AIWorkflowVisualizer';
import { motion, AnimatePresence } from 'framer-motion';
import * as simpleIcons from 'simple-icons';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { HeroSection } from './components/ui/hero-section';

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

const pipelinePlays = [
  {
    id: 'prospecting',
    label: 'Prospecting',
    description: 'AI identifies and qualifies new prospects from your ICP criteria.',
    details: 'Automatically research and score prospects, then initiate outreach sequences.',
    icon: <Target className="w-5 h-5" />,
    category: 'Lead Gen',
    industry: 'B2B SaaS'
  },
  {
    id: 'warm-followups',
    label: 'Warm follow-ups',
    description: 'Re-engage previous contacts with personalized, timely touchpoints.',
    details: 'Trigger follow-ups based on specific events or time intervals.',
    icon: <MessageSquare className="w-5 h-5" />,
    category: 'Nurture',
    industry: 'Enterprise'
  },
  {
    id: 'reactivation',
    label: 'Reactivation',
    description: 'Bring back dormant leads with targeted re-engagement campaigns.',
    details: 'Identify win-back opportunities and execute reactivation sequences.',
    icon: <ArrowRight className="w-5 h-5" />,
    category: 'Retention',
    industry: 'E-commerce'
  },
  {
    id: 'event-leads',
    label: 'Event leads',
    description: 'Process and nurture leads captured from events and webinars.',
    details: 'Instant follow-up with event-specific messaging and content.',
    icon: <UserCheck className="w-5 h-5" />,
    category: 'Events',
    industry: 'Tech'
  },
  {
    id: 'hand-raiser-slas',
    label: 'Hand-raiser SLAs',
    description: 'Respond to inbound leads within minutes, not hours.',
    details: 'Automatic qualification and routing based on lead characteristics.',
    icon: <Clock className="w-5 h-5" />,
    category: 'Inbound',
    industry: 'Financial Services'
  },
  {
    id: 'pipeline-cleanup',
    label: 'Pipeline cleanup',
    description: 'Automatically qualify or disqualify stale opportunities.',
    details: 'Regular pipeline health checks with automated next-step recommendations.',
    icon: <Activity className="w-5 h-5" />,
    category: 'Operations',
    industry: 'Healthcare'
  }
];

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

const resultMetrics = [
  {
    metric: 'More replies vs. previous templates',
    range: '+8–20%',
    description: 'Increased response rates from personalized, contextual outreach'
  },
  {
    metric: 'Time saved on research per lead',
    range: '~2–4 min',
    description: 'Automated prospect research and data gathering'
  },
  {
    metric: 'Cleaner CRM updates',
    range: 'fewer manual steps',
    description: 'Automatic data sync and activity logging'
  }
];

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
    price: '$59',
    period: 'per agent/month',
    description: 'Essential automation for small teams',
    features: [
      '2,000 emails/month',
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
    price: '$149',
    period: 'per agent/month',
    description: 'Full automation with voice and advanced features',
    features: [
      '10,000 emails/month',
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
            <div className="bg-dark-900/80 rounded-lg p-4 border border-dark-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-gray-400 text-sm ml-4">AI Research</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">{researchData.prospect}</h4>
                  <Badge className="bg-primary-400/20 text-primary-400">ICP Score: {researchData.icpScore}%</Badge>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-300">Key Triggers:</h5>
                  {researchData.triggers.map((trigger: string, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      <Activity className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{trigger}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-1">
                  <h5 className="text-sm font-medium text-gray-300">AI Notes:</h5>
                  {researchData.notes.map((note: string, i: number) => (
                    <div key={i} className="text-gray-400 text-sm">• {note}</div>
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
              <div className="bg-dark-900/80 rounded-lg p-4 border border-dark-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <span className="text-white font-medium">Email Draft</span>
                  <Badge className={`ml-auto ${sequenceData.approvalStatus === 'pending' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-green-400/20 text-green-400'}`}>
                    {sequenceData.approvalStatus}
                  </Badge>
                </div>
                <div className="text-sm">
                  <div className="text-gray-400">Subject:</div>
                  <div className="text-white">{sequenceData.email.subject}</div>
                  <div className="text-gray-400 mt-2">Preview:</div>
                  <div className="text-gray-300">{sequenceData.email.preview}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-900/80 rounded-lg p-3 border border-dark-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-primary-400" />
                    <span className="text-white text-sm font-medium">Call Script</span>
                  </div>
                  <div className="text-xs text-gray-300">{sequenceData.callScript}</div>
                </div>
                
                <div className="bg-dark-900/80 rounded-lg p-3 border border-dark-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Play className="w-4 h-4 text-primary-400" />
                    <span className="text-white text-sm font-medium">Voicemail</span>
                  </div>
                  <div className="text-xs text-gray-300">{sequenceData.voicemail}</div>
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
              <div className="bg-dark-900/80 rounded-lg p-4 border border-dark-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-primary-400" />
                  <span className="text-white font-medium">Meeting Scheduled</span>
                  <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                </div>
                <div className="space-y-2">
                  <div className="text-white">{bookingData.meeting.title}</div>
                  <div className="text-gray-300 text-sm">{bookingData.meeting.time}</div>
                  <div className="text-gray-400 text-xs">{bookingData.meeting.duration}</div>
                </div>
              </div>
              
              <div className="bg-dark-900/80 rounded-lg p-4 border border-dark-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-4 h-4 text-primary-400" />
                  <span className="text-white font-medium">CRM Sync</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Contact Created</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Activity Logged</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Deal Stage</span>
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
    <div className="min-h-screen bg-dark text-white">
      <Navigation />

      {/* Hero Section */}
      <HeroSection
        className="pt-24 pb-0"
        title="Meet Your New"
        subtitle={{
          regular: "",
          gradient: "AI WORKERS"
        }}
        description="Empower your business with our AI workers. Get a dedicated team of AI agents that understand your business and help you scale efficiently."
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

      

      {/* Use Cases */}
      <section className="py-24 bg-gradient-to-b from-dark-900 to-dark scroll-fade" aria-labelledby="use-cases-heading">
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
            <h2 id="use-cases-heading" className="text-5xl font-bold gradient-text mb-6 tracking-tight [text-wrap:balance]">
              Built for modern B2B teams
            </h2>
            <Separator className="mb-8 max-w-md mx-auto" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
                    activeUseCase === uc.key ? 'border-primary-400/40 bg-primary-400/10' : 'border-dark-700 bg-dark-800/40 hover:bg-dark-800'
                  }`}
                >
                  <div className="text-white font-medium text-sm">{uc.title}</div>
                  <div className="text-xs text-gray-500">{uc.desc}</div>
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
                  className="glass-card glass-accent overflow-hidden border border-dark-700/50"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-white">
                      {activeUseCase === 'sdr' ? 'Outbound SDR Flow' : activeUseCase === 'ae' ? 'AE Closing Flow' : 'RevOps Ops Flow'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid sm:grid-cols-3 gap-4">
                      {['Discover','Engage','Book'].map((label, i) => (
                        <motion.div
                          key={`uc-step-${i}`}
                          className="rounded-lg bg-dark-800/60 border border-dark-700 p-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-white">{label}</span>
                            <span className="text-xs text-gray-500">Step {i + 1}</span>
                          </div>
                          <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary-400 to-yellow-400"
                              initial={{ width: '0%' }}
                              animate={{ width: ['25%','80%','100%'] }}
                              transition={{ duration: 1.2, delay: i * 0.15 }}
                            />
                          </div>
                          <p className="text-xs text-gray-400 mt-3">
                            {activeUseCase === 'sdr' && (i === 0 ? 'Identify ICP leads' : i === 1 ? 'Personalize outreach' : 'Auto‑book meeting')}
                            {activeUseCase === 'ae' && (i === 0 ? 'Auto‑prep briefs' : i === 1 ? 'Respond faster' : 'Calendar coordination')}
                            {activeUseCase === 'revops' && (i === 0 ? 'Enrich & validate' : i === 1 ? 'Enforce guardrails' : 'Sync & report')}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button 
              onClick={() => window.location.assign('/industries')}
              className="bg-primary-400 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-medium"
            >
              Explore industries
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-24 bg-dark scroll-fade" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 id="services-heading" className="text-5xl font-bold gradient-text mb-6 tracking-tight [text-wrap:balance]">
              What We Offer
            </h2>
            <Separator className="mb-8 max-w-md mx-auto" />
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Dedicated AI workers that handle research, outreach, booking, and CRM hygiene—with approval flows and full visibility.
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
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
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

          <div className="text-center mt-12">
            <Button 
              onClick={() => document.getElementById('feature-showcase-heading')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary-400 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-medium"
            >
              Explore Capabilities
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Interactive Product Demo Section */}
      <section className="py-32 bg-gradient-to-b from-dark to-dark-900 relative overflow-hidden scroll-fade section-enhanced" aria-labelledby="demo-heading">
        {/* Enhanced floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="floating-element absolute top-10 left-5 w-24 h-24 bg-primary-400/10 rounded-full blur-2xl"></div>
          <div className="floating-element absolute top-32 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
          <div className="floating-element absolute bottom-20 left-1/3 w-28 h-28 bg-primary-400/5 rounded-full blur-2xl"></div>
          <div className="floating-element absolute bottom-10 right-1/4 w-20 h-20 bg-purple-500/5 rounded-full blur-2xl"></div>
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
                <span className="relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-dark-800/50 border border-primary-400/30 text-primary-400">
                  <Zap className="w-4 h-4 mr-2" />
                  Live Demo
                </span>
              </div>
            </div>
            <h2 id="demo-heading" className="text-5xl md:text-6xl font-bold gradient-text mb-6 tracking-tight [text-wrap:balance]">
              See AI Workers in Action
            </h2>
            <Separator className="mb-8 max-w-md mx-auto bg-gradient-to-r from-primary-400/50 to-primary-500/50" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Watch how our AI agents transform complex business processes into seamless, intelligent workflows
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Enhanced Interactive Demo Mockup */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="product-mockup p-10 relative">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-purple-500/20 rounded-2xl blur-xl opacity-70"></div>
                <div className="relative bg-dark-900/90 rounded-2xl p-8 border border-dark-700/50 backdrop-blur-sm">
                  {/* Decorative elements */}
                  <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
                  
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-400"></div>
                      <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                      <div className="w-4 h-4 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-gray-300 text-lg ml-4 font-medium">AI Agent Dashboard</span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium">LIVE</span>
                    </div>
                  </div>
                  
                  <div className="space-y-8 relative z-10">
                    {/* Enhanced Real-time simulation */}
                    <div className="data-viz rounded-xl p-6 border border-primary-400/30 bg-dark-800/60 backdrop-blur-sm relative overflow-hidden">
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
                            <span className="text-gray-300 flex items-center">
                              <Target className="w-4 h-4 mr-2 text-primary-400" />
                              Processing Prospects
                            </span>
                            <span className="text-primary-400 font-bold text-lg">847/1,200</span>
                          </div>
                          <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
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
                          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-600/30 hover:border-primary-400/30 transition-all duration-300 group">
                            <div className="text-2xl font-bold text-primary-400 group-hover:text-primary-300 transition-colors duration-300">2,847</div>
                            <div className="text-gray-400 text-sm mt-1">Qualified</div>
                          </div>
                          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-600/30 hover:border-green-400/30 transition-all duration-300 group">
                            <div className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">94%</div>
                            <div className="text-gray-400 text-sm mt-1">Accuracy</div>
                          </div>
                          <div className="p-4 rounded-xl bg-dark-700/50 border border-dark-600/30 hover:border-purple-400/30 transition-all duration-300 group">
                            <div className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">4.2s</div>
                            <div className="text-gray-400 text-sm mt-1">Avg Speed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced Interactive workflow visualization */}
                    <div className="bg-dark-800/70 rounded-xl p-6 border border-dark-700/50 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                      <div className="relative z-10">
                        <h4 className="text-xl font-bold text-white mb-6">Workflow Execution</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-600/20 hover:border-primary-400/30 transition-all duration-300 group">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-primary-400 flex items-center justify-center">
                                <Check className="w-3 h-3 text-dark" />
                              </div>
                              <span className="text-gray-300 text-base group-hover:text-white transition-colors duration-300">Data Analysis</span>
                            </div>
                            <span className="text-sm text-green-400 font-medium flex items-center">
                              Completed
                              <CheckCircle className="w-4 h-4 ml-1" />
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-600/20 hover:border-yellow-400/30 transition-all duration-300 group">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse flex items-center justify-center"></div>
                              <span className="text-gray-300 text-base group-hover:text-white transition-colors duration-300">Pattern Recognition</span>
                            </div>
                            <span className="text-sm text-yellow-400 font-medium flex items-center">
                              In Progress
                              <Activity className="w-4 h-4 ml-1 animate-pulse" />
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-4 rounded-lg bg-dark-700/30 border border-dark-600/20 hover:border-gray-400/30 transition-all duration-300 group">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full bg-gray-500 flex items-center justify-center"></div>
                              <span className="text-gray-300 text-base group-hover:text-white transition-colors duration-300">Action Execution</span>
                            </div>
                            <span className="text-sm text-gray-500 font-medium flex items-center">
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
                <div className="flex items-start gap-6 group cursor-pointer p-6 rounded-2xl bg-dark-800/30 border border-dark-700/50 hover:border-primary-400/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary-400/10 flex items-center justify-center group-hover:bg-primary-400/20 transition-all duration-300 relative z-10">
                    <Zap className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">Real-time Processing</h3>
                    <p className="text-gray-300 mt-3 text-lg leading-relaxed">Our AI agents process thousands of data points simultaneously, delivering insights in milliseconds with zero latency.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group cursor-pointer p-6 rounded-2xl bg-dark-800/30 border border-dark-700/50 hover:border-primary-400/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary-400/10 flex items-center justify-center group-hover:bg-primary-400/20 transition-all duration-300 relative z-10">
                    <Brain className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">Intelligent Automation</h3>
                    <p className="text-gray-300 mt-3 text-lg leading-relaxed">Self-learning algorithms adapt to your business patterns, continuously improving performance and ROI.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group cursor-pointer p-6 rounded-2xl bg-dark-800/30 border border-dark-700/50 hover:border-primary-400/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary-400/10 flex items-center justify-center group-hover:bg-primary-400/20 transition-all duration-300 relative z-10">
                    <Shield className="w-8 h-8 text-primary-400" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">Enterprise Security</h3>
                    <p className="text-gray-300 mt-3 text-lg leading-relaxed">Bank-grade encryption and compliance frameworks protect your sensitive business data with zero compromise.</p>
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
      <section className="py-16 bg-transparent scroll-fade" aria-labelledby="dashboard-preview-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="dashboard-preview-heading" className="sr-only">ENAI Dashboard Preview</h2>
          <div className="product-mockup dashboard-frame p-2 sm:p-6">
            <img
              src="/enai-dashboard.png"
              alt="ENAI dashboard"
              loading="lazy"
              className="w-full rounded-2xl border border-dark-700 shadow-lg"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl border border-dark-700/60 bg-dark-900/60 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-md bg-primary-400/10 text-primary-400 inline-flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5" />
                </span>
                <div className="text-white font-semibold">AI Insights</div>
              </div>
              <p className="text-sm text-gray-300">Instant quality analysis and <span className="gradient-text">engagement trends</span> surfaced automatically.</p>
            </div>
            <div className="rounded-xl border border-dark-700/60 bg-dark-900/60 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-md bg-primary-400/10 text-primary-400 inline-flex items-center justify-center">
                  <Target className="w-3.5 h-3.5" />
                </span>
                <div className="text-white font-semibold">Lead Scoring</div>
              </div>
              <p className="text-sm text-gray-300">Score accounts by <span className="gradient-text">40+ buying signals</span> to focus effort where it counts.</p>
            </div>
            <div className="rounded-xl border border-dark-700/60 bg-dark-900/60 p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-6 h-6 rounded-md bg-primary-400/10 text-primary-400 inline-flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5" />
                </span>
                <div className="text-white font-semibold">Predicted Revenue</div>
              </div>
              <p className="text-sm text-gray-300">Reliable forecasts and <span className="gradient-text">live conversions</span> in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ENHANCED: Visual Sales Process Storyboard - removed per request */}

      {/* Feature Showcase Sections */}
      <section className="py-24 bg-gradient-to-b from-dark to-dark-800 scroll-fade section-enhanced" aria-labelledby="feature-showcase-heading">
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how our AI handles the entire sales process from research to booking
            </p>
          </motion.div>

          {/* Tab Navigation with Micro-interactions */}
          <div className="flex justify-center mb-12">
            <div className="tab-nav max-w-md bg-dark-800/50 p-1 rounded-xl border border-dark-700/50">
              {featureShowcases.map((showcase) => (
                <button
                  key={showcase.id}
                  onClick={() => setActiveTab(showcase.id)}
                  className={`tab-nav-item ${activeTab === showcase.id ? 'active' : ''} transition-all duration-300 hover:bg-dark-700/50`}
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
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
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
                    <div className="text-sm text-gray-400">
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

      {/* Pipeline Plays Use-Case Section */}
      <section className="py-24 bg-dark/50 scroll-fade section-enhanced" aria-labelledby="pipeline-plays-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 id="pipeline-plays-heading" className="text-5xl font-bold gradient-text mb-6">
              Pipeline Plays
            </h2>
            <Separator className="mb-8 max-w-md mx-auto" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Common sales motions automated and optimized by AI
            </p>
          </motion.div>

          {/* Compact 3-step strip (concise workflow) */}
          <div className="relative mb-10">
            <div className="rounded-2xl border border-dark-700/60 bg-dark-900/50 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Prospect → Score', hint: 'Find ICP, rank by fit' },
                  { label: 'Personalize → Send', hint: 'Multi‑channel outreach' },
                  { label: 'Reply → Book', hint: 'Auto‑hold and sync' }
                ].map((item, i) => (
                  <div key={`mini-${i}`} className="rounded-lg bg-dark-800/60 border border-dark-700 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white">Step {i + 1}</span>
                      <Badge variant="secondary" className="text-[10px] bg-dark-700/60 border-dark-600/60">{item.label}</Badge>
                    </div>
                    <div className="h-2 w-full bg-dark-700 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-primary-400 to-yellow-400" initial={{ width: '0%' }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1 }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-3">{item.hint}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compact Play Cards (short and to the point) */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pipelinePlays.slice(0, 6).map((play, index) => (
              <motion.div
                key={play.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="glass-card p-4 hover-lift transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary-400/10 flex items-center justify-center text-primary-400">
                        {play.icon}
                      </div>
                  <div>
                    <div className="text-white text-sm font-medium">{play.label}</div>
                    <div className="text-[10px] text-gray-500">{play.category}</div>
                    </div>
                    </div>
                <div className="text-xs text-gray-300 line-clamp-2">{play.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Control & Visibility Grid */}
      <section className="py-24 bg-gradient-to-b from-dark-800 to-dark scroll-fade section-enhanced" aria-labelledby="control-heading">
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
                          : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                      }`}
                    >
                      Before
                    </button>
                    <button
                      onClick={() => setShowApprovalAfter(!showApprovalAfter)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        showApprovalAfter 
                          ? 'bg-green-500 text-white' 
                          : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                      }`}
                    >
                      After
                    </button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {!showApprovalAfter ? (
                      <div className="bg-dark-900/80 rounded-lg p-4 border border-yellow-400/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-medium">Pending Approval</span>
                  </div>
                        <div className="text-sm text-gray-300">
                          <div className="text-gray-400">Subject:</div>
                          <div className="text-white">Quick question about your sales process</div>
                          <div className="text-gray-400 mt-2">Template:</div>
                          <div className="text-gray-300">Hi [Name], I noticed [Company] is...</div>
                </div>
                  </div>
                    ) : (
                      <div className="bg-dark-900/80 rounded-lg p-4 border border-green-400/20">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-medium">Approved & Scheduled</span>
                </div>
                        <div className="text-sm text-gray-300">
                          <div className="text-gray-400">Subject:</div>
                          <div className="text-white">Quick question about your sales process</div>
                          <div className="text-gray-400 mt-2">Schedule:</div>
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
                      <p className="text-gray-300">
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
                <Card className="glass-card glass-accent h-full hover-lift transition-all duration-500 group relative overflow-hidden border border-dark-700/50 hover:border-primary-400/40 shadow-lg hover:shadow-xl hover:shadow-primary-400/10 bg-dark-800/60 backdrop-blur-sm rounded-2xl">
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
                    <p className="text-gray-300 mb-4 text-lg leading-relaxed">{feature.description}</p>
                    <p className="text-gray-400 text-base leading-relaxed">{feature.details}</p>
                    
                    {/* Enhanced Tooltip on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 pointer-events-none rounded-2xl">
                      <div className="text-sm text-gray-200 bg-dark-800/90 p-4 rounded-xl border border-dark-700/50 backdrop-blur-sm shadow-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-2 h-2 rounded-full ${
                            index % 3 === 0 ? 'bg-green-400' : 
                            index % 3 === 1 ? 'bg-yellow-400' : 'bg-blue-400'
                          }`}></div>
                          <span className="font-medium">Status Details</span>
                        </div>
                        <p className="text-gray-300 text-sm mt-3">
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
      <section className="py-32 bg-gradient-to-b from-dark to-dark-900 relative overflow-hidden scroll-fade" aria-labelledby="results-heading">
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
                <span className="relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-dark-800/50 border border-primary-400/30 text-primary-400">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Proven Results
                </span>
              </div>
            </div>
            <h2 id="results-heading" className="text-4xl md:text-6xl font-bold gradient-text mb-6">
              <span>What Teams Report After 30 Days</span>
            </h2>
            <Separator className="mb-8 max-w-md mx-auto bg-gradient-to-r from-primary-400/50 to-purple-500/50" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Honest outcomes with real ranges, not fake promises
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {resultMetrics.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-8 hover-lift transition-all duration-500 group cursor-pointer border border-dark-700/50 hover:border-primary-400/40 relative overflow-hidden bg-dark-800/50 backdrop-blur-sm rounded-2xl"
                >
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors duration-300">{result.metric}</h3>
                        <p className="text-gray-300 text-lg leading-relaxed">{result.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl md:text-5xl font-bold gradient-text mb-1">{result.range}</div>
                        <div className="text-base text-gray-400">{result.description}</div>
                      </div>
                    </div>
                    
                    {/* Enhanced progress bar with animated gradient */}
                    <div className="mt-6 pt-6 border-t border-dark-700/50">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                      <div className="h-3 bg-dark-700 rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-purple-500/20 rounded-full"></div>
                        <motion.div 
                          className="h-full bg-gradient-to-r from-primary-400 to-purple-500 rounded-full relative overflow-hidden"
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        >
                          {/* Animated shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
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
      <section className="py-32 bg-gradient-to-b from-dark-900 to-dark relative overflow-hidden scroll-fade" aria-labelledby="case-studies-heading">
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
                <span className="relative inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-dark-800/50 border border-primary-400/30 text-primary-400">
                  <Award className="w-4 h-4 mr-2" />
                  Real Results
                </span>
              </div>
            </div>
            <h2 id="case-studies-heading" className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              See How Teams Are Solving Real Problems with AI Automation
            </h2>
            <Separator className="mb-8 max-w-md mx-auto bg-gradient-to-r from-primary-400/50 to-purple-500/50" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
                    activeCaseStudy === i ? 'border-primary-400/40 bg-primary-400/10' : 'border-dark-700 bg-dark-800/40 hover:bg-dark-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-400/10 flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                      <div className="text-white font-medium text-sm">{study.title}</div>
                      <div className="text-xs text-gray-500">2024 Results</div>
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
                  className="glass-card glass-accent overflow-hidden border border-dark-700/50"
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
                        <div key={`cs-block-${i}`} className="p-4 rounded-xl bg-dark-800/50 border border-dark-700">
                          <div className="flex items-center gap-2 text-sm mb-2">
                            <b.icon className="w-4 h-4 text-primary-400" />
                            <span className="text-gray-300">{b.label}</span>
                      </div>
                          <p className="text-xs text-gray-400 leading-relaxed">{b.text}</p>
                        </div>
                      ))}
                    </div>
                    {/* Animated progress strip */}
                    <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
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

      {/* Mini Case Studies with Visuals */}
      <section className="py-24 bg-gradient-to-b from-dark to-dark-800 scroll-fade" aria-labelledby="case-studies-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 id="case-studies-heading" className="text-5xl font-bold gradient-text mb-6 tracking-tight [text-wrap:balance]">Success Stories</h2>
            <Separator className="mb-8 max-w-md mx-auto" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">See how teams are solving real problems with AI automation</p>
            <div className="mt-6 inline-flex items-center gap-4 text-sm text-gray-400">
              <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400"></span> Higher replies</span>
              <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Faster booking</span>
              <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Cleaner CRM</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Card className="glass-card glass-accent h-full hover-lift transition-all duration-300 overflow-hidden relative">
                  {/* Company Logo */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-dark-700/50 flex items-center justify-center border border-dark-600/50">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-primary-400 to-purple-500"></div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Profile Image */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400/20 to-purple-500/20 flex items-center justify-center border border-primary-400/30">
                        <UserCheck className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-white group-hover:text-primary-400 transition-colors duration-300">{study.title}</CardTitle>
                        <p className="text-xs text-gray-400">Case Study #{index + 1}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Animated KPI ticker */}
                    <div className="grid grid-cols-3 gap-2 bg-dark-900/50 p-3 rounded-lg border border-dark-700/50 mb-4">
                      {[{label:'Reply Rate',from: index===0?23:15,to:index===0?42:35,color:'text-green-400'},{label:'Time Saved',from: 0,to: index===1?2.5:1.8,color:'text-yellow-400'},{label:'CRM Accuracy',from: 80,to: 100,color:'text-blue-400'}].map((kpi,k)=> (
                        <div key={`kpi-${k}`} className="text-center">
                          <div className="text-xs text-gray-400 mb-1">{kpi.label}</div>
                          <motion.div initial={{ scale: 0.9, opacity: 0.6 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className={`text-sm font-medium ${kpi.color}`}>
                            {kpi.to}{k===0||k===2?'%':''}
                          </motion.div>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Problem
                      </h4>
                      <p className="text-gray-300 text-sm">{study.problem}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        What Enai Did
                      </h4>
                      <p className="text-gray-300 text-sm">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        Outcome
                      </h4>
                      <p className="text-primary-400 text-sm font-medium">{study.outcome}</p>
                    </div>
                    
                    {/* Metrics Badge */}
                    <div className="pt-2 border-t border-dark-700/50">
                      <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                        {index === 0 ? '+83% improvement' : index === 1 ? '+133% efficiency' : '+250% productivity'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations with Categorization */}
      <section className="py-16 bg-dark/50 scroll-fade" aria-labelledby="integrations-heading">
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
            <p className="text-gray-300">
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
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-10 flex-wrap">
            {integrations
              .filter(integration => 
                integrationFilter === '' || 
                integration.category === integrationFilter ||
                integrationFilter === 'All'
              )
              .map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="flex items-center justify-center h-14 w-32 rounded-lg bg-dark-800/60 border border-dark-700 hover:border-primary-400/30 transition-all duration-300">
                    {(() => {
                      const icon = (simpleIcons as any)[integration.key];
                      if (!icon) {
                        return <span className="text-gray-400 text-sm">{integration.name}</span>;
                      }
                      return (
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          width="100"
                          height="24"
                          aria-label={`${integration.name} logo`}
                          className="opacity-90 group-hover:opacity-100"
                        >
                          <path fill={integration.color} d={icon.path} />
                        </svg>
                      );
                    })()}
                    <span className="sr-only">{integration.name}</span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Outcomes stripe */}
      <section id="outcomes" className="py-16 bg-dark/60 scroll-fade" aria-labelledby="outcomes-heading">
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
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Teams use ENAI to move faster, book more, and keep CRMs clean—without adding headcount.
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
                <p className="text-sm text-gray-400 mt-1">Context‑aware messaging boosts response rates</p>
              </CardContent>
            </Card>
            <Card className="glass-card glass-accent">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-primary-400" />
                  <h3 className="text-white font-semibold">More qualified meetings</h3>
                </div>
                <div className="text-3xl font-bold text-primary-400">2.5×</div>
                <p className="text-sm text-gray-400 mt-1">Better targeting and prioritization</p>
              </CardContent>
            </Card>
            <Card className="glass-card glass-accent">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-primary-400" />
                  <h3 className="text-white font-semibold">Cleaner CRM</h3>
                </div>
                <div className="text-3xl font-bold text-primary-400">100%</div>
                <p className="text-sm text-gray-400 mt-1">Automatic activity logging and sync</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview with Toggle */}
      <section className="py-24 bg-gradient-to-b from-dark-800 to-dark scroll-fade" aria-labelledby="pricing-heading">
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
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              No hidden fees, no unlimited promises. Clear limits, fair pricing.
            </p>
            
            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-medium ${!annualBilling ? 'text-primary-400' : 'text-gray-400'}`}>
                Monthly
              </span>
              <button 
                onClick={() => setAnnualBilling(!annualBilling)}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-dark-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${annualBilling ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
              <span className={`text-sm font-medium ${annualBilling ? 'text-primary-400' : 'text-gray-400'}`}>
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
                      <span className="text-gray-400 text-sm">
                        {plan.period ? `/${annualBilling && plan.name !== 'Free Trial' ? 'year' : plan.period}` : ''}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col gap-6">
                    <div className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {plan.limitations.length > 0 && (
                      <div className="border-t border-gray-700 pt-4">
                        <p className="text-gray-400 text-xs mb-2">Limitations:</p>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Minus className="w-3 h-3 text-gray-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-400 text-xs">{limitation}</span>
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
                          : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
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
            <Card className="glass-card glass-accent overflow-hidden border border-dark-700/50">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl text-white text-center">Plan Comparison</CardTitle>
                <p className="text-gray-400 text-center mt-2">See what's included in each plan</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-dark-700">
                        <th className="text-left p-4 font-medium text-gray-400">Feature</th>
                        <th className="text-center p-4 font-medium text-gray-300">Free Trial</th>
                        <th className="text-center p-4 font-medium text-gray-300">Starter</th>
                        <th className="text-center p-4 font-medium text-primary-400">Pro</th>
                        <th className="text-center p-4 font-medium text-gray-300">Team</th>
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
                        <tr key={index} className="border-b border-dark-800/50 hover:bg-dark-800/30 transition-colors">
                          <td className="p-4 text-gray-300">{feature}</td>
                          <td className="p-4 text-center">
                            {index < 3 ? (
                              <Check className="w-5 h-5 text-green-400 mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-gray-600 mx-auto" />
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {index < 6 ? (
                              <Check className="w-5 h-5 text-green-400 mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-gray-600 mx-auto" />
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {index < 9 ? (
                              <Check className="w-5 h-5 text-primary-400 mx-auto" />
                            ) : (
                              <Minus className="w-4 h-4 text-gray-600 mx-auto" />
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
      <section className="py-24 bg-dark scroll-fade" aria-labelledby="faq-heading">
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
            <p className="text-xl text-gray-300">
              Everything you need to know about our AI automation platform
            </p>
            
            {/* FAQ Search */}
            <div className="mt-8 max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="w-full pl-12 pr-4 py-3 bg-dark-800/50 border border-dark-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
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
                      <p className="text-gray-300 leading-relaxed">{item.answer}</p>
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

      {/* Removed final CTA strip as requested */}


      {/* Footer */}
      <footer className="relative overflow-hidden bg-dark/60 backdrop-blur-xl text-white py-16 border-t border-dark-700/50" role="contentinfo">
        {/* Decorative accents */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/3 w-72 h-72 rounded-full bg-orange-400/5 blur-3xl"></div>
          <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-yellow-400/5 blur-3xl"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-orange-400/40 via-yellow-400/40 to-orange-400/40"></div>
            </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div>
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
              <p className="text-gray-400 text-sm leading-relaxed">
                AI workers that research, outreach, book and sync — with your guardrails and full visibility.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a>
                </li>
                <li>
                  <a href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a>
                </li>
                <li>
                  <a href="/press" className="text-gray-400 hover:text-white transition-colors">Press</a>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Platform</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="/features" className="text-gray-400 hover:text-white transition-colors">Features</a>
                </li>
                <li>
                  <a href="/integrations" className="text-gray-400 hover:text-white transition-colors">Integrations</a>
                </li>
                <li>
                  <a href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
                </li>
                <li>
                  <a href="/roadmap" className="text-gray-400 hover:text-white transition-colors">Roadmap</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Contact</h4>
              <address className="not-italic text-sm text-gray-300 leading-relaxed">
                Unit 3, Bradbury's Court<br />
                Lyon Rd, London HA1 2BY<br />
                United Kingdom
              </address>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Connect</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://www.linkedin.com/company/enai-ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors" aria-label="Visit Enai on LinkedIn">
                    <Linkedin className="w-5 h-5" aria-hidden="true" /> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-dark-700/30" />
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>© {new Date().getFullYear()} ENAI. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50">
        <ElevenLabsOrb agentId="FeDHh9EmNfMMKCvrYZyn" className="w-80 h-80" aria-label="AI Assistant Chat" />
      </div>
    </div>
  );
}

export default App;