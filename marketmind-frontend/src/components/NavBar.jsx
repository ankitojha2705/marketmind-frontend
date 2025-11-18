import React from 'react';

export default function NavBar({ current }) {
  const items = [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/campaigns/new', label: 'New Campaign', icon: '✨' },
    { to: '/calendar', label: 'Calendar', icon: '📅' },
    { to: '/library', label: 'Library', icon: '📚' },
    { to: '/settings', label: 'Settings', icon: '⚙️' },
  ]
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                MarketMind <span className="text-gray-700 dark:text-gray-300">AI Hub</span>
              </h1>
              <span className="ml-3 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                v0.1
              </span>
            </div>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {items.map((item) => (
              <a
                key={item.to}
                href={`#${item.to}`}
                className={`
                  ${current === item.to 
                    ? 'bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-400' 
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}
                  px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors duration-200
                `}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu" 
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-lg">
          {items.map((item) => (
            <a
              key={item.to}
              href={`#${item.to}`}
              className={`
                ${current === item.to 
                  ? 'bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-400' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}
                block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2
              `}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}