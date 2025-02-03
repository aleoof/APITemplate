import { createUser, getUsers, login } from '../controllers/User/index.js';
import { verifyJwt } from '../middleware/JWTAuth.js';

export default function (fastify, opts, done) {
	fastify.post('/user', (request, reply) => {
		return createUser(request, reply);
	});

	fastify.get('/users', { onRequest: [verifyJwt] }, (request, reply) => {
		return getUsers(request, reply);
	});

	fastify.post('/login', (request, reply) => {
		return login(request, reply);
	});

	done();
}
