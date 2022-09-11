"use strict";
exports.id = 1684;
exports.ids = [1684];
exports.modules = {

/***/ 43367:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ RemoteUpdateType)
/* harmony export */ });
var RemoteUpdateType;
(function (RemoteUpdateType) {
  RemoteUpdateType["REQUEST_RECEIVED"] = "REQUEST_RECEIVED";
  RemoteUpdateType["REQUEST_SENT"] = "REQUEST_SENT";
  RemoteUpdateType["INCOMING_REQUEST_ACCEPTED"] = "INCOMING_REQUEST_ACCEPTED";
  RemoteUpdateType["OUTGOING_REQUEST_ACCEPTED"] = "OUTGOING_REQUEST_ACCEPTED";
  RemoteUpdateType["INCOMING_REQUEST_ENDED"] = "INCOMING_REQUEST_ENDED";
  RemoteUpdateType["OUTGOING_REQUEST_ENDED"] = "OUTGOING_REQUEST_ENDED";
})(RemoteUpdateType || (RemoteUpdateType = {}));




/***/ }),

/***/ 41684:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dyte_notifications": () => (/* binding */ DyteNotifications)
/* harmony export */ });
/* harmony import */ var _index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94196);
/* harmony import */ var _dyte_client_faf935bd_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43367);
/* harmony import */ var _logger_52e6d49d_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29799);
/* harmony import */ var _string_703da00e_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(67553);
/* harmony import */ var _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7147);
/* harmony import */ var _index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(61070);
/* harmony import */ var _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(47502);
/* harmony import */ var _index_96b0df1d_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(72559);
/* harmony import */ var _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(79781);
/* harmony import */ var _commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(41969);
/* harmony import */ var _default_language_67b296fd_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(55752);












const SOUNDS = {
  joined: 'https://dyte-uploads.s3.ap-south-1.amazonaws.com/notification_join.mp3',
  left: 'https://dyte-uploads.s3.ap-south-1.amazonaws.com/notification_join.mp3',
  message: 'https://dyte-uploads.s3.ap-south-1.amazonaws.com/notification_message.mp3',
};
/**
 * Handles notification sounds in a meeting
 */
class DyteNotificationsAudio {
  constructor() {
    this.audio = document.createElement('audio');
    this.audio.volume = 0.3;
  }
  play(sound, duration = 3000) {
    var _a;
    if (this.playing)
      return;
    this.playing = true;
    this.audio.src = SOUNDS[sound];
    this.audio.volume = 0.3;
    (_a = this.audio.play()) === null || _a === void 0 ? void 0 : _a.catch((err) => {
      _logger_52e6d49d_js__WEBPACK_IMPORTED_MODULE_2__.l.error('[dyte-notifications] play() failed\n', { sound, duration }, err);
    });
    setTimeout(() => {
      this.playing = false;
    }, duration);
  }
  async setDevice(id) {
    var _a, _b, _c;
    await ((_c = (_b = (_a = this.audio) === null || _a === void 0 ? void 0 : _a.setSinkId) === null || _b === void 0 ? void 0 : _b.call(_a, id)) === null || _c === void 0 ? void 0 : _c.catch((err) => {
      _logger_52e6d49d_js__WEBPACK_IMPORTED_MODULE_2__.l.error('[dyte-notifications] setSinkId() error\n', err);
    }));
  }
}

const DEFAULT_NOTIFICATION_CONFIG = Object.freeze({
  notifications: {
    participant_joined: true,
    participant_left: true,
    participant_joined_waitlist: true,
    chat: true,
    polls: true,
    webinar: true,
  },
  notification_sounds: {
    participant_joined: true,
    participant_left: true,
    chat: true,
    polls: true,
    webinar: true,
  },
  participant_joined_sound_notification_limit: 10,
  participant_chat_message_sound_notification_limit: 10,
});
const DEFAULT_NOTIFICATION_DURATION = 2000;

