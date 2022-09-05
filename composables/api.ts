type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const api = (method: HttpMethod) => async <Res>(endpoint: string, payload?: unknown): Promise<Res> => {
    const env = useRuntimeConfig();

    const res = await fetch(`${env.public.apiEndpoint}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userState.token}`
        },
        body: payload ? JSON.stringify(payload) : undefined
    });

    const data = await res.json() as Res;

    return data;
}