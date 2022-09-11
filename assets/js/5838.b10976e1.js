"use strict";
exports.id = 5838;
exports.ids = [5838];
exports.modules = {

/***/ 95838:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_dialog": () => (/* binding */ DyteDialog)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47502);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(61070);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(55752);






const dyteDialogCss = ":host{position:fixed;top:var(--dyte-space-0, 0px);right:var(--dyte-space-0, 0px);bottom:var(--dyte-space-0, 0px);left:var(--dyte-space-0, 0px);box-sizing:border-box;padding:var(--dyte-space-4, 16px);flex-direction:column;align-items:center;justify-content:center;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / 0.5);font-family:var(--dyte-font-family, sans-serif);color:rgb(var(--dyte-colors-text-1000, 255 255 255));visibility:hidden;display:none;z-index:60;-webkit-backdrop-filter:blur(12px) saturate(180%);backdrop-filter:blur(12px) saturate(180%)}#dialog{position:relative;max-height:100%;max-width:100%}#dismiss-btn{position:absolute;top:var(--dyte-space-3, 12px);right:var(--dyte-space-3, 12px);z-index:50}::slotted(*){max-height:100%;max-width:100%}:host([open]){visibility:visible;display:flex}:host([open='false']){visibility:hidden;display:none}";

const DyteDialog = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.onClose = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteDialogClose", 7);
    /** Whether to show the close button */
    this.hideCloseButton = false;
    /** UI Config */
    this.config = _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_3__.u)();
    /** Whether a dialog is open or not */
    this.open = true;
    this.close = () => {
      this.open = false;
      this.onClose.emit();
    };
    this.keydownListener = (e) => {
      if (e.key === 'Escape' && this.open) {
        this.close();
      }
    };
  }
  connectedCallback() {
    document.addEventListener('keydown', this.keydownListener);
  }
  disconnectedCallback() {
    document.removeEventListener('keydown', this.keydownListener);
  }
  render() {
    if (!this.open) {
      return null;
    }
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { id: "dialog", part: "container" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("slot", null), !this.hideCloseButton && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { part: "close-button", id: "dismiss-btn", kind: "icon", variant: "ghost", onClick: this.close }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.dismiss }))))));
  }
};
DyteDialog.style = dyteDialogCss;




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