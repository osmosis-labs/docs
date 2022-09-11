"use strict";
exports.id = 8407;
exports.ids = [8407];
exports.modules = {

/***/ 28407:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_settings_audio": () => (/* binding */ DyteSettingsAudio),
/* harmony export */   "dyte_settings_video": () => (/* binding */ DyteSettingsVideo)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _user_prefs_be1700cb_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58318);
/* harmony import */ var _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79781);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55752);
/* harmony import */ var _graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(60804);








const dyteSettingsAudioCss = ".dyte-select{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-1000, 255 255 255))}.dyte-select:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)}.dyte-select{display:block;border-radius:var(--dyte-border-radius-sm, 4px);border-width:var(--dyte-border-width-none, 0);border-style:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:var(--dyte-space-3, 12px);font-size:16px;--icon-size:var(--dyte-select-chevron-size, var(--dyte-space-6, 24px));--icon-right-position:var(--dyte-select-chevron-right-position, var(--dyte-space-2, 8px));background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\");background-position:right var(--icon-right-position) center;background-repeat:no-repeat;background-size:var(--icon-size) var(--icon-size);padding-right:calc(var(--icon-right-position) * 5)}:host{display:flex;width:100%;flex-direction:column;font-family:var(--dyte-font-family, sans-serif)}select{font-family:var(--dyte-font-family, sans-serif)}audio{visibility:hidden}label{-webkit-user-select:none;-moz-user-select:none;user-select:none;font-size:14px}.group{margin-top:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-2, 8px)}.group>*{margin-bottom:var(--dyte-space-2, 8px)}.group>*:last-child{margin-bottom:var(--dyte-space-0, 0px)}.group select{flex:1 1 0%}.row{display:flex;align-items:center;justify-content:space-between;gap:var(--dyte-space-3, 12px)}.dyte-select{width:100%;max-width:100%}dyte-audio-visualizer{flex-shrink:0}dyte-button{border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}dyte-button dyte-icon{margin-right:var(--dyte-space-2, 8px)}";

const DyteSettingsAudio = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    this.audioDevices = [];
    this.speakerDevices = [];
  }
  connectedCallback() {
    this.meetingChanged(this.meeting);
  }
  meetingChanged(meeting) {
    if (meeting == null)
      return;
    this.audioDevices = meeting.self.getAudioDevices();
    this.speakerDevices = meeting.self.getSpeakerDevices();
  }
  testAudio() {
    var _a;
    (_a = this.testAudioEl) === null || _a === void 0 ? void 0 : _a.play();
  }
  setDevice(kind, deviceId) {
    var _a, _b;
    const device = kind === 'audio'
      ? this.audioDevices.find((d) => d.deviceId === deviceId)
      : this.speakerDevices.find((d) => d.deviceId === deviceId);
    if (device != null) {
      (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self.setDevice(device);
      if (device.kind === 'audiooutput') {
        (_b = this.testAudioEl) === null || _b === void 0 ? void 0 : _b.setSinkId(device.deviceId);
      }
    }
  }
  render() {
    var _a, _b, _c;
    if (this.meeting == null)
      return null;
    let unnamedMicCount = 0;
    let unnamedSpeakerCount = 0;
    const currentDevices = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self.getCurrentDevices();
    const states = this.states || _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_4__.s;
    const initialNotificationSoundsPreference = ((_b = states === null || states === void 0 ? void 0 : states.prefs) === null || _b === void 0 ? void 0 : _b.muteNotificationSounds) === true ||
      (0,_user_prefs_be1700cb_js__WEBPACK_IMPORTED_MODULE_3__.a)('mute-notification-sounds') === 'true';
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("audio", { preload: "auto", src: "https://assets.dyte.io/ui-kit/speaker-test.mp3", ref: (el) => (this.testAudioEl = el) }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "group" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("label", null, "Microphone (input)"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "row" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("select", { class: "dyte-select", onChange: (e) => this.setDevice('audio', e.target.value) }, this.audioDevices.map(({ deviceId, label }) => {
      var _a;
      return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("option", { value: deviceId, selected: ((_a = currentDevices.audio) === null || _a === void 0 ? void 0 : _a.deviceId) === deviceId }, label || `Microphone ${++unnamedMicCount}`));
    })), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-audio-visualizer", { participant: (_c = this.meeting) === null || _c === void 0 ? void 0 : _c.self }))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "group" }, this.speakerDevices.length > 0 && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("label", null, "Speaker (output)"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "row" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("select", { class: "dyte-select", onChange: (e) => this.setDevice('speaker', e.target.value) }, this.speakerDevices.map(({ deviceId, label }) => {
      var _a;
      return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("option", { value: deviceId, selected: ((_a = currentDevices.speaker) === null || _a === void 0 ? void 0 : _a.deviceId) === deviceId }, label || `Speaker ${++unnamedSpeakerCount}`));
    }))))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "secondary", onClick: () => this.testAudio() }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.speaker, slot: "start" }), "Test")), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "group" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "row" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("label", { htmlFor: "notification-toggle" }, "Notification sound"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-switch", { id: "notification-toggle", checked: !initialNotificationSoundsPreference, onDyteChange: (e) => {
        var _a;
        const { checked } = e.target;
        const muteNotificationSounds = !checked;
        this.stateUpdate.emit({ prefs: { muteNotificationSounds } });
        _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_4__.s.prefs = Object.assign(Object.assign({}, ((_a = _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_4__.s.prefs) !== null && _a !== void 0 ? _a : {})), { muteNotificationSounds });
        (0,_user_prefs_be1700cb_js__WEBPACK_IMPORTED_MODULE_3__.s)('mute-notification-sounds', muteNotificationSounds);
      } })))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteSettingsAudio.style = dyteSettingsAudioCss;

