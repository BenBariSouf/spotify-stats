// Higher order function for async/await error handling
export const catchErrors = (fn) =>
	function (...args) {
		return fn(...args).catch((err) => {
			console.error(err);
		});
	};

// Format milliseconds to time duration
export const formatDuration = (ms) => {
	const minutes = Math.floor(ms / 60000);
	const seconds = Math.floor((ms % 60000) / 1000);
	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
