export default function (fastify, opts, done) {
	fastify.get('/', async function handler(request, reply) {
		return { hello: 'world' };
	});
	done();
}

// 3306
