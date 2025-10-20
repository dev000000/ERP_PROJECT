
const Configs = {
  API_ENDPOINT: import.meta.env.VITE_API_ENDPOINT || "http://localhost:9717",
  API_ENDPOINT_2: import.meta.env.VITE_API_ENDPOINT_2 || "http://localhost:3001",
};

export default Object.freeze(Configs);