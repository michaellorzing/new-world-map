import { PrismaClient } from '@prisma/client';

import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();

export default async function handler(req, res) {
	if (req.method === 'POST') {
		return await createUser(req, res);
	}
	if (req.method === 'GET') {
		return await getUsers(req, res);
	} else {
		return res
			.status(405)
			.json({ message: 'Method not allowed', success: false });
	}
}

//POST: adds new user
async function createUser(req, res) {
	await prisma.$connect();

	const { discord, email, name, server, map, plot } = req.body;

	const token = await getToken({ req });

	if (!token) {
		res.status(401).json({ message: 'You must be logged in.' });
		return;
	}
	try {
		const newUser = await prisma.user.create({
			data: { discord, email, name, server, town: map, plot },
		});

		return res.status(200).json(newUser, { success: true });
	} catch (err) {
		console.error('Request error', err);
		res.status(500).json({
			err: 'Something went wrong.',
			success: false,
		});
	}
}

//GET: gets all users
async function getUsers(req, res) {
	try {
		const users = await prisma.user.findMany();
		return res.status(200).json(users, { success: true });
	} catch (err) {
		res.status(500).json({
			err: 'Something went wrong getting all users.',
			success: false,
		});
	}
}
