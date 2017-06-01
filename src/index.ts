import Vuex, { Store, StoreOptions } from 'vuex';
import thunkPlugin from './thunkPlugin';
export const THUNK = 'THUNK';

type ThunkMiddlewareResult = (options: StoreOptions<any>) => Store<object>;

function createThunkMiddleware(): ThunkMiddlewareResult {
    return (options) => {
        if (!options.plugins) {
            options.plugins = [thunkPlugin];
        } else {
            if (Array.isArray(options.plugins)) {
                options.plugins.push(thunkPlugin);
            } else {
                throw TypeError('plugins须为数组');
            }
        }
        if (options.mutations) {
            Object.assign(options.mutations, {
                [THUNK]() { },
            });
        }
        const store = new Vuex.Store(options);
        return store;
    };
}

export default createThunkMiddleware();