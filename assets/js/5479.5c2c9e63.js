"use strict";
exports.id = 5479;
exports.ids = [5479];
exports.modules = {

/***/ 35479:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_broadcast_message_modal": () => (/* binding */ DyteBreakoutRoomsModal)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79781);




const dyteBroadcastMessageModalCss = ":host{position:relative;display:flex;flex-direction:column;overflow:hidden;border-radius:var(--dyte-border-radius-md, 8px);padding:var(--dyte-space-4, 16px);width:100%;font-family:var(--dyte-font-family, sans-serif);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-1000, 255 255 255));width:400px;max-width:80%}.content-col{display:flex;width:100%;flex-direction:column}h2{margin:var(--dyte-space-0, 0px);margin-bottom:var(--dyte-space-2, 8px)}.content-row{display:flex;width:100%;flex-direction:row}.content-row dyte-button{margin-top:var(--dyte-space-4, 16px);width:100%}textarea{margin-top:var(--dyte-space-3, 12px);resize:none;border-radius:var(--dyte-border-radius-sm, 4px);border-width:var(--dyte-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px;height:var(--dyte-space-16, 64px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));padding:var(--dyte-space-2, 8px);color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76));font-family:var(--dyte-font-family, sans-serif)}textarea::-moz-placeholder{color:rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52))}textarea::placeholder{color:rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52))}select{border-radius:var(--dyte-border-radius-sm, 4px);border-width:var(--dyte-border-width-none, 0);border-style:none;padding-top:var(--dyte-space-3, 12px);padding-bottom:var(--dyte-space-3, 12px);padding-left:var(--dyte-space-2, 8px);padding-right:var(--dyte-space-2, 8px);outline:2px solid transparent;outline-offset:2px;border-right-width:var(--dyte-border-width-md, 2px);border-style:solid;border-color:transparent;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-1000, 255 255 255))}p{margin:var(--dyte-space-0, 0px);margin-top:var(--dyte-space-2, 8px);width:100%;text-align:center;font-size:14px;--tw-text-opacity:1;color:rgba(var(--dyte-colors-brand-300, 73 124 253) / var(--tw-text-opacity));display:flex;flex-direction:row;align-items:center;justify-content:center}p dyte-icon{margin-left:var(--dyte-space-1, 4px);height:var(--dyte-space-5, 20px)}";

const DyteBreakoutRoomsModal = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Broadcast message state */
    this.messagePayload = {
      to: 'Everyone',
      message: '',
    };
    this.successMessage = false;
  }
  close() {
    var _a;
    (_a = this.stateUpdate) === null || _a === void 0 ? void 0 : _a.emit({ activeBroadcastMessageModal: false });
    _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_2__.s.activeBroadcastMessageModal = false;
  }
  sendMessage() {
    // TODO:(ishita1805) Send this.messagePayload to webcore.
    this.successMessage = true;
    setTimeout(() => {
      this.close();
    }, 2000);
  }
  render() {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "content-col" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("h2", null, "Broadcast message to"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("select", { onChange: (e) => {
        this.messagePayload = Object.assign(Object.assign({}, this.messagePayload), { to: e.target.value });
      } }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("option", null, "Everyone"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("option", null, "List of rooms")), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("textarea", { placeholder: "Type message here...", onInput: (e) => {
        this.messagePayload = Object.assign(Object.assign({}, this.messagePayload), { message: e.target.value });
      } }), this.successMessage ? ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, "Message sent to ", this.messagePayload.to, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.checkmark }))) : ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "content-row" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { onClick: () => this.close(), variant: "secondary" }, "Cancel"), "\u2002", (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "primary", onClick: () => this.sendMessage() }, "Send"))))));
  }
};
DyteBreakoutRoomsModal.style = dyteBroadcastMessageModalCss;




/***/ }),

/***/ 79781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ onChange),
/* harmony export */   "s": () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);


const appendToMap = (map, propName, value) => {
    const items = map.get(propName);
    if (!items) {
        map.set(propName, [value]);
    }
    else if (!items.includes(value)) {
        items.push(value);
    }
};
const debounce = (fn, ms) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            timeoutId = 0;
            fn(...args);
        }, ms);
    };
};

