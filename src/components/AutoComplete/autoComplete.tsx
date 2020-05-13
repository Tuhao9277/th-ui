import React, {
  FC,
  ReactElement,
  ChangeEvent,
  useRef,
  useState,
  useEffect,
  KeyboardEvent,
} from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Transition from '../Transition/transition'
import Icon from '../Icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
  value: string
}

export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 异步获取候选 */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  /** 选中项后的回调 */
  onSelect?: (item: DataSourceType) => void
  /** 手动渲染数据项 */
  renderOption?: (item: DataSourceType) => ReactElement
}

const AutoComplete: FC<AutoCompleteProps> = props => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props
  const [suggessions, setSuggessions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState(value as string)
  const [showDropdown, setShowDropdown] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const debouncedValue = useDebounce(inputValue, 300)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)

  useClickOutside(componentRef, () => {
    setSuggessions([])
  })

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSuggessions([])
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggessions(data)
          if (data.length > 0) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggessions(results)
        if (results.length > 0) {
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggessions.length) {
      index = suggessions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggessions[highlightIndex]) {
          handleSelect(suggessions[highlightIndex])
        }
        break
      case 38:
        highlight(highlightIndex - 1)
        break
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setShowDropdown(false)
        break
      default:
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _value = e.target.value.trim()
    setInputValue(_value)
    triggerSearch.current = true
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => (
    <Transition
      in={showDropdown || loading}
      animation="zoom-in-top"
      timeout={300}
      onExited={() => {
        setSuggessions([])
      }}
    >
      <ul className="th-suggestion-list">
        {loading && (
          <div className="suggestions-loading-icon">
            <Icon icon="spinner" spin />
          </div>
        )}
        {suggessions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'is-active': index === highlightIndex,
          })
          return (
            <li key={item.value} className={cnames} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    </Transition>
  )

  return (
    <div className="th-auto-complete" ref={componentRef}>
      <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
      {generateDropdown()}
    </div>
  )
}

export default AutoComplete
