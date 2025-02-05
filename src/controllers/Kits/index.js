import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createKit = async (req, res) => {
	const { code, description, material } = req.body;

	const kit = await prisma.kit.findFirst({
		where: { code },
	});

	if (kit) {
		return res.status(400).send({ err: 'Existing material' });
	}

	const newKit = await prisma.kit.create({
		data: {
			code,
			description,
			material,
		},
	});

	return res.send(newKit);
};
export const updateKit = async (req, res) => {
	const { id } = req.params;
	const { code, description, material } = req.body;

	const kit = await prisma.kit.findFirst({
		where: { code },
	});

	if (kit) {
		return res.status(400).send({ err: 'Existing material' });
	}

	const newKit = await prisma.kit.update({
		where: { id },
		data: {
			code,
			description,
			material,
		},
	});

	return res.send(newKit);
};
export const deleteKit = async (req, res) => {
	const { id } = req.params;
	await prisma.kit.delete({
		where: { id },
	});
	return res.send({ msg: 'Successfully deleted ' });
};
export const getKit = async (req, res) => {
	const { id } = req.params;
	const kit = await prisma.kit.findFirst({
		where: { id },
	});
	return res.send(kit);
};
export const listKits = async (req, res) => {
	const kits = await prisma.kit.findMany();
	return res.send(kits);
};
