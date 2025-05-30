"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { Contract } from "ethers";
import { getContract } from "@/contracts/contracts";
import { ContractCallback } from "@/contracts/types";
import { getterContract, txConfig } from "@/contracts/fetchLogic";
import { useWallet } from "./WalletContext";
import { useLoading } from "./LoadingContext";

const hotelTokenizationContract = getContract("LaLoHotelTokenization");

const contractAddress = hotelTokenizationContract!.address;
const abi = hotelTokenizationContract!.abi;

type HotelTokenizationContextType = {
  hotelId: string;
  setHotelId: React.Dispatch<React.SetStateAction<string>>;

  // Values
  availableRevenues: string;
  availableTokens: string;
  collectedRevenues: string;
  currentTokens: string;
  remainingPromisedRevenues: string;
  transferLimit: string;
  vaultAddress: string;
  month: string;
  rate: number;
  auctionEndDate: string;

  // Functions
  handleBuyLaLoTokens: (buyInUSDC: string) => Promise<void>;
  handleGetAvailableRevenues: () => Promise<void>;
  handleGetAvailableTokens: () => Promise<void>;
  handleGetCollectedRevenues: () => Promise<void>;
  handleGetCurrentTokens: () => Promise<void>;
  handleGetRemainingPromisedRevenues: () => Promise<void>;
  handleGetTransferLimit: () => Promise<void>;
  handleGetVaultAddress: () => Promise<void>;
  handleGetMonth: () => Promise<void>;
  handleOwnerDepositUSDC: (depositInUSDC: string) => Promise<void>;
  handleWithdrawUSDC: (withdrawInUSDC: string) => Promise<void>;
  handleSetMonth: (month: string) => Promise<void>;
  handleGetRate: () => Promise<void>;
  handleGetAuctionEndDate: () => Promise<void>;
};

const HotelTokenizationContext = createContext<
  HotelTokenizationContextType | undefined
>(undefined);

export const HotelTokenizationProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const { isConnected } = useWallet();
  const { setLoading } = useLoading();

  const [hotelId, setHotelId] = useState<string>("");

  const [rate, setRate] = useState<number>(0);
  const [auctionEndDate, setAuctionEndDate] = useState<string>("");
  const [availableRevenues, setAvailableRevenues] = useState<string>("0");
  const [availableTokens, setAvailableTokens] = useState<string>("0");
  const [collectedRevenues, setCollectedRevenues] = useState<string>("0");
  const [currentTokens, setCurrentTokens] = useState<string>("0");
  const [remainingPromisedRevenues, setRemainingPromisedRevenues] =
    useState<string>("0");
  const [transferLimit, setTransferLimit] = useState<string>("0");
  const [vaultAddress, setVaultAddress] = useState<string>("");
  const [month, setMonth] = useState<string>("0");

  const headerGetterContract = async (callback: ContractCallback) => {
    await getterContract({
      isConnected,
      contractAddress,
      abi,
      callback,
      setLoading
    });
  };

  // --- Handlers ---

  const handleBuyLaLoTokens = async (buyInUSDC: string) => {
    await headerGetterContract(async (contract: Contract) => {
      const tx = await contract.buyLaLoTokens(hotelId, buyInUSDC, txConfig);

      await tx.wait();
      alert("Bought LALO tokens! Tx: " + tx.hash);
    });
  };

  const handleGetAvailableRevenues = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const rev = await contract.getAvailableRevenues(hotelId);
      setAvailableRevenues(rev.toString());
    });
  };

  const handleGetAvailableTokens = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const tokens = await contract.getAvailableTokens(hotelId);
      setAvailableTokens(tokens.toString());
    });
  };

  const handleGetCollectedRevenues = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const collected = await contract.getCollectedRevenues(hotelId);
      setCollectedRevenues(collected.toString());
    });
  };

  const handleGetCurrentTokens = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const tokens = await contract.getCurrentTokens(hotelId);
      setCurrentTokens(tokens.toString());
    });
  };

  const handleGetRemainingPromisedRevenues = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const remaining = await contract.getRemainingPromisedRevenues(hotelId);
      setRemainingPromisedRevenues(remaining.toString());
    });
  };

  const handleGetTransferLimit = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const limit = await contract.getTransferLimit(hotelId);
      setTransferLimit(limit.toString());
    });
  };

  const handleGetVaultAddress = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const address = await contract.getVaultAddress(hotelId);
      setVaultAddress(address);
    });
  };

  const handleGetMonth = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const monthValue = await contract.getMonthTest(hotelId);
      setMonth(monthValue.toString());
    });
  };

  const handleOwnerDepositUSDC = async (depositInUSDC: string) => {
    await headerGetterContract(async (contract: Contract) => {
      const tx = await contract.ownerDepositUSDC(
        hotelId,
        depositInUSDC,
        txConfig
      );
      console.log("Deposit Transaction hash:", tx.hash);
      await tx.wait();
      alert("USDC Deposited! Tx: " + tx.hash);
    });
  };

  const handleWithdrawUSDC = async (withdrawInUSDC: string) => {
    await headerGetterContract(async (contract: Contract) => {
      const tx = await contract.withdrawUSDC(hotelId, withdrawInUSDC, txConfig);
      console.log("Withdraw Transaction hash:", tx.hash);
      await tx.wait();
      alert("USDC Withdrawn! Tx: " + tx.hash);
    });
  };

  const handleSetMonth = async (newMonth: string) => {
    await headerGetterContract(async (contract: Contract) => {
      const tx = await contract.setMonthTest(hotelId, newMonth, txConfig);
      console.log("Set Month Transaction hash:", tx.hash);
      await tx.wait();
      alert("Month Set! Tx: " + tx.hash);
    });
  };

  const handleGetRate = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const rate = await contract.getRate(hotelId);
      const ratio = await contract.getRatio(hotelId);
      const realRate =
        parseFloat(rate.toString()) / parseFloat(ratio.toString());
      setRate(realRate);
      alert("Rate is " + realRate.toString());
    });
  };

  const handleGetAuctionEndDate = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const endDate = await contract.getAuctionEndDate(hotelId);
      setAuctionEndDate(endDate.toString());
      alert("Auction end date is " + endDate.toString());
    });
  };

  return (
    <HotelTokenizationContext.Provider
      value={{
        hotelId,
        setHotelId,
        rate,
        auctionEndDate,
        availableRevenues,
        availableTokens,
        collectedRevenues,
        currentTokens,
        remainingPromisedRevenues,
        transferLimit,
        vaultAddress,
        month,
        handleBuyLaLoTokens,
        handleGetAvailableRevenues,
        handleGetAvailableTokens,
        handleGetCollectedRevenues,
        handleGetCurrentTokens,
        handleGetRemainingPromisedRevenues,
        handleGetTransferLimit,
        handleGetVaultAddress,
        handleGetMonth,
        handleOwnerDepositUSDC,
        handleWithdrawUSDC,
        handleSetMonth,
        handleGetRate,
        handleGetAuctionEndDate
      }}
    >
      {children}
    </HotelTokenizationContext.Provider>
  );
};

export const useHotelTokenization = () => {
  const context = useContext(HotelTokenizationContext);
  if (!context) {
    throw new Error(
      "useHotelTokenization must be used within a HotelTokenizationProvider"
    );
  }
  return context;
};
