"use client";
// context/WalletContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Contract } from "ethers"; // Assuming you use ethers.js

import { getContract } from "@/contracts/contracts";
import {
  getterBrowserEth,
  getterContract,
  txConfig
} from "@/contracts/fetchLogic";
import { ContractCallback } from "@/contracts/types";
import { useLoading } from "./LoadingContext";

const mockUsdcContract = getContract("MockUSDC");

const contractAddress = mockUsdcContract!.address;
const abi = mockUsdcContract!.abi;

type WalletContextType = {
  // Contract values
  account: string | null;
  isConnected: boolean;
  balance: string;
  allowance: string;
  totalSupply: string;
  name: string;
  symbol: string;
  decimals: number;
  approvalStatus: string;
  connectWallet: () => Promise<void>;

  // Form values
  spender: string;
  setSpender: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  subtractedValue: string;
  setSubtractedValue: React.Dispatch<React.SetStateAction<string>>;
  addedValue: string;
  setAddedValue: React.Dispatch<React.SetStateAction<string>>;
  from: string;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
  to: string;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;

  // Contract functions
  handleBalanceOf: () => Promise<void>;
  handleAllowance: () => Promise<void>;
  handleApprove: () => Promise<void>;
  handleTotalSupply: () => Promise<void>;
  handleName: () => Promise<void>;
  handleSymbol: () => Promise<void>;
  handleDecimals: () => Promise<void>;
  handleDecreaseAllowance: () => Promise<void>;
  handleIncreaseAllowance: () => Promise<void>;
  handleTransferFrom: () => Promise<void>;
  handleTransfer: () => Promise<void>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { setLoading } = useLoading();

  const [balance, setBalance] = useState<string>("0");
  const [allowance, setAllowance] = useState<string>("0");
  const [totalSupply, setTotalSupply] = useState<string>("0");
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [decimals, setDecimals] = useState<number>(0);
  const [approvalStatus, setApprovalStatus] = useState<string>("");

  // Inputs
  const [spender, setSpender] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [subtractedValue, setSubtractedValue] = useState<string>("");
  const [addedValue, setAddedValue] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const connectWallet = async () => {
    try {
      const provider = await getterBrowserEth();

      if (!provider) {
        alert("Provider not found!");
        return;
      }

      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      alert("Error connecting wallet: " + error);
    }
  };

  const headerGetterContract = async (callback: ContractCallback) => {
    await getterContract({
      isConnected,
      contractAddress,
      abi,
      callback,
      setLoading
    });
  };

  const handleBalanceOf = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const result = await contract.balanceOf(spender);
      setBalance(result.toString());
      alert("Balance fetched: " + result.toString());
    });
  };

  const handleAllowance = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const result = await contract.allowance(account, spender);
      setAllowance(result.toString());
    });
  };

  const handleApprove = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const tx = await contract.approve(spender, value, txConfig);
      await tx.wait();
      setApprovalStatus("Approval successful!");
      alert("Approval successful!");
    });
  };

  const handleTotalSupply = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const result = await contract.totalSupply();
      setTotalSupply(result.toString());
      alert("Total Supply fetched: " + result.toString());
    });
  };

  const handleName = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const result = await contract.name();
      setName(result);
      alert("Name fetched: " + result);
    });
  };

  const handleSymbol = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const result = await contract.symbol();
      setSymbol(result);
      alert("Symbol fetched: " + result);
    });
  };

  const handleDecimals = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const result = await contract.decimals();
      setDecimals(result);
      alert("Decimals fetched: " + result);
    });
  };

  const handleDecreaseAllowance = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const tx = await contract.decreaseAllowance(
        spender,
        subtractedValue,
        txConfig
      );
      await tx.wait();
      setApprovalStatus("Allowance decreased!");
      alert("Allowance decreased!");
    });
  };

  const handleIncreaseAllowance = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const tx = await contract.increaseAllowance(
        spender,
        addedValue,
        txConfig
      );
      await tx.wait();
      setApprovalStatus("Allowance increased!");
      alert("Allowance increased!");
    });
  };

  const handleTransferFrom = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const tx = await contract.transferFrom(from, to, amount, txConfig);
      await tx.wait();
      alert("Transfer successful!");
    });
  };

  const handleTransfer = async () => {
    await headerGetterContract(async (contract: Contract) => {
      const tx = await contract.transfer(to, amount, txConfig);
      await tx.wait();
      alert("Transfer successful!");
    });
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        isConnected,
        balance,
        allowance,
        totalSupply,
        name,
        symbol,
        decimals,
        approvalStatus,
        connectWallet,
        handleBalanceOf,
        handleAllowance,
        handleApprove,
        handleTotalSupply,
        handleName,
        handleSymbol,
        handleDecimals,
        handleDecreaseAllowance,
        handleIncreaseAllowance,
        handleTransferFrom,
        handleTransfer,
        spender,
        setSpender,
        value,
        setValue,
        subtractedValue,
        setSubtractedValue,
        addedValue,
        setAddedValue,
        from,
        setFrom,
        to,
        setTo,
        amount,
        setAmount
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
