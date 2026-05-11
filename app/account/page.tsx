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
  faXmark,
  faBoxOpen,
  faGift,
  faPercent,
  faTrophy,
  faWallet,
  faStar,
  faHouse
} from '@fortawesome/free-solid-svg-icons';

type AccountSection = 'Orders' | 'Swiggy One' | 'Favourites' | 'Payments' | 'Addresses' | 'Settings';

export default function AccountPage() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [editingField, setEditingField] = useState<'phone' | 'email' | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('7994406684');
  const [email, setEmail] = useState('abhirammano14@gmail.com');
  const [activeSection, setActiveSection] = useState<AccountSection>('Orders');
  const [smsRecommendationsEnabled, setSmsRecommendationsEnabled] = useState(true);

  useEffect(() => {
    if (isEditProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isEditProfileOpen]);

  const closeEditProfile = () => {
    setIsEditProfileOpen(false);
    setEditingField(null);
  };

  const sidebarNav = [
    { name: 'Orders' as const, icon: faShoppingBag },
    { name: 'Swiggy One' as const, icon: faBolt },
    { name: 'Favourites' as const, icon: faHeart },
    { name: 'Payments' as const, icon: faCreditCard },
    { name: 'Addresses' as const, icon: faLocationDot },
    { name: 'Settings' as const, icon: faGear },
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

  const savedAddresses = [
    {
      id: 1,
      type: 'Home',
      icon: faHouse,
      address: 'Amrita Nagar, Edappally, Ernakulam, Kochi, Kerala, India'
    },
    {
      id: 2,
      type: 'Other',
      icon: faLocationDot,
      address: 'Kollam, Kerala, India'
    },
    {
      id: 3,
      type: '',
      icon: faLocationDot,
      address: 'Amritapuri, Vallikavu, Kerala 690546, India'
    }
  ];

  const emptySectionCopy: Record<Exclude<AccountSection, 'Orders' | 'Swiggy One' | 'Addresses' | 'Settings'>, string> = {
    Favourites: 'Restaurants and dishes you save will appear here.',
    Payments: 'Saved payment methods and wallet details will appear here.'
  };

  const renderSwiggyOne = () => (
    <div className="min-h-[430px] flex flex-col lg:flex-row justify-between gap-10 pt-4">
      <div className="max-w-[620px]">
        <h2 className="text-2xl font-bold mb-9 tracking-tight text-black">Swiggy One</h2>
        <div className="space-y-5 text-lg leading-relaxed text-swiggy-body font-medium">
          <p>Get free delivery and extra discounts all across Swiggy.</p>
          <p>Your Swiggy One benefits can be availed only on the Swiggy App.</p>
        </div>

        <div className="mt-9 flex flex-wrap gap-6">
          <Image
            src="/images/app_store.png"
            alt="Download on the App Store"
            width={240}
            height={72}
            className="h-[58px] w-auto object-contain"
          />
          <Image
            src="/images/play_store.png"
            alt="Get it on Google Play"
            width={240}
            height={72}
            className="h-[58px] w-auto object-contain"
          />
        </div>
      </div>

      <div className="relative hidden min-h-[360px] w-[360px] shrink-0 lg:block">
        <div className="absolute right-20 top-0 rotate-[-28deg] rounded-md bg-amber-700 p-5 shadow-lg">
          <FontAwesomeIcon icon={faBoxOpen} className="h-14 w-14 text-amber-200" />
        </div>
        <div className="absolute left-3 top-28 rotate-[11deg] rounded-sm bg-pink-400 p-4 shadow-lg">
          <FontAwesomeIcon icon={faGift} className="h-10 w-10 text-white" />
        </div>
        <div className="absolute right-7 top-24 rounded-[40%] bg-sky-300 p-5 shadow-lg">
          <FontAwesomeIcon icon={faWallet} className="h-14 w-14 text-blue-600" />
        </div>
        <div className="absolute right-36 top-48 rounded-full bg-red-500 p-6 shadow-lg">
          <div className="h-16 w-16 rounded-full bg-red-600" />
          <div className="absolute left-10 top-1 h-8 w-4 rotate-[15deg] rounded-full bg-green-600" />
        </div>
        <div className="absolute right-7 top-52 rounded-full bg-fuchsia-400 p-6 shadow-lg">
          <FontAwesomeIcon icon={faPercent} className="h-12 w-12 text-white" />
        </div>
        <div className="absolute bottom-6 left-[88px] rounded-full bg-yellow-400 p-6 shadow-lg">
          <FontAwesomeIcon icon={faStar} className="h-10 w-10 text-purple-500" />
        </div>
        <div className="absolute right-4 top-3 rounded-full bg-yellow-400 p-3 shadow-md">
          <FontAwesomeIcon icon={faTrophy} className="h-8 w-8 text-white" />
        </div>
        <div className="absolute bottom-16 right-1 rotate-[-24deg] text-[26px] font-black uppercase tracking-tight text-swiggy-orange">Genie</div>
        <div className="absolute left-24 top-[148px] rotate-[10deg] text-[28px] font-black uppercase tracking-tight text-swiggy-orange">Instamart</div>
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="pt-4">
      <h2 className="text-2xl font-bold mb-10 tracking-tight text-black">Manage Addresses</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-11">
        {savedAddresses.map((savedAddress) => (
          <div
            key={savedAddress.id}
            className="min-h-[137px] border border-gray-300 px-6 py-7 flex items-start gap-6"
          >
            <FontAwesomeIcon icon={savedAddress.icon} className="mt-1 h-5 w-5 shrink-0 text-black" />
            <div className="min-w-0">
              {savedAddress.type && (
                <h3 className="text-lg font-bold leading-tight text-black">{savedAddress.type}</h3>
              )}
              <p className={`${savedAddress.type ? 'mt-1' : ''} text-sm font-medium leading-6 text-black`}>
                {savedAddress.address}
              </p>
              <div className="mt-5 flex gap-7">
                <button className="text-xs font-bold text-swiggy-orange hover:text-swiggy-orange-dark transition-colors">
                  EDIT
                </button>
                <button className="text-xs font-bold text-swiggy-orange hover:text-swiggy-orange-dark transition-colors">
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="pt-4">
      <h2 className="text-2xl font-bold mb-11 tracking-tight text-black">SMS Preferences</h2>

      <div className="border border-gray-300 px-5 py-5 text-sm font-medium text-black">
        Order related SMS cannot be disabled as they are critical to provide service
      </div>

      <div className="mt-5 border border-gray-300 px-5 py-5">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex min-w-0 flex-1 items-center justify-between gap-6 pr-0 md:pr-10">
            <h3 className="text-base font-bold text-black">Recommendations &amp; Reminders</h3>
            <button
              type="button"
              onClick={() => setSmsRecommendationsEnabled((isEnabled) => !isEnabled)}
              className={`relative h-8 w-[52px] shrink-0 rounded-full transition-colors duration-200 ${
                smsRecommendationsEnabled ? 'bg-swiggy-orange' : 'bg-gray-300'
              }`}
              aria-label="Toggle recommendations and reminders SMS"
              aria-pressed={smsRecommendationsEnabled}
            >
              <span
                className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  smsRecommendationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="hidden h-[72px] w-px shrink-0 bg-gray-300 md:block" />

          <p className="max-w-[500px] text-sm font-medium leading-5 text-black">
            Keep this on to receive offer recommendations &amp; timely reminders based on your interests
          </p>
        </div>
      </div>
    </div>
  );

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
              {sidebarNav.map((nav) => {
                const isActive = activeSection === nav.name;

                return (
                  <button
                    key={nav.name}
                    type="button"
                    onClick={() => setActiveSection(nav.name)}
                    className={`flex items-center gap-4 px-6 py-4 cursor-pointer font-bold text-sm text-left ${isActive ? 'bg-white text-black' : 'text-swiggy-body hover:bg-gray-200'} transition-colors relative`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'} text-lg`}>
                      <FontAwesomeIcon icon={nav.icon} className="w-4 h-4" />
                    </div>
                    <span>{nav.name}</span>
                    {isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-black"></div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 md:pl-12 px-4">
            {activeSection === 'Swiggy One' ? renderSwiggyOne() : activeSection === 'Addresses' ? renderAddresses() : activeSection === 'Settings' ? renderSettings() : activeSection === 'Orders' ? (
              <>
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
              </>
            ) : (
              <div className="pt-4">
                <h2 className="text-2xl font-bold mb-4 tracking-tight text-swiggy-body">{activeSection}</h2>
                <p className="text-sm font-medium text-swiggy-muted">
                  {emptySectionCopy[activeSection as keyof typeof emptySectionCopy]}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${
          isEditProfileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeEditProfile}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-[101] transform transition-transform duration-300 ease-out ${
          isEditProfileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-10">
          <div className="flex items-center gap-6 mb-12">
            <button
              onClick={closeEditProfile}
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
