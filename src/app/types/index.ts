// Google Maps Types
declare global {
  interface Window {
    google: typeof google;
    jspdf: any;
    feeData: FeeData;
  }
}

export interface DistanceMatrixResponse {
  rows: {
    elements: {
      distance: { value: number; text: string };
      duration: { value: number; text: string };
      status: string;
    }[];
  }[];
  originAddresses: string[];
  destinationAddresses: string[];
  status: string;
}

export interface FeeData {
  totalFees: number;
  stampFees: number;
  witnessFees: number;
  addlSignerFees: number;
  totalTravelFees: number;
  travelDistanceFees: number;
  travelTimeFees: number;
  apptTimeFees: number;
  printingScanningFees: number;
}

export interface CalculatorInputs {
  fixedStampFee: number;
  additionalStampFee: number;
  irsMileage: number;
  hourlyRate: number;
  witnessFee: number;
  addlSignerFee: number;
  printScanFees: number;
  numStamps: number;
  numWitnesses: number;
  numAddlSigners: number;
  travelFee: number;
  travelTime: number;
  apptTime: number;
  numPrintScans: number;
} 