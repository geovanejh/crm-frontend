export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  email: string
  activated: boolean
}

export interface RegisterRequest {
  email: string
  password: string
}
