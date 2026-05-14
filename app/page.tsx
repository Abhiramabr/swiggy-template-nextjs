"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState, useEffect } from 'react';
import {
  faCartShopping,
  faBell,
  faArrowLeft,
  faArrowRight,
  faStar,
  faHouse,
  faMagnifyingGlass,
  faReceipt,
  faUser,
  faBasketShopping,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

import { categories, restaurants, restaurants2 } from './data/restaurants';
import Chatbot from './components/Chatbot';

export default function Page() {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const restaurantsRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (restaurantsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = restaurantsRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  return (
    <div className="bg-swiggy-page text-swiggy-heading min-h-screen">


      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 mt-15">
        {/* "What's on your mind?" Section */}
        <section className="mb-6 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
            <h2 className="text-[24px] font-[700] leading-[1.2] text-swiggy-heading">
              What&apos;s on your mind?
            </h2>
            <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0 self-start sm:self-auto">
              <button
                onClick={() => scroll(categoriesRef, 'left')}
                aria-label="Previous"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-swiggy-control text-swiggy-brown hover:bg-swiggy-control-hover transition-colors shadow-sm"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={() => scroll(categoriesRef, 'right')}
                aria-label="Next"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-swiggy-control text-swiggy-brown hover:bg-swiggy-control-hover transition-colors shadow-sm"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>

          {/* Scrollable Container */}
          <div
            ref={categoriesRef}
            className="grid grid-rows-2 grid-flow-col md:grid-rows-1 overflow-x-auto no-scrollbar scroll-smooth gap-4 sm:gap-6 pb-3 sm:pb-4"
          >
            {categories.map((category) => (
              <div key={category.id} className="flex-shrink-0 flex flex-col items-center gap-2 sm:gap-3 group cursor-pointer w-25 md:w-32">
                <div className="w-25 h-25 md:w-32 md:h-32 rounded-full overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow relative">
                  <Image
                    className="object-cover"
                    alt={category.imgAlt}
                    src={`/images/p${category.id + 1}.png`}
                    fill
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                </div>
                <span className="text-[13px] font-[600] leading-[1.2] tracking-[0.02em] text-swiggy-heading group-hover:text-swiggy-orange-dark transition-colors whitespace-nowrap">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Section */}
        <section className="mt-6 sm:mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
            <h2 className="text-[24px] font-[700] leading-[1.2] text-swiggy-heading">
              Top restaurants near you
            </h2>
            <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0 self-start sm:self-auto">
              <button
                onClick={() => scroll(restaurantsRef, 'left')}
                aria-label="Previous"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-swiggy-control text-swiggy-brown hover:bg-swiggy-control-hover transition-colors shadow-sm"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={() => scroll(restaurantsRef, 'right')}
                aria-label="Next"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-swiggy-control text-swiggy-brown hover:bg-swiggy-control-hover transition-colors shadow-sm"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>

          <div
            ref={restaurantsRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 sm:gap-6 pb-2 no-scrollbar scroll-smooth"
          >
            {restaurants.map((restaurant, index) => (
              <Link href={`/restaurant/${restaurant.id}`} key={index} className="flex-shrink-0">
                <div className="min-w-[280px] md:min-w-[320px] lg:min-w-[350px] bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
                  <div className="relative h-48 w-full">
                    <Image
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={restaurant.alt}
                      src={`${restaurant.src}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {restaurant.badge && (
                      <div className="absolute bottom-3 left-3 bg-swiggy-orange text-white px-2 py-1 rounded text-[11px] font-[500] leading-[1.2] tracking-[0.04em] z-10">
                        {restaurant.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <div className="flex justify-between items-center mb-1 sm:mb-2">
                      <h3 className="text-[20px] font-[700] leading-[1.3] text-swiggy-heading">{restaurant.name}</h3>
                      <div className="flex items-center gap-1 bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[11px] font-[500] leading-[1.2] tracking-[0.04em]">
                        <span className="font-bold">{restaurant.rating}</span>
                        <FontAwesomeIcon icon={faStar} className="text-[12px]" />
                      </div>
                    </div>
                    <p className="text-[14px] font-[400] leading-[1.5] text-swiggy-brown">
                      {restaurant.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Custom Small Scrollbar (Swiggy Style) */}
          <div className="w-16 h-1.5 bg-swiggy-track mx-auto mt-4 rounded-full overflow-hidden hidden md:flex items-center justify-start">
            <div
              className="h-full bg-swiggy-orange rounded-full transition-all duration-150 ease-out"
              style={{
                width: '33%',
                transform: `translateX(${scrollProgress * 2}%)`
              }}
            ></div>
          </div>
        </section>


        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight mb-6 text-swiggy-ink">
              Restaurants with online food delivery in Kochi
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                <span>Sort By</span>
                <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-6 sm:gap-y-10">
            {restaurants2.map((restaurant) => (
              <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>
                <article className="group cursor-pointer transform transition-transform duration-200 hover:scale-[0.97]">
                {/* Image container */}
                <div
                  className="relative rounded-2xl overflow-hidden mb-3 shadow-sm"
                  style={{ aspectRatio: '1 / 1' }}     // square on mobile, fine on desktop too
                >
                  <Image
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  {restaurant.offer && (
                    <div className="absolute inset-0 offer-gradient flex items-end p-3 sm:p-4">
                      <span className="text-white font-black text-xs sm:text-xl tracking-tight uppercase">
                        {restaurant.offer}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card details */}
                <div className="px-2">
                  <h3 className="font-bold text-sm sm:text-lg leading-tight truncate">
                    {restaurant.name}
                  </h3>

                  {/* Rating & delivery time */}
                  <div className="flex items-center gap-1 font-semibold text-xs sm:text-base mt-1">
                    <span className="bg-green-600 text-white rounded-full p-0.5 flex items-center justify-center flex-shrink-0">
                      <FontAwesomeIcon icon={faStar} className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </span>
                    <span className="truncate">
                      {restaurant.rating} • {restaurant.deliveryTime}
                    </span>
                  </div>

                  <p className="text-gray-500 text-xs sm:text-sm truncate mt-1">
                    {restaurant.cuisines}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">{restaurant.location}</p>
                </div>
              </article>
            </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation Shell */}
      {/* <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-[0_-4px_12px_rgba(61,65,82,0.06)] rounded-t-2xl">
        <Link className="flex flex-col items-center justify-center text-orange-500 dark:text-orange-400 scale-110 transition-transform text-[11px] font-semibold" href="/">
          <FontAwesomeIcon icon={faHouse} className="mb-1 text-lg" />
          <span>Home</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full text-[11px] font-semibold" href="/search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="mb-1 text-lg" />
          <span>Search</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full text-[11px] font-semibold" href="/orders">
          <FontAwesomeIcon icon={faReceipt} className="mb-1 text-lg" />
          <span>Orders</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full text-[11px] font-semibold" href="/profile">
          <FontAwesomeIcon icon={faUser} className="mb-1 text-lg" />
          <span>Profile</span>
        </Link>
      </nav> */}

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}
