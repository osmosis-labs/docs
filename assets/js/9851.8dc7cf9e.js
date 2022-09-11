"use strict";
exports.id = 9851;
exports.ids = [9851];
exports.modules = {

/***/ 79851:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_breakout_room_manager": () => (/* binding */ DyteBreakoutRoomSelector),
/* harmony export */   "dyte_counter": () => (/* binding */ DyteCounter),
/* harmony export */   "dyte_participants": () => (/* binding */ DyteParticipants)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61070);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var _index_96b0df1d_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72559);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(55752);
/* harmony import */ var _commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(41969);







const dyteBreakoutRoomManagerCss = ".selector-mode,.assign-mode{position:relative;display:flex;flex-direction:column;align-items:center;margin-left:var(--dyte-space-2, 8px);margin-right:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-2, 8px);cursor:pointer;padding-left:var(--dyte-space-2, 8px);padding-right:var(--dyte-space-2, 8px);border-radius:var(--dyte-border-radius-sm, 4px);border-style:solid;border-color:#4c4c4c;max-height:120px !important;min-height:120px !important}.selector:hover{--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.show-on-hover{display:none}.header{margin-top:var(--dyte-space-1, 4px);display:flex;width:100%;flex-direction:row;align-items:center}.header dyte-icon{margin-left:var(--dyte-space-2, 8px);margin-right:var(--dyte-space-2, 8px);height:var(--dyte-space-5, 20px);cursor:pointer}.header .danger{--tw-text-opacity:1;color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-text-opacity))}.header .hide{display:none}.header div{display:flex;flex-grow:1;flex-direction:row;align-items:center;justify-content:flex-end}.header input{border-radius:var(--dyte-border-radius-sm, 4px);border-width:var(--dyte-border-width-none, 0);border-style:none;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));padding:var(--dyte-space-1, 4px);color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88));outline:2px solid transparent;outline-offset:2px}.header input:disabled{overflow-x:visible;border-radius:var(--dyte-border-radius-none, 0);border-width:var(--dyte-border-width-none, 0);border-style:none;background-color:transparent;padding:var(--dyte-space-0, 0px);font-size:14px;font-weight:700;color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76));max-width:60px}.participant-list{display:grid;flex-grow:1;grid-template-columns:repeat(2, minmax(0, 1fr));gap:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-2, 8px);width:100%;overflow-y:auto;border-radius:var(--dyte-border-radius-sm, 4px)}.participant-list::-webkit-scrollbar{width:var(--dyte-space-1\\.5, 6px)}.participant-list::-webkit-scrollbar-thumb{border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.participant-list::-webkit-scrollbar-track{border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.participant-item{margin-right:var(--dyte-space-2, 8px);height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;flex-grow:1;padding-left:var(--dyte-space-2, 8px);padding-right:var(--dyte-space-2, 8px)}.participant-item:hover{border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.selector-mode:hover .show-on-hover{display:flex}.message-container{position:absolute;margin:var(--dyte-space-0, 0px);display:flex;width:100%;padding:var(--dyte-space-0, 0px);top:30%;height:65%;bottom:5%}p{margin-left:var(--dyte-space-2, 8px);margin-right:var(--dyte-space-2, 8px);margin-top:var(--dyte-space-0, 0px);margin-bottom:var(--dyte-space-0, 0px);display:flex;flex-grow:1;align-items:center;justify-content:center;border-radius:var(--dyte-border-radius-sm, 4px);font-size:12px;color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64));border-style:dashed;--tw-border-opacity:1;border-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-border-opacity))}.selector-mode:hover p{border-color:#4c4c4c}.assign-mode:hover p{border-color:rgba(var(--dyte-colors-brand-600, 13 81 253) / 0.5);background-color:rgba(var(--dyte-colors-brand-500, 33 96 253) / 0.4)}.assign-mode p{-webkit-backdrop-filter:blur(12px) saturate(180%);backdrop-filter:blur(12px) saturate(180%)}";

