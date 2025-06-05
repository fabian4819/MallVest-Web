"use client";

import React from "react";
import { useHotelTokenization } from "@/context/HotelTokenizationContext";
import { useLoading } from "@/context/LoadingContext";
import {
  Coins,
  TrendingUp,
  DollarSign,
  Calendar,
  Building2,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

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
    handleGetAuctionEndDate,
  } = useHotelTokenization();

  const [buyAmount, setBuyAmount] = React.useState("");
  const [depositAmount, setDepositAmount] = React.useState("");
  const [withdrawAmount, setWithdrawAmount] = React.useState("");
  const [newMonth, setNewMonth] = React.useState("");

  const { loading } = useLoading();

  const formatDate = (timestamp: string | number) => {
    if (!timestamp || timestamp === "0") return "Not set";
    return new Date(parseInt(timestamp.toString()) * 1000).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Hotel ID Input */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-emerald-400" />
          Select Hotel
        </h3>
        <div className="flex space-x-4">
          <input
            disabled={loading}
            type="text"
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
            placeholder="Enter Hotel ID"
            className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-emerald-500/50 focus:outline-none transition-colors disabled:opacity-50"
          />
          <button
            disabled={loading || !hotelId}
            onClick={() => {
              handleGetAvailableRevenues();
              handleGetAvailableTokens();
              handleGetRate();
              handleGetAuctionEndDate();
            }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
          >
            Load Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-600/20 to-green-600/20 border border-emerald-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-gray-400 text-sm">Available Revenues</span>
            </div>
            <button
              disabled={loading}
              onClick={handleGetAvailableRevenues}
              className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded hover:bg-emerald-500/30 transition-colors disabled:opacity-50"
            >
              Refresh
            </button>
          </div>
          <div className="text-xl font-bold text-emerald-400">
            ${availableRevenues || "0"}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Coins className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-gray-400 text-sm">Available Tokens</span>
            </div>
            <button
              disabled={loading}
              onClick={handleGetAvailableTokens}
              className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-500/30 transition-colors disabled:opacity-50"
            >
              Refresh
            </button>
          </div>
          <div className="text-xl font-bold text-blue-400">
            {availableTokens || "0"}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-gray-400 text-sm">Current Rate</span>
            </div>
            <button
              disabled={loading}
              onClick={handleGetRate}
              className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded hover:bg-purple-500/30 transition-colors disabled:opacity-50"
            >
              Get
            </button>
          </div>
          <div className="text-xl font-bold text-purple-400">
            {rate ? `${rate.toFixed(4)}%` : "0%"}
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 text-orange-400 mr-2" />
              <span className="text-gray-400 text-sm">Auction End</span>
            </div>
            <button
              disabled={loading}
              onClick={handleGetAuctionEndDate}
              className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded hover:bg-orange-500/30 transition-colors disabled:opacity-50"
            >
              Get
            </button>
          </div>
          <div className="text-sm font-bold text-orange-400">
            {formatDate(auctionEndDate)}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Collected Revenues</span>
            <button
              disabled={loading}
              onClick={handleGetCollectedRevenues}
              className="text-xs bg-gray-600/50 text-gray-400 px-2 py-1 rounded hover:bg-gray-600/70 transition-colors disabled:opacity-50"
            >
              Get
            </button>
          </div>
          <div className="text-lg font-bold text-white">
            ${collectedRevenues || "0"}
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Current Tokens</span>
            <button
              disabled={loading}
              onClick={handleGetCurrentTokens}
              className="text-xs bg-gray-600/50 text-gray-400 px-2 py-1 rounded hover:bg-gray-600/70 transition-colors disabled:opacity-50"
            >
              Get
            </button>
          </div>
          <div className="text-lg font-bold text-white">
            {currentTokens || "0"}
          </div>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Transfer Limit</span>
            <button
              disabled={loading}
              onClick={handleGetTransferLimit}
              className="text-xs bg-gray-600/50 text-gray-400 px-2 py-1 rounded hover:bg-gray-600/70 transition-colors disabled:opacity-50"
            >
              Get
            </button>
          </div>
          <div className="text-lg font-bold text-white">
            {transferLimit || "0"}
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Buy Tokens */}
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-green-400" />
            </div>
            <h4 className="text-white font-semibold">Buy LALO Tokens</h4>
          </div>
          <div className="space-y-4">
            <input
              disabled={loading}
              type="text"
              value={buyAmount}
              onChange={(e) => setBuyAmount(e.target.value)}
              placeholder="Amount in USDC"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-green-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              disabled={loading || !buyAmount}
              onClick={() => handleBuyLaLoTokens(buyAmount)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Buy Tokens"}
            </button>
          </div>
        </div>

        {/* Deposit USDC */}
        <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 text-blue-400" />
            </div>
            <h4 className="text-white font-semibold">Deposit USDC</h4>
          </div>
          <div className="space-y-4">
            <input
              disabled={loading}
              type="text"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Deposit amount"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              disabled={loading || !depositAmount}
              onClick={() => handleOwnerDepositUSDC(depositAmount)}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Deposit"}
            </button>
          </div>
        </div>

        {/* Withdraw USDC */}
        <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5 text-red-400" />
            </div>
            <h4 className="text-white font-semibold">Withdraw USDC</h4>
          </div>
          <div className="space-y-4">
            <input
              disabled={loading}
              type="text"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Withdraw amount"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-red-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              disabled={loading || !withdrawAmount}
              onClick={() => handleWithdrawUSDC(withdrawAmount)}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>
          </div>
        </div>

        {/* Set Month */}
        <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
            <h4 className="text-white font-semibold">Set Month</h4>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Current Month:</span>
              <button
                disabled={loading}
                onClick={handleGetMonth}
                className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded hover:bg-purple-500/30 transition-colors disabled:opacity-50"
              >
                Get
              </button>
            </div>
            <div className="text-purple-400 font-semibold">{month || "0"}</div>
            <input
              disabled={loading}
              type="text"
              value={newMonth}
              onChange={(e) => setNewMonth(e.target.value)}
              placeholder="New month"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              disabled={loading || !newMonth}
              onClick={() => handleSetMonth(newMonth)}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Update Month"}
            </button>
          </div>
        </div>
      </div>

      {/* Additional Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
            Remaining Promised Revenues
          </h4>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-emerald-400">
              ${remainingPromisedRevenues || "0"}
            </div>
            <button
              disabled={loading}
              onClick={handleGetRemainingPromisedRevenues}
              className="bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-500/30 transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-4 flex items-center">
            <Wallet className="w-5 h-5 mr-2 text-blue-400" />
            Vault Information
          </h4>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Vault Address:</span>
            <button
              disabled={loading}
              onClick={handleGetVaultAddress}
              className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Get Address"}
            </button>
          </div>
          {vaultAddress && (
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="text-white font-mono text-sm break-all">
                {vaultAddress}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StepThreeHotelTokenization;
