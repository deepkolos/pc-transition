# pc-transition

![https://travis-ci.com/deepkolos/pc-transition](https://travis-ci.com/deepkolos/pc-transition.svg?branch=master)
![](https://img.shields.io/npm/dt/pc-transition.svg)
![](https://img.shields.io/npm/v/pc-transition.svg)

一个使用`hooks`编写的transition组件, 主要是之前使用的[preact-transition-group](https://github.com/andrewiggins/preact-transition-group)里的`CSSTransition`组件, 偶现入场动画不触发的情况, 故使用hooks实现了一个

1. 接口与CSSTransition类似
2. 大概90行代码
3. 无需设置duration, duration与transition-duration一样
4. 无需繁琐设置classNames传递一个className即可, css里配合data-state来命中状态

# Live Demo

[Link](https://deepkolos.github.io/pc-transition/)

![demo](https://raw.githubusercontent.com/deepkolos/pc-transition/master/demo.webp)

# Props

| 参数          | 类型    | 默认值 | 描述                   |
| ------------- | ------- | ------ | ---------------------- |
| in            | boolean | false  | 是否过渡到entered      |
| appear        | boolean | false  | 刚创建的时候是否有动画 |
| className     | string  |        | className              |
| unmountOnExit | number  | 0.13   | 滑动到下一页阈值       |


# Events

| 事件名     | 参数 | 描述                          |
| ---------- | ---- | ----------------------------- |
| onEnter    |      | 进入前, 相当于vue的enter       |
| onEntering |      | 进入中, 相当于vue的enterActive |
| onEntered  |      | 进入后, 相当于vue的enterTo     |
| onExit     |      | 离开前, 相当于vue的leave       |
| onExiting  |      | 离开中, 相当于vue的leaveActive |
| onExited   |      | 离开后, 相当于vue的leaveTo     |


# Demo Code

```jsx
function Page() {
  return <div>
    <Transition>
      <div>transition</div>
    </Transition>
  </div>
}
```

# TODO

1. transition-group
2. 支持animation

# License

MIT 造轮子锻炼抽象能力
