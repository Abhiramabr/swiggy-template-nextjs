"use client";

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState('Partner Onboarding');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const helpCategories = [
    "Partner Onboarding",
    "Legal",
    "FAQs",
    "Instamart Onboarding",
    "IRCTC FAQ"
  ];

  const partnerOnboardingFaqs = [
    { question: "I want to partner my restaurant with Swiggy", answer: "Partnering with us is easy! Just register on our partner portal and fill in your details. Our team will get back to you within 24-48 hours." },
    { question: "What are the mandatory documents needed to list my restaurant on Swiggy?", answer: "You will need a valid FSSAI license, PAN card, GST certificate, bank account details, and a menu with pricing." },
    { question: "I want to opt-out from Google reserve", answer: "To opt-out from Google reserve, please contact our partner support team through the partner app or dashboard." },
    { question: "After I submit all documents, how long will it take for my restaurant to go live on Swiggy?", answer: "It typically takes 7-10 working days after document verification for your restaurant to go live." },
    { question: "What is this one time Onboarding fees? Do I have to pay for it while registering?", answer: "There is a nominal one-time onboarding fee to cover the cost of setup, training, and tablet provision (if applicable). It is typically deducted from your first few payouts." },
    { question: "Who should I contact if I need help & support in getting onboarded?", answer: "You can reach out to our partner support helpline or email us at partnersuport@swiggy.in." },
    { question: "How much commission will I be charged by Swiggy?", answer: "Commission rates vary depending on your location, category, and agreement type. This will be discussed during the onboarding process." },
    { question: "I don't have an FSSAI licence for my restaurant. Can it still be onboarded?", answer: "No, a valid FSSAI license is mandatory by law for any food business operator to be onboarded on our platform." },
  ];

  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  return (
    <div className="min-h-screen bg-swiggy-blue font-sans pt-24 sm:pt-28 pb-8 sm:pb-12">
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4">
        
        {/* Header Text */}
        <div className="text-white mb-5 sm:mb-8 px-1">
          <h1 className="text-[26px] sm:text-3xl font-extrabold mb-1 tracking-tight">Help & Support</h1>
          <p className="text-[14px] sm:text-[15px] opacity-90">Let&apos;s take a step ahead and help you better.</p>
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row md:min-h-[600px]">
          
          {/* Left Sidebar Tabs */}
          <div className="w-full md:w-[280px] bg-swiggy-help-panel shrink-0 md:py-6">
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible no-scrollbar border-b border-swiggy-border md:border-b-0">
              {helpCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveTab(category);
                    setExpandedFaq(null);
                  }}
                  className={`shrink-0 md:shrink py-4 md:py-6 px-5 md:px-8 text-left text-[14px] md:text-[15px] font-semibold transition-colors whitespace-nowrap md:whitespace-normal border-b-2 md:border-b-0 ${
                    activeTab === category 
                      ? 'bg-white text-swiggy-body-soft border-swiggy-orange' 
                      : 'text-swiggy-muted border-transparent hover:text-swiggy-body-soft'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-5 sm:p-7 lg:p-10 bg-white min-w-0">
            <h2 className="text-xl sm:text-2xl font-extrabold text-swiggy-body-soft mb-3 sm:mb-6">
              {activeTab}
            </h2>

            {/* Accordion List */}
            <div className="flex flex-col">
              {activeTab === 'Partner Onboarding' ? (
                partnerOnboardingFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full py-4 sm:py-6 flex items-start sm:items-center justify-between gap-4 text-left focus:outline-none group hover:text-swiggy-orange transition-colors"
                    >
                      <span className={`text-[14px] sm:text-[15px] leading-relaxed ${expandedFaq === index ? 'text-swiggy-orange font-medium' : 'text-swiggy-body-soft group-hover:text-swiggy-orange'}`}>
                        {faq.question}
                      </span>
                      <FontAwesomeIcon 
                        icon={expandedFaq === index ? faChevronUp : faChevronDown} 
                        className={`text-sm mt-1 sm:mt-0 shrink-0 transition-transform ${expandedFaq === index ? 'text-swiggy-orange' : 'text-gray-400 group-hover:text-swiggy-orange'}`} 
                      />
                    </button>
                    
                    {/* Accordion Content */}
                    {expandedFaq === index && (
                      <div className="pb-5 sm:pb-6 sm:pr-8 text-swiggy-muted text-[13px] sm:text-[14px] leading-relaxed animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-8 px-4 text-gray-500 text-center border-2 border-dashed border-gray-200 rounded-lg text-sm sm:text-base">
                  <p>Content for {activeTab} is currently being updated.</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
