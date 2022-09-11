"use strict";
exports.id = 3182;
exports.ids = [3182];
exports.modules = {

/***/ 43182:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_spotlight_indicator": () => (/* binding */ DyteSpotlightIndicator)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61070);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55752);





const dyteSpotlightIndicatorCss = ":host{position:absolute;left:var(--dyte-space-0, 0px);right:var(--dyte-space-0, 0px);margin-left:auto;margin-right:auto;font-size:12px}.indicator{display:flex;height:100%;flex-direction:row;justify-content:center}.left-tab{display:flex;flex-direction:row;align-content:center;align-items:center;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));padding-left:var(--dyte-space-2, 8px);padding-right:var(--dyte-space-2, 8px);line-height:2rem;border-radius:4px 0px 0px 4px}.right-tab{cursor:pointer;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-bg-opacity));padding-left:var(--dyte-space-4, 16px);padding-right:var(--dyte-space-4, 16px);line-height:2rem;border-radius:0px 4px 4px 0px}.bg-paused{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-bg-opacity))}.bg-resume{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-success, 98 165 4) / var(--tw-bg-opacity))}div{align-content:center;line-height:2rem}dyte-icon{height:var(--dyte-space-6, 24px);width:var(--dyte-space-8, 32px)}";

const DyteSpotlightIndicator = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_1__.u)();
  }
  connectedCallback() {
    this.meetingChanged(this.meeting);
  }
  meetingChanged(meeting) {
    var _a, _b;
    if (meeting != null) {
      this.canSpotlight = meeting.self.permissions.canSpotlight;
      this.isSpotlighted = (_b = (_a = meeting.spotlight) === null || _a === void 0 ? void 0 : _a.spotlighted) !== null && _b !== void 0 ? _b : false;
    }
  }
  updateSpotlightState(spotlighted) {
    var _a;
    try {
      (_a = this.meeting.spotlight) === null || _a === void 0 ? void 0 : _a.setSpotlighted(spotlighted);
      this.isSpotlighted = spotlighted;
    }
    catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
  render() {
    return (this.meeting.spotlight &&
      this.canSpotlight === true && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "indicator" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { size: 'md', label: this.t('Any plugin or screenshare you switch to will sync the change across the meeting') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "left-tab" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { id: "icon", icon: this.iconPack.spotlight, tabIndex: -1, "aria-hidden": true }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, this.isSpotlighted
      ? this.t('Your tab bar changes are being synced')
      : this.t('Your tab bar changes are not being synced')))), this.isSpotlighted ? ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "right-tab bg-paused", onClick: () => this.updateSpotlightState(false) }, this.t('Pause'))) : ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "right-tab bg-resume", onClick: () => this.updateSpotlightState(true) }, this.t('Resume')))))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteSpotlightIndicator.style = dyteSpotlightIndicatorCss;




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