import fs from "node:fs";

// function getFileType(
// 	path: string,
// 	callback: (
// 		err: NodeJS.ErrnoException | null,
// 		fileType?: "FILE" | "DIRECTORY" | "OTHER",
// 	) => void,
// ) {
// 	fs.stat(path, (err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
// 		if (err) {
// 			callback(err);
// 		} else {
// 			if (stats.isFile()) {
// 				callback(null, "FILE");
// 			} else if (stats.isDirectory()) {
// 				callback(null, "DIRECTORY");
// 			} else {
// 				callback(null, "OTHER");
// 			}
// 		}
// 	});
// }

function getFileType(path: string): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
	return new Promise((resolve, reject) => {
		fs.stat(path, (err: NodeJS.ErrnoException | null, stats: fs.Stats) => {
			if (err) {
				reject(err);
			} else {
				if (stats.isFile()) {
					resolve("FILE");
				} else if (stats.isDirectory()) {
					resolve("DIRECTORY");
				} else {
					resolve("OTHER");
				}
			}
		});
	});
}

getFileType("./nonexistent")
	.then((fileType) => console.log("File Type: ", fileType))
	.catch((err) => console.log(err.message))
	.finally(() => console.log("Concluded the file type check"));

getFileType(
	"/Users/shripada/projects/cc-7/typescript-playground/10.async-programming/3.promisify.ts",
)
	.then((fileType) => console.log("File Type: ", fileType))
	.catch((err) => console.log(err.message))
	.finally(() => console.log("Concluded the file type check for valid path"));

// function getFileOrFolderContents(
// 	path: string,
// 	callback: (
// 		err: NodeJS.ErrnoException | null,
// 		contents?: string | string[],
// 	) => void,
// ) {
// 	// get the file type first, and depending on the type
// 	// either return the filepath, or the contents of the path
// 	getFileType(path, (err, fileType) => {
// 		// handle error first,
// 		if (err) {
// 			callback(err);
// 			return;
// 		}

// 		switch (fileType) {
// 			case "FILE": {
// 				callback(null, path);
// 				break;
// 			}
// 			case "DIRECTORY": {
// 				// get the names of the files or folders contained in the directory
// 				fs.readdir(path, (err, files) => {
// 					if (err) {
// 						callback(err);
// 						return;
// 					}
// 					callback(null, files);
// 				});
// 			}
// 		}
// 	});
// }

function getFileOrFolderContents(path: string): Promise<string | string[]> {
	return new Promise<string | string[]>((resolve, reject) => {
		getFileType(path)
			.then((fileType) => {
				switch (fileType) {
					case "FILE": {
						resolve(path);
						break;
					}
					case "DIRECTORY": {
						// get the names of the files or folders contained in the directory
						fs.readdir(path, (err, files) => {
							if (err) {
								reject(err);
							}
							resolve(files);
						});
					}
				}
			})
			.catch((err) => {
				reject(err); // Or can also throw the err
			});
	});
}

getFileOrFolderContents("./nonexist")
	.then((contents) => console.log(contents))
	.catch((err) => console.log(err));

getFileOrFolderContents(
	"/Users/shripada/projects/cc-7/typescript-playground/10.async-programming",
)
	.then((contents) => console.log(contents))
	.catch((err) => console.log(err));
