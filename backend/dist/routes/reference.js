"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.referenceRoutes = referenceRoutes;
const typebox_1 = require("@sinclair/typebox");
const reference_1 = require("../services/reference");
const prisma_1 = require("../lib/prisma");
const axios_1 = __importDefault(require("axios"));
async function referenceRoutes(fastify) {
    const referenceService = new reference_1.ReferenceService(prisma_1.prisma);
    fastify.get('/vehicle-types', {
        schema: {
            response: {
                200: typebox_1.Type.Array(typebox_1.Type.Object({
                    id: typebox_1.Type.String(),
                    name: typebox_1.Type.String(),
                    maxWeight: typebox_1.Type.Number(),
                    maxVolume: typebox_1.Type.Number()
                }))
            }
        }
    }, async () => {
        return referenceService.getVehicleTypes();
    });
    fastify.get('/cargo-types', {
        schema: {
            response: {
                200: typebox_1.Type.Array(typebox_1.Type.Object({
                    id: typebox_1.Type.String(),
                    name: typebox_1.Type.String(),
                    description: typebox_1.Type.String()
                }))
            }
        }
    }, async () => {
        return referenceService.getCargoTypes();
    });
    fastify.post('/addresses', {
        schema: {
            body: typebox_1.Type.Object({
                city: typebox_1.Type.String(),
                street: typebox_1.Type.String(),
                building: typebox_1.Type.String(),
                country: typebox_1.Type.String()
            }),
            response: {
                200: typebox_1.Type.Object({
                    id: typebox_1.Type.String(),
                    city: typebox_1.Type.String(),
                    street: typebox_1.Type.String(),
                    building: typebox_1.Type.String(),
                    country: typebox_1.Type.String(),
                    createdAt: typebox_1.Type.String()
                })
            }
        }
    }, async (request, reply) => {
        const addressData = request.body;
        try {
            const address = await referenceService.createAddress(addressData);
            return address;
        }
        catch (error) {
            fastify.log.error('Error creating address:', error);
            return reply.status(500).send({ error: 'Failed to create address' });
        }
    });
    // Расчет расстояния между адресами
    fastify.post('/calculate-distance', {
        schema: {
            body: typebox_1.Type.Object({
                fromAddress: typebox_1.Type.String(),
                toAddress: typebox_1.Type.String()
            }),
            response: {
                200: typebox_1.Type.Object({
                    distance: typebox_1.Type.Number()
                })
            }
        }
    }, async (request, reply) => {
        const { fromAddress, toAddress } = request.body;
        try {
            const distance = await referenceService.calculateDistance(fromAddress, toAddress);
            return { distance };
        }
        catch (error) {
            fastify.log.error('Error calculating distance:', error);
            return reply.status(500).send({
                error: error instanceof Error ? error.message : 'Failed to calculate distance'
            });
        }
    });
    fastify.get('/suggest', async (request, reply) => {
        const { text } = request.query;
        if (!text) {
            return reply.status(400).send({ error: 'Text parameter is required' });
        }
        const apiKey = process.env.YANDEX_SUGGESSIONS_MAPS_API_KEY;
        if (!apiKey) {
            fastify.log.error('YANDEX_SUGGESSIONS_MAPS_API_KEY is not set in environment variables');
            return reply.status(500).send({ error: 'API key is not configured' });
        }
        const params = {
            text: decodeURIComponent(text),
            apikey: apiKey,
            lang: 'ru_RU',
            results: '10',
            types: 'locality,street,house',
            print_address: '1',
            highlight: '1'
        };
        fastify.log.info('Sending request to Yandex Geosuggest API with params:', params);
        try {
            const response = await axios_1.default.get('https://suggest-maps.yandex.ru/v1/suggest', {
                params,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (!response.data || !response.data.results) {
                fastify.log.error('Invalid response from Yandex API:', response.data);
                return reply.status(500).send({ error: 'Invalid response from Yandex API' });
            }
            return response.data;
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                fastify.log.error('Yandex API error:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    config: {
                        url: error.config?.url,
                        params: error.config?.params
                    }
                });
                if (error.response) {
                    return reply.status(error.response.status).send({
                        error: 'Failed to fetch suggestions',
                        details: error.response.data
                    });
                }
            }
            fastify.log.error('Unexpected error:', error);
            return reply.status(500).send({
                error: 'Failed to fetch suggestions',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    });
}
