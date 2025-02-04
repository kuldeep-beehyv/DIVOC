beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
});
describe('when redis is disabled', () => {
    const sunbirdRegistryService = require('../src/services/sunbird.service');
    const contextController = require('../src/controllers/context.controller');
    const contants = require('../src/configs/constants');
    const {PassThrough} = require('stream');
    const mockedStream = new PassThrough();
    const redisService = require('../src/services/redis.service');
    const keycloakService = require('../src/services/keycloak.service');
    jest.mock('../src/configs/constants', () => {
        return {
            MINIO_BUCKET_NAME: 'context',
            MINIO_CONTEXT_URL: 'localhost:8081/api/v1/ContextURL'
        }
    });
    jest.mock('../src/services/sunbird.service', () => {
        return {
            createEntity: jest.fn(),
            getEntity: jest.fn()
        }
    });
    jest.mock('../src/services/redis.service', () => {
        return {
            storeKeyWithExpiry: jest.fn(),
            getKey: jest.fn()
        }
    });
    jest.mock('../src/services/keycloak.service', () => {
        return {
            getAdminToken: jest.fn()
        }
    })
    const config = require('../src/configs/config');
    jest.mock('../src/configs/config', () => {
        return {
            REDIS_ENABLED: false,
            MINIO_BUCKET_NAME: 'context'
        }
    })
    test('should add context entry in registry', async() => {
        const req = {
            baseUrl: '/vc-management/v1/context',
            file: {
                buffer: '123',
                originalname: 'context.json'
            },
            header: jest.fn().mockReturnValue('1')
        }
        const res = {
            send: function(){},
            json: function(d) {
            },
            status: function(s) {
                this.statusCode = s;
                return this;
            }
        };
        let minioClient = {
            putObject: jest.fn()
        }
        jest.spyOn(sunbirdRegistryService, 'createEntity').mockReturnValue({result: {ContextURL: {osid: '123'}}});
        await contextController.addContext(req, res, minioClient);
        const matchingString = /^(\/vc\-management\/v1\/context\/\d{13}\-context\.json)?$/;
        expect(minioClient.putObject).toHaveBeenCalledWith('context', expect.stringMatching(matchingString), '123');
        expect(sunbirdRegistryService.createEntity).toHaveBeenCalledWith('localhost:8081/api/v1/ContextURL', {url: expect.stringMatching(matchingString)}, '1');
        expect(redisService.storeKeyWithExpiry).not.toHaveBeenCalled();
    });

    test('should get context from minio', async() => {
        const req = {
            baseUrl: '/vc-management/v1/context',
            params: {
                osid: '1'
            },
            header: jest.fn().mockReturnValue('header')
        }
        const res = {
            send: function(){},
            set: function() {
                return this;
            },
            json: function(d) {
            },
            status: function(s) {
                this.statusCode = s;
                return this;
            }
        };
        let minioClient = {
            putObject: jest.fn(),
            getObject: jest.fn()
        }
        jest.spyOn(res, 'status');
        jest.spyOn(res, 'json');
        jest.spyOn(minioClient, 'getObject').mockReturnValue(mockedStream);
        jest.spyOn(keycloakService, 'getAdminToken').mockReturnValue('123');
        jest.spyOn(sunbirdRegistryService, 'getEntity').mockReturnValue({url: '/vc-management/v1/context/123'});
        await contextController.getContext(req, res, minioClient);
        mockedStream.emit('data', '{"key": "123",');
        mockedStream.emit('end', '"value": "456"}');   //   <-- end. not close.
        mockedStream.destroy();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({key: '123', value: '456'});
    });
})

