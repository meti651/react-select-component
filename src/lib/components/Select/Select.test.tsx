import React from 'react'
import { getByText, render, renderHook, screen } from '@testing-library/react'
import Select from '.'
import MultiSelect from './MultiSelect'
import userEvent from '@testing-library/user-event'
import Options from './Options'
import SelectOption from './SelectOption'
import SelectButton from './SelectButton'
import OptionWithCheckbox from './OptionWithCheckbox'
import { multiSelectReducer, useSelect } from './Select.reducer'
import { act } from 'react-dom/test-utils'

test('should render select element', () => {
  render(
    <Select onSelectChange={() => {}}>
      <SelectButton>Test 1</SelectButton>
    </Select>
  )
  const element = screen.getByText(/Test 1/i)
  expect(element).toBeInTheDocument()
})

test('should render options when clicked', () => {
  render(
    <Select onSelectChange={() => {}}>
      <SelectButton>Test 1</SelectButton>
      <Options>
        <SelectOption value="Test 1">Test 1</SelectOption>
        <SelectOption value="Test 2">Test 2</SelectOption>
      </Options>
    </Select>
  )
  const element = screen.getByText(/Test 1/i)
  userEvent.click(element)
  const options = screen.getAllByRole('listitem')
  expect(options).toHaveLength(2)
})

test('should call selected option', () => {
  const onSelectChange = jest.fn()
  render(
    <Select onSelectChange={onSelectChange}>
      <SelectButton>Test 1</SelectButton>
      <Options>
        <SelectOption value="Test 1">Test 1</SelectOption>
        <SelectOption value="Test 2">Test 2</SelectOption>
      </Options>
    </Select>
  )
  const selectElement = screen.getByText(/Test 1/i)
  userEvent.click(selectElement)
  const options = screen.getByRole('list')
  const option = getByText(options, /Test 1/i)
  userEvent.click(option)
  expect(onSelectChange).toBeCalledWith('Test 1')
})

test('should open and close select by keyboard', () => {
  render(
    <Select onSelectChange={() => {}}>
      <SelectButton>Test 1</SelectButton>
      <Options>
        <SelectOption value="Test 1">Test 1</SelectOption>
        <SelectOption value="Test 2">Test 2</SelectOption>
      </Options>
    </Select>
  )
  const selectBtn = screen.getByText(/Test 1/i)
  userEvent.tab()
  expect(selectBtn).toHaveFocus()
  userEvent.keyboard('{enter}')
  expect(screen.getByRole('list')).toBeInTheDocument()
  userEvent.type(selectBtn, '{escape}')
  expect(screen.queryByRole('list')).toBeNull()
})

test('should choose option by keyboard', () => {
  const onSelectChange = jest.fn()
  render(
    <Select onSelectChange={onSelectChange}>
      <SelectButton>Test 1</SelectButton>
      <Options>
        <SelectOption value="Test 1">Test 1</SelectOption>
        <SelectOption value="Test 2">Test 2</SelectOption>
      </Options>
    </Select>
  )
  const selectBtn = screen.getByText(/Test 1/i)
  userEvent.tab()
  expect(selectBtn).toHaveFocus()
  userEvent.keyboard('{enter}')
  expect(screen.getByRole('list')).toBeInTheDocument()
  userEvent.tab()
  expect(screen.getAllByRole('listitem')[0]).toHaveFocus()
  userEvent.keyboard('{enter}')
  expect(onSelectChange).toBeCalledWith('Test 1')
  expect(screen.queryByRole('list')).toBeNull()
})

