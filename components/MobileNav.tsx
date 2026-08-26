import Link from 'next/link';

export function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-lg z-50">
      <nav className="flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center gap-1 text-gray-600">
          <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
        </Link>
        <Link href="/pilgrim" className="flex flex-col items-center gap-1 text-gray-600">
          <span className="text-[10px] font-medium uppercase tracking-wider">Pilgrim</span>
        </Link>
        <Link href="/volunteer" className="flex flex-col items-center gap-1 text-gray-600">
          <span className="text-[10px] font-medium uppercase tracking-wider">Volunteer</span>
        </Link>
      </nav>
    </div>
  );
}
