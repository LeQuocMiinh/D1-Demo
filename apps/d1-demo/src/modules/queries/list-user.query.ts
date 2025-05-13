import { IHono } from '../../constrains';
import { UsersRepositories } from '../../stores/repositories';

export async function listUsersQuery(c: IHono): Promise<Response> {
	return c.json({
		ok: true,
		data: await UsersRepositories.listUsers(c.env),
	});
}
