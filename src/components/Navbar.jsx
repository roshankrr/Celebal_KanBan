import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdOutlineLogin, MdOutlineLogout, MdSettings } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useClerk, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, setScreenSize, screenSize } = useStateContext();
  const { signOut, openSignIn, openUserProfile } = useClerk();
  const { user } = useUser();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      
      <div className="flex items-center gap-3">
        <SignedIn>
          {/* User Profile Section */}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm hidden md:block">
              Welcome, {user?.firstName || 'User'}
            </span>
            
            {/* Settings Button */}
            <TooltipComponent content="Settings" position="BottomCenter">
              <button
                type="button"
                onClick={() => openUserProfile()}
                className="relative text-lg rounded-full p-2 hover:bg-light-gray text-gray-600 hover:text-gray-800 transition-colors"
                style={{ color: currentColor }}
              >
                <MdSettings />
              </button>
            </TooltipComponent>

            {/* Clerk UserButton (shows avatar and dropdown) */}
            <div className="flex items-center">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "shadow-lg",
                  }
                }}
                showName={false}
                afterSignOutUrl="/"
              />
            </div>

            {/* Sign Out Button */}
            <TooltipComponent content="Sign Out" position="BottomCenter">
              <button
                type="button"
                onClick={() => signOut()}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
              >
                <MdOutlineLogout className="text-lg" />
                <span className="hidden md:block">Sign Out</span>
              </button>
            </TooltipComponent>
          </div>
        </SignedIn>
        
        <SignedOut>
          {/* Sign In Button */}
          <TooltipComponent content="Sign In" position="BottomCenter">
            <button
              type="button"
              onClick={() => openSignIn()}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
            >
              <MdOutlineLogin className="text-lg" />
              <span>Sign In</span>
            </button>
          </TooltipComponent>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;

