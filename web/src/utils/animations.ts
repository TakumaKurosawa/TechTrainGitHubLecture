import type { RouteAnimationVariants } from '@/types';

export const pageVariants: RouteAnimationVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const pageTransition = {
  type: 'tween',
  duration: 0.3,
  ease: 'easeInOut',
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerChild = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};