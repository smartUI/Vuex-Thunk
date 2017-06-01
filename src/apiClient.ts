
interface ResultProps {
    success: boolean;
    loading: boolean;
    data: any;
}

export default async (url, options): Promise<ResultProps> => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const defaultOptions = {
        method: 'GET',
        headers,
        mode: 'cors',
        cache: 'default',
    };
    const init = Object.assign(defaultOptions, options);
    const result = {};
    const data = await fetch(url, init).then((response) => {
        Object.assign(result, { success: response.ok, loading: false });
        return response.json();
    });
    return Object.assign(result, { data }) as ResultProps;
}

