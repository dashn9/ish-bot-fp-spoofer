const bExtensionUtils = {};

bExtensionUtils.init = () => {
    bExtensionUtils._preloadCache();
    bExtensionUtils._preloadGlobalVariables();
};
bExtensionUtils._preloadCache = () => {
    if (bExtensionUtils.cache) {
        return;
    }

    bExtensionUtils.cache = OffscreenCanvas.prototype.constructor.__$cache;
    if (bExtensionUtils.cache) {
        return;
    }
    class ɵɵɵɵPromise extends Promise { }

    OffscreenCanvas.prototype.constructor.__$cache = bExtensionUtils.cache = {
        // Used in `makeNativeString`
        nativeToStringStr: Function.toString + "", // => `function toString() { [native code] }`
        // Used in our proxies
        Reflect: {
            get: Reflect.get.bind(Reflect),
            set: Reflect.set.bind(Reflect),
            apply: Reflect.apply.bind(Reflect),
            ownKeys: Reflect.ownKeys.bind(Reflect),
            getOwnPropertyDescriptor: Reflect.getOwnPropertyDescriptor.bind(Reflect),
            setPrototypeOf: Reflect.setPrototypeOf.bind(Reflect),
        },
        Promise: ɵɵɵɵPromise,
        Object: {
            setPrototypeOf: Object.setPrototypeOf.bind(Object),
            getPrototypeOf: Object.getPrototypeOf.bind(Object),
            getOwnPropertyDescriptors: Object.getOwnPropertyDescriptors.bind(Object),
            getOwnPropertyDescriptor: Object.getOwnPropertyDescriptor.bind(Object),
            entries: Object.entries.bind(Object),
            fromEntries: Object.fromEntries.bind(Object),
            defineProperty: Object.defineProperty.bind(Object),
            defineProperties: Object.defineProperties.bind(Object),
            getOwnPropertyNames: Object.getOwnPropertyNames.bind(Object),
            create: Object.create.bind(Object),
            keys: Object.keys.bind(Object),
            values: Object.values.bind(Object),
        },
        Function: {
            prototype: {
                toString: Function.prototype.toString,
            },
        },
        global: "undefined" !== typeof window ? window : globalThis,
        window: {
            getComputedStyle:
                "undefined" !== typeof window && window.getComputedStyle.bind(window),
            eval:
                "undefined" !== typeof window
                    ? window.eval.bind(window)
                    : globalThis
                        ? globalThis.eval.bind(globalThis)
                        : undefined,
            navigator:
                "undefined" !== typeof window
                    ? window.navigator
                    : globalThis
                        ? globalThis.navigator
                        : undefined,
        },
        OffscreenCanvas: {
            prototype: {
                getContext:
                    "undefined" !== typeof OffscreenCanvas &&
                    OffscreenCanvas.prototype.getContext,
            },
        },
        HTMLCanvasElement: {
            prototype: {
                getContext:
                    "undefined" !== typeof HTMLCanvasElement &&
                    HTMLCanvasElement.prototype.getContext,
            },
        },
        Descriptor: {},
    };
    const cacheDescriptors = (objPath, propertyKeys) => {
        // get obj from path
        const objPaths = objPath.split('.');
        let _global = bExtensionUtils.cache.global;
        let descObj = bExtensionUtils.cache.Descriptor;

        for (const part of objPaths) {
            if (_global) {
                // noinspection JSUnresolvedFunction
                if (!Object.hasOwn(_global, part)) {
                    _global = undefined;
                } else {
                    _global = _global[part];
                }
            }

            const subCacheObj = descObj[part] || {};
            descObj[part] = subCacheObj;
            descObj = subCacheObj;
        }

        for (const key of propertyKeys) {
            descObj[key] = _global ? Object.getOwnPropertyDescriptor(_global, key) : undefined;
        }
    };

    cacheDescriptors('window', ['alert']);
    cacheDescriptors('Navigator.prototype', ['webdriver']);
    cacheDescriptors('WorkerNavigator.prototype', ['webdriver']);
    cacheDescriptors('HTMLElement.prototype', ['style']);
    cacheDescriptors('CSSStyleDeclaration.prototype', ['setProperty']);
    cacheDescriptors('FontFace.prototype', ['load']);
    cacheDescriptors('WebGLShaderPrecisionFormat.prototype', ['rangeMin', 'rangeMax', 'precision']);
};

