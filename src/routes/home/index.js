import { h } from 'preact'
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

  const onPageSwiperChange = i => {
    setPageIndex(i)
  }
  const onTabClick = i => {
    setPageIndex(i)
    pageSwiperRef.current.goto(i)
  }

  return (
    <div class={style.home}>
      <h1 className={style.title}>PC-Transition</h1>
      <div className={style.tabCan}>
        {['基础'].map((v, k) => (
          <div
            className={style.tab}
            data-active={pageIndex === k}
            onClick={() => onTabClick(k)}
          >
            {v}
          </div>
        ))}
      </div>

      <Swiper onSwipeEnd={onPageSwiperChange} overflow ref={pageSwiperRef}>
        <SwiperItem className={style.tabMainCan}>
          <h3>
            Default
            <Switch
              className={style.switch}
              onChange={() => setToggleBtn1(!toggleBtn1)}
            />
          </h3>
          <Transition in={toggleBtn1} className={style.fade}>
            text
          </Transition>

          <h3>
            Appear
            <Switch
              className={style.switch}
              onChange={() => setToggleBtn2(!toggleBtn2)}
            />
          </h3>
          <Transition in={toggleBtn2} className={style.fade} appear>
            text
          </Transition>

          <h3>
            UnmountOnExit
            <Switch
              className={style.switch}
              onChange={() => setToggleBtn3(!toggleBtn3)}
            />
          </h3>
          <Transition in={toggleBtn3} className={style.fade} unmountOnExit>
            <div className={style.textBox}>text</div>
          </Transition>
        </SwiperItem>
      </Swiper>
    </div>
  )
}

export default Home