const DyteBreakoutRoomSelector = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    this.onParticipantDelete = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "participantDelete", 7);
    this.onParticipantsAdd = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "participantsAdd", 7);
    this.deleteRoom = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "delete", 7);
    this.updateRoom = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "update", 7);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_1__.u)();
    this.getPeer = (id) => {
      var _a;
      return (_a = this.meeting.connectedMeetings.parentMeeting) === null || _a === void 0 ? void 0 : _a.participants.find((p) => p.clientSpecificId === id);
    };
  }
  render() {
    var _a, _b, _c, _d, _e;
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: this.assigningParticipants ? 'assign-mode' : 'selector-mode' }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "header" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", { placeholder: "Room Name", disabled: !this.room.isTitleEditorOpen, value: (_b = (_a = this.room) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : `Room ${this.room.id + 1}`, onChange: (e) => {
        this.meeting.connectedMeetings.stateManager.renameConnectedMeeting(this.room.id, e.target.value);
      } }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: this.t('Edit Room Name') }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: !this.room.isTitleEditorOpen ? this.iconPack.edit : this.iconPack.checkmark, class: "show-on-hover", onClick: () => {
        this.room.isTitleEditorOpen
          ? this.meeting.connectedMeetings.stateManager.closeTitleEditorForConnectedMeeting(this.room.id)
          : this.meeting.connectedMeetings.stateManager.openTitleEditorForConnectedMeeting(this.room.id);
      } })), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: this.t('Delete Room'), class: "danger" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.delete, class: "show-on-hover", onClick: () => {
        this.meeting.connectedMeetings.stateManager.deleteConnectedMeetings([
          this.room.id,
        ]);
      } })), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.participants }), (_e = (_d = (_c = this.room) === null || _c === void 0 ? void 0 : _c.participants) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : '0')), this.room.participants.length > 0 && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "participant-list", onClick: () => {
        this.onParticipantsAdd.emit();
      } }, this.room.participants.map((item) => ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "participant-item" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-participant", { role: "listitem", key: item.id, meeting: this.meeting, participant: this.getPeer(item.clientSpecificId), view: "breakout-room-manager", onParticipantDelete: () => {
        this.meeting.connectedMeetings.stateManager.unassignParticipants([
          item.clientSpecificId,
        ]);
      } })))))), (this.assigningParticipants || this.room.participants.length < 1) && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "message-container" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", { onClick: () => {
        this.onParticipantsAdd.emit();
      } }, this.assigningParticipants
      ? 'Click here to assign'
      : 'No participants assigned yet.'))))));
  }
};
DyteBreakoutRoomSelector.style = dyteBreakoutRoomManagerCss;

const dyteCounterCss = ":host{display:flex;flex-direction:row;align-items:center;justify-content:center;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity));width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;border-radius:var(--dyte-border-radius-sm, 4px);padding:var(--dyte-space-1, 4px)}p{margin:var(--dyte-space-0, 0px);padding-left:var(--dyte-space-2, 8px);padding-right:var(--dyte-space-2, 8px)}input{margin:var(--dyte-space-0, 0px);width:var(--dyte-space-6, 24px);padding:var(--dyte-space-2, 8px);border-width:var(--dyte-border-width-sm, 1px);border-style:solid;border-color:rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52));--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));text-align:center;color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88));border-radius:var(--dyte-border-radius-sm, 4px);font-size:14px;outline:2px solid transparent;outline-offset:2px;transition-property:color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{margin:var(--dyte-space-0, 0px);appearance:none;-webkit-appearance:none}";

const DyteCounter = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.onChange = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "valueChange", 7);
    /** Input */
    this.input = '1';
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__.d;
  }
  connectedCallback() {
    this.watchStateHandler(this.input);
    this.input = this.value.toString();
  }
  watchStateHandler(input) {
    this.onChange.emit(input);
  }
  increment() {
    this.input = Math.max(parseInt(this.input) + 1, 0).toString();
  }
  decrement() {
    this.input = Math.max(0, parseInt(this.input) - 1).toString();
  }
  render() {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "icon", variant: "ghost", onClick: () => this.decrement() }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.subtract })), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", { type: "number", value: this.input, onInput: (e) => {
        this.input = e.target.value;
      } }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "icon", variant: "ghost", onClick: () => this.increment() }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.add }))));
  }
  static get watchers() { return {
    "input": ["watchStateHandler"]
  }; }
};
DyteCounter.style = dyteCounterCss;

