"use client";

import React from "react";
import { useHotelRegistry } from "@/context/HotelRegistryContext"; // Import the context hook
import { useLoading } from "@/context/LoadingContext";

function StepTwoHotelRegistry() {
  const {
    hotelId,
    setHotelId,
    hotelInfo,
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
  } = useHotelRegistry(); // Use the context hook

  const { loading } = useLoading();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Hotel Registry</h1>

      {/* Actions without inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <button
            disabled={loading}
            onClick={handleNextHotelId}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
          >
            Get Next Hotel ID
          </button>
          <div className="mt-2">
            <strong>Next ID:</strong> {nextHotelId}
          </div>
        </div>
        <div>
          <button
            disabled={loading}
            onClick={handleGetHotelInfo}
            className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
          >
            Get Hotel Info
          </button>
          <input
            disabled={loading}
            type="text"
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
            placeholder="Enter Hotel ID"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <div className="mt-2 break-words">
            <strong>Hotel Name:</strong> {hotelInfo.name}
            <br />
            <strong>Owner:</strong> {hotelInfo.owner}
          </div>
        </div>

        <div>
          <button
            disabled={loading}
            onClick={handleIsHotelRegistered}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
          >
            Check Hotel Registered
          </button>
          <input
            disabled={loading}
            type="text"
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
            placeholder="Enter Hotel ID"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <div className="mt-2">
            <strong>Registered:</strong> {isHotelRegistered ? "Yes" : "No"}
          </div>
        </div>

        <div>
          <button
            disabled={loading}
            onClick={handleGetVaultAddress}
            className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
          >
            Get Vault Address
          </button>
          <input
            disabled={loading}
            type="text"
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
            placeholder="Enter Hotel ID"
            className="mt-2 px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
          />
          <div className="mt-2 break-words">
            <strong>Vault Address:</strong> {vaultAddress}
          </div>
        </div>
      </div>

      {/* Register a Hotel */}
      <div className="mt-8 p-4 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress space-y-4">
        <h2 className="text-lg font-semibold">Register New Hotel</h2>

        <input
          disabled={loading}
          type="text"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          placeholder="Hotel Name"
          className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
        />

        <input
          disabled={loading}
          type="text"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
          placeholder="Token Amount"
          className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
        />

        <input
          disabled={loading}
          type="text"
          value={usdcPrice}
          onChange={(e) => setUsdcPrice(e.target.value)}
          placeholder="USDC Price"
          className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
        />

        <input
          disabled={loading}
          type="text"
          value={totalMonth}
          onChange={(e) => setTotalMonth(e.target.value)}
          placeholder="Total Months"
          className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
        />

        <label className="text-sm text-gray-500">
          Auction Duration (in days)
        </label>
        <input
          disabled={loading}
          type="number"
          value={auctionDuration}
          onChange={(e) => setAuctionDuration(parseInt(e?.target?.value) ?? 0)}
          placeholder="Auction Duration in Days"
          className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-progress w-full"
        />

        <button
          disabled={loading}
          onClick={handleRegisterHotel}
          className="px-6 py-2 bg-indigo-600 text-white rounded disabled:opacity-50 disabled:cursor-progress w-full"
        >
          Register Hotel
        </button>
      </div>
    </div>
  );
}

export default StepTwoHotelRegistry;