const dyteSettingsVideoCss = ".dyte-select{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-1000, 255 255 255))}.dyte-select:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)}.dyte-select{display:block;border-radius:var(--dyte-border-radius-sm, 4px);border-width:var(--dyte-border-width-none, 0);border-style:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:var(--dyte-space-3, 12px);font-size:16px;--icon-size:var(--dyte-select-chevron-size, var(--dyte-space-6, 24px));--icon-right-position:var(--dyte-select-chevron-right-position, var(--dyte-space-2, 8px));background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\");background-position:right var(--icon-right-position) center;background-repeat:no-repeat;background-size:var(--icon-size) var(--icon-size);padding-right:calc(var(--icon-right-position) * 5)}:host{display:flex;width:100%;flex-direction:column;font-family:var(--dyte-font-family, sans-serif)}select{font-family:var(--dyte-font-family, sans-serif)}dyte-participant-tile{margin-left:auto;margin-right:auto;margin-bottom:var(--dyte-space-4, 16px);max-width:100%}#icon{padding-bottom:var(--dyte-space-1, 4px)}.apply-button{height:var(--dyte-space-10, 40px)}label{-webkit-user-select:none;-moz-user-select:none;user-select:none;font-size:14px}.group{margin-top:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-2, 8px)}.group>*{margin-bottom:var(--dyte-space-2, 8px)}.group>*:last-child{margin-bottom:var(--dyte-space-0, 0px)}.group select{flex:1 1 0%}.row{display:flex;align-items:center;justify-content:space-between;gap:var(--dyte-space-3, 12px)}";

