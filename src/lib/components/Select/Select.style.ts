import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { COLOR } from '../../../constants'
import Checkbox from '../Checkbox'
import { SelectVariant, StyleProps } from './Select.type'

const getSelectStyleByVariant = (variant: SelectVariant = 'black') => {
  switch (variant) {
    case 'black':
      return BLACK_SELECT_STYLE
    case 'greyish':
      return GREY_SELECT_STYLE
    default:
      return undefined
  }
}

const BLACK_SELECT_STYLE = css`
  background-color: ${COLOR.BLACK};

  &:hover,
  &.listed {
    border-color: ${COLOR.WHITE};
  }
`

const GREY_SELECT_STYLE = css`
  background-color: ${COLOR.INPUT_BACKGROUND};

  &:hover,
  &.listed {
    background-color: ${COLOR.LIGHTER_INPUT_BACKGROUND};
    border-color: ${COLOR.WHITE};
  }
`

const SelectElement = styled.div`
  position: relative;
  z-index: 11;
  min-width: 168px;
`

const DropDown = styled.div<StyleProps>`
  gap: 13px;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 8px;
  transition: border-color 0.2s;
  height: 100%;
  text-transform: capitalize;
  ${(props) => getSelectStyleByVariant(props.variant)}
`

const DropDownList = styled.ul`
  list-style: none;
  position: absolute;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 1px solid ${COLOR.WHITE};
  border-top: 0;
  background-color: ${COLOR.BLACK};

  & > li {
    padding: 4px 8px;
    background-color: ${COLOR.BLACK};
    cursor: pointer;
    text-transform: capitalize;

    &:hover {
      background-color: ${COLOR.PRIMARY};
    }
  }
`

const OptionCheckBox = styled(Checkbox)`
  margin-right: 7px;
  width: 16px;
  height: 16px;
`

export { DropDown, DropDownList, OptionCheckBox }

export default SelectElement
