import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplashMessage } from "../types";

interface SplashScreenProps {
  show: boolean;
  currentMessage: SplashMessage;
  isLastMessage: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  show,
  currentMessage,
  isLastMessage,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-50 bg-gradient-to-br from-[#101828] via-[#ff6800] to-[#101828] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <div className="text-center">
            <motion.div
              key={currentMessage.text}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-white text-center"
            >
              <div className="text-yellow-400 mb-4 flex justify-center">
                {currentMessage.icon}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {currentMessage.text}
              </h2>
              {isLastMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-yellow-400 text-lg"
                >
                  Build. Launch. Succeed.
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;