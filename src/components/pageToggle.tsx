// import { useRouter } from 'next/router';
import Link from 'next/link';

interface PageToggleProps {
  currentPage: 'patron' | 'artisan';
}

export const PageToggle = ({ currentPage }: PageToggleProps) => {
    
  return (
    <div className="inline-flex rounded-xl md:rounded-3xl border-2 md:border-4 border-[#115746] ">
      <Link href="/patrons">
        <button
          className={`px-2 md:px-6 py-2 md:py-3 text-[#000C19] text-md md:text-[20px] transition-all ${
            currentPage === 'patron'
              ? 'bg-[#FFD15C] font-bold rounded-l-xl md:rounded-l-[20px]'
              : 'font-bold'
          }`}
        >
          FOR PATRONS
        </button>
      </Link>
      <Link href="/artisans">
        <button
          className={`px-2 md:px-6 py-2 md:py-3 text-[#000C19] text-md md:text-[20px] transition-all ${
            currentPage === 'artisan'
              ? 'bg-[#FFD15C] font-bold rounded-r-xl md:rounded-r-[20px]'
              : 'font-bold'
          }`}
        >
          FOR ARTISANS
        </button>
      </Link>
    </div>
  );
};