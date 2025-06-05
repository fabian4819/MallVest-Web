"use client";
import React from "react";
import { useWallet } from "@/context/WalletContext";
import { useLoading } from "@/context/LoadingContext";
import { Wallet, Coins, TrendingUp, ArrowUpRight, Shield, Zap } from "lucide-react";

function StepOneConnectWallet() {
  const {
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
    // handleDecreaseAllowance,
    // handleIncreaseAllowance,
    handleTransferFrom,
    handleTransfer,
    spender,
    setSpender,
    value,
    setValue,
    // subtractedValue,
    // setSubtractedValue,
    // addedValue,
    // setAddedValue,
    from,
    setFrom,
    to,
    setTo,
    amount,
    setAmount
  } = useWallet();

  const { loading } = useLoading();

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Wallet Connection</h3>
              <p className="text-gray-400">Connect your Web3 wallet to continue</p>
            </div>
          </div>
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
        </div>

        {!isConnected ? (
          <button
            disabled={loading}
            onClick={connectWallet}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Connected</span>
            </div>
            <p className="text-gray-300 font-mono text-sm break-all">{account}</p>
          </div>
        )}
      </div>

      {/* Token Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-green-400" />
            </div>
            <button
              disabled={loading}
              onClick={handleTotalSupply}
              className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full hover:bg-green-500/30 transition-colors"
            >
              Refresh
            </button>
          </div>
          <div className="text-2xl font-bold text-green-400 mb-2 break-words">{totalSupply || "0"}</div>
          <p className="text-gray-400 text-sm">Total Supply</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <button
              disabled={loading}
              onClick={handleName}
              className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full hover:bg-purple-500/30 transition-colors"
            >
              Get
            </button>
          </div>
          <div className="text-lg font-bold text-purple-400 mb-2">{name || "Token Name"}</div>
          <p className="text-gray-400 text-sm">Token Name</p>
        </div>

        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
            <button
              disabled={loading}
              onClick={handleSymbol}
              className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full hover:bg-orange-500/30 transition-colors"
            >
              Get
            </button>
          </div>
          <div className="text-lg font-bold text-orange-400 mb-2">{symbol || "SYM"}</div>
          <p className="text-gray-400 text-sm">Token Symbol</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <button
              disabled={loading}
              onClick={handleDecimals}
              className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full hover:bg-blue-500/30 transition-colors"
            >
              Get
            </button>
          </div>
          <div className="text-lg font-bold text-blue-400 mb-2">{decimals || "18"}</div>
          <p className="text-gray-400 text-sm">Decimals</p>
        </div>
      </div>

      {/* Balance and Allowance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Coins className="w-6 h-6 text-yellow-400" />
            <h4 className="text-white font-semibold">Check Balance</h4>
          </div>
          <div className="space-y-4">
            <input
              disabled={loading}
              type="text"
              value={spender}
              onChange={(e) => setSpender(e.target.value)}
              placeholder="Enter wallet address"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              disabled={loading}
              onClick={handleBalanceOf}
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Get Balance"}
            </button>
            <div className="bg-gray-700/30 rounded-lg p-3">
              <span className="text-gray-400 text-sm">Balance: </span>
              <span className="text-yellow-400 font-mono break-words">{balance || "0"}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-indigo-400" />
            <h4 className="text-white font-semibold">Check Allowance</h4>
          </div>
          <div className="space-y-4">
            <input
              disabled={loading}
              type="text"
              value={spender}
              onChange={(e) => setSpender(e.target.value)}
              placeholder="Enter spender address"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-indigo-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              disabled={loading}
              onClick={handleAllowance}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Get Allowance"}
            </button>
            <div className="bg-gray-700/30 rounded-lg p-3">
              <span className="text-gray-400 text-sm">Allowance: </span>
              <span className="text-indigo-400 font-mono break-words">{allowance || "0"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Approve Section */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-green-400" />
          <h4 className="text-white font-semibold">Approve Spender</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            disabled={loading}
            type="text"
            value={spender}
            onChange={(e) => setSpender(e.target.value)}
            placeholder="Spender address"
            className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500/50 focus:outline-none transition-colors disabled:opacity-50"
          />
          <input
            disabled={loading}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Approval amount"
            className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-green-500/50 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
        <button
          disabled={loading}
          onClick={handleApprove}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Approve"}
        </button>
        {approvalStatus && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <span className="text-green-400 text-sm">{approvalStatus}</span>
          </div>
        )}
      </div>

      {/* Transfer Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <ArrowUpRight className="w-6 h-6 text-purple-400" />
            <h4 className="text-white font-semibold">Transfer Tokens</h4>
          </div>
          <div className="space-y-4">
            <input
              disabled={loading}
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Recipient address"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <input
              disabled={loading}
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Transfer amount"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              disabled={loading}
              onClick={handleTransfer}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Transfer"}
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-yellow-400" />
            <h4 className="text-white font-semibold">Transfer From</h4>
          </div>
          <div className="space-y-4">
            <input
              disabled={loading}
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="From address"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <input
              disabled={loading}
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="To address"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <input
              disabled={loading}
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Transfer amount"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              disabled={loading}
              onClick={handleTransferFrom}
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Transfer From"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepOneConnectWallet;