import React from 'react';

interface ElevenLabsOrbProps {
  agentId: string;
  className?: string;
}

const ElevenLabsOrb: React.FC<ElevenLabsOrbProps> = ({ agentId, className }) => {
  return (
    <div className={`relative ${className || ''}`} aria-label="AI Conversational Sales Assistant" role="application">
      <elevenlabs-convai 
        agent-id={agentId}
        className="w-full h-full"
        title="Enai.ai Sales AI Assistant - Ask about AI-powered sales automation"
      ></elevenlabs-convai>
    </div>
  );
};

export default ElevenLabsOrb;