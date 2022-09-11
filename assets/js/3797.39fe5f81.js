"use strict";
exports.id = 3797;
exports.ids = [3797];
exports.modules = {

/***/ 73797:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_meeting_title": () => (/* binding */ DyteMeetingTitle)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);


const dyteMeetingTitleCss = ":host{margin-left:var(--dyte-space-3, 12px);margin-right:var(--dyte-space-3, 12px);-webkit-user-select:none;-moz-user-select:none;user-select:none;font-family:var(--dyte-font-family, sans-serif);font-size:16px;color:rgb(var(--dyte-colors-text-1000, 255 255 255))}.title{text-align:center;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}:host([size='sm']){font-size:12px}";

const DyteMeetingTitle = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
  }
  render() {
    var _a;
    const title = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.meta.meetingTitle;
    if (title == null)
      return null;
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, { tabIndex: 0, role: "banner", "aria-label": title }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: title, part: "tooltip" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "title", part: "title" }, title))));
  }
};
DyteMeetingTitle.style = dyteMeetingTitleCss;




/***/ })

};
;