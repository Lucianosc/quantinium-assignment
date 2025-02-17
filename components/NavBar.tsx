/**
 * Navigation bar component with wallet connection button and animations
 */
"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

export default function NavBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex p-2 justify-center"
    >
      <motion.nav
        layout
        transition={{
          duration: 0.5,
          type: "spring",
          bounce: 0.2,
        }}
        className="max-w-6xl flex justify-between items-center w-full bg-background2 rounded-2xl p-2"
      >
        <motion.h2 layout className="text-2xl font-bold">
          Quantinium Assignment
        </motion.h2>
        <motion.div layout>
          <ConnectButton />
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}
