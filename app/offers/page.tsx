"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faChevronDown, 
  faSliders,
  faUtensils
} from '@fortawesome/free-solid-svg-icons';

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState<'order' | 'dineout'>('dineout');

  const offersRestaurants = [
    {
      id: 1,
      name: 'Latest Recipe',
      rating: 4.3,
      cuisines: 'Chinese • North Indian',
      price: '₹2000 for two',
      location: 'Le Meridien, Maradu, Kochi',
      distance: '10.8 km',
      tags: ['Table booking', 'Buffet'],
      mainOffer: 'Flat 50% off on pre-booking',
      moreOffers: '+ 3 more',
      subOffer: 'Up to 10% off with bank offers',
      image: '/images/r1.png' // Ensure these images exist or fallback
    },
    {
      id: 2,
      name: 'The Square - Novotel',
      rating: 4.5,
      cuisines: 'Continental • North Indian',
      price: '₹2000 for two',
      location: 'Novotel Kochi Infopark, Kakkanad, Kochi',
      distance: '6.9 km',
      tags: ['Table booking', 'Buffet'],
      mainOffer: 'Flat 50% off on pre-booking',
      moreOffers: '+ 3 more',
      subOffer: 'Up to 10% off with bank offers',
      image: '/images/r2.png'
    },
    {
      id: 3,
      name: 'The Eatery',
      rating: 4.4,
      cuisines: 'North Indian • Asian',
      price: '₹2000 for two',
      location: 'Four Points By Sheraton Kochi Infopark,...',
      distance: '7.4 km',
      tags: ['Free drink', 'Table booking', 'Buffet'],
      mainOffer: 'Flat 50% off on pre-booking',
      moreOffers: '+ 3 more',
      subOffer: 'Up to 10% off with bank offers',
      image: '/images/r3.png'
    }
  ];

  const filters = ['Sort By', 'Book a table', 'Within 5km', 'Rating 4+', 'Pure Veg', 'Serves Alcohol'];

  return (
    <div className="min-h-screen bg-white font-sans text-swiggy-body pt-24 pb-12">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Hero Banner */}
        <div className="relative w-full h-[250px] sm:h-[300px] rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-swiggy-hero-start to-swiggy-hero-end flex items-end shadow-lg">
          {/* The actual background image */}
          <div className="absolute inset-0 opacity-100 bg-[url('/images/offer_banner.png')] bg-cover bg-center"></div>
          
          {/* Subtle gradient overlay to ensure text is always readable over the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute top-6 left-6 flex items-center gap-2">
            
            
          </div>

          <div className="relative z-10 p-8 sm:p-12 w-full max-w-2xl">
            <h1 className="text-white text-3xl sm:text-4xl font-extrabold font-serif leading-tight">
              Restaurants With Great Offers<br/>Near Me
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          <button 
            onClick={() => setActiveTab('order')}
            className={`pb-4 text-lg font-bold transition-colors ${activeTab === 'order' ? 'text-swiggy-body border-b-2 border-swiggy-orange' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Order Online
          </button>
          <button 
            onClick={() => setActiveTab('dineout')}
            className={`pb-4 text-lg font-bold transition-colors ${activeTab === 'dineout' ? 'text-swiggy-body border-b-2 border-swiggy-orange' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Dineout
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 mb-8">
          <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors shrink-0 bg-swiggy-panel">
            <div className="w-4 h-4 rounded-full bg-swiggy-orange text-white flex items-center justify-center text-[10px] font-bold">1</div>
            <span className="text-sm font-bold text-swiggy-body-soft">Filter</span>
            <FontAwesomeIcon icon={faSliders} className="text-swiggy-body-soft text-xs ml-1" />
          </button>

          {filters.map((filter, idx) => (
            <button key={idx} className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50 transition-colors shrink-0">
              <span className="text-sm font-semibold text-swiggy-body-soft">{filter}</span>
              {filter === 'Sort By' && <FontAwesomeIcon icon={faChevronDown} className="text-gray-500 text-xs ml-1" />}
            </button>
          ))}
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offersRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group cursor-pointer bg-white shadow-sm">
              
              {/* Image & Header */}
              <div className="relative h-[200px] w-full bg-gray-200 overflow-hidden">
                <Image 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <h3 className="text-white text-xl font-extrabold tracking-tight truncate max-w-[75%]">{restaurant.name}</h3>
                  <div className="flex items-center gap-1 bg-green-700/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-sm font-bold shadow-sm">
                    <FontAwesomeIcon icon={faStar} className="text-[10px]" />
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                {/* Details Row 1 */}
                <div className="flex justify-between text-sm text-swiggy-body-soft font-medium mb-1">
                  <span className="truncate pr-2">{restaurant.cuisines}</span>
                  <span className="shrink-0 font-bold">{restaurant.price}</span>
                </div>
                
                {/* Details Row 2 */}
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span className="truncate pr-2">{restaurant.location}</span>
                  <span className="shrink-0">{restaurant.distance}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {restaurant.tags.map((tag, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 border border-gray-200 rounded px-2 py-1 text-xs text-gray-600 font-medium bg-gray-50/50">
                      <span className="text-[10px] text-gray-400">☑</span>
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Spacer to push offers to bottom if tags take less space */}
                <div className="mt-auto"></div>

                {/* Offers */}
                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="bg-swiggy-offer text-white rounded-md px-3 py-2 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                      <span className="bg-white text-swiggy-offer rounded-full w-4 h-4 flex items-center justify-center text-[10px]">%</span>
                      {restaurant.mainOffer}
                    </div>
                    <span className="font-bold text-xs">{restaurant.moreOffers}</span>
                  </div>
                  
                  <div className="bg-swiggy-offer-bg text-swiggy-offer rounded-md px-3 py-2 font-bold text-xs sm:text-sm border border-swiggy-offer-border">
                    {restaurant.subOffer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
