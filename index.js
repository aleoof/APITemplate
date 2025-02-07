// Import the framework and instantiate it
import fastifyJwt from '@fastify/jwt';
import Fastify from 'fastify';
import users from './src/routes/users.js';
import materials from './src/routes/materials.js';
import kits from './src/routes/kits.js';
import cors from '@fastify/cors';

const PORT = process.env.PORT || 3000;
const fastify = Fastify({
	logger: true,
});

await fastify.register(cors, {
	// put your options here
});
const secret = process.env.SECRET;
// Declare a route
fastify.register(fastifyJwt, {
	secret: secret,
});
fastify.register(users);
fastify.register(materials);
fastify.register(kits);

// Run the server!
try {
	await fastify.listen({ port: PORT });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
