import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { ReferenceService } from '../services/reference';
import { prisma } from '../lib/prisma';
import axios from 'axios';

export async function referenceRoutes(fastify: FastifyInstance) {
  const referenceService = new ReferenceService(prisma);

  fastify.get('/vehicle-types', {
    schema: {
      response: {
        200: Type.Array(Type.Object({
          id: Type.String(),
          name: Type.String(),
          maxWeight: Type.Number(),
          maxVolume: Type.Number()
        }))
      }
    }
  }, async () => {
    return referenceService.getVehicleTypes();
  });

  fastify.get('/cargo-types', {
    schema: {
      response: {
        200: Type.Array(Type.Object({
          id: Type.String(),
          name: Type.String(),
          description: Type.String()
        }))
      }
    }
  }, async () => {
    return referenceService.getCargoTypes();
  });

  fastify.post('/addresses', {
    schema: {
      body: Type.Object({
        city: Type.String(),
        street: Type.String(),
        building: Type.String(),
        country: Type.String()
      }),
      response: {
        200: Type.Object({
          id: Type.String(),
          city: Type.String(),
          street: Type.String(),
          building: Type.String(),
          country: Type.String(),
          createdAt: Type.String()
        })
      }
    }
  }, async (request, reply) => {
    const addressData = request.body as {
      city: string;
      street: string;
      building: string;
      country: string;
    };
    
    try {
      const address = await referenceService.createAddress(addressData);
      return address;
    } catch (error) {
      fastify.log.error('Error creating address:', error);
      return reply.status(500).send({ error: 'Failed to create address' });
    }
  });

  // Расчет расстояния между адресами
  fastify.post('/calculate-distance', {
    schema: {
      body: Type.Object({
        fromAddress: Type.String(),
        toAddress: Type.String()
      }),
      response: {
        200: Type.Object({
          distance: Type.Number()
        })
      }
    }
  }, async (request, reply) => {
    const { fromAddress, toAddress } = request.body as {
      fromAddress: string;
      toAddress: string;
    };
    
    try {
      const distance = await referenceService.calculateDistance(fromAddress, toAddress);
      return { distance };
    } catch (error) {
      fastify.log.error('Error calculating distance:', error);
      return reply.status(500).send({ 
        error: error instanceof Error ? error.message : 'Failed to calculate distance' 
      });
    }
  });

  fastify.get('/suggest', async (request, reply) => {
    const { text } = request.query as { text?: string };
    
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
      const response = await axios.get(
        'https://suggest-maps.yandex.ru/v1/suggest',
        { 
          params,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data || !response.data.results) {
        fastify.log.error('Invalid response from Yandex API:', response.data);
        return reply.status(500).send({ error: 'Invalid response from Yandex API' });
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
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