"use strict";
exports.id = 8286;
exports.ids = [8286];
exports.modules = {

/***/ 8286:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_recording_toggle": () => (/* binding */ DyteRecordingToggle)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55752);





const dyteRecordingToggleCss = ":host{display:block;font-family:var(--dyte-font-family, sans-serif)}";

const DyteRecordingToggle = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    /** Variant */
    this.variant = 'button';
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    this.canRecord = false;
    this.toggleRecording = () => {
      var _a, _b;
      if (this.isLoading())
        return;
      switch (this.recordingState) {
        case 'IDLE':
          (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.recording.start();
          return;
        case 'RECORDING':
          (_b = this.meeting) === null || _b === void 0 ? void 0 : _b.recording.stop();
          return;
        case 'STARTING':
        case 'STOPPING':
        default:
          return;
      }
    };
    this.isLoading = () => {
      return (this.meeting == null ||
        this.recordingState === 'STARTING' ||
        this.recordingState === 'STOPPING');
    };
  }
  connectedCallback() {
    this.meetingChanged(this.meeting);
  }
  disconnectedCallback() {
    var _a;
    this.recordingStateUpdateListener &&
      ((_a = this.meeting) === null || _a === void 0 ? void 0 : _a.recording.removeListener('recordingUpdate', this.recordingStateUpdateListener));
  }
  meetingChanged(meeting) {
    if (meeting != null) {
      this.recordingState = meeting.recording.recordingState;
      this.canRecord = meeting.self.permissions.canRecord === true;
      this.recordingStateUpdateListener = (recordingState) => {
        this.recordingState = recordingState;
      };
      meeting.recording.addListener('recordingUpdate', this.recordingStateUpdateListener);
    }
  }
  getLabel() {
    switch (this.recordingState) {
      case 'IDLE':
        return this.t('Record');
      case 'RECORDING':
        return this.t('Stop Recording');
      case 'STARTING':
        return this.t('Starting');
      case 'STOPPING':
        return this.t('Stopping');
      default:
        return this.t('Loading');
    }
  }
  getIcon() {
    switch (this.recordingState) {
      case 'IDLE':
        return this.iconPack.recording;
      case 'RECORDING':
        return this.iconPack.stop_recording;
      case 'STARTING':
      case 'STOPPING':
      default:
        return this.iconPack.recording;
    }
  }
  render() {
    if (!this.canRecord)
      return;
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, { title: this.t('Record') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-controlbar-button", { size: this.size, iconPack: this.iconPack, onClick: this.toggleRecording, icon: this.getIcon(), isLoading: this.isLoading(), label: this.t(this.getLabel()), variant: this.variant })));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteRecordingToggle.style = dyteRecordingToggleCss;




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