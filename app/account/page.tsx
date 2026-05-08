"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingBag, 
  faHeart, 
  faCreditCard, 
  faLocationDot, 
  faGear,
  faCircleCheck,
  faBolt,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

export default function AccountPage() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editingField, setEditingField] = useState<'phone' | 'email' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('7994406684');
  const [email, setEmail] = useState('abhirammano14@gmail.com');

  useEffect(() => {
    if (isEditProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setEditingField(null);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isEditProfileOpen]);

  const sidebarNav = [
    { name: 'Orders', icon: faShoppingBag, active: true },
    { name: 'Swiggy One', icon: faBolt, active: false },
    { name: 'Favourites', icon: faHeart, active: false },
    { name: 'Payments', icon: faCreditCard, active: false },
    { name: 'Addresses', icon: faLocationDot, active: false },
    { name: 'Settings', icon: faGear, active: false },
  ];

  const pastOrders = [
    {
      id: 1,
      restaurant: 'Chicking',
      location: 'Kollam City',
      orderNo: '215097896832386',
      orderDate: 'Mon, Aug 25, 2025, 06:54 PM',
      deliveryStatus: 'Delivered on Mon, Aug 25, 2025, 07:53 PM',
      items: 'Ultimate Bucket x 1, Mexicano Pizza Burger Non Veg Burger + Coleslaw x 1',
      total: 791,
      image: '/images/r1.png'
    },
    {
      id: 2,
      restaurant: 'Chicking',
      location: 'Kollam City',
      orderNo: '211986065489981',
      orderDate: 'Sun, Jul 20, 2025, 06:31 PM',
      deliveryStatus: 'Delivered on Sun, Jul 20, 2025, 07:37 PM',
      items: 'Ultimate Bucket x 1, Tortilla x 1',
      total: 668,
      image: '/images/r2.png'
    }
  ];

  return (
    <div className="min-h-screen bg-swiggy-blue font-sans pt-20">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-between items-center text-white">
        <div>
          <h1 className="text-3xl font-bold mb-1 tracking-tight">Abhiram</h1>
          <p className="text-sm opacity-90 font-medium">7994406684 &nbsp; • &nbsp; abhirammano14@gmail.com</p>
        </div>
        <button
          onClick={() => setIsEditProfileOpen(true)}
          className="border border-white/60 text-white text-sm font-bold px-6 py-2 hover:bg-white hover:text-swiggy-blue transition-colors"
        >
          EDIT PROFILE
        </button>
      </div>

      {/* Main Body */}
      <div className="bg-white min-h-[80vh] w-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row py-8">
          
          {/* Left Sidebar */}
          <div className="w-full md:w-[250px] shrink-0 bg-swiggy-panel pt-4 pr-4 ml-[-20px] pl-[20px] mb-8 md:mb-0 min-h-[60vh]">
            <div className="flex flex-col gap-1">
              {sidebarNav.map((nav, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center gap-4 px-6 py-4 cursor-pointer font-bold text-sm ${nav.active ? 'bg-white text-black' : 'text-swiggy-body hover:bg-gray-200'} transition-colors relative`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${nav.active ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'} text-lg`}>
                    <FontAwesomeIcon icon={nav.icon} className="w-4 h-4" />
                  </div>
                  <span>{nav.name}</span>
                  {nav.active && <div className="absolute right-0 top-0 bottom-0 w-1 bg-black"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 md:pl-12 px-4">
            <h2 className="text-2xl font-bold mb-6 tracking-tight text-swiggy-body">Past Orders</h2>

            <div className="flex flex-col gap-6">
              {pastOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow">
                  
                  {/* Top: Restaurant & Status */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-4">
                      <div className="relative w-[100px] h-[70px] bg-gray-100 overflow-hidden shrink-0 shadow-sm border border-gray-100">
                        <Image src={order.image} alt={order.restaurant} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-swiggy-body font-bold text-lg leading-tight hover:text-swiggy-orange cursor-pointer transition-colors">{order.restaurant}</h3>
                        <p className="text-swiggy-subtle text-xs mb-1">{order.location}</p>
                        <p className="text-swiggy-subtle text-[11px] mb-3">ORDER #{order.orderNo} | {order.orderDate}</p>
                        <button className="text-swiggy-orange text-xs font-bold hover:underline">VIEW DETAILS</button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                      {order.deliveryStatus}
                      <FontAwesomeIcon icon={faCircleCheck} className="text-green-600 text-sm" />
                    </div>
                  </div>

                  {/* Dotted Line */}
                  <div className="border-t border-dotted border-gray-300 w-full my-4"></div>

                  {/* Bottom: Items & Total & Buttons */}
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-swiggy-body font-medium max-w-[70%]">
                      {order.items}
                    </div>
                    <div className="text-sm font-bold text-swiggy-body">
                      Total Paid: ₹ {order.total}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button className="bg-swiggy-orange text-white font-bold text-xs px-8 py-2.5 hover:shadow-md transition-shadow uppercase">
                      Reorder
                    </button>
                    <button className="border border-swiggy-orange text-swiggy-orange font-bold text-xs px-8 py-2.5 hover:bg-swiggy-orange hover:text-white transition-colors uppercase">
                      Help
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            <div className="mt-6 mb-10 border border-gray-200 text-center py-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-swiggy-body font-bold text-sm tracking-tight">SHOW MORE ORDERS</span>
            </div>
          </div>

        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${
          isEditProfileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsEditProfileOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[101] transform transition-transform duration-300 ease-out ${
          isEditProfileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-10">
          <div className="flex items-center gap-6 mb-12">
            <button
              onClick={() => setIsEditProfileOpen(false)}
              className="text-swiggy-ink hover:text-swiggy-orange transition-colors"
              aria-label="Close edit profile"
            >
              <FontAwesomeIcon icon={faXmark} className="text-2xl" />
            </button>
            <h2 className="text-xl font-bold text-black">Edit profile</h2>
          </div>

          <form className="flex flex-col" onSubmit={(event) => event.preventDefault()}>
            <div className="pb-7 border-b border-gray-300">
              <h3 className="text-xl font-bold text-black mb-5">Phone number</h3>
              {editingField === 'phone' ? (
                <div className="relative border border-gray-300 bg-white group focus-within:border-swiggy-body transition-colors">
                  <input
                    type="tel"
                    id="edit-phone"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    className="block w-full px-5 pt-6 pb-3 text-base font-semibold text-black bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    autoFocus
                  />
                  <label
                    htmlFor="edit-phone"
                    className="absolute text-[15px] text-swiggy-muted duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-focus:text-swiggy-muted peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                  >
                    Phone number
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-6">
                  <div className="text-base font-medium text-black">{phoneNumber}</div>
                  <button
                    type="button"
                    onClick={() => setEditingField('phone')}
                    className="text-swiggy-orange text-sm font-bold hover:text-swiggy-orange-dark transition-colors"
                  >
                    CHANGE
                  </button>
                </div>
              )}
            </div>

            <div className="pt-7">
              <h3 className="text-xl font-bold text-black mb-5">Email id</h3>
              {editingField === 'email' ? (
                <div className="relative border border-gray-300 bg-white group focus-within:border-swiggy-body transition-colors">
                  <input
                    type="email"
                    id="edit-email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="block w-full px-5 pt-6 pb-3 text-base font-semibold text-black bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    autoFocus
                  />
                  <label
                    htmlFor="edit-email"
                    className="absolute text-[15px] text-swiggy-muted duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-focus:text-swiggy-muted peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
                  >
                    Email id
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-6">
                  <div className="text-base font-medium text-black break-all">{email}</div>
                  <button
                    type="button"
                    onClick={() => setEditingField('email')}
                    className="text-swiggy-orange text-sm font-bold hover:text-swiggy-orange-dark transition-colors"
                  >
                    CHANGE
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-swiggy-orange text-white font-bold text-sm py-4 mt-7 hover:shadow-md transition-shadow"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
