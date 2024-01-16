import React, { useState } from "react";
import { Link } from "react-router-dom";

//icons & images
import onePortLogo from "assets/logos/oneport-logo.svg";
import twitter from "assets/icons/twitter.svg";
import facebook from "assets/icons/facebook.svg";
import instagram from "assets/icons/instagram.svg";

import chevronUp from "assets/dock/chevronup.svg";

const Products = () => (
  <>
    <Link className="sato cursor-pointer" to="/services/ocean-freight">
      Ocean Freight
    </Link>
    <Link className="sato cursor-pointer" to="/services/air-freight">
      Air Freight
    </Link>
    <Link className="sato cursor-pointer" to="/services/inland-logistics">
      Land Logistics
    </Link>
    <Link className="sato cursor-pointer" to="/services/custom-brokerage">
      Custom Brokerage
    </Link>
    {/* <p className="sato">
      Warehousing
    </p>
    <p className="sato">
      Cargo Insurance
    </p>
    <p className="sato">
      Tracking and Monitoring
    </p> */}
  </>
);
const Legal = () => (
  <>
    <p className="sato">
      Privacy - End users
    </p>
    <p className="sato">
      Developers policy
    </p>
    <p className="sato">
      Terms
    </p>
    <p className="sato">
      Cookies
    </p>
    <p className="sato">
      Security
    </p>
  </>
);
const Help = () => (
  <>
    <Link className="sato cursor-pointer"  to="https://oneport365.teamtailor.com/" target="_blank" rel="noopener noreferrer">
      Careers
    </Link>
    <Link className="sato cursor-pointer" to="/contact#faq">
      FAQs
    </Link>
    <p className="sato">
      Blog
    </p>
    <p className="sato">
      Videos and Webinars
    </p>
    <p className="sato">
      Help Center
    </p>
    {/* <p className="sato">
      Documentation
    </p> */}
    <p className="sato">
      API Reference
    </p>
  </>
);

const Footer = () => {
  const [showProducts, setShowProducts] = useState<boolean>(false);
  const [showLegal, setShowLegal] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  return (
    <>
      <div className="bg-[#10170F] pt-20 pb-14 border-solid border-b-[1px] border-[#4B5563]">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="flex flex-col gap-x-1 lg:gap-x-0 gap-y-8 lg:items-center lg:gap-y-0 lg:flex-row lg:justify-between">
            <div>
              <p className="text-3xl text-[#ffffffbf] font-medium sato">
                Get notified on any updates
              </p>
              <p className="text-lg text-[#ffffff80] font-light sato">
                Stay up to date on announcements, offers and new products
              </p>
            </div>
            <div className="flex flex-col gap-y-6 md:gap-y-0 md:flex-row items-center gap-x-6 font-medium">
              <input
                type="text"
                className="subscribe-border py-4 px-8 max-h-[51px] bg-transparent rounded text-white w-full md:w-[372px] text-xl"
                placeholder="Enter your email address"
              />
              <button className="text-white w-full md:w-fit bg-dark-grey py-4 px-8 rounded max-h-[51px]">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#10170F] pt-[72px] pb-[120px]">
        <div className="max-w-[1200px] mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 text-[#ffffff80] font-light text-base">
            <div>
              <div className="mb-12 h-[35px] max-h-[35px]">
                <img src={onePortLogo} alt="" />
              </div>
              <div className="grid grid-cols-2 gap-y-6 font-light lg:grid-cols-1">
                <div>
                  <p className="mb-6 sato">eCommerce</p>
                  <p className="sato">High Value Goods</p>
                </div>
                <div>
                  <p className="mb-6 sato">Global Brands</p>
                  <p className="sato">Nonprofits</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-20 md:gap-y-12 lg:col-span-3 md:grid-cols-3 lg:mt-0 lg:gap-y-0">
              <div>
                <p
                  className="text-[#ffffffbf] text-xl mb-6 md:mb-12 h-[35px] max-h-[35px] flex justify-between items-center cursor-pointer md:cursor-default"
                  onClick={() => setShowProducts(!showProducts)}
                >
                  <span className="font-medium sato">Products</span>
                  <span className="md:hidden">
                    <img
                      className={`${showProducts ? "" : "rotate-180"} `}
                      src={chevronUp}
                      alt=""
                    />
                  </span>
                </p>
                <div className="flex-col gap-y-6 font-light hidden md:flex">
                  <Products />
                </div>
                <div className="flex flex-col gap-y-6 font-light mb-12 md:hidden">
                  {showProducts && <Products />}
                </div>
              </div>
              <div>
                <p
                  className="text-[#ffffffbf] text-xl mb-6 md:mb-12 h-[35px] max-h-[35px] flex justify-between items-center cursor-pointer md:cursor-default"
                  onClick={() => setShowLegal(!showLegal)}
                >
                  <span className="font-medium sato">Legal</span>
                  <span className="md:hidden">
                    <img
                      className={`${showLegal ? "" : "rotate-180"} `}
                      src={chevronUp}
                      alt=""
                    />
                  </span>
                </p>
                <div className="flex-col gap-y-6 font-light hidden md:flex">
                  <Legal />
                </div>
                <div className="flex flex-col gap-y-6 font-light mb-12 md:hidden">
                  {showLegal && <Legal />}
                </div>
              </div>
              <div>
                <p
                  className="text-[#ffffffbf] text-xl mb-6 md:mb-12 h-[35px] max-h-[35px] flex justify-between items-center cursor-pointer md:cursor-default"
                  onClick={() => setShowHelp(!showHelp)}
                >
                  <span className="font-medium sato">Help & Resources</span>
                  <span className="md:hidden">
                    <img
                      className={`${showHelp ? "" : "rotate-180"} `}
                      src={chevronUp}
                      alt=""
                    />
                  </span>
                </p>
                <div className="flex-col gap-y-6 font-light hidden md:flex">
                  <Help />
                </div>
                <div className="flex flex-col gap-y-6 font-light md:hidden">
                  {showHelp && <Help />}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[120px] flex flex-col gap-y-8 md:gap-y-0 md:flex-row justify-between pt-10 md:pt-0 border-t-[1px] border-solid border-[#344336] md:border-none">
            <p className="text-[#ffffff80] font-light sato">
              2022 Oneport365 Inc. All Rights Reserved
            </p>
            <div className="flex items-center gap-x-6">
              <a href="https://twitter.com/OnePort365" target="_blank">
                <img src={twitter} alt="twitter" />
              </a>
              <a href="https://web.facebook.com/oneport365/?_rdc=1&_rdr" target="_blank">
                <img src={facebook} alt="facebook" />
              </a>
              <a href="https://www.instagram.com/oneport365/" target="_blank">
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
