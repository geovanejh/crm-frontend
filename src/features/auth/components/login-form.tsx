import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Link } from 'react-router'
import { Building } from 'lucide-react'

interface LoginFormFields {
  email: string
  password: string
}

interface LoginFormProps extends Omit<React.ComponentProps<'div'>, 'onSubmit'> {
  register: UseFormRegister<LoginFormFields>
  errors: FieldErrors<LoginFormFields>
  isLoading?: boolean
  onSubmit: React.SubmitEventHandler<HTMLFormElement>
}

export function LoginForm({ className, register, errors, isLoading, onSubmit, ...props }: LoginFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0 min-h[404px]">
        <CardContent>
          <form className="p-6 md:p-8" onSubmit={onSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex items-center gap-2">
                  <Building />
                  <h1 className="text-2xl font-bold">CRM Front-end </h1>
                </div>
                <p className="text-balance text-muted-foreground">Login to your Acme Inc account</p>
              </div>
              <Field data-invalid={!!errors.email || undefined}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={!!errors.email}
                  {...register('email')}
                />
                <FieldError>{errors.email?.message}</FieldError>
              </Field>
              <Field data-invalid={!!errors.password || undefined}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" aria-invalid={!!errors.password} {...register('password')} />
                <FieldError>{errors.password?.message}</FieldError>
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account?
                <Link to="/register"> Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
