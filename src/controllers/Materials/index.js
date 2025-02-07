import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMaterial = async (req, res) => {
	const { description, quantity } = req.body;

	const material = await prisma.material.findFirst({
		where: { code },
	});

	if (material) {
		return res.status(400).send({ err: 'Existing material' });
	}

	const newMaterial = await prisma.material.create({
		data: {
			description,
			quantity,
		},
	});

	return res.send(newMaterial);
};
export const updateMaterial = async (req, res) => {
	const { id } = req.params;
	const { description, quantity } = req.body;

	const material = await prisma.material.findFirst({
		where: { code },
	});

	if (material) {
		return res.status(400).send({ err: 'Existing material' });
	}

	const newMaterial = await prisma.material.update({
		where: { id },
		data: {
			description,
			quantity,
		},
	});

	return res.send(newMaterial);
};
export const deleteMaterial = async (req, res) => {
	const { id } = req.params;
	await prisma.material.delete({
		where: { id },
	});
	return res.send({ msg: 'Successfully deleted ' });
};
export const getMaterial = async (req, res) => {
	const { id } = req.params;
	const materials = await prisma.material.findFirst({
		where: { id },
	});
	return res.send(materials);
};
export const listMaterials = async (req, res) => {
	const materials = await prisma.material.findMany();
	return res.send(materials);
};
