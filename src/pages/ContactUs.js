import React, { useState } from "react";
import ".././pages/pages css/ContactUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState(""); // State for response message
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json(); // Store response data
      
      if (data.success) {
        setResponseMessage("Message sent successfully!"); // Set success message
      } else {
        setResponseMessage("Failed to send message. Please try again."); // Set error message
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("There was an error sending your message.");
    } finally {
      setIsLoading(false); // Stop loading

      // Set a timeout to clear the message after 6 seconds
      setTimeout(() => {
        setResponseMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        If you have any questions, please feel free to reach out to us. We’d
        love to hear from you!
      </p>

      <div className="contact-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            value={formData.email}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            onChange={handleChange}
            value={formData.message}
          ></textarea>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {responseMessage && (
          <div className={`response-message ${responseMessage.includes('successfully') ? 'success' : 'error'}`}>
            {responseMessage}
          </div>
        )}

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.067986275581!2d5.80397257421056!3d5.556941233641829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1041addc553a967f%3A0xe456da47139bdef!2sCHRIST%20AUTHORITY%20OUTREACH%20MINISTRY!5e0!3m2!1sen!2sng!4v1731455433312!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
        </div>
      </div>

      <div className="contact-info">
        <div className="contact-item">
          <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
          <span>magicmoviescinema@gmail.com</span>
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faPhone} className="contact-icon" />
          <span>09057973810, 08139211463</span>
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
          <span>No 26, Christ Authority Street, Alegbo/Ugbolokposo Road, Effurun, Delta State</span>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default ContactUs;
