# 工具提示 Tooltip

## 示例
### 基本形式

``` html
<u-linear-layout>
    <u-tooltip content="使用 content 属性比较方便">
        <u-button>使用属性</u-button>
    </u-tooltip>
    <u-tooltip>
        <u-button>使用 slot</u-button>
        <span slot="content">使用 content <u-link>slot</u-link> 更加灵活</span>
    </u-tooltip>
    <u-button v-tooltip="'使用指令最简单'">使用指令</u-button>
</u-linear-layout>
```

<!--
#### 下一版的书写方式

`-`-` html

<u-button>
    使用属性
    <u-tooltip reference="parent" content="使用 content 属性比较方便"></u-tooltip>
</u-button>
`-`-` -->

### 触发方式

``` html
<u-linear-layout>
    <u-tooltip content="Tooltip" trigger="hover">
        <u-button>hover（默认）</u-button>
    </u-tooltip>
    <u-tooltip content="Tooltip" trigger="click">
        <u-button>click</u-button>
    </u-tooltip>
    <u-tooltip content="Tooltip" trigger="right-click">
        <u-button>right-click</u-button>
    </u-tooltip>
    <u-tooltip content="Tooltip" trigger="double-click">
        <u-button>double-click</u-button>
    </u-tooltip>
</u-linear-layout>
```

#### 指令形式

``` html
<u-linear-layout>
    <u-button v-tooltip="'Tooltip'">hover（默认）</u-button>
    <u-button v-tooltip.click="'Tooltip'">click</u-button>
    <u-button v-tooltip.right-click="'Tooltip'">right-click</u-button>
    <u-button v-tooltip.double-click="'Tooltip'">double-click</u-button>
</u-linear-layout>
```

#### 手动触发

也可以手动触发工具提示的弹出/隐藏：

``` vue
<template>
<u-tooltip content="Tooltip" trigger="manual" :open.sync="open">
    <u-button @click="open = !open">{{ open ? '隐藏' : '弹出' }}</u-button>
</u-tooltip>
</template>

<script>
export default {
    data() {
        return {
            open: false,
        };
    },
};
</script>
```

### 弹出位置

``` html
<u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-tooltip content="Tooltip" placement="top-start">
            <u-button>top-start</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="top">
            <u-button>top</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="top-end">
            <u-button>top-end</u-button>
        </u-tooltip>
    </u-linear-layout>
    <u-linear-layout>
        <u-tooltip content="Tooltip" placement="left-start">
            <u-button>left-start</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="left">
            <u-button>left</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="left-end">
            <u-button>left-end</u-button>
        </u-tooltip>
    </u-linear-layout>
    <u-linear-layout>
        <u-tooltip content="Tooltip" placement="right-start">
            <u-button>right-start</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="right">
            <u-button>right</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="right-end">
            <u-button>right-end</u-button>
        </u-tooltip>
    </u-linear-layout>
    <u-linear-layout>
        <u-tooltip content="Tooltip" placement="bottom-start">
            <u-button>bottom-start</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="bottom">
            <u-button>bottom</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="bottom-end">
            <u-button>bottom-end</u-button>
        </u-tooltip>
    </u-linear-layout>
</u-linear-layout>
```

#### 指令形式

``` html
<u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-button v-tooltip.top-start="'Tooltip'">top-start</u-button>
        <u-button v-tooltip.top="'Tooltip'">top</u-button>
        <u-button v-tooltip.top-end="'Tooltip'">top-end</u-button>
    </u-linear-layout>
    <u-linear-layout>
        <u-button v-tooltip.left-start="'Tooltip'">left-start</u-button>
        <u-button v-tooltip.left="'Tooltip'">left</u-button>
        <u-button v-tooltip.left-end="'Tooltip'">left-end</u-button>
    </u-linear-layout>
    <u-linear-layout>
        <u-button v-tooltip.right-start="'Tooltip'">right-start</u-button>
        <u-button v-tooltip.right="'Tooltip'">right</u-button>
        <u-button v-tooltip.right-end="'Tooltip'">right-end</u-button>
    </u-linear-layout>
    <u-linear-layout>
        <u-button v-tooltip.bottom-start="'Tooltip'">bottom-start</u-button>
        <u-button v-tooltip.bottom="'Tooltip'">bottom</u-button>
        <u-button v-tooltip.bottom-end="'Tooltip'">bottom-end</u-button>
    </u-linear-layout>
</u-linear-layout>
```

