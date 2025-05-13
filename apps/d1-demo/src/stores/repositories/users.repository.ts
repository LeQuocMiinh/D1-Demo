import { Env } from '../../constrains';
import { UsersType } from '../../dtos';
import { catchError } from '../../utils';

async function existUser(env: Env, userId: number): Promise<UsersType[] | Error> {
	try {
		const stmt = env.DB.prepare('SELECT * FROM users WHERE id = ?');
		const rs = await stmt.bind(userId).all();
		return rs.results.map((row) => ({
			id: row.id as number,
			name: row.name as string,
			age: row.age as number,
		}));
	} catch (error) {
		return new Error(catchError(error));
	}
}

async function listUsers(env: Env, limit = 20, offset = 0): Promise<UsersType[] | Error> {
	try {
		const stmt = env.DB.prepare('SELECT * FROM users LIMIT ? OFFSET ?');
		const rs = await stmt.bind(limit, offset).all();
		return rs.results.map((row) => ({
			id: row.id as number,
			name: row.name as string,
			age: row.age as number,
		}));
	} catch (error) {
		return new Error(catchError(error));
	}
}

async function updateUser(env: Env, userId: number, data: Omit<UsersType, 'id'>): Promise<UsersType[] | Error> {
	try {
		const stmt = env.DB.prepare('UPDATE users SET name = ?, age = ? WHERE id = ?');
		await stmt.bind(data.name, data.age, userId).run();

		// Trả lại bản ghi sau khi cập nhật
		const checkStmt = env.DB.prepare('SELECT * FROM users WHERE id = ?');
		const rs = await checkStmt.bind(userId).all();
		return rs.results.map((row) => ({
			id: row.id as number,
			name: row.name as string,
			age: row.age as number,
		}));
	} catch (error) {
		return new Error(catchError(error));
	}
}

async function createUsers(env: Env, data: Omit<UsersType, 'id'>): Promise<UsersType[] | Error> {
	try {
		const stmt = env.DB.prepare('INSERT INTO users (name, age) VALUES (?, ?) RETURNING *');
		const rs = await stmt.bind(data.name, data.age).all();
		return rs.results.map((row) => ({
			id: row.id as number,
			name: row.name as string,
			age: row.age as number,
		}));
	} catch (error) {
		return new Error(catchError(error));
	}
}

async function deleteAllUsers(env: Env): Promise<D1Response | Error> {
	try {
		const stmt = env.DB.prepare('DELETE FROM users');
		return await stmt.run();
	} catch (error) {
		return new Error(catchError(error));
	}
}

async function deleteOneUser(env: Env, userId: number): Promise<D1Response | Error> {
	try {
		const stmt = env.DB.prepare('DELETE FROM users WHERE id = ?');
		return await stmt.bind(userId).run();
	} catch (error) {
		return new Error(catchError(error));
	}
}

export const UsersRepositories = {
	existUser,
	listUsers,
	createUsers,
	updateUser,
	deleteAllUsers,
	deleteOneUser,
};
