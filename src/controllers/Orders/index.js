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
			qr_code: parseInt(qr_code),
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
			qr_code: parseInt(qr_code),
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
	const { kitid, orderid } = req.params;
	const kitId = parseInt(kitid);
	const orderId = parseInt(orderid);

	const findMaterial = await prisma.ordersKits.findFirst({
		where: { kit_id: kitId, order_id: orderId },
	});

	await prisma.ordersKits.delete({
		where: { id: findMaterial.id },
	});

	return res.send({ msg: 'removed' });
};

export const findOrdersByDate = async (req, res) => {
	const { start, end } = req.query;

	const startDate = new Date(`${start}`);
	const endDate = new Date(`${end}`);
	const dateEndToIso = endDate.setHours(23, 59, 59, 999);
	const dateStartToIso = startDate.setHours(0, 0, 0, 0);

	console.log(
		new Date(`${end}T00:00:00.000Z`),
		new Date(`${start}T23:59:59.999Z`)
	);

	const filteredByDate = await prisma.order.findMany({
		where: {
			active: true,
			registerDay: {
				lte: new Date(`${end}T23:59:59.999Z`),
				gte: new Date(`${start}T00:00:00.000Z`),
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
		omit: { id: true },
		orderBy: { qr_code: 'desc' },
	});

	const ordersKits = await prisma.ordersKits.findMany({
		where: { order_id: orderId },
		omit: { id: true, order_id: true },
	});

	const duplicateOrder = await prisma.order.create({
		data: {
			...orders,
			qr_code: parseInt(orders.qr_code) + 1,
			registerDay: new Date(),
			active: true,
			duplicated: true,
		},
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
