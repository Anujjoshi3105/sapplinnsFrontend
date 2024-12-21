export const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      duration: 0.2,
      staggerChildren: 0.2,
    },
  },
};

export const childVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { type: "spring", stiffness: 300 } },
};

export const menuVars = {
  initial: { scaleY: 0, opacity: 0 },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    scaleY: 0,
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

export const containerVars = {
  initial: {
    opacity: 0,
    transition: { staggerChildren: 0.1, staggerDirection: -1 },
  },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.1, staggerDirection: 1 },
  },
};

export const mobileLinkVars = {
  initial: { y: "30vh", opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};
