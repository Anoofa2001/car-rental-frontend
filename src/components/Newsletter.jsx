import React, { useState } from 'react'
import { motion } from "motion/react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 md:my-40"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="md:text-4xl text-2xl font-semibold"
        >
          Never Miss a Deal!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="md:text-lg text-gray-500/70 pb-8"
        >
          Subscribe to get the latest offers, new arrivals, and exclusive discounts
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            className="border border-gray-300 h-full border-r-0 outline-none w-full px-3 text-gray-500 rounded-md rounded-r-none"
            type="email"
            placeholder="Enter your email id"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none"
          >
            Subscribe
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Newsletter;