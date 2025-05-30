"use client";

import React from "react";
import { useHotelTokenization } from "@/context/HotelTokenizationContext"; // Correct path based on your structure
import { useLoading } from "@/context/LoadingContext";

function StepThreeHotelTokenization() {
  const {
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
  } = useHotelTokenization();

  // Local states for input amounts
  const [buyAmount, setBuyAmount] = React.useState("");
  const [depositAmount, setDepositAmount] = React.useState("");
  const [withdrawAmount, setWithdrawAmount] = React.useState("");
  const [newMonth, setNewMonth] = React.useState("");

  const { loading } = useLoading();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Hotel Tokenization</h1>

      {/* Hotel ID Input */}
      <div className="mt-8 p-4 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress space-y-4">
        <h2 className="text-lg font-semibold">Set Hotel ID</h2>
        <input
          disabled={loading}
          type="text"
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
          placeholder="Enter Hotel ID"
          className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <button
              disabled={loading}
              onClick={handleGetAvailableRevenues}
              className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Get Available Revenues
            </button>
            <div className="mt-2">
              <strong>Available Revenues:</strong> {availableRevenues}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              onClick={handleGetAvailableTokens}
              className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Get Available Tokens
            </button>
            <div className="mt-2">
              <strong>Available Tokens:</strong> {availableTokens}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              onClick={handleGetCollectedRevenues}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Get Collected Revenues
            </button>
            <div className="mt-2">
              <strong>Collected Revenues:</strong> {collectedRevenues}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              onClick={handleGetCurrentTokens}
              className="px-4 py-2 bg-yellow-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Get Current Tokens
            </button>
            <div className="mt-2">
              <strong>Current Tokens:</strong> {currentTokens}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              onClick={handleGetRemainingPromisedRevenues}
              className="px-4 py-2 bg-pink-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Get Remaining Promised Revenues
            </button>
            <div className="mt-2">
              <strong>Remaining Promised Revenues:</strong>{" "}
              {remainingPromisedRevenues}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              onClick={handleGetTransferLimit}
              className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Get Transfer Limit
            </button>
            <div className="mt-2">
              <strong>Transfer Limit:</strong> {transferLimit}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              onClick={handleGetVaultAddress}
              className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Get Vault Address
            </button>
            <div className="mt-2 break-words">
              <strong>Vault Address:</strong> {vaultAddress}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              onClick={handleGetMonth}
              className="px-4 py-2 bg-teal-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Get Month
            </button>
            <div className="mt-2">
              <strong>Month:</strong> {month}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              onClick={handleGetRate}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Get Rate
            </button>
            <div className="mt-2">
              <strong>Rate:</strong> {rate}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              onClick={handleGetAuctionEndDate}
              className="px-4 py-2 bg-yellow-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Get Auction End Date
            </button>
            <div className="mt-2">
              <strong>Auction End Date:</strong> {auctionEndDate}
            </div>
          </div>
        </div>
        {/* Action Forms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress space-y-4">
            <h2 className="text-lg font-semibold">Buy LALO Tokens</h2>
            <input
              disabled={loading}
              type="text"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              placeholder="Buy amount in USDC"
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
            />
            <button
              disabled={loading}
              onClick={() => handleBuyLaLoTokens(buyAmount)}
              className="px-6 py-2 bg-green-600 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Buy Tokens
            </button>
          </div>

          <div className="p-4 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress space-y-4">
            <h2 className="text-lg font-semibold">Deposit USDC</h2>
            <input
              disabled={loading}
              type="text"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Deposit amount in USDC"
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
            />
            <button
              disabled={loading}
              onClick={() => handleOwnerDepositUSDC(depositAmount)}
              className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Deposit USDC
            </button>
          </div>

          <div className="p-4 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress space-y-4">
            <h2 className="text-lg font-semibold">Withdraw USDC</h2>
            <input
              disabled={loading}
              type="text"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Withdraw amount in USDC"
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
            />
            <button
              disabled={loading}
              onClick={() => handleWithdrawUSDC(withdrawAmount)}
              className="px-6 py-2 bg-red-600 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Withdraw USDC
            </button>
          </div>

          <div className="p-4 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress space-y-4">
            <h2 className="text-lg font-semibold">Set Month</h2>
            <input
              disabled={loading}
              type="text"
              value={newMonth}
              onChange={(e) => setNewMonth(e.target.value)}
              placeholder="Enter Month"
              className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
            />
            <button
              disabled={loading}
              onClick={() => handleSetMonth(newMonth)}
              className="px-6 py-2 bg-purple-600 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
            >
              Set Month
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepThreeHotelTokenization;
