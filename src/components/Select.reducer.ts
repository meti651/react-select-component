import { useReducer } from 'react'
import { SelectContextAction, SelectContextState, SelectReducer } from './Select.type'

const selectOptions = {
  select: 'SELECT',
  open: 'OPEN',
  close: 'CLOSE',
  toggle: 'TOGGLE'
} as const

const selectReducer = <StateType, PayloadType>(
  state: SelectContextState<StateType>,
  action: SelectContextAction<PayloadType>
): SelectContextState<StateType> => {
  const { type, payload } = action
  switch (type) {
    case selectOptions.select:
      if (payload == null) {
        return state
      }
      return { on: false, selected: payload as StateType }
    case selectOptions.open:
      return { ...state, on: true }
    case selectOptions.close:
      return { ...state, on: false }
    case selectOptions.toggle:
      return { ...state, on: !state.on }
    default:
      return state
  }
}

const multiSelectReducer = <T>(
  state: SelectContextState<T[]>,
  action: SelectContextAction<T>
): SelectContextState<T[]> => {
  const { type, payload } = action
  switch (type) {
    case selectOptions.select: {
      if (payload == null) {
        return state
      }
      const currentSelected = state.selected
      if (currentSelected.includes(payload)) {
        return { ...state, selected: currentSelected.filter((value) => value !== payload) }
      }
      return { ...state, selected: [...state.selected, payload] }
    }
    case selectOptions.close:
      return { ...state, on: false }
    case selectOptions.open:
      return { ...state, on: true }
    case selectOptions.toggle:
      return { ...state, on: !state.on }
    default:
      return state
  }
}

const useSelect = <StateType = unknown, PayloadType = unknown>({
  reducer = selectReducer,
  init = { on: false, selected: '' as StateType }
}: SelectReducer<StateType, PayloadType> = {}) => {
  const [{ on, selected }, dispatch] = useReducer(reducer, init)

  const select = (option: PayloadType) => dispatch({ type: selectOptions.select, payload: option })
  const open = () => dispatch({ type: selectOptions.open })
  const close = () => dispatch({ type: selectOptions.close })
  const toggle = () => dispatch({ type: selectOptions.toggle })

  return { on, selected, select, open, close, toggle }
}

export { selectOptions, useSelect, selectReducer, multiSelectReducer }
