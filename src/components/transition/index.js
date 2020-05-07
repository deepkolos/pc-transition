import { useRef, useState, useEffect } from 'preact/hooks'

const nop = () => {}

function Transition({
  appear = false,
  in: show = false,
  unmountOnExit = false,

  children,
  className,

  onEnter = nop,
  onEntering = nop,
  onEntered = nop,

  onExit = nop,
  onExiting = nop,
  onExited = nop,
}) {
  const canRef = useRef()
  const store = useRef({ lastShow: show, switching: appear })
  const that = store.current

  const [renderId, setRenderId] = useState(0)
  const [domReady, setDomReady] = useState(false)

  if (that.lastShow !== show) that.switching = true
  that.lastShow = show

  const { switching } = that
  const renderDom = !(!show && !switching && unmountOnExit)

  let state
  if (show && !switching) state = 'entered'
  if (!show && !switching) state = 'exited'

  if (!show && switching) {
    that.entering = false
    state = that.exiting ? 'exiting' : 'exit'
    that.exiting ? onExit() : onExiting()
    domReady &&
      requestAnimationFrame(() => {
        that.exiting = true
        canRef.current.setAttribute('data-state', 'exiting')
        onExiting()
      })
  }
  if (show && switching) {
    that.exiting = false
    state = that.entering && domReady ? 'entering' : 'enter'
    that.entering && domReady ? onEntering() : onEnter()
    domReady &&
      requestAnimationFrame(() => {
        that.entering = true
        canRef.current.setAttribute('data-state', 'entering')
        onEntering()
      })
  }

  useEffect(() => {
    if (show && switching && !domReady)
      requestAnimationFrame(() => setDomReady(true))
  })

  const onTransitionEnd = e => {
    if (!(e.target === canRef.current && switching)) return
    setRenderId(renderId + 1)
    that.switching = false
    !show && onExited()
    show && onEntered()
  }

  return renderDom ? (
    <div
      ref={canRef}
      className={className}
      data-state={state}
      onTransitionEnd={onTransitionEnd}
      onwebkitTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  ) : undefined
}

export default Transition
