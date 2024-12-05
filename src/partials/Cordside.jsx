import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";

function Cordside({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === "true");

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <NavLink end to="/" className="block">
            <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
              <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716ZM14.8 26.24v5.716C6.92 31.372.63 25.08.044 17.2H5.76a9.04 9.04 0 0 1 9.04 9.04Zm11.44-9.04h5.716c-.584 7.88-6.876 14.172-14.756 14.756V26.24a9.04 9.04 0 0 1 9.04-9.04ZM.044 14.8C.63 6.92 6.92.628 14.8.044V5.76a9.04 9.04 0 0 1-9.04 9.04H.044Z" />
            </svg>
          </NavLink>
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white dark:bg-gray-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} ${variant === 'v2' ? 'border-r border-gray-200 dark:border-gray-700/60' : 'rounded-r-2xl shadow-sm'}`}
      >
        {/* Links */}
        <div className="space-y-8">
  {/* Pages group */}
  <div>
    <h3 className="text-xs uppercase text-gray-400 dark:text-gray-500 font-semibold pl-3">
      <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
        •••
      </span>
      <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Coordinator</span>
    </h3>
    <ul className="mt-3">
      {/* Dashboard */}
      <SidebarLinkGroup activecondition={pathname === "/" || pathname.includes("Coodashboard")}>
        {(handleClick, open) => (
          <>
            <NavLink
              to="/Coodashboard"
              className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                pathname === "/" || pathname.includes("dashboard") ? "" : "hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => setSidebarExpanded(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className={`shrink-0 fill-current ${
                      pathname === "/" || pathname.includes("Coodashboard") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.936.278A7.983 7.983 0 0 1 8 0a8 8 0 1 1-8 8c0-.722.104-1.413.278-2.064a1 1 0 1 1 1.932.516A5.99 5.99 0 0 0 2 8a6 6 0 1 0 6-6c-.53 0-1.045.076-1.548.21A1 1 0 1 1 5.936.278Z" />
                    <path d="M6.068 7.482A2.003 2.003 0 0 0 8 10a2 2 0 1 0-.518-3.932L3.707 2.293a1 1 0 0 0-1.414 1.414l3.775 3.775Z" />
                  </svg>
                  <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Coodashboard
                  </span>
                </div>
              </div>
            </NavLink>
          </>
        )}
      </SidebarLinkGroup>

      {/* Appointment */}
      <SidebarLinkGroup activecondition={pathname.includes("Appointment")}>
        {(handleClick, open) => (
          <>
            <NavLink
              to="/Appointment"
              className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                pathname.includes("appointment") ? "" : "hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => setSidebarExpanded(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className={`shrink-0 fill-current ${
                      pathname.includes("appointment") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12 1a1 1 0 1 0-2 0v2a3 3 0 0 0 3 3h2a1 1 0 1 0 0-2h-2a1 1 0 0 1-1-1V1ZM1 10a1 1 0 1 0 0 2h2a1 1 0 0 1 1 1v2a1 1 0 1 0 2 0v-2a3 3 0 0 0-3-3H1ZM5 0a1 1 0 0 1 1 1v2a3 3 0 0 1-3 3H1a1 1 0 0 1 0-2h2a1 1 0 0 0 1-1V1a1 1 0 0 1 1-1ZM12 13a1 1 0 0 1 1-1h2a1 1 0 1 0 0-2h-2a3 3 0 0 0-3 3v2a1 1 0 1 0 2 0v-2Z" />
                  </svg>
                  <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Appointment
                  </span>
                </div>
              </div>
            </NavLink>
          </>
        )}
      </SidebarLinkGroup>

      {/* Payment */}
      <SidebarLinkGroup activecondition={pathname.includes("Payment")}>
        {(handleClick, open) => (
          <>
            <NavLink
              to="/Payment"
              className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                pathname.includes("payment") ? "" : "hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => setSidebarExpanded(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className={`shrink-0 fill-current ${
                      pathname.includes("payment") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 0a6 6 0 0 0-6 6c0 1.077.304 2.062.78 2.912a1 1 0 1 0 1.745-.976A3.945 3.945 0 0 1 2 6a4 4 0 0 1 4-4c.693 0 1.344.194 1.936.525A1 1 0 1 0 8.912.779 5.944 5.944 0 0 0 6 0Z" />
                    <path d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm-4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
                  </svg>
                  <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Payment
                  </span>
                </div>
              </div>
            </NavLink>
          </>
        )}
      </SidebarLinkGroup>

      {/* Feedback */}
      <SidebarLinkGroup activecondition={pathname.includes("Feedback")}>
        {(handleClick, open) => (
          <>
            <NavLink
              to="/Feedback"
              className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 ${
                pathname.includes("feedback") ? "" : "hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => setSidebarExpanded(true)}
              aria-expanded={open}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    className={`shrink-0 fill-current ${
                      pathname.includes("feedback") ? "text-violet-500" : "text-gray-400 dark:text-gray-500"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.753 2.659a1 1 0 0 0-1.506-1.317L2.451 4.537l-.744-.744A1 1 0 1 0 .293 5.207l1.5 1.5a1 1 0 0 0 1.46-.048l3.5-4ZM6.753 10.659a1 1 0 1 0-1.506-1.317l-2.796 3.195-.744-.744A1 1 0 0 0 .293 12.707l1.5 1.5a1 1 0 0 0 1.46-.048l3.5-4ZM13.5 5a1 1 0 1 0 0-2h-4a1 1 0 0 0 0 2h4Zm-3 4a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2 4a1 1 0 1 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z" />
                  </svg>
                  <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                    Feedback
                  </span>
                </div>
              </div>
            </NavLink>
          </>
        )}
      </SidebarLinkGroup>
    </ul>
  </div>
</div>

          <div>
          </div>
        </div>
      </div>
    
  );
}

export default Cordside;
