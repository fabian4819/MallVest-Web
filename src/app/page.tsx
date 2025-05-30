"use client";
import StepOneConnectWallet from "@/components/StepOneConnectWallet";
import StepThreeHotelTokenization from "@/components/StepThreeHotelTokenization";
import StepTwoHotelRegistry from "@/components/StepTwoHotelRegistry";
import { HotelRegistryProvider } from "@/context/HotelRegistryContext";
import { HotelTokenizationProvider } from "@/context/HotelTokenizationContext";
import { useState } from "react";

export default function Home() {
  const [openStepOne, setOpenStepOne] = useState(false);
  const [openStepTwo, setOpenStepTwo] = useState(false);
  const [openStepThree, setOpenStepThree] = useState(false);

  const toggleStepOne = () => {
    setOpenStepOne(!openStepOne);
  };

  const toggleStepTwo = () => {
    setOpenStepTwo(!openStepTwo);
  };

  const toggleStepThree = () => {
    setOpenStepThree(!openStepThree);
  };

  return (
    <div className="flex flex-col bg-black p-4 min-h-screen">
      <p>Steps are Clickable! Please click to open!</p>

      <p className="w-fit cursor-pointer" onClick={toggleStepOne}>
        Step 1: Connect Wallet {openStepOne ? "[-]" : "[+]"}
      </p>
      <div
        className={`overflow-hidden duration-500 ease-in-out transition-all ${
          openStepOne ? "max-h-[200vh]" : "max-h-0"
        }`}
      >
        <StepOneConnectWallet />
      </div>

      <p className="w-fit cursor-pointer" onClick={toggleStepTwo}>
        Step 2: Register Hotel {openStepTwo ? "[-]" : "[+]"}
      </p>
      <div
        className={`overflow-hidden duration-500 ease-in-out transition-all ${
          openStepTwo ? "max-h-[200vh]" : "max-h-0"
        }`}
      >
        <HotelRegistryProvider>
          <StepTwoHotelRegistry />
        </HotelRegistryProvider>
      </div>

      <p className="w-fit cursor-pointer" onClick={toggleStepThree}>
        Step 3: Tokenized Hotel {openStepThree ? "[-]" : "[+]"}
      </p>
      <div
        className={`overflow-hidden duration-500 ease-in-out transition-all ${
          openStepThree ? "max-h-[200vh]" : "max-h-0"
        }`}
      >
        <HotelTokenizationProvider>
          <StepThreeHotelTokenization />
        </HotelTokenizationProvider>
      </div>
    </div>
  );
}
