import { motion } from "framer-motion";

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center">
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full border border-gold/30" />
          <motion.div
            className="absolute inset-0 rounded-full border-t-2 border-gold"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-script text-4xl text-gold-gradient">U &amp; M</span>
          </div>
        </div>
        <p className="mt-8 font-display tracking-[0.4em] text-xs text-gold/70">LOADING INVITATION</p>
      </div>
    </motion.div>
  );
}
