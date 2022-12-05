import styled from '@emotion/styled'
import { css, SerializedStyles } from '@emotion/react'

interface StyleProps {
  direction: 'up' | 'down' | 'left' | 'right'
  size: number
  color: string
}

const directionStyle = (props: StyleProps): SerializedStyles => css`
  border-top: ${props.direction !== 'up' ? props.size : '0'}px solid
    ${props.direction === 'down' ? props.color : 'transparent'};
  border-right: ${props.direction !== 'right' ? props.size : '0'}px solid
    ${props.direction === 'left' ? props.color : 'transparent'};
  border-left: ${props.direction !== 'left' ? props.size : '0'}px solid
    ${props.direction === 'right' ? props.color : 'transparent'};
  border-bottom: ${props.direction !== 'down' ? props.size : '0'}px solid
    ${props.direction === 'up' ? props.color : 'transparent'};
`

const TriangleElement = styled.div`
  height: 0;
  width: 0;
  ${directionStyle}
`

export default TriangleElement
