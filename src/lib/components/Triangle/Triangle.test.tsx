import React from 'react'
import { render } from '@testing-library/react'
import Triangle from '.'
import { matchers } from '@emotion/jest'

expect.extend(matchers)

test('should render default triangle', () => {
  const { container } = render(<Triangle />)
  const element = container.firstChild
  expect(element).toHaveStyleRule('border-top', '5px solid #F65261')
})

test('should render in good directions', () => {
  const { container, rerender } = render(<Triangle color="#fff" size={2} direction="down" />)
  const element = container.firstChild
  expect(element).toHaveStyleRule('border-top', '2px solid #fff')
  rerender(<Triangle color="#000" direction="left" size={7} />)
  const elementAfterRerender = container.firstChild
  expect(elementAfterRerender).toHaveStyleRule('border-top', '7px solid transparent')
  expect(elementAfterRerender).toHaveStyleRule('border-right', '7px solid #000')
})
