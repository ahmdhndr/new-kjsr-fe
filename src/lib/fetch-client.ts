import { env } from "./env/client";

type RequestInterceptor = (
  input: RequestInfo,
  init?: RequestInit
) => Promise<[RequestInfo, RequestInit?]>;
type ResponseInterceptor = (response: Response) => Promise<Response>;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

// Add request interceptor
export const addRequestInterceptor = (interceptor: RequestInterceptor) => {
  requestInterceptors.push(interceptor);
};

// Add response interceptor
export const addResponseInterceptor = (interceptor: ResponseInterceptor) => {
  responseInterceptors.push(interceptor);
};

const API_URL = env.NEXT_PUBLIC_API_URL;

// Custom fetch with interceptors
export const fetchClient = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  let reqInput = input;
  let reqInit = init;

  // inject base url
  if (typeof reqInput === "string" && !reqInput.startsWith("http")) {
    reqInput = `${API_URL}${reqInput}`;
  }

  for (const interceptor of requestInterceptors) {
    [reqInput, reqInit] = await interceptor(reqInput, reqInit);
  }

  let response = await fetch(reqInput, reqInit);

  for (const interceptor of responseInterceptors) {
    response = await interceptor(response);
  }

  return response;
};
