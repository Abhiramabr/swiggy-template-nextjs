// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faIceCream,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedin,
  faInstagram,
  faFacebook,
  faPinterest,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="w-full">
      {/* ===== App Download Banner ===== */}
      <section className="bg-swiggy-footer py-8 px-4 md:px-20 lg:px-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <h2 className="text-swiggy-ink font-extrabold text-2xl lg:text-3xl text-center md:text-left tracking-tight">
            For better experience, download the Swiggy app now
          </h2>
          <div className="flex gap-4">
            {/* Google Play */}
            <Link href="#" className="inline-block transition-transform active:scale-95">
              <Image
                src="/images/play_store.png"
                alt="Get it on Google Play"
                width={135}
                height={40}
                className="h-10 md:h-12 w-auto"
                unoptimized // because we use external URL
              />
            </Link>
            {/* App Store */}
            <Link href="#" className="inline-block transition-transform active:scale-95">
              <Image
                src="/images/app_store.png"
                alt="Download on the App Store"
                width={120}
                height={40}
                className="h-10 md:h-12 w-auto"
                unoptimized
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Main Footer Links ===== */}
      <section className="bg-swiggy-footer pt-16 pb-12 px-4 md:px-20 lg:px-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          
          {/* Branding & Copyright */}
          <div className="lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-swiggy-orange w-8 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <FontAwesomeIcon icon={faIceCream} className="text-white text-xl" />
              </div>
              <span className="text-swiggy-orange text-2xl font-black tracking-tight">
                Swiggy
              </span>
            </div>
            <p className="text-swiggy-muted text-sm font-medium">
              © 2026 Swiggy Limited
            </p>
          </div>

          {/* Column 1: Company */}
          <div>
            <h3 className="text-swiggy-ink font-extrabold text-[16px] mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                'About Us',
                'Swiggy Corporate',
                'Careers',
                'Team',
                'Swiggy One',
                'Swiggy Instamart',
                'Swiggy Dineout',
                'Swiggy Genie',
                'Minis',
                'Pyng',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-swiggy-muted hover:text-swiggy-ink transition-colors duration-200 text-[15px] font-medium leading-relaxed"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Contact & Legal */}
          <div>
            <div className="mb-10">
              <h3 className="text-swiggy-ink font-extrabold text-[16px] mb-4">
                Contact us
              </h3>
              <ul className="space-y-3">
                {['Help & Support', 'Partner with us', 'Ride with us'].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-swiggy-muted hover:text-swiggy-ink transition-colors duration-200 text-[15px] font-medium leading-relaxed"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-swiggy-ink font-extrabold text-[16px] mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {[
                  'Terms & Conditions',
                  'Cookie Policy',
                  'Privacy Policy',
                  'Investor Relations',
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-swiggy-muted hover:text-swiggy-ink transition-colors duration-200 text-[15px] font-medium leading-relaxed"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Available In */}
          <div>
            <h3 className="text-swiggy-ink font-extrabold text-[16px] mb-4">
              Available in:
            </h3>
            <ul className="space-y-3 mb-6">
              {[
                'Bangalore',
                'Gurgaon',
                'Hyderabad',
                'Delhi',
                'Mumbai',
                'Pune',
              ].map((city) => (
                <li key={city}>
                  <Link
                    href="#"
                    className="text-swiggy-muted hover:text-swiggy-ink transition-colors duration-200 text-[15px] font-medium leading-relaxed"
                  >
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Cities Dropdown */}
            <div className="relative group">
              <button className="flex items-center justify-between w-full border border-gray-300 rounded-lg px-4 py-2 text-swiggy-muted font-semibold text-sm hover:border-gray-400 transition-colors">
                679 cities
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="h-4 w-4 ml-2 text-[10px]"
                />
              </button>
            </div>
          </div>

          {/* Column 4: Life at Swiggy & Socials */}
          <div>
            <div className="mb-10">
              <h3 className="text-swiggy-ink font-extrabold text-[16px] mb-4">
                Life at Swiggy
              </h3>
              <ul className="space-y-3">
                {['Explore with Swiggy', 'Swiggy News', 'Snackables'].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-swiggy-muted hover:text-swiggy-ink transition-colors duration-200 text-[15px] font-medium leading-relaxed"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-swiggy-ink font-extrabold text-[16px] mb-4">
                Social Links
              </h3>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-swiggy-ink hover:text-swiggy-orange transition-colors text-xl"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <Link
                  href="#"
                  className="text-swiggy-ink hover:text-swiggy-orange transition-colors text-xl"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
                <Link
                  href="#"
                  className="text-swiggy-ink hover:text-swiggy-orange transition-colors text-xl"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </Link>
                <Link
                  href="#"
                  className="text-swiggy-ink hover:text-swiggy-orange transition-colors text-xl"
                >
                  <FontAwesomeIcon icon={faPinterest} />
                </Link>
                <Link
                  href="#"
                  className="text-swiggy-ink hover:text-swiggy-orange transition-colors text-xl"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}