/*!
 * artplayer-plugin-subtitle.js v1.0.4
 * Github: https://github.com/zhw2590582/ArtPlayer#readme
 * (c) 2017-2018 Harvey Zack
 * Released under the MIT License.
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t["artplayer-plugin-subtitle"]={})}(this,function(t){"use strict";function e(i){var t=i.i18n,a=i.events.proxy;return{title:"Subtitle",name:"subtitle",index:20,html:'\n            <div class="art-setting-header">\n                '.concat(t.get("Subtitle offset time"),': <span class="art-subtitle-value">0</span>s\n            </div>\n            <div class="art-setting-body">\n                <input\n                    style="width: 100%;height: 3px;outline: none;appearance: none;-moz-appearance: none;-webkit-appearance: none;background-color: #fff;"\n                    class="art-subtitle-range"\n                    type="range"\n                    min="-5"\n                    max="5"\n                    step="0.5"\n                >\n            </div>\n        '),mounted:function(t){var e=t.querySelector(".art-subtitle-range"),n=t.querySelector(".art-subtitle-value");a(e,"change",function(){var t=e.value;n.innerText=t,i.plugins.artplayerPluginSubtitle.offset(Number(t))}),i.on("subtitle:switch",function(){e.value=0,n.innerText=0}),i.on("artplayerPluginSubtitle:set",function(t){e.value!==t&&(e.value=t,n.innerText=t)})}}}function n(i){var a=i.constructor.utils.clamp,t=i.setting,r=i.notice,u=i.template,o=i.i18n;o.update({"zh-cn":{"Subtitle offset time":"字幕偏移时间"},"zh-tw":{"Subtitle offset time":"字幕偏移時間"}}),t.add(e);var l=[];return i.on("subtitle:switch",function(){l=[]}),{offset:function(t){var e=Array.from(u.$track.track.cues),n=a(t,-5,5);e.forEach(function(t,e){l[e]||(l[e]={startTime:t.startTime,endTime:t.endTime}),t.startTime=l[e].startTime+n,t.endTime=l[e].endTime+n}),r.show("".concat(o.get("Subtitle offset time"),": ").concat(t,"s")),i.emit("artplayerPluginSubtitle:set",t)}}}window.artplayerPluginSubtitle=n,t.default=n,Object.defineProperty(t,"__esModule",{value:!0})});
