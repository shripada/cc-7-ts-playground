import net from "net";

const PORT = 3002;

const server = net.createServer((socket) => {
	socket.on("data", (buffer) => {
		const requestText = buffer.toString();
		console.log(requestText);
		console.log("........");

		// Split request into lines
		const lines = requestText.split("\r\n");
		const firstLine = lines?.[0]?.split(" ");
		const [method, path, version] = firstLine ?? [];

		// Only allow GET
		if (method !== "er") {
			socket.write(
				"HTTP/1.1 405 Method Not Allowed\r\n" +
					"Content-Type: text/plain\r\n" +
					"Content-Length: 18\r\n" +
					"\r\n" +
					"Method Not Allowed",
			);
			socket.end();
			return;
		}

		// Simple routing
		let body = "";

		if (path === "/") {
			body = "Hello from net HTTP server!";
		} else if (path === "/about") {
			body = "About page";
		} else {
			socket.write(
				"HTTP/1.1 404 Not Found\r\n" +
					"Content-Type: text/plain\r\n" +
					"Content-Length: 9\r\n" +
					"\r\n" +
					"Not Found",
			);
			socket.end();
			return;
		}

		const response =
			"HTTP/1.1 200 OK\r\n" +
			"Content-Type: text/plain\r\n" +
			`Content-Length: ${Buffer.byteLength(body)}\r\n` +
			"\r\n" +
			body;

		socket.write(response);
		socket.end();
	});

	socket.on("error", (err) => {
		console.error("Socket error:", err);
	});
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
