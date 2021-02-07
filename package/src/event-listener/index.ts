export interface ListenerOptions {
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
    id?: any;
}

export function on(
    typeSet: string,
    factorSelector,
    handle?,
    option?: ListenerOptions
) {
    const target = this;
    if (typeof factorSelector === 'function') {
        option = handle;
        handle = factorSelector;
        factorSelector = null;
    }
    target.listeners = target.listeners || [];
    const listen = function (event: any) {
        let $thisArg = target;
        // event delegation
        if (factorSelector) {
            let factor;
            if (typeof factorSelector === 'string') {
                factor = event.target.closest(factorSelector);
            } else if (event.target === factorSelector) {
                factor = event.target;
            }
            if (factor) {
                $thisArg = factor;
            } else {
                return;
            }
        }
        if (option && option.once) off.call(target, typeSet, factorSelector, handle, option);
        let detail = event.detail;
        detail = Array.isArray(detail) ? detail : [detail];
        if (handle) handle.call($thisArg, event, ...detail);
    };
    for (const eachTypeSet of typeSet.split(' ')) {
        const splits = eachTypeSet.split('.');
        const type = splits[0];
        target.listeners.push({
            typeSet: eachTypeSet,
            type,
            factorSelector,
            handle,
            option: option || false,
            listen
        });
        target.addEventListener(type, listen, option || false);
    }
    return target;
};

export function off(
    typeSet?: any,
    factorSelector?,
    handle?,
    option?: ListenerOptions
) {
    const
        target = this,
        listeners = target.listeners;
    if (!listeners) return target;
    if (typeSet) {
        if (typeof typeSet === 'string') {
            if (typeof factorSelector === 'function') {
                option = handle;
                handle = factorSelector;
                factorSelector = null;
            } else if (factorSelector instanceof Object) {
                option = factorSelector;
                factorSelector = undefined;
            }
            const typeSets = typeSet.split(' ');
            for (const eachTypeSet of typeSets) {
                const splits = eachTypeSet.split('.');
                let namespaces: string[];
                let type: string;
                if (eachTypeSet[0] !== '.') {
                    type = splits[0];
                }
                namespaces = splits.slice(1);
                for (let listenerIndex = listeners.length - 1; listenerIndex >= 0; listenerIndex--) {
                    const listener = listeners[listenerIndex];
                    let remove = false;
                    if (type) {
                        remove = type === listener.type;
                        if (namespaces.length)
                            remove = remove && listener.typeSet.has(namespaces, '.');
                        if (option?.id && listener.option?.id) {
                            let matched = true;
                            for (let index = 0; index < option.id.length; index++) {
                                if (option.id[index] !== listener.option.id[index]) {
                                    matched = false;
                                    break;
                                }
                            }
                            remove = remove && matched;
                        }
                    } else if (namespaces.length) {
                        remove = listener.typeSet.has(namespaces, '.')
                    } else {
                        continue;
                    }
                    if (handle) remove = remove && handle === listener.handle;
                    if (factorSelector) remove = remove && factorSelector === listener.factorSelector;
                    if (remove) {
                        target.removeEventListener(listener.type, listener.listen, listener.option || false);
                        listeners.splice(listenerIndex, 1);
                    }
                }
            }
        } else if (typeof typeSet === 'function') {
            handle = typeSet;
            for (let listenerIndex = listeners.length - 1; listenerIndex >= 0; listenerIndex--) {
                const listener = listeners[listenerIndex];
                if (listener.handle === handle) {
                    target.removeEventListener(listener.type, listener.listen, listener.option || false);
                    listeners.splice(listenerIndex, 1);
                }
            }
        } else {
            option = typeSet;
            for (let listenerIndex = listeners.length - 1; listenerIndex >= 0; listenerIndex--) {
                const listener = listeners[listenerIndex];

                if (option?.id && listener.option?.id) {
                    let matched = true;
                    for (let index = 0; index < option.id.length; index++) {
                        if (option.id[index] !== listener.option.id[index]) {
                            matched = false;
                            break;
                        }
                    }
                    if (matched) {
                        target.removeEventListener(listener.type, listener.listen, listener.option || false);
                        listeners.splice(listenerIndex, 1);
                    }
                }
            }
        }
    } else {
        for (const listener of target.listeners) {
            target.removeEventListener(listener.type, listener.listen, listener.option);
        }
        target.listeners = null;
    }
    return target;
};
