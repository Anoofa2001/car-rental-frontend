import React from "react";
import Title from "./Title";
import { motion } from "motion/react";

const Testimonial = () => {
    const [tooltip, setTooltip] = React.useState({ visible: false, x: 0, y: 0, text: '' });
    const cardRefs = React.useRef([]);

    const handleMouseMove = (e, index) => {
        const bounds = cardRefs.current[index].getBoundingClientRect();
        setTooltip({
            visible: true,
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top,
            text: testimonials[index].name,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    const testimonials = [
        {
            name: 'Emily Carter',
            title: 'Business Traveler',
            message:
                'The car rental process was smooth and hassle-free. The vehicle was clean, comfortable, and perfect for my business trip. Highly recommend this service!',
            image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
        },
        {
            name: 'Michael Lee',
            title: 'Vacationer',
            message:
                'Booking a car for our family vacation was so easy! The staff was friendly and the car performed great throughout our trip. Will definitely use again.',
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
        },
        {
            name: 'Sara Ahmed',
            title: 'Frequent Renter',
            message:
                'I always choose this car rental company for my travels. Their rates are affordable, and the selection of cars is excellent. Never had a bad experience!',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop',
        },
    ];

    // ✨ Animation variants
    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const card = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <section className="w-full bg-gray-50 py-16 px-4 md:px-0">
            <div className="max-w-5xl mx-auto">

                {/* ✨ Title animation */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-center text-4xl font-bold text-gray-900 mb-2">
                        What Customers Say
                    </h1>
                    <p className="text-center text-gray-500 mb-10">
                        Discover what our valued customers have to say about their car rental experiences.
                    </p>
                </motion.div>

                {/* ✨ Cards */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-6"
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={handleMouseLeave}
                            variants={card}
                            whileHover={{
                                y: -6,
                                scale: 1.02,
                                boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
                            }}
                            className="relative border border-gray-200 bg-white rounded-lg overflow-hidden max-w-sm transition-all duration-300"
                        >
                            {/* ✨ Tooltip animation */}
                            {tooltip.visible && tooltip.text === testimonial.name && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute px-2.5 py-1 text-sm rounded text-nowrap bg-indigo-500 text-white pointer-events-none"
                                    style={{
                                        top: tooltip.y + 8,
                                        left: tooltip.x + 8,
                                    }}
                                >
                                    {tooltip.text}
                                </motion.span>
                            )}

                            <div className="flex flex-col items-center justify-center p-8 text-center">
                                <div className="mb-4 text-gray-500">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Very easy to integrate
                                    </h3>
                                    <p className="my-4 text-sm line-clamp-3">
                                        {testimonial.message}
                                    </p>
                                </div>

                                <div className="flex items-center justify-center">
                                    <img
                                        className="rounded-full w-9 h-9"
                                        src={testimonial.image}
                                        alt={`${testimonial.name} profile`}
                                    />
                                    <div className="space-y-0.5 font-medium text-left ml-3">
                                        <p>{testimonial.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {testimonial.title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonial;