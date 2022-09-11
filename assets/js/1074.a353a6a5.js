"use strict";
exports.id = 1074;
exports.ids = [1074];
exports.modules = {

/***/ 61074:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_poll": () => (/* binding */ DytePolls),
/* harmony export */   "dyte_poll_form": () => (/* binding */ DytePoll)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _string_703da00e_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(67553);
/* harmony import */ var _utils_513ded39_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(76949);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55752);







const dytePollCss = ".scrollbar{scrollbar-width:thin;scrollbar-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))\n    var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--dyte-space-1\\.5, 6px);width:var(--dyte-space-1\\.5, 6px);border-radius:9999px;background-color:var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))}.ctr{margin-bottom:var(--dyte-space-3, 12px);display:flex;width:83.333333%;flex-direction:column;color:rgb(var(--dyte-colors-text-1000, 255 255 255))}.poll-title{margin-top:var(--dyte-space-3, 12px);margin-bottom:var(--dyte-space-3, 12px);margin-right:var(--dyte-space-4, 16px);font-size:12px;font-weight:700}.poll{border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));display:flex;flex-direction:column;padding:var(--dyte-space-3, 12px)}.poll p{margin:var(--dyte-space-0, 0px)}.poll-question{font-size:12px;font-weight:700;overflow-wrap:break-word}.poll-option{display:flex;flex-direction:column;margin-top:var(--dyte-space-2, 8px);border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity));padding:var(--dyte-space-2, 8px);word-break:break-word}.poll-option label{display:flex;flex-direction:row}.poll-option-header{display:flex;flex-direction:row;justify-content:space-between}.votes{display:flex;flex-direction:row;flex-wrap:wrap}.vote{margin-right:var(--dyte-space-1, 4px);padding:var(--dyte-space-3, 12px);border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));border-radius:var(--dyte-border-radius-none, 0);-webkit-clip-path:circle();clip-path:circle()}.active{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-bg-opacity))}";

const DytePolls = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.onVote = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteVotePoll", 7);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
  }
  vote(e, index) {
    if (this.poll.voted.includes(this.self)) {
      e.preventDefault();
    }
    else {
      this.onVote.emit({ id: this.poll.id, index });
    }
  }
  render() {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "ctr" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", { class: "poll-title" }, this.t('Poll by'), " ", (0,_string_703da00e_js__WEBPACK_IMPORTED_MODULE_4__.s)((0,_string_703da00e_js__WEBPACK_IMPORTED_MODULE_4__.f)(this.poll.createdBy), 20)), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "poll" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", { class: "poll-question" }, this.poll.question), this.poll.options.map((item, index) => ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: {
        active: item.votes.some((x) => x.id === this.self),
        'poll-option': true,
      } }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "poll-option-header" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("label", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", { type: "checkbox", checked: item.votes.some((x) => x.id === this.self), onClick: (e) => this.vote(e, index) }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, item.text, " (", item.count, ")"))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "votes" }, !this.poll.anonymous &&
      item.votes.map((vote) => {
        return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: vote.name }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "vote" }, (0,_utils_513ded39_js__WEBPACK_IMPORTED_MODULE_5__.g)(vote.name))));
      })))))))));
  }
};
DytePolls.style = dytePollCss;

const dytePollFormCss = ".scrollbar{scrollbar-width:thin;scrollbar-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))\n    var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--dyte-space-1\\.5, 6px);width:var(--dyte-space-1\\.5, 6px);border-radius:9999px;background-color:var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))}.create-poll{margin-top:var(--dyte-space-3, 12px);margin-bottom:var(--dyte-space-3, 12px);display:flex;flex:1 1 0%;flex-direction:column;padding:var(--dyte-space-3, 12px);border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}input{font-family:var(--dyte-font-family, sans-serif)}.create-poll p{margin:var(--dyte-space-0, 0px);padding:var(--dyte-space-0, 0px);text-align:center}.create-poll textarea{display:flex;border-radius:var(--dyte-border-radius-sm, 4px);padding:var(--dyte-space-2, 8px);border-width:var(--dyte-border-width-none, 0);border-style:none;font-family:var(--dyte-font-family, sans-serif);font-weight:500;outline:2px solid transparent;outline-offset:2px;margin-top:var(--dyte-space-3, 12px);margin-bottom:var(--dyte-space-3, 12px);resize:vertical;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}.create-poll textarea:focus{outline-style:solid;outline-offset:2px;outline-color:rgb(var(--dyte-colors-background-600, 60 60 60))}.option{display:flex;flex-direction:row;align-items:center;margin-bottom:var(--dyte-space-3, 12px);width:100%}.option input{width:100%;border-radius:var(--dyte-border-radius-sm, 4px);padding:var(--dyte-space-2, 8px);border-width:var(--dyte-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}.remove-option{margin-left:var(--dyte-space-2, 8px);width:var(--dyte-space-10, 40px);border-radius:var(--dyte-border-radius-sm, 4px)}.add-option{margin-bottom:var(--dyte-space-3, 12px)}label{margin-bottom:var(--dyte-space-3, 12px)}.error-text{margin-top:var(--dyte-space-3, 12px);text-align:center;font-size:12px;--tw-text-opacity:1;color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-text-opacity))}";

