"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal";
import LocationModal from "./LocationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faTag,
  faCircleQuestion,
  faUser,
  faShoppingBag,
  faBars,
  faXmark,
  faChevronDown,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const desktopLinkClass = (href: string, extraClasses = "") =>
    `flex items-center gap-3 text-sm font-semibold tracking-tight transition-all duration-200 active:scale-95 ${
      isActiveRoute(href)
        ? "text-swiggy-orange"
        : "text-swiggy-body-soft hover:text-swiggy-orange"
    } ${extraClasses}`;

  const mobileLinkClass = (href: string) =>
    `flex items-center gap-4 text-base font-semibold transition-colors ${
      isActiveRoute(href)
        ? "text-swiggy-orange"
        : "text-swiggy-body-soft hover:text-swiggy-orange"
    }`;

  const mobileBottomLinkClass = (href: string) =>
    `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase transition-colors ${
      isActiveRoute(href)
        ? "text-swiggy-orange"
        : "text-swiggy-body-soft hover:text-swiggy-orange"
    }`;

  return (
    <>
    <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-[0px_4px_12px_rgba(61,65,82,0.06)] h-20">
      <nav className="flex items-center justify-between px-8 h-full w-full max-w-7xl mx-auto relative">
        
        {/* Left: Logo and Location */}
        <div className="flex items-center gap-8">
          <Link href="/" className="cursor-pointer active:scale-95 transition-transform">
            <svg
              className="text-swiggy-orange"
              fill="none"
              height="49"
              viewBox="0 0 34 49"
              width="34"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.7 20.3C33.6 17.4 33.6 12.6 30.7 9.7C27.8 6.8 23 6.8 20.1 9.7L5.7 24.1C2.8 27 2.8 31.8 5.7 34.7C8.6 37.6 13.4 37.6 16.3 34.7L30.7 20.3Z"
                fill="currentColor"
              ></path>
              <path
                d="M12.9 16.3C10 19.2 10 24 12.9 26.9C15.8 29.8 20.6 29.8 23.5 26.9L28.1 22.3C31 19.4 31 14.6 28.1 11.7C25.2 8.8 20.4 8.8 17.5 11.7L12.9 16.3Z"
                fill="currentColor"
              ></path>
            </svg>
          </Link>
          <div 
            className="hidden md:flex items-center gap-2 group cursor-pointer"
            onClick={() => setIsLocationModalOpen(true)}
          >
            <span className="font-bold text-sm text-swiggy-heading border-b-2 border-swiggy-heading pb-0.5 group-hover:text-swiggy-orange group-hover:border-swiggy-orange transition-colors">
              Other
            </span>
            <span className="text-swiggy-brown text-xs truncate max-w-[150px]">
              Select location for delivery
            </span>
            <FontAwesomeIcon icon={faChevronDown} className="text-swiggy-orange text-sm" />
          </div>
        </div>

        {/* Right: Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-12">
          <Link href="/about" className={desktopLinkClass("/about")}>
            <FontAwesomeIcon icon={faRocket} className="text-lg" />
            <span>About Us</span>
          </Link>
          
          <Link href="/search" className={desktopLinkClass("/search")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
            <span>Search</span>
          </Link>
          
          <Link href="/offers" className={desktopLinkClass("/offers", "relative")}>
            <FontAwesomeIcon icon={faTag} className="text-lg" />
            <span>Offers</span>
            <span className="absolute -top-3 -right-6 text-[8px] font-extrabold text-swiggy-orange bg-white border border-swiggy-orange px-1 rounded-sm">
              NEW
            </span>
          </Link>
          
          <Link href="/help" className={desktopLinkClass("/help")}>
            <FontAwesomeIcon icon={faCircleQuestion} className="text-lg" />
            <span>Help</span>
          </Link>
          
          <button onClick={() => setIsAuthModalOpen(true)} className="flex items-center gap-3 text-swiggy-body-soft text-sm font-semibold tracking-tight hover:text-swiggy-orange transition-all duration-200 active:scale-95">
            <FontAwesomeIcon icon={faUser} className="text-lg" />
            <span>Sign In</span>
          </button>
          
          <Link href="/cart" className={desktopLinkClass("/cart")}>
            <div className="relative">
              <FontAwesomeIcon icon={faShoppingBag} className="text-xl" />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] text-[10px] font-bold">
                0
              </span>
            </div>
            <span>Cart</span>
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center gap-6">
          <button 
            onClick={toggleMenu}
            className="text-swiggy-body-soft focus:outline-none transition-transform active:scale-90"
            aria-label="Toggle Menu"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="text-xl" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 flex flex-col px-8 py-6 gap-6 z-40">
          <Link href="/about" onClick={toggleMenu} className={mobileLinkClass("/about")}>
            <FontAwesomeIcon icon={faRocket} className="text-lg w-6" />
            <span>About Us</span>
          </Link>
          <Link href="/offers" onClick={toggleMenu} className={mobileLinkClass("/offers")}>
            <FontAwesomeIcon icon={faTag} className="text-lg w-6" />
            <span>Offers</span>
            <span className="text-[10px] font-extrabold text-swiggy-orange bg-white border border-swiggy-orange px-1 rounded-sm ml-auto">
              NEW
            </span>
          </Link>
          <Link href="/help" onClick={toggleMenu} className={mobileLinkClass("/help")}>
            <FontAwesomeIcon icon={faCircleQuestion} className="text-lg w-6" />
            <span>Help</span>
          </Link>
          <button onClick={() => { toggleMenu(); setIsAuthModalOpen(true); }} className="flex items-center gap-4 text-swiggy-body-soft text-base font-semibold w-full text-left">
            <FontAwesomeIcon icon={faUser} className="text-lg w-6" />
            <span>Sign In</span>
          </button>
          <Link href="/cart" onClick={toggleMenu} className={mobileLinkClass("/cart")}>
            <FontAwesomeIcon icon={faShoppingBag} className="text-lg w-6" />
            <span>Cart</span>
          </Link>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
      />
    </header>
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center border-t border-gray-200 bg-white px-3 pb-[env(safe-area-inset-bottom)] shadow-[0px_-4px_12px_rgba(61,65,82,0.06)] lg:hidden">
      <Link href="/" className={mobileBottomLinkClass("/")} aria-label="Swiggy">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 34 49"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.7 20.3C33.6 17.4 33.6 12.6 30.7 9.7C27.8 6.8 23 6.8 20.1 9.7L5.7 24.1C2.8 27 2.8 31.8 5.7 34.7C8.6 37.6 13.4 37.6 16.3 34.7L30.7 20.3Z"
            fill="currentColor"
          ></path>
          <path
            d="M12.9 16.3C10 19.2 10 24 12.9 26.9C15.8 29.8 20.6 29.8 23.5 26.9L28.1 22.3C31 19.4 31 14.6 28.1 11.7C25.2 8.8 20.4 8.8 17.5 11.7L12.9 16.3Z"
            fill="currentColor"
          ></path>
        </svg>
        <span>Swiggy</span>
      </Link>
      <Link href="/search" className={mobileBottomLinkClass("/search")}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
        <span>Search</span>
      </Link>
      <Link href="/offers" className={mobileBottomLinkClass("/offers")}>
        <FontAwesomeIcon icon={faTag} className="text-xl" />
        <span>Offers</span>
      </Link>
      <Link href="/account" className={mobileBottomLinkClass("/account")}>
        <FontAwesomeIcon icon={faUser} className="text-xl" />
        <span>Account</span>
      </Link>
      <Link href="/cart" className={mobileBottomLinkClass("/cart")}>
        <div className="relative">
          <FontAwesomeIcon icon={faShoppingBag} className="text-xl" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] text-[9px] font-bold">
            0
          </span>
        </div>
        <span>Cart</span>
      </Link>
    </nav>
    </>
  );
}
