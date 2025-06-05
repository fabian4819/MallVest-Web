"use client";

import React from "react";
import { useHotelRegistry } from "@/context/MallRegistryContext";
import { useLoading } from "@/context/LoadingContext";
import { Building2, MapPin, DollarSign, Calendar, TrendingUp, Users, CheckCircle, XCircle } from "lucide-react";

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
  } = useHotelRegistry();

  const { loading } = useLoading();

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Building2 className="w-5 h-5 text-indigo-400 mr-2" />
            <button
              disabled={loading}
              onClick={handleNextHotelId}
              className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full hover:bg-indigo-500/30 transition-colors disabled:opacity-50"
            >
              Refresh
            </button>
          </div>
          <div className="text-2xl font-bold text-indigo-400 mb-1">{nextHotelId || "Loading..."}</div>
          <div className="text-gray-400 text-sm">Next Hotel ID</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">12</div>
          <div className="text-gray-400 text-sm">Registered Hotels</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-yellow-400 mb-1">8</div>
          <div className="text-gray-400 text-sm">Active Vaults</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400 mb-1">$2.5M</div>
          <div className="text-gray-400 text-sm">Total TVL</div>
        </div>
      </div>

      {/* Mall Query Section */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-400" />
          Query Mall Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            disabled={loading}
            type="text"
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
            placeholder="Enter Hotel ID"
            className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none transition-colors disabled:opacity-50"
          />
          <div className="flex space-x-2">
            <button
              disabled={loading}
              onClick={handleGetHotelInfo}
              className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Get Info"}
            </button>
            <button
              disabled={loading}
              onClick={handleIsHotelRegistered}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Checking..." : "Check Status"}
            </button>
          </div>
        </div>

        {/* Results Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3 flex items-center">
              <Building2 className="w-4 h-4 mr-2 text-indigo-400" />
              Mall Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white break-words">{hotelInfo.name || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Owner:</span>
                <span className="text-white font-mono text-xs break-all">{hotelInfo.owner || "N/A"}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-3 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              Registration Status
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Registered:</span>
                <div className="flex items-center">
                  {isHotelRegistered ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-green-400">Yes</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-400 mr-1" />
                      <span className="text-red-400">No</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Vault:</span>
                <button
                  disabled={loading}
                  onClick={handleGetVaultAddress}
                  className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded hover:bg-blue-500/30 transition-colors disabled:opacity-50"
                >
                  Get Address
                </button>
              </div>
              {vaultAddress && (
                <div className="text-xs text-gray-300 font-mono break-all bg-gray-600/50 p-2 rounded">
                  {vaultAddress}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Register New Mall */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Register New Mall</h3>
            <p className="text-gray-400">Add your mall property to the blockchain</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center">
              <Building2 className="w-4 h-4 mr-1" />
              Mall Name
            </label>
            <input
              disabled={loading}
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              placeholder="e.g., Grand Plaza Mall"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-indigo-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              Token Amount
            </label>
            <input
              disabled={loading}
              type="text"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder="e.g., 1000000"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-indigo-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              USDC Price
            </label>
            <input
              disabled={loading}
              type="text"
              value={usdcPrice}
              onChange={(e) => setUsdcPrice(e.target.value)}
              placeholder="e.g., 100"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-indigo-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Total Months
            </label>
            <input
              disabled={loading}
              type="text"
              value={totalMonth}
              onChange={(e) => setTotalMonth(e.target.value)}
              placeholder="e.g., 12"
              className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-indigo-500/50 focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm text-gray-400 flex items-center mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            Auction Duration (days)
          </label>
          <input
            disabled={loading}
            type="number"
            value={auctionDuration}
            onChange={(e) => setAuctionDuration(parseInt(e?.target?.value) ?? 0)}
            placeholder="e.g., 7"
            className="w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-indigo-500/50 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <button
          disabled={loading}
          onClick={handleRegisterHotel}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
              Registering Mall...
            </div>
          ) : (
            "Register Mall"
          )}
        </button>
      </div>
    </div>
  );
}

export default StepTwoHotelRegistry;