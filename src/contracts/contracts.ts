import MockUSDC from "./json/MockUSDC.json";
import LaLoHotelTokenization from "./json/LaLoHotelTokenization.json";
import LaLoHotelRegistry from "./json/LaLoHotelRegistry.json";
import { ContractType, ABISingle, AvailableContracts } from "./types";

// == Logs ==
//   MockUSDC deployed at: 0xC425c96B30BF8a9190E7A273D990a6a8B6F49C3b
//   LaLoTokenFactory deployed at: 0x67479A2F63ecAc78fb52D696df7D7455e2347983
//   HotelRegistry deployed at: 0xc84D1e8FECaDa44487242E5D855AEE7F752A12EA
//   HotelTokenization deployed at: 0x2dFf6D5eB709b368df0c11bd80209eB92591658c

const contracts: ContractType[] = [
  {
    name: "MockUSDC",
    address: "0xC425c96B30BF8a9190E7A273D990a6a8B6F49C3b",
    abi: MockUSDC.abi as ABISingle[]
  },
  {
    name: "LaLoHotelRegistry",
    address: "0xc84D1e8FECaDa44487242E5D855AEE7F752A12EA",
    abi: LaLoHotelRegistry.abi as ABISingle[]
  },
  {
    name: "LaLoHotelTokenization",
    address: "0x2dFf6D5eB709b368df0c11bd80209eB92591658c",
    abi: LaLoHotelTokenization.abi as ABISingle[]
  }
];

export const getContract = (name: AvailableContracts) => {
  const contract = contracts.find((contract) => contract.name === name);
  if (!contract) {
    throw new Error(`Contract ${name} not found`);
  }
  return contract;
};

export default contracts;