#### 修改偏移距离

``` html
<u-linear-layout>
    <u-tooltip offset="10" content="Tooltip" trigger="hover">
        <u-button>hover（默认）</u-button>
    </u-tooltip>
    <u-tooltip offset="10% 10px" content="Tooltip" trigger="hover">
        <u-button>hover（默认）</u-button>
    </u-tooltip>
</u-linear-layout>
```

#### 跟随鼠标

将`'follow-cursor'`属性设置为`true`可以跟随鼠标。也可以传一个数字或对象调整位置偏移。

``` html
<u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-tooltip content="Tooltip" placement="top-start" follow-cursor>
            <u-button>top-start</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="top" follow-cursor>
            <u-button>top</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="top-end" follow-cursor>
            <u-button>top-end</u-button>
        </u-tooltip>
    </u-linear-layout>
    <u-linear-layout>
        <u-tooltip content="Tooltip" placement="left-start" follow-cursor>
            <u-button>left-start</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="left" follow-cursor>
            <u-button>left</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="left-end" follow-cursor>
            <u-button>left-end</u-button>
        </u-tooltip>
    </u-linear-layout>
    <u-linear-layout>
        <u-tooltip content="Tooltip" placement="right-start" follow-cursor>
            <u-button>right-start</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="right" follow-cursor>
            <u-button>right</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="right-end" follow-cursor>
            <u-button>right-end</u-button>
        </u-tooltip>
    </u-linear-layout>
    <u-linear-layout>
        <u-tooltip content="Tooltip" placement="bottom-start" follow-cursor>
            <u-button>bottom-start</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="bottom" follow-cursor>
            <u-button>bottom</u-button>
        </u-tooltip>
        <u-tooltip content="Tooltip" placement="bottom-end" follow-cursor>
            <u-button>bottom-end</u-button>
        </u-tooltip>
    </u-linear-layout>
</u-linear-layout>
```

### Hover 时延迟消失

``` html
<u-linear-layout>
    <u-tooltip content="Tooltip" trigger="hover" :hide-delay="300">
        <u-button>hover（默认）</u-button>
    </u-tooltip>
</u-linear-layout>
```

### 禁用

``` html
<u-tooltip content="Tooltip" disabled>
    <u-button disabled>disabled</u-button>
</u-tooltip>
```

## API
### Attrs/Props

| Attr/Prop | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| content | String | `'提示内容'` | 提示内容 |
| open.sync | Boolean | `false` | 弹出/隐藏状态 |
| trigger | String | `'click'` | 工具提示的触发方式。可选值：`'click'`, `'hover'`, `'right-click'`, `'double-click'`, `'manual'` |
| placement | String | `'bottom'` | 工具提示的弹出方向。可选值：`'top'`, `'bottom'`, `'left'`, `'right'`, `'top-start'`, `'top-end'`, `'bottom-start'`, `'bottom-end'`, `'left-start`',` 'left-end'`, `'right-start'`, `'right-end'` |
| hideDelay | Number | `0` | 提示内容消失延迟时间，单位是`'ms'` |
| offset | String | `'0'` | 弹出层偏移，如：'10', '10px 10px', '10% 10%', 第一个值表示水平偏移，第二个值表示垂直位移, 默认单位是`px` |
| follow-cursor | Boolean, Number, Object | `false` | 是否跟随鼠标 |
| disabled | Boolean | `false` | 是否禁用 |

### Slots

#### (default)

触发节点，该 slot 只能插入一个节点。Tooltip 除了会给该节点绑定触发事件，不会对它做任何事情。

#### popper

自定义整个弹出层。

#### body

自定义滚动区域。

#### content

自定义内容文本。

### Events

#### @before-toggle

弹出/隐藏前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| open | Boolean | 弹出/隐藏状态 |
| $event.preventDefault | Function | 阻止弹出/隐藏流程 |

#### @toggle

弹出/隐藏时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.open | Boolean | 弹出/隐藏状态 |

### Methods

#### update

更新 popper 实例

| Param | Type | Description |
| ----- | ---- | ----------- |

#### toggle

切换弹出/隐藏状态

| Param | Type | Description |
| ----- | ---- | ----------- |
| open | Boolean | 弹出/隐藏状态 |
