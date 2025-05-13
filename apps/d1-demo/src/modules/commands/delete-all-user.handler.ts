import { IHono } from '../../constrains';
import { UsersRepositories } from '../../stores/repositories';
import { catchError, fail, success } from '../../utils';

export async function deleteAllUsers(c: IHono): Promise<Response> {
	try {
		const result = await UsersRepositories.deleteAllUsers(c.env);
		if (result instanceof Error) {
			return fail('Invalid Argument', result.message);
		}

		if (!result.success) {
			return fail('Failed delete all users');
		}

		return success('Delete all users successfully');
	} catch (error) {
		return fail('An erros', catchError(error));
	}
}
