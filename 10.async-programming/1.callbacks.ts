import fs from "node:fs";
import path, { join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);

// JavaScript runtime is a single threaded system. Anything that needs to be done in background (a task that is costly, or needs I/O, networking) must be delegated to a native thread, and its result needs to be brought back to the main thread of the runtime, via an event loop system with an event queue.

// Before we get into these details, lets take look at how
// we use to get such things done using callback based APIs.

// Checking if a path is a file or directory.

function getFileType(
	path: string,
	callback: (
		err: NodeJS.ErrnoException | null,
		fileType?: "FILE" | "DIRECTORY" | "OTHER",
	) => void,
) {
	fs.stat(path, (err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
		if (err) {
			callback(err);
		} else {
			if (stats.isFile()) {
				callback(null, "FILE");
			} else if (stats.isDirectory()) {
				callback(null, "DIRECTORY");
			} else {
				callback(null, "OTHER");
			}
		}
	});
}

const resolvedPath = path.resolve(__dirname, "./1.callbacks.ts");
getFileType(resolvedPath, (err, filetype) => {
	if (err) {
		console.log(err.message);
	}
	console.log("FileType: ", filetype);
});

console.log("Getting the type of a path");

// A function that will print the file path, if the path is a file
// and it will print the names of the paths contained, if path is a directory
// function must be async
function getFileOrFolderContents(
	path: string,
	callback: (
		err: NodeJS.ErrnoException | null,
		contents?: string | string[],
	) => void,
) {
	// get the file type first, and depending on the type
	// either return the filepath, or the contents of the path
	getFileType(path, (err, fileType) => {
		// handle error first,
		if (err) {
			callback(err);
			return;
		}

		switch (fileType) {
			case "FILE": {
				callback(null, path);
				break;
			}
			case "DIRECTORY": {
				// get the names of the files or folders contained in the directory
				fs.readdir(path, (err, files) => {
					if (err) {
						callback(err);
						return;
					}
					callback(null, files);
				});
			}
		}
	});
}

getFileOrFolderContents(
	"/Users/shripada/projects/cc-7/typescript-playground/9.functional_programming/1. pure-functions.ts",
	(err, files) => {
		if (err) {
			console.log(err.message);
		} else {
			console.log(files);
		}
	},
);

// !exercise
export function getFileSize(
	path: string,
	callback: (err: Error | null, size?: number) => void,
) {
	// implement using callback based APIs of fs
	getFileType(path, (err, fileType) => {
		if (err) {
			callback(err);
			return;
		}
		switch (fileType) {
			case "FILE": {
				fs.stat(path, (err, stats) => {
					if (err) {
						callback(err);
						return;
					}
					callback(null, stats.size);
				});
				break;
			}
			case "DIRECTORY": {
				// get file sizes of each of the contained file/folder and sum it up.
				let fileSizes = [];
				getFileOrFolderContents(path, (innerErr, contents) => {
					if (err) {
						callback(innerErr);
						return;
					}
					// for each content, call the getFileSize recursively and
					// add up the file size.
					if (contents) {
						for (let c of contents) {
							const contentPath = join(path, c);
							getFileSize(contentPath, (err, fileSize) => {
								if (err) {
									callback(err);
									return;
								}
								if (fileSize) {
									fileSizes.push(fileSize);
								}
								if (fileSizes.length === contents.length) {
									callback(
										null,
										fileSizes.reduce(
											(accumulated, current) => accumulated + current,
											0,
										),
									);
								}
							});
						}
					}
				});
			}
		}
	});
}

// getFileSize(resolvedPath, (err, size) => {
// 	console.log("Size of: ", resolvedPath, ":-> ", size);
// });

getFileSize(
	"/Users/shripada/projects/cc-7/typescript-playground/9.functional_programming",
	(err, size) => {
		console.log("Size of: ", resolvedPath, ":-> ", size);
	},
);
