"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Contract } from "ethers"; // Assuming you use ethers.js
import { getContract } from "@/contracts/contracts";
import { ContractCallback } from "@/contracts/types";
import { getterContract, txConfig } from "@/contracts/fetchLogic";
import { useWallet } from "./WalletContext";
import { useLoading } from "./LoadingContext";

const hotelRegistryContract = getContract("LaLoHotelRegistry");

const contractAddress = hotelRegistryContract!.address;
const abi = hotelRegistryContract!.abi;

type Hotel = {
  owner: string;
  name: string;
  vaultAddress: string;
};

type HotelRegistryContextType = {
  // Contract values
  hotelId: string;
  setHotelId: React.Dispatch<React.SetStateAction<string>>;
  hotelInfo: Hotel;
  setHotelInfo: React.Dispatch<React.SetStateAction<Hotel>>;
  isHotelRegistered: boolean;
  vaultAddress: string;
  nextHotelId: string | null;

  // Form values
  hotelName: string;
  setHotelName: React.Dispatch<React.SetStateAction<string>>;
  usdcPrice: string;
  setUsdcPrice: React.Dispatch<React.SetStateAction<string>>;
  totalMonth: string;
  setTotalMonth: React.Dispatch<React.SetStateAction<string>>;
  tokenAmount: string;
  setTokenAmount: React.Dispatch<React.SetStateAction<string>>;
  auctionDuration: number;
  setAuctionDuration: React.Dispatch<React.SetStateAction<number>>;

  // Contract functions
  handleGetHotelInfo: () => Promise<void>;
  handleIsHotelRegistered: () => Promise<void>;
  handleGetVaultAddress: () => Promise<void>;
  handleNextHotelId: () => Promise<void>;
  handleRegisterHotel: () => Promise<void>;
};

const HotelRegistryContext = createContext<
  HotelRegistryContextType | undefined
>(undefined);

export const HotelRegistryProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const { isConnected } = useWallet();
  const { setLoading } = useLoading();

  const [hotelId, setHotelId] = useState<string>("");
  const [hotelInfo, setHotelInfo] = useState<Hotel>({
    owner: "",
    name: "",
    vaultAddress: ""
  });
  const [isHotelRegistered, setIsHotelRegistered] = useState<boolean>(false);
  const [vaultAddress, setVaultAddress] = useState<string>("");
  const [nextHotelId, setNextHotelId] = useState<string | null>(null);
  const [hotelName, setHotelName] = useState<string>("");
  const [usdcPrice, setUsdcPrice] = useState<string>("");
  const [totalMonth, setTotalMonth] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [auctionDuration, setAuctionDuration] = useState<number>(0);

  const headerGetterContract = async (callback: ContractCallback) => {
    await getterContract({
      isConnected,
      contractAddress,
      abi,
      callback,
      setLoading
    });
  };

  const handleGetHotelInfo = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const info = await contract.hotels(hotelId);
      setHotelInfo(info);
      alert("Hotel info fetched successfully!");
    });
  };

  const handleIsHotelRegistered = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const isRegistered = await contract.isHotelRegistered(hotelId);
      setIsHotelRegistered(isRegistered);
      alert("Hotel registration status is " + isRegistered);
    });
  };

  const handleGetVaultAddress = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const address = await contract.getVaultAddress(hotelId);
      setVaultAddress(address);
      alert("Vault address is " + address);
    });
  };

  const handleNextHotelId = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const id = await contract.nextHotelId();
      setNextHotelId(id.toString());
      alert("Next hotel ID is " + id.toString());
    });
  };

  const handleRegisterHotel = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const tx = await contract.registerHotel(
        hotelName,
        tokenAmount,
        usdcPrice,
        totalMonth,
        // duration is in seconds, multiply by days
        // 1 day = 86400 seconds
        auctionDuration! * 86400,
        txConfig
      );
      console.log("Transaction hash:", tx.hash);
      await tx.wait();
      alert("Hotel Registered Successfully hash: " + tx.hash);
    });
  };

  return (
    <HotelRegistryContext.Provider
      value={{
        hotelId,
        setHotelId,
        hotelInfo,
        setHotelInfo,
        isHotelRegistered,
        vaultAddress,
        nextHotelId,
        hotelName,
        setHotelName,
        usdcPrice,
        setUsdcPrice,
        totalMonth,
        setTotalMonth,
        tokenAmount,
        setTokenAmount,
        auctionDuration,
        setAuctionDuration,
        handleGetHotelInfo,
        handleIsHotelRegistered,
        handleGetVaultAddress,
        handleNextHotelId,
        handleRegisterHotel
      }}
    >
      {children}
    </HotelRegistryContext.Provider>
  );
};

export const useHotelRegistry = () => {
  const context = useContext(HotelRegistryContext);
  if (!context) {
    throw new Error(
      "useHotelRegistry must be used within a HotelRegistryProvider"
    );
  }
  return context;
};
