"use strict";
exports.id = 5203;
exports.ids = [5203];
exports.modules = {

/***/ 55203:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_grid_pagination": () => (/* binding */ DyteGridPagination)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55752);





const dyteGridPaginationCss = ":host{margin-left:var(--dyte-space-2, 8px);margin-right:var(--dyte-space-2, 8px);display:flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:center;font-family:var(--dyte-font-family, sans-serif);font-size:16px}:host([size='sm']){margin-left:var(--dyte-space-1, 4px);margin-right:var(--dyte-space-1, 4px);font-size:12px}:host([size='sm']) .center{margin-left:var(--dyte-space-0, 0px);margin-right:var(--dyte-space-0, 0px)}:host([size='sm']) dyte-button{height:var(--dyte-space-7, 28px);width:var(--dyte-space-7, 28px)}:host([size='sm']) dyte-button dyte-icon{height:var(--dyte-space-4, 16px);width:var(--dyte-space-4, 16px)}dyte-button{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.center{margin-left:var(--dyte-space-2, 8px);margin-right:var(--dyte-space-2, 8px);color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}.center .page{color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88))}.center .slash{margin-left:var(--dyte-space-0\\.5, 2px);margin-right:var(--dyte-space-0\\.5, 2px)}.center .pages{align-self:flex-end;font-size:12px}:host([variant='rounded']){overflow:hidden;border-radius:9999px;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}:host([variant='rounded']) dyte-button{border-radius:9999px;border-width:var(--dyte-border-width-none, 0);border-style:none;background-color:transparent;color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64));transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}:host([variant='rounded']) dyte-button:not([disabled]):hover{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}:host([variant='rounded']) dyte-button:not([disabled]):focus{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}:host([variant='grid']){margin-left:var(--dyte-space-0, 0px);margin-right:var(--dyte-space-0, 0px)}:host([variant='grid']) dyte-button{position:absolute;top:50%;height:var(--dyte-space-20, 80px);width:var(--dyte-space-20, 80px);opacity:0.2;transition-property:color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}:host([variant='grid']) dyte-button:hover{opacity:1}:host([variant='grid']) dyte-button{transform:translateY(-50%)}:host([variant='grid']) dyte-button.prev{left:var(--dyte-space-0, 0px);border-top-right-radius:9999px;border-bottom-right-radius:9999px}:host([variant='grid']) dyte-button.next{right:var(--dyte-space-0, 0px);border-top-left-radius:9999px;border-bottom-left-radius:9999px}:host([variant='grid']) dyte-button.auto{left:var(--dyte-space-0, 0px);right:var(--dyte-space-0, 0px);border-top-right-radius:9999px;border-bottom-right-radius:9999px}:host([variant='grid']) .dots{position:absolute;left:50%;bottom:var(--dyte-space-3, 12px);display:flex;align-items:center;transform:translateX(-50%)}:host([variant='grid']) .dots .dot{margin-right:var(--dyte-space-2, 8px);height:var(--dyte-space-2, 8px);width:var(--dyte-space-2, 8px);cursor:pointer;border-radius:9999px;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}:host([variant='grid']) .dots .dot:last-child{margin-right:var(--dyte-space-0, 0px)}:host([variant='grid']) .dots .dot.active{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-bg-opacity))}:host([variant='grid'][size='sm']) dyte-button{height:var(--dyte-space-14, 56px);width:var(--dyte-space-14, 56px);opacity:0.1}";

const DyteGridPagination = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    /** Variant */
    this.variant = 'rounded';
    /** Icon Pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    this.page = 1;
    this.pageCount = 0;
    this.activeCount = 0;
    this.activeComputedCount = 0;
    this.onPageChanged = ({ currentPage, pageCount, }) => {
      this.pageCount = pageCount;
      this.page = currentPage;
    };
    this.onParticipantJoin = () => {
      this.activeComputedCount += 1;
      this.activeCount = this.meeting.participants.joined.size;
      this.onParticipantUpdate();
    };
    this.onParticipantLeave = () => {
      this.activeComputedCount -= 1;
      this.activeCount = this.meeting.participants.joined.size;
      this.onParticipantUpdate();
    };
    this.onParticipantUpdate = () => {
      if (this.meeting == null)
        return;
      const { participants } = this.meeting;
      const pageCount = participants.pageCount;
      if (this.page > pageCount) {
        // if on last page, and all participants in that page leave
        this.page = pageCount;
        if (pageCount === 0) {
          participants.setViewMode('ACTIVE_GRID');
        }
        else {
          participants.setPage(pageCount);
        }
      }
      this.pageCount = pageCount;
    };
    this.prevPage = () => {
      if (this.meeting == null)
        return;
      const { participants } = this.meeting;
      if (this.page > 1) {
        participants.setPage((this.page -= 1));
      }
      else if (participants.viewMode === 'PAGINATED') {
        participants.setViewMode('ACTIVE_GRID');
      }
    };
    this.nextPage = () => {
      if (this.meeting == null)
        return;
      const { participants } = this.meeting;
      if (this.page > 0 && this.page < this.pageCount) {
        participants.setPage((this.page += 1));
      }
      else if (participants.count > 0 && this.pageCount === 0) {
        participants.setViewMode('PAGINATED');
      }
    };
  }
  connectedCallback() {
    this.meetingChanged(this.meeting);
  }
  disconnectedCallback() {
    if (this.meeting == null)
      return;
    const { participants } = this.meeting;
    participants.removeListener('pageChanged', this.onPageChanged);
    participants.removeListener('viewModeChanged', this.onPageChanged);
    participants.joined.removeListener('participantJoined', this.onParticipantUpdate);
    participants.joined.removeListener('participantLeft', this.onParticipantUpdate);
  }
  meetingChanged(meeting) {
    if (meeting != null) {
      const { participants } = meeting;
      this.page = participants.currentPage;
      this.pageCount = participants.pageCount;
      participants.addListener('viewModeChanged', this.onPageChanged);
      participants.addListener('pageChanged', this.onPageChanged);
      participants.joined.addListener('participantJoined', this.onParticipantJoin);
      participants.joined.addListener('participantLeft', this.onParticipantLeave);
      this.activeCount = this.meeting.participants.joined.size;
      this.activeComputedCount = this.meeting.participants.joined.size;
      this.onParticipantUpdate();
    }
  }
  render() {
    var _a, _b, _c, _d;
    const { meta, self } = this.meeting;
    const maxCount = (_d = (_c = (_b = (_a = self.suggestedTheme) === null || _a === void 0 ? void 0 : _a.grid) === null || _b === void 0 ? void 0 : _b.multi) === null || _c === void 0 ? void 0 : _c.maxVideoCount) !== null && _d !== void 0 ? _d : 0;
    const isWebinar = meta.viewType === 'WEBINAR';
    if (isWebinar || (this.activeCount < maxCount && this.activeComputedCount < maxCount)) {
      return;
    }
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { class: "prev", variant: "secondary", kind: "icon", disabled: this.pageCount === 0, onClick: this.prevPage, "aria-label": this.t('Previous Page') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.chevron_left })), this.variant !== 'grid' && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "center" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", { class: "page" }, this.pageCount === 0 ? ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: this.t('Auto Layout') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "icon", class: "auto" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.wand })))) : (this.page)), this.pageCount !== 0 && [
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", { class: "slash" }, "/"),
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", { class: "pages" }, this.pageCount),
    ])), this.variant === 'grid' && this.pageCount > 0 && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "dots" }, [...Array(this.pageCount)].map((_, index) => ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { key: `dot-${index}`, class: { dot: true, active: index + 1 === this.page } }))))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { class: "next", variant: "secondary", kind: "icon", disabled: this.page !== 0 && this.page === this.pageCount, onClick: this.nextPage, "aria-label": this.t('Next Page') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.chevron_right, tabIndex: -1, "aria-hidden": true }))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteGridPagination.style = dyteGridPaginationCss;




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