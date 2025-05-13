import { IHono } from '../../constrains';
import { UsersRepositories } from '../../stores/repositories';
import { fail, success } from '../../utils';

export async function createUserHandler(c: IHono): Promise<Response> {
	const data = await c.req.json();
	const result = await UsersRepositories.createUsers(c.env, data);
	if (result instanceof Error) {
		return fail('Failded create user');
	}

	if (result.length == 0) {
		return fail('User existed');
	}

	return success('Create user successfully', result);
}
