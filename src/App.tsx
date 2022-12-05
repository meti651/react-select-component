import React from 'react'
import Select from './lib/components/Select'

export default function App() {
  return <Select onSelectChange={(newValue) => console.log(newValue)} />
}
