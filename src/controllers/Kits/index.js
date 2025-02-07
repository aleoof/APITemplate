import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createKit = async (req, res) => {
	const { description, material_id, material } = req.body;

	const newKit = await prisma.kit.create({
		data: {
			description,
			material_id,
			material,
		},
	});

	return res.send(newKit);
};
export const updateKit = async (req, res) => {
	const { id } = req.params;
	const { description, material_id } = req.body;

	if (kit) {
		return res.status(400).send({ err: 'Existing Kit' });
	}

	const newKit = await prisma.kit.update({
		where: { id },
		data: {
			description,
			material_id,
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
