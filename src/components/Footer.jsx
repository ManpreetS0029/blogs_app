import React from 'react';

const Footer = () => {
  return (
    <>
      <div className="mx-auto mt-12 max-w-7xl border-t">
        <footer className="px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="mt-4 grow md:ml-12 md:mt-0">
              <p className="text-base font-semibold text-gray-700">
                © {new Date().getFullYear()} All Rights Reserved
              </p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700">
                About Us
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lacinia quis vel eros donec.
              </p>
            </div>
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700">Links</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