const DytePoll = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.onCreate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteCreatePoll", 7);
    this.anonymous = false;
    this.hideVotes = true;
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    /** Options */
    this.options = ['', ''];
  }
  removeOption(index) {
    var _a;
    this.options = this.options.filter((_, ind) => ind !== index);
    if (((_a = this.error) === null || _a === void 0 ? void 0 : _a.code) === 1)
      this.error = undefined;
  }
  addOption() {
    this.options = [...this.options, ''];
  }
  updateOption(ev, index) {
    var _a;
    this.options[index] = ev.target.value;
    if (((_a = this.error) === null || _a === void 0 ? void 0 : _a.code) === 1)
      this.error = undefined;
  }
  handleSubmit() {
    const pollObject = {
      question: this.question.value,
      options: this.options,
      anonymous: this.anonymous,
      hideVotes: this.hideVotes,
    };
    if (!pollObject.question) {
      this.error = {
        code: 0,
        message: this.t('Question is required.'),
      };
      return;
    }
    if (this.options.filter((op) => op.trim() === '').length > 0) {
      this.error = {
        code: 1,
        message: this.t('Empty options not allowed.'),
      };
      return;
    }
    this.onCreate.emit(pollObject);
  }
  render() {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "create-poll" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, this.t('Poll Question')), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("textarea", { onInput: () => {
        if (this.error && this.error.code === 0)
          this.error = undefined;
      }, ref: (e) => (this.question = e), placeholder: this.t('What is your poll for?') }), this.options.map((item, index) => ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "option" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", { placeholder: this.t('Enter an option'), value: item, onInput: (event) => this.updateOption(event, index) }), index > 1 && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "icon", class: "auto remove-option", variant: "secondary", onClick: () => this.removeOption(index) }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.subtract })))))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { class: "add-option", variant: "secondary", onClick: () => this.addOption() }, this.t('Add an option')), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("label", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", { id: "anonymous", type: "checkbox", onChange: (e) => (this.anonymous = e.target.checked) }), this.t('Anonymous')), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("label", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", { id: "hideVotes", type: "checkbox", checked: true, onChange: (e) => (this.hideVotes = e.target.checked) }), this.t('Hide results before voting')), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "wide", onClick: () => this.handleSubmit() }, this.t('Create Poll')), this.error && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", { class: "error-text" }, this.error.message))));
  }
};
DytePoll.style = dytePollFormCss;




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

/***/ 67553:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ sanitizeLink),
/* harmony export */   "f": () => (/* binding */ formatName),
/* harmony export */   "h": () => (/* binding */ hasOnlyEmojis),
/* harmony export */   "s": () => (/* binding */ shorten)
/* harmony export */ });
/**
 * Shorten a string upto a maximum length of characters and add `...` as suffix if it exceeds the maximum length
 * @param str The The string you want to shorten
 * @param maxLength Maximum length of character
 * @returns Formatted shortedned string
 */
const shorten = (str, maxLength = 20) => {
  if (str == null)
    return '';
  if (str.length > maxLength) {
    return `${str.substring(0, maxLength)}...`;
  }
  return str;
};
/**
 * Checks if a given string consists of only emojis.
 *
 * However this classifies a string with numbers as emoji as well.
 * Which works in our favour for now in chat as it enlarges messages with just numbers.
 * @param str String on which to perform the check on
 * @returns A Boolean value which indicates if string consists of only emojis
 */
const hasOnlyEmojis = (str) => {
  const num = /^\d+$/;
  const re = /^\p{Emoji}+$/u;
  return re.test(str) && !num.test(str);
};
const sanitizeLink = (link) => {
  // TODO: needs more work
  if (link === null || link === void 0 ? void 0 : link.trim().toLowerCase().startsWith('javascript:')) {
    return 'https://dyte.io';
  }
  return link;
};
/**
 * Formats a given name and returns **Participant** for unnamed participants.
 * @param name Name of participant
 * @returns Name to use in the UI
 */
const formatName = (name) => {
  name = name === null || name === void 0 ? void 0 : name.trim();
  if (name === '')
    return 'Participant';
  return name;
};




/***/ }),

/***/ 76949:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "g": () => (/* binding */ getInitials)
/* harmony export */ });
const getInitials = (name) => {
  const [firstName, lastName] = name.split(' ');
  return firstName != null && lastName != null
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
};




/***/ })

};
;