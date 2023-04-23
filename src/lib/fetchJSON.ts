export async function fetchJSON(input: RequestInfo | URL, init?: RequestInit | undefined) {
	const response = await fetch(input, init);
    if (response.status < 200 || response.status > 299)
        return Promise.reject(response);
    return response.json();
}