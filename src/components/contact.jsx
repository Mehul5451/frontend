import React from "react";
import "../components/css/contact.css";

 const ContactUs = () => {
  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      
      {/* Contact Information */}
      <div className="contact-info">
        <h2>Reach Out to Us</h2>
        <p><strong>Phone:</strong> +91 7698545512</p>
        <p><strong>Email:</strong> djbooki123@gmail.com</p>
        <p><strong>Address:</strong> Botad,Gujarat</p>
        <p><strong>Working Hours:</strong> Mon - Fri, 9 AM - 5 PM</p>
      </div>
      
      {/* Contact Form */}
      {/* <div className="contact-form">
        <h2>Send a Message</h2>
        <form>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
          <label>
            Subject:
            <input type="text" name="subject" />
          </label>
          <label>
            Message:
            <textarea name="message" rows="5" required></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div> */}

      {/* Embedded Map */}
      <div className="map">
        <h2>Our Location</h2>
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2031.257290379861!2d71.76833736737088!3d22.09943406564132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3958cf83fa9bd2c3%3A0xb3a93eea72099860!2sHari%20Om%20Society!5e1!3m2!1sen!2sin!4v1737266436705!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
