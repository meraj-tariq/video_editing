export const HandleParams = (
	url: string,
	page: number = 1,
	pageSize: number = 12,
	searchValue: string = ''
) => {
	return `${url}?page=${page}&pageSize=${pageSize}&searchValue=${searchValue}`;
};

enum AUTH {
	LOGIN = '/login',
}

enum USER {
	REGISTER = '/register',
}

export const User = {
	auth: AUTH,
	user: USER,
};
