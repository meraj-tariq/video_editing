const LS = {
	get(key: string) {
		const retrieved: any = localStorage.getItem(key);
		return JSON.parse(retrieved);
	},

	set(key: string, value: any) {
		localStorage.setItem(key, JSON.stringify(value));
	},

	removeItem(key: string) {
		localStorage.remove(`${key}`);
	},

	clear() {
		return localStorage.clear();
	},
};
export default LS;