describe('when redis is enabled', () => {
    jest.resetModules();
    const sunbirdRegistryService = require('../src/services/sunbird.service');
    const contextController = require('../src/controllers/context.controller');
    const contants = require('../src/configs/constants');
    const {PassThrough} = require('stream');
    const mockedStream = new PassThrough();
    const redisService = require('../src/services/redis.service');
    const keycloakService = require('../src/services/keycloak.service');
    jest.mock('../src/configs/constants', () => {
        return {
            MINIO_BUCKET_NAME: 'context',
            MINIO_CONTEXT_URL: 'localhost:8081/api/v1/ContextURL'
        }
    });
    jest.mock('../src/services/sunbird.service', () => {
        return {
            createEntity: jest.fn(),
            getEntity: jest.fn()
        }
    });
    jest.mock('../src/services/redis.service', () => {
        return {
            storeKeyWithExpiry: jest.fn(),
            getKey: jest.fn()
        }
    });
    const config = require('../src/configs/config');
    jest.mock('../src/configs/config', () => {
        return {
            REDIS_ENABLED: true,
            MINIO_BUCKET_NAME: 'context'
        }
    })
    jest.mock('../src/services/keycloak.service', () => {
        return {
            getAdminToken: jest.fn()
        }
    })
    test('should add context entry in registry', async() => {
        const req = {
            baseUrl: '/vc-management/v1/context',
            file: {
                buffer: '456',
                originalname: 'context.json'
            },
            header: jest.fn().mockReturnValue('1')
        }
        const res = {
            send: function(){},
            json: function(d) {
            },
            status: function(s) {
                this.statusCode = s;
                return this;
            }
        };
        let minioClient = {
            putObject: jest.fn()
        }
        jest.spyOn(sunbirdRegistryService, 'createEntity').mockReturnValue(Promise.resolve({result: {ContextURL: {osid: '1-123'}}}));
        await contextController.addContext(req, res, minioClient);
        const matchingString = /^(\/vc\-management\/v1\/context\/\d{13}\-context\.json)?$/;
        expect(minioClient.putObject).toHaveBeenCalledWith('context', expect.stringMatching(matchingString), '456');
        expect(sunbirdRegistryService.createEntity).toHaveBeenCalledWith('localhost:8081/api/v1/ContextURL', {url:expect.stringMatching(matchingString)}, '1');
        expect(redisService.storeKeyWithExpiry).toHaveBeenCalledWith('123', '456');
    });

    test('should get context from redis if available', async() => {
        const req = {
            baseUrl: '/vc-management/v1/context',
            params: {
                osid: '1'
            },
            header: jest.fn().mockReturnValue('header')
        }
        const res = {
            send: function(){},
            set: function() {
                return this;
            },
            json: function(d) {
            },
            status: function(s) {
                this.statusCode = s;
                return this;
            }
        };
        let minioClient = {
            putObject: jest.fn()
        }
        jest.spyOn(res, 'status');
        jest.spyOn(res, 'json');
        jest.spyOn(redisService, 'getKey').mockReturnValue('{"key": "123"}');
        await contextController.getContext(req, res, minioClient);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({key: '123'})
    });

    test('should get context from minio if not present in redis', async() => {
        const req = {
            baseUrl: '/vc-management/v1/context',
            params: {
                osid: '1'
            },
            header: jest.fn().mockReturnValue('header')
        }
        const res = {
            send: function(){},
            set: function() {
                return this;
            },
            json: function(d) {
            },
            status: function(s) {
                this.statusCode = s;
                return this;
            }
        };
        let minioClient = {
            putObject: jest.fn(),
            getObject: jest.fn()
        }
        jest.spyOn(res, 'status');
        jest.spyOn(res, 'json');
        jest.spyOn(redisService, 'getKey').mockReturnValue(undefined);
        jest.spyOn(minioClient, 'getObject').mockReturnValue(mockedStream);
        jest.spyOn(sunbirdRegistryService, 'getEntity').mockReturnValue('/vc-management/v1/context/123');
        await contextController.getContext(req, res, minioClient);
        mockedStream.emit('data', '{"key": "123",');
        mockedStream.emit('end', '"value": "456"}');
        mockedStream.destroy();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({key: '123', value: '456'});
    });

    test('should throw error if something is broken', async() => {
        const req = {
            baseUrl: '/vc-management/v1/context',
            params: {
                osid: '1'
            },
            header: jest.fn().mockReturnValue('header')
        }
        const res = {
            send: function(){},
            set: function() {
                return this;
            },
            json: function(d) {
            },
            status: function(s) {
                this.statusCode = s;
                return this;
            }
        };
        let minioClient = {
            putObject: jest.fn(),
            getObject: jest.fn()
        }
        jest.spyOn(res, 'status');
        jest.spyOn(res, 'json');
        jest.spyOn(redisService, 'getKey').mockReturnValue(undefined);
        jest.spyOn(keycloakService, 'getAdminToken').mockReturnValue('123');
        jest.spyOn(minioClient, 'getObject').mockReturnValue(mockedStream);
        jest.spyOn(sunbirdRegistryService, 'getEntity').mockReturnValue(Promise.reject('some error'))
        await contextController.getContext(req, res, minioClient);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: undefined});
    })
});