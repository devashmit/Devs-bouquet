/**
 * Framer Motion animation variants for DevsBouquet.
 * Orchestrated reveal: stems → flowers → color → settle.
 */

// Check if user prefers reduced motion
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches 
  : false;

// Check if mobile (simple heuristic)
const isMobile = typeof window !== 'undefined' 
  ? window.innerWidth < 768 
  : false;

// Duration multiplier: reduce by 20% on mobile, instant on reduced motion
const dm = prefersReducedMotion ? 0.01 : isMobile ? 0.8 : 1;

/**
 * Container variant — orchestrates child animations
 */
export const bouquetContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 * dm,
      delayChildren: 0.1 * dm,
      when: 'beforeChildren',
    },
  },
};

/**
 * Stem drawing animation — pathLength 0→1
 */
export const stemVariants = {
  hidden: { 
    pathLength: 0, 
    opacity: 0 
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { 
      duration: 1.2 * dm, 
      ease: 'easeInOut',
    },
  },
};

/**
 * Stem group - orchestrates all stems together
 */
export const stemGroupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 * dm,
      duration: 0.3 * dm,
    },
  },
};

/**
 * Individual flower appearance — scale + opacity
 */
export const flowerVariants = {
  hidden: { 
    scale: 0, 
    opacity: 0,
    rotate: -10,
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { 
      duration: 0.6 * dm, 
      ease: [0.34, 1.56, 0.64, 1], // spring-like
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
};

/**
 * Flower group - staggered appearance
 */
export const flowerGroupVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2 * dm,
      delayChildren: 1.2 * dm, // after stems
    },
  },
};

/**
 * Color fade-in — opacity transition for fill elements
 */
export const colorFadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8 * dm,
      delay: 2.5 * dm, // after flowers appear
      ease: 'easeOut',
    },
  },
};

/**
 * Settle bounce — final subtle position adjustment
 */
export const settleBounceVariants = {
  hidden: { y: 5 },
  visible: {
    y: 0,
    transition: {
      duration: 0.4 * dm,
      delay: 3.5 * dm,
      type: 'spring',
      stiffness: 300,
      damping: 10,
    },
  },
};

/**
 * Message reveal animation
 */
export const messageVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8 * dm,
      delay: 4.0 * dm,
      ease: 'easeOut',
    },
  },
};

/**
 * Page transition variants
 */
export const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

/**
 * Stagger children utility
 */
export const staggerContainer = (staggerTime = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
    },
  },
});

/**
 * Fade in up for list items
 */
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/**
 * Floating petal animation
 */
export const floatingPetalVariants = {
  animate: (i) => ({
    y: ['0vh', '100vh'],
    x: [0, Math.sin(i * 0.7) * 50],
    rotate: [0, 360],
    opacity: [0, 0.7, 0.7, 0],
    transition: {
      duration: 8 + i * 2,
      repeat: Infinity,
      ease: 'linear',
      delay: i * 1.5,
    },
  }),
};

export default {
  bouquetContainerVariants,
  stemVariants,
  stemGroupVariants,
  flowerVariants,
  flowerGroupVariants,
  colorFadeVariants,
  settleBounceVariants,
  messageVariants,
  pageVariants,
  staggerContainer,
  fadeInUp,
  floatingPetalVariants,
};
