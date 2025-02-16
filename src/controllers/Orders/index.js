import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
	const {
		address,
		neighborhood,
		city,
		state,
		observations,
		lat,
		long,
		qr_code,
		ordersKits,
		protocol,
	} = req.body;

	const date = new Date();

	const newOrder = await prisma.order.create({
		data: {
			address,
			neighborhood,
			city,
			state,
			observations,
			lat,
			long,
			qr_code,
			registerDay: date,
			protocol,
		},
	});

	ordersKits.forEach(async (kit) => {
		await prisma.ordersKits.create({
			data: {
				order_id: newOrder.id,
				kit_id: kit.kit_id,
				quantity: kit.quantity,
			},
		});
	});

	return res.send(newOrder);
};
export const updateOrder = async (req, res) => {
	const { id } = req.params;
	const orderId = parseInt(id);
	const {
		address,
		neighborhood,
		city,
		state,
		ordersKits,
		observations,
		lat,
		long,
		qr_code,
		protocol,
	} = req.body;

	const newOrder = await prisma.order.update({
		where: { id: orderId },
		data: {
			address,
			neighborhood,
			city,
			state,
			observations,
			lat,
			long,
			qr_code,
			protocol,
		},
	});
	ordersKits.forEach(async (kit) => {
		const findKit = await prisma.ordersKits.findFirst({
			where: { order_id: newOrder.id, kit_id: kit.kit_id },
		});

		if (!findKit) {
			await prisma.ordersKits.create({
				data: {
					order_id: newOrder.id,
					kit_id: kit.kit_id,
					quantity: kit.quantity,
				},
			});
		} else {
			await prisma.ordersKits.update({
				where: { id: findKit.id },
				data: {
					kit_id: kit.kit_id,
					quantity: kit.quantity,
				},
			});
		}
	});
	return res.send(newOrder);
};
export const deleteOrder = async (req, res) => {
	const { id } = req.params;
	const deleteID = parseInt(id);
	await prisma.order.update({
		where: { id: deleteID },
		data: { active: false },
	});
	return res.send({ msg: 'Successfully deleted ' });
};
export const getOrder = async (req, res) => {
	const { id } = req.params;
	const orderId = parseInt(id);
	const orders = await prisma.order.findFirst({
		where: { id: orderId },
	});
	const ordersKits = await prisma.ordersKits.findMany({
		where: { order_id: orderId },
		omit: { id: true, order_id: true },
	});

	return res.send({ ...orders, ordersKits });
};
export const listOrders = async (req, res) => {
	const orders = await prisma.order.findMany({
		where: { active: true },
		orderBy: [
			{
				id: 'desc',
			},
		],
	});
	return res.send(orders);
};

export const removeKitOrder = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	const kitOrderId = parseInt(id);
	await prisma.ordersKits.delete({
		where: { id: kitOrderId },
	});

	return res.send({ msg: 'removed' });
};

export const findOrdersByDate = async (req, res) => {
	const { start, end } = req.query;

	const filteredByDate = await prisma.order.findMany({
		where: {
			registerDay: {
				lte: new Date(end),
				gte: new Date(start),
			},
		},
	});

	const orderList = await filteredByDate.map(async (order) => {
		const orderId = order.id;

		const ordersKits = await prisma.ordersKits.findMany({
			where: { order_id: orderId },
			include: {
				kit: true,
			},
			omit: {
				id: true,
				order_id: true,
				kit_id: true,
			},
		});

		return { order, ordersKits };
	});

	const all = await Promise.all(orderList);

	res.send(all);
};

export const duplicateOrder = async (req, res) => {
	const { id } = req.params;
	const orderId = parseInt(id);
	const orders = await prisma.order.findFirst({
		where: { id: orderId },
		omit: { id: true },
	});

	const ordersKits = await prisma.ordersKits.findMany({
		where: { order_id: orderId },
		omit: { id: true, order_id: true },
	});

	const duplicateOrder = await prisma.order.create({
		data: { ...orders },
	});
	ordersKits.forEach(async (kit) => {
		await prisma.ordersKits.create({
			data: {
				order_id: duplicateOrder.id,
				kit_id: kit.kit_id,
				quantity: kit.quantity,
			},
		});
	});
};
