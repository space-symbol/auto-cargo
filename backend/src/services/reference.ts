import { PrismaClient } from '@prisma/client';
import axios from 'axios';

export class ReferenceService {
  constructor(private prisma: PrismaClient) {}

  async getVehicleTypes() {
    return this.prisma.vehicleType.findMany();
  }

  async getCargoTypes() {
    return this.prisma.cargoType.findMany();
  }

  async createVehicleType(data: { name: string; maxWeight: number; maxVolume: number }) {
    return this.prisma.vehicleType.create({ data });
  }

  async createCargoType(data: { name: string; description: string }) {
    return this.prisma.cargoType.create({ data });
  }

  async createAddress(data: { 
    city: string; 
    street: string; 
    building: string; 
    country: string; 
  }) {
    return this.prisma.address.create({ data });
  }

  async calculateDistance(fromAddress: string, toAddress: string): Promise<number> {
    const apiKey = process.env.OPENROUTE_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTE_API_KEY is not set in environment variables');
    }

    try {
      console.log('Getting coordinates for addresses:', { fromAddress, toAddress });
      
      // Сначала получаем координаты для обоих адресов
      const [fromCoords, toCoords] = await Promise.all([
        this.getCoordinates(fromAddress),
        this.getCoordinates(toAddress)
      ]);

      console.log('Received coordinates:', { fromCoords, toCoords });

      if (!fromCoords || !toCoords) {
        throw new Error('Could not get coordinates for one or both addresses');
      }

      // Рассчитываем расстояние через OpenRouteService
      const requestBody = {
        coordinates: [
          [fromCoords[1], fromCoords[0]], // OpenRouteService использует [longitude, latitude]
          [toCoords[1], toCoords[0]]
        ],
        format: 'json'
      };

      console.log('Sending request to OpenRouteService:', requestBody);

      const response = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car',
        requestBody,
        {
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
          }
        }
      );

      console.log('OpenRouteService response:', response.data);

      if (!response.data.routes?.[0]?.summary?.distance) {
        throw new Error('Invalid response format from OpenRouteService');
      }

      const distance = response.data.routes[0].summary.distance / 1000; // конвертируем в километры
      return distance;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('OpenRouteService error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        throw new Error(`Failed to calculate distance: ${error.response?.data?.message || error.message}`);
      }
      console.error('Unexpected error:', error);
      throw error;
    }
  }

  private async getCoordinates(address: string): Promise<[number, number] | null> {
    const apiKey = process.env.OPENROUTE_API_KEY;
    if (!apiKey) {
      throw new Error('OPENROUTE_API_KEY is not set in environment variables');
    }

    try {
      console.log('Geocoding address:', address);

      const response = await axios.get(
        'https://api.openrouteservice.org/geocode/search',
        {
          params: {
            text: address,
            size: 1,
            layers: 'locality,street,address'
          },
          headers: {
            'Authorization': apiKey,
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
          }
        }
      );

      console.log('Geocoding response:', response.data);

      if (!response.data.features?.[0]?.geometry?.coordinates) {
        console.error('Invalid geocoding response:', response.data);
        return null;
      }

      const [longitude, latitude] = response.data.features[0].geometry.coordinates;
      return [latitude, longitude]; // возвращаем [широта, долгота]
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Geocoding error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        throw new Error(`Failed to get coordinates: ${error.response?.data?.message || error.message}`);
      }
      console.error('Unexpected error:', error);
      throw error;
    }
  }
} 