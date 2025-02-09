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
	} = req.body;

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
		},
	});

	ordersKits.forEach(async (kit) => {
		console.log(kit);
		await prisma.ordersKits.create({
			data: {
				order_id: newOrder.id,
				kit_id: kit.kit_id,
				quantity: kit.quantity,
			},
		});
	});

	return res.send({ msg: 'Created new Order' });
};
export const updateOrder = async (req, res) => {
	const { id } = req.params;
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
	} = req.body;

	const newOrder = await prisma.order.update({
		where: { id },
		data: {
			address,
			neighborhood,
			city,
			state,
			observations,
			lat,
			long,
			qr_code,
		},
	});
	ordersKits.forEach(async (kit) => {
		console.log(kit);
		await prisma.ordersKits.update({
			where: { order_id },
			data: {
				kit_id: kit.id,
				quantity: kit.quantity,
			},
		});
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
	const orders = await prisma.order.findMany();
	return res.send(orders);
};
