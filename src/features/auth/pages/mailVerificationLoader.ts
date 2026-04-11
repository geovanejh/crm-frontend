import { redirect } from 'react-router'
import { authService } from '@/features/auth/services/authService'

export async function mailVerificationLoader({
  request,
}: {
  request: Request
}) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token')

  if (!token) {
    throw new Response('Token is invalid or expired', { status: 400 })
  }

  await authService.verifyEmail(token)

  sessionStorage.setItem('emailVerified', 'true')

  return redirect('/login')
}
