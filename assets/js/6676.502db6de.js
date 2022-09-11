"use strict";
exports.id = 6676;
exports.ids = [6676];
exports.modules = {

/***/ 66676:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_mic_toggle": () => (/* binding */ DyteMicToggle)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79781);
/* harmony import */ var _versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(76851);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55752);







const dyteMicToggleCss = ":host{display:block;font-family:var(--dyte-font-family, sans-serif)}:host(.audioDisabled) :slotted(dyte-icon){--tw-text-opacity:1;color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-text-opacity))}";

const DyteMicToggle = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    this.audioUpdateListener = ({ audioEnabled }) => {
      this.audioEnabled = audioEnabled;
    };
    this.selfJoinStateListener = () => {
      this.updateCanProduce(this.meeting);
    };
    this.selfJoinStateRejectedListener = () => {
      this.updateCanProduce(this.meeting);
    };
    this.mediaPermissionErrorListener = ({ kind, message }) => {
      if (kind === 'audio') {
        this.micPermission = message;
      }
    };
    /** Variant */
    this.variant = 'button';
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    this.audioEnabled = false;
    this.canProduceAudio = false;
    this.micPermission = 'NOT_REQUESTED';
    this.toggleMic = () => {
      var _a;
      if (this.hasPermissionError()) {
        this.stateUpdate.emit({ activePermissionsMessage: true });
        _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activePermissionsMessage = true;
        return false;
      }
      const self = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self;
      if (self == null || !this.canProduceAudio) {
        return;
      }
      if (self.audioEnabled) {
        self.disableAudio();
      }
      else {
        self.enableAudio();
      }
    };
  }
  connectedCallback() {
    this.meetingChanged(this.meeting);
  }
  disconnectedCallback() {
    var _a, _b, _c, _d, _e, _f, _g;
    (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self.removeListener('audioUpdate', this.audioUpdateListener);
    (_b = this.meeting) === null || _b === void 0 ? void 0 : _b.self.removeListener('mediaPermissionError', this.mediaPermissionErrorListener);
    (_c = this.meeting) === null || _c === void 0 ? void 0 : _c.self.removeListener('joinStageRequestAccepted', this.selfJoinStateListener);
    (_d = this.meeting) === null || _d === void 0 ? void 0 : _d.self.removeListener('joinStageRequestRejected', this.selfJoinStateRejectedListener);
    (_e = this.meeting) === null || _e === void 0 ? void 0 : _e.self.removeListener('stageJoined', this.selfJoinStateListener);
    (_f = this.meeting) === null || _f === void 0 ? void 0 : _f.self.removeListener('stageLeft', this.selfJoinStateListener);
    (_g = this.meeting) === null || _g === void 0 ? void 0 : _g.self.removeListener('removedFromStage', this.selfJoinStateListener);
  }
  meetingChanged(meeting) {
    if (meeting != null) {
      const self = meeting.self;
      this.canProduceAudio = self.permissions.produceAudio === 'ALLOWED';
      this.updateCanProduce(meeting);
      this.micPermission = meeting.self.mediaPermissions.audio || 'NOT_REQUESTED';
      this.audioEnabled = self.audioEnabled;
      self.addListener('audioUpdate', this.audioUpdateListener);
      self.addListener('mediaPermissionError', this.mediaPermissionErrorListener);
      self.addListener('joinStageRequestAccepted', this.selfJoinStateListener);
      self.addListener('joinStageRequestRejected', this.selfJoinStateRejectedListener);
      self.addListener('stageJoined', this.selfJoinStateListener);
      self.addListener('stageLeft', this.selfJoinStateListener);
      self.addListener('removedFromStage', this.selfJoinStateListener);
    }
  }
  updateCanProduce(meeting) {
    const { self, meta } = meeting;
    const hasPermission = (0,_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__.c)(_versionTwoApis_04d51844_js__WEBPACK_IMPORTED_MODULE_4__.P.Audio, self.permissions);
    const isWebinar = meta.viewType === 'WEBINAR';
    this.canProduceAudio = false;
    if (!isWebinar && hasPermission) {
      this.canProduceAudio = true;
    }
    if (isWebinar && hasPermission) {
      const canPresent = self.permissions.canPresent;
      const canRequest = self.permissions.requestProduce;
      // If the peer can present or has approved request to present
      if (canPresent ||
        (canRequest &&
          (self.webinarStageStatus === 'ON_STAGE' ||
            self.webinarStageStatus === 'ACCEPTED_TO_JOIN_STAGE'))) {
        this.canProduceAudio = true;
      }
    }
  }
  hasPermissionError() {
    return this.micPermission !== 'NOT_REQUESTED' && this.micPermission !== 'ACCEPTED';
  }
  getState() {
    let tooltipLabel = '';
    let label = '';
    let icon = '';
    let classList = {};
    let hasError = this.hasPermissionError();
    if (this.audioEnabled && !hasError) {
      label = this.t('mic_on');
      icon = this.iconPack.mic_on;
    }
    else {
      label = this.t('mic_off');
      icon = this.iconPack.mic_off;
      classList['red-icon'] = true;
    }
    if (this.micPermission === 'COULD_NOT_START') {
      tooltipLabel = this.t('Unable to capture audio');
    }
    else if (this.micPermission === 'SYSTEM_DENIED') {
      tooltipLabel = this.t('perm_sys_denied');
    }
    else if (this.micPermission === 'DENIED') {
      tooltipLabel = this.t('perm_browser_denied');
    }
    else {
      tooltipLabel = this.audioEnabled ? this.t('Disable Mic') : this.t('Enable Mic');
    }
    return { tooltipLabel, label, icon, classList, showWarning: hasError };
  }
  render() {
    if (!this.canProduceAudio) {
      return null;
    }
    const { tooltipLabel, label, icon, classList, showWarning } = this.getState();
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, { title: label }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { kind: "block", label: tooltipLabel, part: "tooltip" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-controlbar-button", { part: "controlbar-button", icon: icon, label: label, size: this.size, iconPack: this.iconPack, variant: this.variant, class: classList, onClick: this.toggleMic, showWarning: showWarning, disabled: showWarning }))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteMicToggle.style = dyteMicToggleCss;




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