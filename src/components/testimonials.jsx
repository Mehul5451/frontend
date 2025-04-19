import React from "react";

const Testimonials = () => {
  const testimonials = [
    { text: "The DJ was amazing! They made our wedding unforgettable. Highly recommend!", author: "Gadhadara Mehul" },
    { text: "Great service and incredible DJs! Would book again.", author: "Khambhaliya Krupal" },
    { text: "The music was perfect for our corporate event. Thank you!", author: "Makwana Dhruv " },
  ];

  return (
    <div className="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-list">
        {testimonials.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <p>"{testimonial.text}"</p>
            <p>— {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
