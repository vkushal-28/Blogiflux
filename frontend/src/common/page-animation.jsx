import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const AnimationWrapper = ({
  children,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  classname,
}) => {
  return (
    <motion.div
      key={keyValue}
      initial={initial}
      animate={animate}
      transition={transition}
      className={classname}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
