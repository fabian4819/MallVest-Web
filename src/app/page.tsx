"use client";
import StepOneConnectWallet from "@/components/StepOneConnectWallet";
import StepThreeHotelTokenization from "@/components/StepThreeHotelTokenization";
import StepTwoHotelRegistry from "@/components/StepTwoHotelRegistry";
import { HotelRegistryProvider } from "@/context/MallRegistryContext";
import { HotelTokenizationProvider } from "@/context/HotelTokenizationContext";
import { ChainlinkOraclePanel } from "@/context/ChainlinkOracleContext";
import { useState } from "react";
import { Wallet, Building2, Coins, ChevronDown, ChevronUp, Globe, Zap, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  const [openStepOne, setOpenStepOne] = useState(false);
  const [openStepTwo, setOpenStepTwo] = useState(false);
  const [openStepThree, setOpenStepThree] = useState(false);

  const toggleStepOne = () => setOpenStepOne(!openStepOne);
  const toggleStepTwo = () => setOpenStepTwo(!openStepTwo);
  const toggleStepThree = () => setOpenStepThree(!openStepThree);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                MallVest
              </h1>
              <p className="text-gray-400 text-lg">Mall Tokenization Platform</p>
            </div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Revolutionizing Mall investments through blockchain technology. 
            Tokenize, trade, and manage mall properties with unprecedented transparency and efficiency.
          </p>
          
          {/* Feature badges */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <div className="flex items-center space-x-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-gray-300 text-sm">Secure</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-300 text-sm">Fast</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300 text-sm">Profitable</span>
            </div>
          </div>
        </div>

        {/* Chainlink Oracle Panel */}
        <ChainlinkOraclePanel />

        {/* Instructions */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-400 text-lg">💡</span>
            </div>
            <h3 className="text-white font-semibold">Getting Started</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Follow these steps to start your mall tokenization journey. Click on each step to expand and interact with the platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-semibold">1</div>
              <span className="text-gray-400">Connect your Web3 wallet</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 font-semibold">2</div>
              <span className="text-gray-400">Register your mall property</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 font-semibold">3</div>
              <span className="text-gray-400">Start tokenizing and trading</span>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1: Connect Wallet */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl overflow-hidden">
            <div
              className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={toggleStepOne}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">
                      Step 1: Connect Wallet
                    </h2>
                    <p className="text-gray-300">Link your Web3 wallet to get started</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${openStepOne ? 'bg-green-400' : 'bg-gray-500'} animate-pulse`}></div>
                  <div className="bg-white/10 rounded-lg p-2">
                    {openStepOne ? (
                      <ChevronUp className="w-5 h-5 text-gray-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openStepOne ? 'max-h-[200vh] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 border-t border-white/10">
                <StepOneConnectWallet />
              </div>
            </div>
          </div>

          {/* Step 2: Register Mall */}
          <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl overflow-hidden">
            <div
              className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={toggleStepTwo}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">
                      Step 2: Register Mall
                    </h2>
                    <p className="text-gray-300">Add your mall property to the blockchain</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${openStepTwo ? 'bg-green-400' : 'bg-gray-500'} animate-pulse`}></div>
                  <div className="bg-white/10 rounded-lg p-2">
                    {openStepTwo ? (
                      <ChevronUp className="w-5 h-5 text-gray-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openStepTwo ? 'max-h-[200vh] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 border-t border-white/10">
                <HotelRegistryProvider>
                  <StepTwoHotelRegistry />
                </HotelRegistryProvider>
              </div>
            </div>
          </div>

          {/* Step 3: Tokenized Mall */}
          <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-2xl overflow-hidden">
            <div
              className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={toggleStepThree}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">
                      Step 3: Tokenized Mall
                    </h2>
                    <p className="text-gray-300">Manage your tokenized mall investments</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${openStepThree ? 'bg-green-400' : 'bg-gray-500'} animate-pulse`}></div>
                  <div className="bg-white/10 rounded-lg p-2">
                    {openStepThree ? (
                      <ChevronUp className="w-5 h-5 text-gray-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openStepThree ? 'max-h-[200vh] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 border-t border-white/10">
                <HotelTokenizationProvider>
                  <StepThreeHotelTokenization />
                </HotelTokenizationProvider>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">MallVest Protocol</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Powered by blockchain technology, secured by smart contracts, and enhanced with Chainlink Oracle integration for real-time market data.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
              <div className="flex flex-col items-center space-y-2">
                <Shield className="w-8 h-8 text-green-400" />
                <span className="text-white font-semibold">Secure</span>
                <span className="text-gray-400 text-center">Military-grade encryption and smart contract security</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Globe className="w-8 h-8 text-blue-400" />
                <span className="text-white font-semibold">Decentralized</span>
                <span className="text-gray-400 text-center">No single point of failure or control</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Zap className="w-8 h-8 text-yellow-400" />
                <span className="text-white font-semibold">Fast</span>
                <span className="text-gray-400 text-center">Lightning-fast transactions and settlements</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <TrendingUp className="w-8 h-8 text-purple-400" />
                <span className="text-white font-semibold">Oracle-Powered</span>
                <span className="text-gray-400 text-center">Real-time data from Chainlink network</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <p className="text-gray-500 text-sm">
                © 2025 MallVest. Built with ❤️ for the future of hospitality investments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}