import net from "net";

const PORT = 3002;
const HOST = "127.0.0.1";

// Change path to test different routes
const path = "/";

const client = net.createConnection({ port: PORT, host: HOST }, () => {
	console.log("Connected to server");

	// Manually construct HTTP GET request
	const request =
		`GET ${path} HTTP/1.1\n\n` +
		`Host: ${HOST}:${PORT}\n\n` +
		`Connection: close\n` +
		`\n`;

	client.write(request);
});

client.on("data", (data) => {
	console.log("Response from server:\n");
	console.log(data.toString());
});

client.on("end", () => {
	console.log("\nDisconnected from server");
});

client.on("error", (err) => {
	console.error("Client error:", err);
});

const responseData = await fetch("http://localhost:3002/about");

console.log(await responseData.text());

const responseData1 = await fetch("http://localhost:3002/", {
	method: "er",
});

console.log(responseData1);
