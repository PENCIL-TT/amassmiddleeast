import React, { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Building2, CheckCircle2 } from "lucide-react";
import { useLocation } from "react-router-dom";

// Brand Colors
const BRAND = {
  blue: "#2563eb",
  red: "#dc2626",
  gold: "#dc2626", // using red as accent for Amass
  black: "#111",
};

const ContactForm: React.FC = () => {
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState("UAE");
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [contactData, setContactData] = useState({
    titleText: "Get In Touch",
    subtitleText: "Have questions? We would love to hear from you. Send us a message or find our offices below.",
    recipientEmail: "contact@dxb.amassfreight.com",
    offices: {
      UAE: [
        {
          name: "Head Office",
          address: "202, Sultan Business Centre\nOud Metha, P.O. Box 33463\nDubai – UAE",
          phone: "+971 4 3575508",
          fax: "+971 4 2221794",
          email: "contact@dxb.amassfreight.com",
        },
        {
          name: "CFS",
          address: "Plot No S20312,\nJafza South,\nJebel Ali, Dubai – UAE",
          phone: "+971 4 3400298",
          fax: "+971 4 8831004",
          email: "contact@dxb.amassfreight.com",
        },
      ],
      China: [
        {
          name: "Shanghai – Head Office",
          address: "21-22F, NO.1089, Dongdaming Road,\nHongkou, Shanghai, P.R.C.",
          phone: "+86 18121430682",
          fax: "",
          email: "ec@amassfreight.com",
        },
      ],
      "Saudi Arabia": [
        {
          name: "Dammam – Head Office",
          address: "Rashidiya Business Center\nBuild No: 7257 Room 308, 3rd Floor – Al Amamrah\nDammam – 32415 – KSA",
          phone: "+966 13 849 8637",
          fax: "",
          email: "contact@dxb.amassfreight.com",
        },
        {
          name: "Jeddah",
          address: "Room No. 408, Saudi Business Centre\n7859 Al Madinah Al Munawarah Road\nAl Sharafeyah, Jeddah 4542-22234",
          phone: "+966 12 578 0874",
          fax: "",
          email: "contact@dxb.amassfreight.com",
        },
        {
          name: "Riyadh",
          address: "Room No. 20, Al Malaz\nBldg. No. 104, 2nd Floor, Al Qirawani St.\nAl Malaz District, Riyadh 11332, K.S.A",
          phone: "+966 13 849 8630",
          fax: "",
          email: "contact@dxb.amassfreight.com",
        },
      ],
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_contact_form");
    if (saved) {
      setContactData(JSON.parse(saved));
    }
  }, []);

  const getCurrentCountry = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/saudi")) return "Saudi Arabia";
    if (path.includes("/china")) return "China";
    return "UAE";
  };

  useEffect(() => {
    setSelectedLocation(getCurrentCountry());
  }, [location.pathname]);

  const locationOptions = useMemo(() => Object.keys(contactData.offices), [contactData.offices]);

  // Build prioritized list: selected location first, then others — capped at 6
  const topFourOffices = useMemo(() => {
    const withCountry = Object.entries(contactData.offices).flatMap(([country, offices]) =>
      offices.map((o) => ({ 
        ...o, 
        country,
        phones: o.phone ? [o.phone] : [],
        emails: o.email ? [o.email] : []
      }))
    );
    const primary = withCountry.filter((o) => o.country === selectedLocation);
    const others = withCountry.filter((o) => o.country !== selectedLocation);
    return [...primary, ...others].slice(0, 6);
  }, [contactData.offices, selectedLocation]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const emails = [
      contactData.recipientEmail || "contact@dxb.amassfreight.com",
    ];

    try {
      await Promise.all(
        emails.map((email) =>
          fetch(`https://formsubmit.co/ajax/${email}`, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: formData,
          })
        )
      );

      form.reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err: any) {
      alert("Something went wrong: " + (err?.message || "Unknown error"));
    }
  };

  return (
    <section id="contact" className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BRAND.blue }}>
            {contactData.titleText}
          </h2>
          <div className="w-24 h-1 mx-auto mb-4" style={{ background: BRAND.gold }} />
          <p className="max-w-2xl mx-auto text-lg" style={{ color: BRAND.black }}>
            {contactData.subtitleText}
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* ===== Office List ===== */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2" style={{ color: BRAND.blue }}>
              <Building2 className="w-6 h-6" style={{ color: BRAND.gold }} />
              Our Offices
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {topFourOffices.map((office, idx) => (
                <motion.div
                  key={`${office.country}-${office.name}-${idx}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-xl shadow-md border bg-white"
                  style={{ borderColor: BRAND.gold }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-base font-semibold flex items-center gap-2" style={{ color: BRAND.blue }}>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: BRAND.gold }} />
                      {office.name}
                    </h5>
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full"
                      style={{ border: `1px solid ${BRAND.gold}`, color: BRAND.black, background: "#fff" }}
                    >
                      {office.country}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5" style={{ color: BRAND.gold }} />
                      <p className="text-sm whitespace-pre-line" style={{ color: BRAND.black }}>
                        {office.address}
                      </p>
                    </div>

                    {office.phones?.map((phone, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Phone className="w-5 h-5" style={{ color: BRAND.gold }} />
                        <a
                          href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                          className="text-sm hover:underline"
                          style={{ color: BRAND.black }}
                        >
                          {phone}
                        </a>
                      </div>
                    ))}

                    {office.fax && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5" style={{ color: BRAND.gold }} />
                        <span className="text-sm" style={{ color: BRAND.black }}>
                          Fax: {office.fax}
                        </span>
                      </div>
                    )}

                    {office.emails?.map((email, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Mail className="w-5 h-5" style={{ color: BRAND.gold }} />
                        <a href={`mailto:${email}`} className="text-sm hover:underline" style={{ color: BRAND.black }}>
                          {email}
                        </a>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ===== Form ===== */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl shadow-xl border"
            style={{ borderColor: BRAND.gold, background: "#fff" }}
          >
            <h3 className="text-2xl font-bold mb-6" style={{ color: BRAND.blue }}>
              Send us a Message
            </h3>
            <p className="mb-6" style={{ color: BRAND.black }}>
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
              {/* FormSubmit hidden fields */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_subject" value={`New Contact Submission from ${selectedLocation}`} />
              <input type="hidden" name="Preferred_Location" value={selectedLocation} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: BRAND.black }}>
                    First Name *
                  </label>
                  <Input placeholder="Enter your first name" name="First Name" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: BRAND.black }}>
                    Last Name *
                  </label>
                  <Input placeholder="Enter your last name" name="Last Name" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: BRAND.black }}>
                    Email Address *
                  </label>
                  <Input type="email" name="Email" placeholder="Enter your email" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: BRAND.black }}>
                    Phone Number
                  </label>
                  <Input name="Phone" placeholder="Enter your phone number" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: BRAND.black }}>
                  Company/Organization
                </label>
                <Input name="Organization" placeholder="Enter your company name" />
              </div>

              {/* Preferred Office Location (Select) */}
              <div className="space-y-2 max-w-md mx-auto p-4 rounded-lg shadow" style={{ background: "#fff" }}>
                <label className="text-sm font-medium" style={{ color: BRAND.black }}>
                  Preferred Office Location
                </label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select office location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: BRAND.black }}>
                  Message *
                </label>
                <Textarea name="Message" placeholder="Tell us about your logistics needs..." required rows={5} />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  style={{
                    width: "100%",
                    background: BRAND.blue,
                    color: "#fff",
                    padding: "1.5rem 0",
                    fontSize: "1.125rem",
                    fontWeight: 605,
                    borderRadius: "1rem",
                    border: `2px solid ${BRAND.gold}`,
                  }}
                >
                  <Send className="w-5 h-5 mr-2" style={{ color: BRAND.gold }} />
                  Send Message
                </Button>
              </motion.div>

              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 p-4 rounded-xl shadow flex items-center gap-3"
                  style={{ background: "#fff", border: `1px solid ${BRAND.gold}`, color: BRAND.black }}
                >
                  <CheckCircle2 className="w-5 h-5" style={{ color: BRAND.blue }} />
                  <p className="text-sm md:text-base font-medium">
                    Your message has been sent successfully. We'll get back to you soon!
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
