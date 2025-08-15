import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Integration {
  name: string;
  key: string;
  color: string;
  category: string;
  depth: number;
}

interface IntegrationIconProps {
  integration: Integration;
  index: number;
}

const IntegrationIcon = ({ integration, index }: IntegrationIconProps) => {
  const [iconPath, setIconPath] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const simpleIcons = await import('simple-icons');
        const icon = (simpleIcons as any)[integration.key];
        if (icon) {
          setIconPath(icon.path);
        }
        setIsLoaded(true);
      } catch (error) {
        console.warn(`Failed to load icon for ${integration.name}`);
        setIsLoaded(true);
      }
    };

    // Add delay based on index to stagger loading
    const timer = setTimeout(loadIcon, index * 100);
    return () => clearTimeout(timer);
  }, [integration.key, integration.name, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex flex-col items-center group cursor-pointer"
    >
      <div className="flex items-center justify-center h-14 w-32 rounded-lg bg-dark-800/60 border border-dark-700 hover:border-primary-400/30 transition-all duration-300">
        {!isLoaded ? (
          // Loading skeleton
          <div className="w-20 h-6 bg-gray-700 animate-pulse rounded"></div>
        ) : iconPath ? (
          // Icon loaded successfully
          <svg
            role="img"
            viewBox="0 0 24 24"
            width="100"
            height="24"
            aria-label={`${integration.name} logo`}
            className="opacity-90 group-hover:opacity-100 transition-opacity duration-200"
          >
            <path fill={integration.color} d={iconPath} />
          </svg>
        ) : (
          // Fallback text
          <span className="text-gray-400 text-sm font-medium">{integration.name}</span>
        )}
        <span className="sr-only">{integration.name}</span>
      </div>
    </motion.div>
  );
};

interface OptimizedIntegrationsProps {
  integrations: Integration[];
}

const OptimizedIntegrations = ({ integrations }: OptimizedIntegrationsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
      {integrations.map((integration, index) => (
        <IntegrationIcon
          key={integration.key}
          integration={integration}
          index={index}
        />
      ))}
    </div>
  );
};

export default OptimizedIntegrations;