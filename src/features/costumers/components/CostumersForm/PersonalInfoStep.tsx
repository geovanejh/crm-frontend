import { type Control, Controller, type UseFormWatch } from 'react-hook-form'
import { Input } from '@/shared/components/ui/input'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field'
import type { CostumerFormData } from '../../schemas/costumer.schema'
import { RadioGroup, RadioGroupItem } from '@/shared/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { CrownIcon, UserIcon } from 'lucide-react'
import { maskCpf, maskCnpj } from '@/shared/lib/masks'
import { NATIONALITIES } from '@/shared/constants/nationalities'

interface PersonalInfoStepProps {
  control: Control<CostumerFormData>
  watch: UseFormWatch<CostumerFormData>
}

export const PersonalInfoStep = ({ control, watch }: PersonalInfoStepProps) => {
  const type = watch('type')

  return (
    <FieldGroup>
      <Controller
        name="type"
        control={control}
        render={({ field, fieldState }) => (
          <RadioGroup
            className="w-full justify-items-center grid-cols-2"
            value={field.value}
            onValueChange={field.onChange}
          >
            <label
              htmlFor="costumer-type-pf"
              className="relative flex w-full cursor-pointer flex-col items-center gap-3 rounded-md border p-4"
            >
              <RadioGroupItem
                id="costumer-type-pf"
                aria-invalid={fieldState.invalid}
                value="PF"
                className="order-1 size-5 after:absolute after:inset-0 [&_svg]:size-3 cursor-pointer"
                aria-label="plan-radio-basic"
              />
              <div className="grid grow justify-items-center gap-2">
                <UserIcon />
                <span className="text-sm font-medium">Pessoa Física</span>
                <p className="text-muted-foreground text-center text-xs">
                  Cliente do tipo de Pessoa Física.
                </p>
              </div>
            </label>
            <label
              htmlFor="costumer-type-pj"
              className="relative flex w-full cursor-pointer flex-col items-center gap-3 rounded-md border p-4 shadow-xs outline-none"
            >
              <RadioGroupItem
                id="costumer-type-pj"
                aria-invalid={fieldState.invalid}
                value="PJ"
                className="order-1 size-5 after:absolute after:inset-0 [&_svg]:size-3 cursor-pointer"
                aria-label="plan-radio-premium"
              />
              <div className="grid grow justify-items-center gap-2">
                <CrownIcon />
                <span className="text-sm font-medium">Pessoa Jurídica</span>
                <p className="text-muted-foreground text-center text-xs">
                  Cliente do tipo de Pessoa Jurídica.
                </p>
              </div>
            </label>
          </RadioGroup>
        )}
      />

      {type === 'PF' && (
        <>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="costumer-name">Nome Completo</FieldLabel>
                <Input
                  {...field}
                  id="costumer-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="João da Silva"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="document"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="costumer-document">CPF</FieldLabel>
                <Input
                  {...field}
                  id="costumer-document"
                  aria-invalid={fieldState.invalid}
                  placeholder="000.000.000-00"
                  autoComplete="off"
                  maxLength={14}
                  onChange={(e) => field.onChange(maskCpf(e.target.value))}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="birthDate"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="costumer-birth-date">Data de Nascimento</FieldLabel>
                <Input
                  {...field}
                  id="costumer-birth-date"
                  type="date"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="costumer-gender">Sexo</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="costumer-gender" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                    <SelectItem value="Prefiro não informar">Prefiro não informar</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="maritalStatus"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="costumer-marital-status">Estado Civil</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="costumer-marital-status" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Solteiro(a)">Solteiro(a)</SelectItem>
                    <SelectItem value="Casado(a)">Casado(a)</SelectItem>
                    <SelectItem value="Divorciado(a)">Divorciado(a)</SelectItem>
                    <SelectItem value="Viúvo(a)">Viúvo(a)</SelectItem>
                    <SelectItem value="União Estável">União Estável</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="nationality"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="costumer-nationality">Nacionalidade</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="costumer-nationality" aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {NATIONALITIES.map((nationality) => (
                      <SelectItem key={nationality} value={nationality}>
                        {nationality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </>
      )}

      {type === 'PJ' && (
        <>
          <Controller
            name="nomeFantasia"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="costumer-nome-fantasia">Nome Fantasia</FieldLabel>
                <Input
                  {...field}
                  id="costumer-nome-fantasia"
                  aria-invalid={fieldState.invalid}
                  placeholder="Empresa Ltda"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="razaoSocial"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="costumer-razao-social">Razão Social</FieldLabel>
                <Input
                  {...field}
                  id="costumer-razao-social"
                  aria-invalid={fieldState.invalid}
                  placeholder="Empresa Comércio e Serviços Ltda"
                  autoComplete="off"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="document"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="costumer-document">CNPJ</FieldLabel>
                <Input
                  {...field}
                  id="costumer-document"
                  aria-invalid={fieldState.invalid}
                  placeholder="00.000.000/0000-00"
                  autoComplete="off"
                  maxLength={18}
                  onChange={(e) => field.onChange(maskCnpj(e.target.value))}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </>
      )}
    </FieldGroup>
  )
}
