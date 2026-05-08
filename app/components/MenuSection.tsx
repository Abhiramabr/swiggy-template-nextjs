"use client";

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronDown, faXmark, faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function MenuSection({ menu }: { menu: any[] }) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [crust, setCrust] = useState('Pan');
  const [size, setSize] = useState('Personal');

  const crustOptions = ['Pan', 'Ultimate Cheese', 'Stuffed Crust - Maxx', 'Thin n Crispy'];
  const sizeOptions = [
    { label: 'Personal', price: 269 },
    { label: 'Medium', price: 499 }
  ];

  const { cart, addToCart, incrementQuantity, decrementQuantity, getItemQuantity } = useCart();

  const openModal = (item: any) => {
    setSelectedItem(item);
    setStep(1);
    setCrust('Pan');
    setSize('Personal');
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      addToCart(selectedItem, crust, size);
      closeModal();
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6 cursor-pointer">
          <h2 className="text-xl font-extrabold tracking-tight">Recommended ({menu.length})</h2>
          <FontAwesomeIcon icon={faChevronDown} className="text-gray-800" />
        </div>

        <div className="flex flex-col">
          {menu.map((item: any, index: number) => (
            <div key={item.id} className={`flex justify-between py-6 sm:py-8 ${index !== menu.length - 1 ? 'border-b border-gray-200' : ''}`}>
              {/* Left content */}
              <div className="w-[55%] sm:w-[65%] pr-2 sm:pr-4">
                <div className="flex items-center gap-2 mb-1">
                  {/* Veg/Nonveg icon */}
                  {item.isVeg ? (
                    <div className="w-4 h-4 border border-green-600 rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                  ) : (
                    <div className="w-4 h-4 border border-red-600 rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                  )}

                  {item.isBestseller && (
                    <span className="text-swiggy-danger text-xs font-bold flex items-center gap-1">
                      <FontAwesomeIcon icon={faStar} className="text-[10px]" /> Bestseller
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight mb-1">{item.name}</h3>
                <div className="text-gray-800 font-bold text-sm sm:text-base mb-2">₹{item.price}</div>

                {item.rating && (
                  <div className="flex items-center gap-1 text-green-700 text-xs font-bold mb-3">
                    <FontAwesomeIcon icon={faStar} className="text-[10px]" />
                    <span>{item.rating}</span>
                    <span className="text-gray-500 font-semibold">({item.ratingCount})</span>
                  </div>
                )}

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>

              {/* Right image & add button */}
              <div className="w-[120px] sm:w-[150px] flex flex-col items-center relative">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 120px, 150px"
                  />
                </div>

                {/* Floating Add Button */}
                <div className="absolute -bottom-4 w-full flex justify-center">
                  {getItemQuantity(item.id) > 0 ? (
                    <div className="bg-white text-green-600 font-extrabold text-sm sm:text-lg px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-between w-[100px] sm:w-[130px] z-10">
                      <button className="text-gray-400 hover:text-gray-600 w-1/3 text-center" onClick={() => decrementQuantity(item.id)}>-</button>
                      <span className="text-green-600 w-1/3 text-center">{getItemQuantity(item.id)}</span>
                      <button className="text-green-600 hover:text-green-800 w-1/3 text-center" onClick={() => incrementQuantity(item.id)}>+</button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => openModal(item)}
                      className="bg-white text-green-600 font-extrabold text-sm sm:text-lg px-6 sm:px-10 py-1.5 sm:py-2 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-gray-100 uppercase tracking-tight hover:bg-gray-50 active:scale-95 transition-transform z-10 flex items-center justify-center"
                    >
                      ADD
                    </button>
                  )}
                </div>

                <span className="text-gray-400 text-[9px] sm:text-[10px] mt-6 tracking-tight">Customisable</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customise Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-swiggy-panel rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 bg-swiggy-panel border-b border-gray-200 relative shrink-0">
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              
              <div className="text-xs font-semibold text-gray-500 mb-1">
                {selectedItem.name} • ₹169 - ₹479
              </div>
              <h2 className="text-xl font-extrabold text-gray-800">Customise as per your taste</h2>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto bg-swiggy-panel p-6">
              
              {/* Step 1: Crust */}
              {step === 1 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-4">Choose your Crust</h3>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    {crustOptions.map((option, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setCrust(option)}
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          {/* Veg Icon */}
                          <div className="w-4 h-4 border border-green-600 rounded-sm flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="font-semibold text-gray-700">{option}</span>
                        </div>
                        {/* Radio Button */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${crust === option ? 'border-swiggy-orange' : 'border-gray-300'}`}>
                          {crust === option && <div className="w-2.5 h-2.5 rounded-full bg-swiggy-orange"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Size */}
              {step === 2 && (
                <div>
                  {/* Step 1 Summary */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border border-green-600 rounded-sm flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <span className="font-semibold text-gray-700">{crust}</span>
                    </div>
                    <button 
                      onClick={() => setStep(1)}
                      className="text-swiggy-orange font-bold text-sm hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  <h3 className="font-bold text-gray-800 mb-4">Choose Size</h3>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    {sizeOptions.map((option, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setSize(option.label)}
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 border border-green-600 rounded-sm flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="font-semibold text-gray-700">{option.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 font-medium text-sm">₹{option.price}</span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${size === option.label ? 'border-swiggy-orange' : 'border-gray-300'}`}>
                            {size === option.label && <div className="w-2.5 h-2.5 rounded-full bg-swiggy-orange"></div>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-gray-200 shrink-0 flex items-center justify-between rounded-b-3xl">
              <span className="font-extrabold text-gray-800 ml-2">Step {step}/2</span>
              <button 
                onClick={handleContinue}
                className="bg-swiggy-offer text-white font-bold py-3 px-12 rounded-xl shadow-md hover:bg-swiggy-offer-dark active:scale-95 transition-transform"
              >
                Continue
              </button>
            </div>
            
          </div>
        </div>
      )}
      {/* Sticky Cart Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
          <Link href="/cart" className="bg-swiggy-green text-white w-full max-w-4xl px-4 py-3 sm:py-4 flex justify-between items-center shadow-[0_-4px_12px_rgba(0,0,0,0.1)] cursor-pointer group hover:bg-swiggy-green-hover transition-colors">
            <span className="font-bold text-sm sm:text-base">
              {cart.reduce((total, item) => total + item.quantity, 0)} item{cart.reduce((total, item) => total + item.quantity, 0) > 1 ? 's' : ''} added
            </span>
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base tracking-tight group-hover:scale-105 transition-transform">
              VIEW CART <FontAwesomeIcon icon={faBasketShopping} />
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
