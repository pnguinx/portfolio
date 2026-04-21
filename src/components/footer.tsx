"use client";

import { motion } from "framer-motion";

interface Footer {
  variant?: "bottom" | "center";
  className?: string;
}

export default function Footer({ variant = "bottom", className = "" }: Footer) {
  const baseClasses = "text-xs text-muted-foreground/60 lowercase";

  const variantClasses = {
    bottom: "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10",
    center: "flex justify-center items-center py-2",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: variant === "bottom" ? 20 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {/* Designed & Developed by{" "} */}
      {/* <a
        href="https://portfolio-dusky-three-40.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1 hover:text-primary transition-colors duration-200 underline decoration-dotted underline-offset-2 font-bold lowercase"
      >
        siraj
      </a> */}
    </motion.div>

  );
}