const DyteSettingsVideo = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    this.videoDevices = [];
  }
  componentDidLoad() {
    this.meetingChanged(this.meeting);
  }
  meetingChanged(meeting) {
    if (meeting == null)
      return;
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.w)(async () => {
      var _a;
      const videoDevices = meeting.self.getVideoDevices();
      const currentVideoDevice = (_a = meeting.self.getCurrentDevices()) === null || _a === void 0 ? void 0 : _a.video;
      //  NOTE(callmetarush): Setting current video device to show on top of list
      if (currentVideoDevice !== undefined) {
        this.videoDevices = [
          currentVideoDevice,
          ...videoDevices.filter((device) => device.deviceId !== currentVideoDevice.deviceId),
        ];
      }
      else {
        this.videoDevices = videoDevices;
      }
    });
  }
  async setDevice(deviceId) {
    var _a;
    const device = this.videoDevices.find((d) => d.deviceId === deviceId);
    this.currentDevice = device;
    if (device != null) {
      await ((_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self.setDevice(device));
    }
  }
  render() {
    var _a, _b, _c;
    if (this.meeting == null)
      return null;
    let unnamedVideoCount = 0;
    const states = this.states || _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_4__.s;
    const initialMirrorPreference = ((_a = states === null || states === void 0 ? void 0 : states.prefs) === null || _a === void 0 ? void 0 : _a.mirrorVideo) === true || (0,_user_prefs_be1700cb_js__WEBPACK_IMPORTED_MODULE_3__.a)('mirror-video') === 'true';
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "group" }, ((_b = this.meeting.self) === null || _b === void 0 ? void 0 : _b.videoEnabled) === true ? ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-participant-tile", { participant: (_c = this.meeting) === null || _c === void 0 ? void 0 : _c.self, iconPack: this.iconPack, t: this.t, states: states, isPreview: true })) : ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "camera-off-helper" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-participant-tile", { participant: undefined }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { id: "icon", icon: this.iconPack.video_off, tabIndex: -1, "aria-hidden": true }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, "Camera is off")))))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "group" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("label", null, "Camera"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "row" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("select", { class: "dyte-select", onChange: (e) => this.setDevice(e.target.value) }, this.videoDevices.map(({ deviceId, label }) => ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("option", { value: deviceId }, label || `Camera ${++unnamedVideoCount}`)))))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "group" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "row" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("label", { htmlFor: "mirror-toggle" }, "Mirror my Video"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-switch", { checked: initialMirrorPreference, onDyteChange: (e) => {
        var _a;
        const { checked } = e.target;
        this.stateUpdate.emit({ prefs: { mirrorVideo: checked } });
        _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_4__.s.prefs = Object.assign(Object.assign({}, ((_a = _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_4__.s.prefs) !== null && _a !== void 0 ? _a : {})), { mirrorVideo: checked });
        (0,_user_prefs_be1700cb_js__WEBPACK_IMPORTED_MODULE_3__.s)('mirror-video', checked);
      } })))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteSettingsVideo.style = dyteSettingsVideoCss;




/***/ }),

/***/ 60804:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ gracefulStorage$1)
/* harmony export */ });
const handler = {
  get: (target, name, receiver) => (...args) => {
    try {
      return Reflect.get(target, name, receiver).apply(target, args);
    }
    catch (_a) {
      return null;
    }
  },
};
let gracefulStorage;
try {
  gracefulStorage = new Proxy(localStorage, handler);
}
catch (_a) {
  gracefulStorage = new Proxy({}, handler);
}
const gracefulStorage$1 = gracefulStorage;




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

/***/ 58318:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ getPreference),
/* harmony export */   "g": () => (/* binding */ getUserPreferences),
/* harmony export */   "s": () => (/* binding */ setPreference)
/* harmony export */ });
/* harmony import */ var _graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60804);


const KEY = 'dyte-prefs';
const setPreference = (key, value) => {
  const data = JSON.parse(_graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_0__.g.getItem(KEY) || '{}');
  data[key] = JSON.stringify(value);
  _graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_0__.g.setItem('dyte-prefs', JSON.stringify(data));
};
const getPreference = (key) => {
  const data = JSON.parse(_graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_0__.g.getItem(KEY) || '{}');
  return data[key];
};
const getUserPreferences = () => {
  const prefs = JSON.parse(_graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_0__.g.getItem(KEY) || '{}');
  const mirrorVideo = prefs['mirror-video'] ? prefs['mirror-video'] === 'true' : true;
  const muteNotificationSounds = prefs['mute-notification-sounds']
    ? prefs['mute-notification-sounds'] === 'true'
    : false;
  const autoScroll = prefs['auto-scroll'] ? prefs['auto-scroll'] === 'true' : true;
  return { mirrorVideo, muteNotificationSounds, autoScroll };
};




/***/ })

};
;