import { Controller, type Control } from 'react-hook-form'
import type { CostumerFormData } from '../../schemas/costumer.schema'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'

interface ContactInfoStepProps {
  control: Control<CostumerFormData>
}

export const ContactInfoStep = ({ control }: ContactInfoStepProps) => {
  return (
    <FieldGroup>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="costumer-email">Email</FieldLabel>
            <Input
              {...field}
              id="costumer-email"
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="john@example.com"
              autoComplete="off"
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="costumer-phone">Phone</FieldLabel>
            <Input
              {...field}
              id="costumer-phone"
              type="tel"
              aria-invalid={fieldState.invalid}
              placeholder="(11) 99999-9999"
              autoComplete="off"
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
