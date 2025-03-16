import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Zap,
  Brain,
  Target,
  BarChart3,
  Eye,
  CheckCircle2,
  Bell
} from 'lucide-react';

// Define TypeScript interfaces for our data structures
interface Insight {
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  chart: string;
}

interface Category {
  id: string;
  title: string;
  icon: React.ReactElement;
  color: string;
  insights: Insight[];
}

const insightCategories: Category[] = [
  {
    id: 'lead-gen',
    title: 'Lead Generation',
    icon: <Target className="w-6 h-6" />,
    color: 'from-blue-400 to-blue-600',
    insights: [
      {
        title: 'Ideal Customer Profile',
        description: 'Enai analyzed 5,000+ accounts to identify your ideal customer profile.',
        metric: '83%',
        metricLabel: 'Targeting Accuracy',
        chart: 'doughnut'
      },
      {
        title: 'Lead Scoring',
        description: 'Machine learning algorithms score leads based on fit and intent signals.',
        metric: '4.2×',
        metricLabel: 'Increased Conversions',
        chart: 'bars'
      },
      {
        title: 'Lead Sources',
        description: 'Top-performing channels that deliver the highest quality leads.',
        metric: 'Top 3',
        metricLabel: 'Channels Identified',
        chart: 'pie'
      }
    ]
  },
  {
    id: 'messaging',
    title: 'Messaging & Engagement',
    icon: <Bell className="w-6 h-6" />,
    color: 'from-green-400 to-teal-500',
    insights: [
      {
        title: 'Subject Line Optimization',
        description: 'AI tests and refines subject lines for maximum open rates.',
        metric: '47%',
        metricLabel: 'Open Rate Increase',
        chart: 'line'
      },
      {
        title: 'Message Personalization',
        description: "Dynamic content personalized to each recipient's industry and role.",
        metric: '68%',
        metricLabel: 'Higher Response Rate',
        chart: 'bars'
      },
      {
        title: 'Optimal Send Times',
        description: 'AI determines the best time to send messages to each prospect.',
        metric: '9:42 AM',
        metricLabel: 'Peak Response Time',
        chart: 'heatmap'
      }
    ]
  },
  {
    id: 'conversion',
    title: 'Conversion Optimization',
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: 'from-purple-400 to-indigo-600',
    insights: [
      {
        title: 'Follow-up Sequencing',
        description: 'Optimal number and timing of follow-ups to maximize responses.',
        metric: '3 Days',
        metricLabel: 'Ideal Follow-up Time',
        chart: 'timeline'
      },
      {
        title: 'Call-to-Action Analysis',
        description: 'Most effective CTAs based on prospect type and stage.',
        metric: '+52%',
        metricLabel: 'Meeting Conversion',
        chart: 'bars'
      },
      {
        title: 'Objection Handling',
        description: 'Common objections mapped to most effective responses.',
        metric: '12',
        metricLabel: 'Objection Patterns',
        chart: 'scatter'
      }
    ]
  },
  {
    id: 'performance',
    title: 'Performance Analytics',
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'from-amber-400 to-orange-600',
    insights: [
      {
        title: 'Campaign Performance',
        description: 'Real-time tracking of all outreach campaigns with AI insights.',
        metric: '28%',
        metricLabel: 'Improvement Rate',
        chart: 'area'
      },
      {
        title: 'Conversion Attribution',
        description: 'Multi-touch attribution to identify key conversion drivers.',
        metric: '7 Touches',
        metricLabel: 'Avg. to Convert',
        chart: 'funnel'
      },
      {
        title: 'ROI Analysis',
        description: 'Detailed ROI calculations for each outreach channel and campaign.',
        metric: '412%',
        metricLabel: 'Campaign ROI',
        chart: 'bars'
      }
    ]
  }
];

