import React from 'react';
import { FiSearch, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    { 
      number: '1', 
      title: 'Search', 
      description: 'Find workers by skill, location, or browse categories',
      icon: FiSearch
    },
    { 
      number: '2', 
      title: 'Book', 
      description: 'Choose your preferred worker and schedule the service',
      icon: FiCalendar
    },
    { 
      number: '3', 
      title: 'Get Service', 
      description: 'Worker arrives and completes the job professionally',
      icon: FiCheckCircle
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">How It Works</h2>
          <p className="text-gray-600">Three simple steps to get your service</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <div className="flex justify-center mb-4">
                  <Icon className="text-blue-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;