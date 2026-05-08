import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChevronDown, faSearch, faArrowLeft, faArrowRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { restaurants, restaurants2 } from '../../data/restaurants';
import MenuSection from '../../components/MenuSection';

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  // Combine both arrays so we can find restaurants from either section
  const allRestaurants = [...restaurants, ...restaurants2];
  const restaurant: any = allRestaurants.find((r) => r.id.toString() === resolvedParams.id);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="bg-white min-h-screen text-swiggy-ink">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 mt-15">

        {/* Breadcrumbs */}
        <div className="text-[10px] sm:text-xs text-gray-500 mb-6 flex items-center gap-2 tracking-tight">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span>/</span>
          <span className="hover:text-gray-800 cursor-pointer">Kochi</span>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{restaurant.name}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6">{restaurant.name}</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6 px-2">
          <button className="pb-3 border-b-2 border-swiggy-orange font-bold text-gray-800">
            Order Online
          </button>
          <button className="pb-3 text-gray-500 font-semibold hover:text-gray-800">
            Dineout
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-b from-white to-gray-50 rounded-3xl p-4 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-200 mb-8 rounded-b-[2rem]">
          <div className="flex items-center gap-1 font-bold text-sm sm:text-base mb-1">
            <span className="bg-green-600 text-white rounded-full p-0.5 w-4 h-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faStar} className="text-[10px]" />
            </span>
            <span>{restaurant.rating} ({restaurant.ratingCount || '1K+'} ratings)</span>
            <span className="text-gray-400 mx-1">•</span>
            <span>{restaurant.costForTwo || '₹400'} for two</span>
          </div>

          <div className="text-swiggy-orange font-bold text-xs sm:text-sm mb-4 underline decoration-dashed underline-offset-4 cursor-pointer">
            {restaurant.cuisines || (restaurant.desc ? restaurant.desc.split('•')[0] : 'Various Cuisines')}
          </div>

          {/* Timeline */}
          <div className="flex flex-col gap-3 relative pl-4 mt-2">
            <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-gray-300"></div>
            <div className="absolute left-[1px] top-2 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="absolute left-[1px] bottom-2 w-1.5 h-1.5 rounded-full bg-gray-300"></div>

            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="font-bold text-gray-800">Outlet</span>
              <span className="text-gray-500">{restaurant.location || 'Kochi'}</span>
              <FontAwesomeIcon icon={faCaretDown} className="text-swiggy-orange text-xs cursor-pointer ml-1" />
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800">
              {restaurant.deliveryTime || '30-40 mins'}
            </div>
          </div>
        </div>

        {/* Deals for you */}
        {'deals' in restaurant && restaurant.deals && restaurant.deals.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight">Deals for you</h2>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
                  <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors">
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {restaurant.deals.map((deal: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4 border border-gray-200 rounded-2xl p-3 sm:p-4 min-w-[280px] sm:min-w-[300px] flex-shrink-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                  {/* Deal Icon shape based on index to mimic swiggy */}
                  <div className={`w-12 h-12 flex items-center justify-center font-bold text-[10px] sm:text-xs flex-shrink-0 text-white ${idx % 2 === 0 ? 'bg-blue-600 rounded-full' : 'bg-red-400 rounded-lg transform rotate-45'}`}>
                    <div className={idx % 2 !== 0 ? '-rotate-45' : ''}>
                      %
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-gray-800 text-sm sm:text-base tracking-tight">{deal.title}</span>
                    <span className="text-[10px] sm:text-[11px] text-gray-500 font-bold truncate tracking-widest mt-0.5">{deal.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu Separator */}
        <div className="flex items-center justify-center gap-3 text-gray-500 text-[10px] sm:text-xs tracking-[4px] font-bold my-8 sm:my-12">
          <span>~</span>
          <span>MENU</span>
          <span>~</span>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for dishes"
            className="w-full bg-gray-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none placeholder-gray-500 text-center"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button className="border border-gray-300 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-4 h-4 border border-green-600 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <div className="w-6 h-3.5 bg-gray-200 rounded-full relative">
              <div className="w-3 h-3 bg-white border border-gray-300 rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
            </div>
          </button>
          <button className="border border-gray-300 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-4 h-4 border border-red-600 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
            <div className="w-6 h-3.5 bg-gray-200 rounded-full relative">
              <div className="w-3 h-3 bg-white border border-gray-300 rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
            </div>
          </button>
          <button className="border border-gray-300 rounded-full px-4 py-1.5 text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
            Bestseller
          </button>
        </div>

        {/* Recommended Accordion */}
        {'menu' in restaurant && restaurant.menu && restaurant.menu.length > 0 ? (
          <MenuSection menu={restaurant.menu} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            Menu items coming soon!
          </div>
        )}
      </div>
    </div>
  );
}
