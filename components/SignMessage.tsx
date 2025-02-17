/**
 * Component for signing messages with Web3 wallet integration and animated UI feedback
 */
"use client";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { SignMessageErrorType } from "wagmi/actions";
import { SignMessageData } from "wagmi/query";

// Message to be signed by the user
const signatureMessage = "Hello Quantinium";

// Types for message state management
type MessageType = {
  text: string;
  state: "success" | "error" | "pending";
};

// Color mapping for different message states
const messageStateColors: Record<MessageType["state"], string> = {
  error: "text-red-500",
  success: "text-green-500",
  pending: "text-amber-500",
};

export default function SignMessage() {
  // State management for messages and loading
  const [message, setMessage] = useState<MessageType>({
    text: "",
    state: "pending",
  });
  const [loading, setLoading] = useState(false);
  const { isConnected } = useAccount();

  // Hook for handling message signing with wagmi
  const { signMessage, isPending } = useSignMessage({
    mutation: {
      onSuccess(data: SignMessageData) {
        setMessage({
          text: `Signature: ${data}`,
          state: "success",
        });
        setLoading(false);
      },
      onError(error: SignMessageErrorType) {
        console.log(error);
        setMessage({
          text:
            error.name === "UserRejectedRequestError"
              ? "Request rejected"
              : "Transaction error",
          state: "error",
        });
        setLoading(false);
      },
    },
  });

  // Reset message when wallet connection changes
  useEffect(() => {
    if (isConnected) setMessage({ text: "", state: "pending" });
  }, [isConnected]);

  // Handle signature request
  const handleSign = async () => {
    if (!isConnected) {
      setMessage({
        text: "Please connect your wallet first",
        state: "pending",
      });
      return;
    }

    setLoading(true);
    setMessage({
      text: "Please sign the message in your wallet",
      state: "pending",
    });
    signMessage({ message: signatureMessage });
  };

  return (
    <motion.section
      layout
      transition={{
        duration: 0.5,
        type: "spring",
        bounce: 0.2,
      }}
      className="min-w-[380px] rounded-2xl bg-background2 p-4 flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.h2 layout className="text-center text-2xl font-bold mb-4">
        Sign message
      </motion.h2>
      <motion.p layout className="text-center my-2">
        &quot;{signatureMessage}&quot;
      </motion.p>
      {/* Sign button with loading state */}
      {/* We could abstract this into a separate component but since it's only used once in this project, it's not worth it.
      (not a good practice to over abstract components now as plans in the future may change) */}
      <button
        onClick={handleSign}
        className="w-fit my-2 font-bold relative bg-foreground text-background px-4 py-2 rounded-xl 
       disabled:opacity-70 enabled:hover:scale-105 enabled:hover:bg-primary/90 enabled:cursor-pointer transition-all flex items-center justify-center"
        disabled={loading || isPending}
      >
        <span className={loading || isPending ? "invisible" : ""}>Sign</span>
        {(loading || isPending) && (
          <Loader2 className="h-6 w-6 animate-spin absolute" />
        )}
      </button>
      {/* Animated message display */}
      <AnimatePresence mode="wait">
        <motion.p
          layout
          key={message.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`text-center my-2 text-sm ${
            messageStateColors[message.state]
          }`}
        >
          {message.text}
        </motion.p>
      </AnimatePresence>
    </motion.section>
  );
}
