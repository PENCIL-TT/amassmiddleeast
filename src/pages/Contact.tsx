import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LocationsSection from "@/components/LocationsSection";
import ContactForm from "@/components/ContactForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Send, XCircle } from "lucide-react";
const Contact: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const locationNames = ["SINGAPORE", "SRI LANKA", "MYANMAR", "BANGLADESH", "PAKISTAN", "UK", "USA"];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const urls = ["https://formsubmit.co/ajax/karthikjungleemara@gmail.com", "https://formsubmit.co/ajax/karthiktrendsandtactics@gmail.com"];
    try {
      const responses = await Promise.all(urls.map(url => fetch(url, {
        method: "POST",
        body: formData
      })));
      const allSuccessful = responses.every(res => res.ok);
      if (allSuccessful) {
        setShowNotification(true);
        form.reset();
        setSelectedLocation("");
        setTimeout(() => setShowNotification(false), 4000);
      } else {
        alert("One or more submissions failed. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission failed. Please try again.");
    }
  };
  return <div className="min-h-screen flex flex-col relative">
      <Navigation />

      <main className="flex-grow">
        <motion.section initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="relative h-[40vh] flex items-center justify-center bg-blue-700 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black to-blue-900/90" />
          <motion.div initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.2,
          duration: 0.8
        }} className="text-center px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Get in Touch</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto font-light">
              We're here to help and answer any questions you might have.
            </p>
          </motion.div>
        </motion.section>

        <section className="py-16 bg-gradient-to-b from-blue-50/30 to-white">
          <div className="container mx-auto px-4">
            <LocationsSection />
          </div>
        </section>

        <section id="contact-form" className="py-1 bg-white">
         <ContactForm />
        </section>
      </main>

      <Footer />
    </div>;
};
export default Contact;