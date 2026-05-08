"use client";

import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCrosshairs } from '@fortawesome/free-solid-svg-icons';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-full sm:w-[500px] bg-white z-[101] transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex-1 p-8 md:p-10 flex flex-col">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="mb-8 text-gray-500 hover:text-gray-800 transition-colors self-start"
          >
            <FontAwesomeIcon icon={faXmark} className="text-2xl" />
          </button>

          {/* Search Input */}
          <div className="relative border border-gray-300 bg-white group focus-within:border-swiggy-body transition-colors shadow-sm mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <input 
              type="text" 
              className="w-full px-5 py-4 text-[15px] font-medium text-swiggy-body bg-transparent outline-none placeholder:text-swiggy-subtle"
              placeholder="Search for area, street name.."
              autoFocus={isOpen}
            />
          </div>

          {/* Current Location Box */}
          <div className="border border-gray-200 p-5 flex items-start gap-4 cursor-pointer hover:shadow-md transition-shadow group bg-white shadow-sm">
            <FontAwesomeIcon icon={faCrosshairs} className="text-swiggy-body-soft group-hover:text-swiggy-body mt-0.5" />
            <div>
              <h3 className="text-[16px] font-semibold text-swiggy-body group-hover:text-swiggy-orange transition-colors mb-1">
                Get current location
              </h3>
              <p className="text-[13px] text-swiggy-subtle">Using GPS</p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