const dyteParticipantsCss = ".scrollbar{scrollbar-width:thin;scrollbar-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))\n    var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--dyte-space-1\\.5, 6px);width:var(--dyte-space-1\\.5, 6px);border-radius:9999px;background-color:var(--dyte-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--dyte-scrollbar-color, rgb(var(--dyte-colors-background-600, 60 60 60)))}:host{margin-top:var(--dyte-space-2, 8px);display:flex;height:100%;width:100%;flex-direction:column;font-family:var(--dyte-font-family, sans-serif);font-size:14px}input{font-family:var(--dyte-font-family, sans-serif)}*{box-sizing:border-box}h3,.heading-count{margin:var(--dyte-space-0, 0px);display:flex;height:var(--dyte-space-12, 48px);align-items:center;justify-content:center;font-size:16px;font-weight:400;color:rgb(var(--dyte-colors-text-900, 255 255 255 / 0.88));text-align:center}.ctr{margin-top:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-2, 8px);box-sizing:border-box;padding-left:var(--dyte-space-3, 12px);padding-right:var(--dyte-space-3, 12px);padding-top:var(--dyte-space-0, 0px);padding-bottom:var(--dyte-space-0, 0px);overflow-y:auto;flex-grow:1;flex-basis:0}.search{position:-webkit-sticky;position:sticky;box-sizing:border-box;display:flex;align-items:center;border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));margin-left:var(--dyte-space-3, 12px);margin-right:var(--dyte-space-3, 12px);margin-top:var(--dyte-space-0, 0px);margin-bottom:var(--dyte-space-0, 0px)}.search dyte-icon{margin-left:var(--dyte-space-2, 8px);margin-right:var(--dyte-space-2, 8px);height:var(--dyte-space-5, 20px);width:var(--dyte-space-5, 20px);color:rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52))}.search input{box-sizing:border-box;height:var(--dyte-space-9, 36px);width:100%;padding-right:var(--dyte-space-2, 8px);border-width:var(--dyte-border-width-none, 0);border-style:none;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--dyte-colors-text-1000, 255 255 255));outline:2px solid transparent;outline-offset:2px;border-radius:var(--dyte-border-radius-sm, 4px);font-size:14px}.search input::-moz-placeholder{color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76))}.search input::placeholder{color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76))}.participants{margin-top:var(--dyte-space-2, 8px);padding:var(--dyte-space-0, 0px)}.heading-count{font-size:14px}.empty-message{margin-top:var(--dyte-space-10, 40px);margin-bottom:var(--dyte-space-10, 40px);text-align:center;font-size:14px;color:rgb(var(--dyte-colors-text-700, 255 255 255 / 0.64))}.waiting-participants .accept-all-button{margin-bottom:var(--dyte-space-6, 24px);--tw-text-opacity:1;color:rgba(var(--dyte-colors-success, 98 165 4) / var(--tw-text-opacity))}.waiting-participant{display:flex;align-items:center;color:rgb(var(--dyte-colors-text-on-brand-1000, var(--dyte-colors-text-1000, 255 255 255)))}.waiting-participant .participant-details{margin-right:auto;display:flex;align-items:center}.waiting-participant .participant-details dyte-avatar{margin-right:var(--dyte-space-2, 8px);height:var(--dyte-space-8, 32px);width:var(--dyte-space-8, 32px);flex-shrink:0;font-size:14px}.waiting-participant .participant-details .name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@media (min-width: 1080px){.waiting-participant .participant-details .name{max-width:var(--dyte-space-40, 160px)}}.waiting-participant .waitlist-controls{display:flex}.waiting-participant .waitlist-controls dyte-button{margin-left:var(--dyte-space-2, 8px);cursor:pointer;border-radius:var(--dyte-border-radius-sm, 4px)}.waiting-participant .waitlist-controls dyte-icon.accept{--tw-text-opacity:1;color:rgba(var(--dyte-colors-success, 98 165 4) / var(--tw-text-opacity))}.waiting-participant .waitlist-controls dyte-icon.deny{--tw-text-opacity:1;color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-text-opacity))}";

