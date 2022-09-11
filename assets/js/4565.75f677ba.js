"use strict";
exports.id = 4565;
exports.ids = [4565];
exports.modules = {

/***/ 64565:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_breakout_room_tile": () => (/* binding */ DyteBreakoutRoomView)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _index_96b0df1d_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72559);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var _commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(41969);





const dyteBreakoutRoomTileCss = ":host{display:flex;flex-direction:column;border-radius:var(--dyte-border-radius-sm, 4px);padding-left:var(--dyte-space-4, 16px);padding-right:var(--dyte-space-4, 16px);padding-top:var(--dyte-space-3, 12px);padding-bottom:var(--dyte-space-3, 12px);height:170px;border-style:solid;--tw-border-opacity:1;border-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}:host(:hover){--tw-border-opacity:1;border-color:rgba(var(--dyte-colors-brand-700, 2 70 253) / var(--tw-border-opacity))}:host(.current){--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-1000, 8 8 8) / var(--tw-bg-opacity))}.new-participant-text{font-size:14px;font-weight:400 !important;--tw-text-opacity:1;color:rgba(var(--dyte-colors-warning, 255 205 7) / var(--tw-text-opacity))}.current-room-text{font-size:14px;--tw-text-opacity:1;color:rgba(var(--dyte-colors-brand-300, 73 124 253) / var(--tw-text-opacity))}.header{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.header p{margin:var(--dyte-space-0, 0px);display:flex;flex-direction:row;align-items:center;padding:var(--dyte-space-0, 0px);font-size:14px;font-weight:500}.header p dyte-icon{height:var(--dyte-space-6, 24px)}.participant-list{margin-bottom:var(--dyte-space-2, 8px);display:grid;flex-grow:1;grid-template-columns:repeat(2, minmax(0, 1fr));overflow-y:auto;border-radius:var(--dyte-border-radius-sm, 4px)}.participant-list dyte-participant{margin-right:var(--dyte-space-2, 8px);flex-grow:1}.message{display:flex;flex-grow:1;align-items:center;justify-content:center;margin:var(--dyte-space-0, 0px);font-size:14px;color:rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52))}.participant-list::-webkit-scrollbar{width:var(--dyte-space-1\\.5, 6px)}.participant-list::-webkit-scrollbar-thumb{border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.participant-list::-webkit-scrollbar-track{border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.row{display:flex;flex-direction:row;align-items:center}.row dyte-icon{height:var(--dyte-space-4, 16px)}.footer{display:flex;flex-direction:row;align-items:center;justify-content:flex-end}.footer dyte-button{margin-left:var(--dyte-space-2, 8px)}.room-view{--tw-text-opacity:1;color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-text-opacity));border-style:solid;--tw-border-opacity:1;border-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / var(--tw-border-opacity))}";

const DyteBreakoutRoomView = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__.d;
    this.switchMeeting = async () => {
      var _a;
      if (!this.canSwitch())
        return;
      const options = {
        sourceMeetingId: this.meeting.meta.roomName,
        destinationMeetingId: (_a = this.room) === null || _a === void 0 ? void 0 : _a.id,
        participants: [this.meeting.self.userId],
      };
      await this.meeting.connectedMeetings.moveParticipants(options);
    };
    this.canSwitch = () => {
      var _a, _b;
      const permissions = (_a = this.meeting.self.permissions) === null || _a === void 0 ? void 0 : _a.connectedMeetings;
      return ((!this.isCurrent && !this.isParent && permissions.canSwitchConnectedMeetings) ||
        (!this.isCurrent &&
          this.isParent &&
          permissions.canSwitchToParentMeeting &&
          ((_b = this.meeting.connectedMeetings.parentMeeting) === null || _b === void 0 ? void 0 : _b.id) !== this.meetingId));
    };
  }
  meetingChanged(meeting) {
    this.meetingId = meeting.meta.roomName;
  }
  connectedCallback() {
    this.meetingChanged(this.meeting);
  }
  render() {
    var _a, _b, _c;
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, { class: { current: this.isCurrent } }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "header" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, this.isParent && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.web }), (_a = this.room) === null || _a === void 0 ? void 0 :
      _a.title), this.isCurrent && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", { class: "current-room-text" }, "Current Room")), ((_b = this.room) === null || _b === void 0 ? void 0 : _b.participants.length) > 0 ? ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "participant-list" }, (_c = this.room) === null || _c === void 0 ? void 0 : _c.participants.map((p) => {
      return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-participant", { view: "breakout-room-tile", participant: p }));
    }))) : ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", { class: "message" }, "Nobody here yet.")), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "footer" }, this.canSwitch() && (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { onClick: this.switchMeeting }, "Switch"))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteBreakoutRoomView.style = dyteBreakoutRoomTileCss;




/***/ })

};
;