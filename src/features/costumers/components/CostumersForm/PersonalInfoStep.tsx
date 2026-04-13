import { type Control, Controller } from 'react-hook-form'
import { Input } from '@/shared/components/ui/input'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/components/ui/field'
import type { CostumerFormData } from '../../schemas/costumer.schema'

interface PersonalInfoStepProps {
  control: Control<CostumerFormData>
}

export const PersonalInfoStep = ({ control }: PersonalInfoStepProps) => {
  return (
    <FieldGroup>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="costumer-name">Name</FieldLabel>
            <Input
              {...field}
              id="costumer-name"
              aria-invalid={fieldState.invalid}
              placeholder="John Doe"
              autoComplete="off"
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Controller
        name="document"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="costumer-document">Document</FieldLabel>
            <Input
              {...field}
              id="costumer-document"
              aria-invalid={fieldState.invalid}
              placeholder="123.456.789-00"
              autoComplete="off"
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <Controller
        name="birthDate"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="costumer-birth-date">Birth Date</FieldLabel>
            <Input
              {...field}
              id="costumer-birth-date"
              type="date"
              aria-invalid={fieldState.invalid}
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
