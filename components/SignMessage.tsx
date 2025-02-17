"use client";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { SignMessageErrorType } from "wagmi/actions";
import { SignMessageData } from "wagmi/query";

const signatureMessage = "Hello Quantinium";

type MessageType = {
  text: string;
  state: "success" | "error" | "pending";
};

const messageStateColors: Record<MessageType["state"], string> = {
  error: "text-red-500",
  success: "text-green-500",
  pending: "text-amber-500",
};

export default function SignMessage() {
  const [message, setMessage] = useState<MessageType>({
    text: "",
    state: "pending",
  });
  const [loading, setLoading] = useState(false);
  const { isConnected } = useAccount();

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

  useEffect(() => {
    if (isConnected) setMessage({ text: "", state: "pending" });
  }, [isConnected]);

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
      <motion.button
        layout
        onClick={handleSign}
        className="w-fit my-2 font-bold relative bg-foreground text-background px-4 py-2 rounded-xl 
        disabled:opacity-70 enabled:hover:scale-105 enabled:hover:bg-primary/90 enabled:cursor-pointer transition-all flex items-center justify-center"
        disabled={loading || isPending}
      >
        <span className={loading || isPending ? "invisible" : ""}>Sign</span>
        {(loading || isPending) && (
          <Loader2 className="h-6 w-6 animate-spin absolute" />
        )}
      </motion.button>
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
