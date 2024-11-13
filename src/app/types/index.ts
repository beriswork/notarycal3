// Google Maps Types
declare global {
  interface Window {
    google: typeof google;
    jspdf: any;
    feeData: FeeData;
  }
}

export interface DistanceMatrixResponse {
  destinationAddresses: string[];
  originAddresses: string[];
  rows: {
    elements: {
      distance: {
        text: string;
        value: number;  // in meters
      };
      duration: {
        text: string;
        value: number;  // in seconds
      };
      status: string;
    }[];
  }[];
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