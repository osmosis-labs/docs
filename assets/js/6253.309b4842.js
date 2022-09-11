"use strict";
exports.id = 6253;
exports.ids = [6253];
exports.modules = {

/***/ 96253:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_settings": () => (/* binding */ DyteSettings)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79781);
/* harmony import */ var _versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(76851);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55752);







const dyteSettingsCss = ":host{position:relative;display:flex;overflow:hidden;border-radius:var(--dyte-border-radius-md, 8px);width:100%;font-family:var(--dyte-font-family, sans-serif);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-1000, 255 255 255))}header{display:flex;align-items:center;justify-content:space-between;padding-left:var(--dyte-space-4, 16px);padding-right:var(--dyte-space-4, 16px)}button{font-family:var(--dyte-font-family, sans-serif)}.title{font-size:20px;line-height:1}.back-btn,.dismiss-btn{border-radius:var(--dyte-border-radius-sm, 4px);background-color:transparent;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.back-btn:hover,.dismiss-btn:hover{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}aside{box-sizing:border-box;display:flex;min-width:var(--dyte-space-56, 224px);flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));padding-left:var(--dyte-space-2, 8px)}aside button{margin-top:var(--dyte-space-4, 16px);box-sizing:border-box;display:flex;width:100%;align-items:center;justify-content:space-between;border-top-left-radius:var(--dyte-border-radius-sm, 4px);border-bottom-left-radius:var(--dyte-border-radius-sm, 4px);padding-left:var(--dyte-space-4, 16px);padding-right:var(--dyte-space-4, 16px);padding-top:var(--dyte-space-3, 12px);padding-bottom:var(--dyte-space-3, 12px);background-color:transparent;color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88));cursor:default;font-size:16px;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);border-width:var(--dyte-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px}aside button .right{display:flex;align-items:center}aside button .right dyte-icon{height:var(--dyte-space-6, 24px);width:var(--dyte-space-6, 24px)}aside button .right dyte-icon:last-child{margin-left:var(--dyte-space-4, 16px)}aside button[type='button']{cursor:pointer;transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}aside button[type='button']:hover{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}aside button[type='button']{border-right:var(--dyte-border-width-md, 2px) solid transparent}aside button.active{--tw-border-opacity:1;border-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-border-opacity));background-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / 0.2)}aside button.active:hover{background-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / 0.2)}dyte-icon.poor{--tw-text-opacity:1;color:rgba(var(--dyte-colors-warning, 255 205 7) / var(--tw-text-opacity))}dyte-icon.poorest{--tw-text-opacity:1;color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-text-opacity))}dyte-icon.good{--tw-text-opacity:1;color:rgba(var(--dyte-colors-success, 98 165 4) / var(--tw-text-opacity))}main{display:flex;flex:1 1 0%;align-items:center;justify-content:center;padding-left:var(--dyte-space-6, 24px);padding-right:var(--dyte-space-6, 24px);box-sizing:border-box;width:100%}.dismiss-btn{position:absolute;top:var(--dyte-space-3, 12px);right:var(--dyte-space-3, 12px);height:var(--dyte-space-6, 24px);width:var(--dyte-space-6, 24px)}:host([size='sm']) aside{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}:host([size='sm']) .dismiss-btn{top:var(--dyte-space-5, 20px);right:var(--dyte-space-4, 16px)}:host([size='sm']) aside{width:100%;padding-left:var(--dyte-space-0, 0px)}:host([size='sm']) aside button{border-radius:var(--dyte-border-radius-none, 0)}:host([size='sm']) aside button.active{border-width:var(--dyte-border-width-none, 0);border-style:none;background-color:transparent}:host([size='sm']) aside button.active:hover{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}:host([size='sm']) aside.hide{display:none}:host([size='sm']) main{display:none;padding-left:var(--dyte-space-4, 16px);padding-right:var(--dyte-space-4, 16px)}:host([size='sm']) main header{justify-content:center}:host([size='sm']) main header dyte-button{position:absolute;left:var(--dyte-space-4, 16px)}:host([size='sm']) main.active{display:block}";

const DyteSettings = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    this.keyPressListener = (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    };
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    this.activeTab = 'connection';
    this.isMobileMainVisible = false;
    this.networkStatus = 'good';
    this.canProduceAudio = false;
    this.canProduceVideo = false;
  }
  connectedCallback() {
    document.addEventListener('keydown', this.keyPressListener);
    this.meetingChanged(this.meeting);
  }
  disconnectedCallback() {
    var _a;
    // NOTE(ishita1805): hidden because preview was removed from self.
    // this.meeting?.self.disablePreview();
    this.keyPressListener && document.removeEventListener('keydown', this.keyPressListener);
    this.poorConnectionListener &&
      ((_a = this.meeting) === null || _a === void 0 ? void 0 : _a.meta.removeListener('poorConnection', this.poorConnectionListener));
  }
  meetingChanged(meeting) {
    if (meeting != null) {
      this.canProduceAudio = meeting.self.permissions.produceAudio === 'ALLOWED';
      this.canProduceVideo = (0,_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__.c)(_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__.P.Video, meeting.self.permissions);
      if (!this.canProduceAudio && !this.canProduceVideo) {
        // don't show anything
        this.activeTab = 'connection';
      }
      else if (this.canProduceAudio) {
        this.activeTab = 'audio';
      }
      else {
        this.activeTab = 'video';
      }
      this.poorConnectionListener = ({ score }) => {
        if (score < 7) {
          this.networkStatus = 'poor';
        }
        else if (score < 4) {
          this.networkStatus = 'poorest';
        }
        setTimeout(() => {
          // reset after 5 seconds
          this.networkStatus = 'good';
        }, 5000);
      };
      meeting.meta.addListener('poorConnection', this.poorConnectionListener);
    }
  }
  changeTab(tab) {
    this.activeTab = tab;
    if (this.size === 'sm') {
      if (!this.isMobileMainVisible) {
        this.isMobileMainVisible = true;
      }
    }
  }
  close() {
    this.stateUpdate.emit({ activeSettings: false });
    _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeSettings = false;
  }
  render() {
    if (this.meeting == null)
      return null;
    const defaults = {
      meeting: this.meeting,
      states: this.states || _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s,
      iconPack: this.iconPack,
      t: this.t,
    };
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("aside", { class: { hide: this.isMobileMainVisible }, part: "menu" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("header", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("h2", null, this.t('settings'))), this.canProduceAudio && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("button", { type: "button", class: { active: this.activeTab === 'audio' }, onClick: () => this.changeTab('audio') }, this.t('audio'), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "right" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.mic_on }), this.size === 'sm' && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.chevron_right })))), this.canProduceVideo && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("button", { type: "button", class: { active: this.activeTab === 'video' }, onClick: () => this.changeTab('video') }, this.t('video'), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "right" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.video_on }), this.size === 'sm' && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.chevron_right })))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("button", { type: "none", title: `Your network condition is ${this.networkStatus}` }, this.t('connection'), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "right" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.wifi, class: this.networkStatus })))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("main", { class: { active: this.isMobileMainVisible }, part: "main-content" }, this.size === 'sm' && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("header", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "icon", class: "back-btn", onClick: () => (this.isMobileMainVisible = false) }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.chevron_left })), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("h2", null, this.t(this.activeTab === 'audio' ? 'audio' : 'video')))), this.activeTab === 'audio' && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-settings-audio", Object.assign({}, defaults)), this.activeTab === 'video' && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-settings-video", Object.assign({}, defaults)))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteSettings.style = dyteSettingsCss;




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