const DyteParticipants = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.onSelectedParticipantUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "selectedParticipantUpdate", 7);
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__.d;
    /** View mode for participants list */
    this.view = 'sidebar';
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_1__.u)();
    /** unassigned Participants */
    this.unassignedParticipants = [];
    this.search = '';
    this.participants = [];
    this.waitlistedParticipants = [];
    this.stageRequestedParticipants = [];
    this.updateStageRequestedParticipants = () => {
      this.stageRequestedParticipants = this.meeting.participants.joined
        .toArray()
        .filter((p) => p.webinarStageStatus === 'REQUESTED_TO_JOIN_STAGE');
    };
    this.onSearchInput = (e) => {
      this.search = e.target.value;
    };
    this.acceptWaitingRoomRequest = async (id) => {
      await this.meeting.participants.acceptWaitingRoomRequest(id);
      this.updateStageRequestedParticipants();
    };
    this.acceptStageRequest = async (id) => {
      const participant = this.meeting.participants.joined.get(id);
      if (participant !== undefined)
        await participant.acceptJoinStageRequest();
      this.updateStageRequestedParticipants();
    };
    this.rejectStageRequest = async (id) => {
      const participant = this.meeting.participants.joined.get(id);
      if (participant !== undefined)
        await participant.rejectRequestToJoinStage();
      this.updateStageRequestedParticipants();
    };
    this.acceptAllStageRequest = async () => {
      const payload = this.meeting.participants.joined
        .toArray()
        .filter((p) => p.webinarStageStatus === 'REQUESTED_TO_JOIN_STAGE')
        .map((p) => ({
        id: p.id,
        requestToJoinType: 'REQUEST_TO_PRESENT',
      }));
      await this.meeting.participants.acceptAllRequestToJoinStageRequests(payload);
      this.updateStageRequestedParticipants();
    };
    this.acceptAllWaitingRoomRequests = async () => {
      const requestPromises = this.waitlistedParticipants.map((participant) => this.meeting.participants.acceptWaitingRoomRequest(participant.id));
      await Promise.all(requestPromises);
    };
    this.rejectWaitingRoomRequest = async (id) => {
      await this.meeting.participants.rejectWaitingRoomRequest(id);
    };
    this.shouldShowWaitlist = () => {
      return (this.meeting.self.permissions.acceptWaitingRequests &&
        this.waitlistedParticipants.length !== 0);
    };
    this.shouldShowWebinarPresentRequest = () => {
      return (this.meeting.self.permissions.acceptPresentRequests &&
        this.stageRequestedParticipants.length > 0);
    };
  }
  connectedCallback() {
    this.meetingChanged(this.meeting);
  }
  disconnectedCallback() {
    if (this.meeting == null)
      return;
    this.participantJoinedListener &&
      this.meeting.participants.joined.removeListener('participantJoined', this.participantJoinedListener);
    this.participantLeftListener &&
      this.meeting.participants.joined.removeListener('participantLeft', this.participantLeftListener);
    this.waitlistedParticipantJoinedListener &&
      this.meeting.participants.waitlisted.removeListener('participantJoined', this.waitlistedParticipantJoinedListener);
    this.waitlistedParticipantLeftListener &&
      this.meeting.participants.waitlisted.removeListener('participantLeft', this.waitlistedParticipantLeftListener);
    this.peerRequestToJoinStateListener &&
      this.meeting.participants.joined.removeListener('peerRequestToJoinStage', this.peerRequestToJoinStateListener);
    this.peerAcceptedToJoinStageListener &&
      this.meeting.participants.joined.removeListener('peerAcceptedToJoinStage', this.peerAcceptedToJoinStageListener);
    this.peerRejectedToJoinStageListener &&
      this.meeting.participants.joined.removeListener('peerRejectedToJoinStage', this.peerRejectedToJoinStageListener);
  }
  meetingChanged(meeting) {
    if (meeting == null)
      return;
    this.participants = [meeting.self, ...meeting.participants.joined.toArray()];
    this.participantJoinedListener = (participant) => {
      if (!this.participants.some((p) => p.id === participant.id)) {
        this.participants = [...this.participants, participant];
      }
    };
    this.participantLeftListener = (participant) => {
      this.participants = this.participants.filter((p) => p.id !== participant.id);
      this.stageRequestedParticipants = this.stageRequestedParticipants.filter((p) => p.id !== participant.id);
    };
    this.waitlistedParticipants = meeting.participants.waitlisted.toArray();
    this.waitlistedParticipantJoinedListener = (participant) => {
      if (!this.waitlistedParticipants.some((p) => p.id === participant.id)) {
        this.waitlistedParticipants = [...this.waitlistedParticipants, participant];
      }
    };
    this.waitlistedParticipantLeftListener = (participant) => {
      this.waitlistedParticipants = this.waitlistedParticipants.filter((p) => p.id !== participant.id);
    };
    this.peerRequestToJoinStateListener = ({ id }) => {
      // Dedupe
      this.stageRequestedParticipants = this.stageRequestedParticipants.filter((p) => p.id != id);
      const participant = meeting.participants.joined.get(id);
      if (participant !== undefined)
        this.stageRequestedParticipants.push(participant);
    };
    this.peerAcceptedToJoinStageListener = ({ id }) => {
      this.stageRequestedParticipants = this.stageRequestedParticipants.filter((p) => p.id != id);
    };
    this.peerRejectedToJoinStageListener = ({ id }) => {
      this.stageRequestedParticipants = this.stageRequestedParticipants.filter((p) => p.id != id);
    };
    this.stageRequestedParticipants = this.participants.filter((p) => p.webinarStageStatus === 'REQUESTED_TO_JOIN_STAGE');
    meeting.participants.joined.addListener('participantJoined', this.participantJoinedListener);
    meeting.participants.joined.addListener('participantLeft', this.participantLeftListener);
    meeting.participants.waitlisted.addListener('participantJoined', this.waitlistedParticipantJoinedListener);
    meeting.participants.waitlisted.addListener('participantLeft', this.waitlistedParticipantLeftListener);
    meeting.participants.joined.addListener('peerRequestToJoinStage', this.peerRequestToJoinStateListener);
    meeting.participants.joined.addListener('peerAcceptedToJoinStage', this.peerAcceptedToJoinStageListener);
    meeting.participants.joined.addListener('peerRejectedToJoinStage', this.peerRejectedToJoinStageListener);
  }
  getParticipants() {
    const search = this.search.trim();
    if (this.view === 'breakout-rooms-manager') {
      const participants = this.meeting.connectedMeetings.stateManager.getUnassignedParticipants();
      if (search === '') {
        return participants;
      }
      return participants.filter((p) => { var _a; return ((_a = p.name) !== null && _a !== void 0 ? _a : p.id).toLowerCase().includes(search.toLowerCase()); });
    }
    if (search === '') {
      return this.participants;
    }
    return this.participants.filter((p) => { var _a; return ((_a = p.name) !== null && _a !== void 0 ? _a : p.id).toLowerCase().includes(search.toLowerCase()); });
  }
  render() {
    let participants = this.getParticipants();
    const showWaitlist = this.shouldShowWaitlist();
    const showPresentRequest = this.shouldShowWebinarPresentRequest();
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, this.view === 'sidebar' && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "heading-count", part: "heading-count" }, this.t('In Call'), " (", this.participants.length, ")")), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "search", part: "search" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.search, part: "search-icon" }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", { type: "search", autocomplete: "off", placeholder: "Search", onInput: this.onSearchInput, part: "search-input" })), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "ctr scrollbar", part: "container" }, this.view === 'sidebar' && showPresentRequest && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "waiting-participants" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "heading-count", part: "waitlisted-heading-count" }, this.t('stage_request.header_title'), " (", this.stageRequestedParticipants.length, ")"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("ul", { class: "participants", part: "waitlisted-participants" }, this.stageRequestedParticipants.map((participant) => ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("li", { class: "waiting-participant", key: participant.id }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "participant-details" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-avatar", { participant: participant, size: "sm" }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", { class: "name", title: participant.name }, participant.name)), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "waitlist-controls" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: this.t('stage_request.deny_request'), variant: "secondary" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "secondary", kind: "icon", onClick: () => this.rejectStageRequest(participant.id) }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { class: "deny", icon: this.iconPack.dismiss }))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: this.t('stage_request.accept_request'), variant: "secondary" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "secondary", kind: "icon", onClick: () => this.acceptStageRequest(participant.id) }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { class: "accept", icon: this.iconPack.checkmark })))))))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { class: "accept-all-button", variant: "secondary", kind: "wide", onClick: this.acceptAllStageRequest }, this.t('stage_request.accept_all')))), this.view === 'sidebar' && showWaitlist && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "waiting-participants" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "heading-count", part: "waitlisted-heading-count" }, this.t('waitlist.header_title'), " (", this.waitlistedParticipants.length, ")"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("ul", { class: "participants", part: "waitlisted-participants" }, this.waitlistedParticipants.map((participant) => ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("li", { class: "waiting-participant", key: participant.id }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "participant-details" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-avatar", { participant: participant, size: "sm" }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", { class: "name", title: participant.name }, participant.name)), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "waitlist-controls" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: this.t('waitlist.deny_request'), variant: "secondary" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "secondary", kind: "icon", onClick: () => this.rejectWaitingRoomRequest(participant.id) }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { class: "deny", icon: this.iconPack.dismiss }))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-tooltip", { label: this.t('waitlist.accept_request'), variant: "secondary" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { variant: "secondary", kind: "icon", onClick: () => this.acceptWaitingRoomRequest(participant.id) }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { class: "accept", icon: this.iconPack.checkmark })))))))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { class: "accept-all-button", variant: "secondary", kind: "wide", onClick: this.acceptAllWaitingRoomRequests }, this.t('waitlist.accept_all')))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("ul", { class: "participants", part: "participants" }, participants.map((participant) => ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-participant", { role: "listitem", key: participant.id, meeting: this.meeting, participant: participant, view: this.view }))), participants.length === 0 && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "empty-message", part: "empty-message" }, this.search.length > 0
      ? this.t('Participant with specified name not found.')
      : this.t('It looks like nobody is here.')))))));
  }
  static get watchers() { return {
    "meeting": ["meetingChanged"]
  }; }
};
DyteParticipants.style = dyteParticipantsCss;




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