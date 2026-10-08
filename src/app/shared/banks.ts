export type BankCode = "BOB" | "BNB" | "DPNB" | "TBANK" | "BDBL" | "DKB";

export interface BankInfo {
  code: BankCode;
  name: string;
  logo: string;
}

// Logos live in /public/banks
export const BANKS: BankInfo[] = [
  { code: "BOB", name: "Bank of Bhutan", logo: "/banks/bob.svg" },
  { code: "BNB", name: "Bhutan National Bank", logo: "/banks/bnb.svg" },
  { code: "DPNB", name: "Druk PNB Bank", logo: "/banks/dpnb.png" },
  { code: "TBANK", name: "T-Bank", logo: "/banks/tbank.svg" },
  { code: "BDBL", name: "Bhutan Development Bank", logo: "/banks/bdbl.png" },
  { code: "DKB", name: "DK Bank", logo: "/banks/dkbank.png" },
];

export const getBank = (code?: string) => BANKS.find((b) => b.code === code);
