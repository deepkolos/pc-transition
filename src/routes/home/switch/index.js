import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import style from './style'

const Switch = ({ value = false, onChange }) => {
  const [state, setState] = useState(value)

  useEffect(() => {
    setState(value)
  }, [value])

  return (
    <div
      className={`${style.can} ${style[state ? 'on' : 'off']}`}
      onClick={e => e.stopPropagation() || setState(!state) || onChange(!state)}
    >
      <div className={style.ball} />
    </div>
  )
}

export default Switch
