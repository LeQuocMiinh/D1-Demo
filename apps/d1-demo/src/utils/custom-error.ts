export function fail(message: string, errors?: string | string[]): Response {
	let details = [];
	if (errors) {
		details = typeof errors === 'string' && (errors.startsWith('{') || errors.startsWith('[')) ? JSON.parse(errors) : errors;
	}
	return new Response(
		JSON.stringify({
			ok: false,
			error: {
				code: 1000,
				message: message,
				details,
			},
		}),
	);
}

export function success(message: string, data?: unknown): Response {
	return new Response(
		JSON.stringify({
			ok: true,
			message,
			data,
		}),
	);
}

export function catchError(error: unknown): string {
	let msg: string;

	if (error instanceof Error) {
		msg = error.message;
	} else {
		msg = String(error);
	}
	return msg;
}
