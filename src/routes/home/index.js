import { h, Fragment } from 'preact'
import style from './style'
import 'pc-swiper/lib/pc-swiper.css'
import { useRef, useState } from 'preact/hooks'
import Swiper, { SwiperItem } from 'pc-swiper'
import Switch from './switch'
import Transition from 'com/transition'

// function random(min, max) {
//   return Math.round(Math.random() * (max - min)) + min
// }

// function ColorfulDiv({ children, className, style = {}, Ref }) {
//   this.color =
//     this.color || `rgb(${random(0, 180)}, ${random(0, 180)}, ${random(0, 180)})`

//   return (
//     <div
//       ref={Ref}
//       className={className}
//       style={{ backgroundColor: this.color, ...style }}
//     >
//       {children}
//     </div>
//   )
// }

function Home() {
  const pageSwiperRef = useRef()

  const [pageIndex, setPageIndex] = useState(0)
  const [toggleBtn1, setToggleBtn1] = useState(false)
  const [toggleBtn2, setToggleBtn2] = useState(true)
  const [toggleBtn3, setToggleBtn3] = useState(false)
  const [toggleBtn4, setToggleBtn4] = useState(false)
  const [toggleBtn5, setToggleBtn5] = useState(false)

  const onPageSwiperChange = i => {
    setPageIndex(i)
  }
  const onTabClick = i => {
    setPageIndex(i)
    pageSwiperRef.current.goto(i)
  }
  const log = type => () => console.log(type)

  const events = {
    onEnter: log('onEnter'),
    onEntering: log('onEntering'),
    onEntered: log('onEntered'),
    onExit: log('onExit'),
    onExiting: log('onExiting'),
    onExited: log('onExited'),
  }

  const createDemoTransition = (
    title,
    val,
    setVal,
    cfg,
    slot = 'text',
    className = style.fade,
  ) => (
    <Fragment>
      <h3>
        {title}
        <Switch
          value={val}
          className={style.switch}
          onChange={() => setVal(!val)}
        />
      </h3>
      <Transition in={val} className={className} {...cfg}>
        {slot}
      </Transition>
    </Fragment>
  )

  return (
    <div class={style.home}>
      <h1 className={style.title}>PC-Transition</h1>
      <div className={style.tabCan}>
        {['基础', '实例'].map((v, k) => (
          <div
            className={style.tab}
            data-active={pageIndex === k}
            onClick={() => onTabClick(k)}
          >
            {v}
          </div>
        ))}
      </div>

      <Swiper
        onSwipeEnd={onPageSwiperChange}
        overflow
        ref={pageSwiperRef}
        className={style.swiper}
      >
        <SwiperItem className={style.tabMainCan}>
          {createDemoTransition('Default', toggleBtn1, setToggleBtn1)}
          {createDemoTransition('Appear', toggleBtn2, setToggleBtn2, {
            appear: true,
          })}
          {createDemoTransition('UnmountOnExit', toggleBtn3, setToggleBtn3, {
            unmountOnExit: true,
          })}
          {createDemoTransition('Events', toggleBtn4, setToggleBtn4, events)}
        </SwiperItem>

        <SwiperItem className={style.tabMainCan}>
          {createDemoTransition(
            '弹窗',
            toggleBtn5,
            setToggleBtn5,
            { unmountOnExit: true },
            <div className={style.popup}>
              <div>弹窗</div>
              <button onClick={() => setToggleBtn5(!toggleBtn5)}>确定</button>
            </div>,
            style.zoom,
          )}
        </SwiperItem>
      </Swiper>
    </div>
  )
}

export default Home
