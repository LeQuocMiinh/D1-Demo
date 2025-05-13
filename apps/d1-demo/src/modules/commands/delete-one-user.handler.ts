import { IHono } from '../../constrains';
import { UsersRepositories } from '../../stores/repositories';
import { catchError, fail, success } from '../../utils';

export async function deleteOneUserHandler(c: IHono): Promise<Response> {
	try {
		const userId = Number(c.req.query('userId'));

		const existsUser = await UsersRepositories.existUser(c.env, userId);
		if (existsUser instanceof Error) {
			return fail('Invalid Argument', existsUser.message);
		}

		if (existsUser.length == 0) {
			return fail('User is not exists');
		}

		const result = await UsersRepositories.deleteOneUser(c.env, userId);
		if (result instanceof Error) {
			return fail('Invalid Argument', result.message);
		}

		if (!result.success) {
			return fail('Failed delete all users');
		}
		return success(`Delete user successfully`);
	} catch (error) {
		return fail('An occurs errors', catchError(error));
	}
}
