import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { ReferenceService } from '../services/reference';
import { prisma } from '../lib/prisma';
import { logBusinessEvent, createRequestContext, logExternalApiError } from '../utils/logger';
import { asyncHandler, ValidationError } from '../utils/error-handler';
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
  }, asyncHandler(async (request, reply) => {
    const context = createRequestContext(request);
    const startTime = Date.now();
    
    try {
      const vehicleTypes = await referenceService.getVehicleTypes();
      
      logBusinessEvent('vehicle_types_retrieved', {
        count: vehicleTypes.length,
        duration: Date.now() - startTime
      }, context);
      
      return vehicleTypes;
    } catch (error) {
      logBusinessEvent('vehicle_types_retrieval_failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      }, context);
      throw error;
    }
  }));

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
  }, asyncHandler(async (request, reply) => {
    const context = createRequestContext(request);
    const startTime = Date.now();
    
    try {
      const cargoTypes = await referenceService.getCargoTypes();
      
      logBusinessEvent('cargo_types_retrieved', {
        count: cargoTypes.length,
        duration: Date.now() - startTime
      }, context);
      
      return cargoTypes;
    } catch (error) {
      logBusinessEvent('cargo_types_retrieval_failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      }, context);
      throw error;
    }
  }));

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
  }, asyncHandler(async (request, reply) => {
    const addressData = request.body as {
      city: string;
      street: string;
      building: string;
      country: string;
    };
    
    const context = createRequestContext(request);
    const startTime = Date.now();
    
    // Валидация данных
    if (!addressData.city || !addressData.street || !addressData.building || !addressData.country) {
      throw new ValidationError('All address fields are required');
    }
    
    try {
      const address = await referenceService.createAddress(addressData);
      
      logBusinessEvent('address_created', {
        addressId: address.id,
        city: address.city,
        duration: Date.now() - startTime
      }, context);
      
      return address;
    } catch (error) {
      logBusinessEvent('address_creation_failed', {
        addressData,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      }, context);
      throw error;
    }
  }));

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
  }, asyncHandler(async (request, reply) => {
    const { fromAddress, toAddress } = request.body as {
      fromAddress: string;
      toAddress: string;
    };
    
    const context = createRequestContext(request);
    const startTime = Date.now();
    
    // Валидация данных
    if (!fromAddress || !toAddress) {
      throw new ValidationError('Both fromAddress and toAddress are required');
    }
    
    try {
      const distance = await referenceService.calculateDistance(fromAddress, toAddress);
      
      logBusinessEvent('distance_calculated', {
        fromAddress,
        toAddress,
        distance,
        duration: Date.now() - startTime
      }, context);
      
      return { distance };
    } catch (error) {
      logBusinessEvent('distance_calculation_failed', {
        fromAddress,
        toAddress,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      }, context);
      throw error;
    }
  }));

  fastify.get('/suggest', asyncHandler(async (request, reply) => {
    const { text } = request.query as { text?: string };
    const context = createRequestContext(request);
    const startTime = Date.now();
    
    if (!text) {
      throw new ValidationError('Text parameter is required');
    }

    const apiKey = process.env.YANDEX_SUGGESSIONS_MAPS_API_KEY;
    if (!apiKey) {
      logBusinessEvent('api_key_missing', {
        service: 'Yandex Geosuggest API'
      }, context);
      throw new Error('API key is not configured');
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

    logBusinessEvent('geosuggest_request_started', {
      text: params.text,
      duration: Date.now() - startTime
    }, context);

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
        logBusinessEvent('geosuggest_invalid_response', {
          responseData: response.data,
          duration: Date.now() - startTime
        }, context);
        throw new Error('Invalid response from Yandex API');
      }

      logBusinessEvent('geosuggest_request_successful', {
        text: params.text,
        resultsCount: response.data.results?.length || 0,
        duration: Date.now() - startTime
      }, context);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logExternalApiError(error, 'Yandex Geosuggest API', '/suggest', context);
        
        if (error.response) {
          return reply.status(error.response.status).send({
            error: 'Failed to fetch suggestions',
            details: error.response.data
          });
        }
      }
      
      logBusinessEvent('geosuggest_request_failed', {
        text: params.text,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration: Date.now() - startTime
      }, context);
      
      throw error;
    }
  }));
} 