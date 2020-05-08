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
  const { current: that } = useRef({ lastShow: show, switching: appear })

  const [renderId, setRenderId] = useState(0)
  const [domReady, setDomReady] = useState(false)

  if (that.lastShow !== show) that.switching = true
  that.lastShow = show

  const { switching } = that
  const renderDom = !(!show && !switching && unmountOnExit)

  let state
  if (show && !switching) state = 'entered'
  if (!show && !switching) state = 'exited'

  if (switching) {
    that[show ? 'exiting' : 'entering'] = false
    state = show ? 'enter' : 'exit'
    show ? onEnter() : onExit()
    domReady &&
      requestAnimationFrame(() => {
        that[show ? 'exiting' : 'entering'] = true
        canRef.current &&
          canRef.current.setAttribute(
            'data-state',
            show ? 'entering' : 'exiting',
          )
        show ? onEntering() : onExiting()
      })
  }

  useEffect(() => !domReady && requestAnimationFrame(() => setDomReady(true)))

  const onTransitionEnd = e => {
    if (!(e.target === canRef.current && switching)) return
    that.switching = false
    setRenderId(renderId + 1)
    show ? onEntered() : onExited()
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
