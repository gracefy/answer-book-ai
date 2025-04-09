"use client";
"use client";

import { motion } from "framer-motion";

type AskButtonProps = {
  onClick: () => void;
  label?: string;
  size?: number;
};

export default function AskButton(props: AskButtonProps) {
  // Default size is 80px, but can be overridden by passing a size prop
  // Default label is "Ask", but can be overridden by passing a label prop
  const { onClick, label = "ASK", size = 96 } = props;

  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer"
      style={{ width: size, height: size }}
    >
      {/* Glowing aura ring (optional but cool af) */}
      {/* <div className="absolute -inset-2 rounded-full bg-purple-500 opacity-30 blur-2xl animate-ping z-0" /> */}

      {/* Rotating sphere shell */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-300 via-indigo-500 to-purple-800 shadow-[inset_4px_4px_10px_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.4)] border-4 border-white/20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <div className="absolute -inset-2 rounded-full bg-white/50 blur-2xl animate-pulse" />
      </motion.div>

      {/* Static center label */}
      <div className="z-10 text-indigo-100 text-md font-mono font-semibold text-center select-none pointer-events-none">
        {label}
      </div>
    </div>
  );
}

