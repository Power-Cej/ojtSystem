// STAGGER

export const container = (timing = 0.05) => {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: timing,
      },
    },
  };
};

export const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};
