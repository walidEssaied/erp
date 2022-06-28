import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');


  const [t, i18n] = useTranslation()

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div className={`${pathname.includes('login') ? 'hidden' : ''}`}>
      {/* Sidebar backdrop (mobile only) */}
      <div className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true"></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={` ${i18n.language == "fr" ? "'flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out'" : "'flex flex-col absolute z-40 -right-52 top-0 lg:static lg:right-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out'"}  ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}
      >

        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <div className="flex items-center gap-x-3">
              {/* <svg width="32" height="32" viewBox="0 0 32 32">
              
            </svg> */}
              <img src="https://raw.githubusercontent.com/walidEssaied/erp/1f27ed3d8bfa8c81a1fa9bad951051e94b9d6ead/src/images/bold-icon.svg" className="w-7 h-7" viewBox="0 0 32 32" alt="Bold " />
              <span className="text-gray-200 text-lg font-bold hidden md:block uppercase">
                Bold entreprise
              </span>
            </div>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
              <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">•••</span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">{t('admin_panel')}</span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname === '/' && 'bg-slate-900'}`}>
                <NavLink end to="/" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname === '/' && 'hover:text-slate-200'}`}>
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current text-slate-400 ${pathname === '/' && '!text-indigo-500'}`} d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                      <path className={`fill-current text-slate-600 ${pathname === '/' && 'text-indigo-600'}`} d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z" />
                      <path className={`fill-current text-slate-400 ${pathname === '/' && 'text-indigo-200'}`} d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">{t('menu-dash')}</span>
                  </div>
                </NavLink>
              </li>
              {/* Clients */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('clients') && 'bg-slate-900'}`}>
                <NavLink end to="/clients" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('Clients') && 'hover:text-slate-200'}`}>
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current text-slate-600 ${pathname.includes('clients') && 'text-indigo-500'}`} d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z" />
                      <path className={`fill-current text-slate-400 ${pathname.includes('clients') && 'text-indigo-300'}`} d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">{t('menu-client')}</span>
                  </div>
                </NavLink>
              </li>
              {/* Order */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('orders') && 'bg-slate-900'}`}>
                <NavLink end to="/orders" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('orders') && 'hover:text-slate-200'}`}>
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current text-slate-600 ${pathname.includes('orders') && 'text-indigo-500'}`} d="M0 20h24v2H0z" />
                      <path className={`fill-current text-slate-400 ${pathname.includes('orders') && 'text-indigo-300'}`} d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">{t('menu-order')}</span>
                  </div>
                </NavLink>
              </li>
              {/* Products */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('products') && 'bg-slate-900'}`}>
                <NavLink end to="/products" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('products') && 'hover:text-slate-200'}`}>
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <circle className={`fill-current text-slate-400 ${pathname.includes('products') && 'text-indigo-300'}`} cx="18.5" cy="5.5" r="4.5" />
                      <circle className={`fill-current text-slate-600 ${pathname.includes('products') && 'text-indigo-500'}`} cx="5.5" cy="5.5" r="4.5" />
                      <circle className={`fill-current text-slate-600 ${pathname.includes('products') && 'text-indigo-500'}`} cx="18.5" cy="18.5" r="4.5" />
                      <circle className={`fill-current text-slate-400 ${pathname.includes('products') && 'text-indigo-300'}`} cx="5.5" cy="18.5" r="4.5" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">{t('menu-produit')}</span>
                  </div>
                </NavLink>
              </li>
              {/* Conteneurs */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('conteneurs') && 'bg-slate-900'}`}>
                <NavLink end to="/conteneurs" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('conteneurs') && 'hover:text-slate-200'}`}>
                  <div className="flex items-center">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve" width={"10%"}>
        <path className={`fill-current text-slate-400 ${pathname.includes('conteneurs') && 'text-indigo-500'}`} d="M478.13,478.555H33.87c-13.072,0-23.67-10.597-23.67-23.67V238.237
	c0-13.073,10.598-24.067,23.67-24.067h444.26c13.073,0,23.67,10.995,23.67,24.067v216.647
	C501.801,467.958,491.203,478.555,478.13,478.555z" />
        <g>
          <path className={`fill-current text-slate-400 ${pathname.includes('conteneurs') && 'text-indigo-500'}`} style={{fill: '#ffff'}} d="M478.13,203.97h-16.107v-3.259c0-15.747-12.811-28.558-28.558-28.558s-28.558,12.811-28.558,28.558
		v3.259H107.092v-3.259c0-3.325-0.577-6.516-1.626-9.486l123.892-45.886c7.378,6.524,17.063,10.496,27.663,10.496
		c12.869,0,24.395-5.847,32.072-15.021l60.754,26.415c1.325,0.575,2.704,0.849,4.061,0.849c3.937,0,7.688-2.294,9.359-6.135
		c2.246-5.166-0.121-11.174-5.287-13.42l-59.994-26.084c0.558-2.72,0.852-5.536,0.852-8.418c0-19.541-13.473-35.995-31.618-40.559
		V33.445c0-5.633-4.567-10.199-10.199-10.199c-5.633,0-10.199,4.566-10.199,10.199v48.956c0,5.633,4.566,10.199,10.199,10.199
		c11.782,0,21.369,9.564,21.414,21.337l-14.288-6.212c-5.165-2.245-11.174,0.122-13.42,5.287c-2.246,5.166,0.121,11.174,5.287,13.42
		l12.688,5.517c-3.363,2.199-7.371,3.489-11.68,3.489c-11.811,0-21.418-9.608-21.418-21.418c0-5.633-4.566-10.199-10.199-10.199
		s-10.199,4.566-10.199,10.199c0,4.881,0.849,9.566,2.393,13.924L90.772,174.915c-3.711-1.768-7.861-2.761-12.238-2.761
		c-15.747,0-28.558,12.811-28.558,28.558v3.259H33.87C15.194,203.97,0,219.342,0,238.236v216.648c0,18.676,15.194,33.87,33.87,33.87
		h444.261c18.676,0,33.869-15.194,33.869-33.87V238.236C512,219.342,496.806,203.97,478.13,203.97z M425.307,200.712
		c0-4.499,3.66-8.159,8.159-8.159c4.499,0,8.159,3.659,8.159,8.159v3.259h-16.319V200.712z M70.375,200.712
		c0-4.499,3.66-8.159,8.159-8.159s8.159,3.659,8.159,8.159v3.259H70.375V200.712z M478.13,224.368
		c7.302,0,13.471,6.351,13.471,13.868v216.648c0,7.428-6.043,13.471-13.471,13.471H33.87c-7.428,0-13.471-6.043-13.471-13.471
		V238.236c0-7.518,6.168-13.868,13.471-13.868H478.13z" />
          <path style={{fill: '#4D3D36'}} d="M93.323,253.238c-5.633,0-10.199,4.566-10.199,10.199v166.247c0,5.633,4.566,10.199,10.199,10.199
		c5.633,0,10.199-4.566,10.199-10.199V263.437C103.522,257.804,98.956,253.238,93.323,253.238z" />
          <path style={{fill: '#4D3D36'}} d="M173.896,253.238c-5.633,0-10.199,4.566-10.199,10.199v166.247c0,5.633,4.566,10.199,10.199,10.199
		c5.633,0,10.199-4.566,10.199-10.199V263.437C184.096,257.804,179.529,253.238,173.896,253.238z" />
          <path style={{fill: '#4D3D36'}} d="M255.49,253.238c-5.633,0-10.199,4.566-10.199,10.199v166.247c0,5.633,4.566,10.199,10.199,10.199
		c5.632,0,10.199-4.566,10.199-10.199V263.437C265.689,257.804,261.122,253.238,255.49,253.238z" />
          <path style={{fill: '#4D3D36'}} d="M337.084,253.238c-5.632,0-10.199,4.566-10.199,10.199v166.247c0,5.633,4.567,10.199,10.199,10.199
		c5.632,0,10.199-4.566,10.199-10.199V263.437C347.283,257.804,342.716,253.238,337.084,253.238z" />
          <path style={{fill: '#4D3D36'}} d="M418.677,253.238c-5.632,0-10.199,4.566-10.199,10.199v166.247c0,5.633,4.567,10.199,10.199,10.199
		c5.632,0,10.199-4.566,10.199-10.199V263.437C428.876,257.804,424.309,253.238,418.677,253.238z" />
          <path style={{fill: '#4D3D36'}} d="M379.437,179.473l7.068,3.061c1.321,0.572,2.695,0.842,4.048,0.842c3.942,0,7.697-2.3,9.365-6.148
		c2.238-5.169-0.138-11.174-5.307-13.412l-7.068-3.061c-5.167-2.24-11.172,0.136-13.412,5.306
		C371.893,171.23,374.268,177.236,379.437,179.473z" />
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
      </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Conteneurs</span>
                  </div>
                </NavLink>
              </li>
              {/* Chambre froid */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('chambre') && 'bg-slate-900'}`}>
                <NavLink end to="/chambre-froids" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('chambres') && 'hover:text-slate-200'}`}>
                  <div className="flex items-center">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{enableBackground: 'new 0 0 512 512'}} xmlSpace="preserve" width={"10%"}>
        <polygon className={`fill-current text-slate-400 ${pathname.includes('chambre') && 'text-indigo-500'}`} points="95.803,0 95.803,461.465 124.109,461.465 124.109,512 387.895,512 387.895,461.465 
	416.202,461.465 416.202,0 " />
        <rect x="95.798" className={`fill-current text-slate-400 ${pathname.includes('chambre') && 'text-indigo-500'}`} width="160.193" height="461.469" />
        <g>
          <polygon className={`fill-current text-slate-400 ${pathname.includes('chambre') && 'text-indigo-500'}`} points="271.676,461.465 271.676,0 240.329,0 240.329,461.465 124.109,461.465 124.109,512 
		387.895,512 387.895,461.465 	" />
          <rect x="294.224" y="67.808" className={`fill-current text-white ${pathname.includes('chambre') && 'text-indigo-100'}`} width="31.347" height="338.787" />
          <rect x="186.433" y="67.808" className={`fill-current text-white ${pathname.includes('chambre') && 'text-indigo-100'}`} width="31.347" height="338.787" />
        </g>
        <rect x="124.105" y="461.469" className={`fill-current text-green ${pathname.includes('chambre') && 'text-indigo-500'}`} width="131.897" height="50.531" />
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
      </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Chambre froid</span>
                  </div>
                </NavLink>
              </li>
              {/* Tasks */}
              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('tasks') && 'bg-slate-900'}`}>
                <NavLink end to="/tasks" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('tasks') && 'hover:text-slate-200'}`}>
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path className={`fill-current text-slate-600 ${pathname.includes('tasks') && 'text-indigo-500'}`} d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z" />
                      <path className={`fill-current text-slate-600 ${pathname.includes('tasks') && 'text-indigo-500'}`} d="M1 1h22v23H1z" />
                      <path className={`fill-current text-slate-400 ${pathname.includes('tasks') && 'text-indigo-300'}`} d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z" />
                    </svg>
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">{t('menu-tache')}</span>
                  </div>
                </NavLink>
              </li>
              {/* Settings */}
              <SidebarLinkGroup activecondition={pathname.includes('settings')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a href="#0" className={`block text-slate-200 hover:text-white truncate transition duration-150 ${pathname.includes('settings') && 'hover:text-slate-200'}`} onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleClick() : setSidebarExpanded(true) }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                              <path className={`fill-current text-slate-600 ${pathname.includes('settings') && 'text-indigo-500'}`} d="M19.714 14.7l-7.007 7.007-1.414-1.414 7.007-7.007c-.195-.4-.298-.84-.3-1.286a3 3 0 113 3 2.969 2.969 0 01-1.286-.3z" />
                              <path className={`fill-current text-slate-400 ${pathname.includes('settings') && 'text-indigo-300'}`} d="M10.714 18.3c.4-.195.84-.298 1.286-.3a3 3 0 11-3 3c.002-.446.105-.885.3-1.286l-6.007-6.007 1.414-1.414 6.007 6.007z" />
                              <path className={`fill-current text-slate-600 ${pathname.includes('settings') && 'text-indigo-500'}`} d="M5.7 10.714c.195.4.298.84.3 1.286a3 3 0 11-3-3c.446.002.885.105 1.286.3l7.007-7.007 1.414 1.414L5.7 10.714z" />
                              <path className={`fill-current text-slate-400 ${pathname.includes('settings') && 'text-indigo-300'}`} d="M19.707 9.292a3.012 3.012 0 00-1.415 1.415L13.286 5.7c-.4.195-.84.298-1.286.3a3 3 0 113-3 2.969 2.969 0 01-.3 1.286l5.007 5.006z" />
                            </svg>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">{t('menu-setting')}</span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'transform rotate-180'}`} viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Plans</span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Billing & Invoices</span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink end to="/" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Give Feedback</span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;