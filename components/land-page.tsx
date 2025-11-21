"use client"

import { motion } from "framer-motion"

export default function LandPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-black min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-black dark:text-white">
              AI-Powered Image Generation at Your Fingertips
            </h1>

            <p className="text-lg mb-24 max-w-3xl mx-auto leading-relaxed text-black dark:text-white">
              Experience the future of creativity with Nano Banana, the AI-driven image generator that transforms your ideas into stunning visuals. Whether you're a designer, marketer, or hobbyist, Nano Banana makes it effortless to create unique images tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
