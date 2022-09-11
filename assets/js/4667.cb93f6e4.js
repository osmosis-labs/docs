"use strict";
exports.id = 4667;
exports.ids = [4667];
exports.modules = {

/***/ 72729:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "d": () => (/* binding */ differenceInMinutes),
/* harmony export */   "e": () => (/* binding */ elapsedDuration),
/* harmony export */   "f": () => (/* binding */ formatDateTime)
/* harmony export */ });
const differenceInMinutes = (oldDate, newDate) => {
  // difference in milliseconds
  const diff = newDate.getTime() - oldDate.getTime();
  return Math.round(Math.abs(diff / 1000 / 60));
};
const elapsedDuration = (oldDate, newDate) => {
  const minutes = differenceInMinutes(oldDate, newDate);
  if (minutes < 2) {
    return 'just now';
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }
  const hours = Math.round(minutes / 60);
  if (minutes < 90) {
    return `about ${hours}h ago`;
  }
  if (hours < 24) {
    return `${hours}h ago`;
  }
  const days = Math.round(hours / 24);
  if (days < 7) {
    return `${days}d ago`;
  }
  const weeks = Math.round(days / 7);
  return `${weeks}w ago`;
};
const formatDateTime = (date) => {
  return date.toDateString() + ' ' + date.toLocaleTimeString();
};




/***/ }),

/***/ 4667:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_chat": () => (/* binding */ DyteChat)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var _date_8c24cfe1_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(72729);
/* harmony import */ var _scroll_555bfeb4_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24849);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(61070);
/* harmony import */ var _user_prefs_be1700cb_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58318);
/* harmony import */ var _graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(60804);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(55752);









const dyteChatCss = ".scrollbar{scrollbar-width:thin;scrollbar-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))\n    var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--dyte-space-1\\.5, 6px);width:var(--dyte-space-1\\.5, 6px);border-radius:9999px;background-color:var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))}:host{display:flex;height:100%;width:100%;flex-direction:column;font-family:var(--dyte-font-family, sans-serif);font-size:14px;color:rgb(var(--dyte-colors-text-1000, 255 255 255))}h3{margin:var(--dyte-space-0, 0px);display:flex;height:var(--dyte-space-12, 48px);align-items:center;justify-content:center;font-size:16px;font-weight:400;color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88));text-align:center}.chat-container{box-sizing:border-box;display:flex;flex-direction:column;padding-top:var(--dyte-space-4, 16px);padding-bottom:var(--dyte-space-4, 16px);flex:1 0 0px;overflow-y:scroll}.chat-container .spacer{flex:1 1 auto}.chat-container .chat{flex:0 0 auto}.chat-input{z-index:10;box-sizing:border-box;display:flex;flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));border-top:var(--dyte-border-width-sm, 1px) solid rgb(var(--dyte-colors-background-600, 60 60 60))}textarea{box-sizing:border-box;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));padding:var(--dyte-space-3, 12px);color:rgb(var(--dyte-colors-text-1000, 255 255 255))}textarea::-moz-placeholder{color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76))}textarea::placeholder{color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76))}textarea{outline:2px solid transparent;outline-offset:2px;resize:none;overflow-y:auto;border-width:var(--dyte-border-width-none, 0);border-style:none;font-family:var(--dyte-font-family, sans-serif);min-height:80px;font-size:14px}.chat-buttons{display:flex;align-items:center;justify-content:space-between;padding-left:var(--dyte-space-3, 12px);padding-right:var(--dyte-space-3, 12px);padding-top:var(--dyte-space-2, 8px);padding-bottom:var(--dyte-space-2, 8px)}.chat-buttons .left dyte-button{margin-right:var(--dyte-space-1, 4px)}.chat-buttons .left dyte-button dyte-icon{height:var(--dyte-space-5, 20px);width:var(--dyte-space-5, 20px)}.chat-buttons>div{display:flex;align-items:center}.file-picker{display:none}.chat *:first-child{margin-top:var(--dyte-space-0, 0px)}.chat .head{display:flex;align-items:center}.chat .head .name{margin-right:var(--dyte-space-4, 16px);font-size:12px;font-weight:700}.chat .head .time{font-size:12px;color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76))}.chat .body{margin-top:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-2, 8px);overflow-wrap:break-word;font-size:14px;line-height:1.25rem}.chat .body .emoji{font-size:24px}p{margin-top:var(--dyte-space-0, 0px);margin-bottom:var(--dyte-space-3, 12px)}dyte-text-message,dyte-image-message,dyte-file-message{margin-top:var(--dyte-space-4, 16px);display:block;padding-left:var(--dyte-space-3, 12px);padding-right:var(--dyte-space-3, 12px);font-family:var(--dyte-font-family, sans-serif);color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88));box-sizing:border-box}*[is-continued]{margin-top:var(--dyte-space-3, 12px)}dyte-text-message[is-continued]{margin-top:var(--dyte-space-2, 8px)}.chat .image{position:relative;height:var(--dyte-space-40, 160px);max-width:var(--dyte-space-64, 256px);cursor:pointer}.chat .image img{display:none;height:100%;width:100%;border-radius:var(--dyte-border-radius-sm, 4px);-o-object-fit:cover;object-fit:cover}.chat .image .image-spinner{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.chat .image .image-spinner dyte-spinner{--tw-text-opacity:1;color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-text-opacity))}.chat .image .image-errored{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--dyte-border-radius-sm, 4px);background-color:rgba(var(--dyte-colors-danger, 255 45 45) / 0.1);--tw-text-opacity:1;color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-text-opacity))}.chat .image .actions{display:none;height:var(--dyte-space-8, 32px);align-items:center;position:absolute;top:var(--dyte-space-2, 8px);right:var(--dyte-space-2, 8px);border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-1000, 255 255 255));overflow:hidden;--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.chat .image .actions .action{height:var(--dyte-space-8, 32px);width:var(--dyte-space-8, 32px);border-radius:var(--dyte-border-radius-none, 0);border-width:var(--dyte-border-width-none, 0);border-style:none;background-color:transparent;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.chat .image .actions .action:hover{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.image.loaded img{display:block}.image.loaded .image-spinner{display:none}.image:hover .actions,.image:focus .actions{display:flex}.chat .file{display:flex;align-items:center;padding-left:var(--dyte-space-2, 8px);padding-right:var(--dyte-space-2, 8px);padding-top:var(--dyte-space-1\\.5, 6px);padding-bottom:var(--dyte-space-1\\.5, 6px);border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}.chat .file .file-data{flex:1 1 0%}.chat .file .file-data .name{color:rgb(var(--dyte-colors-text-1000, 255 255 255))}.chat .file .file-data .file-data-split{margin-top:var(--dyte-space-0\\.5, 2px);display:flex;align-items:center;font-size:12px}.chat .file .file-data .file-data-split .ext{margin-right:var(--dyte-space-2, 8px);text-transform:uppercase}.chat .file .file-data .file-data-split .divider{height:var(--dyte-space-4, 16px);width:var(--dyte-space-0\\.5, 2px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.chat .file .file-data .file-data-split .size{margin-left:var(--dyte-space-2, 8px)}a{--tw-text-opacity:1;color:rgba(var(--dyte-colors-brand-300, 73 124 253) / var(--tw-text-opacity));-webkit-text-decoration-line:none;text-decoration-line:none}a:hover{-webkit-text-decoration-line:underline;text-decoration-line:underline}#dropzone{position:absolute;top:var(--dyte-space-0, 0px);right:var(--dyte-space-0, 0px);bottom:var(--dyte-space-0, 0px);left:var(--dyte-space-0, 0px);z-index:10;display:none;flex-direction:column;align-items:center;justify-content:center;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}#dropzone.active{display:flex;-webkit-animation:0.3s slide-up ease;animation:0.3s slide-up ease}@-webkit-keyframes slide-up{from{transform:translateY(100%)}to{transform:translateY(0%)}}@keyframes slide-up{from{transform:translateY(100%)}to{transform:translateY(0%)}}dyte-emoji-picker{z-index:0;border-top:var(--dyte-border-width-sm, 1px) solid rgb(var(--dyte-colors-background-600, 60 60 60));-webkit-animation:0.3s slide-up ease;animation:0.3s slide-up ease}";

