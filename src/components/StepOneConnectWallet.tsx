"use client";
import React from "react";
import { useWallet } from "@/context/WalletContext"; // Import the context hook
import { useLoading } from "@/context/LoadingContext";

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
  } = useWallet(); // Use the context hook for accessing wallet data

  const { loading } = useLoading();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">mUSDC Wallet</h1>

      {!isConnected ? (
        <button
          disabled={loading}
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-progress"
        >
          Connect Wallet
        </button>
      ) : (
        <p>Connected: {account}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Buttons without inputs */}
        <div>
          <button
            disabled={loading}
            onClick={handleTotalSupply}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-progress"
          >
            Get Total Supply
          </button>
          <p className="break-words">
            <strong>Total Supply:</strong> {totalSupply}
          </p>
        </div>

        <div>
          <button
            disabled={loading}
            onClick={handleName}
            className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50 disabled:cursor-progress"
          >
            Get Token Name
          </button>
          <p>
            <strong>Name:</strong> {name}
          </p>
        </div>

        <div>
          <button
            disabled={loading}
            onClick={handleSymbol}
            className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50 disabled:cursor-progress"
          >
            Get Token Symbol
          </button>
          <p>
            <strong>Symbol:</strong> {symbol}
          </p>
        </div>

        <div>
          <button
            disabled={loading}
            onClick={handleDecimals}
            className="px-4 py-2 bg-pink-500 text-white rounded disabled:opacity-50 disabled:cursor-progress"
          >
            Get Decimals
          </button>
          <p>
            <strong>Decimals:</strong> {decimals}
          </p>
        </div>

        {/* Buttons with inputs */}
        <div>
          <button
            disabled={loading}
            onClick={handleBalanceOf}
            className="px-4 py-2 bg-yellow-500 text-white rounded disabled:opacity-50 disabled:cursor-progress"
          >
            Get Balance
          </button>
          <input
            disabled={loading}
            type="text"
            value={spender}
            onChange={(e) => setSpender(e.target.value)}
            placeholder="Enter spender address"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <p className="break-words">
            <strong>Balance:</strong> {balance}
          </p>
        </div>
        <div>
          <button
            disabled={loading}
            onClick={handleAllowance}
            className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50 disabled:cursor-progress"
          >
            Get Allowance
          </button>
          <input
            disabled={loading}
            type="text"
            value={spender}
            onChange={(e) => setSpender(e.target.value)}
            placeholder="Enter spender address"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <p>
            <strong>Allowance:</strong> {allowance}
          </p>
        </div>

        <div>
          <button
            disabled={loading}
            onClick={handleApprove}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50 disabled:cursor-progress"
          >
            Approve
          </button>
          <input
            disabled={loading}
            type="text"
            value={spender}
            onChange={(e) => setSpender(e.target.value)}
            placeholder="Enter spender address"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <input
            disabled={loading}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter amount"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <p>{approvalStatus}</p>
        </div>

        <div>
          <button
            disabled={loading}
            onClick={handleDecreaseAllowance}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 disabled:cursor-progress"
          >
            Decrease Allowance
          </button>
          <input
            disabled={loading}
            type="text"
            value={spender}
            onChange={(e) => setSpender(e.target.value)}
            placeholder="Enter spender address"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <input
            disabled={loading}
            type="text"
            value={subtractedValue}
            onChange={(e) => setSubtractedValue(e.target.value)}
            placeholder="Enter amount to subtract"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
        </div>

        <div>
          <button
            disabled={loading}
            onClick={handleIncreaseAllowance}
            className="px-4 py-2 bg-teal-500 text-white rounded disabled:opacity-50 disabled:cursor-progress"
          >
            Increase Allowance
          </button>
          <input
            disabled={loading}
            type="text"
            value={spender}
            onChange={(e) => setSpender(e.target.value)}
            placeholder="Enter spender address"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <input
            disabled={loading}
            type="text"
            value={addedValue}
            onChange={(e) => setAddedValue(e.target.value)}
            placeholder="Enter amount to add"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
        </div>

        <div>
          <button
            disabled={loading}
            onClick={handleTransfer}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-progress"
          >
            Transfer
          </button>
          <input
            disabled={loading}
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter to address"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <input
            disabled={loading}
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
        </div>

        <div>
          <button
            disabled={loading}
            onClick={handleTransferFrom}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50 disabled:cursor-progress"
          >
            Transfer From
          </button>
          <input
            disabled={loading}
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Enter from address"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <input
            disabled={loading}
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter to address"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <input
            disabled={loading}
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default StepOneConnectWallet;
