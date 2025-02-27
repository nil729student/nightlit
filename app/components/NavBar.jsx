"use client";
import { useState } from 'react';
import Link from 'next/link';
import LogoutButton from './loginComponents/LogoutButton';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'

export function NavBar() {
    const { data: session } = useSession();
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    const toggleUserDropdown = () => setIsUserDropdownOpen((prev) => !prev);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    const isActive = (path) => pathname === path ? 'border-b-2 border-blue-500' : '';

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3">
                    <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                        NightLit
                    </span>
                </Link>

                {/* Botón de menú móvil (visible solo en pantallas pequeñas) */}
                <div className="flex md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        type="button"
                        className="inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="mobile-menu"
                        aria-expanded={isMobileMenuOpen ? "true" : "false"}
                    >
                        <span className="sr-only">Abrir menú principal</span>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Menú de navegación (visible en pantallas medianas en adelante) */}
                <div className="hidden md:flex md:items-center md:space-x-4">
                    <Link href="/" className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${isActive('/')}`}>
                        Feed
                    </Link>

                    <Link href="/about" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ${isActive('/feed')}`}>
                        Abaout Us & Contact
                    </Link>
                    {session && (
                        <>
                            <Link href="/profile" className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${isActive('/profile')}`}>
                                Profile
                            </Link>
                            {session.user.role === 'OWNER' && (
                                <Link href="/club" className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${isActive('/club')}`}>
                                    Your Club
                                </Link>
                            )}
                            {session.user.role === 'ADMIN' && (
                                <Link href="/admin" className={`px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${isActive('/admin')}`}>
                                    Control Panel
                                </Link>
                            )}
                        </>
                    )}
                </div>

                {/* Menú del usuario */}
                <div className="relative">
                    <button
                        onClick={toggleUserDropdown}
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                        aria-expanded={isUserDropdownOpen ? "true" : "false"}
                    >
                        <span className="sr-only">Abrir menú de usuario</span>
                        <img
                            className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 border-green-400  border-2"
                            src={session ? session.user.image : '/uploads/usersProfileImages/default.png'}
                            alt="Foto de perfil"
                        />
                    </button>
                    {isUserDropdownOpen && (
                        <div
                            className="absolute right-0 mt-2 w-48 bg-white rounded shadow divide-y divide-gray-100 dark:bg-gray-700 z-50 transition ease-out duration-200"
                        >
                            <div className="px-4 py-3">
                                {session ? (
                                    <>
                                        <span className="block text-sm text-gray-900 dark:text-white">
                                            {session.user.name || 'Usuario'}
                                        </span>
                                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                                            {session.user.email}
                                        </span>
                                    </>
                                ) : (
                                    <span className="block text-sm text-gray-900 dark:text-white">Guest</span>
                                )}
                            </div>
                            <ul className="py-1">
                                {session ? (
                                    <>
                                        {session.user.role === 'OWNER' && (
                                            <li>
                                                <Link href="/club" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ${isActive('/club')}`}>
                                                    Your Club
                                                </Link>
                                            </li>
                                        )}
                                        {session.user.role === 'ADMIN' && (
                                            <li>
                                                <Link href="/admin" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ${isActive('/admin')}`}>
                                                    Control Panel
                                                </Link>
                                            </li>
                                        )}
                                        <li>
                                            <Link href="/" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ${isActive('/feed')}`}>
                                                Feed
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/about" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ${isActive('/feed')}`}>
                                                Abaout Us & Contact
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/profile" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ${isActive('/profile')}`}>
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <LogoutButton />
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link href="/login" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ${isActive('/login')}`}>
                                            Login
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Menú móvil (visible solo en pantallas pequeñas) */}
            {isMobileMenuOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <ul className="px-2 pt-2 pb-3 space-y-1">
                        <li>
                            <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive('/')}`}>
                                Feed
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ${isActive('/feed')}`}>
                                Abaout Us & Contact
                            </Link>
                        </li>
                        {session ? (
                            <>
                                <li>
                                    <Link href="/feed" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive('/feed')}`}>
                                        Feed
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 ${isActive('/feed')}`}>
                                        Abaout Us & Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/profile" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive('/profile')}`}>
                                        Profile
                                    </Link>
                                </li>
                                {session.user.role === 'OWNER' && (
                                    <li>
                                        <Link href="/club" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive('/club')}`}>
                                            Your Club
                                        </Link>
                                    </li>
                                )}
                                {session.user.role === 'ADMIN' && (
                                    <li>
                                        <Link href="/admin" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive('/admin')}`}>
                                            Control Panel
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <LogoutButton />
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link href="/login" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive('/login')}`}>
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}