const DyteChat = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_1__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_2__.u)();
    this.chat = [];
    this.now = new Date();
    this.autoScrollEnabled = false;
    this.dropzoneActivated = false;
    this.canSend = false;
    this.canSendTextMessage = false;
    this.canSendFiles = false;
    this.emojiPickerEnabled = false;
    this.disconnectMeeting = (meeting) => {
      this.timeout && clearTimeout(this.timeout);
      typeof this.request === 'number' && cancelAnimationFrame(this.request);
      this.chatUpdateListener && (meeting === null || meeting === void 0 ? void 0 : meeting.chat.removeListener('chatUpdate', this.chatUpdateListener));
    };
    this.handleKeyDown = (e) => {
      // slack like typing experience
      if (e.key === 'Enter' && e.shiftKey) {
        const height = this.textArea.clientHeight;
        if (height < 200) {
          this.textArea.style.height = this.textArea.clientHeight + 20 + 'px';
        }
      }
      else if (e.key === 'Enter') {
        e.preventDefault();
        this.handleSendMessage();
      }
      else if (e.key === 'Backspace') {
        if (this.textArea.value.endsWith('\n')) {
          this.textArea.style.height = this.textArea.clientHeight - 20 + 'px';
        }
        else if (this.textArea.value === '') {
          this.textArea.style.height = 'auto';
        }
      }
    };
    this.toggleEmojiPicker = () => {
      this.emojiPickerEnabled = !this.emojiPickerEnabled;
    };
    this.persistTextMessage = (e) => {
      const message = e.target.value;
      _graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_4__.g.setItem('dyte-text-message', message);
    };
    this.initialiseTextField = (el) => {
      this.textArea = el;
      const message = _graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_4__.g.getItem('dyte-text-message') || '';
      this.textArea.value = message;
    };
    this.onEmojiClicked = (e) => {
      this.textArea.value = this.textArea.value + e.detail;
      this.textArea.focus();
    };
    this.onPaste = (e) => {
      const data = e.clipboardData || e.originalEvent.clipboardData;
      this.handleFilesDataTransfer(data.items);
    };
  }
  connectedCallback() {
    this.meetingChanged(this.meeting);
    const prefs = (0,_user_prefs_be1700cb_js__WEBPACK_IMPORTED_MODULE_3__.g)();
    this.autoScrollEnabled = prefs.autoScroll;
    this.host.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.dropzoneActivated = true;
    });
    this.host.addEventListener('dragleave', () => {
      this.dropzoneActivated = false;
    });
    this.host.addEventListener('drop', (e) => {
      e.preventDefault();
      this.dropzoneActivated = false;
      this.handleFilesDataTransfer(e.dataTransfer.items);
    });
  }
  componentDidRender() {
    if (this.autoScrollEnabled) {
      (0,_scroll_555bfeb4_js__WEBPACK_IMPORTED_MODULE_6__.s)(this.chatEl);
    }
  }
  disconnectedCallback() {
    this.disconnectMeeting(this.meeting);
  }
  meetingChanged(meeting, oldMeeting) {
    if (oldMeeting != undefined)
      this.disconnectMeeting(oldMeeting);
    if (meeting != null) {
      this.canSend = meeting.self.permissions.chatPublic.canSend;
      this.canSendTextMessage = meeting.self.permissions.chatPublic.text;
      this.canSendFiles = meeting.self.permissions.chatPublic.files;
      this.chat = meeting.chat.messages.map((message) => ({ type: 'chat', message }));
      this.chatUpdateListener = ({ message }) => {
        if (message != null) {
          this.chat = [...this.chat, { type: 'chat', message }];
        }
      };
      // update current time every minute
      const updateNow = () => {
        this.now = new Date();
        this.timeout = setTimeout(() => {
          if (this.request != null) {
            this.request = requestAnimationFrame(updateNow);
          }
        }, 60 * 1000);
      };
      this.request = requestAnimationFrame(updateNow);
      meeting.chat.addListener('chatUpdate', this.chatUpdateListener);
    }
  }
  handleSendMessage() {
    var _a;
    if (!this.canSend || !this.canSendTextMessage) {
      return;
    }
    const message = this.textArea.value.trim();
    if (message.length > 0) {
      (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.chat.sendTextMessage(message);
      this.textArea.value = '';
      this.textArea.style.height = 'auto';
      _graceful_storage_33bc316d_js__WEBPACK_IMPORTED_MODULE_4__.g.setItem('dyte-text-message', '');
    }
  }
  uploadFile(type) {
    const input = document.createElement('input');
    input.type = 'file';
    if (type === 'image') {
      input.accept = 'image/*';
    }
    input.onchange = (e) => {
      const { validity, files: [file], } = e.target;
      if (validity.valid) {
        this.sendFile(file, type);
      }
    };
    input.click();
  }
  handleFilesDataTransfer(items) {
    if (items == null)
      return;
    for (const item of items) {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (item.type.startsWith('image/')) {
          this.sendFile(file, 'image');
        }
        else {
          this.sendFile(file, 'file');
        }
      }
    }
  }
  sendFile(file, type) {
    var _a, _b;
    if (!this.canSend || !this.canSendFiles) {
      return;
    }
    if (type === 'image') {
      (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.chat.sendImageMessage(file);
    }
    else {
      (_b = this.meeting) === null || _b === void 0 ? void 0 : _b.chat.sendFileMessage(file);
    }
  }
  toggleAutoScroll(scrollState) {
    this.autoScrollEnabled = scrollState;
    (0,_user_prefs_be1700cb_js__WEBPACK_IMPORTED_MODULE_3__.s)('auto-scroll', scrollState);
  }
  render() {
    let prevMessage = null;
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { id: "dropzone", class: { active: this.dropzoneActivated }, part: "dropzone" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.attach }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, this.t('Drop files/images to send'))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "chat-container scrollbar", ref: (el) => (this.chatEl = el), part: "container" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "spacer", part: "spacer" }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "chat", part: "chat" }, this.chat.map((item) => {
      if (item.type === 'chat') {
        const { message } = item;
        const isContinued = message.userId === (prevMessage === null || prevMessage === void 0 ? void 0 : prevMessage.userId) &&
          (0,_date_8c24cfe1_js__WEBPACK_IMPORTED_MODULE_7__.d)(message.time, prevMessage === null || prevMessage === void 0 ? void 0 : prevMessage.time) < 2;
        prevMessage = message;
        switch (message.type) {
          case 'text':
            return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-text-message", { message: message, now: this.now, isContinued: isContinued }));
          case 'image':
            return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-image-message", { message: message, now: this.now, isContinued: isContinued, iconPack: this.iconPack }));
          case 'file':
            return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-file-message", { message: message, now: this.now, isContinued: isContinued, iconPack: this.iconPack }));
        }
      }
    }))), this.canSend && this.canSendTextMessage && this.emojiPickerEnabled && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-emoji-picker", { t: this.t, onDyteEmojiClicked: this.onEmojiClicked, part: "emoji-picker" })), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("form", { class: "chat-input", part: "chat-input" }, this.canSend && this.canSendTextMessage && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("textarea", { placeholder: "Message..", ref: this.initialiseTextField, onKeyDown: this.handleKeyDown, onInput: this.persistTextMessage, autoFocus: true, onPaste: this.onPaste, part: "textarea", class: "scrollbar" })), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "chat-buttons", part: "chat-buttons" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "left", part: "chat-buttons-left" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { size: this.size, label: this.t(this.autoScrollEnabled ? 'Autoscroll enabled' : 'Autoscroll disabled') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "ghost", kind: "icon", onClick: () => this.toggleAutoScroll(!this.autoScrollEnabled), title: this.t(this.autoScrollEnabled ? 'Autoscroll enabled' : 'Autoscroll disabled') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.autoScrollEnabled
        ? this.iconPack.vertical_scroll
        : this.iconPack.vertical_scroll_disabled }))), this.canSend &&
      this.canSendFiles && [
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: this.t('Send a file'), size: this.size }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "ghost", kind: "icon", onClick: () => this.uploadFile('file'), title: this.t('Send a file') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.attach }))),
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: this.t('Send an image'), size: this.size }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "ghost", kind: "icon", onClick: () => this.uploadFile('image'), title: this.t('Send an image') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.image }))),
    ], this.canSend && this.canSendTextMessage && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: this.t('Send Emoji'), size: this.size }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "ghost", kind: "icon", class: { active: this.emojiPickerEnabled }, title: this.t('Send Emoji'), onClick: this.toggleEmojiPicker }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.emoji_multiple }))))), this.canSend && this.canSendTextMessage && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "right", part: "chat-buttons-right" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { variant: "primary", label: this.t('Send message'), size: this.size, delay: 2000 }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "icon", onClick: () => this.handleSendMessage(), title: this.t('Send message') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.send })))))))));
  }
  get host() { return (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.g)(this); }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteChat.style = dyteChatCss;




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

/***/ 24849:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ smoothScrollToBottom)
/* harmony export */ });
/**
 * Scroll to bottom of an element.
 *
 * Works in all browsers - just that in Safari, the smooth scrolling doesn't work.
 * @param el The bottom of which element you want to scroll down to
 */
const smoothScrollToBottom = (el) => {
  if (el == null)
    return;
  el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
};




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