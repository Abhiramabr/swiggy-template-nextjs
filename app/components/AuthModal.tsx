"use client";

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    router.push('/account');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setView('login'), 300);
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[101] transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex-1 overflow-y-auto p-10">
          <button 
            onClick={onClose}
            className="mb-8 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="text-2xl" />
          </button>

          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-semibold mb-2 text-swiggy-body">
                {view === 'login' ? 'Login' : 'Sign up'}
              </h2>
              <p className="text-sm text-swiggy-body">
                or <button onClick={() => setView(view === 'login' ? 'signup' : 'login')} className="text-swiggy-orange font-medium hover:text-swiggy-orange outline-none">
                  {view === 'login' ? 'create an account' : 'login to your account'}
                </button>
              </p>
              <div className="w-8 h-0.5 bg-black mt-4"></div>
            </div>
            
            <div className="relative w-24 h-24 mt-2">
               <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="food illustration" className="w-full h-full object-contain" />
            </div>
          </div>

          <form className="flex flex-col mt-2" onSubmit={view === 'login' ? handleLogin : (e) => e.preventDefault()}>
            {view === 'login' ? (
              <>
                <div className="relative border border-gray-300 bg-white group focus-within:border-swiggy-body transition-colors shadow-sm">
                  <input 
                    type="tel" 
                    id="phone"
                    className="block w-full px-5 pt-6 pb-2 text-base text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="phone" 
                    className="absolute text-[15px] text-swiggy-subtle duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-focus:text-swiggy-subtle peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                  >
                    Phone number
                  </label>
                </div>

                <button className="w-full bg-swiggy-orange text-white font-bold text-sm py-4 mt-6 hover:shadow-md transition-shadow">
                  LOGIN
                </button>
                <p className="text-xs text-swiggy-muted mt-2 font-medium">
                  By clicking on Login, I accept the <span className="text-swiggy-body cursor-pointer">Terms & Conditions</span> & <span className="text-swiggy-body cursor-pointer">Privacy Policy</span>
                </p>
              </>
            ) : (
              <>
                <div className="relative border border-gray-300 border-b-0 bg-white group focus-within:border-swiggy-body focus-within:border-b transition-colors shadow-sm focus-within:z-10 focus-within:relative">
                  <input 
                    type="tel" 
                    id="phone-signup"
                    className="block w-full px-5 pt-6 pb-2 text-base text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="phone-signup" 
                    className="absolute text-[15px] text-swiggy-subtle duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-focus:text-swiggy-subtle peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                  >
                    Phone number
                  </label>
                </div>

                <div className="relative border border-gray-300 border-b-0 bg-white group focus-within:border-swiggy-body focus-within:border-b transition-colors shadow-sm focus-within:z-10 focus-within:relative">
                  <input 
                    type="text" 
                    id="name"
                    className="block w-full px-5 pt-6 pb-2 text-base text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute text-[15px] text-swiggy-subtle duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-focus:text-swiggy-subtle peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                  >
                    Name
                  </label>
                </div>

                <div className="relative border border-gray-300 bg-white group focus-within:border-swiggy-body transition-colors shadow-sm focus-within:z-10 focus-within:relative">
                  <input 
                    type="email" 
                    id="email"
                    className="block w-full px-5 pt-6 pb-2 text-base text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute text-[15px] text-swiggy-subtle duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-focus:text-swiggy-subtle peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                  >
                    Email
                  </label>
                </div>

                <button type="button" className="text-swiggy-link-blue text-[13px] font-medium text-left mt-6 mb-2 hover:opacity-80 transition-opacity">
                  Have a referral code?
                </button>

                <button className="w-full bg-swiggy-orange text-white font-bold text-sm py-4 mt-2 hover:shadow-md transition-shadow">
                  CONTINUE
                </button>
                <p className="text-xs text-swiggy-muted mt-2 font-medium">
                  By creating an account, I accept the <span className="text-swiggy-body cursor-pointer">Terms & Conditions</span> & <span className="text-swiggy-body cursor-pointer">Privacy Policy</span>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
