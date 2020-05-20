export default (hr) => {
	const d = new Date();
	return new Date(
		Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), hr, "00", "00")
	).getTime();
};
