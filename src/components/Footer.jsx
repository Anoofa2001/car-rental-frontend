import React from 'react'
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-white py-8 mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">

        {/* Logo + Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-4 md:mb-0"
        >
          <h2 className="text-xl font-bold">Car Rental</h2>
          <p className="text-sm text-gray-400 mt-2">
            Your trusted partner for convenient and affordable car rentals.
          </p>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex space-x-6 mb-4 md:mb-0"
        >
          {["Home", "Cars", "My Bookings", "Contact"].map((item, i) => (
            <motion.a
              key={i}
              href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
              whileHover={{ y: -2 }}
              className="hover:text-indigo-400 transition"
            >
              {item}
            </motion.a>
          ))}
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="flex space-x-4"
        >
          {[ 
            {
              href: "https://facebook.com",
              svg: <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/>
            },
            {
              href: "https://twitter.com",
              svg: <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.737 0-4.958 2.222-4.958 4.958 0 .388.044.765.127 1.127C7.728 8.87 4.1 6.884 1.671 3.149c-.427.734-.666 1.584-.666 2.491 0 1.72.875 3.234 2.209 4.122a4.904 4.904 0 0 1-2.248-.621v.062c0 2.404 1.713 4.415 4.004 4.872a4.936 4.936 0 0 1-2.244.085c.632 1.974 2.463 3.413 4.633 3.453A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.514 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/>
            },
            {
              href: "https://instagram.com",
              svg: <>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
                <circle cx="12" cy="12" r="3.5" />
              </>
            }
          ].map((icon, i) => (
            <motion.a
              key={i}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                {icon.svg}
              </svg>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-8 text-center text-xs text-gray-500"
      >
        &copy; {new Date().getFullYear()} Car Rental. All rights reserved.
      </motion.div>
    </motion.footer>
  )
}

export default Footer