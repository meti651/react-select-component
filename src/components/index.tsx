import { forwardRef } from 'react'
import { SelectContext } from './Select.context'
import { selectReducer, useSelect } from './Select.reducer'
import SelectElement from './Select.style'
import { Props } from './Select.type'

const Select = forwardRef<HTMLDivElement, Props<string>>(({ defaultValue, onSelectChange, ...otherProps }, ref) => {
  const { on, selected, select, open, close, toggle } = useSelect<string, string>({
    reducer: selectReducer,
    init: { on: false, selected: defaultValue ?? '' }
  })

  return (
    <SelectContext.Provider
      value={{
        on,
        selected,
        select: (newValue) => {
          select(newValue)
          onSelectChange(newValue)
        },
        open,
        close,
        toggle
      }}
    >
      <SelectElement ref={ref} {...otherProps} />
    </SelectContext.Provider>
  )
})

Select.displayName = 'Select'

export default Select
