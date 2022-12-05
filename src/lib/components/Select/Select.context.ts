import { createContext, useContext } from 'react'
import { SelectContextProps } from './Select.type'

const SelectContext = createContext<SelectContextProps | null>(null)
const useSelectContext = () => {
  const context = useContext(SelectContext)
  if (context == null) {
    throw new Error(`Select compound components can't be used outside of a Select component`)
  }

  return context
}

export { SelectContext, useSelectContext }
