import Link from 'next/link';

export function Header() {
  return (
    <header className="p-4 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between sticky top-0 z-50">
      <Link href="/" className="font-bold text-xl text-blue-600">CrowdGrid</Link>
      <nav className="hidden md:flex gap-6">
        <Link href="/pilgrim" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Pilgrim</Link>
        <Link href="/gathering" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Gathering</Link>
        <Link href="/corporate" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Corporate</Link>
        <Link href="/volunteer" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Volunteer</Link>
      </nav>
      <div className="hidden md:block">
        <Link href="/login" className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">Login</Link>
      </div>
    </header>
  );
}
