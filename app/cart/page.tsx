"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUser, faLocationDot, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, cartTotal, isLoggedIn, toggleLogin, incrementQuantity, decrementQuantity } = useCart();

  const deliveryFee = 40;
  const itemDiscount = isLoggedIn ? 126 : 0;
  const gstAndCharges = 75.51;
  const toPay = cartTotal + deliveryFee - itemDiscount + gstAndCharges;

  return (
    <div className="min-h-screen bg-swiggy-border py-8 font-sans text-swiggy-body mt-15">
      


      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT COLUMN: Checkout Steps */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          
          {/* STEP 1: ACCOUNT */}
          <div className="bg-white p-8 shadow-sm flex gap-6 relative">
            <div className="absolute -left-12 top-8 w-10 hidden lg:flex flex-col items-center">
              <div className={`w-10 h-10 ${isLoggedIn ? 'bg-white border-2 border-swiggy-body text-swiggy-body' : 'bg-swiggy-body text-white'} flex items-center justify-center text-lg shadow-sm z-10`}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="w-[1px] h-32 border-l border-dashed border-gray-400 mt-2"></div>
            </div>
            
            {isLoggedIn ? (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold">Logged in</h2>
                  <div className="w-5 h-5 bg-swiggy-green rounded-full flex items-center justify-center text-white text-xs">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </div>
                <div className="text-sm font-medium">Abhiram Manoharan | 7994406684</div>
              </div>
            ) : (
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold mb-1">Account</h2>
                  <p className="text-swiggy-muted-2 text-sm mb-6">To place your order now, log in to your existing account or sign up.</p>
                  <div className="flex gap-4">
                    <button className="border border-swiggy-green text-swiggy-green font-bold text-sm px-8 py-2 flex flex-col items-center hover:bg-swiggy-green hover:text-white transition-colors">
                      <span className="text-[10px] font-normal">Have an account?</span>
                      LOG IN
                    </button>
                    <button className="bg-swiggy-green text-white font-bold text-sm px-8 py-2 flex flex-col items-center hover:bg-swiggy-green-dark transition-colors">
                      <span className="text-[10px] font-normal">New to Swiggy?</span>
                      SIGN UP
                    </button>
                  </div>
                </div>
                <div className="w-32 h-32 relative rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
                  <Image src="/images/p1.png" alt="Wrap" width={100} height={100} className="object-cover" />
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: DELIVERY ADDRESS */}
          <div className="bg-white p-8 shadow-sm flex gap-6 relative">
            <div className="absolute -left-12 top-8 w-10 hidden lg:flex flex-col items-center">
              <div className="w-10 h-10 bg-white border-2 border-swiggy-body text-swiggy-body flex items-center justify-center text-lg shadow-sm z-10">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <div className="w-[1px] h-48 border-l border-dashed border-gray-400 mt-2"></div>
            </div>
            
            <div className="w-full">
              {isLoggedIn ? (
                <>
                  <h2 className="text-xl font-bold mb-1">Select delivery address</h2>
                  <p className="text-swiggy-muted-2 text-sm mb-6">You have a saved address in this location</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Saved Address Box */}
                    <div className="border border-swiggy-border p-5 hover:shadow-md transition-shadow relative">
                      <div className="flex items-start gap-3 mb-2">
                        <FontAwesomeIcon icon={faLocationDot} className="text-xl mt-1" />
                        <div>
                          <h3 className="font-bold">Home</h3>
                          <p className="text-sm text-swiggy-subtle leading-relaxed mt-2 line-clamp-3">Evra, Amrita Nagar, Edappally, Ernakulam, Kochi, Kerala, India</p>
                        </div>
                      </div>
                      <div className="font-bold text-sm mt-4 mb-4">47 MINS</div>
                      <button className="bg-swiggy-green text-white font-bold text-sm px-6 py-2 hover:shadow-lg transition-shadow">
                        DELIVER HERE
                      </button>
                    </div>

                    {/* Add New Address Box */}
                    <div className="border border-dashed border-swiggy-border p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-2">
                        <FontAwesomeIcon icon={faLocationDot} className="text-xl mt-1" />
                        <div>
                          <h3 className="font-bold">Add New Address</h3>
                          <p className="text-sm text-swiggy-subtle leading-relaxed mt-2">Edappally, Kochi, Kerala, India</p>
                        </div>
                      </div>
                      <button className="border border-swiggy-green text-swiggy-green font-bold text-sm px-6 py-2 self-start hover:bg-swiggy-green hover:text-white transition-colors">
                        ADD NEW
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <h2 className="text-xl font-bold text-swiggy-subtle">Delivery address</h2>
              )}
            </div>
          </div>

          {/* STEP 3: PAYMENT */}
          <div className="hidden lg:flex bg-white p-8 shadow-sm gap-6 relative">
            <div className="absolute -left-12 top-8 w-10 hidden lg:flex flex-col items-center">
              <div className="w-10 h-10 bg-swiggy-ink text-white flex items-center justify-center text-lg shadow-md z-10">
                <FontAwesomeIcon icon={faWallet} />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-xl font-bold mb-10">Choose payment method</h2>
              <button className="w-full bg-swiggy-offer text-white font-bold text-base py-4 hover:bg-swiggy-offer-dark transition-colors">
                PROCEED TO PAY
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-white shadow-sm pb-4">
            
            {/* Restaurant Info */}
            <div className="p-6 flex items-start gap-4 border-b border-gray-100">
              <div className="w-12 h-12 relative rounded-sm overflow-hidden">
                <Image src="/images/r1.png" alt="Pizza Hut" fill className="object-cover" />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight">Pizza Hut</h2>
                <p className="text-sm text-swiggy-subtle">Edappally</p>
                <div className="w-8 h-1 bg-swiggy-body mt-3"></div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="p-6 max-h-[40vh] overflow-y-auto flex flex-col gap-4">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex items-start justify-between">
                  <div className="flex items-start gap-2 w-[55%]">
                    {/* Veg Icon */}
                    <div className="w-3.5 h-3.5 border border-green-600 rounded-sm flex items-center justify-center shrink-0 mt-1">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium leading-tight">{item.name}</h3>
                      {item.crust && <p className="text-xs text-swiggy-subtle mt-1 line-clamp-1">{item.crust}</p>}
                      <button className="text-[10px] text-gray-500 font-bold mt-1">Customize &gt;</button>
                    </div>
                  </div>
                  
                  {/* Quantity Counter */}
                  <div className="border border-gray-300 text-green-600 font-bold text-sm px-2 py-1 rounded-sm flex items-center justify-between w-[70px] bg-white">
                    <button onClick={() => decrementQuantity(item.id)} className="text-gray-400 hover:text-gray-600 w-1/3 text-center">-</button>
                    <span className="text-swiggy-body w-1/3 text-center">{item.quantity}</span>
                    <button onClick={() => incrementQuantity(item.id)} className="hover:text-green-800 w-1/3 text-center">+</button>
                  </div>

                  {/* Price */}
                  <div className="w-[60px] text-right text-sm font-medium text-swiggy-body">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions & Delivery Preference */}
            <div className="px-6 pb-6 border-b border-gray-100 flex flex-col gap-4">
              <div className="bg-swiggy-page border border-gray-200 rounded-sm px-4 py-3 flex items-start gap-3">
                <span className="text-gray-500 font-bold">&quot;</span>
                <input type="text" placeholder="Any suggestions? We will pass it on..." className="bg-transparent border-none outline-none w-full text-sm placeholder-gray-500" />
              </div>
              
              <div className="border border-gray-200 rounded-sm p-4 flex gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 w-4 h-4 accent-swiggy-green" />
                <div>
                  <div className="font-bold text-swiggy-body-soft text-sm">Opt in for No-contact Delivery</div>
                  <p className="text-xs text-swiggy-subtle mt-1 leading-relaxed">Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place the order outside your door (not for COD)</p>
                </div>
              </div>
            </div>

            {/* Coupons */}
            <div className="px-6 py-4 border-b border-gray-100 border-dashed">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">SWIGGY6</div>
                  <p className="text-xs text-swiggy-subtle">Offer applied on the bill</p>
                </div>
                <button className="text-xs font-bold text-swiggy-body">REMOVE</button>
              </div>
            </div>

            {/* Bill Details */}
            <div className="px-6 py-4">
              <h3 className="font-bold text-sm mb-3">Bill Details</h3>
              <div className="flex justify-between text-sm text-swiggy-muted mb-2">
                <span>Item Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm text-swiggy-muted mb-4 pb-4 border-b border-gray-200">
                <span>Delivery Fee | 1.2 kms <span className="text-xs border border-gray-400 rounded-full px-1">i</span></span>
                <span>₹{deliveryFee}</span>
              </div>
              
              {isLoggedIn && (
                <div className="flex justify-between text-sm text-swiggy-green font-medium mb-4 pb-4 border-b border-gray-200">
                  <span>Item Discount <span className="text-xs border border-swiggy-green rounded-full px-1">i</span></span>
                  <span>- ₹{itemDiscount}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm text-swiggy-muted mb-4 pb-4 border-b border-swiggy-body">
                <span>GST & Other Charges <span className="text-xs border border-gray-400 rounded-full px-1">i</span></span>
                <span>₹{gstAndCharges}</span>
              </div>

              <div className="flex justify-between font-bold text-base text-swiggy-body">
                <span>TO PAY</span>
                <span>₹{toPay.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Conditional Bottom Blocks */}
          {isLoggedIn ? (
            <div className="mt-4 bg-swiggy-success-bg border border-swiggy-success-border p-3 text-swiggy-offer font-bold text-sm">
              Savings of ₹{itemDiscount}
            </div>
          ) : (
            <div className="mt-4 bg-white shadow-sm p-4 border border-gray-200">
              <h3 className="font-bold text-sm text-swiggy-body mb-2">Review your order and address details to avoid cancellations</h3>
              <p className="text-xs text-swiggy-subtle leading-relaxed mb-3">
                <span className="font-bold text-swiggy-body-soft">Note:</span> Please ensure your address and order details are correct. This order, if cancelled, is non-refundable.
              </p>
              <button className="text-swiggy-orange text-xs font-bold underline decoration-dashed">Read policy</button>
            </div>
          )}

        </div>

        {/* MOBILE PAYMENT CARD */}
        <div className="w-full bg-white p-8 shadow-sm flex gap-6 relative lg:hidden">
          <div className="w-full">
            <h2 className="text-xl font-bold mb-10">Choose payment method</h2>
            <button className="w-full bg-swiggy-offer text-white font-bold text-base py-4 hover:bg-swiggy-offer-dark transition-colors">
              PROCEED TO PAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
