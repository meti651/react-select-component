import React from 'react'
import { forwardRef, useEffect } from 'react'
import { SelectContext } from './Select.context'
import { multiSelectReducer, useSelect } from './Select.reducer'
import SelectElement from './Select.style'
import { Props } from './Select.type'

const Select = forwardRef<HTMLDivElement, Props<string[]>>(({ onSelectChange, defaultValue, ...otherProps }, ref) => {
  const { on, selected, select, open, close, toggle } = useSelect<string[], string>({
    reducer: multiSelectReducer,
    init: { on: false, selected: defaultValue != null ? [...defaultValue] : [] }
  })

  useEffect(() => {
    onSelectChange(selected)
  }, [selected, onSelectChange])

  return (
    <>
      <SelectContext.Provider value={{ on, selected, select, open, close, toggle }}>
        <SelectElement ref={ref} {...otherProps} />
      </SelectContext.Provider>
    </>
  )
})

Select.displayName = 'Select'

export default Select
