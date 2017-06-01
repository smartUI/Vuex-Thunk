
import { Dispatch, Store } from 'vuex';
import apiClient from './apiClient';
export default (store: Store<object>) => (...args: any[]) => {
    const { dispatch, commit } = store;
    if (!args.length) {
        return;
    }
    const [action] = args;
    if (typeof action === 'string') {
        dispatch(...args);
        return;
    } else {
        const { type, api, ...rest } = action;
        if (Array.isArray(type) && typeof api === 'function') {
            const [PENDING, SUCCESS, FAILURE] = type;
            commit(PENDING, {
                result: {
                    success: false,
                    loading: true,
                },
                ...rest,
            });
            console.log(store.state);
            api((url, options = {}) => {
                return apiClient(url, options).then((result) => {
                    if (result.success) {
                        commit(SUCCESS, {
                            result,
                            ...rest,
                        });
                        console.log(store.state);
                    } else {
                        commit(FAILURE, {
                            result,
                            ...rest,
                        });
                    }
                    return result;
                });
            });
        } else {
            dispatch(...args);
        }
    }
}
