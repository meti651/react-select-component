import React from 'react'
import { HTMLAttributes } from 'react'
import { selectOptions } from './Select.reducer'

export interface Props<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  onSelectChange: (selectedElement: T) => void
  defaultValue?: T
}

export interface StyleProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SelectVariant
}

export type SelectVariant = 'black' | 'greyish'

export interface OptionProps<T = unknown> extends HTMLAttributes<HTMLLIElement> {
  value: T
}

export interface SelectContextProps {
  on: boolean
  selected: any
  select: (option: any) => void
  open: () => void
  close: () => void
  toggle: () => void
}

export interface SelectContextState<T> {
  on: boolean
  selected: T
}

export interface SelectContextAction<T> {
  type: ActionType
  payload?: T
}

export interface SelectReducer<StateType, PayloadType> {
  reducer?: SelectReducerType<StateType, PayloadType>
  init?: SelectContextState<StateType>
}

export type SelectReducerType<StateType, PayloadType> = (
  state: SelectContextState<StateType>,
  action: SelectContextAction<PayloadType>
) => SelectContextState<StateType>

type ActionKeys = keyof typeof selectOptions

type ActionType = typeof selectOptions[ActionKeys]

export interface OptionWithCheckboxProps<T = unknown> extends OptionProps {
  checked?: (selectedValue: T) => boolean
}
