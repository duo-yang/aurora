/*!
 * wavesurfer.js 2.1.3 (2019-01-21)
 * https://github.com/katspaugh/wavesurfer.js
 * @license BSD-3-Clause
 */

!function (e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("microphone", [], t) : "object" == typeof exports ? exports.microphone = t() : (e.WaveSurfer = e.WaveSurfer || {}, e.WaveSurfer.microphone = t())
}(window, function () {
  return function (r) {
    var i = {};

    function n(e) {
      if (i[e]) return i[e].exports;
      var t = i[e] = {
        i: e,
        l: !1,
        exports: {}
      };
      return r[e].call(t.exports, t, t.exports, n), t.l = !0, t.exports
    }

    return n.m = r, n.c = i, n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: r
      })
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, n.t = function (t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (n.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t)
        for (var i in t) n.d(r, i, function (e) {
          return t[e]
        }.bind(null, i));
      return r
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return n.d(t, "a", t), t
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "localhost:8080/dist/plugin/", n(n.s = 5)
  }({
    5: function (e, t, r) {
      "use strict";

      function i(e, t) {
        for (var r = 0; r < t.length; r++) {
          var i = t[r];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }

      function n(e, t, r) {
        return t && i(e.prototype, t), r && i(e, r), e
      }

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var o = function () {
        function i(e, t) {
          var r = this;
          !function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }(this, i), this.params = e, this.wavesurfer = t, this.active = !1, this.paused = !1, this.browser = this.detectBrowser(), this.reloadBufferFunction = function (e) {
            return r.reloadBuffer(e)
          };
          void 0 === navigator.mediaDevices && (navigator.mediaDevices = {}), void 0 === navigator.mediaDevices.getUserMedia && (navigator.mediaDevices.getUserMedia = function (r, e, t) {
            var i = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            return i ? new Promise(function (e, t) {
              i.call(navigator, r, e, t)
            }) : Promise.reject(new Error("getUserMedia is not implemented in this browser"))
          }), this.constraints = this.params.constraints || {
            video: !1,
            audio: !0
          }, this.bufferSize = this.params.bufferSize || 4096, this.numberOfInputChannels = this.params.numberOfInputChannels || 1, this.numberOfOutputChannels = this.params.numberOfOutputChannels || 1, this._onBackendCreated = function () {
            r.micContext = r.wavesurfer.backend.getAudioContext()
          }
        }

        return n(i, null, [{
          key: "create",
          value: function (e) {
            return {
              name: "microphone",
              deferInit: !(!e || !e.deferInit) && e.deferInit,
              params: e,
              instance: i
            }
          }
        }]), n(i, [{
          key: "init",
          value: function () {
            this.wavesurfer.on("backend-created", this._onBackendCreated), this.wavesurfer.backend && this._onBackendCreated()
          }
        }, {
          key: "destroy",
          value: function () {
            this.paused = !0, this.wavesurfer.un("backend-created", this._onBackendCreated), this.stop()
          }
        }, {
          key: "start",
          value: function () {
            var t = this;
            navigator.mediaDevices.getUserMedia(this.constraints).then(function (e) {
              return t.gotStream(e)
            }).catch(function (e) {
              return t.deviceError(e)
            })
          }
        }, {
          key: "togglePlay",
          value: function () {
            this.active ? (this.paused = !this.paused, this.paused ? this.pause() : this.play()) : this.start()
          }
        }, {
          key: "play",
          value: function () {
            this.paused = !1, this.connect()
          }
        }, {
          key: "pause",
          value: function () {
            this.paused = !0, this.disconnect()
          }
        }, {
          key: "stop",
          value: function () {
            this.active && (this.stopDevice(), this.wavesurfer.empty())
          }
        }, {
          key: "stopDevice",
          value: function () {
            if (this.active = !1, this.disconnect(), this.stream) {
              if (("chrome" === this.browser.browser && 45 <= this.browser.version || "firefox" === this.browser.browser && 44 <= this.browser.version || "edge" === this.browser.browser || "safari" === this.browser.browser) && this.stream.getTracks) return void this.stream.getTracks().forEach(function (e) {
                return e.stop()
              });
              this.stream.stop()
            }
          }
        }, {
          key: "connect",
          value: function () {
            void 0 !== this.stream && ("edge" === this.browser.browser && (this.localAudioBuffer = this.micContext.createBuffer(this.numberOfInputChannels, this.bufferSize, this.micContext.sampleRate)), this.mediaStreamSource = this.micContext.createMediaStreamSource(this.stream), this.levelChecker = this.micContext.createScriptProcessor(this.bufferSize, this.numberOfInputChannels, this.numberOfOutputChannels), this.mediaStreamSource.connect(this.levelChecker), this.levelChecker.connect(this.micContext.destination), this.levelChecker.onaudioprocess = this.reloadBufferFunction)
          }
        }, {
          key: "disconnect",
          value: function () {
            void 0 !== this.mediaStreamSource && this.mediaStreamSource.disconnect(), void 0 !== this.levelChecker && (this.levelChecker.disconnect(), this.levelChecker.onaudioprocess = void 0), void 0 !== this.localAudioBuffer && (this.localAudioBuffer = void 0)
          }
        }, {
          key: "reloadBuffer",
          value: function (e) {
            if (!this.paused)
              if (this.wavesurfer.empty(), "edge" === this.browser.browser) {
                var t, r;
                for (t = 0, r = Math.min(this.localAudioBuffer.numberOfChannels, e.inputBuffer.numberOfChannels); t < r; t++) this.localAudioBuffer.getChannelData(t).set(e.inputBuffer.getChannelData(t));
                this.wavesurfer.loadDecodedBuffer(this.localAudioBuffer)
              } else this.wavesurfer.loadDecodedBuffer(e.inputBuffer)
          }
        }, {
          key: "gotStream",
          value: function (e) {
            this.stream = e, this.active = !0, this.play(), this.fireEvent("deviceReady", e)
          }
        }, {
          key: "deviceError",
          value: function (e) {
            this.fireEvent("deviceError", e)
          }
        }, {
          key: "extractVersion",
          value: function (e, t, r) {
            var i = e.match(t);
            return i && i.length >= r && parseInt(i[r], 10)
          }
        }, {
          key: "detectBrowser",
          value: function () {
            var e = {
              browser: null,
              version: null,
              minVersion: null
            };
            return "undefined" != typeof window && window.navigator ? navigator.mozGetUserMedia ? (e.browser = "firefox", e.version = this.extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1), e.minVersion = 31) : navigator.webkitGetUserMedia ? (e.browser = "chrome", e.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2), e.minVersion = 38) : navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/) ? (e.browser = "edge", e.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2), e.minVersion = 10547) : window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./) ? (e.browser = "safari", e.minVersion = 11, e.version = this.extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1)) : e.browser = "Not a supported browser." : e.browser = "Not a supported browser.", e
          }
        }]), i
      }();
      t.default = o, e.exports = t.default
    }
  })
});
//# sourceMappingURL=wavesurfer.microphone.min.js.map