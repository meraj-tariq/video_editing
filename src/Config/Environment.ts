export interface Environment {
  name: "local" | "dev" | "staging" | "production";
  veegixUrl: string;
  veegixIp: string;
}

const environment: Environment = {
  name: process.env.REACT_APP_ENVIRONMENT as Environment["name"],
  veegixUrl: process.env.REACT_APP_VEEGIX_URL!,
  veegixIp: process.env.REACT_APP_VEEGIX_IP!,
};

// Shorter for environment to minimize space
export const env = environment;

export default environment;
