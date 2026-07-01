import { useState, useEffect } from "react";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Briefcase, Users, Award, TrendingUp } from 'lucide-react';

interface JobOpening {
  id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  department: string;
}

const Career = () => {
  const [careerData, setCareerData] = useState({
    heroTitle: "Join Our Global Team",
    heroSubtitle: "Build your career with a leading logistics company that operates across Asia Pacific. We're always looking for talented individuals to join our growing family.",
    jobOpenings: [] as JobOpening[]
  });

  useEffect(() => {
    const saved = localStorage.getItem("admin_careers");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) {
          setCareerData({
            heroTitle: parsed.heroTitle || "Join Our Global Team",
            heroSubtitle: parsed.heroSubtitle || "",
            jobOpenings: Array.isArray(parsed.jobOpenings) ? parsed.jobOpenings : []
          });
        }
      } catch (e) {
        console.error("Failed to parse career data:", e);
      }
    }
  }, []);

  const benefits = [
    {
      icon: <Users className="w-8 h-8 text-gc-gold" />,
      title: "Great Team Culture",
      description: "Work with passionate professionals in a collaborative environment"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-gc-gold" />,
      title: "Career Growth",
      description: "Opportunities for professional development and career advancement"
    },
    {
      icon: <Award className="w-8 h-8 text-gc-gold" />,
      title: "Competitive Benefits",
      description: "Comprehensive health coverage, performance bonuses, and more"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{careerData.heroTitle}</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              {careerData.heroSubtitle}
            </p>
            <Button 
              className="bg-gc-gold hover:bg-gc-bronze text-white px-8 py-3 text-lg"
              onClick={() => {
                const element = document.getElementById("open-positions");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              View Open Positions
            </Button>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Us</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join a company that values innovation, growth, and employee well-being
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center p-6 bg-white border border-gray-100 shadow-sm">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section id="open-positions" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Openings</h2>
              <p className="text-lg text-gray-600">
                Explore exciting career opportunities across our global operations
              </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto">
              {careerData.jobOpenings.map((job) => (
                <Card key={job.id} className="p-6 hover:shadow-md transition-shadow bg-white border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <span className="text-[10px] font-bold text-gc-gold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100 uppercase tracking-wider font-mono">
                          {job.department}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 md:mt-0">
                      <a href="mailto:contact@dxb.amassfreight.com">
                        <Button className="bg-gc-gold hover:bg-gc-bronze text-white px-6 w-full md:w-auto">
                          Apply Now
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              ))}

              {careerData.jobOpenings.length === 0 && (
                <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl max-w-lg mx-auto flex flex-col items-center justify-center">
                  <Briefcase className="w-12 h-12 text-gray-300 mb-2" />
                  <p className="text-gray-500 font-semibold">No active job openings at this time.</p>
                  <p className="text-gray-400 text-xs mt-1">Please check back later or send us your speculative resume.</p>
                </div>
              )}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg mb-6">Don't see the right position? We'd still love to hear from you!</p>
              <a href="mailto:contact@dxb.amassfreight.com">
                <Button variant="outline" className="border-gc-gold text-gc-gold hover:bg-gc-gold hover:text-white px-8 py-3">
                  Send Your Resume
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-350">
              Join our team and be part of a company that's shaping the future of logistics in Asia Pacific.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:contact@dxb.amassfreight.com">
                <Button className="bg-gc-gold hover:bg-gc-bronze text-white px-8 py-3 w-full sm:w-auto">
                  Contact HR Team
                </Button>
              </a>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 w-full sm:w-auto"
                onClick={() => {
                  const element = document.getElementById("open-positions");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Career;
