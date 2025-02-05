import {
	createMaterial,
	updateMaterial,
} from '../controllers/Materials/index.js';
import { verifyJwt } from '../middleware/JWTAuth.js';

export default function (fastify, opts, done) {
	fastify.get('/materials', { onRequest: [verifyJwt] }, (request, reply) => {});
	fastify.get('/material', { onRequest: [verifyJwt] }, (request, reply) => {});
	fastify.post('/material', { onRequest: [verifyJwt] }, (request, reply) => {
		return createMaterial(request, reply);
	});
	fastify.delete(
		'/material/:id',
		{ onRequest: [verifyJwt] },
		(request, reply) => {}
	);
	fastify.put('/material/:id', { onRequest: [verifyJwt] }, (request, reply) => {
		return updateMaterial(request, reply);
	});
	done();
}
