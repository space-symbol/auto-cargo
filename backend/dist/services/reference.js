"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceService = void 0;
const axios_1 = __importDefault(require("axios"));
class ReferenceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getVehicleTypes() {
        return this.prisma.vehicleType.findMany();
    }
    async getCargoTypes() {
        return this.prisma.cargoType.findMany();
    }
    async createVehicleType(data) {
        return this.prisma.vehicleType.create({ data });
    }
    async createCargoType(data) {
        return this.prisma.cargoType.create({ data });
    }
    async createAddress(data) {
        return this.prisma.address.create({ data });
    }
    async calculateDistance(fromAddress, toAddress) {
        const apiKey = process.env.OPENROUTE_API_KEY;
        if (!apiKey) {
            throw new Error('OPENROUTE_API_KEY is not set in environment variables');
        }
        try {
            // Сначала получаем координаты для обоих адресов
            const [fromCoords, toCoords] = await Promise.all([
                this.getCoordinates(fromAddress),
                this.getCoordinates(toAddress)
            ]);
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
            const response = await axios_1.default.post('https://api.openrouteservice.org/v2/directions/driving-car', requestBody, {
                headers: {
                    'Authorization': apiKey,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
                }
            });
            if (!response.data.routes?.[0]?.summary?.distance) {
                throw new Error('Invalid response format from OpenRouteService');
            }
            const distance = response.data.routes[0].summary.distance / 1000; // конвертируем в километры
            return distance;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
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
    async getCoordinates(address) {
        const apiKey = process.env.OPENROUTE_API_KEY;
        if (!apiKey) {
            throw new Error('OPENROUTE_API_KEY is not set in environment variables');
        }
        try {
            const response = await axios_1.default.get('https://api.openrouteservice.org/geocode/search', {
                params: {
                    text: address,
                    size: 1,
                    layers: 'locality,street,address'
                },
                headers: {
                    'Authorization': apiKey,
                    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
                }
            });
            if (!response.data.features?.[0]?.geometry?.coordinates) {
                console.error('Invalid geocoding response:', response.data);
                return null;
            }
            const [longitude, latitude] = response.data.features[0].geometry.coordinates;
            return [latitude, longitude]; // возвращаем [широта, долгота]
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
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
exports.ReferenceService = ReferenceService;
