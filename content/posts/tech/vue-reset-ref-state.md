---
title: Vue 实现重置 ref 状态的方法
description: 在 Vue 里管理表单、筛选条件和局部状态时，怎样把 ref 里的状态安全地重置回初始值。
date: 2026-03-27
draft: false
tags:
  - vue
  - frontend
  - state-management
aliases: []
cssclasses: []
socialImage: ""
comments: true
---

# 写在前面

在 Vue 里用 `ref` 保存页面状态很方便，但一旦状态稍微复杂一点，“重置回初始值”这件事就容易写得不干净。

最常见的场景是：

- 表单点击“重置”
- 列表页筛选条件恢复默认值
- 弹窗关闭后，局部状态需要回到初始状态

如果一开始没有把“初始值”和“当前值”的关系想清楚，后面就很容易出现引用复用、重置不彻底、默认值被污染这些问题。

## 最容易踩坑的写法

很多人会先这么写：

```ts
const initialState = {
  keyword: "",
  page: 1,
  pageSize: 20,
}

const state = ref(initialState)

function reset() {
  state.value = initialState
}
```

这段代码看起来没问题，但其实 `state.value` 和 `initialState` 指向的是同一个对象。

如果你在别处修改了 `state.value.keyword`，`initialState.keyword` 也会一起变。最后你以为自己在“恢复默认值”，实际恢复的是一个已经被污染过的对象。

## 更稳妥的思路

核心原则只有一个：

**每次重置时都返回一个新的初始对象，而不是复用旧引用。**

### 方案一：用工厂函数生成初始值

这是我最常用、也最稳的一种写法。

```ts
type SearchState = {
  keyword: string
  page: number
  pageSize: number
  onlyPublished: boolean
}

function createInitialState(): SearchState {
  return {
    keyword: "",
    page: 1,
    pageSize: 20,
    onlyPublished: true,
  }
}

const state = ref<SearchState>(createInitialState())

function reset() {
  state.value = createInitialState()
}
```

这个写法的好处是：

- 初始结构集中在一个地方
- 每次重置都能拿到新对象
- TypeScript 也容易跟上

如果你的状态本身就是一个对象，这基本可以作为默认选择。

### 方案二：对 `reactive` 做字段回写

如果你用的是 `reactive`，而且组件里很多地方都直接依赖这个响应式对象本身，那就不一定适合整体替换引用。

这时可以用字段回写的方式：

```ts
const createInitialState = () => ({
  keyword: "",
  page: 1,
  pageSize: 20,
})

const state = reactive(createInitialState())

function reset() {
  Object.assign(state, createInitialState())
}
```

这种方式的关键点在于：

- 保留 `state` 这个响应式对象本身不变
- 只把字段值覆盖回去

如果有组件、计算属性或 watcher 依赖的是这个对象引用，而不是它的字段值，这种方式会更安全。

## 什么情况下不要直接用浅拷贝

如果状态里有嵌套对象，下面这种写法要非常小心：

```ts
const initialState = {
  keyword: "",
  filters: {
    status: "all",
    category: "all",
  },
}

const state = ref({ ...initialState })
```

表面看你已经拷贝了一层，但 `filters` 这个嵌套对象仍然是同一个引用。

如果你改了：

```ts
state.value.filters.status = "done"
```

那 `initialState.filters.status` 也会一起被改掉。

## 嵌套状态怎么处理

如果状态结构比较深，我一般还是会优先回到“工厂函数返回新对象”这个办法：

```ts
function createInitialState() {
  return {
    keyword: "",
    filters: {
      status: "all",
      category: "all",
    },
    pagination: {
      page: 1,
      pageSize: 20,
    },
  }
}

const state = ref(createInitialState())

function reset() {
  state.value = createInitialState()
}
```

如果状态来源比较复杂，或者默认值要从外部参数推导，也一样可以把逻辑包在工厂函数里。

## 表单场景里的一个补充

如果你重置的是表单状态，通常不只是字段值要回去，校验状态、错误提示、提交中状态这些也要一起清理。

所以更完整的写法往往会是：

```ts
function createInitialFormState() {
  return {
    name: "",
    email: "",
    company: "",
  }
}

const form = ref(createInitialFormState())
const submitting = ref(false)
const errorMessage = ref("")

function resetForm() {
  form.value = createInitialFormState()
  submitting.value = false
  errorMessage.value = ""
}
```

这里的重点不是“把字段清空”，而是把这次交互留下来的上下文一起收干净。

## 我自己的判断标准

如果是 Vue 里的局部页面状态，我现在基本按这套思路选：

- `ref + 工厂函数`：适合大多数对象状态
- `reactive + Object.assign`：适合必须保留同一响应式对象引用的场景
- 避免复用初始对象引用
- 对嵌套对象保持警惕，不要误以为浅拷贝就够了

## 结论

重置 `ref` 状态这件事，真正要避免的不是“写法不优雅”，而是**初始值和当前值共享引用**。

一旦把这个问题拆清楚，重置方案其实很稳定：

- 用工厂函数返回一个新的初始对象，是大多数场景的默认解法
- 必须保留同一个响应式对象时，再用 `reactive + Object.assign`
- 只要状态里有对象或数组，就不要复用旧引用

如果你正好在做老项目重构，这类状态重置问题也常常会在迁移阶段一起暴露出来，可以和 [[posts/tech/vue-cli-to-vite-migration|vue-cli 项目迁移到 Vite 遇到的问题和解决办法]] 放在一起看。
