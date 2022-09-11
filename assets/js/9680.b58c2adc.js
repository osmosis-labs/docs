"use strict";
exports.id = 9680;
exports.ids = [9680];
exports.modules = {

/***/ 69680:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_breakout_rooms_manager": () => (/* binding */ DyteBreakoutRoomsModal)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61070);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79781);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(55752);






const dyteBreakoutRoomsManagerCss = ".room-config{display:flex;flex-grow:1;flex-direction:column;overflow:hidden;border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity));width:500px;height:400px;max-width:100%;max-height:100%}header{display:flex;align-items:center;justify-content:center;width:100%;padding:var(--dyte-space-4, 16px);font-size:20px;font-weight:600}.create-room{display:flex;flex-grow:1;flex-direction:column;justify-content:flex-start;vertical-align:top;width:100%;padding-top:var(--dyte-space-2, 8px);padding-bottom:var(--dyte-space-2, 8px);padding-left:var(--dyte-space-4, 16px);padding-right:var(--dyte-space-4, 16px);min-height:20px}.create-room p{margin:var(--dyte-space-0, 0px);margin-bottom:var(--dyte-space-1, 4px);font-size:12px;color:rgb(var(--dyte-colors-text-600, 255 255 255 / 0.52))}footer{display:flex;flex-direction:row;vertical-align:middle;justify-content:flex-end;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity));padding:var(--dyte-space-4, 16px)}label{margin-bottom:var(--dyte-space-3, 12px);font-weight:400;color:rgb(var(--dyte-colors-text-1000, 255 255 255));opacity:0.4}.participant-config{display:flex;flex-grow:1;flex-direction:row;overflow:hidden;border-radius:var(--dyte-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));width:700px;height:400px;max-width:100%;max-height:100%}aside{box-sizing:border-box;display:flex;min-width:var(--dyte-space-56, 224px);flex-grow:1;flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-900, 26 26 26) / var(--tw-bg-opacity))}aside header{width:100%;padding-left:var(--dyte-space-0, 0px);padding-right:var(--dyte-space-0, 0px);padding-top:var(--dyte-space-4, 16px);font-size:14px}aside .assign-participants{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;padding:var(--dyte-space-4, 16px);background:#252525}aside .assign-participants .row-button{display:flex;cursor:pointer;flex-direction:row;align-items:center}aside .assign-participants .row-button dyte-icon{height:var(--dyte-space-6, 24px);padding-right:var(--dyte-space-2, 8px)}.assign-rooms{display:flex;width:100%;flex-direction:column}.assign-rooms .disabled{opacity:0.2}.assign-rooms .back{display:flex;cursor:pointer;flex-direction:row;align-items:center;justify-content:flex-start;padding:var(--dyte-space-4, 16px);padding-bottom:var(--dyte-space-0, 0px);font-size:14px;color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76))}.assign-rooms .back dyte-icon{height:var(--dyte-space-5, 20px)}.assign-rooms .row{margin-left:var(--dyte-space-4, 16px);margin-right:var(--dyte-space-4, 16px);margin-top:var(--dyte-space-4, 16px);margin-bottom:var(--dyte-space-4, 16px);display:flex;flex-direction:row;align-items:center;justify-content:space-between;font-size:14px}.assign-rooms .assign-text{margin-left:var(--dyte-space-4, 16px);margin-right:var(--dyte-space-4, 16px);margin-top:var(--dyte-space-4, 16px);margin-bottom:var(--dyte-space-4, 16px);padding-top:var(--dyte-space-1, 4px);padding-bottom:var(--dyte-space-1, 4px);font-size:14px;--tw-text-opacity:1;color:rgba(var(--dyte-colors-brand-400, 53 110 253) / var(--tw-text-opacity))}.assign-rooms .cta-buttons{display:flex;flex-direction:row;align-items:center;justify-content:center}.assign-rooms .cta-buttons dyte-button div{display:flex;flex-direction:row;align-items:center}.assign-rooms .cta-buttons dyte-button div dyte-icon{height:var(--dyte-space-4, 16px)}.assign-rooms .cta-buttons dyte-button:nth-child(1){--tw-text-opacity:1;color:rgba(var(--dyte-colors-brand-300, 73 124 253) / var(--tw-text-opacity))}.assign-rooms .cta-buttons dyte-button:nth-child(2){--tw-text-opacity:1;color:rgba(var(--dyte-colors-danger, 255 45 45) / var(--tw-text-opacity))}.assign-rooms .rooms{margin-left:var(--dyte-space-2, 8px);margin-right:var(--dyte-space-2, 8px);margin-bottom:var(--dyte-space-2, 8px);display:flex;flex-grow:1;flex-direction:column;overflow-y:auto}.assign-rooms .rooms::-webkit-scrollbar{width:var(--dyte-space-1\\.5, 6px);border-radius:var(--dyte-border-radius-sm, 4px)}.assign-rooms .rooms::-webkit-scrollbar-thumb{border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.assign-rooms .rooms::-webkit-scrollbar-track{border-radius:var(--dyte-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.assign-rooms .start-breakout{display:flex;flex-direction:row;align-items:center;justify-content:flex-end;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-bg-opacity));padding:var(--dyte-space-4, 16px)}.assign-rooms .start-breakout dyte-button div{display:flex;flex-direction:row;align-items:center}.assign-rooms .start-breakout dyte-button div dyte-icon{margin:var(--dyte-space-0, 0px);height:var(--dyte-space-4, 16px)}.assign-rooms .start-breakout .more-options{position:absolute;border-style:solid;--tw-bg-opacity:1;background-color:rgba(var(--dyte-colors-background-700, 44 44 44) / var(--tw-bg-opacity));bottom:var(--dyte-space-14, 56px);border-radius:var(--dyte-border-radius-sm, 4px);--tw-border-opacity:1;border-color:rgba(var(--dyte-colors-background-600, 60 60 60) / var(--tw-border-opacity));padding:var(--dyte-space-2, 8px);width:150px}.assign-rooms .start-breakout .more-options p{display:flex;flex-direction:row;align-items:center;margin:var(--dyte-space-0, 0px);cursor:pointer;padding:var(--dyte-space-2, 8px);font-size:14px;color:rgb(var(--dyte-colors-text-800, 255 255 255 / 0.76))}.assign-rooms .start-breakout .more-options p dyte-icon{margin-right:var(--dyte-space-2, 8px);height:var(--dyte-space-4, 16px)}";

const DyteBreakoutRoomsModal = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.stateUpdate = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.c)(this, "dyteStateUpdate", 7);
    this.keyPressListener = (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    };
    /** Breakout room config object */
    this.roomConfig = {
      rooms: 1,
      state: 'room-config',
      optionsToggle: false,
      mode: 'create',
      applyingChanges: false,
    };
    /** List of breakout rooms */
    this.connectedRooms = [];
    /** List of assigned participants */
    this.unassignedParticipants = [];
    /** Flag that tells if participants are being assigned or not */
    this.assigningParticipants = false;
    /** List of selected peers */
    this.selectedParticipants = [];
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_2__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_1__.u)();
    this.onRoomDelete = (id) => {
      this.meeting.connectedMeetings.stateManager.deleteConnectedMeetings([id]);
    };
    this.onParticipantDelete = (id) => {
      if (id == null)
        return;
      this.unassignedParticipants = [...this.unassignedParticipants.filter((x) => x !== id)];
    };
    this.onUnassignAll = () => {
      this.meeting.connectedMeetings.stateManager.unassignAllParticipants();
    };
    this.addNewRoom = () => {
      this.meeting.connectedMeetings.stateManager.addNewConnectedMeeting();
      this.selectorRef.scrollTo({ top: this.selectorRef.scrollHeight, behavior: 'smooth' });
    };
    this.addParticipantsToRoom = (meetingId) => {
      if (this.selectedParticipants.length == null || this.assigningParticipants == false)
        return;
      this.meeting.connectedMeetings.stateManager.assignParticipants(meetingId, this.selectedParticipants);
      this.selectedParticipants = [];
      // TODO(ishita1805): show a success message for 2 seconds
      this.assigningParticipants = false;
    };
    this.handleConfirmation = async (stateUpdate, store, meeting) => {
      const activeOverlayModal = {
        active: true,
        icon: this.iconPack.breakout_rooms,
        title: 'Creating Breakout Rooms',
        description: 'It may take a few moments.',
      };
      stateUpdate.emit({ activeOverlayModal });
      store.activeOverlayModal = activeOverlayModal;
      await meeting.connectedMeetings.stateManager.startConnectedMeetings();
      // Show Grid
      stateUpdate.emit({
        activeOverlayModal: { active: false },
        activeBreakoutRoomGrid: true,
        activeBreakoutRooms: true,
      });
      store.activeOverlayModal = { active: false };
      store.activeBreakoutRoomGrid = true;
      store.activeBreakoutRooms = true;
    };
    this.handleClose = (stateUpdate, store) => {
      var _a, _b;
      stateUpdate.emit({
        activeBreakoutRoomsManager: {
          active: true,
          data: (_a = this.states.activeConfirmationModal) === null || _a === void 0 ? void 0 : _a.data,
        },
      });
      store.activeBreakoutRoomsManager = {
        active: true,
        data: Object.assign(Object.assign({}, (_b = store.activeConfirmationModal) === null || _b === void 0 ? void 0 : _b.data), { state: 'participants-config' }),
      };
    };
    this.enableConfirmationModal = () => {
      const activeConfirmationModal = {
        active: true,
        content: 'Upon starting breakout rooms, participants will be moved to the assigned rooms.',
        variant: 'primary',
        cancelText: 'Go Back',
        ctaText: 'Yes, Start',
        data: {
          roomConfig: this.roomConfig,
          selectedParticipants: this.selectedParticipants,
        },
        onClick: this.handleConfirmation,
        onClose: this.handleClose,
      };
      this.stateUpdate.emit({
        activeBreakoutRoomsManager: { active: false, data: undefined },
        activeConfirmationModal,
      });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeBreakoutRoomsManager = { active: false, data: undefined };
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeConfirmationModal = activeConfirmationModal;
    };
    this.switchManagerState = (state = 'room-config') => {
      if (this.roomConfig.mode === 'edit')
        return;
      const totalRooms = this.meeting.connectedMeetings.stateManager.getConnectedMeetings().length;
      this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { rooms: Math.max(totalRooms, 1), state });
      this.roomConfig.state = 'room-config';
    };
    this.reset = () => {
      this.meeting.connectedMeetings.stateManager.reset();
      this.switchManagerState();
    };
    this.updateBreakoutRooms = async () => {
      var _a, _b;
      this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { applyingChanges: true });
      await this.meeting.connectedMeetings.stateManager.applyChanges();
      this.stateUpdate.emit({
        activeBreakoutRoomsManager: {
          active: !((_a = this.states.activeBreakoutRoomsManager) === null || _a === void 0 ? void 0 : _a.active),
        },
      });
      _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeBreakoutRoomsManager = {
        active: !((_b = _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeBreakoutRoomsManager) === null || _b === void 0 ? void 0 : _b.active),
      };
      this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { applyingChanges: false });
    };
    this.updateSelectedParticipants = (e) => {
      const { detail: { val, id }, } = e;
      if (val === -1)
        return;
      if (val === 1)
        this.selectedParticipants = [...this.selectedParticipants, id];
      if (val === 0) {
        this.selectedParticipants = [...this.selectedParticipants.filter((x) => x !== id)];
      }
    };
  }
  connectedCallback() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    document.addEventListener('keydown', this.keyPressListener);
    this.onSelectedParticipantsChanged(this.selectedParticipants);
    (_b = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.connectedMeetings) === null || _b === void 0 ? void 0 : _b.stateManager.on('stateUpdate', () => {
      this.connectedRooms = [...this.meeting.connectedMeetings.stateManager.getConnectedMeetings()];
      this.unassignedParticipants = this.meeting.connectedMeetings.stateManager
        .getUnassignedParticipants()
        .map((x) => x.clientSpecificId);
    });
    if (((_c = this.states.activeBreakoutRoomsManager) === null || _c === void 0 ? void 0 : _c.mode) === 'edit') {
      this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { mode: 'edit' });
    }
    if (this.roomConfig.mode === 'edit') {
      (_e = (_d = this.meeting) === null || _d === void 0 ? void 0 : _d.connectedMeetings) === null || _e === void 0 ? void 0 : _e.stateManager.init();
      const rooms = ((_h = (_g = (_f = this.meeting) === null || _f === void 0 ? void 0 : _f.connectedMeetings) === null || _g === void 0 ? void 0 : _g.stateManager) === null || _h === void 0 ? void 0 : _h.getConnectedMeetings()) || [];
      this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { rooms: rooms === null || rooms === void 0 ? void 0 : rooms.length, state: 'participants-config', optionsToggle: false });
      this.selectedParticipants = [];
      this.unassignedParticipants = this.meeting.connectedMeetings.stateManager
        .getUnassignedParticipants()
        .map((x) => x.clientSpecificId);
    }
    else {
      const data = (_j = this.states.activeBreakoutRoomsManager) === null || _j === void 0 ? void 0 : _j.data;
      if (data) {
        this.roomConfig = data.roomConfig;
        this.selectedParticipants = data.selectedParticipants;
        this.roomConfig.state = data.state;
      }
      this.connectedRooms = [...this.meeting.connectedMeetings.stateManager.getConnectedMeetings()];
      this.unassignedParticipants = this.meeting.connectedMeetings.stateManager
        .getUnassignedParticipants()
        .map((x) => x.clientSpecificId);
    }
  }
  disconnectedCallback() {
    this.keyPressListener && document.removeEventListener('keydown', this.keyPressListener);
  }
  onSelectedParticipantsChanged(participants) {
    if (participants.length > 0)
      this.assigningParticipants = true;
    else
      this.assigningParticipants = false;
  }
  close() {
    var _a;
    (_a = this.stateUpdate) === null || _a === void 0 ? void 0 : _a.emit({
      activeBreakoutRoomsManager: {
        active: false,
      },
    });
    _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_3__.s.activeBreakoutRoomsManager = { active: false };
  }
  updateState(state) {
    this.unassignedParticipants = [];
    this.selectedParticipants = [];
    this.meeting.connectedMeetings.stateManager.reset();
    this.meeting.connectedMeetings.stateManager.init();
    for (let i = 0; i < this.roomConfig.rooms; i++) {
      this.meeting.connectedMeetings.stateManager.addNewConnectedMeeting();
    }
    this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { state });
  }
  render() {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, this.roomConfig.state === 'room-config' ? ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "room-config" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("header", null, this.t('Create Breakout Rooms')), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "create-room" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, "Number of Rooms"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-counter", { value: this.roomConfig.rooms, onValueChange: (val) => {
        this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { rooms: Math.max(+val.detail, 1) });
      } }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("br", null), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, "Default Permissions"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("label", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", { type: "checkbox", disabled: true, checked: false }), "\u2002Allow switching between rooms"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("label", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", { type: "checkbox", disabled: true, checked: false }), "\u2002Can go back to main room")), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("footer", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { onClick: () => this.close(), kind: "button", size: "lg", variant: "ghost", title: this.t('Cancel') }, "Cancel"), "\u2002", (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "button", size: "lg", title: this.t('Create'), onClick: () => this.updateState('participants-config') }, "Create")))) : ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "participant-config" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("aside", { part: "menu" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("header", null, this.t('Assign Participants')), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-participants", { meeting: this.meeting, view: "breakout-rooms-manager", unassignedParticipants: this.unassignedParticipants, onSelectedParticipantUpdate: this.updateSelectedParticipants, mode: this.roomConfig.mode }), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "assign-participants" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { disabled: this.roomConfig.mode === 'edit', kind: "button", variant: "ghost", size: "md", onClick: () => this.meeting.connectedMeetings.stateManager.assignParticipantsRandomly() }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "row-button" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.shuffle }), "Assign Randomly")))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "assign-rooms" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: {
        back: true,
        disabled: this.roomConfig.mode === 'edit',
      }, onClick: () => this.switchManagerState() }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.chevron_left }), "Back"), this.assigningParticipants ? ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", { class: "row assign-text" }, "Select a room to assign ", this.selectedParticipants.length, " participant/s.")) : ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "row" }, "Rooms (", this.meeting.connectedMeetings.stateManager.getConnectedMeetings().length, ")", (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "cta-buttons" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "button", variant: "ghost" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { onClick: this.addNewRoom }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.add }), "Add Room")), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { kind: "button", variant: "ghost", disabled: this.unassignedParticipants.length == null, onClick: this.onUnassignAll }, "Unassign All")))), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "rooms", ref: (el) => (this.selectorRef = el) }, this.connectedRooms.map((room) => {
      return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-breakout-room-manager", { key: room['id'], onParticipantsAdd: () => this.addParticipantsToRoom(room['id']), assigningParticipants: this.assigningParticipants, meeting: this.meeting, onDelete: () => this.onRoomDelete(room['id']), mode: this.roomConfig.mode, onParticipantDelete: (id) => this.onParticipantDelete(id.detail), states: this.states, room: Object.assign({}, room) }));
    })), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "start-breakout" }, this.roomConfig.optionsToggle && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", { class: "more-options" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("p", { onClick: this.reset }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { icon: this.iconPack.back }), this.t('Reset')))), this.roomConfig.mode !== 'edit' && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { size: "md" }, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", null, (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", { onClick: this.enableConfirmationModal }, "Start Breakout \u2002 | \u2002"), (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-icon", { onClick: () => {
        this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { optionsToggle: !this.roomConfig.optionsToggle });
      }, icon: this.roomConfig.optionsToggle
        ? this.iconPack.chevron_down
        : this.iconPack.chevron_up })))), this.roomConfig.mode === 'edit' && ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-button", { size: "md", onClick: this.updateBreakoutRooms, disabled: this.roomConfig.applyingChanges }, "Apply Changes"))))))));
  }
  static get watchers() { return {
    "selectedParticipants": ["onSelectedParticipantsChanged"]
  }; }
};
DyteBreakoutRoomsModal.style = dyteBreakoutRoomsManagerCss;




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

