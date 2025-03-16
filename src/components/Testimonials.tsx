import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "ENAI has transformed our B2B campaigns with their intuitive AI workers. The seamless integration and exceptional customer support have significantly boosted our team's productivity.",
    author: "Lianne Brooks",
    role: "MD of HastyCart"
  },
  {
    quote: "We are a Salesforce focused B2B marketing agency. ENAI has helped us identify the right market niche for Salesforce ecosystem. With their AI team, we continue to scale up rapidly.",
    author: "Zeeshan Idrees",
    role: "CEO, IndustryGeniuses"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="testimonial-carousel">
          <div className="testimonial-content">
            <blockquote className="text-2xl font-medium text-white mb-8">
              {testimonials[currentIndex].quote}
            </blockquote>
            <cite className="text-gray-400 block">
              <span className="font-semibold text-white">{testimonials[currentIndex].author}</span>
              <br />
              {testimonials[currentIndex].role}
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}