import React from "react";

import { Button, Image } from "@nextui-org/react";
import { hankenGrotesk, rethinkSans, urbanist } from "@/utils";

import { IoIosArrowRoundForward } from "react-icons/io";
import { PiArrowRight } from "react-icons/pi";

const Header = () => {
  return (
    <header className="flex justify-center w-full h-auto py-2 px-8 bg-transparent z-10">
      <div className="flex justify-center w-full max-w-7xl">
        <div className="w-fit">
          <Image
            removeWrapper
            radius="none"
            src="/assets/WA-logo.png"
            alt="Work Ambitions Logo"
            className="bg-transparent"
            width={140}
          />
        </div>
        {/* <div className="p-2">
          <Button
            endContent={
              <IoIosArrowRoundForward
                color="white"
                className="group-hover:translate-x-1 duration-150 size-4 sm:size-5"
              />
            }
            className={`${hankenGrotesk.className} flex gap-2 px-4 py-2 rounded-lg bg-[#A94A9C] text-white outline-none group`}
          >
            
            Join Waiting List
          </Button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
