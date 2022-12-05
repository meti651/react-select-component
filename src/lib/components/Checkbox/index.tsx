import React from 'react'
import { InputHTMLAttributes } from 'react'
import CheckboxElement from './Checkbox.style'

export default function Checkbox(props: InputHTMLAttributes<HTMLInputElement>) {
  return <CheckboxElement type="checkbox" {...props} />
}
