import ScrollAnimation from "./ScrollAnimation";
import { Settings, Globe, Heart, Truck } from "lucide-react";
const WhatMakesUsUniqueSection = () => {
  const features = [{
    icon: Settings,
    title: "Bespoke Logistics Solutions",
    description: "Efficient, cost-effective and innovative bespoke global logistics solutions with a wide range of services comprising of end-to-end logistics packages.",
    delay: 0,
    color: "amass-blue"
  }, {
    icon: Globe,
    title: "Overseas Network",
    description: "Through our extensive network of international representatives, we are able to offer you a comprehensive range of high-quality logistical freight services.",
    delay: 100,
    color: "amass-red"
  }, {
    icon: Heart,
    title: "Service Driven",
    description: "We provide the highest quality of service and is widely recognized as the most customer-driven logistics company.",
    delay: 200,
    color: "amass-blue"
  }, {
    icon: Truck,
    title: "Built To Deliver",
    description: "We provide the most reliable & cost effective logistics solutions thereby creating a long-term partnership with our clients.",
    delay: 300,
    color: "amass-red"
  }];
  return <section className="py-20 bg-blue-800 ">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollAnimation className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            What Makes Us Unique?
          </h2>
          <div className="w-20 h-1 bg-amass-blue mx-auto"></div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => <ScrollAnimation key={index} delay={feature.delay}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center">
                <div className={`p-4 bg-${feature.color}/10 rounded-full mb-6 mx-auto w-fit`}>
                  <feature.icon className={`w-10 h-10 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </ScrollAnimation>)}
        </div>
      </div>
    </section>;
};
export default WhatMakesUsUniqueSection;