const AIInsightsVisualizer = () => {
  const [activeCategory, setActiveCategory] = useState(insightCategories[0].id);
  const [selectedInsight, setSelectedInsight] = useState(insightCategories[0].insights[0]);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  // Get current category data
  const currentCategory = insightCategories.find(cat => cat.id === activeCategory) || insightCategories[0];
  
  // Automatically cycle through categories when in view
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setActiveCategory(prev => {
        const currentIndex = insightCategories.findIndex(cat => cat.id === prev);
        const nextIndex = (currentIndex + 1) % insightCategories.length;
        return insightCategories[nextIndex].id;
      });
    }, 8000);
    
    return () => clearInterval(interval);
  }, [inView]);
  
  // Update selected insight when category changes
  useEffect(() => {
    setSelectedInsight(currentCategory.insights[0]);
  }, [activeCategory]);
  
  // Dynamic chart components based on chart type
  const renderChart = (type: string, insight: Insight) => {
    switch (type) {
      case 'doughnut':
        return <DoughnutChart value={parseInt(insight.metric)} />;
      case 'bars':
        return <BarsChart />;
      case 'line':
        return <LineChartComponent />;
      case 'pie':
        return <PieChartComponent />;
      case 'heatmap':
        return <HeatmapChart />;
      case 'timeline':
        return <TimelineChart />;
      case 'area':
        return <AreaChart />;
      case 'funnel':
        return <FunnelChart />;
      case 'scatter':
        return <ScatterChart />;
      default:
        return <BarsChart />;
    }
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-dark to-dark-800 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-6">
            AI-Powered Insights that Drive Results
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enai continuously analyzes your sales data to uncover actionable insights and optimization opportunities
          </p>
        </motion.div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {insightCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                activeCategory === category.id 
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-dark-800 text-gray-300 hover:bg-dark-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {React.cloneElement(category.icon, { 
                className: `w-5 h-5 ${activeCategory === category.id ? 'text-white' : 'text-gray-400'}`,
                key: `icon-${category.id}`
              })}
              <span className="font-medium">{category.title}</span>
            </motion.button>
          ))}
        </div>
        
        <div className="grid md:grid-cols-5 gap-8">
          {/* Insights List */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-6 border border-dark-700">
              <div className="flex items-center mb-6">
                {React.cloneElement(currentCategory.icon, { 
                  className: `w-6 h-6 mr-3 text-${currentCategory.color.split('-')[1]}-400`,
                  key: 'current-icon'
                })}
                <h3 className="text-xl font-semibold text-white">{currentCategory.title} Insights</h3>
              </div>
              
              <div className="space-y-3">
                {currentCategory.insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedInsight === insight 
                        ? `bg-${currentCategory.color.split('-')[1]}-500/10 border border-${currentCategory.color.split('-')[1]}-500/30`
                        : 'bg-dark-900/50 border border-dark-700 hover:border-dark-600'
                    }`}
                    onClick={() => setSelectedInsight(insight)}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start">
                      <motion.div 
                        className={`w-10 h-10 rounded-full bg-${currentCategory.color.split('-')[1]}-500/20 flex items-center justify-center mr-3 flex-shrink-0`}
                        animate={selectedInsight === insight ? {
                          scale: [1, 1.1, 1],
                          backgroundColor: [
                            `rgba(var(--color-${currentCategory.color.split('-')[1]}-500), 0.2)`,
                            `rgba(var(--color-${currentCategory.color.split('-')[1]}-500), 0.4)`,
                            `rgba(var(--color-${currentCategory.color.split('-')[1]}-500), 0.2)`
                          ]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-lg font-semibold text-white">{index + 1}</span>
                      </motion.div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{insight.title}</h4>
                        <p className="text-sm text-gray-400 line-clamp-2">{insight.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Visualization Area */}
          <motion.div 
            className="md:col-span-3 bg-dark-800/80 backdrop-blur-sm rounded-xl border border-dark-700 p-6 overflow-hidden"
            layout
            transition={{ duration: 0.5 }}
          >
            <motion.div
              key={`insight-${selectedInsight.title}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{selectedInsight.title}</h3>
                  <p className="text-gray-300">{selectedInsight.description}</p>
                </div>
                
                <motion.div 
                  className={`flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br ${currentCategory.color}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-2xl font-bold text-white">{selectedInsight.metric}</span>
                  <span className="text-xs text-white/80">{selectedInsight.metricLabel}</span>
                </motion.div>
              </div>
              
              <div className="h-60 w-full relative">
                {renderChart(selectedInsight.chart, selectedInsight)}
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center">
                  <Brain className={`w-5 h-5 text-${currentCategory.color.split('-')[1]}-400 mr-2`} />
                  <span className="text-sm text-gray-300">AI-generated insight based on your data</span>
                </div>
                
                <motion.button
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 bg-${currentCategory.color.split('-')[1]}-500/20 text-${currentCategory.color.split('-')[1]}-400 border border-${currentCategory.color.split('-')[1]}-500/30`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  <span className="text-sm">View Full Analysis</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-xl px-6 py-4">
            <div className="flex items-center justify-center">
              <Zap className="w-5 h-5 text-blue-400 mr-3" />
              <span className="text-lg font-medium text-white">AI analyzes your data 24/7 to uncover valuable insights</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Chart Components
const DoughnutChart = ({ value = 83 }) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <motion.path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="4"
            strokeDasharray="100, 100"
          />
          <motion.path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="url(#blue-gradient)"
            strokeWidth="4"
            strokeDasharray="100, 100"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 100 - value }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="text-3xl font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {value}%
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const BarsChart = () => {
  const values = [20, 45, 65, 85, 60, 30, 70];
  
  return (
    <div className="h-full w-full flex items-end justify-around px-4">
      {values.map((value, i) => (
        <div key={i} className="flex flex-col items-center h-full">
          <motion.div 
            className="w-12 bg-gradient-to-t from-blue-500/30 to-blue-500 rounded-t-md"
            style={{ height: `${value}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          />
          <div className="text-xs text-gray-500 mt-2">D{i+1}</div>
        </div>
      ))}
    </div>
  );
};

const LineChartComponent = () => {
  const points = [
    { x: 0, y: 20 },
    { x: 15, y: 40 },
    { x: 30, y: 30 },
    { x: 45, y: 50 },
    { x: 60, y: 40 },
    { x: 75, y: 60 },
    { x: 90, y: 75 },
    { x: 100, y: 70 }
  ];

  const svgHeight = 200;
  const svgWidth = "100%";
  
  // Convert points to SVG path
  const linePath = points.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${100 - point.y}`
  ).join(' ');
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <svg height={svgHeight} width={svgWidth} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <motion.line
            key={`grid-${y}`}
            x1="0"
            y1={100 - y}
            x2="100"
            y2={100 - y}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeDasharray="1,1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: y * 0.01 }}
          />
        ))}
        
        {/* Line chart path */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#green-gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={`point-${i}`}
            cx={point.x}
            cy={100 - point.y}
            r="2"
            fill="#10B981"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 + (i * 0.1) }}
          />
        ))}
        
        <defs>
          <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const PieChartComponent = () => {
  const segments = [
    { value: 45, color: "#3B82F6" },
    { value: 30, color: "#8B5CF6" },
    { value: 25, color: "#EC4899" }
  ];
  
  // Calculate start and end positions
  let cumulativePercent = 0;
  const segmentsWithAngles = segments.map(segment => {
    const startPercent = cumulativePercent;
    cumulativePercent += segment.value;
    const endPercent = cumulativePercent;
    
    return {
      ...segment,
      startPercent,
      endPercent
    };
  });
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100">
          {segmentsWithAngles.map((segment, i) => {
            const startAngle = (segment.startPercent / 100) * 360;
            const endAngle = (segment.endPercent / 100) * 360;
            
            // Convert to radians
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (endAngle - 90) * (Math.PI / 180);
            
            const x1 = 50 + 40 * Math.cos(startRad);
            const y1 = 50 + 40 * Math.sin(startRad);
            const x2 = 50 + 40 * Math.cos(endRad);
            const y2 = 50 + 40 * Math.sin(endRad);
            
            const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
            
            const pathData = [
              `M 50 50`,
              `L ${x1} ${y1}`,
              `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');
            
            return (
              <motion.path
                key={i}
                d={pathData}
                fill={segment.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              />
            );
          })}
        </svg>
        
        {/* Add labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4">
          {segmentsWithAngles.map((segment, i) => (
            <div key={i} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: segment.color }}></div>
              <span className="text-xs text-gray-300">{segment.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HeatmapChart = () => {
  const generateData = (): Array<{day: string; hour: string; value: number}> => {
    const data: Array<{day: string; hour: string; value: number}> = [];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const hours = ['9AM', '11AM', '1PM', '3PM', '5PM'];
    
    days.forEach(day => {
      hours.forEach(hour => {
        data.push({
          day,
          hour,
          value: Math.floor(Math.random() * 100)
        });
      });
    });
    
    return data;
  };
  
  const data = generateData();
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="grid grid-cols-7 gap-1 w-full max-w-md">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
          <div key={`label-${day}`} className="text-center text-xs text-gray-400">{day}</div>
        ))}
        
        {data.map((cell, i) => {
          const intensity = Math.floor(cell.value * 255);
          // Use purple gradient intensity
          const backgroundColor = `rgba(168, 85, 247, ${cell.value.toFixed(2)})`;
          
          return (
            <motion.div
              key={`cell-${i}`}
              className="w-full aspect-square rounded-sm"
              style={{ backgroundColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.01 }}
              whileHover={{ scale: 1.2 }}
            />
          );
        })}
        
        <div className="col-span-7 mt-2 flex justify-between items-center">
          <div className="text-xs text-gray-400">8 AM</div>
          <div className="text-xs text-gray-400">10 AM</div>
          <div className="text-xs text-gray-400">12 PM</div>
          <div className="text-xs text-gray-400">2 PM</div>
          <div className="text-xs text-gray-400">4 PM</div>
        </div>
      </div>
    </div>
  );
};

const TimelineChart = () => {
  const steps = [
    { day: 0, label: "Initial Contact", status: "Completed" },
    { day: 3, label: "Follow-up", status: "Optimal" },
    { day: 7, label: "Case Study", status: "Scheduled" },
    { day: 14, label: "Final Check-in", status: "Planned" }
  ];
  
  return (
    <div className="h-full w-full flex items-center justify-center py-4">
      <div className="w-full relative">
        {/* Timeline line */}
        <motion.div 
          className="absolute top-12 left-0 right-0 h-1 bg-dark-700"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />
        
        <div className="flex justify-between relative">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="text-sm text-gray-300 mb-2">{`Day ${step.day}`}</div>
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  step.status === "Optimal" 
                    ? "bg-red-500" 
                    : step.status === "Completed"
                    ? "bg-green-500"
                    : "bg-dark-800 border border-red-500/50"
                }`}
                animate={step.status === "Optimal" ? {
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 rgba(239, 68, 68, 0.4)",
                    "0 0 15px rgba(239, 68, 68, 0.6)",
                    "0 0 0 rgba(239, 68, 68, 0.4)"
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {step.status === "Completed" && <CheckCircle2 className="w-4 h-4 text-white" />}
                {step.status === "Optimal" && <CheckCircle2 className="w-4 h-4 text-white" />}
              </motion.div>
              <div className="text-xs text-gray-400 mt-2 max-w-[80px] text-center">{step.label}</div>
              {step.status === "Optimal" && (
                <div className="mt-1 px-2 py-0.5 bg-red-500/20 rounded text-xs text-red-400">Ideal Timing</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AreaChart = () => {
  const points = [
    { x: 0, y: 20 },
    { x: 15, y: 40 },
    { x: 30, y: 30 },
    { x: 45, y: 50 },
    { x: 60, y: 40 },
    { x: 75, y: 60 },
    { x: 90, y: 75 },
    { x: 100, y: 70 }
  ];

  const svgHeight = 200;
  const svgWidth = "100%";
  
  // Convert points to SVG path
  const linePath = points.map((point, i) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${100 - point.y}`
  ).join(' ');
  
  // Create an area path (line + bottom border)
  const areaPath = linePath + ` L 100 100 L 0 100 Z`;
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <svg height={svgHeight} width={svgWidth} viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <motion.line
            key={`grid-${y}`}
            x1="0"
            y1={100 - y}
            x2="100"
            y2={100 - y}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeDasharray="1,1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: y * 0.01 }}
          />
        ))}
        
        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill="url(#amber-gradient)"
          opacity="0.3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        {/* Line chart path */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={`point-${i}`}
            cx={point.x}
            cy={100 - point.y}
            r="2"
            fill="#F59E0B"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 1 + (i * 0.1) }}
          />
        ))}
        
        <defs>
          <linearGradient id="amber-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const FunnelChart = () => {
  const stages = [
    { label: "Prospects", value: 100, color: "#3B82F6" },
    { label: "Engaged", value: 65, color: "#8B5CF6" },
    { label: "Meetings", value: 35, color: "#EC4899" },
    { label: "Deals", value: 12, color: "#F97316" }
  ];
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        {stages.map((stage, i) => (
          <motion.div 
            key={i}
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="w-24 text-right text-xs text-gray-400 pr-3">{stage.label}</div>
            <motion.div 
              className="h-8 rounded"
              style={{ 
                width: `${stage.value}%`, 
                backgroundColor: stage.color,
                maxWidth: "calc(100% - 80px)"
              }}
              initial={{ width: 0 }}
              animate={{ width: `${stage.value}%` }}
              transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
            >
              <div className="h-full flex items-center justify-end pr-2">
                <span className="text-xs text-white font-medium">{stage.value}%</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ScatterChart = () => {
  const generatePoints = (): Array<{x: number; y: number; size: number}> => {
    const points = [];
    for (let i = 0; i < 12; i++) {
      points.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 10 + 5
      });
    }
    return points;
  };
  
  const points = generatePoints();
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <motion.line
            key={`grid-y-${y}`}
            x1="0"
            y1={100 - y}
            x2="100"
            y2={100 - y}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeDasharray="1,1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: y * 0.01 }}
          />
        ))}
        
        {[0, 25, 50, 75, 100].map(x => (
          <motion.line
            key={`grid-x-${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeDasharray="1,1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: x * 0.01 }}
          />
        ))}
        
        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={100 - point.y}
            r={point.size / 2}
            fill="rgba(248, 113, 113, 0.6)"
            stroke="#EF4444"
            strokeWidth="1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.5 }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AIInsightsVisualizer; 