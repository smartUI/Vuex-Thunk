import thunkMiddleware from './thunkMiddleware';

export default (store) => {
    store.subscribe((mutation) => {
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }
        if (mutation.type === 'THUNK') {
            thunkMiddleware(store)(mutation.payload);
        }
    });
}