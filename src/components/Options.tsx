import { HTMLAttributes } from 'react'
import { useSelectContext } from './Select.context'
import { DropDownList } from './Select.style'

export default function Options(props: HTMLAttributes<HTMLUListElement>) {
  const { on } = useSelectContext()

  return on ? <DropDownList {...props} /> : null
}
