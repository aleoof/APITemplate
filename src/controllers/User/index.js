import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
const { hashSync, genSaltSync, compareSync } = bcryptjs;

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
	const { login, password } = req.body;

	const salt = genSaltSync();
	const hash = hashSync(password, salt);

	const user = await prisma.user.findFirst({
		where: {
			login,
		},
	});

	if (user) {
		return res.status(400).send({ err: 'Used User name' });
	}

	const newUser = await prisma.user.create({
		data: {
			login,
			password: hash,
			name: '',
			access_level: 0,
			expiration: 0,
			picture: '',
		},
	});

	return res.status(201).send({ msg: `User ${newUser.login} created` });
};

export const login = async (req, res) => {
	const { login, password } = req.body;

	const user = await prisma.user.findFirst({
		where: {
			login,
		},
	});

	if (!user) {
		return res.status(400).send({ err: 'User not found' });
	}

	const correctUser = compareSync(password, user.password);

	if (!correctUser) {
		return res.status(400).send({ err: 'Incorrect Password' });
	}

	try {
		const token = await res.jwtSign(
			{ login: user.login },
			{ sign: { sub: user.id } }
		);
		return res.send({ token });
	} catch (err) {
		return res.status(400).send({ msg: 'Internal error', err });
	}
};

export const getUsers = async (req, res) => {
	const users = await prisma.user.findMany({
		omit: { password: true, login: true },
	});

	return res.send(users);
};
