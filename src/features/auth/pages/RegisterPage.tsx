import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { SignupForm } from '@/features/auth/components/signup-form'
import { authService } from '@/features/auth/services/authService'
import { registerSchema, type RegisterFormData } from '@/features/auth/schemas/register.schema'
import { useApiCall } from '@/shared/hooks/useApiCall'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const { execute, isLoading } = useApiCall(
    (data: { email: string; password: string; name: string; phone: string }) =>
      authService.register(data),
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    const result = await execute({
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
    })
    if (result) {
      toast.success('Account created! Please check your email to verify.')
      navigate('/login')
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6 md:p-10">
      <SignupForm
        register={register}
        errors={errors}
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm md:max-w-xl"
      />
    </div>
  )
}