describe('Multi select', () => {
  test('should render options with checkboxes', () => {
    render(
      <MultiSelect onSelectChange={() => {}}>
        <SelectButton>Test</SelectButton>
        <Options>
          <OptionWithCheckbox value="Test 1">Test 1</OptionWithCheckbox>
          <OptionWithCheckbox value="Test 2">Test 1</OptionWithCheckbox>
        </Options>
      </MultiSelect>
    )
    const select = screen.getByText(/Test/i)
    userEvent.click(select)
    const options = screen.getAllByRole('checkbox')
    expect(options).toHaveLength(2)
  })

  test('should not close on select', () => {
    render(
      <MultiSelect onSelectChange={() => {}}>
        <SelectButton>Test</SelectButton>
        <Options>
          <OptionWithCheckbox value="Test 1">Test 1</OptionWithCheckbox>
          <OptionWithCheckbox value="Test 2">Test 2</OptionWithCheckbox>
        </Options>
      </MultiSelect>
    )
    const select = screen.getByText(/Test/i)
    userEvent.click(select)
    const option1 = screen.getByText(/Test 1/i)
    userEvent.click(option1)
    const options = screen.getAllByRole('checkbox')
    expect(options).toHaveLength(2)
  })

  test('should call with selected values', () => {
    const onSelectChange = jest.fn()
    render(
      <MultiSelect onSelectChange={onSelectChange}>
        <SelectButton>Test</SelectButton>
        <Options>
          <OptionWithCheckbox value="Test 1">Test 1</OptionWithCheckbox>
          <OptionWithCheckbox value="Test 2">Test 2</OptionWithCheckbox>
        </Options>
      </MultiSelect>
    )
    const select = screen.getByText(/Test/i)
    userEvent.click(select)
    const option1 = screen.getByText(/Test 1/i)
    userEvent.click(option1)
    expect(onSelectChange).toBeCalledWith(['Test 1'])
  })

  test('should call with default and new value', () => {
    const onSelectChange = jest.fn()
    render(
      <MultiSelect defaultValue={['Test 2']} onSelectChange={onSelectChange}>
        <SelectButton>Test</SelectButton>
        <Options>
          <OptionWithCheckbox value="Test 1">Test 1</OptionWithCheckbox>
          <OptionWithCheckbox value="Test 2">Test 2</OptionWithCheckbox>
        </Options>
      </MultiSelect>
    )
    const select = screen.getByText(/Test/i)
    userEvent.click(select)
    const option1 = screen.getByText(/Test 1/i)
    userEvent.click(option1)
    expect(onSelectChange).toBeCalledWith(['Test 2', 'Test 1'])
  })

  test('should unselect option', () => {
    const onSelectChange = jest.fn()
    render(
      <MultiSelect defaultValue={['Test 1']} onSelectChange={onSelectChange}>
        <SelectButton>Test</SelectButton>
        <Options>
          <OptionWithCheckbox value="Test 1">Test 1</OptionWithCheckbox>
          <OptionWithCheckbox value="Test 2">Test 2</OptionWithCheckbox>
        </Options>
      </MultiSelect>
    )
    const select = screen.getByText(/Test/i)
    userEvent.click(select)
    const option1 = screen.getByText(/Test 1/i)
    userEvent.click(option1)
    expect(onSelectChange).toBeCalledWith([])
  })

  test('should open and close select by keyboard', () => {
    render(
      <MultiSelect onSelectChange={() => {}}>
        <SelectButton>Test 1</SelectButton>
        <Options>
          <SelectOption value="Test 1">Test 1</SelectOption>
          <SelectOption value="Test 2">Test 2</SelectOption>
        </Options>
      </MultiSelect>
    )
    const selectBtn = screen.getByText(/Test 1/i)
    userEvent.tab()
    expect(selectBtn).toHaveFocus()
    userEvent.keyboard('{enter}')
    expect(screen.getByRole('list')).toBeInTheDocument()
    userEvent.type(selectBtn, '{escape}')
    expect(screen.queryByRole('list')).toBeNull()
  })

  test('should choose option by keyboard', () => {
    const onSelectChange = jest.fn()
    render(
      <MultiSelect onSelectChange={onSelectChange}>
        <SelectButton>Test 1</SelectButton>
        <Options>
          <SelectOption value="Test 1">Test 1</SelectOption>
          <SelectOption value="Test 2">Test 2</SelectOption>
        </Options>
      </MultiSelect>
    )
    const selectBtn = screen.getByText(/Test 1/i)
    userEvent.tab()
    expect(selectBtn).toHaveFocus()
    userEvent.keyboard('{enter}')
    expect(screen.getByRole('list')).toBeInTheDocument()
    userEvent.tab()
    expect(screen.getAllByRole('listitem')[0]).toHaveFocus()
    userEvent.keyboard('{enter}')
    expect(onSelectChange).toBeCalledWith(['Test 1'])
    expect(screen.queryByRole('list')).not.toBeNull()
  })
})

describe('Select reducer', () => {
  test('should open and close', () => {
    const { result } = renderHook(() => useSelect())
    const { on, close, open, toggle } = result.current
    expect(on).toBe(false)
    act(() => {
      open()
    })
    expect(result.current.on).toBe(true)
    act(() => {
      close()
    })
    expect(result.current.on).toBe(false)
    act(() => {
      toggle()
    })
    expect(result.current.on).toBe(true)
    act(() => {
      toggle()
    })
    expect(result.current.on).toBe(false)
  })

  test('should select new value', () => {
    const { result } = renderHook(() => useSelect())
    const { selected, select, open } = result.current
    expect(selected).toBe('')
    act(() => {
      open()
    })
    expect(result.current.on).toBe(true)
    act(() => {
      select('Test value')
    })
    expect(result.current.selected).toBe('Test value')
    expect(result.current.on).toBe(false)
  })

  test('should address init values', () => {
    const { result } = renderHook(() => useSelect<string, string>({ init: { selected: 'Test init', on: true } }))
    const { selected, on } = result.current
    expect(selected).toBe('Test init')
    expect(on).toBe(true)
  })

  test('should apply multi select reducer', () => {
    const { result } = renderHook(() =>
      useSelect<string[], string>({ reducer: multiSelectReducer, init: { selected: [], on: false } })
    )
    const { on, selected, select, open, close } = result.current
    expect(on).toBe(false)
    expect(selected).toHaveLength(0)
    act(() => {
      open()
    })
    expect(result.current.on).toBe(true)
    act(() => {
      select('Test input 1')
    })
    expect(result.current.selected).toHaveLength(1)
    expect(result.current.selected[0]).toBe('Test input 1')
    expect(result.current.on).toBe(true)
    act(() => {
      select('Test input 2')
    })
    expect(result.current.selected).toHaveLength(2)
    expect(result.current.selected[1]).toBe('Test input 2')
    act(() => {
      close()
    })
    expect(result.current.on).toBe(false)
    expect(result.current.selected).toHaveLength(2)
  })
})
