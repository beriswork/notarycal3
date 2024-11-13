'use client';

import { useEffect, useRef } from 'react';
import styles from '../page.module.css';
import { DistanceMatrixResponse } from '../types';

interface TravelDetailsProps {
  onDistanceCalculated: (distance: number, duration: number) => void;
}

export const TravelDetails = ({ onDistanceCalculated }: TravelDetailsProps) => {
  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!originRef.current || !destinationRef.current) return;

    const initAutocomplete = () => {
      if (!window.google) return;

      new window.google.maps.places.Autocomplete(originRef.current!);
      new window.google.maps.places.Autocomplete(destinationRef.current!);
    };

    initAutocomplete();
  }, []);

  const calculateDistance = async () => {
    if (!originRef.current?.value || !destinationRef.current?.value) {
      alert('Please enter both locations');
      return;
    }

    try {
      const service = new window.google.maps.DistanceMatrixService();
      const result = await new Promise<DistanceMatrixResponse>((resolve, reject) => {
        service.getDistanceMatrix(
          {
            origins: [originRef.current!.value],
            destinations: [destinationRef.current!.value],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
          },
          (response: google.maps.DistanceMatrixResponse | null, status: google.maps.DistanceMatrixStatus) => {
            if (status === 'OK' && response) {
              const convertedResponse: DistanceMatrixResponse = {
                rows: response.rows,
                originAddresses: response.originAddresses,
                destinationAddresses: response.destinationAddresses,
                status: status
              };
              resolve(convertedResponse);
            } else {
              reject(new Error(`Failed to calculate distance: ${status}`));
            }
          }
        );
      });

      if (result.status !== 'OK' || result.rows[0].elements[0].status !== 'OK') {
        throw new Error('No route found between these locations.');
      }

      const distance = result.rows[0].elements[0].distance.value / 1609.34;
      const duration = result.rows[0].elements[0].duration.value / 60;
      onDistanceCalculated(distance, duration);
    } catch (error) {
      console.error('Error calculating distance:', error);
      alert('Error calculating distance. Please try again.');
    }
  };

  return (
    <div className={styles.calculatorSection}>
      <h2>Travel Details</h2>
      <label>
        Start Location
        <input
          ref={originRef}
          type="text"
          placeholder="Enter start location"
          className={styles.textInput}
        />
      </label>
      <label>
        Destination
        <input
          ref={destinationRef}
          type="text"
          placeholder="Enter destination"
          className={styles.textInput}
        />
      </label>
      <button onClick={calculateDistance} className={styles.calculateButton}>
        Calculate Distance
      </button>
    </div>
  );
}; 