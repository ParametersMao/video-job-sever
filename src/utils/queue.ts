class RequestDecorator {
  maxLimit = 5
  requestQueue = []
  currentConcurrent = 0
  requestApi: (...args) => Promise<any> = null
  shouldRetry = null
  maxRetry = 3
  constructor({
    maxLimit = 5,
    requestApi,
    shouldRetry = () => false,
    maxRetry = 3,
  }) {
    // 最大并发量
    this.maxLimit = maxLimit
    // 请求队列,若当前请求并发量已经超过maxLimit,则将该请求加入到请求队列中
    this.requestQueue = []
    // 当前并发量数目
    this.currentConcurrent = 0
    // 使用者定义的请求api，若用户传入needChange2Promise为true,则将用户的callback类api使用pify这个库将其转化为promise类的。
    this.requestApi = requestApi
    // 是否重试
    this.shouldRetry = shouldRetry
    // 重试次数
    this.maxRetry = maxRetry
  }

  // 发起请求api
  async request(...args) {
    // 若当前请求数并发量超过最大并发量限制，则将其阻断在这里。
    // startBlocking会返回一个promise，并将该promise的resolve函数放在this.requestQueue队列里。这样的话，除非这个promise被resolve,否则不会继续向下执行。
    // 当之前发出的请求结果回来/请求失败的时候，则将当前并发量-1,并且调用this.next函数执行队列中的请求
    // 当调用next函数的时候，会从this.requestQueue队列里取出队首的resolve函数并且执行。这样，对应的请求则可以继续向下执行。
    if (this.currentConcurrent >= this.maxLimit)
      await this.startBlocking()

    try {
      this.currentConcurrent++
      const result = await this.retryRequest(...args)
      return Promise.resolve(result)
    }
    catch (err) {
      return Promise.reject(err)
    }
    finally {
      console.log('当前并发数:', this.currentConcurrent)
      this.currentConcurrent--
      this.next()
    }
  }

  retryRequest(...args): any {
    const taskQueue = new Array(this.maxRetry).fill(null)
      .map((item, index) => () => new Promise((resolve) => {
        this.requestApi(...args).then((reuslt) => {
          resolve({ retry: this.shouldRetry(reuslt), index: index + 1, data: reuslt })
        }).catch(() => resolve(true))
      }))

    return taskQueue.reduce((pre, next) => {
      return pre.then((res: any) => {
        if (res.retry && res.retry !== 'init')
          console.log(`retry request ${res.index}`)
        return res.retry ? next() : Promise.resolve(res)
      })
    }, Promise.resolve({ retry: 'init' })).then((res) => {
      return res.data
    })
  }

  // 新建一个promise,并且将该reolsve函数放入到requestQueue队列里。
  // 当调用next函数的时候，会从队列里取出一个resolve函数并执行。
  startBlocking() {
    let _resolve
    const promise2 = new Promise((resolve: any) => _resolve = resolve)
    this.requestQueue.push(_resolve)
    return promise2
  }

  // 从请求队列里取出队首的resolve并执行。
  next() {
    if (this.requestQueue.length <= 0)
      return
    const _resolve = this.requestQueue.shift()
    _resolve()
  }
}

export default RequestDecorator
