import { Controller, type Control } from 'react-hook-form'
import type { CostumerFormData } from '../../schemas/costumer.schema'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

interface AccountDetailsStepProps {
  control: Control<CostumerFormData>
}

export const AccountDetailsStep = ({ control }: AccountDetailsStepProps) => {
  return (
    <FieldGroup>
      <Controller
        name="plan"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="costumer-plan">Tipo de Plano</FieldLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="costumer-plan" aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="Selecione um plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Básico</SelectItem>
                <SelectItem value="standard">Padrão</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="costumer-start-date">Data de Início</FieldLabel>
              <Input
                {...field}
                id="costumer-start-date"
                type="date"
                value={field.value ?? new Date().toISOString().split('T')[0]}
                readOnly
                className="bg-muted cursor-default"
              />
            </Field>
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="costumer-end-date">Data de Vencimento</FieldLabel>
              <Input
                {...field}
                id="costumer-end-date"
                type="date"
                value={field.value ?? ''}
                readOnly
                className="bg-muted cursor-default"
                placeholder="Definido pelo sistema"
              />
            </Field>
          )}
        />
      </div>

      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="costumer-notes">Observações</FieldLabel>
            <Input
              {...field}
              value={field.value ?? ''}
              id="costumer-notes"
              placeholder="Anotações adicionais (opcional)"
              autoComplete="off"
            />
          </Field>
        )}
      />
    </FieldGroup>
  )
}
