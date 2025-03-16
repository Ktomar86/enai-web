declare module 'framer-motion';
declare module '@lottiefiles/react-lottie-player';
declare module 'react-spring';
declare module '@radix-ui/react-tooltip';
declare module 'lucide-react';

// This ensures JSX works properly
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 