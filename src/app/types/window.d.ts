import { DistanceMatrixResponse } from './index';

declare global {
  interface Window {
    google: {
      maps: {
        places: {
          Autocomplete: new (
            input: HTMLInputElement,
            opts?: { types?: string[] }
          ) => google.maps.places.Autocomplete;
        };
        DistanceMatrixService: new () => google.maps.DistanceMatrixService;
        TravelMode: { DRIVING: string };
        UnitSystem: { IMPERIAL: number };
        event: {
          clearInstanceListeners: (instance: any) => void;
        };
      };
    };
    jspdf: any;
    feeData: FeeData;
  }
}

export {};
