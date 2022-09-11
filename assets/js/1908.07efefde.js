"use strict";
exports.id = 1908;
exports.ids = [1908];
exports.modules = {

/***/ 21908:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_remote_access_manager": () => (/* binding */ DyteRemoteAccessManager)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55752);





const dyteRemoteAccessManagerCss = ".scrollbar{scrollbar-width:thin;scrollbar-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))\n    var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--dyte-space-1\\.5, 6px);width:var(--dyte-space-1\\.5, 6px);border-radius:9999px;background-color:var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))}:host{box-sizing:border-box;display:block;width:512px;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));padding:var(--dyte-space-6, 24px);-webkit-user-select:none;-moz-user-select:none;user-select:none;border-radius:var(--dyte-border-radius-md, 8px);line-height:1.25}.deny-access{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}h3,p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px)}h3{margin-bottom:var(--dyte-space-4, 16px);font-size:20px;line-height:1.5}p{margin-top:var(--dyte-space-4, 16px);margin-bottom:var(--dyte-space-4, 16px);font-size:14px}p.empty-message{text-align:center;font-size:16px}label>input{margin-right:var(--dyte-space-2, 8px)}input{background-color:transparent;accent-color:rgb(var(--dyte-colors-brand-500, 33 96 253))}#allow-requests-label{display:flex;align-items:center;font-size:12px}#actions{margin-top:var(--dyte-space-4, 16px);display:flex;align-items:center}dyte-button{flex:1 1 0%;border-radius:var(--dyte-border-radius-sm, 4px);font-size:12px}#participants-list{margin-top:var(--dyte-space-4, 16px);margin-bottom:var(--dyte-space-4, 16px);display:flex;flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));padding-left:var(--dyte-space-3, 12px);padding-right:var(--dyte-space-3, 12px);border-radius:var(--dyte-border-radius-md, 8px);max-height:var(--dyte-space-56, 224px);overflow-y:auto}.participant{box-sizing:border-box;display:flex;height:var(--dyte-space-14, 56px);align-items:center;padding-left:var(--dyte-space-1, 4px);padding-right:var(--dyte-space-1, 4px);padding-top:var(--dyte-space-3, 12px);padding-bottom:var(--dyte-space-3, 12px);border-bottom:var(--dyte-border-width-sm, 1px) solid rgb(var(--dyte-colors-background-700, 44 44 44))}.participant:last-child{border-bottom-width:var(--dyte-border-width-none, 0)}.participant{cursor:pointer;font-size:14px}.participant input{margin-right:var(--dyte-space-3, 12px)}dyte-avatar{margin-right:var(--dyte-space-2, 8px);height:var(--dyte-space-8, 32px);width:var(--dyte-space-8, 32px)}";

const DyteRemoteAccessManager = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
  }
  disconnectedCallback() { }
  meetingChanged(meeting) {
    var _a, _b, _c, _d;
    if (meeting != null) {
      if (!Boolean(this.acceptedRequestId) && Boolean((_c = (_b = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.remote) === null || _b === void 0 ? void 0 : _b.active) === null || _c === void 0 ? void 0 : _c.id)) {
        this.acceptedRequestId = (_d = this.meeting.remote.active) === null || _d === void 0 ? void 0 : _d.id;
      }
    }
  }
  render() {
    var _a, _b, _c, _d;
    if (!Boolean((_b = (_a = this === null || this === void 0 ? void 0 : this.meeting) === null || _a === void 0 ? void 0 : _a.remote) === null || _b === void 0 ? void 0 : _b.incomingRequests.toArray().length)) {
      return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", { class: "empty-message" }, this.t('There are no remote requests, yet.'))));
    }
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("h3", null, this.t('The following people have requested remote control to your screen share')), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, this.t('Please select whom you want to give access to')), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "scrollbar" }, (_d = (_c = this === null || this === void 0 ? void 0 : this.meeting) === null || _c === void 0 ? void 0 : _c.remote) === null || _d === void 0 ? void 0 : _d.incomingRequests.toArray().map((incomingRequest) => {
      const requestPeer = this.meeting.participants.joined.get(incomingRequest.remotePeerId);
      return (
      // should use participant id for htmlFor instead
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("label", { onClick: () => {
          this.acceptedRequestId = incomingRequest.id;
        }, class: "participant", htmlFor: requestPeer.id }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", { type: "radio", checked: this.acceptedRequestId === incomingRequest.id, name: "remote-access-participant", value: incomingRequest.id }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-avatar", { participant: requestPeer, size: "sm" }), requestPeer.name));
    })), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { id: "actions" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { disabled: !Boolean(this.acceptedRequestId), onClick: () => {
        var _a;
        (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.remote.acceptControl(this.acceptedRequestId);
        this.stateUpdate.emit({ activeRemoteAccessManager: false });
      } }, this.t('Grant access')))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteRemoteAccessManager.style = dyteRemoteAccessManagerCss;




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