import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import AutoComplete from './autoComplete'

const SimpleComplete = () => {
  const lakers = [
    'bradley',
    'pope',
    'caruso',
    'cook',
    'cousins',
    'james',
    'AD',
    'green',
    'howard',
    'kuzma',
    'McGee',
    'rando',
  ]
  const handleFetch = (query: string) => {
    return lakers.filter(name => name.includes(query)).map(name => ({ value: name }))
  }

  return (
    <AutoComplete
      style={{ width: 300 }}
      fetchSuggestions={handleFetch}
      onSelect={action('select')}
    />
  )
}
storiesOf('AutoComplete 自动完成', module).add('AutoComplete', SimpleComplete)
