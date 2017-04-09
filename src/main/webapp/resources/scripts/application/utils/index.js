export function isNullOrUndefined(obj) {
	return obj == null || typeof(obj) == "undefined"
}

export function isEmptyObject(obj) {
	if (isNullOrUndefined(obj)) return true;
	return Object.keys(obj).length === 0;
}
