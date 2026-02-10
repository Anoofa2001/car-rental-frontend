import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">Car Rental</h2>
          <p className="text-sm text-gray-400 mt-2">Your trusted partner for convenient and affordable car rentals.</p>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/" className="hover:text-indigo-400 transition">Home</a>
          <a href="/cars" className="hover:text-indigo-400 transition">Cars</a>
          <a href="/mybookings" className="hover:text-indigo-400 transition">My Bookings</a>
          <a href="/contact" className="hover:text-indigo-400 transition">Contact</a>
        </div>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.737 0-4.958 2.222-4.958 4.958 0 .388.044.765.127 1.127C7.728 8.87 4.1 6.884 1.671 3.149c-.427.734-.666 1.584-.666 2.491 0 1.72.875 3.234 2.209 4.122a4.904 4.904 0 0 1-2.248-.621v.062c0 2.404 1.713 4.415 4.004 4.872a4.936 4.936 0 0 1-2.244.085c.632 1.974 2.463 3.413 4.633 3.453A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.514 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.414 3.678 1.395c-.981.981-1.264 2.093-1.323 3.374C2.013 5.741 2 6.151 2 12c0 5.849.013 6.259.072 7.539.059 1.281.342 2.393 1.323 3.374.981.981 2.093 1.264 3.374 1.323C8.741 23.987 9.151 24 12 24c2.849 0 3.259-.013 4.539-.072 1.281-.059 2.393-.342 3.374-1.323.981-.981 1.264-2.093 1.323-3.374.059-1.281.072-1.691.072-7.539 0-5.849-.013-6.259-.072-7.539-.059-1.281-.342-2.393-1.323-3.374-.981-.981-2.093-1.264-3.374-1.323C15.259.013 14.849 0 12 0z"/><circle cx="12" cy="12" r="3.5"/></svg>
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Car Rental. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
