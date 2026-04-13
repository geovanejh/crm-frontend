import { Controller, type Control } from 'react-hook-form'
import type { CostumerFormData } from '../../schemas/costumer.schema'
import { Field, FieldGroup, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'

interface AccountDetailsStepProps {
  control: Control<CostumerFormData>
}

export const AccountDetailsStep = ({
  control,
}: AccountDetailsStepProps) => {
  return (
    <FieldGroup>
      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="costumer-notes">Notes</FieldLabel>
            <Input
              {...field}
              value={field.value ?? ''}
              id="costumer-notes"
              placeholder="Additional notes (optional)"
              autoComplete="off"
            />
          </Field>
        )}
      />
    </FieldGroup>
  )
}
