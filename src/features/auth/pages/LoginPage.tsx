import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { LoginForm } from '@/shared/components/login-form'
import { useAuthStore } from '@/features/auth/stores/authStore'
import { loginSchema, type LoginFormData } from '@/features/auth/schemas/login.schema'
import { useApiCall } from '@/shared/hooks/useApiCall'

export const LoginPage = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const { execute, isLoading } = useApiCall(login)

  useEffect(() => {
    const emailVerified = sessionStorage.getItem('emailVerified')
    if (emailVerified === 'true') {
      sessionStorage.removeItem('emailVerified')
      toast.success('Email verificado com sucesso!')
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    const result = await execute(data)
    if (result) {
      navigate('/')
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-10">
      <LoginForm
        register={register}
        errors={errors}
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm md:max-w-xl"
      />
    </div>
  )
}
