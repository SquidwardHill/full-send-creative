import { useState } from 'react';

const navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 2, text: 'About', href:'/about' },
    { id: 3, text: 'Resume', href:'/resume' },
    { id: 4, text: 'sydneyehill@gmail.com', href:'mailto:sydneyehill@gmail.com' },
    { id: 5, text: '<>', href:'https://www.linkedin.com/in/sydneyhill/' },
    { id: 6, text: '<>', href:'https://github.com/sydneyhill' },
  ];

  return (
    <div className='flex justify-between items-center min-h-32 max-w-screen-xl mx-auto px-4 text-cream-200'>
      {/* Logo */}
      <h1 className='w-full text-3xl'><a href="/">💗</a></h1>

      {/* Desktop Navigation */}
      <div className='hidden md:flex'>
        {navItems.map(item => (
          <a
            href={item.href}
            key={item.id}
            className='p-4 hover:text-bubblegum rounded-xl m-2 cursor-pointer duration-300'
          >
            {item.text}
          </a>
        ))}
      </div>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? 'x' : '+' }
        {/* {nav ? <xMarkIcon size={20} /> : <MenuIcon size={20} />} */}
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold m-4'>💗</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <a
            key={item.id}
            className='p-4 border-b rounded-xl hover:text-bubblegum duration-300 cursor-pointer'
          >
            {item.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default navbar;