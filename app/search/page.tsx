import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchPage() {
  const cuisines = [
    { name: 'Pizzas', image: '/images/p1.png' },
    { name: 'Rolls', image: '/images/p2.png' },
    { name: 'Burger', image: '/images/p3.png' },
    { name: 'Tea', image: '/images/p4.png' },
    { name: 'Chinese', image: '/images/p5.png' },
    { name: 'Cake', image: '/images/p6.png' },
    { name: 'Dessert', image: '/images/p7.png' },
    { name: 'North Indian', image: '/images/p8.png' },
    { name: 'South Indian', image: '/images/p9.png' },
    { name: 'Sandwich', image: '/images/p1.png' },
    { name: 'Ice Cream', image: '/images/p2.png' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-swiggy-body pt-28 pb-12">
      <div className="max-w-[860px] mx-auto px-4">
        
        {/* Search Input */}
        <div className="relative mb-12 border border-gray-300 rounded shadow-sm hover:shadow transition-shadow">
          <input
            type="text"
            placeholder="Search for restaurants and food"
            className="w-full py-3.5 px-4 text-swiggy-body font-medium text-[15px] outline-none rounded pr-12 placeholder-gray-500"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
          </button>
        </div>

        {/* Popular Cuisines */}
        <div className="pl-2">
          <h2 className="text-[22px] font-extrabold text-swiggy-body-soft mb-6 tracking-tight">Popular Cuisines</h2>
          
          {/* Scrollable Container */}
          <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-6 no-scrollbar">
            {cuisines.map((cuisine, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 shrink-0 cursor-pointer w-[76px] sm:w-[90px] group">
                <div className="w-[76px] h-[76px] sm:w-[90px] sm:h-[90px] relative rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <Image 
                    src={cuisine.image} 
                    alt={cuisine.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <span className="text-[13px] sm:text-sm font-semibold text-swiggy-muted text-center leading-tight group-hover:text-swiggy-body-soft transition-colors">
                  {cuisine.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
