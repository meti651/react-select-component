import React from 'react'
import { KeyboardEventHandler } from 'react'
import { useSelectContext } from './Select.context'
import { OptionProps } from './Select.type'

export default function SelectOption({ value, ...otherProps }: OptionProps) {
  const { select } = useSelectContext()

  const handleKeyDown: KeyboardEventHandler<HTMLLIElement> = (e) => {
    if (e.key !== 'Enter') {
      return
    }
    e.stopPropagation()
    select(value)
  }

  return <li tabIndex={0} onClick={() => select(value)} onKeyDown={handleKeyDown} {...otherProps} />
}
