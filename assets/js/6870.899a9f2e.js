"use strict";
exports.id = 6870;
exports.ids = [6870];
exports.modules = {

/***/ 66870:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_plugins": () => (/* binding */ DytePlugins)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79781);
/* harmony import */ var _versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(76851);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55752);







const dytePluginsCss = ".scrollbar{scrollbar-width:thin;scrollbar-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))\n    var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--dyte-space-1\\.5, 6px);width:var(--dyte-space-1\\.5, 6px);border-radius:9999px;background-color:var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))}:host{margin-top:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-2, 8px);display:flex;height:100%;width:100%;flex-direction:column;font-family:var(--dyte-font-family, sans-serif);font-size:14px;color:rgb(var(--dyte-colors-text-1000, 255 255 255))}h3{margin-left:var(--dyte-space-0, 0px);margin-right:var(--dyte-space-0, 0px);margin-top:var(--dyte-space-4, 16px);margin-bottom:var(--dyte-space-4, 16px);display:block;padding:var(--dyte-space-0, 0px);font-size:16px;font-weight:400;color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88));text-align:center}ul{overflow-y:auto;padding:var(--dyte-space-0, 0px);flex-grow:1;flex-basis:0}.metadata{display:flex;align-items:center}.metadata img{height:var(--dyte-space-8, 32px);width:var(--dyte-space-8, 32px);border-radius:var(--dyte-border-radius-sm, 4px)}.metadata .name{margin-left:var(--dyte-space-2, 8px);font-weight:500}.plugin{display:flex;align-items:center;justify-content:space-between;padding-left:var(--dyte-space-4, 16px);padding-right:var(--dyte-space-4, 16px);padding-top:var(--dyte-space-2, 8px);padding-bottom:var(--dyte-space-2, 8px)}.plugin .buttons{display:flex;align-items:center}dyte-button:hover{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);--tw-ring-opacity:1;--tw-ring-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-ring-opacity));--tw-ring-offset-width:2px;--tw-ring-offset-color:rgb(var(--dyte-colors-background-1000, 8 8 8))}";

const DytePlugins = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    this.plugins = [];
    this.canStartPlugins = false;
    this.canClosePlugin = false;
    this.activatedPluginsId = [];
    this.close = () => {
      this.stateUpdate.emit({ activeSidebar: false, sidebar: 'none' });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeSidebar = false;
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.sidebar = 'none';
    };
  }
  connectedCallback() {
    this.meetingChanged(this.meeting);
  }
  disconnectedCallback() {
    var _a;
    (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.plugins.all.removeListener('stateUpdate', this.updateActivePlugins);
  }
  meetingChanged(meeting) {
    if (meeting != null) {
      this.canStartPlugins = meeting.self.permissions.plugins.canStart;
      this.canClosePlugin = meeting.self.permissions.plugins.canClose;
      const whitelistedPluginsId = (0,_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__.i)(meeting.self.suggestedTheme)
        ? []
        : meeting.self.suggestedTheme.plugins;
      if (whitelistedPluginsId && whitelistedPluginsId.length > 0) {
        this.plugins = meeting.plugins.all
          .toArray()
          .filter((plugin) => whitelistedPluginsId.includes(plugin.id));
      }
      else {
        this.plugins = meeting.plugins.all.toArray();
      }
      this.updateActivePlugins = () => {
        this.activatedPluginsId = meeting.plugins.active.toArray().map((p) => p.id);
      };
      this.updateActivePlugins();
      meeting.plugins.all.addListener('stateUpdate', this.updateActivePlugins);
    }
  }
  render() {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("ul", { class: "scrollbar" }, this.plugins.map((plugin) => ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("li", { key: plugin.name, class: "plugin" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "metadata" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("img", { src: plugin.picture }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "name" }, plugin.name)), !this.activatedPluginsId.includes(plugin.id) && this.canStartPlugins && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "buttons" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "icon", size: "lg", onClick: () => {
        plugin.activate();
        this.close();
      }, "aria-label": `${this.t('Activate')} ${plugin.name}` }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.rocket, tabIndex: -1, "aria-hidden": true })))), this.activatedPluginsId.includes(plugin.id) && this.canClosePlugin && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "buttons" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "icon", size: "lg", onClick: () => {
        plugin.deactivate();
      }, "aria-label": `${this.t('Close')} ${plugin.name}` }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.dismiss, tabIndex: -1, "aria-hidden": true }))))))))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DytePlugins.style = dytePluginsCss;




/***/ }),

/***/ 61070:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ getLangData),
/* harmony export */   "u": () => (/* binding */ useLanguage)
/* harmony export */ });
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55752);


// Replace with cdn base path in prod
const LANG_BASE_URL = 'http://localhost:5000';
const getLangData = async (lang) => {
  if (lang == null || lang === 'en' || lang.trim() === '') {
    return _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__.d;
  }
  try {
    const res = await fetch(`${LANG_BASE_URL}/${lang}.json`);
    if (!res.ok) {
      return _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__.d;
    }
    // merge fetched language with defaultLanguage to avoid empty properties
    return Object.assign({}, _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__.d, await res.json());
  }
  catch (_) {
    return _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__.d;
  }
};
/**
 * Creates an i18n instance from a language dictionary/object.
 * @param lang The language dictionary
 * @returns A function which handles i18n
 */
const useLanguage = (lang = _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_0__.d) => {
  return (key) => {
    var _a;
    return (_a = lang[key]) !== null && _a !== void 0 ? _a : key;
  };
};




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




/***/ }),

/***/ 76851:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "P": () => (/* binding */ ProduceType),
/* harmony export */   "a": () => (/* binding */ isV2Permissions),
/* harmony export */   "c": () => (/* binding */ canProduce),
/* harmony export */   "i": () => (/* binding */ isV2Theme)
/* harmony export */ });
// NOTE:(callmetarush) This file is just till
// we support both V1 and V2 api's.
const isV2Permissions = (permissions) => {
  return 'requestProduceVideo' in permissions;
};
const isV2Theme = (theme) => {
  return !('controlBar' in theme);
};
var ProduceType;
(function (ProduceType) {
  ProduceType[ProduceType["Video"] = 0] = "Video";
  ProduceType[ProduceType["Audio"] = 1] = "Audio";
  ProduceType[ProduceType["ScreenShare"] = 2] = "ScreenShare";
})(ProduceType || (ProduceType = {}));
const canProduce = (produceType, permissions) => {
  switch (produceType) {
    case ProduceType.Video: {
      return ((isV2Permissions(permissions)
        ? permissions.produceVideo
        : permissions.produceVideo.allow) === 'ALLOWED');
    }
    case ProduceType.Audio: {
      return ((isV2Permissions(permissions)
        ? permissions.produceAudio
        : permissions.produceAudio) === 'ALLOWED');
    }
    case ProduceType.ScreenShare: {
      return ((isV2Permissions(permissions)
        ? permissions.produceScreenshare
        : permissions.produceScreenshare.allow) === 'ALLOWED');
    }
  }
};




/***/ })

};
;