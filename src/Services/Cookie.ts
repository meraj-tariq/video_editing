import Cookies from 'universal-cookie';
const cookies = new Cookies();
const expiresAt = 24 * 60;
let date = new Date();
date.setTime(date.getTime() + expiresAt * 60 * 1000);
const options = { path: '/', expires: date };

interface Ioptions {
	path: string;
	expires: Date;
}

const Cookie = {
	get<R>(key: string) {
		return cookies.get<R>(`${key}`);
	},

	set(key: string, value: string | boolean | undefined, options?: Object) {
		cookies.set(`${key}`, `${value}`, options);
	},

	remove(key: string, options?: Object) {
		cookies.remove(`${key}`, options);
	},

	TOKEN(): string {
		return 'AUTH_TOKEN';
	},
	ADMIN(): string {
		return 'IS_ADMIN';
	},

	DEFAULT_CUSTOM_OPTIONS(): Ioptions {
		return options;
	},
};
export default Cookie;
