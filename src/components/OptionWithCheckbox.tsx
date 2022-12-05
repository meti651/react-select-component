import { useSelectContext } from './Select.context'
import { OptionCheckBox } from './Select.style'
import { OptionWithCheckboxProps } from './Select.type'
import SelectOption from './SelectOption'

export default function OptionWithCheckbox<T>({ checked, value, children, ...otherProps }: OptionWithCheckboxProps<T>) {
  const { selected } = useSelectContext()

  return (
    <SelectOption className="flex align-items-center" value={value} {...otherProps}>
      <OptionCheckBox tabIndex={-1} checked={checked?.(selected)} readOnly />
      {children}
    </SelectOption>
  )
}
