// Import the framework and instantiate it
import Fastify from 'fastify';
import routes from './src/routes/index.js';
const fastify = Fastify({
	logger: true,
});

// Declare a route
fastify.register(routes);

// Run the server!
try {
	await fastify.listen({ port: 3000 });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
