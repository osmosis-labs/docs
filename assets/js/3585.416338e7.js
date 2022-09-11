"use strict";
exports.id = 3585;
exports.ids = [3585];
exports.modules = {

/***/ 73585:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_clock": () => (/* binding */ DyteClock)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55752);





const dyteClockCss = ":host{margin-left:var(--dyte-space-2, 8px);margin-right:var(--dyte-space-2, 8px);display:inline-flex;align-items:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;font-family:var(--dyte-font-family, sans-serif);font-size:14px;color:rgb(var(--dyte-colors-text-1000, 255 255 255));font-variant-numeric:tabular-nums}:host([size='sm']){margin-left:var(--dyte-space-1, 4px);margin-right:var(--dyte-space-1, 4px);font-size:12px}dyte-icon{margin-right:var(--dyte-space-1, 4px);height:var(--dyte-space-5, 20px);width:var(--dyte-space-5, 20px)}:host([size='sm']) dyte-icon{height:var(--dyte-space-4, 16px);width:var(--dyte-space-4, 16px)}";

const addZero = (n) => Math.trunc(n).toString().padStart(2, '0');
const DyteClock = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    this.disconnectMeeting = () => {
      this.timeout && clearTimeout(this.timeout);
      typeof this.request === 'number' && cancelAnimationFrame(this.request);
    };
  }
  connectedCallback() {
    this.meetingChanged(this.meeting);
  }
  disconnectedCallback() {
    this.disconnectMeeting();
  }
  meetingChanged(meeting) {
    var _a;
    this.disconnectMeeting();
    if (meeting != null) {
      this.startedTime = (_a = meeting.meta.meetingStartedTimestamp) === null || _a === void 0 ? void 0 : _a.toISOString();
    }
  }
  startedTimeChanged(startedTime) {
    if (startedTime !== undefined) {
      const animate = () => {
        this.timeDiff = (Date.now() - new Date(this.startedTime).getTime()) / 1000;
        this.timeout = setTimeout(() => {
          if (this.request != null) {
            this.request = requestAnimationFrame(animate);
          }
        }, 500);
      };
      this.request = requestAnimationFrame(animate);
    }
  }
  getFormattedTime() {
    if (this.timeDiff == null) {
      return null;
    }
    const diff = this.timeDiff;
    let time = '';
    if (diff >= 3600) {
      time = `${addZero(diff / 3600)}:`;
    }
    time += `${addZero((diff % 3600) / 60)}:${addZero(diff % 60)}`;
    return time;
  }
  render() {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, { tabIndex: 0, role: "timer", "aria-live": "off" }, this.startedTime !== undefined && [
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.clock, "aria-hidden": true, tabIndex: -1, part: "icon" }),
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", { part: "text" }, this.getFormattedTime()),
    ]));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"],
    "startedTime": ["startedTimeChanged"]
  }; }
};
DyteClock.style = dyteClockCss;




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




/***/ })

};
;