bExtensionUtils._preloadGlobalVariables = () => {
    if (bExtensionUtils.variables) {
        return;
    }

    bExtensionUtils.variables = OffscreenCanvas.prototype.constructor.__$variables;
    if (bExtensionUtils.variables) {
        return;
    }

    OffscreenCanvas.prototype.constructor.__$variables = bExtensionUtils.variables = {
        proxies: [],
        toStringPatchObjs: [],
        toStringRedirectObjs: [],
        renderingContextWithOperators: [],
        taskData: {},
    };

    const cacheDescriptors = (objPath, propertyKeys) => {
        // get obj from path
        const objPaths = objPath.split(".");
        let _global = bExtensionUtils.cache.global;
        let descObj = bExtensionUtils.cache.Descriptor;

        for (const part of objPaths) {
            if (_global) {
                // noinspection JSUnresolvedFunction
                if (!Object.hasOwn(_global, part)) {
                    _global = undefined;
                } else {
                    _global = _global[part];
                }
            }

            const subCacheObj = descObj[part] || {};
            descObj[part] = subCacheObj;
            descObj = subCacheObj;
        }

        for (const key of propertyKeys) {
            descObj[key] = _global
                ? Object.getOwnPropertyDescriptor(_global, key)
                : undefined;
        }
    };

    cacheDescriptors("window", ["alert"]);
    cacheDescriptors("Navigator.prototype", ["webdriver"]);
    cacheDescriptors("WorkerNavigator.prototype", ["webdriver"]);
    cacheDescriptors("HTMLElement.prototype", ["style"]);
    cacheDescriptors("CSSStyleDeclaration.prototype", ["setProperty"]);
    cacheDescriptors("FontFace.prototype", ["load"]);
    cacheDescriptors("WebGLShaderPrecisionFormat.prototype", [
        "rangeMin",
        "rangeMax",
        "precision",
    ]);
}
/**
 * Wraps a JS Proxy Handler and strips it's presence from error stacks, in case the traps throw.
 *
 * The presence of a JS Proxy can be revealed as it shows up in error stack traces.
 *
 * @param {object} handler - The JS Proxy handler to wrap
 */
bExtensionUtils.stripProxyFromErrors = (handler = {}) => {
    const _Object = bExtensionUtils.cache.Object;
    const _Reflect = bExtensionUtils.cache.Reflect;

    const ɵɵɵɵnewHandler = {
        setPrototypeOf: function (target, proto) {
            if (proto === null)
                throw new TypeError('Cannot convert object to primitive value');
            if (_Object.getPrototypeOf(target) === _Object.getPrototypeOf(proto)) {
                throw new TypeError('Cyclic __proto__ value');
            }

            return _Reflect.setPrototypeOf(target, proto);
        },
    };

    // We wrap each trap in the handler in a try/catch and modify the error stack if they throw
    const traps = _Object.getOwnPropertyNames(handler);
    traps.forEach(trap => {
        ɵɵɵɵnewHandler[trap] = function () {
            try {
                // Forward the call to the defined proxy handler
                return handler[trap].apply(this, arguments || []);
            } catch (err) {
                err = bExtensionUtils.patchError(err, trap);
                throw err;
            }
        };
    });

    return ɵɵɵɵnewHandler;
};

/**
 * The context is saved when the canvas.getContext is created.
 * @param context
 * @param operatorName
 * @returns {number}
 */
bExtensionUtils.markRenderingContextOperator = (context, operatorName) => {
    const result = bExtensionUtils.variables.renderingContextWithOperators.findIndex(e => e.context === context);

    if (result >= 0) {
        const operators = bExtensionUtils.variables.renderingContextWithOperators[result];
        if (operators) {
            operators.operators[operatorName] = true;
        }
    }

    return result;
};

bExtensionUtils.intersectionSet = (a, b) => {
    if (b instanceof Array) {
        b = new Set(b);
    }

    return new Set([...a].filter(x => b.has(x)));
};