/**
 * Check if a possible element isConnected.
 * The property might not be there, so we check for it.
 *
 * We want it to return true if isConnected is not a property,
 * otherwise we would remove these elements and would not update.
 *
 * Better leak in Edge than to be useless.
 */
const isConnected = (maybeElement) => !('isConnected' in maybeElement) || maybeElement.isConnected;
const cleanupElements = debounce((map) => {
    for (let key of map.keys()) {
        map.set(key, map.get(key).filter(isConnected));
    }
}, 2000);
const stencilSubscription = () => {
    if (typeof _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.a !== 'function') {
        // If we are not in a stencil project, we do nothing.
        // This function is not really exported by @stencil/core.
        return {};
    }
    const elmsToUpdate = new Map();
    return {
        dispose: () => elmsToUpdate.clear(),
        get: (propName) => {
            const elm = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.a)();
            if (elm) {
                appendToMap(elmsToUpdate, propName, elm);
            }
        },
        set: (propName) => {
            const elements = elmsToUpdate.get(propName);
            if (elements) {
                elmsToUpdate.set(propName, elements.filter(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.f));
            }
            cleanupElements(elmsToUpdate);
        },
        reset: () => {
            elmsToUpdate.forEach((elms) => elms.forEach(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.f));
            cleanupElements(elmsToUpdate);
        },
    };
};

const createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
    let states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
    const handlers = {
        dispose: [],
        get: [],
        set: [],
        reset: [],
    };
    const reset = () => {
        states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
        handlers.reset.forEach((cb) => cb());
    };
    const dispose = () => {
        // Call first dispose as resetting the state would
        // cause less updates ;)
        handlers.dispose.forEach((cb) => cb());
        reset();
    };
    const get = (propName) => {
        handlers.get.forEach((cb) => cb(propName));
        return states.get(propName);
    };
    const set = (propName, value) => {
        const oldValue = states.get(propName);
        if (shouldUpdate(value, oldValue, propName)) {
            states.set(propName, value);
            handlers.set.forEach((cb) => cb(propName, value, oldValue));
        }
    };
    const state = (typeof Proxy === 'undefined'
        ? {}
        : new Proxy(defaultState, {
            get(_, propName) {
                return get(propName);
            },
            ownKeys(_) {
                return Array.from(states.keys());
            },
            getOwnPropertyDescriptor() {
                return {
                    enumerable: true,
                    configurable: true,
                };
            },
            has(_, propName) {
                return states.has(propName);
            },
            set(_, propName, value) {
                set(propName, value);
                return true;
            },
        }));
    const on = (eventName, callback) => {
        handlers[eventName].push(callback);
        return () => {
            removeFromArray(handlers[eventName], callback);
        };
    };
    const onChange = (propName, cb) => {
        const unSet = on('set', (key, newValue) => {
            if (key === propName) {
                cb(newValue);
            }
        });
        const unReset = on('reset', () => cb(defaultState[propName]));
        return () => {
            unSet();
            unReset();
        };
    };
    const use = (...subscriptions) => {
        const unsubs = subscriptions.reduce((unsubs, subscription) => {
            if (subscription.set) {
                unsubs.push(on('set', subscription.set));
            }
            if (subscription.get) {
                unsubs.push(on('get', subscription.get));
            }
            if (subscription.reset) {
                unsubs.push(on('reset', subscription.reset));
            }
            if (subscription.dispose) {
                unsubs.push(on('dispose', subscription.dispose));
            }
            return unsubs;
        }, []);
        return () => unsubs.forEach((unsub) => unsub());
    };
    const forceUpdate = (key) => {
        const oldValue = states.get(key);
        handlers.set.forEach((cb) => cb(key, oldValue, oldValue));
    };
    return {
        state,
        get,
        set,
        on,
        onChange,
        use,
        dispose,
        reset,
        forceUpdate,
    };
};
const removeFromArray = (array, item) => {
    const index = array.indexOf(item);
    if (index >= 0) {
        array[index] = array[array.length - 1];
        array.length--;
    }
};

const createStore = (defaultState, shouldUpdate) => {
    const map = createObservableMap(defaultState, shouldUpdate);
    map.use(stencilSubscription());
    return map;
};

const { state, onChange } = createStore({});




/***/ })

};
;