/***/ 79781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ onChange),
/* harmony export */   "s": () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);


const appendToMap = (map, propName, value) => {
    const items = map.get(propName);
    if (!items) {
        map.set(propName, [value]);
    }
    else if (!items.includes(value)) {
        items.push(value);
    }
};
const debounce = (fn, ms) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            timeoutId = 0;
            fn(...args);
        }, ms);
    };
};

/**
 * Check if a possible element isConnected.
 * The property might not be there, so we check for it.
 *
 * We want it to return true if isConnected is not a property,
 * otherwise we would remove these elements and would not update.
 *
 * Better leak in Edge than to be useless.
 */
const isConnected = (maybeElement) => !('isConnected' in maybeElement) || maybeElement.isConnected;
const cleanupElements = debounce((map) => {
    for (let key of map.keys()) {
        map.set(key, map.get(key).filter(isConnected));
    }
}, 2000);
const stencilSubscription = () => {
    if (typeof _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.a !== 'function') {
        // If we are not in a stencil project, we do nothing.
        // This function is not really exported by @stencil/core.
        return {};
    }
    const elmsToUpdate = new Map();
    return {
        dispose: () => elmsToUpdate.clear(),
        get: (propName) => {
            const elm = (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.a)();
            if (elm) {
                appendToMap(elmsToUpdate, propName, elm);
            }
        },
        set: (propName) => {
            const elements = elmsToUpdate.get(propName);
            if (elements) {
                elmsToUpdate.set(propName, elements.filter(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.f));
            }
            cleanupElements(elmsToUpdate);
        },
        reset: () => {
            elmsToUpdate.forEach((elms) => elms.forEach(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.f));
            cleanupElements(elmsToUpdate);
        },
    };
};

const createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
    let states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
    const handlers = {
        dispose: [],
        get: [],
        set: [],
        reset: [],
    };
    const reset = () => {
        states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
        handlers.reset.forEach((cb) => cb());
    };
    const dispose = () => {
        // Call first dispose as resetting the state would
        // cause less updates ;)
        handlers.dispose.forEach((cb) => cb());
        reset();
    };
    const get = (propName) => {
        handlers.get.forEach((cb) => cb(propName));
        return states.get(propName);
    };
    const set = (propName, value) => {
        const oldValue = states.get(propName);
        if (shouldUpdate(value, oldValue, propName)) {
            states.set(propName, value);
            handlers.set.forEach((cb) => cb(propName, value, oldValue));
        }
    };
    const state = (typeof Proxy === 'undefined'
        ? {}
        : new Proxy(defaultState, {
            get(_, propName) {
                return get(propName);
            },
            ownKeys(_) {
                return Array.from(states.keys());
            },
            getOwnPropertyDescriptor() {
                return {
                    enumerable: true,
                    configurable: true,
                };
            },
            has(_, propName) {
                return states.has(propName);
            },
            set(_, propName, value) {
                set(propName, value);
                return true;
            },
        }));
    const on = (eventName, callback) => {
        handlers[eventName].push(callback);
        return () => {
            removeFromArray(handlers[eventName], callback);
        };
    };
    const onChange = (propName, cb) => {
        const unSet = on('set', (key, newValue) => {
            if (key === propName) {
                cb(newValue);
            }
        });
        const unReset = on('reset', () => cb(defaultState[propName]));
        return () => {
            unSet();
            unReset();
        };
    };
    const use = (...subscriptions) => {
        const unsubs = subscriptions.reduce((unsubs, subscription) => {
            if (subscription.set) {
                unsubs.push(on('set', subscription.set));
            }
            if (subscription.get) {
                unsubs.push(on('get', subscription.get));
            }
            if (subscription.reset) {
                unsubs.push(on('reset', subscription.reset));
            }
            if (subscription.dispose) {
                unsubs.push(on('dispose', subscription.dispose));
            }
            return unsubs;
        }, []);
        return () => unsubs.forEach((unsub) => unsub());
    };
    const forceUpdate = (key) => {
        const oldValue = states.get(key);
        handlers.set.forEach((cb) => cb(key, oldValue, oldValue));
    };
    return {
        state,
        get,
        set,
        on,
        onChange,
        use,
        dispose,
        reset,
        forceUpdate,
    };
};
const removeFromArray = (array, item) => {
    const index = array.indexOf(item);
    if (index >= 0) {
        array[index] = array[array.length - 1];
        array.length--;
    }
};

const createStore = (defaultState, shouldUpdate) => {
    const map = createObservableMap(defaultState, shouldUpdate);
    map.use(stencilSubscription());
    return map;
};

const { state, onChange } = createStore({});




/***/ })

};
;