bExtensionUtils.patchError = (err, trap) => {

    //0: "TypeError: Failed to execute 'query' on 'Permissions': Failed to read the 'name' property from 'PermissionDescriptor': The provided value 'speaker' is not a valid enum value of type PermissionName."
    // 1: "    at eval (eval at <anonymous> (:15:24), <anonymous>:32:50)"
    // 2: "    at new Promise (<anonymous>)"
    // 3: "    at new ɵɵɵɵPromise (eval at <anonymous> (:10:49), <anonymous>:11:5)"
    // 4: "    at Object.apply (eval at <anonymous> (:15:24), <anonymous>:20:24)"
    // 5: "    at Object.ɵɵɵɵnewHandler.<computed> [as apply] (eval at <anonymous> (:10:49), <anonymous>:23:38)"
    // 6: "    at e (https://www.n
    // 7: "    at https://www.n
    // 8: "    at Array.map (<anonymous>)"
    // 9: "    at Object.np (https://www.ni
    // 10: "    at Object.bpd (https://www.ni

    // call stack:
    // 	eval	                    @	VM2999:32
    // ɵɵɵɵPromise	                @	VM2324:11
    // apply	                    @	VM2999:20
    // ɵɵɵɵnewHandler.<computed>	@	VM2966:23
    // e	                        @	G2IB:1
    // (anonymous)	                @	G2IB:1
    // np	                        @	G2IB:1
    // bpd	                        @	G2IB:1
    // startTracking	            @	G2IB:1
    // (anonymous)	                @	G2IB:1

    // ===

    // 0: "TypeError: Illegal invocation"
    // 1: "    at Object.apply (eval at <anonymous> (:15:24), <anonymous>:23:48)"
    // 2: "    at Object.ɵɵɵɵnewHandler.<computed> [as apply] (eval at <anonymous> (:10:49), <anonymous>:23:38)"
    // 3: "    at https://api.ni
    // 4: "    at j (https://api.ni
    // 5: "    at Object.epk (https://api.ni
    // 6: "    at https://api.n
    // 7: "    at https://api.nik

    // apply	                    @	VM6234:23
    // ɵɵɵɵnewHandler.<computed>	@	VM6201:23
    // (anonymous)	                @	ips.js?ak_bmsc_nke-2…K9HsrXz4ZcCIkpl4a:1
    // j	                        @	ips.js?ak_bmsc_nke-2…K9HsrXz4ZcCIkpl4a:1
    // epk	                        @	ips.js?ak_bmsc_nke-2…K9HsrXz4ZcCIkpl4a:1
    // (anonymous)	                @	ips.js?ak_bmsc_nke-2…K9HsrXz4ZcCIkpl4a:1
    // (anonymous)	                @	ips.js?ak_bmsc_nke-2…9HsrXz4ZcCIkpl4a:52

    // ===

    // 0: "TypeError: Function.prototype.toString requires that 'this' be a Function"
    // 1: "    at Function.toString (<anonymous>)"
    // 2: "    at Object.apply (<anonymous>:215:33)"
    // 3: "    at Object.ɵɵɵɵnewHandler.<computed> [as apply] (<anonymous>:492:38)"
    // 4: "    at getNewObjectToStringTypeErrorLie (https://abrahamjuliot.github.io/creepjs/creepworker.js:223:31)"
    // 5: "    at getLies (https://abrahamjuliot.github.io/creepjs/creepworker.js:317:38)"
    // 6: "    at https://abrahamjuliot.github.io/creepjs/creepworker.js:379:16"
    // 7: "    at Array.forEach (<anonymous>)"
    // 8: "    at searchLies (https://abrahamjuliot.github.io/creepjs/creepworker.js:357:17)"
    // 9: "    at getPrototypeLies (https://abrahamjuliot.github.io/creepjs/creepworker.js:424:2)"
    // 10: "    at getWorkerData (https://abrahamjuliot.github.io/creepjs/creepworker.js:1009:6)"

    // apply	                        @	VM3:215
    // ɵɵɵɵnewHandler.<computed>	    @	VM3:492
    // getNewObjectToStringTypeErrorLie	@	creepworker.js:223
    // getLies	                        @	creepworker.js:317
    // (anonymous)	                    @	creepworker.js:379
    // searchLies	                    @	creepworker.js:357
    // getPrototypeLies	                @	creepworker.js:424
    // getWorkerData	                @	creepworker.js:1009
    // async function (async)
    // getWorkerData	                @	creepworker.js:896
    // (anonymous)	                    @	creepworker.js:1095

    // ===

    // Replacement logics:
    // 1 -- * First, detect ``at Object.ɵɵɵɵnewHandler.<computed> [as ``
    // 1.1 ---- ``ɵɵɵɵnewHandler`` may be used by the anti-bot system (fakebrowser is open source code :D  ), TODO: so we need replace ``ɵɵɵɵ`` in bExtensionUtils.js with new random string
    // 1.2 ---- save the line number eg: :10:49, :23:38 => fbCodeStackLineNumbers.push()
    // 2 -- use regex to find ``apply``, save apply as variable ${realTrap}
    // 3 -- Check that the next line of code is: ``at Object.${realTrap} (``
    // 3.1 ---- save the line number from this line of code => fbCodeStackLineNumbers.push()
    // 4 -- remove the line corresponding to ``at new ɵɵɵɵPromise (eval at <anonymous>`` (replacing ``ɵɵɵɵ`` with another string)
    // 4.1 -- check next line is ``at new Promise (<anonymous>)`` ? remove it.
    // 5 -- delete the lines containing line numbers from fbCodeStackLineNumbers, and add the line numbers contained in those lines to fbCodeStackLineNumbers
    // 6 -- fin

    if (!err || !err.stack || !err.stack.includes(`at `)) {
        return err;
    }

    // Special cases due to our nested toString proxies
    err.stack = err.stack.replace(
        'at Object.toString (',
        'at Function.toString (',
    );

    // 1
    let realTrap = '';
    let stackLines = err.stack.split('\n');

    let lineIndex = stackLines.findIndex(e => {
        const matches = e.match(/Object\.ɵɵɵɵnewHandler\.<computed> \[as (.*)]/);
        if (matches && matches[1]) {
            // 2
            realTrap = matches[1];
            return true;
        }

        return false;
    });

    if (lineIndex < 0 || !realTrap) {
        return err;
    }

    // let's start
    const fbCodeStackLineNumbers = [];

    const dumpLineNumbers = (line, add) => {
        // in   ===> Object.ɵɵɵɵnewHandler.<computed> [as apply] (eval at <anonymous> (:10:49), <anonymous>:23:38)
        // out  ===> array([':10:49', ':23:38'])
        // really don't know what those two numbers mean, caller? called? Whatever.

        // assert?
        const result = line.match(/:[0-9]+:[0-9]+/g) || [];
        if (add) {
            fbCodeStackLineNumbers.push(...result);
        }

        return result;
    };

    // 1.2
    dumpLineNumbers(stackLines[lineIndex], true);
    stackLines.splice(lineIndex, 1);

    // 3
    --lineIndex;
    if (stackLines[lineIndex].includes(`at Object.${realTrap} (`)) {
        // 3.1
        dumpLineNumbers(stackLines[lineIndex], true);
        stackLines.splice(lineIndex, 1);
    }

    for (let n = lineIndex - 1; n >= 0; --n) {
        const line = stackLines[n];

        // 4
        if (line.includes(`at new ɵɵɵɵPromise (eval at <anonymous>`)) {
            stackLines.splice(n, 1);

            // 4.1
            if (stackLines[n - 1] && stackLines[n - 1].includes(`at new Promise (<anonymous>)`)) {
                --n;
                stackLines.splice(n, 1);
            }

            continue;
        }

        // 5
        const lineNums = dumpLineNumbers(line, false);
        if (bExtensionUtils.intersectionSet(lineNums, fbCodeStackLineNumbers).size > 0) {
            fbCodeStackLineNumbers.push(...lineNums);
            stackLines.splice(n, 1);
        }
    }

    // 6
    err.stack = stackLines.join('\n');

    return err;
};

