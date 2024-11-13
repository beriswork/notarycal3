declare global {
  interface Window {
    initMap: () => void;
    google: typeof google;
    jspdf: any;
    feeData?: any;
  }
}

export {};
