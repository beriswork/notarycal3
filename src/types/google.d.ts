declare namespace google {
  namespace maps {
    class DistanceMatrixService {
      getDistanceMatrix(
        request: DistanceMatrixRequest,
        callback: (
          response: DistanceMatrixResponse | null,
          status: DistanceMatrixStatus
        ) => void
      ): void;
    }

    interface DistanceMatrixResponse {
      rows: {
        elements: {
          distance: { value: number; text: string };
          duration: { value: number; text: string };
          status: string;
        }[];
      }[];
      originAddresses: string[];
      destinationAddresses: string[];
    }

    interface DistanceMatrixRequest {
      origins: (string | LatLng | LatLngLiteral)[];
      destinations: (string | LatLng | LatLngLiteral)[];
      travelMode: TravelMode;
      unitSystem?: UnitSystem;
      avoidHighways?: boolean;
      avoidTolls?: boolean;
    }

    interface LatLng {
      lat(): number;
      lng(): number;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    enum TravelMode {
      DRIVING = 'DRIVING',
      WALKING = 'WALKING',
      BICYCLING = 'BICYCLING',
      TRANSIT = 'TRANSIT'
    }

    enum UnitSystem {
      METRIC = 0,
      IMPERIAL = 1
    }

    type DistanceMatrixStatus = 'OK' | 'INVALID_REQUEST' | 'MAX_ELEMENTS_EXCEEDED' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'ZERO_RESULTS';
  }
}

export {}; 