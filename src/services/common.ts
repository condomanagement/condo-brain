export interface GenericResponse {
  success: boolean;
  error?: string;
}

export interface ProcessLoginResponse {
  data: {
    success: boolean;
    token: string | null;
  };
}
