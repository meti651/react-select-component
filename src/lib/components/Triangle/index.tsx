import React from 'react'
import { ReactElement } from 'react'
import TriangleElement from './Triangle.style'

interface Props {
  direction?: 'up' | 'down' | 'left' | 'right'
  color?: string
  size?: number
}

export default function Triangle({ direction = 'down', color = '#F65261', size = 5 }: Props): ReactElement {
  return <TriangleElement direction={direction} color={color} size={size} />
}
