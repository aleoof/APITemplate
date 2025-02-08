const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
	const { description, quantity, kitId } = req.body;

	const newOrder = await prisma.order.create({
		data: {
			description,
			quantity,
			kitId,
		},
	});

	return res.send(newOrder);
};
export const updateOrder = async (req, res) => {
	const { id } = req.params;
	const { description, quantity, kitId } = req.body;

	const newOrder = await prisma.order.update({
		where: { id },
		data: {
			description,
			quantity,
			kitId,
		},
	});

	return res.send(newOrder);
};
export const deleteOrder = async (req, res) => {
	const { id } = req.params;
	await prisma.order.delete({
		where: { id },
	});
	return res.send({ msg: 'Successfully deleted ' });
};
export const getOrder = async (req, res) => {
	const { id } = req.params;
	const orders = await prisma.order.findFirst({
		where: { id },
	});
	return res.send(orders);
};
export const listOrders = async (req, res) => {
	const orders = await prisma.order.findMany();
	return res.send(orders);
};