const dyteNotificationsCss = ":host{position:absolute;top:var(--dyte-space-4, 16px);right:var(--dyte-space-4, 16px);bottom:var(--dyte-space-4, 16px);left:var(--dyte-space-4, 16px);top:auto;z-index:10;display:flex;flex-direction:column;font-family:var(--dyte-font-family, sans-serif);pointer-events:none}dyte-notification{margin-top:var(--dyte-space-2, 8px)}";

function parseConfig(config) {
  const permissions = Object.assign({}, DEFAULT_NOTIFICATION_CONFIG);
  if (config == null)
    return permissions;
  Object.assign(permissions.notification_sounds, config.notification_sounds);
  Object.assign(permissions.notifications, config.notifications);
  permissions.participant_chat_message_sound_notification_limit =
    config.participant_chat_message_sound_notification_limit;
  permissions.participant_joined_sound_notification_limit =
    config.participant_joined_sound_notification_limit;
  return permissions;
}
function getEnabledSounds(sounds) {
  return Object.keys(sounds).filter((key) => sounds[key]);
}
const DyteNotifications = class {
  constructor(hostRef) {
    (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.permissions = DEFAULT_NOTIFICATION_CONFIG;
    this.enabledSounds = getEnabledSounds(DEFAULT_NOTIFICATION_CONFIG.notification_sounds);
    /** Config object */
    this.config = _default_ui_config_fc6a37e8_js__WEBPACK_IMPORTED_MODULE_5__.d;
    /** Language */
    this.t = (0,_index_01de4d1d_js__WEBPACK_IMPORTED_MODULE_4__.u)();
    /** Icon pack */
    this.iconPack = _default_icon_pack_0d519caa_js__WEBPACK_IMPORTED_MODULE_3__.d;
    this.notifications = [];
    this.onRemoteUpdate = ({ payload, type }) => {
      if (type === _dyte_client_faf935bd_js__WEBPACK_IMPORTED_MODULE_1__.R.INCOMING_REQUEST_ACCEPTED) {
        let remotePeer = this.meeting.participants.joined.get(payload.request.remotePeerId);
        this.add({
          id: `message-${Math.random().toString(36)}`,
          icon: this.iconPack.chat,
          message: `Granted remote control to ${remotePeer.name}`,
          duration: DEFAULT_NOTIFICATION_DURATION,
        });
      }
      if (type === _dyte_client_faf935bd_js__WEBPACK_IMPORTED_MODULE_1__.R.OUTGOING_REQUEST_ACCEPTED) {
        let hostPeer = this.meeting.participants.joined.get(payload.request.hostPeerId);
        this.add({
          id: `message-${Math.random().toString(36)}`,
          icon: this.iconPack.chat,
          message: `${hostPeer.name} has granted remote control.`,
          duration: DEFAULT_NOTIFICATION_DURATION,
        });
      }
      if (type === _dyte_client_faf935bd_js__WEBPACK_IMPORTED_MODULE_1__.R.REQUEST_RECEIVED) {
        let remotePeer = this.meeting.participants.joined.get(payload.request.remotePeerId);
        this.add({
          id: `message-${Math.random().toString(36)}`,
          icon: this.iconPack.chat,
          message: `${remotePeer.name} has requested for remote control.`,
          duration: DEFAULT_NOTIFICATION_DURATION,
        });
      }
      if (type === _dyte_client_faf935bd_js__WEBPACK_IMPORTED_MODULE_1__.R.INCOMING_REQUEST_ENDED ||
        type === _dyte_client_faf935bd_js__WEBPACK_IMPORTED_MODULE_1__.R.OUTGOING_REQUEST_ENDED) {
        this.add({
          id: `message-${Math.random().toString(36)}`,
          icon: this.iconPack.chat,
          message: `Existing remote control has been terminated.`,
          duration: DEFAULT_NOTIFICATION_DURATION,
        });
      }
      if (type === _dyte_client_faf935bd_js__WEBPACK_IMPORTED_MODULE_1__.R.REQUEST_SENT) {
        let hostPeer = this.meeting.participants.joined.get(payload.request.hostPeerId);
        this.add({
          id: `message-${Math.random().toString(36)}`,
          icon: this.iconPack.chat,
          message: `Sent remote control request to ${hostPeer.name}`,
          duration: DEFAULT_NOTIFICATION_DURATION,
        });
      }
    };
    this.onDyteNotification = (e) => {
      this.add(e.detail);
      const playSound = e.detail.playSound;
      if (playSound != undefined)
        this.audio.play(playSound);
    };
  }
  connectedCallback() {
    if (typeof document !== 'undefined') {
      document === null || document === void 0 ? void 0 : document.addEventListener('dyteNotification', this.onDyteNotification);
    }
    this.meetingChanged(this.meeting);
    this.configChanged(this.config);
    this.statesChanged(this.states);
  }
  clearListeners(meeting) {
    this.participantJoinedListener &&
      meeting.participants.joined.removeListener('participantJoined', this.participantJoinedListener);
    this.participantLeftListener &&
      meeting.participants.joined.removeListener('participantLeft', this.participantLeftListener);
    this.chatUpdateListener && meeting.chat.removeListener('chatUpdate', this.chatUpdateListener);
    this.pollUpdateListener && meeting.polls.removeListener('pollsUpdate', this.pollUpdateListener);
    this.networkUpdateListener &&
      meeting.meta.removeListener('disconnected', this.networkUpdateListener);
    this.networkUpdateListener &&
      meeting.meta.removeListener('connected', this.networkUpdateListener);
    meeting.remote.removeListener('remoteUpdate', this.onRemoteUpdate);
    clearTimeout(this.disconnectTimeout);
  }
  disconnectedCallback() {
    var _a;
    if (typeof document !== 'undefined') {
      document === null || document === void 0 ? void 0 : document.removeEventListener('dyteNotification', this.onDyteNotification);
    }
    if (this.meeting == null)
      return;
    this.clearListeners(this.meeting);
    this.participantJoinedListener &&
      this.meeting.participants.joined.removeListener('participantJoined', this.participantJoinedListener);
    this.participantLeftListener &&
      this.meeting.participants.joined.removeListener('participantLeft', this.participantLeftListener);
    this.waitlistedParticipantJoinedListener &&
      this.meeting.participants.waitlisted.removeListener('participantJoined', this.waitlistedParticipantJoinedListener);
    this.chatUpdateListener &&
      this.meeting.chat.removeListener('chatUpdate', this.chatUpdateListener);
    this.pollUpdateListener &&
      this.meeting.polls.removeListener('pollsUpdate', this.pollUpdateListener);
    this.networkUpdateListener &&
      this.meeting.meta.removeListener('disconnected', this.networkUpdateListener);
    this.networkUpdateListener &&
      this.meeting.meta.removeListener('connected', this.networkUpdateListener);
    this.meeting.remote.removeListener('remoteUpdate', this.onRemoteUpdate);
    this.spotlightTabUpdateListener &&
      ((_a = this.meeting.spotlight) === null || _a === void 0 ? void 0 : _a.removeListener('activeTabUpdate', this.spotlightTabUpdateListener));
    this.peerRequestToJoinStateListener &&
      this.meeting.participants.joined.removeListener('peerRequestToJoinStage', this.peerRequestToJoinStateListener);
    this.peerAcceptedToJoinStageListener &&
      this.meeting.participants.joined.removeListener('peerAcceptedToJoinStage', this.peerAcceptedToJoinStageListener);
    this.peerRejectedToJoinStageListener &&
      this.meeting.participants.joined.removeListener('peerRejectedToJoinStage', this.peerRejectedToJoinStageListener);
  }
  meetingChanged(meeting, oldMeeting) {
    var _a;
    clearTimeout(this.disconnectTimeout);
    if (oldMeeting !== undefined)
      this.clearListeners(oldMeeting);
    if (meeting != null) {
      this.audio = new DyteNotificationsAudio();
      this.participantJoinedListener = (participant) => {
        if (this.permissions.notifications.participant_joined) {
          this.add({
            id: `${participant.id}-joined`,
            message: `${(0,_string_703da00e_js__WEBPACK_IMPORTED_MODULE_10__.f)(participant.name)} just joined`,
            image: participant.picture,
            duration: 2100,
          });
        }
        if (this.permissions.notification_sounds.participant_joined &&
          this.canPlayParticipantJoinedSound()) {
          this.audio.play('joined');
        }
      };
      this.participantLeftListener = (participant) => {
        if (this.permissions.notifications.participant_left) {
          this.add({
            id: `${participant.id}-left`,
            message: `${(0,_string_703da00e_js__WEBPACK_IMPORTED_MODULE_10__.f)(participant.name)} left`,
            image: participant.picture,
            duration: 2100,
          });
        }
        if (this.permissions.notification_sounds.participant_left &&
          this.canPlayParticipantJoinedSound()) {
          this.audio.play('left');
        }
      };
      this.waitlistedParticipantJoinedListener = (participant) => {
        const id = `${participant.id}-joined-waitlist`;
        this.add({
          id,
          message: `${(0,_string_703da00e_js__WEBPACK_IMPORTED_MODULE_10__.f)(participant.name)} is requesting to join the meeting`,
          image: participant.picture,
          duration: DEFAULT_NOTIFICATION_DURATION * 2,
          button: {
            text: 'Accept',
            variant: 'secondary',
            onClick: async () => {
              await this.meeting.participants.acceptWaitingRoomRequest(participant.id);
              this.remove(id);
            },
          },
        });
      };
      this.chatUpdateListener = ({ message }) => {
        if (message != null) {
          if (message.userId === meeting.self.userId) {
            return;
          }
          if (message.type === 'text') {
            if (this.permissions.notifications.chat) {
              this.add({
                id: `message-${Math.random().toString(36)}`,
                icon: this.iconPack.chat,
                message: `${message.displayName}: ${(0,_string_703da00e_js__WEBPACK_IMPORTED_MODULE_10__.s)(message.message, 20)}`,
                duration: DEFAULT_NOTIFICATION_DURATION,
              });
            }
            if (this.permissions.notification_sounds.chat && this.canPlayChatSound()) {
              this.audio.play('message');
            }
          }
        }
      };
      this.pollUpdateListener = ({ polls }) => {
        if (this.permissions.notifications.polls &&
          this.meeting.self.userId !== polls[polls.length - 1].createdByUserId) {
          this.add({
            id: `poll-${Math.random().toString(36)}`,
            icon: this.iconPack.poll,
            message: `New poll created by ${polls[polls.length - 1].createdBy}`,
            duration: DEFAULT_NOTIFICATION_DURATION,
          });
        }
        if (this.permissions.notification_sounds.polls &&
          this.meeting.self.userId !== polls[polls.length - 1].createdByUserId &&
          this.canPlayChatSound()) {
          this.audio.play('message');
        }
      };
      this.deviceUpdateListener = ({ device, preview }) => {
        if (preview)
          return;
        if (device.kind === 'audiooutput') {
          this.audio.setDevice(device.deviceId);
        }
      };
      this.networkUpdateListener = ({ event }) => {
        this.remove('network');
        let reconnectDuration;
        if (event === 'disconnected') {
          reconnectDuration = 20000;
          this.add({
            id: 'network',
            icon: this.iconPack.disconnected,
            message: this.t('Connection lost. Trying to reconnect...'),
            duration: reconnectDuration,
          });
          this.disconnectTimeout = setTimeout(() => {
            if (this.states != null) {
              this.states.roomLeftState = 'disconnected';
              _store_87c9fa78_js__WEBPACK_IMPORTED_MODULE_7__.s.roomLeftState = 'disconnected';
            }
            this.add({
              id: 'network-lost',
              icon: this.iconPack.disconnected,
              message: this.t('Taking too long to reconnect...'),
              button: {
                text: this.t('End Meeting'),
                variant: 'danger',
                onClick: () => { var _a; return (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.leaveRoom(); },
              },
            });
          }, reconnectDuration);
        }
        else if (event === 'connected') {
          this.remove('network-lost');
          reconnectDuration = 3000;
          this.add({
            id: `network`,
            icon: this.iconPack.wifi,
            message: this.t('Connection restored'),
            duration: reconnectDuration,
          });
          clearTimeout(this.disconnectTimeout);
        }
      };
      this.spotlightTabUpdateListener = (spotlightTab) => {
        switch (spotlightTab.type) {
          case 'plugin':
            const spotlightPlugin = meeting.plugins.active
              .toArray()
              .find((plugin) => plugin.id == spotlightTab.id);
            if (spotlightPlugin != undefined) {
              this.add({
                id: 'spotlight',
                message: `Plugin switched to ${spotlightPlugin.name}`,
                duration: DEFAULT_NOTIFICATION_DURATION,
              });
            }
            break;
          case 'screenshare':
            const screenShareParticipant = meeting.participants.joined
              .toArray()
              .filter((participant) => participant.screenShareEnabled)
              .find((participant) => participant.id == spotlightTab.id);
            if (screenShareParticipant != undefined) {
              this.add({
                id: 'spotlight',
                message: `Now watching ${screenShareParticipant.name}'s screen`,
                duration: DEFAULT_NOTIFICATION_DURATION,
              });
            }
            break;
        }
      };
      this.peerRequestToJoinStateListener = ({ id }) => {
        const participant = this.meeting.participants.joined.get(id);
        if (participant !== undefined) {
          this.add({
            id: `webinar-request-${id}`,
            message: `${participant.name} is requesting to be on stage`,
            duration: DEFAULT_NOTIFICATION_DURATION,
            button: {
              text: 'Accept',
              variant: 'primary',
              onClick: async () => {
                await this.meeting.participants.acceptAllRequestToJoinStageRequests([
                  {
                    id,
                    requestToJoinType: 'REQUEST_TO_PRESENT',
                  },
                ]);
                this.remove(`webinar-request-${id}`);
              },
            },
          });
          if (this.permissions.notifications.webinar) {
            this.audio.play('joined');
          }
        }
      };
      this.peerAcceptedToJoinStageListener = (request) => {
        const participant = this.meeting.participants.joined.get(request.id);
        if (participant !== undefined) {
          this.add({
            id: `webinar-accepted-${request.id}`,
            message: `Approved ${participant.name}'s request to join stage.`,
            duration: DEFAULT_NOTIFICATION_DURATION,
          });
          if (this.permissions.notifications.webinar) {
            this.audio.play('joined');
          }
        }
      };
      this.peerRejectedToJoinStageListener = (request) => {
        const participant = this.meeting.participants.joined.get(request.id);
        if (participant !== undefined) {
          this.add({
            id: `webinar-rejected-${request.id}`,
            message: `Rejected ${participant.name}'s request to join stage.`,
            duration: DEFAULT_NOTIFICATION_DURATION,
          });
        }
      };
      const currentDevices = meeting.self.getCurrentDevices();
      if (currentDevices.speaker != null) {
        this.audio.setDevice(currentDevices.speaker.deviceId);
      }
      meeting.participants.joined.addListener('participantJoined', this.participantJoinedListener);
      meeting.participants.joined.addListener('participantLeft', this.participantLeftListener);
      meeting.participants.joined.addListener('peerRequestToJoinStage', this.peerRequestToJoinStateListener);
      meeting.participants.joined.addListener('peerAcceptedToJoinStage', this.peerAcceptedToJoinStageListener);
      meeting.participants.joined.addListener('peerRejectedToJoinStage', this.peerRejectedToJoinStageListener);
      if (this.canAcceptWaitingRequests()) {
        meeting.participants.waitlisted.addListener('participantJoined', this.waitlistedParticipantJoinedListener);
      }
      meeting.chat.addListener('chatUpdate', this.chatUpdateListener);
      meeting.polls.addListener('pollsUpdate', this.pollUpdateListener);
      meeting.self.addListener('deviceUpdate', this.deviceUpdateListener);
      meeting.meta.addListener('disconnected', () => this.networkUpdateListener({ event: 'disconnected' }));
      meeting.meta.addListener('connected', () => this.networkUpdateListener({ event: 'connected' }));
      meeting.remote.addListener('remoteUpdate', this.onRemoteUpdate);
      (_a = meeting.spotlight) === null || _a === void 0 ? void 0 : _a.addListener('activeTabUpdate', this.spotlightTabUpdateListener);
    }
  }
  configChanged(config) {
    if (config != null) {
      if ((config === null || config === void 0 ? void 0 : config.config) != null) {
        this.permissions = parseConfig(config.config);
        this.enabledSounds = getEnabledSounds(this.permissions.notification_sounds);
      }
    }
  }
  statesChanged(states) {
    var _a;
    if (states != null) {
      const notificationSoundsEnabled = !((_a = states === null || states === void 0 ? void 0 : states.prefs) === null || _a === void 0 ? void 0 : _a.muteNotificationSounds);
      // toggle only the notification sounds values which were enabled in the first place
      for (const permission of this.enabledSounds) {
        if (permission in this.permissions.notification_sounds) {
          this.permissions.notification_sounds[permission] = notificationSoundsEnabled;
        }
      }
    }
  }
  add(notification) {
    // show notifications only if tab is in focus and a maximum of 5 at a time
    if (document.visibilityState === 'visible' && this.notifications.length < 5) {
      // adds new notification to start of array so they appear at the bottom
      this.notifications = [...this.notifications, notification];
    }
  }
  remove(id) {
    this.notifications = this.notifications.filter((notification) => notification.id !== id);
  }
  handleDismiss(e) {
    e.stopPropagation();
    const id = e.detail;
    const el = this.host.shadowRoot.querySelector(`[data-id="${id}"]`);
    // exit animation
    el === null || el === void 0 ? void 0 : el.classList.add('exit');
    setTimeout(() => {
      (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.w)(() => {
        this.remove(id);
      });
    }, 400);
  }
  canPlayParticipantJoinedSound() {
    return (this.permissions.participant_chat_message_sound_notification_limit == undefined ||
      this.permissions.participant_chat_message_sound_notification_limit <= 0 ||
      this.meeting.participants.count <=
        this.permissions.participant_chat_message_sound_notification_limit);
  }
  canPlayChatSound() {
    return (this.permissions.participant_chat_message_sound_notification_limit == undefined ||
      this.permissions.participant_chat_message_sound_notification_limit <= 0 ||
      this.meeting.participants.count <=
        this.permissions.participant_chat_message_sound_notification_limit);
  }
  canAcceptWaitingRequests() {
    return (this.permissions.notifications.participant_joined_waitlist &&
      this.meeting.self.permissions.acceptWaitingRequests);
  }
  render() {
    return ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.H, null, this.notifications.map((notification) => ((0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.h)("dyte-notification", { size: this.size, key: notification.id, "data-id": notification.id, notification: notification, onDyteNotificationDismiss: (e) => this.handleDismiss(e) })))));
  }
  get host() { return (0,_index_9f89d2b2_js__WEBPACK_IMPORTED_MODULE_0__.g)(this); }
  static get watchers() { return {
    "meeting": ["meetingChanged"],
    "config": ["configChanged"],
    "states": ["statesChanged"]
  }; }
};
DyteNotifications.style = dyteNotificationsCss;




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

/***/ 29799:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ loglevel)
/* harmony export */ });
/* harmony import */ var _commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41969);


var loglevel = (0,_commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_0__.c)(function (module) {
/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    if (module.exports) {
        module.exports = definition();
    } else {
        root.log = definition();
    }
}(_commonjsHelpers_9943807e_js__WEBPACK_IMPORTED_MODULE_0__.a, function () {

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      defaultLevel = defaultLevel == null ? "WARN" : defaultLevel;

      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType || !storageKey) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      function clearPersistedLevel() {
          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage.removeItem(storageKey);
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch (ignore) {}
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          defaultLevel = level;
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.resetLevel = function () {
          self.setLevel(defaultLevel, false);
          clearPersistedLevel();
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;

    return defaultLogger;
}));
});

loglevel.enableAll();




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




/***/ })

};
;