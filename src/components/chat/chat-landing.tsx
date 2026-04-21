"use client";

import { motion } from "framer-motion";
import { Brain, Code, MessageSquare, User, Award, Mail, Zap, BookOpen, Lightbulb } from "lucide-react";
import React from "react";

interface ChatLandingProps {
  submitQuery: (query: string) => void;
  hasReachedLimit?: boolean;
}

const ChatLanding: React.FC<ChatLandingProps> = ({
  submitQuery,
  hasReachedLimit = false,
}) => {
 

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="mb-3 md:mb-5 text-center" variants={itemVariants}>
        <h2 className="mb-2 md:mb-3 text-2xl md:text-3xl font-semibold leading-relaxed">
          hey, i'm penguin..
        </h2>
        {/* <p className="text-muted-foreground mx-auto max-w-md text-sm md:text-base leading-relaxed">
          a passionate 16-year-old developer from pakistan.
        </p> */}
      </motion.div>

      <motion.div
        className="w-full max-w-md space-y-2 md:space-y-3"
        variants={containerVariants}
      >
        
      </motion.div>
    </motion.div>
  );
};

export default ChatLanding;
