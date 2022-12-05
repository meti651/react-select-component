import Triangle from './Triangle'
import { KeyboardEventHandler } from 'react'
import { useSelectContext } from './Select.context'
import { DropDown } from './Select.style'
import { StyleProps } from './Select.type'

export default function SelectButton({ variant, children, ...otherProps }: StyleProps) {
  const { on, selected, toggle, close } = useSelectContext()

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter') {
      toggle()
    } else if (e.key === 'Escape') {
      close()
    }
  }

  return (
    <DropDown
      className={`flex align-items-center justify-content-between ${on ? 'listed' : ''}`}
      tabIndex={0}
      variant={variant}
      onClick={() => toggle()}
      onKeyDown={handleKeyDown}
      {...otherProps}
    >
      <>
        {children ?? selected}
        {on ? <Triangle size={7} direction="up" /> : <Triangle size={7} />}
      </>
    </DropDown>
  )
}
