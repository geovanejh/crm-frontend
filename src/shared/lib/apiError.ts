import { HttpError } from './httpClient'

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Invalid request.',
  401: 'You need to sign in to continue.',
  403: "You don't have permission to do that.",
  404: 'The requested resource was not found.',
  409: 'This conflicts with existing data.',
  422: 'The submitted data is invalid.',
  429: 'Too many requests. Please wait a moment.',
  500: 'Server error. Please try again later.',
  502: 'Service temporarily unavailable.',
  503: 'Service is under maintenance.',
}

export interface ApiErrorInfo {
  message: string
  status: number | null
  isNetworkError: boolean
  data: unknown
}

export const parseApiError = (error: unknown): ApiErrorInfo => {
  if (error instanceof HttpError) {
    const body = error.data as Record<string, unknown> | null
    const serverMessage = body && typeof body.message === 'string' ? body.message : null

    return {
      message: serverMessage ?? STATUS_MESSAGES[error.status] ?? `Request Failed (${error.status}).`,
      status: error.status,
      isNetworkError: false,
      data: error.data,
    }
  }

  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return {
      message: 'Network error. Check your connection.',
      status: null,
      isNetworkError: true,
      data: null,
    }
  }

  return {
    message: 'An unexpected error occurred.',
    status: null,
    isNetworkError: false,
    data: null,
  }
}
