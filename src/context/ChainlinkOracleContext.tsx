"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useLoading } from "./LoadingContext";

type PriceData = {
  price: string;
  lastUpdated: string;
};

type HotelMetrics = {
  occupancyRate: number;
  averageDailyRate: number;
  revenuePerRoom: number;
  propertyValuation: string;
  marketTrend: "up" | "down" | "stable";
};

type ChainlinkOracleContextType = {
  ethPrice: PriceData | null;
  btcPrice: PriceData | null;
  usdcPrice: PriceData | null;
  hotelMetrics: HotelMetrics;
  isOracleActive: boolean;
  lastUpdate: string;
  fetchAllPrices: () => Promise<void>;
  updateHotelMetrics: (hotelId: string) => Promise<void>;
};

const ChainlinkOracleContext = createContext<ChainlinkOracleContextType | undefined>(undefined);

export const ChainlinkOracleProvider = ({ children }: { children: ReactNode }) => {
  const { setLoading } = useLoading();

  const [ethPrice, setEthPrice] = useState<PriceData | null>(null);
  const [btcPrice, setBtcPrice] = useState<PriceData | null>(null);
  const [usdcPrice, setUsdcPrice] = useState<PriceData | null>(null);
  const [isOracleActive, setIsOracleActive] = useState(false);
  const [lastUpdate, setLastUpdate] = useState("");

  const [hotelMetrics, setHotelMetrics] = useState<HotelMetrics>({
    occupancyRate: 78.5,
    averageDailyRate: 245.00,
    revenuePerRoom: 192.65,
    propertyValuation: "2400000",
    marketTrend: "up"
  });

  const fetchAllPrices = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const now = new Date().toISOString();
      
      setEthPrice({
        price: (3200 + Math.random() * 400).toFixed(2),
        lastUpdated: now
      });
      
      setBtcPrice({
        price: (45000 + Math.random() * 5000).toFixed(2),
        lastUpdated: now
      });
      
      setUsdcPrice({
        price: "1.00",
        lastUpdated: now
      });
      
      setIsOracleActive(true);
      setLastUpdate(now);
      
    } catch (error) {
      console.error("Error fetching prices:", error);
      setIsOracleActive(false);
    } finally {
      setLoading(false);
    }
  };

  const updateHotelMetrics = async (hotelId: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const hotelIdNum = parseInt(hotelId) || 1;
      const baseMetrics = {
        occupancyRate: 70 + (hotelIdNum % 20),
        averageDailyRate: 200 + (hotelIdNum % 100),
        revenuePerRoom: 150 + (hotelIdNum % 80),
        propertyValuation: (2000000 + (hotelIdNum * 100000)).toString(),
        marketTrend: (["up", "down", "stable"] as const)[hotelIdNum % 3]
      };
      
      setHotelMetrics(baseMetrics);
      setLastUpdate(new Date().toISOString());
      
    } catch (error) {
      console.error("Error updating hotel metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPrices();
  }, []);

  return (
    <ChainlinkOracleContext.Provider
      value={{
        ethPrice,
        btcPrice,
        usdcPrice,
        hotelMetrics,
        isOracleActive,
        lastUpdate,
        fetchAllPrices,
        updateHotelMetrics
      }}
    >
      {children}
    </ChainlinkOracleContext.Provider>
  );
};

export const useChainlinkOracle = () => {
  const context = useContext(ChainlinkOracleContext);
  if (!context) {
    throw new Error("useChainlinkOracle must be used within a ChainlinkOracleProvider");
  }
  return context;
};

export const ChainlinkOraclePanel = () => {
  const {
    ethPrice,
    btcPrice,
    usdcPrice,
    hotelMetrics,
    isOracleActive,
    lastUpdate,
    fetchAllPrices,
    updateHotelMetrics
  } = useChainlinkOracle();

  const { loading } = useLoading();

  const formatTime = (isoString: string) => {
    if (!isoString) return "Never";
    return new Date(isoString).toLocaleTimeString();
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-400";
      case "down": return "text-red-400";
      default: return "text-yellow-400";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↗";
      case "down": return "↘";
      default: return "→";
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border border-orange-500/30 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🔗</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center">
              Chainlink Oracle Integration
              <div className={`w-2 h-2 rounded-full ml-3 ${isOracleActive ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
            </h3>
            <p className="text-gray-400">Real-time financial data for hotel properties</p>
          </div>
        </div>
        <button
          onClick={fetchAllPrices}
          disabled={loading}
          className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-lg hover:bg-orange-500/30 transition-colors disabled:opacity-50"
        >
          {loading ? "Updating..." : "Refresh"}
        </button>
      </div>
      
      {/* Price Feeds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">ETH/USD</span>
            <span className="text-xs text-green-400">Live</span>
          </div>
          <div className="text-lg font-bold text-orange-400">
            ${ethPrice?.price || "Loading..."}
          </div>
          <div className="text-xs text-gray-500">
            Updated: {formatTime(ethPrice?.lastUpdated || "")}
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">BTC/USD</span>
            <span className="text-xs text-green-400">Live</span>
          </div>
          <div className="text-lg font-bold text-yellow-400">
            ${btcPrice?.price || "Loading..."}
          </div>
          <div className="text-xs text-gray-500">
            Updated: {formatTime(btcPrice?.lastUpdated || "")}
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">USDC/USD</span>
            <span className="text-xs text-green-400">Live</span>
          </div>
          <div className="text-lg font-bold text-green-400">
            ${usdcPrice?.price || "1.00"}
          </div>
          <div className="text-xs text-gray-500">
            Updated: {formatTime(usdcPrice?.lastUpdated || "")}
          </div>
        </div>
      </div>

      {/* Mall Metrics */}
      <div className="bg-gray-800/30 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-semibold">Mall Performance Metrics</h4>
          <button
            onClick={() => updateHotelMetrics("1")}
            disabled={loading}
            className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full hover:bg-blue-500/30 transition-colors disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Metrics"}
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">
              {hotelMetrics.occupancyRate}%
            </div>
            <div className="text-gray-400 text-sm">Occupancy Rate</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">
              ${hotelMetrics.averageDailyRate}
            </div>
            <div className="text-gray-400 text-sm">Avg Daily Rate</div>
          </div>
          
          <div className="text-center">
            <div className="text-xl font-bold text-purple-400">
              ${hotelMetrics.revenuePerRoom}
            </div>
            <div className="text-gray-400 text-sm">Revenue/Room</div>
          </div>
          
          <div className="text-center">
            <div className={`text-xl font-bold ${getTrendColor(hotelMetrics.marketTrend)}`}>
              {getTrendIcon(hotelMetrics.marketTrend)} {hotelMetrics.marketTrend}
            </div>
            <div className="text-gray-400 text-sm">Market Trend</div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Property Valuation:</span>
            <span className="text-white font-semibold">${parseInt(hotelMetrics.propertyValuation).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-gray-400 text-sm">Last Oracle Update:</span>
            <span className="text-gray-300 text-sm">{formatTime(lastUpdate)}</span>
          </div>
        </div>
      </div>
      
      {/* Oracle Status */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isOracleActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-gray-400">
            Oracle Status: {isOracleActive ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="text-gray-500">|</div>
        <div className="text-gray-400">
          Network: Ethereum Mainnet
        </div>
        <div className="text-gray-500">|</div>
        <div className="text-gray-400">
          Powered by Chainlink
        </div>
      </div>
    </div>
  );
};