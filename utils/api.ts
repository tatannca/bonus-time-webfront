export const defaultApiConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_AP_ENDPOINT}`,
  timeout: 100000
};

export const endpoints = {
  public: () => `/public`,
  private: () => `/private`
};
