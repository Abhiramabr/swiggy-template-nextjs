"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

type AboutTab = 'Mission' | 'Vision' | 'Values';

type JourneyItem = {
  year: string;
  title: string;
  image: string;
  imageAlt: string;
};

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.15 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Animated counter that counts up from 0 when scrolled into view
const CountUp = ({ target, suffix = '', duration = 2000 }: { target: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<AboutTab>('Mission');
  const [activeJourney, setActiveJourney] = useState(1);

  const tabs: AboutTab[] = ['Mission', 'Vision', 'Values'];

  const tabContent: Record<AboutTab, string> = {
    Mission: "Our mission is to elevate the quality of life of the urban consumer by offering unparalleled convenience. Convenience is what makes us tick. It's what makes us get out of bed and say, \"Let's do this.\"",
    Vision: "Our vision is to build the most accessible and reliable platform for every consumer's daily needs, seamlessly bridging the gap between desire and delivery.",
    Values: "We believe in consumer-first thinking, operational excellence, and empowering our delivery partners and restaurant ecosystems to thrive together."
  };

  const journeyItems: JourneyItem[] = [
    {
      year: '2013',
      title: 'The idea for effortless city convenience takes shape',
      image: '/images/r1.png',
      imageAlt: 'Swiggy journey 2013 milestone'
    },
    {
      year: '2014',
      title: 'Launch of our Food Delivery business',
      image: '/images/p1.png',
      imageAlt: 'Swiggy journey 2014 milestone'
    },
    {
      year: '2015',
      title: 'Restaurant discovery and delivery coverage expands',
      image: '/images/p2.png',
      imageAlt: 'Swiggy journey 2015 milestone'
    },
    {
      year: '2016',
      title: 'Millions of orders move through growing city networks',
      image: '/images/p3.png',
      imageAlt: 'Swiggy journey 2016 milestone'
    },
    {
      year: '2017',
      title: 'Delivery partner operations scale across more markets',
      image: '/images/p4.png',
      imageAlt: 'Swiggy journey 2017 milestone'
    },
    {
      year: '2018',
      title: 'Swiggy expands into more daily convenience moments',
      image: '/images/p5.png',
      imageAlt: 'Swiggy journey 2018 milestone'
    },
    {
      year: '2019',
      title: 'New consumer experiences make ordering faster and simpler',
      image: '/images/p6.png',
      imageAlt: 'Swiggy journey 2019 milestone'
    },
    {
      year: '2020',
      title: 'Launch of Swiggy Instamart for quick commerce',
      image: '/images/p7.png',
      imageAlt: 'Swiggy journey 2020 milestone'
    },
    {
      year: '2021',
      title: 'Quick commerce grows with faster neighborhood fulfilment',
      image: '/images/p8.png',
      imageAlt: 'Swiggy journey 2021 milestone'
    },
    {
      year: '2022',
      title: 'Dineout joins the platform to make dining out easier',
      image: '/images/r2.png',
      imageAlt: 'Swiggy journey 2022 milestone'
    },
    {
      year: '2023',
      title: 'Membership benefits and offers deepen customer loyalty',
      image: '/images/r2_3.png',
      imageAlt: 'Swiggy journey 2023 milestone'
    },
    {
      year: '2024',
      title: 'IPO delivered as Swiggy enters its next chapter',
      image: '/images/swiggy-mascot.png',
      imageAlt: 'Swiggy journey 2024 milestone'
    },
    {
      year: '2025',
      title: 'The platform keeps building for everyday convenience',
      image: '/images/r3.png',
      imageAlt: 'Swiggy journey 2025 milestone'
    }
  ];

  const showPreviousJourney = () => {
    setActiveJourney((current) => (current === 0 ? journeyItems.length - 1 : current - 1));
  };

  const showNextJourney = () => {
    setActiveJourney((current) => (current === journeyItems.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="min-h-screen bg-swiggy-about font-sans relative overflow-hidden pt-20 pb-14">

      {/* Background Map Pattern (Simulated with a subtle gradient and SVG pattern) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--color-swiggy-ink) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Decorative sweeping lines (Simulated) */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full border border-swiggy-accent-lilac opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-40 right-0 w-[1000px] h-[1000px] rounded-full border border-swiggy-accent-lilac opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/4"></div>

      {/* Tiny stars */}
      <div className="absolute top-20 left-[20%] text-swiggy-accent-lilac opacity-30 text-xs animate-pulse">✦</div>
      <div className="absolute top-60 right-[15%] text-swiggy-accent-lilac opacity-30 text-xs animate-pulse">✦</div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">

        {/* Header Text */}
        <div className="flex flex-col items-center text-center mb-10 animate-fade-in-up">
          <h1 className="text-[36px] sm:text-[42px] font-extrabold text-swiggy-heading mb-6 tracking-tight">
            ABOUT US
          </h1>
          <p className="max-w-[900px] text-[15px] sm:text-[17px] text-swiggy-muted leading-relaxed">
            Swiggy is a new-age consumer-first organization offering an easy-to-use convenience platform, accessible through a unified app.
          </p>
        </div>

        {/* Map Pins Interactive Area */}
        <FadeInSection delay={200}>
        <div className="relative w-full max-w-[800px] h-[360px] sm:h-[410px] mx-auto mt-6">

          {/* Top Left Pin - Food */}
          <div className="absolute left-[20%] sm:left-[25%] top-[5%] sm:top-[10%] animate-float -translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="w-[72px] h-[72px] bg-swiggy-pin-bg rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center border-4 border-white overflow-hidden relative">
                <span className="text-3xl drop-shadow-sm">🍔</span>
              </div>
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-white relative -top-1 drop-shadow-sm z-10"></div>
              <div className="w-2.5 h-2.5 bg-swiggy-orange rounded-full mt-1"></div>
              <span className="mt-2 font-extrabold text-swiggy-body-soft text-[15px]">Food</span>
            </div>
          </div>

          {/* Top Right Pin - Instamart */}
          <div className="absolute right-[20%] sm:right-[25%] top-[5%] sm:top-[10%] animate-float animation-delay-500 translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="w-[72px] h-[72px] bg-swiggy-pin-bg rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center border-4 border-white overflow-hidden relative">
                <span className="text-3xl drop-shadow-sm">🛍️</span>
              </div>
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-white relative -top-1 drop-shadow-sm z-10"></div>
              <div className="w-2.5 h-2.5 bg-swiggy-orange rounded-full mt-1"></div>
              <span className="mt-2 font-extrabold text-swiggy-body-soft text-[15px]">Instamart</span>
            </div>
          </div>

          {/* Center Big Orange Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-float-slow">
            <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-swiggy-orange rounded-[30px] sm:rounded-[36px] rounded-tr-[8px] rounded-bl-[8px] flex items-center justify-center transform rotate-45 shadow-[0_12px_24px_rgba(252,128,25,0.3)] border-4 border-white">
              <span className="text-white font-extrabold text-[50px] sm:text-[60px] -rotate-45 leading-none mt-1 mr-1">S</span>
            </div>
            {/* Large Pin Tail */}
            <div className="absolute -bottom-[28px] sm:-bottom-[32px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] sm:border-l-[20px] border-r-[16px] sm:border-r-[20px] border-t-[28px] sm:border-t-[34px] border-l-transparent border-r-transparent border-t-swiggy-orange filter drop-shadow-md z-[-1]"></div>
          </div>

          {/* Bottom Left Pin - Dineout */}
          <div className="absolute left-[10%] sm:left-[15%] bottom-[5%] sm:bottom-[10%] animate-float animation-delay-200 -translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="w-[72px] h-[72px] bg-swiggy-pin-bg rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center border-4 border-white overflow-hidden relative">
                <span className="text-3xl drop-shadow-sm">🍷</span>
              </div>
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-white relative -top-1 drop-shadow-sm z-10"></div>
              <div className="w-2.5 h-2.5 bg-swiggy-orange rounded-full mt-1"></div>
              <span className="mt-2 font-extrabold text-swiggy-body-soft text-[15px]">Dineout</span>
            </div>
          </div>

          {/* Bottom Right Pin - Scenes */}
          <div className="absolute right-[10%] sm:right-[15%] bottom-[5%] sm:bottom-[10%] animate-float animation-delay-700 translate-x-1/2">
            <div className="flex flex-col items-center">
              <div className="w-[72px] h-[72px] bg-swiggy-pin-bg rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center border-4 border-white overflow-hidden relative">
                <span className="text-3xl drop-shadow-sm">🎤</span>
              </div>
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-white relative -top-1 drop-shadow-sm z-10"></div>
              <div className="w-2.5 h-2.5 bg-swiggy-orange rounded-full mt-1"></div>
              <span className="mt-2 font-extrabold text-swiggy-body-soft text-[15px]">Scenes</span>
            </div>
          </div>

        </div>
        </FadeInSection>

        {/* IPO Delivered Section */}
        <FadeInSection delay={100}>
        <div className="w-full mt-16 mb-6 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="h-[2px] w-6 sm:w-8 bg-swiggy-orange"></div>
            <h2 className="text-[22px] sm:text-[28px] font-extrabold text-swiggy-body-soft tracking-tight uppercase">
              IPO Delivered - November 2024
            </h2>
            <div className="h-[2px] w-6 sm:w-8 bg-swiggy-orange"></div>
          </div>

          <div className="rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] bg-black aspect-video relative max-w-[800px] mx-auto group">
            <video
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-full object-cover"
              poster="/images/ipo-poster.jpg"
            >
              <source src="/videos/ipo-bell.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        </FadeInSection>

        {/* Get To Know Us Section */}
        <FadeInSection delay={100}>
        <div className="w-full mt-16 mb-6 pb-12 border-b border-gray-200">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            <div className="h-[2px] w-8 sm:w-16 bg-swiggy-orange"></div>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-swiggy-body-soft tracking-tight uppercase">
              GET TO KNOW US
            </h2>
            <div className="h-[2px] w-8 sm:w-16 bg-swiggy-orange"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16 max-w-[1000px] mx-auto px-4 lg:px-0">
            {/* Left Col - Tabs */}
            <div className="w-full lg:w-1/4 flex flex-col">
              {tabs.map((tab, index) => (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-5 cursor-pointer flex items-center gap-3 ${index !== 2 ? 'border-b border-gray-100' : ''} group`}
                >
                  <span className={`text-[18px] sm:text-[22px] transition-colors tracking-tight ${activeTab === tab ? 'text-swiggy-orange font-bold' : 'text-gray-400 font-medium group-hover:text-gray-600'}`}>
                    {tab}
                  </span>
                  {activeTab === tab && <span className="text-swiggy-orange text-xl sm:text-2xl font-light">→</span>}
                </div>
              ))}
            </div>

            {/* Middle Col - Content */}
            <div className="w-full lg:w-[45%] pt-2 lg:pt-5">
              <p className="text-swiggy-muted text-[15px] sm:text-[17px] leading-[1.8] font-medium pr-4">
                {tabContent[activeTab]}
              </p>
            </div>

            {/* Right Col - Image */}
            <div className="w-full lg:w-1/3">
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-sm group cursor-pointer">
                <Image
                  src="/images/delivery-partner.jpg"
                  alt="Swiggy Delivery Partner"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
        </FadeInSection>

        {/* Industry Pioneer Section */}
        <FadeInSection delay={100}>
        <div className="w-full mt-16 pb-12 border-b border-gray-200">
          {/* Section Title */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-9">
            <div className="h-[2px] w-8 sm:w-16 bg-swiggy-orange"></div>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-swiggy-body-soft tracking-tight uppercase">
              INDUSTRY PIONEER
            </h2>
            <div className="h-[2px] w-8 sm:w-16 bg-swiggy-orange"></div>
          </div>

          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-[1000px] mx-auto px-4 lg:px-0 mb-10">
            {/* Left - Text */}
            <div className="w-full lg:w-1/2">
              <p className="text-swiggy-muted text-[15px] sm:text-[17px] leading-[1.9] font-medium">
                Being among the first few entrants, Swiggy has successfully pioneered the hyperlocal commerce industry in India, launching Food Delivery in 2014 and Quick Commerce in 2020. Due to the pioneering status of Swiggy, it is well-recognised as a leader in innovation in hyperlocal commerce and a category-defining brand; trusted, intuitive and deeply embedded in the daily routines of millions of Indians.
              </p>
            </div>

            {/* Right - 3D Mascot Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-[280px] sm:w-[360px] aspect-square bg-white rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.07)] overflow-hidden flex items-center justify-center p-4">
                <Image
                  src="/images/swiggy-mascot.png"
                  alt="Swiggy Delivery Mascot"
                  fill
                  sizes="(max-width: 1024px) 280px, 360px"
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 max-w-[1000px] mx-auto px-4 lg:px-0">
            {[
              { target: 3, suffix: ' Billion+', label: 'orders delivered' },
              { target: 238, suffix: 'k+', label: 'restaurant partners' },
              { target: 520, suffix: 'k+', label: 'delivery partners' },
              { target: 718, suffix: '+', label: 'cities in India' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`py-8 px-4 ${index < 3 ? 'lg:border-r border-gray-200' : ''} ${index < 2 ? 'border-b lg:border-b-0 border-gray-200' : ''}`}
              >
                <div className="text-[28px] sm:text-[36px] font-extrabold text-swiggy-stat-green leading-none mb-2">
                  <CountUp target={stat.target} suffix={stat.suffix} duration={1800} />
                </div>
                <p className="text-swiggy-muted text-[13px] sm:text-[15px] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        </FadeInSection>

        {/* Swiggy Journey Section */}
        <FadeInSection delay={100}>
        <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen mt-14 bg-swiggy-journey text-white overflow-hidden py-10 sm:py-12 lg:py-14">
          <div className="absolute inset-x-0 top-[40%] h-px bg-swiggy-journey-line"></div>

          <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-8">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-9 sm:mb-11">
              <div className="h-px w-9 sm:w-14 bg-swiggy-journey-divider"></div>
              <h2 className="text-[22px] sm:text-[30px] lg:text-[36px] font-black text-swiggy-orange tracking-tight uppercase text-center">
                THE SWIGGY JOURNEY
              </h2>
              <div className="h-px w-9 sm:w-14 bg-swiggy-journey-divider"></div>
            </div>

            <div className="relative max-w-[780px] mx-auto mb-1">
              <div className="flex items-center justify-between px-3 sm:px-8 lg:px-10">
                <button
                  type="button"
                  onClick={showPreviousJourney}
                  aria-label="Show previous journey milestone"
                  className="journey-nav-button"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <div className="text-[52px] sm:text-[76px] lg:text-[92px] leading-none font-black italic text-swiggy-journey-year select-none">
                  {journeyItems[activeJourney].year}
                </div>

                <button
                  type="button"
                  onClick={showNextJourney}
                  aria-label="Show next journey milestone"
                  className="journey-nav-button"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>

            <div className="relative h-[230px] sm:h-[270px] lg:h-[292px] mt-7">
              <div
                className="journey-track absolute left-1/2 top-0 flex h-full items-center transition-transform duration-500 ease-out mt-5"
                style={{
                  transform: `translateX(calc(-1 * ${activeJourney} * var(--journey-step) - (var(--journey-card-width) / 2)))`
                }}
              >
                {journeyItems.map((item, index) => {
                  const distance = Math.abs(index - activeJourney);
                  const isActive = index === activeJourney;

                  return (
                    <article
                      key={`${item.year}-${item.title}`}
                      className={`journey-card ${isActive ? 'journey-card-active' : 'journey-card-muted'}`}
                      aria-hidden={!isActive}
                      style={{
                        opacity: distance > 1 ? 0 : undefined,
                        pointerEvents: isActive ? 'auto' : 'none'
                      }}
                    >
                      <div className="journey-card-copy flex min-w-0 flex-1 items-center gap-3 sm:gap-5">
                        <span className="journey-spark" aria-hidden="true"></span>
                        <p className="text-[15px] sm:text-[20px] lg:text-[22px] font-bold leading-snug tracking-tight text-white">
                          {item.title}
                        </p>
                      </div>

                      <div className="journey-card-media relative h-[72px] w-[72px] shrink-0 sm:h-[116px] sm:w-[116px] lg:h-[138px] lg:w-[138px]">
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 640px) 72px, (max-width: 1024px) 116px, 138px"
                          className="rounded-xl object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.35)]"
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-2 px-6" aria-label="Journey milestone controls">
              {journeyItems.map((item, index) => (
                <button
                  type="button"
                  key={item.year}
                  onClick={() => setActiveJourney(index)}
                  aria-label={`Show ${item.year} milestone`}
                  aria-current={index === activeJourney ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeJourney
                      ? 'w-7 bg-white'
                      : 'w-2 bg-swiggy-journey-dot hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
        </FadeInSection>

      </div>
    </div>
  );
}
