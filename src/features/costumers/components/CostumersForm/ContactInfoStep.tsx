import { Controller, type Control, type UseFormSetValue } from 'react-hook-form'
import type { CostumerFormData } from '../../schemas/costumer.schema'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { viaCepService } from '@/shared/services/viaCepService'
import { maskPhone, maskCep } from '@/shared/lib/masks'
import { useState } from 'react'

interface ContactInfoStepProps {
  control: Control<CostumerFormData>
  setValue: UseFormSetValue<CostumerFormData>
}

export const ContactInfoStep = ({ control, setValue }: ContactInfoStepProps) => {
  const [cepLoading, setCepLoading] = useState(false)

  const handleCepBlur = async (cepValue: string) => {
    setCepLoading(true)
    const address = await viaCepService.fetchAddress(cepValue)
    if (address) {
      setValue('street', address.logradouro, { shouldValidate: true })
      setValue('neighborhood', address.bairro, { shouldValidate: true })
      setValue('city', address.localidade, { shouldValidate: true })
      setValue('state', address.uf, { shouldValidate: true })
    }
    setCepLoading(false)
  }

  return (
    <FieldGroup>
      <div className="grid lg:grid-cols-2 gap-4 ">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="costumer-email">Email Principal</FieldLabel>
              <Input
                {...field}
                id="costumer-email"
                type="email"
                aria-invalid={fieldState.invalid}
                placeholder="joao@exemplo.com"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="costumer-phone">Telefone (WhatsApp)</FieldLabel>
              <Input
                {...field}
                id="costumer-phone"
                type="tel"
                aria-invalid={fieldState.invalid}
                placeholder="(11) 99999-9999"
                autoComplete="off"
                maxLength={15}
                onChange={(e) => field.onChange(maskPhone(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="cep"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="costumer-cep">CEP</FieldLabel>
              <Input
                {...field}
                id="costumer-cep"
                aria-invalid={fieldState.invalid}
                placeholder="00000-000"
                autoComplete="off"
                disabled={cepLoading}
                maxLength={9}
                onChange={(e) => field.onChange(maskCep(e.target.value))}
                onBlur={(e) => {
                  field.onBlur()
                  handleCepBlur(e.target.value)
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="costumer-state">Estado</FieldLabel>
              <Input
                {...field}
                id="costumer-state"
                aria-invalid={fieldState.invalid}
                placeholder="SP"
                autoComplete="off"
                disabled={cepLoading}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <Controller
        name="street"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="costumer-street">Rua</FieldLabel>
            <Input
              {...field}
              id="costumer-street"
              aria-invalid={fieldState.invalid}
              placeholder="Rua das Flores"
              autoComplete="off"
              disabled={cepLoading}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="number"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="costumer-number">Número</FieldLabel>
              <Input
                {...field}
                id="costumer-number"
                aria-invalid={fieldState.invalid}
                placeholder="123"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="complement"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="costumer-complement">Complemento</FieldLabel>
              <Input
                {...field}
                id="costumer-complement"
                aria-invalid={fieldState.invalid}
                placeholder="Apto 42"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="costumer-city">Cidade</FieldLabel>
            <Input
              {...field}
              id="costumer-city"
              aria-invalid={fieldState.invalid}
              placeholder="São Paulo"
              autoComplete="off"
              disabled={cepLoading}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
        <Controller
          name="neighborhood"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="costumer-neighborhood">Bairro</FieldLabel>
              <Input
                {...field}
                id="costumer-neighborhood"
                aria-invalid={fieldState.invalid}
                placeholder="Centro"
                autoComplete="off"
                disabled={cepLoading}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </FieldGroup>
  )
}
