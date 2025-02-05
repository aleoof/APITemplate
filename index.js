// Import the framework and instantiate it
import fastifyJwt from '@fastify/jwt';
import Fastify from 'fastify';
import users from './src/routes/users.js';
import materials from './src/routes/materials.js';
import cors from '@fastify/cors';
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

// Run the server!
try {
	await fastify.listen({ port: 3000 });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