bExtensionUtils.newProxyInstance = (target, handler) => {
    // const newTarget = bExtensionUtils.getProxyTarget(target);
    const result = new Proxy(target, handler);
    bExtensionUtils.variables.proxies.push({ proxy: result, target });
    return result;
};

/**
 * Redirect toString requests from one object to another.
 *
 * @param {object} proxyObj - The object that toString will be called on
 * @param {object} originalObj - The object which toString result we wan to return
 */
bExtensionUtils.redirectToString = (proxyObj, originalObj) => {
    bExtensionUtils.variables.toStringRedirectObjs.push({ proxyObj, originalObj });
};

bExtensionUtils.replaceWithProxy = (obj, propName, handler) => {
    const originalObj = obj[propName];
    const _Reflect = bExtensionUtils.cache.Reflect;

    if (!originalObj) {
        return false;
    }

    // if (!handler.get) {
    //     handler.get = function ɵɵɵɵget(target, property, receiver) {
    //         debugger;
    //         return _Reflect.get(target, property, receiver);
    //     }
    // }

    const proxyObj = bExtensionUtils.newProxyInstance(
        originalObj,
        bExtensionUtils.stripProxyFromErrors(handler)
    );

    bExtensionUtils.replaceProperty(obj, propName, { value: proxyObj });
    bExtensionUtils.redirectToString(proxyObj, originalObj);

    return true;
};

