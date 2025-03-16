import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, MessageSquare, Database, Zap, ChevronRight } from 'lucide-react';

const workflowSteps = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Input Processing",
    description: "Natural language understanding and context analysis",
    color: "#F7B733"
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Data Analysis",
    description: "Pattern recognition and insight extraction",
    color: "#FC4A1A"
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Response Generation",
    description: "Contextual response creation and optimization",
    color: "#F7B733"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Action Execution",
    description: "Automated task completion and follow-up",
    color: "#FC4A1A"
  }
];

const performanceData = [
  { time: '0s', accuracy: 45 },
  { time: '10s', accuracy: 65 },
  { time: '20s', accuracy: 75 },
  { time: '30s', accuracy: 85 },
  { time: '40s', accuracy: 92 },
  { time: '50s', accuracy: 95 },
];

export default function AIShowcase() {
  const { ref: showcaseRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-dark to-dark-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={showcaseRef}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl font-bold text-center gradient-text mb-16">AI Workflow</h2>

          {/* Workflow Animation */}
          <div className="relative mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="p-6 rounded-2xl bg-dark-800 border border-dark-700 hover:border-primary-400 transition-colors">
                    <div className="flex items-center mb-4">
                      <div
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: `${step.color}20` }}
                      >
                        {React.cloneElement(step.icon, {
                          className: `w-8 h-8 text-[${step.color}]`
                        })}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>

                  {index < workflowSteps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-400"
                      variants={lineVariants}
                      style={{ originX: 0 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-dark-800 border border-dark-700"
            >
              <h3 className="text-xl font-semibold mb-6">Learning Progress</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1A1B1E" />
                    <XAxis dataKey="time" stroke="#6C757D" />
                    <YAxis stroke="#6C757D" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1A1B1E',
                        border: '1px solid #343A40',
                        borderRadius: '0.5rem'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#F7B733"
                      strokeWidth={2}
                      dot={{ fill: '#F7B733' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-dark-800 border border-dark-700"
            >
              <h3 className="text-xl font-semibold mb-6">Process Steps</h3>
              <div className="space-y-4">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center p-4 rounded-lg bg-dark-700 border border-dark-600"
                  >
                    <div
                      className="p-2 rounded-lg mr-4"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      {React.cloneElement(step.icon, {
                        className: `w-6 h-6 text-[${step.color}]`
                      })}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{step.title}</h4>
                      <p className="text-sm text-gray-300">{step.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-primary-400 ml-auto" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Response Time', value: '0.5s', change: '-60%' },
              { label: 'Task Completion', value: '95%', change: '+15%' },
              { label: 'Accuracy Rate', value: '99.9%', change: '+5%' }
            ].map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-dark-800 border border-dark-700 text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-2">{metric.value}</div>
                <div className="text-sm text-gray-300 mb-2">{metric.label}</div>
                <div className={`text-sm ${metric.change.startsWith('+') ? 'text-green-400' : 'text-primary-400'}`}>
                  {metric.change} vs. Traditional Methods
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}