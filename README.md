Vuex-Thunk
=============

## Usage

### 1. when to use?

  &emsp;在action中需要执行异步请求

### 2. how to use?

&emsp; (1) 在创建store的文件中引入此模块的createStore函数
 
     import createStore from 'vuex-thunk/'
     
     const store=createStore(options) //options为 new Vuex.Store()中的参数

     export default store


&emsp;(2) 从vuex-thunk模块中引入THUNK事件类型,并在action文件中定义请求的三种状态，分别对应pending、success、failure  

     import {THUNK} from 'vuex-thunk'
  
     const REQUEST='REQUEST' 

     const REQUEST_SUCCESS='REQUEST_SUCCESS' 

     const REQUEST_FAILURE='REQUEST_FAILURE' 

触发此请求类action

     fireAction({commit}){
        commit(THUNK, {
            type: [REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE],
            api: (request) => request(url),   //url为请求接口地址
            ...params,
        });
     }

&emsp;(3)在mutations中处理对应的事件类型

     export default {
         [REQUEST](state, payload) {
             // payload={result:{success:false,loading:true}}
         },
         [REQUEST_SUCCESS](state, payload) {
            // payload={result:{success:true, loading:false, data:any result you want}
         },
         [REQUEST_FAILURE](state, payload) {
            // payload={result:{success:false,loading:false}}
       }
}

## Q&A:
#### 1.为何不重写store.dispatch，非得通过commit一个特殊的事件类型来触发请求类的action?

&emsp;首先，可以重写store的dispath方法，栗子如下：

    function createStore(options){
        const store=new Vuex.store(options);
        const dispatch=function(...args){  //args为任意参数，通过各种判断可以进行各种操作并在合适的时机调用原生的dispatch方法
            const [arg1,arg2,...rest]=args;

             dispatch(arg1);
            dosomethingBefore() //
            dispatch(arg2);
            dosomethingAfter() //
            dispatch(rest);
        }
        return{
            ...store,
            dispatch
        }
    }

 &emsp;遇到的问题是在action函数中的context参数与创建出来的store实例不是同一个对象， 所以在action中直接调用dispatch并不是store里重写的dispatch，
 在vuex的插件机制中拿到的dispatch亦为原生的dispath，故放弃此方案。  


#### 2.在action中commit此特殊事件类型后如何在该action中拿到请求结果或者说如何知道此事件类型真正完成(成功或失败)？

 &emsp;将action函数改为如下形式

    fireAction({commit}){
        commit(THUNK, {
            type: [REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE],
            api: (request) => {  // 请求结束回调形式，执行顺序在REQUEST_SUCCESS之后
                request(url).then((result) => {
                    console.log('request is finished', result);
                });
            },
            ...params,
        });
     }