/**
 * Replace the property of an object in a stealthy way.
 *
 * Note: You also want to work on the prototype of an object most often,
 * as you'd otherwise leave traces (e.g. showing up in Object.getOwnPropertyNames(obj)).
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 *
 * @example
 * replaceProperty(WebGLRenderingContext.prototype, 'getParameter', { value: "alice" })
 * // or
 * replaceProperty(Object.getPrototypeOf(navigator), 'languages', { get: () => ['en-US', 'en'] })
 *
 * @param {object} obj - The object which has the property to replace
 * @param {string | Symbol} propName - The property name to replace
 * @param {object} descriptorOverrides - e.g. { value: "alice" }
 */
bExtensionUtils.replaceProperty = (obj, propName, descriptorOverrides = {}) => {
    const _Object = bExtensionUtils.cache.Object;
    const descriptors = _Object.getOwnPropertyDescriptor(obj, propName) || {};

    // if (propName !== 'toString' && propName !== Symbol.toStringTag) {
    //     // noinspection JSUnusedLocalSymbols
    //     for (const [key, value] of _Object.entries(descriptorOverrides)) {
    //         if (descriptors[key]) {
    //             bExtensionUtils.redirectToString(descriptorOverrides[key], descriptors[key]);
    //         }
    //     }
    // }

    return _Object.defineProperty(obj, propName, {
        // Copy over the existing descriptors (writable, enumerable, configurable, etc)
        ...descriptors,
        // Add our overrides (e.g. value, get())
        ...descriptorOverrides,
    });
};
/**
 * Find the context created by the external based on the canvas
 * @param canvas
 * @returns {{context: *, contextIndex: number}|{context: null, contextIndex: number}}
 */
bExtensionUtils.findRenderingContextIndex = (canvas) => {
    const contextIds = [
        "2d",
        "webgl",
        "experimental-webgl",
        "webgl2",
        "experimental-webgl2",
        "bitmaprenderer",
    ];

    for (let contextId of contextIds) {
        let context = null;

        if (
            bExtensionUtils.cache.Object.getPrototypeOf(canvas) === OffscreenCanvas.prototype
        ) {
            context = bExtensionUtils.cache.OffscreenCanvas.prototype.getContext.call(
                canvas,
                contextId
            );
        } else {
            context = bExtensionUtils.cache.HTMLCanvasElement.prototype.getContext.call(
                canvas,
                contextId
            );
        }

        const contextIndex =
            bExtensionUtils.variables.renderingContextWithOperators.findIndex(
                (e) => e.context === context
            );

        if (contextIndex >= 0) {
            return { context, contextIndex };
        }
    }

    return { context: null, contextIndex: -1 };
};
bExtensionUtils.init();
