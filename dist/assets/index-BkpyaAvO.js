var ya=Object.defineProperty;var wa=(s,t,e)=>t in s?ya(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var E=(s,t,e)=>wa(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function Ze(s){return s+.5|0}const It=(s,t,e)=>Math.max(Math.min(s,e),t);function Pe(s){return It(Ze(s*2.55),0,255)}function jt(s){return It(Ze(s*255),0,255)}function Et(s){return It(Ze(s/2.55)/100,0,1)}function Ki(s){return It(Ze(s*100),0,100)}const ut={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},pi=[..."0123456789ABCDEF"],ka=s=>pi[s&15],Sa=s=>pi[(s&240)>>4]+pi[s&15],ss=s=>(s&240)>>4===(s&15),_a=s=>ss(s.r)&&ss(s.g)&&ss(s.b)&&ss(s.a);function Aa(s){var t=s.length,e;return s[0]==="#"&&(t===4||t===5?e={r:255&ut[s[1]]*17,g:255&ut[s[2]]*17,b:255&ut[s[3]]*17,a:t===5?ut[s[4]]*17:255}:(t===7||t===9)&&(e={r:ut[s[1]]<<4|ut[s[2]],g:ut[s[3]]<<4|ut[s[4]],b:ut[s[5]]<<4|ut[s[6]],a:t===9?ut[s[7]]<<4|ut[s[8]]:255})),e}const Ca=(s,t)=>s<255?t(s):"";function Ea(s){var t=_a(s)?ka:Sa;return s?"#"+t(s.r)+t(s.g)+t(s.b)+Ca(s.a,t):void 0}const Ma=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function vo(s,t,e){const i=t*Math.min(e,1-e),n=(o,a=(o+s/30)%12)=>e-i*Math.max(Math.min(a-3,9-a,1),-1);return[n(0),n(8),n(4)]}function Pa(s,t,e){const i=(n,o=(n+s/60)%6)=>e-e*t*Math.max(Math.min(o,4-o,1),0);return[i(5),i(3),i(1)]}function Da(s,t,e){const i=vo(s,1,.5);let n;for(t+e>1&&(n=1/(t+e),t*=n,e*=n),n=0;n<3;n++)i[n]*=1-t-e,i[n]+=t;return i}function Ra(s,t,e,i,n){return s===n?(t-e)/i+(t<e?6:0):t===n?(e-s)/i+2:(s-t)/i+4}function Di(s){const e=s.r/255,i=s.g/255,n=s.b/255,o=Math.max(e,i,n),a=Math.min(e,i,n),r=(o+a)/2;let l,d,c;return o!==a&&(c=o-a,d=r>.5?c/(2-o-a):c/(o+a),l=Ra(e,i,n,c,o),l=l*60+.5),[l|0,d||0,r]}function Ri(s,t,e,i){return(Array.isArray(t)?s(t[0],t[1],t[2]):s(t,e,i)).map(jt)}function Ii(s,t,e){return Ri(vo,s,t,e)}function Ia(s,t,e){return Ri(Da,s,t,e)}function Ta(s,t,e){return Ri(Pa,s,t,e)}function yo(s){return(s%360+360)%360}function Oa(s){const t=Ma.exec(s);let e=255,i;if(!t)return;t[5]!==i&&(e=t[6]?Pe(+t[5]):jt(+t[5]));const n=yo(+t[2]),o=+t[3]/100,a=+t[4]/100;return t[1]==="hwb"?i=Ia(n,o,a):t[1]==="hsv"?i=Ta(n,o,a):i=Ii(n,o,a),{r:i[0],g:i[1],b:i[2],a:e}}function $a(s,t){var e=Di(s);e[0]=yo(e[0]+t),e=Ii(e),s.r=e[0],s.g=e[1],s.b=e[2]}function Ba(s){if(!s)return;const t=Di(s),e=t[0],i=Ki(t[1]),n=Ki(t[2]);return s.a<255?`hsla(${e}, ${i}%, ${n}%, ${Et(s.a)})`:`hsl(${e}, ${i}%, ${n}%)`}const qi={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Yi={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function ja(){const s={},t=Object.keys(Yi),e=Object.keys(qi);let i,n,o,a,r;for(i=0;i<t.length;i++){for(a=r=t[i],n=0;n<e.length;n++)o=e[n],r=r.replace(o,qi[o]);o=parseInt(Yi[a],16),s[r]=[o>>16&255,o>>8&255,o&255]}return s}let is;function La(s){is||(is=ja(),is.transparent=[0,0,0,0]);const t=is[s.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const Fa=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function Na(s){const t=Fa.exec(s);let e=255,i,n,o;if(t){if(t[7]!==i){const a=+t[7];e=t[8]?Pe(a):It(a*255,0,255)}return i=+t[1],n=+t[3],o=+t[5],i=255&(t[2]?Pe(i):It(i,0,255)),n=255&(t[4]?Pe(n):It(n,0,255)),o=255&(t[6]?Pe(o):It(o,0,255)),{r:i,g:n,b:o,a:e}}}function Va(s){return s&&(s.a<255?`rgba(${s.r}, ${s.g}, ${s.b}, ${Et(s.a)})`:`rgb(${s.r}, ${s.g}, ${s.b})`)}const Xs=s=>s<=.0031308?s*12.92:Math.pow(s,1/2.4)*1.055-.055,ue=s=>s<=.04045?s/12.92:Math.pow((s+.055)/1.055,2.4);function Ha(s,t,e){const i=ue(Et(s.r)),n=ue(Et(s.g)),o=ue(Et(s.b));return{r:jt(Xs(i+e*(ue(Et(t.r))-i))),g:jt(Xs(n+e*(ue(Et(t.g))-n))),b:jt(Xs(o+e*(ue(Et(t.b))-o))),a:s.a+e*(t.a-s.a)}}function ns(s,t,e){if(s){let i=Di(s);i[t]=Math.max(0,Math.min(i[t]+i[t]*e,t===0?360:1)),i=Ii(i),s.r=i[0],s.g=i[1],s.b=i[2]}}function wo(s,t){return s&&Object.assign(t||{},s)}function Ji(s){var t={r:0,g:0,b:0,a:255};return Array.isArray(s)?s.length>=3&&(t={r:s[0],g:s[1],b:s[2],a:255},s.length>3&&(t.a=jt(s[3]))):(t=wo(s,{r:0,g:0,b:0,a:1}),t.a=jt(t.a)),t}function za(s){return s.charAt(0)==="r"?Na(s):Oa(s)}class We{constructor(t){if(t instanceof We)return t;const e=typeof t;let i;e==="object"?i=Ji(t):e==="string"&&(i=Aa(t)||La(t)||za(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=wo(this._rgb);return t&&(t.a=Et(t.a)),t}set rgb(t){this._rgb=Ji(t)}rgbString(){return this._valid?Va(this._rgb):void 0}hexString(){return this._valid?Ea(this._rgb):void 0}hslString(){return this._valid?Ba(this._rgb):void 0}mix(t,e){if(t){const i=this.rgb,n=t.rgb;let o;const a=e===o?.5:e,r=2*a-1,l=i.a-n.a,d=((r*l===-1?r:(r+l)/(1+r*l))+1)/2;o=1-d,i.r=255&d*i.r+o*n.r+.5,i.g=255&d*i.g+o*n.g+.5,i.b=255&d*i.b+o*n.b+.5,i.a=a*i.a+(1-a)*n.a,this.rgb=i}return this}interpolate(t,e){return t&&(this._rgb=Ha(this._rgb,t._rgb,e)),this}clone(){return new We(this.rgb)}alpha(t){return this._rgb.a=jt(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=Ze(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return ns(this._rgb,2,t),this}darken(t){return ns(this._rgb,2,-t),this}saturate(t){return ns(this._rgb,1,t),this}desaturate(t){return ns(this._rgb,1,-t),this}rotate(t){return $a(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function _t(){}const Wa=(()=>{let s=0;return()=>s++})();function T(s){return s==null}function W(s){if(Array.isArray&&Array.isArray(s))return!0;const t=Object.prototype.toString.call(s);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function O(s){return s!==null&&Object.prototype.toString.call(s)==="[object Object]"}function K(s){return(typeof s=="number"||s instanceof Number)&&isFinite(+s)}function dt(s,t){return K(s)?s:t}function R(s,t){return typeof s>"u"?t:s}const Ga=(s,t)=>typeof s=="string"&&s.endsWith("%")?parseFloat(s)/100:+s/t,ko=(s,t)=>typeof s=="string"&&s.endsWith("%")?parseFloat(s)/100*t:+s;function V(s,t,e){if(s&&typeof s.call=="function")return s.apply(e,t)}function F(s,t,e,i){let n,o,a;if(W(s))for(o=s.length,n=0;n<o;n++)t.call(e,s[n],n);else if(O(s))for(a=Object.keys(s),o=a.length,n=0;n<o;n++)t.call(e,s[a[n]],a[n])}function Os(s,t){let e,i,n,o;if(!s||!t||s.length!==t.length)return!1;for(e=0,i=s.length;e<i;++e)if(n=s[e],o=t[e],n.datasetIndex!==o.datasetIndex||n.index!==o.index)return!1;return!0}function $s(s){if(W(s))return s.map($s);if(O(s)){const t=Object.create(null),e=Object.keys(s),i=e.length;let n=0;for(;n<i;++n)t[e[n]]=$s(s[e[n]]);return t}return s}function So(s){return["__proto__","prototype","constructor"].indexOf(s)===-1}function Ua(s,t,e,i){if(!So(s))return;const n=t[s],o=e[s];O(n)&&O(o)?Ge(n,o,i):t[s]=$s(o)}function Ge(s,t,e){const i=W(t)?t:[t],n=i.length;if(!O(s))return s;e=e||{};const o=e.merger||Ua;let a;for(let r=0;r<n;++r){if(a=i[r],!O(a))continue;const l=Object.keys(a);for(let d=0,c=l.length;d<c;++d)o(l[d],s,a,e)}return s}function je(s,t){return Ge(s,t,{merger:Ka})}function Ka(s,t,e){if(!So(s))return;const i=t[s],n=e[s];O(i)&&O(n)?je(i,n):Object.prototype.hasOwnProperty.call(t,s)||(t[s]=$s(n))}const Xi={"":s=>s,x:s=>s.x,y:s=>s.y};function qa(s){const t=s.split("."),e=[];let i="";for(const n of t)i+=n,i.endsWith("\\")?i=i.slice(0,-1)+".":(e.push(i),i="");return e}function Ya(s){const t=qa(s);return e=>{for(const i of t){if(i==="")break;e=e&&e[i]}return e}}function Ft(s,t){return(Xi[t]||(Xi[t]=Ya(t)))(s)}function Ti(s){return s.charAt(0).toUpperCase()+s.slice(1)}const Ue=s=>typeof s<"u",Nt=s=>typeof s=="function",Zi=(s,t)=>{if(s.size!==t.size)return!1;for(const e of s)if(!t.has(e))return!1;return!0};function Ja(s){return s.type==="mouseup"||s.type==="click"||s.type==="contextmenu"}const B=Math.PI,H=2*B,Xa=H+B,Bs=Number.POSITIVE_INFINITY,Za=B/180,q=B/2,Gt=B/4,Qi=B*2/3,Tt=Math.log10,kt=Math.sign;function Le(s,t,e){return Math.abs(s-t)<e}function tn(s){const t=Math.round(s);s=Le(s,t,s/1e3)?t:s;const e=Math.pow(10,Math.floor(Tt(s))),i=s/e;return(i<=1?1:i<=2?2:i<=5?5:10)*e}function Qa(s){const t=[],e=Math.sqrt(s);let i;for(i=1;i<e;i++)s%i===0&&(t.push(i),t.push(s/i));return e===(e|0)&&t.push(e),t.sort((n,o)=>n-o).pop(),t}function tr(s){return typeof s=="symbol"||typeof s=="object"&&s!==null&&!(Symbol.toPrimitive in s||"toString"in s||"valueOf"in s)}function be(s){return!tr(s)&&!isNaN(parseFloat(s))&&isFinite(s)}function er(s,t){const e=Math.round(s);return e-t<=s&&e+t>=s}function _o(s,t,e){let i,n,o;for(i=0,n=s.length;i<n;i++)o=s[i][e],isNaN(o)||(t.min=Math.min(t.min,o),t.max=Math.max(t.max,o))}function mt(s){return s*(B/180)}function Oi(s){return s*(180/B)}function en(s){if(!K(s))return;let t=1,e=0;for(;Math.round(s*t)/t!==s;)t*=10,e++;return e}function Ao(s,t){const e=t.x-s.x,i=t.y-s.y,n=Math.sqrt(e*e+i*i);let o=Math.atan2(i,e);return o<-.5*B&&(o+=H),{angle:o,distance:n}}function hi(s,t){return Math.sqrt(Math.pow(t.x-s.x,2)+Math.pow(t.y-s.y,2))}function sr(s,t){return(s-t+Xa)%H-B}function tt(s){return(s%H+H)%H}function Ke(s,t,e,i){const n=tt(s),o=tt(t),a=tt(e),r=tt(o-n),l=tt(a-n),d=tt(n-o),c=tt(n-a);return n===o||n===a||i&&o===a||r>l&&d<c}function Z(s,t,e){return Math.max(t,Math.min(e,s))}function ir(s){return Z(s,-32768,32767)}function Mt(s,t,e,i=1e-6){return s>=Math.min(t,e)-i&&s<=Math.max(t,e)+i}function $i(s,t,e){e=e||(a=>s[a]<t);let i=s.length-1,n=0,o;for(;i-n>1;)o=n+i>>1,e(o)?n=o:i=o;return{lo:n,hi:i}}const Pt=(s,t,e,i)=>$i(s,e,i?n=>{const o=s[n][t];return o<e||o===e&&s[n+1][t]===e}:n=>s[n][t]<e),nr=(s,t,e)=>$i(s,e,i=>s[i][t]>=e);function or(s,t,e){let i=0,n=s.length;for(;i<n&&s[i]<t;)i++;for(;n>i&&s[n-1]>e;)n--;return i>0||n<s.length?s.slice(i,n):s}const Co=["push","pop","shift","splice","unshift"];function ar(s,t){if(s._chartjs){s._chartjs.listeners.push(t);return}Object.defineProperty(s,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Co.forEach(e=>{const i="_onData"+Ti(e),n=s[e];Object.defineProperty(s,e,{configurable:!0,enumerable:!1,value(...o){const a=n.apply(this,o);return s._chartjs.listeners.forEach(r=>{typeof r[i]=="function"&&r[i](...o)}),a}})})}function sn(s,t){const e=s._chartjs;if(!e)return;const i=e.listeners,n=i.indexOf(t);n!==-1&&i.splice(n,1),!(i.length>0)&&(Co.forEach(o=>{delete s[o]}),delete s._chartjs)}function Eo(s){const t=new Set(s);return t.size===s.length?s:Array.from(t)}const Mo=function(){return typeof window>"u"?function(s){return s()}:window.requestAnimationFrame}();function Po(s,t){let e=[],i=!1;return function(...n){e=n,i||(i=!0,Mo.call(window,()=>{i=!1,s.apply(t,e)}))}}function rr(s,t){let e;return function(...i){return t?(clearTimeout(e),e=setTimeout(s,t,i)):s.apply(this,i),t}}const Bi=s=>s==="start"?"left":s==="end"?"right":"center",Q=(s,t,e)=>s==="start"?t:s==="end"?e:(t+e)/2,lr=(s,t,e,i)=>s===(i?"left":"right")?e:s==="center"?(t+e)/2:t;function Do(s,t,e){const i=t.length;let n=0,o=i;if(s._sorted){const{iScale:a,vScale:r,_parsed:l}=s,d=s.dataset&&s.dataset.options?s.dataset.options.spanGaps:null,c=a.axis,{min:u,max:p,minDefined:h,maxDefined:m}=a.getUserBounds();if(h){if(n=Math.min(Pt(l,c,u).lo,e?i:Pt(t,c,a.getPixelForValue(u)).lo),d){const f=l.slice(0,n+1).reverse().findIndex(g=>!T(g[r.axis]));n-=Math.max(0,f)}n=Z(n,0,i-1)}if(m){let f=Math.max(Pt(l,a.axis,p,!0).hi+1,e?0:Pt(t,c,a.getPixelForValue(p),!0).hi+1);if(d){const g=l.slice(f-1).findIndex(x=>!T(x[r.axis]));f+=Math.max(0,g)}o=Z(f,n,i)-n}else o=i-n}return{start:n,count:o}}function Ro(s){const{xScale:t,yScale:e,_scaleRanges:i}=s,n={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!i)return s._scaleRanges=n,!0;const o=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==e.min||i.ymax!==e.max;return Object.assign(i,n),o}const os=s=>s===0||s===1,nn=(s,t,e)=>-(Math.pow(2,10*(s-=1))*Math.sin((s-t)*H/e)),on=(s,t,e)=>Math.pow(2,-10*s)*Math.sin((s-t)*H/e)+1,Fe={linear:s=>s,easeInQuad:s=>s*s,easeOutQuad:s=>-s*(s-2),easeInOutQuad:s=>(s/=.5)<1?.5*s*s:-.5*(--s*(s-2)-1),easeInCubic:s=>s*s*s,easeOutCubic:s=>(s-=1)*s*s+1,easeInOutCubic:s=>(s/=.5)<1?.5*s*s*s:.5*((s-=2)*s*s+2),easeInQuart:s=>s*s*s*s,easeOutQuart:s=>-((s-=1)*s*s*s-1),easeInOutQuart:s=>(s/=.5)<1?.5*s*s*s*s:-.5*((s-=2)*s*s*s-2),easeInQuint:s=>s*s*s*s*s,easeOutQuint:s=>(s-=1)*s*s*s*s+1,easeInOutQuint:s=>(s/=.5)<1?.5*s*s*s*s*s:.5*((s-=2)*s*s*s*s+2),easeInSine:s=>-Math.cos(s*q)+1,easeOutSine:s=>Math.sin(s*q),easeInOutSine:s=>-.5*(Math.cos(B*s)-1),easeInExpo:s=>s===0?0:Math.pow(2,10*(s-1)),easeOutExpo:s=>s===1?1:-Math.pow(2,-10*s)+1,easeInOutExpo:s=>os(s)?s:s<.5?.5*Math.pow(2,10*(s*2-1)):.5*(-Math.pow(2,-10*(s*2-1))+2),easeInCirc:s=>s>=1?s:-(Math.sqrt(1-s*s)-1),easeOutCirc:s=>Math.sqrt(1-(s-=1)*s),easeInOutCirc:s=>(s/=.5)<1?-.5*(Math.sqrt(1-s*s)-1):.5*(Math.sqrt(1-(s-=2)*s)+1),easeInElastic:s=>os(s)?s:nn(s,.075,.3),easeOutElastic:s=>os(s)?s:on(s,.075,.3),easeInOutElastic(s){return os(s)?s:s<.5?.5*nn(s*2,.1125,.45):.5+.5*on(s*2-1,.1125,.45)},easeInBack(s){return s*s*((1.70158+1)*s-1.70158)},easeOutBack(s){return(s-=1)*s*((1.70158+1)*s+1.70158)+1},easeInOutBack(s){let t=1.70158;return(s/=.5)<1?.5*(s*s*(((t*=1.525)+1)*s-t)):.5*((s-=2)*s*(((t*=1.525)+1)*s+t)+2)},easeInBounce:s=>1-Fe.easeOutBounce(1-s),easeOutBounce(s){return s<1/2.75?7.5625*s*s:s<2/2.75?7.5625*(s-=1.5/2.75)*s+.75:s<2.5/2.75?7.5625*(s-=2.25/2.75)*s+.9375:7.5625*(s-=2.625/2.75)*s+.984375},easeInOutBounce:s=>s<.5?Fe.easeInBounce(s*2)*.5:Fe.easeOutBounce(s*2-1)*.5+.5};function ji(s){if(s&&typeof s=="object"){const t=s.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function an(s){return ji(s)?s:new We(s)}function Zs(s){return ji(s)?s:new We(s).saturate(.5).darken(.1).hexString()}const dr=["x","y","borderWidth","radius","tension"],cr=["color","borderColor","backgroundColor"];function ur(s){s.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),s.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),s.set("animations",{colors:{type:"color",properties:cr},numbers:{type:"number",properties:dr}}),s.describe("animations",{_fallback:"animation"}),s.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function pr(s){s.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const rn=new Map;function hr(s,t){t=t||{};const e=s+JSON.stringify(t);let i=rn.get(e);return i||(i=new Intl.NumberFormat(s,t),rn.set(e,i)),i}function Qe(s,t,e){return hr(t,e).format(s)}const Io={values(s){return W(s)?s:""+s},numeric(s,t,e){if(s===0)return"0";const i=this.chart.options.locale;let n,o=s;if(e.length>1){const d=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(d<1e-4||d>1e15)&&(n="scientific"),o=fr(s,e)}const a=Tt(Math.abs(o)),r=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),l={notation:n,minimumFractionDigits:r,maximumFractionDigits:r};return Object.assign(l,this.options.ticks.format),Qe(s,i,l)},logarithmic(s,t,e){if(s===0)return"0";const i=e[t].significand||s/Math.pow(10,Math.floor(Tt(s)));return[1,2,3,5,10,15].includes(i)||t>.8*e.length?Io.numeric.call(this,s,t,e):""}};function fr(s,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&s!==Math.floor(s)&&(e=s-Math.floor(s)),e}var zs={formatters:Io};function gr(s){s.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:zs.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),s.route("scale.ticks","color","","color"),s.route("scale.grid","color","","borderColor"),s.route("scale.border","color","","borderColor"),s.route("scale.title","color","","color"),s.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),s.describe("scales",{_fallback:"scale"}),s.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const re=Object.create(null),fi=Object.create(null);function Ne(s,t){if(!t)return s;const e=t.split(".");for(let i=0,n=e.length;i<n;++i){const o=e[i];s=s[o]||(s[o]=Object.create(null))}return s}function Qs(s,t,e){return typeof t=="string"?Ge(Ne(s,t),e):Ge(Ne(s,""),t)}class mr{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,n)=>Zs(n.backgroundColor),this.hoverBorderColor=(i,n)=>Zs(n.borderColor),this.hoverColor=(i,n)=>Zs(n.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return Qs(this,t,e)}get(t){return Ne(this,t)}describe(t,e){return Qs(fi,t,e)}override(t,e){return Qs(re,t,e)}route(t,e,i,n){const o=Ne(this,t),a=Ne(this,i),r="_"+e;Object.defineProperties(o,{[r]:{value:o[e],writable:!0},[e]:{enumerable:!0,get(){const l=this[r],d=a[n];return O(l)?Object.assign({},d,l):R(l,d)},set(l){this[r]=l}}})}apply(t){t.forEach(e=>e(this))}}var U=new mr({_scriptable:s=>!s.startsWith("on"),_indexable:s=>s!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[ur,pr,gr]);function br(s){return!s||T(s.size)||T(s.family)?null:(s.style?s.style+" ":"")+(s.weight?s.weight+" ":"")+s.size+"px "+s.family}function js(s,t,e,i,n){let o=t[n];return o||(o=t[n]=s.measureText(n).width,e.push(n)),o>i&&(i=o),i}function xr(s,t,e,i){i=i||{};let n=i.data=i.data||{},o=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(n=i.data={},o=i.garbageCollect=[],i.font=t),s.save(),s.font=t;let a=0;const r=e.length;let l,d,c,u,p;for(l=0;l<r;l++)if(u=e[l],u!=null&&!W(u))a=js(s,n,o,a,u);else if(W(u))for(d=0,c=u.length;d<c;d++)p=u[d],p!=null&&!W(p)&&(a=js(s,n,o,a,p));s.restore();const h=o.length/2;if(h>e.length){for(l=0;l<h;l++)delete n[o[l]];o.splice(0,h)}return a}function Ut(s,t,e){const i=s.currentDevicePixelRatio,n=e!==0?Math.max(e/2,.5):0;return Math.round((t-n)*i)/i+n}function ln(s,t){!t&&!s||(t=t||s.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,s.width,s.height),t.restore())}function gi(s,t,e,i){To(s,t,e,i,null)}function To(s,t,e,i,n){let o,a,r,l,d,c,u,p;const h=t.pointStyle,m=t.rotation,f=t.radius;let g=(m||0)*Za;if(h&&typeof h=="object"&&(o=h.toString(),o==="[object HTMLImageElement]"||o==="[object HTMLCanvasElement]")){s.save(),s.translate(e,i),s.rotate(g),s.drawImage(h,-h.width/2,-h.height/2,h.width,h.height),s.restore();return}if(!(isNaN(f)||f<=0)){switch(s.beginPath(),h){default:n?s.ellipse(e,i,n/2,f,0,0,H):s.arc(e,i,f,0,H),s.closePath();break;case"triangle":c=n?n/2:f,s.moveTo(e+Math.sin(g)*c,i-Math.cos(g)*f),g+=Qi,s.lineTo(e+Math.sin(g)*c,i-Math.cos(g)*f),g+=Qi,s.lineTo(e+Math.sin(g)*c,i-Math.cos(g)*f),s.closePath();break;case"rectRounded":d=f*.516,l=f-d,a=Math.cos(g+Gt)*l,u=Math.cos(g+Gt)*(n?n/2-d:l),r=Math.sin(g+Gt)*l,p=Math.sin(g+Gt)*(n?n/2-d:l),s.arc(e-u,i-r,d,g-B,g-q),s.arc(e+p,i-a,d,g-q,g),s.arc(e+u,i+r,d,g,g+q),s.arc(e-p,i+a,d,g+q,g+B),s.closePath();break;case"rect":if(!m){l=Math.SQRT1_2*f,c=n?n/2:l,s.rect(e-c,i-l,2*c,2*l);break}g+=Gt;case"rectRot":u=Math.cos(g)*(n?n/2:f),a=Math.cos(g)*f,r=Math.sin(g)*f,p=Math.sin(g)*(n?n/2:f),s.moveTo(e-u,i-r),s.lineTo(e+p,i-a),s.lineTo(e+u,i+r),s.lineTo(e-p,i+a),s.closePath();break;case"crossRot":g+=Gt;case"cross":u=Math.cos(g)*(n?n/2:f),a=Math.cos(g)*f,r=Math.sin(g)*f,p=Math.sin(g)*(n?n/2:f),s.moveTo(e-u,i-r),s.lineTo(e+u,i+r),s.moveTo(e+p,i-a),s.lineTo(e-p,i+a);break;case"star":u=Math.cos(g)*(n?n/2:f),a=Math.cos(g)*f,r=Math.sin(g)*f,p=Math.sin(g)*(n?n/2:f),s.moveTo(e-u,i-r),s.lineTo(e+u,i+r),s.moveTo(e+p,i-a),s.lineTo(e-p,i+a),g+=Gt,u=Math.cos(g)*(n?n/2:f),a=Math.cos(g)*f,r=Math.sin(g)*f,p=Math.sin(g)*(n?n/2:f),s.moveTo(e-u,i-r),s.lineTo(e+u,i+r),s.moveTo(e+p,i-a),s.lineTo(e-p,i+a);break;case"line":a=n?n/2:Math.cos(g)*f,r=Math.sin(g)*f,s.moveTo(e-a,i-r),s.lineTo(e+a,i+r);break;case"dash":s.moveTo(e,i),s.lineTo(e+Math.cos(g)*(n?n/2:f),i+Math.sin(g)*f);break;case!1:s.closePath();break}s.fill(),t.borderWidth>0&&s.stroke()}}function Dt(s,t,e){return e=e||.5,!t||s&&s.x>t.left-e&&s.x<t.right+e&&s.y>t.top-e&&s.y<t.bottom+e}function Ws(s,t){s.save(),s.beginPath(),s.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),s.clip()}function Gs(s){s.restore()}function vr(s,t,e,i,n){if(!t)return s.lineTo(e.x,e.y);if(n==="middle"){const o=(t.x+e.x)/2;s.lineTo(o,t.y),s.lineTo(o,e.y)}else n==="after"!=!!i?s.lineTo(t.x,e.y):s.lineTo(e.x,t.y);s.lineTo(e.x,e.y)}function yr(s,t,e,i){if(!t)return s.lineTo(e.x,e.y);s.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?e.cp2x:e.cp1x,i?e.cp2y:e.cp1y,e.x,e.y)}function wr(s,t){t.translation&&s.translate(t.translation[0],t.translation[1]),T(t.rotation)||s.rotate(t.rotation),t.color&&(s.fillStyle=t.color),t.textAlign&&(s.textAlign=t.textAlign),t.textBaseline&&(s.textBaseline=t.textBaseline)}function kr(s,t,e,i,n){if(n.strikethrough||n.underline){const o=s.measureText(i),a=t-o.actualBoundingBoxLeft,r=t+o.actualBoundingBoxRight,l=e-o.actualBoundingBoxAscent,d=e+o.actualBoundingBoxDescent,c=n.strikethrough?(l+d)/2:d;s.strokeStyle=s.fillStyle,s.beginPath(),s.lineWidth=n.decorationWidth||2,s.moveTo(a,c),s.lineTo(r,c),s.stroke()}}function Sr(s,t){const e=s.fillStyle;s.fillStyle=t.color,s.fillRect(t.left,t.top,t.width,t.height),s.fillStyle=e}function le(s,t,e,i,n,o={}){const a=W(t)?t:[t],r=o.strokeWidth>0&&o.strokeColor!=="";let l,d;for(s.save(),s.font=n.string,wr(s,o),l=0;l<a.length;++l)d=a[l],o.backdrop&&Sr(s,o.backdrop),r&&(o.strokeColor&&(s.strokeStyle=o.strokeColor),T(o.strokeWidth)||(s.lineWidth=o.strokeWidth),s.strokeText(d,e,i,o.maxWidth)),s.fillText(d,e,i,o.maxWidth),kr(s,e,i,d,o),i+=Number(n.lineHeight);s.restore()}function qe(s,t){const{x:e,y:i,w:n,h:o,radius:a}=t;s.arc(e+a.topLeft,i+a.topLeft,a.topLeft,1.5*B,B,!0),s.lineTo(e,i+o-a.bottomLeft),s.arc(e+a.bottomLeft,i+o-a.bottomLeft,a.bottomLeft,B,q,!0),s.lineTo(e+n-a.bottomRight,i+o),s.arc(e+n-a.bottomRight,i+o-a.bottomRight,a.bottomRight,q,0,!0),s.lineTo(e+n,i+a.topRight),s.arc(e+n-a.topRight,i+a.topRight,a.topRight,0,-q,!0),s.lineTo(e+a.topLeft,i)}const _r=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,Ar=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function Cr(s,t){const e=(""+s).match(_r);if(!e||e[1]==="normal")return t*1.2;switch(s=+e[2],e[3]){case"px":return s;case"%":s/=100;break}return t*s}const Er=s=>+s||0;function Li(s,t){const e={},i=O(t),n=i?Object.keys(t):t,o=O(s)?i?a=>R(s[a],s[t[a]]):a=>s[a]:()=>s;for(const a of n)e[a]=Er(o(a));return e}function Oo(s){return Li(s,{top:"y",right:"x",bottom:"y",left:"x"})}function ne(s){return Li(s,["topLeft","topRight","bottomLeft","bottomRight"])}function st(s){const t=Oo(s);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function J(s,t){s=s||{},t=t||U.font;let e=R(s.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let i=R(s.style,t.style);i&&!(""+i).match(Ar)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const n={family:R(s.family,t.family),lineHeight:Cr(R(s.lineHeight,t.lineHeight),e),size:e,style:i,weight:R(s.weight,t.weight),string:""};return n.string=br(n),n}function De(s,t,e,i){let n,o,a;for(n=0,o=s.length;n<o;++n)if(a=s[n],a!==void 0&&a!==void 0)return a}function Mr(s,t,e){const{min:i,max:n}=s,o=ko(t,(n-i)/2),a=(r,l)=>e&&r===0?0:r+l;return{min:a(i,-Math.abs(o)),max:a(n,o)}}function Vt(s,t){return Object.assign(Object.create(s),t)}function Fi(s,t=[""],e,i,n=()=>s[0]){const o=e||s;typeof i>"u"&&(i=Lo("_fallback",s));const a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:s,_rootScopes:o,_fallback:i,_getTarget:n,override:r=>Fi([r,...s],t,o,i)};return new Proxy(a,{deleteProperty(r,l){return delete r[l],delete r._keys,delete s[0][l],!0},get(r,l){return Bo(r,l,()=>Br(l,t,s,r))},getOwnPropertyDescriptor(r,l){return Reflect.getOwnPropertyDescriptor(r._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(s[0])},has(r,l){return cn(r).includes(l)},ownKeys(r){return cn(r)},set(r,l,d){const c=r._storage||(r._storage=n());return r[l]=c[l]=d,delete r._keys,!0}})}function xe(s,t,e,i){const n={_cacheable:!1,_proxy:s,_context:t,_subProxy:e,_stack:new Set,_descriptors:$o(s,i),setContext:o=>xe(s,o,e,i),override:o=>xe(s.override(o),t,e,i)};return new Proxy(n,{deleteProperty(o,a){return delete o[a],delete s[a],!0},get(o,a,r){return Bo(o,a,()=>Dr(o,a,r))},getOwnPropertyDescriptor(o,a){return o._descriptors.allKeys?Reflect.has(s,a)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(s,a)},getPrototypeOf(){return Reflect.getPrototypeOf(s)},has(o,a){return Reflect.has(s,a)},ownKeys(){return Reflect.ownKeys(s)},set(o,a,r){return s[a]=r,delete o[a],!0}})}function $o(s,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:i=t.indexable,_allKeys:n=t.allKeys}=s;return{allKeys:n,scriptable:e,indexable:i,isScriptable:Nt(e)?e:()=>e,isIndexable:Nt(i)?i:()=>i}}const Pr=(s,t)=>s?s+Ti(t):t,Ni=(s,t)=>O(t)&&s!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Bo(s,t,e){if(Object.prototype.hasOwnProperty.call(s,t)||t==="constructor")return s[t];const i=e();return s[t]=i,i}function Dr(s,t,e){const{_proxy:i,_context:n,_subProxy:o,_descriptors:a}=s;let r=i[t];return Nt(r)&&a.isScriptable(t)&&(r=Rr(t,r,s,e)),W(r)&&r.length&&(r=Ir(t,r,s,a.isIndexable)),Ni(t,r)&&(r=xe(r,n,o&&o[t],a)),r}function Rr(s,t,e,i){const{_proxy:n,_context:o,_subProxy:a,_stack:r}=e;if(r.has(s))throw new Error("Recursion detected: "+Array.from(r).join("->")+"->"+s);r.add(s);let l=t(o,a||i);return r.delete(s),Ni(s,l)&&(l=Vi(n._scopes,n,s,l)),l}function Ir(s,t,e,i){const{_proxy:n,_context:o,_subProxy:a,_descriptors:r}=e;if(typeof o.index<"u"&&i(s))return t[o.index%t.length];if(O(t[0])){const l=t,d=n._scopes.filter(c=>c!==l);t=[];for(const c of l){const u=Vi(d,n,s,c);t.push(xe(u,o,a&&a[s],r))}}return t}function jo(s,t,e){return Nt(s)?s(t,e):s}const Tr=(s,t)=>s===!0?t:typeof s=="string"?Ft(t,s):void 0;function Or(s,t,e,i,n){for(const o of t){const a=Tr(e,o);if(a){s.add(a);const r=jo(a._fallback,e,n);if(typeof r<"u"&&r!==e&&r!==i)return r}else if(a===!1&&typeof i<"u"&&e!==i)return null}return!1}function Vi(s,t,e,i){const n=t._rootScopes,o=jo(t._fallback,e,i),a=[...s,...n],r=new Set;r.add(i);let l=dn(r,a,e,o||e,i);return l===null||typeof o<"u"&&o!==e&&(l=dn(r,a,o,l,i),l===null)?!1:Fi(Array.from(r),[""],n,o,()=>$r(t,e,i))}function dn(s,t,e,i,n){for(;e;)e=Or(s,t,e,i,n);return e}function $r(s,t,e){const i=s._getTarget();t in i||(i[t]={});const n=i[t];return W(n)&&O(e)?e:n||{}}function Br(s,t,e,i){let n;for(const o of t)if(n=Lo(Pr(o,s),e),typeof n<"u")return Ni(s,n)?Vi(e,i,s,n):n}function Lo(s,t){for(const e of t){if(!e)continue;const i=e[s];if(typeof i<"u")return i}}function cn(s){let t=s._keys;return t||(t=s._keys=jr(s._scopes)),t}function jr(s){const t=new Set;for(const e of s)for(const i of Object.keys(e).filter(n=>!n.startsWith("_")))t.add(i);return Array.from(t)}function Fo(s,t,e,i){const{iScale:n}=s,{key:o="r"}=this._parsing,a=new Array(i);let r,l,d,c;for(r=0,l=i;r<l;++r)d=r+e,c=t[d],a[r]={r:n.parse(Ft(c,o),d)};return a}const Lr=Number.EPSILON||1e-14,ve=(s,t)=>t<s.length&&!s[t].skip&&s[t],No=s=>s==="x"?"y":"x";function Fr(s,t,e,i){const n=s.skip?t:s,o=t,a=e.skip?t:e,r=hi(o,n),l=hi(a,o);let d=r/(r+l),c=l/(r+l);d=isNaN(d)?0:d,c=isNaN(c)?0:c;const u=i*d,p=i*c;return{previous:{x:o.x-u*(a.x-n.x),y:o.y-u*(a.y-n.y)},next:{x:o.x+p*(a.x-n.x),y:o.y+p*(a.y-n.y)}}}function Nr(s,t,e){const i=s.length;let n,o,a,r,l,d=ve(s,0);for(let c=0;c<i-1;++c)if(l=d,d=ve(s,c+1),!(!l||!d)){if(Le(t[c],0,Lr)){e[c]=e[c+1]=0;continue}n=e[c]/t[c],o=e[c+1]/t[c],r=Math.pow(n,2)+Math.pow(o,2),!(r<=9)&&(a=3/Math.sqrt(r),e[c]=n*a*t[c],e[c+1]=o*a*t[c])}}function Vr(s,t,e="x"){const i=No(e),n=s.length;let o,a,r,l=ve(s,0);for(let d=0;d<n;++d){if(a=r,r=l,l=ve(s,d+1),!r)continue;const c=r[e],u=r[i];a&&(o=(c-a[e])/3,r[`cp1${e}`]=c-o,r[`cp1${i}`]=u-o*t[d]),l&&(o=(l[e]-c)/3,r[`cp2${e}`]=c+o,r[`cp2${i}`]=u+o*t[d])}}function Hr(s,t="x"){const e=No(t),i=s.length,n=Array(i).fill(0),o=Array(i);let a,r,l,d=ve(s,0);for(a=0;a<i;++a)if(r=l,l=d,d=ve(s,a+1),!!l){if(d){const c=d[t]-l[t];n[a]=c!==0?(d[e]-l[e])/c:0}o[a]=r?d?kt(n[a-1])!==kt(n[a])?0:(n[a-1]+n[a])/2:n[a-1]:n[a]}Nr(s,n,o),Vr(s,o,t)}function as(s,t,e){return Math.max(Math.min(s,e),t)}function zr(s,t){let e,i,n,o,a,r=Dt(s[0],t);for(e=0,i=s.length;e<i;++e)a=o,o=r,r=e<i-1&&Dt(s[e+1],t),o&&(n=s[e],a&&(n.cp1x=as(n.cp1x,t.left,t.right),n.cp1y=as(n.cp1y,t.top,t.bottom)),r&&(n.cp2x=as(n.cp2x,t.left,t.right),n.cp2y=as(n.cp2y,t.top,t.bottom)))}function Wr(s,t,e,i,n){let o,a,r,l;if(t.spanGaps&&(s=s.filter(d=>!d.skip)),t.cubicInterpolationMode==="monotone")Hr(s,n);else{let d=i?s[s.length-1]:s[0];for(o=0,a=s.length;o<a;++o)r=s[o],l=Fr(d,r,s[Math.min(o+1,a-(i?0:1))%a],t.tension),r.cp1x=l.previous.x,r.cp1y=l.previous.y,r.cp2x=l.next.x,r.cp2y=l.next.y,d=r}t.capBezierPoints&&zr(s,e)}function Hi(){return typeof window<"u"&&typeof document<"u"}function zi(s){let t=s.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function Ls(s,t,e){let i;return typeof s=="string"?(i=parseInt(s,10),s.indexOf("%")!==-1&&(i=i/100*t.parentNode[e])):i=s,i}const Us=s=>s.ownerDocument.defaultView.getComputedStyle(s,null);function Gr(s,t){return Us(s).getPropertyValue(t)}const Ur=["top","right","bottom","left"];function oe(s,t,e){const i={};e=e?"-"+e:"";for(let n=0;n<4;n++){const o=Ur[n];i[o]=parseFloat(s[t+"-"+o+e])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const Kr=(s,t,e)=>(s>0||t>0)&&(!e||!e.shadowRoot);function qr(s,t){const e=s.touches,i=e&&e.length?e[0]:s,{offsetX:n,offsetY:o}=i;let a=!1,r,l;if(Kr(n,o,s.target))r=n,l=o;else{const d=t.getBoundingClientRect();r=i.clientX-d.left,l=i.clientY-d.top,a=!0}return{x:r,y:l,box:a}}function Qt(s,t){if("native"in s)return s;const{canvas:e,currentDevicePixelRatio:i}=t,n=Us(e),o=n.boxSizing==="border-box",a=oe(n,"padding"),r=oe(n,"border","width"),{x:l,y:d,box:c}=qr(s,e),u=a.left+(c&&r.left),p=a.top+(c&&r.top);let{width:h,height:m}=t;return o&&(h-=a.width+r.width,m-=a.height+r.height),{x:Math.round((l-u)/h*e.width/i),y:Math.round((d-p)/m*e.height/i)}}function Yr(s,t,e){let i,n;if(t===void 0||e===void 0){const o=s&&zi(s);if(!o)t=s.clientWidth,e=s.clientHeight;else{const a=o.getBoundingClientRect(),r=Us(o),l=oe(r,"border","width"),d=oe(r,"padding");t=a.width-d.width-l.width,e=a.height-d.height-l.height,i=Ls(r.maxWidth,o,"clientWidth"),n=Ls(r.maxHeight,o,"clientHeight")}}return{width:t,height:e,maxWidth:i||Bs,maxHeight:n||Bs}}const Ot=s=>Math.round(s*10)/10;function Jr(s,t,e,i){const n=Us(s),o=oe(n,"margin"),a=Ls(n.maxWidth,s,"clientWidth")||Bs,r=Ls(n.maxHeight,s,"clientHeight")||Bs,l=Yr(s,t,e);let{width:d,height:c}=l;if(n.boxSizing==="content-box"){const p=oe(n,"border","width"),h=oe(n,"padding");d-=h.width+p.width,c-=h.height+p.height}return d=Math.max(0,d-o.width),c=Math.max(0,i?d/i:c-o.height),d=Ot(Math.min(d,a,l.maxWidth)),c=Ot(Math.min(c,r,l.maxHeight)),d&&!c&&(c=Ot(d/2)),(t!==void 0||e!==void 0)&&i&&l.height&&c>l.height&&(c=l.height,d=Ot(Math.floor(c*i))),{width:d,height:c}}function un(s,t,e){const i=t||1,n=Ot(s.height*i),o=Ot(s.width*i);s.height=Ot(s.height),s.width=Ot(s.width);const a=s.canvas;return a.style&&(e||!a.style.height&&!a.style.width)&&(a.style.height=`${s.height}px`,a.style.width=`${s.width}px`),s.currentDevicePixelRatio!==i||a.height!==n||a.width!==o?(s.currentDevicePixelRatio=i,a.height=n,a.width=o,s.ctx.setTransform(i,0,0,i,0,0),!0):!1}const Xr=function(){let s=!1;try{const t={get passive(){return s=!0,!1}};Hi()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return s}();function pn(s,t){const e=Gr(s,t),i=e&&e.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function te(s,t,e,i){return{x:s.x+e*(t.x-s.x),y:s.y+e*(t.y-s.y)}}function Zr(s,t,e,i){return{x:s.x+e*(t.x-s.x),y:i==="middle"?e<.5?s.y:t.y:i==="after"?e<1?s.y:t.y:e>0?t.y:s.y}}function Qr(s,t,e,i){const n={x:s.cp2x,y:s.cp2y},o={x:t.cp1x,y:t.cp1y},a=te(s,n,e),r=te(n,o,e),l=te(o,t,e),d=te(a,r,e),c=te(r,l,e);return te(d,c,e)}const tl=function(s,t){return{x(e){return s+s+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,i){return e-i},leftForLtr(e,i){return e-i}}},el=function(){return{x(s){return s},setWidth(s){},textAlign(s){return s},xPlus(s,t){return s+t},leftForLtr(s,t){return s}}};function me(s,t,e){return s?tl(t,e):el()}function Vo(s,t){let e,i;(t==="ltr"||t==="rtl")&&(e=s.canvas.style,i=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),s.prevTextDirection=i)}function Ho(s,t){t!==void 0&&(delete s.prevTextDirection,s.canvas.style.setProperty("direction",t[0],t[1]))}function zo(s){return s==="angle"?{between:Ke,compare:sr,normalize:tt}:{between:Mt,compare:(t,e)=>t-e,normalize:t=>t}}function hn({start:s,end:t,count:e,loop:i,style:n}){return{start:s%e,end:t%e,loop:i&&(t-s+1)%e===0,style:n}}function sl(s,t,e){const{property:i,start:n,end:o}=e,{between:a,normalize:r}=zo(i),l=t.length;let{start:d,end:c,loop:u}=s,p,h;if(u){for(d+=l,c+=l,p=0,h=l;p<h&&a(r(t[d%l][i]),n,o);++p)d--,c--;d%=l,c%=l}return c<d&&(c+=l),{start:d,end:c,loop:u,style:s.style}}function Wo(s,t,e){if(!e)return[s];const{property:i,start:n,end:o}=e,a=t.length,{compare:r,between:l,normalize:d}=zo(i),{start:c,end:u,loop:p,style:h}=sl(s,t,e),m=[];let f=!1,g=null,x,y,k;const b=()=>l(n,k,x)&&r(n,k)!==0,w=()=>r(o,x)===0||l(o,k,x),S=()=>f||b(),A=()=>!f||w();for(let C=c,_=c;C<=u;++C)y=t[C%a],!y.skip&&(x=d(y[i]),x!==k&&(f=l(x,n,o),g===null&&S()&&(g=r(x,n)===0?C:_),g!==null&&A()&&(m.push(hn({start:g,end:C,loop:p,count:a,style:h})),g=null),_=C,k=x));return g!==null&&m.push(hn({start:g,end:u,loop:p,count:a,style:h})),m}function Go(s,t){const e=[],i=s.segments;for(let n=0;n<i.length;n++){const o=Wo(i[n],s.points,t);o.length&&e.push(...o)}return e}function il(s,t,e,i){let n=0,o=t-1;if(e&&!i)for(;n<t&&!s[n].skip;)n++;for(;n<t&&s[n].skip;)n++;for(n%=t,e&&(o+=n);o>n&&s[o%t].skip;)o--;return o%=t,{start:n,end:o}}function nl(s,t,e,i){const n=s.length,o=[];let a=t,r=s[t],l;for(l=t+1;l<=e;++l){const d=s[l%n];d.skip||d.stop?r.skip||(i=!1,o.push({start:t%n,end:(l-1)%n,loop:i}),t=a=d.stop?l:null):(a=l,r.skip&&(t=l)),r=d}return a!==null&&o.push({start:t%n,end:a%n,loop:i}),o}function ol(s,t){const e=s.points,i=s.options.spanGaps,n=e.length;if(!n)return[];const o=!!s._loop,{start:a,end:r}=il(e,n,o,i);if(i===!0)return fn(s,[{start:a,end:r,loop:o}],e,t);const l=r<a?r+n:r,d=!!s._fullLoop&&a===0&&r===n-1;return fn(s,nl(e,a,l,d),e,t)}function fn(s,t,e,i){return!i||!i.setContext||!e?t:al(s,t,e,i)}function al(s,t,e,i){const n=s._chart.getContext(),o=gn(s.options),{_datasetIndex:a,options:{spanGaps:r}}=s,l=e.length,d=[];let c=o,u=t[0].start,p=u;function h(m,f,g,x){const y=r?-1:1;if(m!==f){for(m+=l;e[m%l].skip;)m-=y;for(;e[f%l].skip;)f+=y;m%l!==f%l&&(d.push({start:m%l,end:f%l,loop:g,style:x}),c=x,u=f%l)}}for(const m of t){u=r?u:m.start;let f=e[u%l],g;for(p=u+1;p<=m.end;p++){const x=e[p%l];g=gn(i.setContext(Vt(n,{type:"segment",p0:f,p1:x,p0DataIndex:(p-1)%l,p1DataIndex:p%l,datasetIndex:a}))),rl(g,c)&&h(u,p-1,m.loop,c),f=x,c=g}u<p-1&&h(u,p-1,m.loop,c)}return d}function gn(s){return{backgroundColor:s.backgroundColor,borderCapStyle:s.borderCapStyle,borderDash:s.borderDash,borderDashOffset:s.borderDashOffset,borderJoinStyle:s.borderJoinStyle,borderWidth:s.borderWidth,borderColor:s.borderColor}}function rl(s,t){if(!t)return!1;const e=[],i=function(n,o){return ji(o)?(e.includes(o)||e.push(o),e.indexOf(o)):o};return JSON.stringify(s,i)!==JSON.stringify(t,i)}function rs(s,t,e){return s.options.clip?s[e]:t[e]}function ll(s,t){const{xScale:e,yScale:i}=s;return e&&i?{left:rs(e,t,"left"),right:rs(e,t,"right"),top:rs(i,t,"top"),bottom:rs(i,t,"bottom")}:t}function Uo(s,t){const e=t._clip;if(e.disabled)return!1;const i=ll(t,s.chartArea);return{left:e.left===!1?0:i.left-(e.left===!0?0:e.left),right:e.right===!1?s.width:i.right+(e.right===!0?0:e.right),top:e.top===!1?0:i.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?s.height:i.bottom+(e.bottom===!0?0:e.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class dl{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,i,n){const o=e.listeners[n],a=e.duration;o.forEach(r=>r({chart:t,initial:e.initial,numSteps:a,currentStep:Math.min(i-e.start,a)}))}_refresh(){this._request||(this._running=!0,this._request=Mo.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((i,n)=>{if(!i.running||!i.items.length)return;const o=i.items;let a=o.length-1,r=!1,l;for(;a>=0;--a)l=o[a],l._active?(l._total>i.duration&&(i.duration=l._total),l.tick(t),r=!0):(o[a]=o[o.length-1],o.pop());r&&(n.draw(),this._notify(n,i,t,"progress")),o.length||(i.running=!1,this._notify(n,i,t,"complete"),i.initial=!1),e+=o.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let i=e.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,i)),i}listen(t,e,i){this._getAnims(t).listeners[e].push(i)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((i,n)=>Math.max(i,n._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const i=e.items;let n=i.length-1;for(;n>=0;--n)i[n].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var At=new dl;const mn="transparent",cl={boolean(s,t,e){return e>.5?t:s},color(s,t,e){const i=an(s||mn),n=i.valid&&an(t||mn);return n&&n.valid?n.mix(i,e).hexString():t},number(s,t,e){return s+(t-s)*e}};class ul{constructor(t,e,i,n){const o=e[i];n=De([t.to,n,o,t.from]);const a=De([t.from,o,n]);this._active=!0,this._fn=t.fn||cl[t.type||typeof a],this._easing=Fe[t.easing]||Fe.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=i,this._from=a,this._to=n,this._promises=void 0}active(){return this._active}update(t,e,i){if(this._active){this._notify(!1);const n=this._target[this._prop],o=i-this._start,a=this._duration-o;this._start=i,this._duration=Math.floor(Math.max(a,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=De([t.to,e,n,t.from]),this._from=De([t.from,n,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,i=this._duration,n=this._prop,o=this._from,a=this._loop,r=this._to;let l;if(this._active=o!==r&&(a||e<i),!this._active){this._target[n]=r,this._notify(!0);return}if(e<0){this._target[n]=o;return}l=e/i%2,l=a&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[n]=this._fn(o,r,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,i)=>{t.push({res:e,rej:i})})}_notify(t){const e=t?"res":"rej",i=this._promises||[];for(let n=0;n<i.length;n++)i[n][e]()}}class Ko{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!O(t))return;const e=Object.keys(U.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(n=>{const o=t[n];if(!O(o))return;const a={};for(const r of e)a[r]=o[r];(W(o.properties)&&o.properties||[n]).forEach(r=>{(r===n||!i.has(r))&&i.set(r,a)})})}_animateOptions(t,e){const i=e.options,n=hl(t,i);if(!n)return[];const o=this._createAnimations(n,i);return i.$shared&&pl(t.options.$animations,i).then(()=>{t.options=i},()=>{}),o}_createAnimations(t,e){const i=this._properties,n=[],o=t.$animations||(t.$animations={}),a=Object.keys(e),r=Date.now();let l;for(l=a.length-1;l>=0;--l){const d=a[l];if(d.charAt(0)==="$")continue;if(d==="options"){n.push(...this._animateOptions(t,e));continue}const c=e[d];let u=o[d];const p=i.get(d);if(u)if(p&&u.active()){u.update(p,c,r);continue}else u.cancel();if(!p||!p.duration){t[d]=c;continue}o[d]=u=new ul(p,t,d,c),n.push(u)}return n}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const i=this._createAnimations(t,e);if(i.length)return At.add(this._chart,i),!0}}function pl(s,t){const e=[],i=Object.keys(t);for(let n=0;n<i.length;n++){const o=s[i[n]];o&&o.active()&&e.push(o.wait())}return Promise.all(e)}function hl(s,t){if(!t)return;let e=s.options;if(!e){s.options=t;return}return e.$shared&&(s.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function bn(s,t){const e=s&&s.options||{},i=e.reverse,n=e.min===void 0?t:0,o=e.max===void 0?t:0;return{start:i?o:n,end:i?n:o}}function fl(s,t,e){if(e===!1)return!1;const i=bn(s,e),n=bn(t,e);return{top:n.end,right:i.end,bottom:n.start,left:i.start}}function gl(s){let t,e,i,n;return O(s)?(t=s.top,e=s.right,i=s.bottom,n=s.left):t=e=i=n=s,{top:t,right:e,bottom:i,left:n,disabled:s===!1}}function qo(s,t){const e=[],i=s._getSortedDatasetMetas(t);let n,o;for(n=0,o=i.length;n<o;++n)e.push(i[n].index);return e}function xn(s,t,e,i={}){const n=s.keys,o=i.mode==="single";let a,r,l,d;if(t===null)return;let c=!1;for(a=0,r=n.length;a<r;++a){if(l=+n[a],l===e){if(c=!0,i.all)continue;break}d=s.values[l],K(d)&&(o||t===0||kt(t)===kt(d))&&(t+=d)}return!c&&!i.all?0:t}function ml(s,t){const{iScale:e,vScale:i}=t,n=e.axis==="x"?"x":"y",o=i.axis==="x"?"x":"y",a=Object.keys(s),r=new Array(a.length);let l,d,c;for(l=0,d=a.length;l<d;++l)c=a[l],r[l]={[n]:c,[o]:s[c]};return r}function ti(s,t){const e=s&&s.options.stacked;return e||e===void 0&&t.stack!==void 0}function bl(s,t,e){return`${s.id}.${t.id}.${e.stack||e.type}`}function xl(s){const{min:t,max:e,minDefined:i,maxDefined:n}=s.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:n?e:Number.POSITIVE_INFINITY}}function vl(s,t,e){const i=s[t]||(s[t]={});return i[e]||(i[e]={})}function vn(s,t,e,i){for(const n of t.getMatchingVisibleMetas(i).reverse()){const o=s[n.index];if(e&&o>0||!e&&o<0)return n.index}return null}function yn(s,t){const{chart:e,_cachedMeta:i}=s,n=e._stacks||(e._stacks={}),{iScale:o,vScale:a,index:r}=i,l=o.axis,d=a.axis,c=bl(o,a,i),u=t.length;let p;for(let h=0;h<u;++h){const m=t[h],{[l]:f,[d]:g}=m,x=m._stacks||(m._stacks={});p=x[d]=vl(n,c,f),p[r]=g,p._top=vn(p,a,!0,i.type),p._bottom=vn(p,a,!1,i.type);const y=p._visualValues||(p._visualValues={});y[r]=g}}function ei(s,t){const e=s.scales;return Object.keys(e).filter(i=>e[i].axis===t).shift()}function yl(s,t){return Vt(s,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function wl(s,t,e){return Vt(s,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function ke(s,t){const e=s.controller.index,i=s.vScale&&s.vScale.axis;if(i){t=t||s._parsed;for(const n of t){const o=n._stacks;if(!o||o[i]===void 0||o[i][e]===void 0)return;delete o[i][e],o[i]._visualValues!==void 0&&o[i]._visualValues[e]!==void 0&&delete o[i]._visualValues[e]}}}const si=s=>s==="reset"||s==="none",wn=(s,t)=>t?s:Object.assign({},s),kl=(s,t,e)=>s&&!t.hidden&&t._stacked&&{keys:qo(e,!0),values:null};class bt{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=ti(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&ke(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,i=this.getDataset(),n=(u,p,h,m)=>u==="x"?p:u==="r"?m:h,o=e.xAxisID=R(i.xAxisID,ei(t,"x")),a=e.yAxisID=R(i.yAxisID,ei(t,"y")),r=e.rAxisID=R(i.rAxisID,ei(t,"r")),l=e.indexAxis,d=e.iAxisID=n(l,o,a,r),c=e.vAxisID=n(l,a,o,r);e.xScale=this.getScaleForId(o),e.yScale=this.getScaleForId(a),e.rScale=this.getScaleForId(r),e.iScale=this.getScaleForId(d),e.vScale=this.getScaleForId(c)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&sn(this._data,this),t._stacked&&ke(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),i=this._data;if(O(e)){const n=this._cachedMeta;this._data=ml(e,n)}else if(i!==e){if(i){sn(i,this);const n=this._cachedMeta;ke(n),n._parsed=[]}e&&Object.isExtensible(e)&&ar(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,i=this.getDataset();let n=!1;this._dataCheck();const o=e._stacked;e._stacked=ti(e.vScale,e),e.stack!==i.stack&&(n=!0,ke(e),e.stack=i.stack),this._resyncElements(t),(n||o!==e._stacked)&&(yn(this,e._parsed),e._stacked=ti(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:i,_data:n}=this,{iScale:o,_stacked:a}=i,r=o.axis;let l=t===0&&e===n.length?!0:i._sorted,d=t>0&&i._parsed[t-1],c,u,p;if(this._parsing===!1)i._parsed=n,i._sorted=!0,p=n;else{W(n[t])?p=this.parseArrayData(i,n,t,e):O(n[t])?p=this.parseObjectData(i,n,t,e):p=this.parsePrimitiveData(i,n,t,e);const h=()=>u[r]===null||d&&u[r]<d[r];for(c=0;c<e;++c)i._parsed[c+t]=u=p[c],l&&(h()&&(l=!1),d=u);i._sorted=l}a&&yn(this,p)}parsePrimitiveData(t,e,i,n){const{iScale:o,vScale:a}=t,r=o.axis,l=a.axis,d=o.getLabels(),c=o===a,u=new Array(n);let p,h,m;for(p=0,h=n;p<h;++p)m=p+i,u[p]={[r]:c||o.parse(d[m],m),[l]:a.parse(e[m],m)};return u}parseArrayData(t,e,i,n){const{xScale:o,yScale:a}=t,r=new Array(n);let l,d,c,u;for(l=0,d=n;l<d;++l)c=l+i,u=e[c],r[l]={x:o.parse(u[0],c),y:a.parse(u[1],c)};return r}parseObjectData(t,e,i,n){const{xScale:o,yScale:a}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,d=new Array(n);let c,u,p,h;for(c=0,u=n;c<u;++c)p=c+i,h=e[p],d[c]={x:o.parse(Ft(h,r),p),y:a.parse(Ft(h,l),p)};return d}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,i){const n=this.chart,o=this._cachedMeta,a=e[t.axis],r={keys:qo(n,!0),values:e._stacks[t.axis]._visualValues};return xn(r,a,o.index,{mode:i})}updateRangeFromParsed(t,e,i,n){const o=i[e.axis];let a=o===null?NaN:o;const r=n&&i._stacks[e.axis];n&&r&&(n.values=r,a=xn(n,o,this._cachedMeta.index)),t.min=Math.min(t.min,a),t.max=Math.max(t.max,a)}getMinMax(t,e){const i=this._cachedMeta,n=i._parsed,o=i._sorted&&t===i.iScale,a=n.length,r=this._getOtherScale(t),l=kl(e,i,this.chart),d={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:c,max:u}=xl(r);let p,h;function m(){h=n[p];const f=h[r.axis];return!K(h[t.axis])||c>f||u<f}for(p=0;p<a&&!(!m()&&(this.updateRangeFromParsed(d,t,h,l),o));++p);if(o){for(p=a-1;p>=0;--p)if(!m()){this.updateRangeFromParsed(d,t,h,l);break}}return d}getAllParsedValues(t){const e=this._cachedMeta._parsed,i=[];let n,o,a;for(n=0,o=e.length;n<o;++n)a=e[n][t.axis],K(a)&&i.push(a);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,i=e.iScale,n=e.vScale,o=this.getParsed(t);return{label:i?""+i.getLabelForValue(o[i.axis]):"",value:n?""+n.getLabelForValue(o[n.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=gl(R(this.options.clip,fl(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,i=this._cachedMeta,n=i.data||[],o=e.chartArea,a=[],r=this._drawStart||0,l=this._drawCount||n.length-r,d=this.options.drawActiveElementsOnTop;let c;for(i.dataset&&i.dataset.draw(t,o,r,l),c=r;c<r+l;++c){const u=n[c];u.hidden||(u.active&&d?a.push(u):u.draw(t,o))}for(c=0;c<a.length;++c)a[c].draw(t,o)}getStyle(t,e){const i=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,e,i){const n=this.getDataset();let o;if(t>=0&&t<this._cachedMeta.data.length){const a=this._cachedMeta.data[t];o=a.$context||(a.$context=wl(this.getContext(),t,a)),o.parsed=this.getParsed(t),o.raw=n.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=yl(this.chart.getContext(),this.index)),o.dataset=n,o.index=o.datasetIndex=this.index;return o.active=!!e,o.mode=i,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",i){const n=e==="active",o=this._cachedDataOpts,a=t+"-"+e,r=o[a],l=this.enableOptionSharing&&Ue(i);if(r)return wn(r,l);const d=this.chart.config,c=d.datasetElementScopeKeys(this._type,t),u=n?[`${t}Hover`,"hover",t,""]:[t,""],p=d.getOptionScopes(this.getDataset(),c),h=Object.keys(U.elements[t]),m=()=>this.getContext(i,n,e),f=d.resolveNamedOptions(p,h,m,u);return f.$shared&&(f.$shared=l,o[a]=Object.freeze(wn(f,l))),f}_resolveAnimations(t,e,i){const n=this.chart,o=this._cachedDataOpts,a=`animation-${e}`,r=o[a];if(r)return r;let l;if(n.options.animation!==!1){const c=this.chart.config,u=c.datasetAnimationScopeKeys(this._type,e),p=c.getOptionScopes(this.getDataset(),u);l=c.createResolver(p,this.getContext(t,i,e))}const d=new Ko(n,l&&l.animations);return l&&l._cacheable&&(o[a]=Object.freeze(d)),d}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||si(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const i=this.resolveDataElementOptions(t,e),n=this._sharedOptions,o=this.getSharedOptions(i),a=this.includeOptions(e,o)||o!==n;return this.updateSharedOptions(o,e,i),{sharedOptions:o,includeOptions:a}}updateElement(t,e,i,n){si(n)?Object.assign(t,i):this._resolveAnimations(e,n).update(t,i)}updateSharedOptions(t,e,i){t&&!si(e)&&this._resolveAnimations(void 0,e).update(t,i)}_setStyle(t,e,i,n){t.active=n;const o=this.getStyle(e,n);this._resolveAnimations(e,i,n).update(t,{options:!n&&this.getSharedOptions(o)||o})}removeHoverStyle(t,e,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,e,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,i=this._cachedMeta.data;for(const[r,l,d]of this._syncList)this[r](l,d);this._syncList=[];const n=i.length,o=e.length,a=Math.min(o,n);a&&this.parse(0,a),o>n?this._insertElements(n,o-n,t):o<n&&this._removeElements(o,n-o)}_insertElements(t,e,i=!0){const n=this._cachedMeta,o=n.data,a=t+e;let r;const l=d=>{for(d.length+=e,r=d.length-1;r>=a;r--)d[r]=d[r-e]};for(l(o),r=t;r<a;++r)o[r]=new this.dataElementType;this._parsing&&l(n._parsed),this.parse(t,e),i&&this.updateElements(o,t,e,"reset")}updateElements(t,e,i,n){}_removeElements(t,e){const i=this._cachedMeta;if(this._parsing){const n=i._parsed.splice(t,e);i._stacked&&ke(i,n)}i.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,i,n]=t;this[e](i,n)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}E(bt,"defaults",{}),E(bt,"datasetElementType",null),E(bt,"dataElementType",null);function Sl(s,t){if(!s._cache.$bar){const e=s.getMatchingVisibleMetas(t);let i=[];for(let n=0,o=e.length;n<o;n++)i=i.concat(e[n].controller.getAllParsedValues(s));s._cache.$bar=Eo(i.sort((n,o)=>n-o))}return s._cache.$bar}function _l(s){const t=s.iScale,e=Sl(t,s.type);let i=t._length,n,o,a,r;const l=()=>{a===32767||a===-32768||(Ue(r)&&(i=Math.min(i,Math.abs(a-r)||i)),r=a)};for(n=0,o=e.length;n<o;++n)a=t.getPixelForValue(e[n]),l();for(r=void 0,n=0,o=t.ticks.length;n<o;++n)a=t.getPixelForTick(n),l();return i}function Al(s,t,e,i){const n=e.barThickness;let o,a;return T(n)?(o=t.min*e.categoryPercentage,a=e.barPercentage):(o=n*i,a=1),{chunk:o/i,ratio:a,start:t.pixels[s]-o/2}}function Cl(s,t,e,i){const n=t.pixels,o=n[s];let a=s>0?n[s-1]:null,r=s<n.length-1?n[s+1]:null;const l=e.categoryPercentage;a===null&&(a=o-(r===null?t.end-t.start:r-o)),r===null&&(r=o+o-a);const d=o-(o-Math.min(a,r))/2*l;return{chunk:Math.abs(r-a)/2*l/i,ratio:e.barPercentage,start:d}}function El(s,t,e,i){const n=e.parse(s[0],i),o=e.parse(s[1],i),a=Math.min(n,o),r=Math.max(n,o);let l=a,d=r;Math.abs(a)>Math.abs(r)&&(l=r,d=a),t[e.axis]=d,t._custom={barStart:l,barEnd:d,start:n,end:o,min:a,max:r}}function Yo(s,t,e,i){return W(s)?El(s,t,e,i):t[e.axis]=e.parse(s,i),t}function kn(s,t,e,i){const n=s.iScale,o=s.vScale,a=n.getLabels(),r=n===o,l=[];let d,c,u,p;for(d=e,c=e+i;d<c;++d)p=t[d],u={},u[n.axis]=r||n.parse(a[d],d),l.push(Yo(p,u,o,d));return l}function ii(s){return s&&s.barStart!==void 0&&s.barEnd!==void 0}function Ml(s,t,e){return s!==0?kt(s):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function Pl(s){let t,e,i,n,o;return s.horizontal?(t=s.base>s.x,e="left",i="right"):(t=s.base<s.y,e="bottom",i="top"),t?(n="end",o="start"):(n="start",o="end"),{start:e,end:i,reverse:t,top:n,bottom:o}}function Dl(s,t,e,i){let n=t.borderSkipped;const o={};if(!n){s.borderSkipped=o;return}if(n===!0){s.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:a,end:r,reverse:l,top:d,bottom:c}=Pl(s);n==="middle"&&e&&(s.enableBorderRadius=!0,(e._top||0)===i?n=d:(e._bottom||0)===i?n=c:(o[Sn(c,a,r,l)]=!0,n=d)),o[Sn(n,a,r,l)]=!0,s.borderSkipped=o}function Sn(s,t,e,i){return i?(s=Rl(s,t,e),s=_n(s,e,t)):s=_n(s,t,e),s}function Rl(s,t,e){return s===t?e:s===e?t:s}function _n(s,t,e){return s==="start"?t:s==="end"?e:s}function Il(s,{inflateAmount:t},e){s.inflateAmount=t==="auto"?e===1?.33:0:t}class ws extends bt{parsePrimitiveData(t,e,i,n){return kn(t,e,i,n)}parseArrayData(t,e,i,n){return kn(t,e,i,n)}parseObjectData(t,e,i,n){const{iScale:o,vScale:a}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,d=o.axis==="x"?r:l,c=a.axis==="x"?r:l,u=[];let p,h,m,f;for(p=i,h=i+n;p<h;++p)f=e[p],m={},m[o.axis]=o.parse(Ft(f,d),p),u.push(Yo(Ft(f,c),m,a,p));return u}updateRangeFromParsed(t,e,i,n){super.updateRangeFromParsed(t,e,i,n);const o=i._custom;o&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,o.min),t.max=Math.max(t.max,o.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:i,vScale:n}=e,o=this.getParsed(t),a=o._custom,r=ii(a)?"["+a.start+", "+a.end+"]":""+n.getLabelForValue(o[n.axis]);return{label:""+i.getLabelForValue(o[i.axis]),value:r}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,i,n){const o=n==="reset",{index:a,_cachedMeta:{vScale:r}}=this,l=r.getBasePixel(),d=r.isHorizontal(),c=this._getRuler(),{sharedOptions:u,includeOptions:p}=this._getSharedOptions(e,n);for(let h=e;h<e+i;h++){const m=this.getParsed(h),f=o||T(m[r.axis])?{base:l,head:l}:this._calculateBarValuePixels(h),g=this._calculateBarIndexPixels(h,c),x=(m._stacks||{})[r.axis],y={horizontal:d,base:f.base,enableBorderRadius:!x||ii(m._custom)||a===x._top||a===x._bottom,x:d?f.head:g.center,y:d?g.center:f.head,height:d?g.size:Math.abs(f.size),width:d?Math.abs(f.size):g.size};p&&(y.options=u||this.resolveDataElementOptions(h,t[h].active?"active":n));const k=y.options||t[h].options;Dl(y,k,x,a),Il(y,k,c.ratio),this.updateElement(t[h],h,y,n)}}_getStacks(t,e){const{iScale:i}=this._cachedMeta,n=i.getMatchingVisibleMetas(this._type).filter(c=>c.controller.options.grouped),o=i.options.stacked,a=[],r=this._cachedMeta.controller.getParsed(e),l=r&&r[i.axis],d=c=>{const u=c._parsed.find(h=>h[i.axis]===l),p=u&&u[c.vScale.axis];if(T(p)||isNaN(p))return!0};for(const c of n)if(!(e!==void 0&&d(c))&&((o===!1||a.indexOf(c.stack)===-1||o===void 0&&c.stack===void 0)&&a.push(c.stack),c.index===t))break;return a.length||a.push(void 0),a}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===e).shift()}_getAxis(){const t={},e=this.getFirstScaleIdForIndexAxis();for(const i of this.chart.data.datasets)t[R(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,i){const n=this._getStacks(t,i),o=e!==void 0?n.indexOf(e):-1;return o===-1?n.length-1:o}_getRuler(){const t=this.options,e=this._cachedMeta,i=e.iScale,n=[];let o,a;for(o=0,a=e.data.length;o<a;++o)n.push(i.getPixelForValue(this.getParsed(o)[i.axis],o));const r=t.barThickness;return{min:r||_l(e),pixels:n,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:r?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:i,index:n},options:{base:o,minBarLength:a}}=this,r=o||0,l=this.getParsed(t),d=l._custom,c=ii(d);let u=l[e.axis],p=0,h=i?this.applyStack(e,l,i):u,m,f;h!==u&&(p=h-u,h=u),c&&(u=d.barStart,h=d.barEnd-d.barStart,u!==0&&kt(u)!==kt(d.barEnd)&&(p=0),p+=u);const g=!T(o)&&!c?o:p;let x=e.getPixelForValue(g);if(this.chart.getDataVisibility(t)?m=e.getPixelForValue(p+h):m=x,f=m-x,Math.abs(f)<a){f=Ml(f,e,r)*a,u===r&&(x-=f/2);const y=e.getPixelForDecimal(0),k=e.getPixelForDecimal(1),b=Math.min(y,k),w=Math.max(y,k);x=Math.max(Math.min(x,w),b),m=x+f,i&&!c&&(l._stacks[e.axis]._visualValues[n]=e.getValueForPixel(m)-e.getValueForPixel(x))}if(x===e.getPixelForValue(r)){const y=kt(f)*e.getLineWidthForValue(r)/2;x+=y,f-=y}return{size:f,base:x,head:m,center:m+f/2}}_calculateBarIndexPixels(t,e){const i=e.scale,n=this.options,o=n.skipNull,a=R(n.maxBarThickness,1/0);let r,l;const d=this._getAxisCount();if(e.grouped){const c=o?this._getStackCount(t):e.stackCount,u=n.barThickness==="flex"?Cl(t,e,n,c*d):Al(t,e,n,c*d),p=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,h=this._getAxis().indexOf(R(p,this.getFirstScaleIdForIndexAxis())),m=this._getStackIndex(this.index,this._cachedMeta.stack,o?t:void 0)+h;r=u.start+u.chunk*m+u.chunk/2,l=Math.min(a,u.chunk*u.ratio)}else r=i.getPixelForValue(this.getParsed(t)[i.axis],t),l=Math.min(a,e.min*e.ratio);return{base:r-l/2,head:r+l/2,center:r,size:l}}draw(){const t=this._cachedMeta,e=t.vScale,i=t.data,n=i.length;let o=0;for(;o<n;++o)this.getParsed(o)[e.axis]!==null&&!i[o].hidden&&i[o].draw(this._ctx)}}E(ws,"id","bar"),E(ws,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),E(ws,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class ks extends bt{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,i,n){const o=super.parsePrimitiveData(t,e,i,n);for(let a=0;a<o.length;a++)o[a]._custom=this.resolveDataElementOptions(a+i).radius;return o}parseArrayData(t,e,i,n){const o=super.parseArrayData(t,e,i,n);for(let a=0;a<o.length;a++){const r=e[i+a];o[a]._custom=R(r[2],this.resolveDataElementOptions(a+i).radius)}return o}parseObjectData(t,e,i,n){const o=super.parseObjectData(t,e,i,n);for(let a=0;a<o.length;a++){const r=e[i+a];o[a]._custom=R(r&&r.r&&+r.r,this.resolveDataElementOptions(a+i).radius)}return o}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let i=t.length-1;i>=0;--i)e=Math.max(e,t[i].size(this.resolveDataElementOptions(i))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:n,yScale:o}=e,a=this.getParsed(t),r=n.getLabelForValue(a.x),l=o.getLabelForValue(a.y),d=a._custom;return{label:i[t]||"",value:"("+r+", "+l+(d?", "+d:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,i,n){const o=n==="reset",{iScale:a,vScale:r}=this._cachedMeta,{sharedOptions:l,includeOptions:d}=this._getSharedOptions(e,n),c=a.axis,u=r.axis;for(let p=e;p<e+i;p++){const h=t[p],m=!o&&this.getParsed(p),f={},g=f[c]=o?a.getPixelForDecimal(.5):a.getPixelForValue(m[c]),x=f[u]=o?r.getBasePixel():r.getPixelForValue(m[u]);f.skip=isNaN(g)||isNaN(x),d&&(f.options=l||this.resolveDataElementOptions(p,h.active?"active":n),o&&(f.options.radius=0)),this.updateElement(h,p,f,n)}}resolveDataElementOptions(t,e){const i=this.getParsed(t);let n=super.resolveDataElementOptions(t,e);n.$shared&&(n=Object.assign({},n,{$shared:!1}));const o=n.radius;return e!=="active"&&(n.radius=0),n.radius+=R(i&&i._custom,o),n}}E(ks,"id","bubble"),E(ks,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),E(ks,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function Tl(s,t,e){let i=1,n=1,o=0,a=0;if(t<H){const r=s,l=r+t,d=Math.cos(r),c=Math.sin(r),u=Math.cos(l),p=Math.sin(l),h=(k,b,w)=>Ke(k,r,l,!0)?1:Math.max(b,b*e,w,w*e),m=(k,b,w)=>Ke(k,r,l,!0)?-1:Math.min(b,b*e,w,w*e),f=h(0,d,u),g=h(q,c,p),x=m(B,d,u),y=m(B+q,c,p);i=(f-x)/2,n=(g-y)/2,o=-(f+x)/2,a=-(g+y)/2}return{ratioX:i,ratioY:n,offsetX:o,offsetY:a}}class ie extends bt{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const i=this.getDataset().data,n=this._cachedMeta;if(this._parsing===!1)n._parsed=i;else{let o=l=>+i[l];if(O(i[t])){const{key:l="value"}=this._parsing;o=d=>+Ft(i[d],l)}let a,r;for(a=t,r=t+e;a<r;++a)n._parsed[a]=o(a)}}_getRotation(){return mt(this.options.rotation-90)}_getCircumference(){return mt(this.options.circumference)}_getRotationExtents(){let t=H,e=-H;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const n=this.chart.getDatasetMeta(i).controller,o=n._getRotation(),a=n._getCircumference();t=Math.min(t,o),e=Math.max(e,o+a)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:i}=e,n=this._cachedMeta,o=n.data,a=this.getMaxBorderWidth()+this.getMaxOffset(o)+this.options.spacing,r=Math.max((Math.min(i.width,i.height)-a)/2,0),l=Math.min(Ga(this.options.cutout,r),1),d=this._getRingWeight(this.index),{circumference:c,rotation:u}=this._getRotationExtents(),{ratioX:p,ratioY:h,offsetX:m,offsetY:f}=Tl(u,c,l),g=(i.width-a)/p,x=(i.height-a)/h,y=Math.max(Math.min(g,x)/2,0),k=ko(this.options.radius,y),b=Math.max(k*l,0),w=(k-b)/this._getVisibleDatasetWeightTotal();this.offsetX=m*k,this.offsetY=f*k,n.total=this.calculateTotal(),this.outerRadius=k-w*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-w*d,0),this.updateElements(o,0,o.length,t)}_circumference(t,e){const i=this.options,n=this._cachedMeta,o=this._getCircumference();return e&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||n._parsed[t]===null||n.data[t].hidden?0:this.calculateCircumference(n._parsed[t]*o/H)}updateElements(t,e,i,n){const o=n==="reset",a=this.chart,r=a.chartArea,d=a.options.animation,c=(r.left+r.right)/2,u=(r.top+r.bottom)/2,p=o&&d.animateScale,h=p?0:this.innerRadius,m=p?0:this.outerRadius,{sharedOptions:f,includeOptions:g}=this._getSharedOptions(e,n);let x=this._getRotation(),y;for(y=0;y<e;++y)x+=this._circumference(y,o);for(y=e;y<e+i;++y){const k=this._circumference(y,o),b=t[y],w={x:c+this.offsetX,y:u+this.offsetY,startAngle:x,endAngle:x+k,circumference:k,outerRadius:m,innerRadius:h};g&&(w.options=f||this.resolveDataElementOptions(y,b.active?"active":n)),x+=k,this.updateElement(b,y,w,n)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let i=0,n;for(n=0;n<e.length;n++){const o=t._parsed[n];o!==null&&!isNaN(o)&&this.chart.getDataVisibility(n)&&!e[n].hidden&&(i+=Math.abs(o))}return i}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?H*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,n=i.data.labels||[],o=Qe(e._parsed[t],i.options.locale);return{label:n[t]||"",value:o}}getMaxBorderWidth(t){let e=0;const i=this.chart;let n,o,a,r,l;if(!t){for(n=0,o=i.data.datasets.length;n<o;++n)if(i.isDatasetVisible(n)){a=i.getDatasetMeta(n),t=a.data,r=a.controller;break}}if(!t)return 0;for(n=0,o=t.length;n<o;++n)l=r.resolveDataElementOptions(n),l.borderAlign!=="inner"&&(e=Math.max(e,l.borderWidth||0,l.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let i=0,n=t.length;i<n;++i){const o=this.resolveDataElementOptions(i);e=Math.max(e,o.offset||0,o.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(e+=this._getRingWeight(i));return e}_getRingWeight(t){return Math.max(R(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}E(ie,"id","doughnut"),E(ie,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),E(ie,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),E(ie,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data,{labels:{pointStyle:i,textAlign:n,color:o,useBorderRadius:a,borderRadius:r}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((l,d)=>{const u=t.getDatasetMeta(0).controller.getStyle(d);return{text:l,fillStyle:u.backgroundColor,fontColor:o,hidden:!t.getDataVisibility(d),lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:u.borderWidth,strokeStyle:u.borderColor,textAlign:n,pointStyle:i,borderRadius:a&&(r||u.borderRadius),index:d}}):[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}}});class Ss extends bt{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:i,data:n=[],_dataset:o}=e,a=this.chart._animationsDisabled;let{start:r,count:l}=Do(e,n,a);this._drawStart=r,this._drawCount=l,Ro(e)&&(r=0,l=n.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!o._decimated,i.points=n;const d=this.resolveDatasetElementOptions(t);this.options.showLine||(d.borderWidth=0),d.segment=this.options.segment,this.updateElement(i,void 0,{animated:!a,options:d},t),this.updateElements(n,r,l,t)}updateElements(t,e,i,n){const o=n==="reset",{iScale:a,vScale:r,_stacked:l,_dataset:d}=this._cachedMeta,{sharedOptions:c,includeOptions:u}=this._getSharedOptions(e,n),p=a.axis,h=r.axis,{spanGaps:m,segment:f}=this.options,g=be(m)?m:Number.POSITIVE_INFINITY,x=this.chart._animationsDisabled||o||n==="none",y=e+i,k=t.length;let b=e>0&&this.getParsed(e-1);for(let w=0;w<k;++w){const S=t[w],A=x?S:{};if(w<e||w>=y){A.skip=!0;continue}const C=this.getParsed(w),_=T(C[h]),M=A[p]=a.getPixelForValue(C[p],w),P=A[h]=o||_?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,C,l):C[h],w);A.skip=isNaN(M)||isNaN(P)||_,A.stop=w>0&&Math.abs(C[p]-b[p])>g,f&&(A.parsed=C,A.raw=d.data[w]),u&&(A.options=c||this.resolveDataElementOptions(w,S.active?"active":n)),x||this.updateElement(S,w,A,n),b=C}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,i=e.options&&e.options.borderWidth||0,n=t.data||[];if(!n.length)return i;const o=n[0].size(this.resolveDataElementOptions(0)),a=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(i,o,a)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}E(Ss,"id","line"),E(Ss,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),E(Ss,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class Ve extends bt{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,n=i.data.labels||[],o=Qe(e._parsed[t].r,i.options.locale);return{label:n[t]||"",value:o}}parseObjectData(t,e,i,n){return Fo.bind(this)(t,e,i,n)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,n)=>{const o=this.getParsed(n).r;!isNaN(o)&&this.chart.getDataVisibility(n)&&(o<e.min&&(e.min=o),o>e.max&&(e.max=o))}),e}_updateRadius(){const t=this.chart,e=t.chartArea,i=t.options,n=Math.min(e.right-e.left,e.bottom-e.top),o=Math.max(n/2,0),a=Math.max(i.cutoutPercentage?o/100*i.cutoutPercentage:1,0),r=(o-a)/t.getVisibleDatasetCount();this.outerRadius=o-r*this.index,this.innerRadius=this.outerRadius-r}updateElements(t,e,i,n){const o=n==="reset",a=this.chart,l=a.options.animation,d=this._cachedMeta.rScale,c=d.xCenter,u=d.yCenter,p=d.getIndexAngle(0)-.5*B;let h=p,m;const f=360/this.countVisibleElements();for(m=0;m<e;++m)h+=this._computeAngle(m,n,f);for(m=e;m<e+i;m++){const g=t[m];let x=h,y=h+this._computeAngle(m,n,f),k=a.getDataVisibility(m)?d.getDistanceFromCenterForValue(this.getParsed(m).r):0;h=y,o&&(l.animateScale&&(k=0),l.animateRotate&&(x=y=p));const b={x:c,y:u,innerRadius:0,outerRadius:k,startAngle:x,endAngle:y,options:this.resolveDataElementOptions(m,g.active?"active":n)};this.updateElement(g,m,b,n)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach((i,n)=>{!isNaN(this.getParsed(n).r)&&this.chart.getDataVisibility(n)&&e++}),e}_computeAngle(t,e,i){return this.chart.getDataVisibility(t)?mt(this.resolveDataElementOptions(t,e).angle||i):0}}E(Ve,"id","polarArea"),E(Ve,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),E(Ve,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i,color:n}}=t.legend.options;return e.labels.map((o,a)=>{const l=t.getDatasetMeta(0).controller.getStyle(a);return{text:o,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:n,lineWidth:l.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(a),index:a}})}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class mi extends ie{}E(mi,"id","pie"),E(mi,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class _s extends bt{getLabelAndValue(t){const e=this._cachedMeta.vScale,i=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(i[e.axis])}}parseObjectData(t,e,i,n){return Fo.bind(this)(t,e,i,n)}update(t){const e=this._cachedMeta,i=e.dataset,n=e.data||[],o=e.iScale.getLabels();if(i.points=n,t!=="resize"){const a=this.resolveDatasetElementOptions(t);this.options.showLine||(a.borderWidth=0);const r={_loop:!0,_fullLoop:o.length===n.length,options:a};this.updateElement(i,void 0,r,t)}this.updateElements(n,0,n.length,t)}updateElements(t,e,i,n){const o=this._cachedMeta.rScale,a=n==="reset";for(let r=e;r<e+i;r++){const l=t[r],d=this.resolveDataElementOptions(r,l.active?"active":n),c=o.getPointPositionForValue(r,this.getParsed(r).r),u=a?o.xCenter:c.x,p=a?o.yCenter:c.y,h={x:u,y:p,angle:c.angle,skip:isNaN(u)||isNaN(p),options:d};this.updateElement(l,r,h,n)}}}E(_s,"id","radar"),E(_s,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),E(_s,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class As extends bt{getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:n,yScale:o}=e,a=this.getParsed(t),r=n.getLabelForValue(a.x),l=o.getLabelForValue(a.y);return{label:i[t]||"",value:"("+r+", "+l+")"}}update(t){const e=this._cachedMeta,{data:i=[]}=e,n=this.chart._animationsDisabled;let{start:o,count:a}=Do(e,i,n);if(this._drawStart=o,this._drawCount=a,Ro(e)&&(o=0,a=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:r,_dataset:l}=e;r._chart=this.chart,r._datasetIndex=this.index,r._decimated=!!l._decimated,r.points=i;const d=this.resolveDatasetElementOptions(t);d.segment=this.options.segment,this.updateElement(r,void 0,{animated:!n,options:d},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(i,o,a,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,i,n){const o=n==="reset",{iScale:a,vScale:r,_stacked:l,_dataset:d}=this._cachedMeta,c=this.resolveDataElementOptions(e,n),u=this.getSharedOptions(c),p=this.includeOptions(n,u),h=a.axis,m=r.axis,{spanGaps:f,segment:g}=this.options,x=be(f)?f:Number.POSITIVE_INFINITY,y=this.chart._animationsDisabled||o||n==="none";let k=e>0&&this.getParsed(e-1);for(let b=e;b<e+i;++b){const w=t[b],S=this.getParsed(b),A=y?w:{},C=T(S[m]),_=A[h]=a.getPixelForValue(S[h],b),M=A[m]=o||C?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,S,l):S[m],b);A.skip=isNaN(_)||isNaN(M)||C,A.stop=b>0&&Math.abs(S[h]-k[h])>x,g&&(A.parsed=S,A.raw=d.data[b]),p&&(A.options=u||this.resolveDataElementOptions(b,w.active?"active":n)),y||this.updateElement(w,b,A,n),k=S}this.updateSharedOptions(u,n,c)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let r=0;for(let l=e.length-1;l>=0;--l)r=Math.max(r,e[l].size(this.resolveDataElementOptions(l))/2);return r>0&&r}const i=t.dataset,n=i.options&&i.options.borderWidth||0;if(!e.length)return n;const o=e[0].size(this.resolveDataElementOptions(0)),a=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(n,o,a)/2}}E(As,"id","scatter"),E(As,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),E(As,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var Ol=Object.freeze({__proto__:null,BarController:ws,BubbleController:ks,DoughnutController:ie,LineController:Ss,PieController:mi,PolarAreaController:Ve,RadarController:_s,ScatterController:As});function Kt(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Wi{constructor(t){E(this,"options");this.options=t||{}}static override(t){Object.assign(Wi.prototype,t)}init(){}formats(){return Kt()}parse(){return Kt()}format(){return Kt()}add(){return Kt()}diff(){return Kt()}startOf(){return Kt()}endOf(){return Kt()}}var $l={_date:Wi};function Bl(s,t,e,i){const{controller:n,data:o,_sorted:a}=s,r=n._cachedMeta.iScale,l=s.dataset&&s.dataset.options?s.dataset.options.spanGaps:null;if(r&&t===r.axis&&t!=="r"&&a&&o.length){const d=r._reversePixels?nr:Pt;if(i){if(n._sharedOptions){const c=o[0],u=typeof c.getRange=="function"&&c.getRange(t);if(u){const p=d(o,t,e-u),h=d(o,t,e+u);return{lo:p.lo,hi:h.hi}}}}else{const c=d(o,t,e);if(l){const{vScale:u}=n._cachedMeta,{_parsed:p}=s,h=p.slice(0,c.lo+1).reverse().findIndex(f=>!T(f[u.axis]));c.lo-=Math.max(0,h);const m=p.slice(c.hi).findIndex(f=>!T(f[u.axis]));c.hi+=Math.max(0,m)}return c}}return{lo:0,hi:o.length-1}}function Ks(s,t,e,i,n){const o=s.getSortedVisibleDatasetMetas(),a=e[t];for(let r=0,l=o.length;r<l;++r){const{index:d,data:c}=o[r],{lo:u,hi:p}=Bl(o[r],t,a,n);for(let h=u;h<=p;++h){const m=c[h];m.skip||i(m,d,h)}}}function jl(s){const t=s.indexOf("x")!==-1,e=s.indexOf("y")!==-1;return function(i,n){const o=t?Math.abs(i.x-n.x):0,a=e?Math.abs(i.y-n.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(a,2))}}function ni(s,t,e,i,n){const o=[];return!n&&!s.isPointInArea(t)||Ks(s,e,t,function(r,l,d){!n&&!Dt(r,s.chartArea,0)||r.inRange(t.x,t.y,i)&&o.push({element:r,datasetIndex:l,index:d})},!0),o}function Ll(s,t,e,i){let n=[];function o(a,r,l){const{startAngle:d,endAngle:c}=a.getProps(["startAngle","endAngle"],i),{angle:u}=Ao(a,{x:t.x,y:t.y});Ke(u,d,c)&&n.push({element:a,datasetIndex:r,index:l})}return Ks(s,e,t,o),n}function Fl(s,t,e,i,n,o){let a=[];const r=jl(e);let l=Number.POSITIVE_INFINITY;function d(c,u,p){const h=c.inRange(t.x,t.y,n);if(i&&!h)return;const m=c.getCenterPoint(n);if(!(!!o||s.isPointInArea(m))&&!h)return;const g=r(t,m);g<l?(a=[{element:c,datasetIndex:u,index:p}],l=g):g===l&&a.push({element:c,datasetIndex:u,index:p})}return Ks(s,e,t,d),a}function oi(s,t,e,i,n,o){return!o&&!s.isPointInArea(t)?[]:e==="r"&&!i?Ll(s,t,e,n):Fl(s,t,e,i,n,o)}function An(s,t,e,i,n){const o=[],a=e==="x"?"inXRange":"inYRange";let r=!1;return Ks(s,e,t,(l,d,c)=>{l[a]&&l[a](t[e],n)&&(o.push({element:l,datasetIndex:d,index:c}),r=r||l.inRange(t.x,t.y,n))}),i&&!r?[]:o}var Nl={modes:{index(s,t,e,i){const n=Qt(t,s),o=e.axis||"x",a=e.includeInvisible||!1,r=e.intersect?ni(s,n,o,i,a):oi(s,n,o,!1,i,a),l=[];return r.length?(s.getSortedVisibleDatasetMetas().forEach(d=>{const c=r[0].index,u=d.data[c];u&&!u.skip&&l.push({element:u,datasetIndex:d.index,index:c})}),l):[]},dataset(s,t,e,i){const n=Qt(t,s),o=e.axis||"xy",a=e.includeInvisible||!1;let r=e.intersect?ni(s,n,o,i,a):oi(s,n,o,!1,i,a);if(r.length>0){const l=r[0].datasetIndex,d=s.getDatasetMeta(l).data;r=[];for(let c=0;c<d.length;++c)r.push({element:d[c],datasetIndex:l,index:c})}return r},point(s,t,e,i){const n=Qt(t,s),o=e.axis||"xy",a=e.includeInvisible||!1;return ni(s,n,o,i,a)},nearest(s,t,e,i){const n=Qt(t,s),o=e.axis||"xy",a=e.includeInvisible||!1;return oi(s,n,o,e.intersect,i,a)},x(s,t,e,i){const n=Qt(t,s);return An(s,n,"x",e.intersect,i)},y(s,t,e,i){const n=Qt(t,s);return An(s,n,"y",e.intersect,i)}}};const Jo=["left","top","right","bottom"];function Se(s,t){return s.filter(e=>e.pos===t)}function Cn(s,t){return s.filter(e=>Jo.indexOf(e.pos)===-1&&e.box.axis===t)}function _e(s,t){return s.sort((e,i)=>{const n=t?i:e,o=t?e:i;return n.weight===o.weight?n.index-o.index:n.weight-o.weight})}function Vl(s){const t=[];let e,i,n,o,a,r;for(e=0,i=(s||[]).length;e<i;++e)n=s[e],{position:o,options:{stack:a,stackWeight:r=1}}=n,t.push({index:e,box:n,pos:o,horizontal:n.isHorizontal(),weight:n.weight,stack:a&&o+a,stackWeight:r});return t}function Hl(s){const t={};for(const e of s){const{stack:i,pos:n,stackWeight:o}=e;if(!i||!Jo.includes(n))continue;const a=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=o}return t}function zl(s,t){const e=Hl(s),{vBoxMaxWidth:i,hBoxMaxHeight:n}=t;let o,a,r;for(o=0,a=s.length;o<a;++o){r=s[o];const{fullSize:l}=r.box,d=e[r.stack],c=d&&r.stackWeight/d.weight;r.horizontal?(r.width=c?c*i:l&&t.availableWidth,r.height=n):(r.width=i,r.height=c?c*n:l&&t.availableHeight)}return e}function Wl(s){const t=Vl(s),e=_e(t.filter(d=>d.box.fullSize),!0),i=_e(Se(t,"left"),!0),n=_e(Se(t,"right")),o=_e(Se(t,"top"),!0),a=_e(Se(t,"bottom")),r=Cn(t,"x"),l=Cn(t,"y");return{fullSize:e,leftAndTop:i.concat(o),rightAndBottom:n.concat(l).concat(a).concat(r),chartArea:Se(t,"chartArea"),vertical:i.concat(n).concat(l),horizontal:o.concat(a).concat(r)}}function En(s,t,e,i){return Math.max(s[e],t[e])+Math.max(s[i],t[i])}function Xo(s,t){s.top=Math.max(s.top,t.top),s.left=Math.max(s.left,t.left),s.bottom=Math.max(s.bottom,t.bottom),s.right=Math.max(s.right,t.right)}function Gl(s,t,e,i){const{pos:n,box:o}=e,a=s.maxPadding;if(!O(n)){e.size&&(s[n]-=e.size);const u=i[e.stack]||{size:0,count:1};u.size=Math.max(u.size,e.horizontal?o.height:o.width),e.size=u.size/u.count,s[n]+=e.size}o.getPadding&&Xo(a,o.getPadding());const r=Math.max(0,t.outerWidth-En(a,s,"left","right")),l=Math.max(0,t.outerHeight-En(a,s,"top","bottom")),d=r!==s.w,c=l!==s.h;return s.w=r,s.h=l,e.horizontal?{same:d,other:c}:{same:c,other:d}}function Ul(s){const t=s.maxPadding;function e(i){const n=Math.max(t[i]-s[i],0);return s[i]+=n,n}s.y+=e("top"),s.x+=e("left"),e("right"),e("bottom")}function Kl(s,t){const e=t.maxPadding;function i(n){const o={left:0,top:0,right:0,bottom:0};return n.forEach(a=>{o[a]=Math.max(t[a],e[a])}),o}return i(s?["left","right"]:["top","bottom"])}function Re(s,t,e,i){const n=[];let o,a,r,l,d,c;for(o=0,a=s.length,d=0;o<a;++o){r=s[o],l=r.box,l.update(r.width||t.w,r.height||t.h,Kl(r.horizontal,t));const{same:u,other:p}=Gl(t,e,r,i);d|=u&&n.length,c=c||p,l.fullSize||n.push(r)}return d&&Re(n,t,e,i)||c}function ls(s,t,e,i,n){s.top=e,s.left=t,s.right=t+i,s.bottom=e+n,s.width=i,s.height=n}function Mn(s,t,e,i){const n=e.padding;let{x:o,y:a}=t;for(const r of s){const l=r.box,d=i[r.stack]||{placed:0,weight:1},c=r.stackWeight/d.weight||1;if(r.horizontal){const u=t.w*c,p=d.size||l.height;Ue(d.start)&&(a=d.start),l.fullSize?ls(l,n.left,a,e.outerWidth-n.right-n.left,p):ls(l,t.left+d.placed,a,u,p),d.start=a,d.placed+=u,a=l.bottom}else{const u=t.h*c,p=d.size||l.width;Ue(d.start)&&(o=d.start),l.fullSize?ls(l,o,n.top,p,e.outerHeight-n.bottom-n.top):ls(l,o,t.top+d.placed,p,u),d.start=o,d.placed+=u,o=l.right}}t.x=o,t.y=a}var et={addBox(s,t){s.boxes||(s.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},s.boxes.push(t)},removeBox(s,t){const e=s.boxes?s.boxes.indexOf(t):-1;e!==-1&&s.boxes.splice(e,1)},configure(s,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(s,t,e,i){if(!s)return;const n=st(s.options.layout.padding),o=Math.max(t-n.width,0),a=Math.max(e-n.height,0),r=Wl(s.boxes),l=r.vertical,d=r.horizontal;F(s.boxes,f=>{typeof f.beforeLayout=="function"&&f.beforeLayout()});const c=l.reduce((f,g)=>g.box.options&&g.box.options.display===!1?f:f+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:e,padding:n,availableWidth:o,availableHeight:a,vBoxMaxWidth:o/2/c,hBoxMaxHeight:a/2}),p=Object.assign({},n);Xo(p,st(i));const h=Object.assign({maxPadding:p,w:o,h:a,x:n.left,y:n.top},n),m=zl(l.concat(d),u);Re(r.fullSize,h,u,m),Re(l,h,u,m),Re(d,h,u,m)&&Re(l,h,u,m),Ul(h),Mn(r.leftAndTop,h,u,m),h.x+=h.w,h.y+=h.h,Mn(r.rightAndBottom,h,u,m),s.chartArea={left:h.left,top:h.top,right:h.left+h.w,bottom:h.top+h.h,height:h.h,width:h.w},F(r.chartArea,f=>{const g=f.box;Object.assign(g,s.chartArea),g.update(h.w,h.h,{left:0,top:0,right:0,bottom:0})})}};class Zo{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,i){}removeEventListener(t,e,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,i,n){return e=Math.max(0,e||t.width),i=i||t.height,{width:e,height:Math.max(0,n?Math.floor(e/n):i)}}isAttached(t){return!0}updateConfig(t){}}class ql extends Zo{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const Cs="$chartjs",Yl={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Pn=s=>s===null||s==="";function Jl(s,t){const e=s.style,i=s.getAttribute("height"),n=s.getAttribute("width");if(s[Cs]={initial:{height:i,width:n,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",Pn(n)){const o=pn(s,"width");o!==void 0&&(s.width=o)}if(Pn(i))if(s.style.height==="")s.height=s.width/(t||2);else{const o=pn(s,"height");o!==void 0&&(s.height=o)}return s}const Qo=Xr?{passive:!0}:!1;function Xl(s,t,e){s&&s.addEventListener(t,e,Qo)}function Zl(s,t,e){s&&s.canvas&&s.canvas.removeEventListener(t,e,Qo)}function Ql(s,t){const e=Yl[s.type]||s.type,{x:i,y:n}=Qt(s,t);return{type:e,chart:t,native:s,x:i!==void 0?i:null,y:n!==void 0?n:null}}function Fs(s,t){for(const e of s)if(e===t||e.contains(t))return!0}function td(s,t,e){const i=s.canvas,n=new MutationObserver(o=>{let a=!1;for(const r of o)a=a||Fs(r.addedNodes,i),a=a&&!Fs(r.removedNodes,i);a&&e()});return n.observe(document,{childList:!0,subtree:!0}),n}function ed(s,t,e){const i=s.canvas,n=new MutationObserver(o=>{let a=!1;for(const r of o)a=a||Fs(r.removedNodes,i),a=a&&!Fs(r.addedNodes,i);a&&e()});return n.observe(document,{childList:!0,subtree:!0}),n}const Ye=new Map;let Dn=0;function ta(){const s=window.devicePixelRatio;s!==Dn&&(Dn=s,Ye.forEach((t,e)=>{e.currentDevicePixelRatio!==s&&t()}))}function sd(s,t){Ye.size||window.addEventListener("resize",ta),Ye.set(s,t)}function id(s){Ye.delete(s),Ye.size||window.removeEventListener("resize",ta)}function nd(s,t,e){const i=s.canvas,n=i&&zi(i);if(!n)return;const o=Po((r,l)=>{const d=n.clientWidth;e(r,l),d<n.clientWidth&&e()},window),a=new ResizeObserver(r=>{const l=r[0],d=l.contentRect.width,c=l.contentRect.height;d===0&&c===0||o(d,c)});return a.observe(n),sd(s,o),a}function ai(s,t,e){e&&e.disconnect(),t==="resize"&&id(s)}function od(s,t,e){const i=s.canvas,n=Po(o=>{s.ctx!==null&&e(Ql(o,s))},s);return Xl(i,t,n),n}class ad extends Zo{acquireContext(t,e){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(Jl(t,e),i):null}releaseContext(t){const e=t.canvas;if(!e[Cs])return!1;const i=e[Cs].initial;["height","width"].forEach(o=>{const a=i[o];T(a)?e.removeAttribute(o):e.setAttribute(o,a)});const n=i.style||{};return Object.keys(n).forEach(o=>{e.style[o]=n[o]}),e.width=e.width,delete e[Cs],!0}addEventListener(t,e,i){this.removeEventListener(t,e);const n=t.$proxies||(t.$proxies={}),a={attach:td,detach:ed,resize:nd}[e]||od;n[e]=a(t,e,i)}removeEventListener(t,e){const i=t.$proxies||(t.$proxies={}),n=i[e];if(!n)return;({attach:ai,detach:ai,resize:ai}[e]||Zl)(t,e,n),i[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,i,n){return Jr(t,e,i,n)}isAttached(t){const e=t&&zi(t);return!!(e&&e.isConnected)}}function rd(s){return!Hi()||typeof OffscreenCanvas<"u"&&s instanceof OffscreenCanvas?ql:ad}class xt{constructor(){E(this,"x");E(this,"y");E(this,"active",!1);E(this,"options");E(this,"$animations")}tooltipPosition(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}hasValue(){return be(this.x)&&be(this.y)}getProps(t,e){const i=this.$animations;if(!e||!i)return this;const n={};return t.forEach(o=>{n[o]=i[o]&&i[o].active()?i[o]._to:this[o]}),n}}E(xt,"defaults",{}),E(xt,"defaultRoutes");function ld(s,t){const e=s.options.ticks,i=dd(s),n=Math.min(e.maxTicksLimit||i,i),o=e.major.enabled?ud(t):[],a=o.length,r=o[0],l=o[a-1],d=[];if(a>n)return pd(t,d,o,a/n),d;const c=cd(o,t,n);if(a>0){let u,p;const h=a>1?Math.round((l-r)/(a-1)):null;for(ds(t,d,c,T(h)?0:r-h,r),u=0,p=a-1;u<p;u++)ds(t,d,c,o[u],o[u+1]);return ds(t,d,c,l,T(h)?t.length:l+h),d}return ds(t,d,c),d}function dd(s){const t=s.options.offset,e=s._tickSize(),i=s._length/e+(t?0:1),n=s._maxLength/e;return Math.floor(Math.min(i,n))}function cd(s,t,e){const i=hd(s),n=t.length/e;if(!i)return Math.max(n,1);const o=Qa(i);for(let a=0,r=o.length-1;a<r;a++){const l=o[a];if(l>n)return l}return Math.max(n,1)}function ud(s){const t=[];let e,i;for(e=0,i=s.length;e<i;e++)s[e].major&&t.push(e);return t}function pd(s,t,e,i){let n=0,o=e[0],a;for(i=Math.ceil(i),a=0;a<s.length;a++)a===o&&(t.push(s[a]),n++,o=e[n*i])}function ds(s,t,e,i,n){const o=R(i,0),a=Math.min(R(n,s.length),s.length);let r=0,l,d,c;for(e=Math.ceil(e),n&&(l=n-i,e=l/Math.floor(l/e)),c=o;c<0;)r++,c=Math.round(o+r*e);for(d=Math.max(o,0);d<a;d++)d===c&&(t.push(s[d]),r++,c=Math.round(o+r*e))}function hd(s){const t=s.length;let e,i;if(t<2)return!1;for(i=s[0],e=1;e<t;++e)if(s[e]-s[e-1]!==i)return!1;return i}const fd=s=>s==="left"?"right":s==="right"?"left":s,Rn=(s,t,e)=>t==="top"||t==="left"?s[t]+e:s[t]-e,In=(s,t)=>Math.min(t||s,s);function Tn(s,t){const e=[],i=s.length/t,n=s.length;let o=0;for(;o<n;o+=i)e.push(s[Math.floor(o)]);return e}function gd(s,t,e){const i=s.ticks.length,n=Math.min(t,i-1),o=s._startPixel,a=s._endPixel,r=1e-6;let l=s.getPixelForTick(n),d;if(!(e&&(i===1?d=Math.max(l-o,a-l):t===0?d=(s.getPixelForTick(1)-l)/2:d=(l-s.getPixelForTick(n-1))/2,l+=n<t?d:-d,l<o-r||l>a+r)))return l}function md(s,t){F(s,e=>{const i=e.gc,n=i.length/2;let o;if(n>t){for(o=0;o<n;++o)delete e.data[i[o]];i.splice(0,n)}})}function Ae(s){return s.drawTicks?s.tickLength:0}function On(s,t){if(!s.display)return 0;const e=J(s.font,t),i=st(s.padding);return(W(s.text)?s.text.length:1)*e.lineHeight+i.height}function bd(s,t){return Vt(s,{scale:t,type:"scale"})}function xd(s,t,e){return Vt(s,{tick:e,index:t,type:"tick"})}function vd(s,t,e){let i=Bi(s);return(e&&t!=="right"||!e&&t==="right")&&(i=fd(i)),i}function yd(s,t,e,i){const{top:n,left:o,bottom:a,right:r,chart:l}=s,{chartArea:d,scales:c}=l;let u=0,p,h,m;const f=a-n,g=r-o;if(s.isHorizontal()){if(h=Q(i,o,r),O(e)){const x=Object.keys(e)[0],y=e[x];m=c[x].getPixelForValue(y)+f-t}else e==="center"?m=(d.bottom+d.top)/2+f-t:m=Rn(s,e,t);p=r-o}else{if(O(e)){const x=Object.keys(e)[0],y=e[x];h=c[x].getPixelForValue(y)-g+t}else e==="center"?h=(d.left+d.right)/2-g+t:h=Rn(s,e,t);m=Q(i,a,n),u=e==="left"?-q:q}return{titleX:h,titleY:m,maxWidth:p,rotation:u}}class de extends xt{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:i,_suggestedMax:n}=this;return t=dt(t,Number.POSITIVE_INFINITY),e=dt(e,Number.NEGATIVE_INFINITY),i=dt(i,Number.POSITIVE_INFINITY),n=dt(n,Number.NEGATIVE_INFINITY),{min:dt(t,i),max:dt(e,n),minDefined:K(t),maxDefined:K(e)}}getMinMax(t){let{min:e,max:i,minDefined:n,maxDefined:o}=this.getUserBounds(),a;if(n&&o)return{min:e,max:i};const r=this.getMatchingVisibleMetas();for(let l=0,d=r.length;l<d;++l)a=r[l].controller.getMinMax(this,t),n||(e=Math.min(e,a.min)),o||(i=Math.max(i,a.max));return e=o&&e>i?i:e,i=n&&e>i?e:i,{min:dt(e,dt(i,e)),max:dt(i,dt(e,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){V(this.options.beforeUpdate,[this])}update(t,e,i){const{beginAtZero:n,grace:o,ticks:a}=this.options,r=a.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=Mr(this,o,n),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=r<this.ticks.length;this._convertTicksToLabels(l?Tn(this.ticks,r):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source==="auto")&&(this.ticks=ld(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,i;this.isHorizontal()?(e=this.left,i=this.right):(e=this.top,i=this.bottom,t=!t),this._startPixel=e,this._endPixel=i,this._reversePixels=t,this._length=i-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){V(this.options.afterUpdate,[this])}beforeSetDimensions(){V(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){V(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),V(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){V(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let i,n,o;for(i=0,n=t.length;i<n;i++)o=t[i],o.label=V(e.callback,[o.value,i,t],this)}afterTickToLabelConversion(){V(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){V(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,i=In(this.ticks.length,t.ticks.maxTicksLimit),n=e.minRotation||0,o=e.maxRotation;let a=n,r,l,d;if(!this._isVisible()||!e.display||n>=o||i<=1||!this.isHorizontal()){this.labelRotation=n;return}const c=this._getLabelSizes(),u=c.widest.width,p=c.highest.height,h=Z(this.chart.width-u,0,this.maxWidth);r=t.offset?this.maxWidth/i:h/(i-1),u+6>r&&(r=h/(i-(t.offset?.5:1)),l=this.maxHeight-Ae(t.grid)-e.padding-On(t.title,this.chart.options.font),d=Math.sqrt(u*u+p*p),a=Oi(Math.min(Math.asin(Z((c.highest.height+6)/r,-1,1)),Math.asin(Z(l/d,-1,1))-Math.asin(Z(p/d,-1,1)))),a=Math.max(n,Math.min(o,a))),this.labelRotation=a}afterCalculateLabelRotation(){V(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){V(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:i,title:n,grid:o}}=this,a=this._isVisible(),r=this.isHorizontal();if(a){const l=On(n,e.options.font);if(r?(t.width=this.maxWidth,t.height=Ae(o)+l):(t.height=this.maxHeight,t.width=Ae(o)+l),i.display&&this.ticks.length){const{first:d,last:c,widest:u,highest:p}=this._getLabelSizes(),h=i.padding*2,m=mt(this.labelRotation),f=Math.cos(m),g=Math.sin(m);if(r){const x=i.mirror?0:g*u.width+f*p.height;t.height=Math.min(this.maxHeight,t.height+x+h)}else{const x=i.mirror?0:f*u.width+g*p.height;t.width=Math.min(this.maxWidth,t.width+x+h)}this._calculatePadding(d,c,g,f)}}this._handleMargins(),r?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,i,n){const{ticks:{align:o,padding:a},position:r}=this.options,l=this.labelRotation!==0,d=r!=="top"&&this.axis==="x";if(this.isHorizontal()){const c=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let p=0,h=0;l?d?(p=n*t.width,h=i*e.height):(p=i*t.height,h=n*e.width):o==="start"?h=e.width:o==="end"?p=t.width:o!=="inner"&&(p=t.width/2,h=e.width/2),this.paddingLeft=Math.max((p-c+a)*this.width/(this.width-c),0),this.paddingRight=Math.max((h-u+a)*this.width/(this.width-u),0)}else{let c=e.height/2,u=t.height/2;o==="start"?(c=0,u=t.height):o==="end"&&(c=e.height,u=0),this.paddingTop=c+a,this.paddingBottom=u+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){V(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,i;for(e=0,i=t.length;e<i;e++)T(t[e].label)&&(t.splice(e,1),i--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let i=this.ticks;e<i.length&&(i=Tn(i,e)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,i){const{ctx:n,_longestTextCache:o}=this,a=[],r=[],l=Math.floor(e/In(e,i));let d=0,c=0,u,p,h,m,f,g,x,y,k,b,w;for(u=0;u<e;u+=l){if(m=t[u].label,f=this._resolveTickFontOptions(u),n.font=g=f.string,x=o[g]=o[g]||{data:{},gc:[]},y=f.lineHeight,k=b=0,!T(m)&&!W(m))k=js(n,x.data,x.gc,k,m),b=y;else if(W(m))for(p=0,h=m.length;p<h;++p)w=m[p],!T(w)&&!W(w)&&(k=js(n,x.data,x.gc,k,w),b+=y);a.push(k),r.push(b),d=Math.max(k,d),c=Math.max(b,c)}md(o,e);const S=a.indexOf(d),A=r.indexOf(c),C=_=>({width:a[_]||0,height:r[_]||0});return{first:C(0),last:C(e-1),widest:C(S),highest:C(A),widths:a,heights:r}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return ir(this._alignToPixels?Ut(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const i=e[t];return i.$context||(i.$context=xd(this.getContext(),t,i))}return this.$context||(this.$context=bd(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=mt(this.labelRotation),i=Math.abs(Math.cos(e)),n=Math.abs(Math.sin(e)),o=this._getLabelSizes(),a=t.autoSkipPadding||0,r=o?o.widest.width+a:0,l=o?o.highest.height+a:0;return this.isHorizontal()?l*i>r*n?r/i:l/n:l*n<r*i?l/i:r/n}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,i=this.chart,n=this.options,{grid:o,position:a,border:r}=n,l=o.offset,d=this.isHorizontal(),u=this.ticks.length+(l?1:0),p=Ae(o),h=[],m=r.setContext(this.getContext()),f=m.display?m.width:0,g=f/2,x=function(L){return Ut(i,L,f)};let y,k,b,w,S,A,C,_,M,P,D,N;if(a==="top")y=x(this.bottom),A=this.bottom-p,_=y-g,P=x(t.top)+g,N=t.bottom;else if(a==="bottom")y=x(this.top),P=t.top,N=x(t.bottom)-g,A=y+g,_=this.top+p;else if(a==="left")y=x(this.right),S=this.right-p,C=y-g,M=x(t.left)+g,D=t.right;else if(a==="right")y=x(this.left),M=t.left,D=x(t.right)-g,S=y+g,C=this.left+p;else if(e==="x"){if(a==="center")y=x((t.top+t.bottom)/2+.5);else if(O(a)){const L=Object.keys(a)[0],z=a[L];y=x(this.chart.scales[L].getPixelForValue(z))}P=t.top,N=t.bottom,A=y+g,_=A+p}else if(e==="y"){if(a==="center")y=x((t.left+t.right)/2);else if(O(a)){const L=Object.keys(a)[0],z=a[L];y=x(this.chart.scales[L].getPixelForValue(z))}S=y-g,C=S-p,M=t.left,D=t.right}const j=R(n.ticks.maxTicksLimit,u),I=Math.max(1,Math.ceil(u/j));for(k=0;k<u;k+=I){const L=this.getContext(k),z=o.setContext(L),it=r.setContext(L),X=z.lineWidth,St=z.color,Ht=it.dash||[],ce=it.dashOffset,ye=z.tickWidth,zt=z.tickColor,we=z.tickBorderDash||[],Wt=z.tickBorderDashOffset;b=gd(this,k,l),b!==void 0&&(w=Ut(i,b,X),d?S=C=M=D=w:A=_=P=N=w,h.push({tx1:S,ty1:A,tx2:C,ty2:_,x1:M,y1:P,x2:D,y2:N,width:X,color:St,borderDash:Ht,borderDashOffset:ce,tickWidth:ye,tickColor:zt,tickBorderDash:we,tickBorderDashOffset:Wt}))}return this._ticksLength=u,this._borderValue=y,h}_computeLabelItems(t){const e=this.axis,i=this.options,{position:n,ticks:o}=i,a=this.isHorizontal(),r=this.ticks,{align:l,crossAlign:d,padding:c,mirror:u}=o,p=Ae(i.grid),h=p+c,m=u?-c:h,f=-mt(this.labelRotation),g=[];let x,y,k,b,w,S,A,C,_,M,P,D,N="middle";if(n==="top")S=this.bottom-m,A=this._getXAxisLabelAlignment();else if(n==="bottom")S=this.top+m,A=this._getXAxisLabelAlignment();else if(n==="left"){const I=this._getYAxisLabelAlignment(p);A=I.textAlign,w=I.x}else if(n==="right"){const I=this._getYAxisLabelAlignment(p);A=I.textAlign,w=I.x}else if(e==="x"){if(n==="center")S=(t.top+t.bottom)/2+h;else if(O(n)){const I=Object.keys(n)[0],L=n[I];S=this.chart.scales[I].getPixelForValue(L)+h}A=this._getXAxisLabelAlignment()}else if(e==="y"){if(n==="center")w=(t.left+t.right)/2-h;else if(O(n)){const I=Object.keys(n)[0],L=n[I];w=this.chart.scales[I].getPixelForValue(L)}A=this._getYAxisLabelAlignment(p).textAlign}e==="y"&&(l==="start"?N="top":l==="end"&&(N="bottom"));const j=this._getLabelSizes();for(x=0,y=r.length;x<y;++x){k=r[x],b=k.label;const I=o.setContext(this.getContext(x));C=this.getPixelForTick(x)+o.labelOffset,_=this._resolveTickFontOptions(x),M=_.lineHeight,P=W(b)?b.length:1;const L=P/2,z=I.color,it=I.textStrokeColor,X=I.textStrokeWidth;let St=A;a?(w=C,A==="inner"&&(x===y-1?St=this.options.reverse?"left":"right":x===0?St=this.options.reverse?"right":"left":St="center"),n==="top"?d==="near"||f!==0?D=-P*M+M/2:d==="center"?D=-j.highest.height/2-L*M+M:D=-j.highest.height+M/2:d==="near"||f!==0?D=M/2:d==="center"?D=j.highest.height/2-L*M:D=j.highest.height-P*M,u&&(D*=-1),f!==0&&!I.showLabelBackdrop&&(w+=M/2*Math.sin(f))):(S=C,D=(1-P)*M/2);let Ht;if(I.showLabelBackdrop){const ce=st(I.backdropPadding),ye=j.heights[x],zt=j.widths[x];let we=D-ce.top,Wt=0-ce.left;switch(N){case"middle":we-=ye/2;break;case"bottom":we-=ye;break}switch(A){case"center":Wt-=zt/2;break;case"right":Wt-=zt;break;case"inner":x===y-1?Wt-=zt:x>0&&(Wt-=zt/2);break}Ht={left:Wt,top:we,width:zt+ce.width,height:ye+ce.height,color:I.backdropColor}}g.push({label:b,font:_,textOffset:D,options:{rotation:f,color:z,strokeColor:it,strokeWidth:X,textAlign:St,textBaseline:N,translation:[w,S],backdrop:Ht}})}return g}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-mt(this.labelRotation))return t==="top"?"left":"right";let n="center";return e.align==="start"?n="left":e.align==="end"?n="right":e.align==="inner"&&(n="inner"),n}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:i,mirror:n,padding:o}}=this.options,a=this._getLabelSizes(),r=t+o,l=a.widest.width;let d,c;return e==="left"?n?(c=this.right+o,i==="near"?d="left":i==="center"?(d="center",c+=l/2):(d="right",c+=l)):(c=this.right-r,i==="near"?d="right":i==="center"?(d="center",c-=l/2):(d="left",c=this.left)):e==="right"?n?(c=this.left+o,i==="near"?d="right":i==="center"?(d="center",c-=l/2):(d="left",c-=l)):(c=this.left+r,i==="near"?d="left":i==="center"?(d="center",c+=l/2):(d="right",c=this.right)):d="right",{textAlign:d,x:c}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:i,top:n,width:o,height:a}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(i,n,o,a),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const n=this.ticks.findIndex(o=>o.value===t);return n>=0?e.setContext(this.getContext(n)).lineWidth:0}drawGrid(t){const e=this.options.grid,i=this.ctx,n=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let o,a;const r=(l,d,c)=>{!c.width||!c.color||(i.save(),i.lineWidth=c.width,i.strokeStyle=c.color,i.setLineDash(c.borderDash||[]),i.lineDashOffset=c.borderDashOffset,i.beginPath(),i.moveTo(l.x,l.y),i.lineTo(d.x,d.y),i.stroke(),i.restore())};if(e.display)for(o=0,a=n.length;o<a;++o){const l=n[o];e.drawOnChartArea&&r({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),e.drawTicks&&r({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:i,grid:n}}=this,o=i.setContext(this.getContext()),a=i.display?o.width:0;if(!a)return;const r=n.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let d,c,u,p;this.isHorizontal()?(d=Ut(t,this.left,a)-a/2,c=Ut(t,this.right,r)+r/2,u=p=l):(u=Ut(t,this.top,a)-a/2,p=Ut(t,this.bottom,r)+r/2,d=c=l),e.save(),e.lineWidth=o.width,e.strokeStyle=o.color,e.beginPath(),e.moveTo(d,u),e.lineTo(c,p),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,n=this._computeLabelArea();n&&Ws(i,n);const o=this.getLabelItems(t);for(const a of o){const r=a.options,l=a.font,d=a.label,c=a.textOffset;le(i,d,0,c,l,r)}n&&Gs(i)}drawTitle(){const{ctx:t,options:{position:e,title:i,reverse:n}}=this;if(!i.display)return;const o=J(i.font),a=st(i.padding),r=i.align;let l=o.lineHeight/2;e==="bottom"||e==="center"||O(e)?(l+=a.bottom,W(i.text)&&(l+=o.lineHeight*(i.text.length-1))):l+=a.top;const{titleX:d,titleY:c,maxWidth:u,rotation:p}=yd(this,l,e,r);le(t,i.text,0,0,o,{color:i.color,maxWidth:u,rotation:p,textAlign:vd(r,e,n),textBaseline:"middle",translation:[d,c]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,i=R(t.grid&&t.grid.z,-1),n=R(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==de.prototype.draw?[{z:e,draw:o=>{this.draw(o)}}]:[{z:i,draw:o=>{this.drawBackground(),this.drawGrid(o),this.drawTitle()}},{z:n,draw:()=>{this.drawBorder()}},{z:e,draw:o=>{this.drawLabels(o)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",n=[];let o,a;for(o=0,a=e.length;o<a;++o){const r=e[o];r[i]===this.id&&(!t||r.type===t)&&n.push(r)}return n}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return J(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class cs{constructor(t,e,i){this.type=t,this.scope=e,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let i;Sd(e)&&(i=this.register(e));const n=this.items,o=t.id,a=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in n||(n[o]=t,wd(t,a,i),this.override&&U.override(t.id,t.overrides)),a}get(t){return this.items[t]}unregister(t){const e=this.items,i=t.id,n=this.scope;i in e&&delete e[i],n&&i in U[n]&&(delete U[n][i],this.override&&delete re[i])}}function wd(s,t,e){const i=Ge(Object.create(null),[e?U.get(e):{},U.get(t),s.defaults]);U.set(t,i),s.defaultRoutes&&kd(t,s.defaultRoutes),s.descriptors&&U.describe(t,s.descriptors)}function kd(s,t){Object.keys(t).forEach(e=>{const i=e.split("."),n=i.pop(),o=[s].concat(i).join("."),a=t[e].split("."),r=a.pop(),l=a.join(".");U.route(o,n,l,r)})}function Sd(s){return"id"in s&&"defaults"in s}class _d{constructor(){this.controllers=new cs(bt,"datasets",!0),this.elements=new cs(xt,"elements"),this.plugins=new cs(Object,"plugins"),this.scales=new cs(de,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,i){[...e].forEach(n=>{const o=i||this._getRegistryForType(n);i||o.isForType(n)||o===this.plugins&&n.id?this._exec(t,o,n):F(n,a=>{const r=i||this._getRegistryForType(a);this._exec(t,r,a)})})}_exec(t,e,i){const n=Ti(t);V(i["before"+n],[],i),e[t](i),V(i["after"+n],[],i)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const i=this._typedRegistries[e];if(i.isForType(t))return i}return this.plugins}_get(t,e,i){const n=e.get(t);if(n===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return n}}var yt=new _d;class Ad{constructor(){this._init=void 0}notify(t,e,i,n){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const o=n?this._descriptors(t).filter(n):this._descriptors(t),a=this._notify(o,t,e,i);return e==="afterDestroy"&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),a}_notify(t,e,i,n){n=n||{};for(const o of t){const a=o.plugin,r=a[i],l=[e,n,o.options];if(V(r,l,a)===!1&&n.cancelable)return!1}return!0}invalidate(){T(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const i=t&&t.config,n=R(i.options&&i.options.plugins,{}),o=Cd(i);return n===!1&&!e?[]:Md(t,o,n,e)}_notifyStateChanges(t){const e=this._oldCache||[],i=this._cache,n=(o,a)=>o.filter(r=>!a.some(l=>r.plugin.id===l.plugin.id));this._notify(n(e,i),t,"stop"),this._notify(n(i,e),t,"start")}}function Cd(s){const t={},e=[],i=Object.keys(yt.plugins.items);for(let o=0;o<i.length;o++)e.push(yt.getPlugin(i[o]));const n=s.plugins||[];for(let o=0;o<n.length;o++){const a=n[o];e.indexOf(a)===-1&&(e.push(a),t[a.id]=!0)}return{plugins:e,localIds:t}}function Ed(s,t){return!t&&s===!1?null:s===!0?{}:s}function Md(s,{plugins:t,localIds:e},i,n){const o=[],a=s.getContext();for(const r of t){const l=r.id,d=Ed(i[l],n);d!==null&&o.push({plugin:r,options:Pd(s.config,{plugin:r,local:e[l]},d,a)})}return o}function Pd(s,{plugin:t,local:e},i,n){const o=s.pluginScopeKeys(t),a=s.getOptionScopes(i,o);return e&&t.defaults&&a.push(t.defaults),s.createResolver(a,n,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function bi(s,t){const e=U.datasets[s]||{};return((t.datasets||{})[s]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function Dd(s,t){let e=s;return s==="_index_"?e=t:s==="_value_"&&(e=t==="x"?"y":"x"),e}function Rd(s,t){return s===t?"_index_":"_value_"}function $n(s){if(s==="x"||s==="y"||s==="r")return s}function Id(s){if(s==="top"||s==="bottom")return"x";if(s==="left"||s==="right")return"y"}function xi(s,...t){if($n(s))return s;for(const e of t){const i=e.axis||Id(e.position)||s.length>1&&$n(s[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${s}' axis. Please provide 'axis' or 'position' option.`)}function Bn(s,t,e){if(e[t+"AxisID"]===s)return{axis:t}}function Td(s,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(i=>i.xAxisID===s||i.yAxisID===s);if(e.length)return Bn(s,"x",e[0])||Bn(s,"y",e[0])}return{}}function Od(s,t){const e=re[s.type]||{scales:{}},i=t.scales||{},n=bi(s.type,t),o=Object.create(null);return Object.keys(i).forEach(a=>{const r=i[a];if(!O(r))return console.error(`Invalid scale configuration for scale: ${a}`);if(r._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${a}`);const l=xi(a,r,Td(a,s),U.scales[r.type]),d=Rd(l,n),c=e.scales||{};o[a]=je(Object.create(null),[{axis:l},r,c[l],c[d]])}),s.data.datasets.forEach(a=>{const r=a.type||s.type,l=a.indexAxis||bi(r,t),c=(re[r]||{}).scales||{};Object.keys(c).forEach(u=>{const p=Dd(u,l),h=a[p+"AxisID"]||p;o[h]=o[h]||Object.create(null),je(o[h],[{axis:p},i[h],c[u]])})}),Object.keys(o).forEach(a=>{const r=o[a];je(r,[U.scales[r.type],U.scale])}),o}function ea(s){const t=s.options||(s.options={});t.plugins=R(t.plugins,{}),t.scales=Od(s,t)}function sa(s){return s=s||{},s.datasets=s.datasets||[],s.labels=s.labels||[],s}function $d(s){return s=s||{},s.data=sa(s.data),ea(s),s}const jn=new Map,ia=new Set;function us(s,t){let e=jn.get(s);return e||(e=t(),jn.set(s,e),ia.add(e)),e}const Ce=(s,t,e)=>{const i=Ft(t,e);i!==void 0&&s.add(i)};class Bd{constructor(t){this._config=$d(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=sa(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),ea(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return us(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return us(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return us(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,i=this.type;return us(`${i}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const i=this._scopeCache;let n=i.get(t);return(!n||e)&&(n=new Map,i.set(t,n)),n}getOptionScopes(t,e,i){const{options:n,type:o}=this,a=this._cachedScopes(t,i),r=a.get(e);if(r)return r;const l=new Set;e.forEach(c=>{t&&(l.add(t),c.forEach(u=>Ce(l,t,u))),c.forEach(u=>Ce(l,n,u)),c.forEach(u=>Ce(l,re[o]||{},u)),c.forEach(u=>Ce(l,U,u)),c.forEach(u=>Ce(l,fi,u))});const d=Array.from(l);return d.length===0&&d.push(Object.create(null)),ia.has(e)&&a.set(e,d),d}chartOptionScopes(){const{options:t,type:e}=this;return[t,re[e]||{},U.datasets[e]||{},{type:e},U,fi]}resolveNamedOptions(t,e,i,n=[""]){const o={$shared:!0},{resolver:a,subPrefixes:r}=Ln(this._resolverCache,t,n);let l=a;if(Ld(a,e)){o.$shared=!1,i=Nt(i)?i():i;const d=this.createResolver(t,i,r);l=xe(a,i,d)}for(const d of e)o[d]=l[d];return o}createResolver(t,e,i=[""],n){const{resolver:o}=Ln(this._resolverCache,t,i);return O(e)?xe(o,e,void 0,n):o}}function Ln(s,t,e){let i=s.get(t);i||(i=new Map,s.set(t,i));const n=e.join();let o=i.get(n);return o||(o={resolver:Fi(t,e),subPrefixes:e.filter(r=>!r.toLowerCase().includes("hover"))},i.set(n,o)),o}const jd=s=>O(s)&&Object.getOwnPropertyNames(s).some(t=>Nt(s[t]));function Ld(s,t){const{isScriptable:e,isIndexable:i}=$o(s);for(const n of t){const o=e(n),a=i(n),r=(a||o)&&s[n];if(o&&(Nt(r)||jd(r))||a&&W(r))return!0}return!1}var Fd="4.5.1";const Nd=["top","bottom","left","right","chartArea"];function Fn(s,t){return s==="top"||s==="bottom"||Nd.indexOf(s)===-1&&t==="x"}function Nn(s,t){return function(e,i){return e[s]===i[s]?e[t]-i[t]:e[s]-i[s]}}function Vn(s){const t=s.chart,e=t.options.animation;t.notifyPlugins("afterRender"),V(e&&e.onComplete,[s],t)}function Vd(s){const t=s.chart,e=t.options.animation;V(e&&e.onProgress,[s],t)}function na(s){return Hi()&&typeof s=="string"?s=document.getElementById(s):s&&s.length&&(s=s[0]),s&&s.canvas&&(s=s.canvas),s}const Es={},Hn=s=>{const t=na(s);return Object.values(Es).filter(e=>e.canvas===t).pop()};function Hd(s,t,e){const i=Object.keys(s);for(const n of i){const o=+n;if(o>=t){const a=s[n];delete s[n],(e>0||o>t)&&(s[o+e]=a)}}}function zd(s,t,e,i){return!e||s.type==="mouseout"?null:i?t:s}class gt{static register(...t){yt.add(...t),zn()}static unregister(...t){yt.remove(...t),zn()}constructor(t,e){const i=this.config=new Bd(e),n=na(t),o=Hn(n);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");const a=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||rd(n)),this.platform.updateConfig(i);const r=this.platform.acquireContext(n,a.aspectRatio),l=r&&r.canvas,d=l&&l.height,c=l&&l.width;if(this.id=Wa(),this.ctx=r,this.canvas=l,this.width=c,this.height=d,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new Ad,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=rr(u=>this.update(u),a.resizeDelay||0),this._dataChanges=[],Es[this.id]=this,!r||!l){console.error("Failed to create chart: can't acquire context from the given item");return}At.listen(this,"complete",Vn),At.listen(this,"progress",Vd),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:i,height:n,_aspectRatio:o}=this;return T(t)?e&&o?o:n?i/n:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return yt}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():un(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return ln(this.canvas,this.ctx),this}stop(){return At.stop(this),this}resize(t,e){At.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const i=this.options,n=this.canvas,o=i.maintainAspectRatio&&this.aspectRatio,a=this.platform.getMaximumSize(n,t,e,o),r=i.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=a.width,this.height=a.height,this._aspectRatio=this.aspectRatio,un(this,r,!0)&&(this.notifyPlugins("resize",{size:a}),V(i.onResize,[this,a],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};F(e,(i,n)=>{i.id=n})}buildOrUpdateScales(){const t=this.options,e=t.scales,i=this.scales,n=Object.keys(i).reduce((a,r)=>(a[r]=!1,a),{});let o=[];e&&(o=o.concat(Object.keys(e).map(a=>{const r=e[a],l=xi(a,r),d=l==="r",c=l==="x";return{options:r,dposition:d?"chartArea":c?"bottom":"left",dtype:d?"radialLinear":c?"category":"linear"}}))),F(o,a=>{const r=a.options,l=r.id,d=xi(l,r),c=R(r.type,a.dtype);(r.position===void 0||Fn(r.position,d)!==Fn(a.dposition))&&(r.position=a.dposition),n[l]=!0;let u=null;if(l in i&&i[l].type===c)u=i[l];else{const p=yt.getScale(c);u=new p({id:l,type:c,ctx:this.ctx,chart:this}),i[u.id]=u}u.init(r,t)}),F(n,(a,r)=>{a||delete i[r]}),F(i,a=>{et.configure(this,a,a.options),et.addBox(this,a)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,i=t.length;if(t.sort((n,o)=>n.index-o.index),i>e){for(let n=e;n<i;++n)this._destroyDatasetMeta(n);t.splice(e,i-e)}this._sortedMetasets=t.slice(0).sort(Nn("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((i,n)=>{e.filter(o=>o===i._dataset).length===0&&this._destroyDatasetMeta(n)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let i,n;for(this._removeUnreferencedMetasets(),i=0,n=e.length;i<n;i++){const o=e[i];let a=this.getDatasetMeta(i);const r=o.type||this.config.type;if(a.type&&a.type!==r&&(this._destroyDatasetMeta(i),a=this.getDatasetMeta(i)),a.type=r,a.indexAxis=o.indexAxis||bi(r,this.options),a.order=o.order||0,a.index=i,a.label=""+o.label,a.visible=this.isDatasetVisible(i),a.controller)a.controller.updateIndex(i),a.controller.linkScales();else{const l=yt.getController(r),{datasetElementType:d,dataElementType:c}=U.datasets[r];Object.assign(l,{dataElementType:yt.getElement(c),datasetElementType:d&&yt.getElement(d)}),a.controller=new l(this,i),t.push(a.controller)}}return this._updateMetasets(),t}_resetElements(){F(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const i=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),n=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const o=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let a=0;for(let d=0,c=this.data.datasets.length;d<c;d++){const{controller:u}=this.getDatasetMeta(d),p=!n&&o.indexOf(u)===-1;u.buildOrUpdateElements(p),a=Math.max(+u.getMaxOverflow(),a)}a=this._minPadding=i.layout.autoPadding?a:0,this._updateLayout(a),n||F(o,d=>{d.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(Nn("z","_idx"));const{_active:r,_lastEvent:l}=this;l?this._eventHandler(l,!0):r.length&&this._updateHoverStyles(r,r,!0),this.render()}_updateScales(){F(this.scales,t=>{et.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!Zi(e,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:i,start:n,count:o}of e){const a=i==="_removeElements"?-o:o;Hd(t,n,a)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,i=o=>new Set(t.filter(a=>a[0]===o).map((a,r)=>r+","+a.splice(1).join(","))),n=i(0);for(let o=1;o<e;o++)if(!Zi(n,i(o)))return;return Array.from(n).map(o=>o.split(",")).map(o=>({method:o[1],start:+o[2],count:+o[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;et.update(this,this.width,this.height,t);const e=this.chartArea,i=e.width<=0||e.height<=0;this._layers=[],F(this.boxes,n=>{i&&n.position==="chartArea"||(n.configure&&n.configure(),this._layers.push(...n._layers()))},this),this._layers.forEach((n,o)=>{n._idx=o}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,i=this.data.datasets.length;e<i;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,i=this.data.datasets.length;e<i;++e)this._updateDataset(e,Nt(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const i=this.getDatasetMeta(t),n={meta:i,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",n)!==!1&&(i.controller._update(e),n.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",n))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(At.has(this)?this.attached&&!At.running(this)&&At.start(this):(this.draw(),Vn({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:n}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,n)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,i=[];let n,o;for(n=0,o=e.length;n<o;++n){const a=e[n];(!t||a.visible)&&i.push(a)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,i={meta:t,index:t.index,cancelable:!0},n=Uo(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(n&&Ws(e,n),t.controller.draw(),n&&Gs(e),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Dt(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,i,n){const o=Nl.modes[e];return typeof o=="function"?o(this,t,i,n):[]}getDatasetMeta(t){const e=this.data.datasets[t],i=this._metasets;let n=i.filter(o=>o&&o._dataset===e).pop();return n||(n={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},i.push(n)),n}getContext(){return this.$context||(this.$context=Vt(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!e.hidden}setDatasetVisibility(t,e){const i=this.getDatasetMeta(t);i.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,i){const n=i?"show":"hide",o=this.getDatasetMeta(t),a=o.controller._resolveAnimations(void 0,n);Ue(e)?(o.data[e].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),a.update(o,{visible:i}),this.update(r=>r.datasetIndex===t?n:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),At.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),ln(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete Es[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,i=(o,a)=>{e.addEventListener(this,o,a),t[o]=a},n=(o,a,r)=>{o.offsetX=a,o.offsetY=r,this._eventHandler(o)};F(this.options.events,o=>i(o,n))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,i=(l,d)=>{e.addEventListener(this,l,d),t[l]=d},n=(l,d)=>{t[l]&&(e.removeEventListener(this,l,d),delete t[l])},o=(l,d)=>{this.canvas&&this.resize(l,d)};let a;const r=()=>{n("attach",r),this.attached=!0,this.resize(),i("resize",o),i("detach",a)};a=()=>{this.attached=!1,n("resize",o),this._stop(),this._resize(0,0),i("attach",r)},e.isAttached(this.canvas)?r():a()}unbindEvents(){F(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},F(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,i){const n=i?"set":"remove";let o,a,r,l;for(e==="dataset"&&(o=this.getDatasetMeta(t[0].datasetIndex),o.controller["_"+n+"DatasetHoverStyle"]()),r=0,l=t.length;r<l;++r){a=t[r];const d=a&&this.getDatasetMeta(a.datasetIndex).controller;d&&d[n+"HoverStyle"](a.element,a.datasetIndex,a.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],i=t.map(({datasetIndex:o,index:a})=>{const r=this.getDatasetMeta(o);if(!r)throw new Error("No dataset found at index "+o);return{datasetIndex:o,element:r.data[a],index:a}});!Os(i,e)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,e))}notifyPlugins(t,e,i){return this._plugins.notify(this,t,e,i)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,i){const n=this.options.hover,o=(l,d)=>l.filter(c=>!d.some(u=>c.datasetIndex===u.datasetIndex&&c.index===u.index)),a=o(e,t),r=i?t:o(t,e);a.length&&this.updateHoverStyle(a,n.mode,!1),r.length&&n.mode&&this.updateHoverStyle(r,n.mode,!0)}_eventHandler(t,e){const i={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},n=a=>(a.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,n)===!1)return;const o=this._handleEvent(t,e,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,n),(o||i.changed)&&this.render(),this}_handleEvent(t,e,i){const{_active:n=[],options:o}=this,a=e,r=this._getActiveElements(t,n,i,a),l=Ja(t),d=zd(t,this._lastEvent,i,l);i&&(this._lastEvent=null,V(o.onHover,[t,r,this],this),l&&V(o.onClick,[t,r,this],this));const c=!Os(r,n);return(c||e)&&(this._active=r,this._updateHoverStyles(r,n,e)),this._lastEvent=d,c}_getActiveElements(t,e,i,n){if(t.type==="mouseout")return[];if(!i)return e;const o=this.options.hover;return this.getElementsAtEventForMode(t,o.mode,o,n)}}E(gt,"defaults",U),E(gt,"instances",Es),E(gt,"overrides",re),E(gt,"registry",yt),E(gt,"version",Fd),E(gt,"getChart",Hn);function zn(){return F(gt.instances,s=>s._plugins.invalidate())}function Wd(s,t,e){const{startAngle:i,x:n,y:o,outerRadius:a,innerRadius:r,options:l}=t,{borderWidth:d,borderJoinStyle:c}=l,u=Math.min(d/a,tt(i-e));if(s.beginPath(),s.arc(n,o,a-d/2,i+u/2,e-u/2),r>0){const p=Math.min(d/r,tt(i-e));s.arc(n,o,r+d/2,e-p/2,i+p/2,!0)}else{const p=Math.min(d/2,a*tt(i-e));if(c==="round")s.arc(n,o,p,e-B/2,i+B/2,!0);else if(c==="bevel"){const h=2*p*p,m=-h*Math.cos(e+B/2)+n,f=-h*Math.sin(e+B/2)+o,g=h*Math.cos(i+B/2)+n,x=h*Math.sin(i+B/2)+o;s.lineTo(m,f),s.lineTo(g,x)}}s.closePath(),s.moveTo(0,0),s.rect(0,0,s.canvas.width,s.canvas.height),s.clip("evenodd")}function Gd(s,t,e){const{startAngle:i,pixelMargin:n,x:o,y:a,outerRadius:r,innerRadius:l}=t;let d=n/r;s.beginPath(),s.arc(o,a,r,i-d,e+d),l>n?(d=n/l,s.arc(o,a,l,e+d,i-d,!0)):s.arc(o,a,n,e+q,i-q),s.closePath(),s.clip()}function Ud(s){return Li(s,["outerStart","outerEnd","innerStart","innerEnd"])}function Kd(s,t,e,i){const n=Ud(s.options.borderRadius),o=(e-t)/2,a=Math.min(o,i*t/2),r=l=>{const d=(e-Math.min(o,l))*i/2;return Z(l,0,Math.min(o,d))};return{outerStart:r(n.outerStart),outerEnd:r(n.outerEnd),innerStart:Z(n.innerStart,0,a),innerEnd:Z(n.innerEnd,0,a)}}function pe(s,t,e,i){return{x:e+s*Math.cos(t),y:i+s*Math.sin(t)}}function Ns(s,t,e,i,n,o){const{x:a,y:r,startAngle:l,pixelMargin:d,innerRadius:c}=t,u=Math.max(t.outerRadius+i+e-d,0),p=c>0?c+i+e+d:0;let h=0;const m=n-l;if(i){const I=c>0?c-i:0,L=u>0?u-i:0,z=(I+L)/2,it=z!==0?m*z/(z+i):m;h=(m-it)/2}const f=Math.max(.001,m*u-e/B)/u,g=(m-f)/2,x=l+g+h,y=n-g-h,{outerStart:k,outerEnd:b,innerStart:w,innerEnd:S}=Kd(t,p,u,y-x),A=u-k,C=u-b,_=x+k/A,M=y-b/C,P=p+w,D=p+S,N=x+w/P,j=y-S/D;if(s.beginPath(),o){const I=(_+M)/2;if(s.arc(a,r,u,_,I),s.arc(a,r,u,I,M),b>0){const X=pe(C,M,a,r);s.arc(X.x,X.y,b,M,y+q)}const L=pe(D,y,a,r);if(s.lineTo(L.x,L.y),S>0){const X=pe(D,j,a,r);s.arc(X.x,X.y,S,y+q,j+Math.PI)}const z=(y-S/p+(x+w/p))/2;if(s.arc(a,r,p,y-S/p,z,!0),s.arc(a,r,p,z,x+w/p,!0),w>0){const X=pe(P,N,a,r);s.arc(X.x,X.y,w,N+Math.PI,x-q)}const it=pe(A,x,a,r);if(s.lineTo(it.x,it.y),k>0){const X=pe(A,_,a,r);s.arc(X.x,X.y,k,x-q,_)}}else{s.moveTo(a,r);const I=Math.cos(_)*u+a,L=Math.sin(_)*u+r;s.lineTo(I,L);const z=Math.cos(M)*u+a,it=Math.sin(M)*u+r;s.lineTo(z,it)}s.closePath()}function qd(s,t,e,i,n){const{fullCircles:o,startAngle:a,circumference:r}=t;let l=t.endAngle;if(o){Ns(s,t,e,i,l,n);for(let d=0;d<o;++d)s.fill();isNaN(r)||(l=a+(r%H||H))}return Ns(s,t,e,i,l,n),s.fill(),l}function Yd(s,t,e,i,n){const{fullCircles:o,startAngle:a,circumference:r,options:l}=t,{borderWidth:d,borderJoinStyle:c,borderDash:u,borderDashOffset:p,borderRadius:h}=l,m=l.borderAlign==="inner";if(!d)return;s.setLineDash(u||[]),s.lineDashOffset=p,m?(s.lineWidth=d*2,s.lineJoin=c||"round"):(s.lineWidth=d,s.lineJoin=c||"bevel");let f=t.endAngle;if(o){Ns(s,t,e,i,f,n);for(let g=0;g<o;++g)s.stroke();isNaN(r)||(f=a+(r%H||H))}m&&Gd(s,t,f),l.selfJoin&&f-a>=B&&h===0&&c!=="miter"&&Wd(s,t,f),o||(Ns(s,t,e,i,f,n),s.stroke())}class Ie extends xt{constructor(e){super();E(this,"circumference");E(this,"endAngle");E(this,"fullCircles");E(this,"innerRadius");E(this,"outerRadius");E(this,"pixelMargin");E(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,i,n){const o=this.getProps(["x","y"],n),{angle:a,distance:r}=Ao(o,{x:e,y:i}),{startAngle:l,endAngle:d,innerRadius:c,outerRadius:u,circumference:p}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],n),h=(this.options.spacing+this.options.borderWidth)/2,m=R(p,d-l),f=Ke(a,l,d)&&l!==d,g=m>=H||f,x=Mt(r,c+h,u+h);return g&&x}getCenterPoint(e){const{x:i,y:n,startAngle:o,endAngle:a,innerRadius:r,outerRadius:l}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:d,spacing:c}=this.options,u=(o+a)/2,p=(r+l+c+d)/2;return{x:i+Math.cos(u)*p,y:n+Math.sin(u)*p}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:i,circumference:n}=this,o=(i.offset||0)/4,a=(i.spacing||0)/2,r=i.circular;if(this.pixelMargin=i.borderAlign==="inner"?.33:0,this.fullCircles=n>H?Math.floor(n/H):0,n===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const l=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(l)*o,Math.sin(l)*o);const d=1-Math.sin(Math.min(B,n||0)),c=o*d;e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,qd(e,this,c,a,r),Yd(e,this,c,a,r),e.restore()}}E(Ie,"id","arc"),E(Ie,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),E(Ie,"defaultRoutes",{backgroundColor:"backgroundColor"}),E(Ie,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function oa(s,t,e=t){s.lineCap=R(e.borderCapStyle,t.borderCapStyle),s.setLineDash(R(e.borderDash,t.borderDash)),s.lineDashOffset=R(e.borderDashOffset,t.borderDashOffset),s.lineJoin=R(e.borderJoinStyle,t.borderJoinStyle),s.lineWidth=R(e.borderWidth,t.borderWidth),s.strokeStyle=R(e.borderColor,t.borderColor)}function Jd(s,t,e){s.lineTo(e.x,e.y)}function Xd(s){return s.stepped?vr:s.tension||s.cubicInterpolationMode==="monotone"?yr:Jd}function aa(s,t,e={}){const i=s.length,{start:n=0,end:o=i-1}=e,{start:a,end:r}=t,l=Math.max(n,a),d=Math.min(o,r),c=n<a&&o<a||n>r&&o>r;return{count:i,start:l,loop:t.loop,ilen:d<l&&!c?i+d-l:d-l}}function Zd(s,t,e,i){const{points:n,options:o}=t,{count:a,start:r,loop:l,ilen:d}=aa(n,e,i),c=Xd(o);let{move:u=!0,reverse:p}=i||{},h,m,f;for(h=0;h<=d;++h)m=n[(r+(p?d-h:h))%a],!m.skip&&(u?(s.moveTo(m.x,m.y),u=!1):c(s,f,m,p,o.stepped),f=m);return l&&(m=n[(r+(p?d:0))%a],c(s,f,m,p,o.stepped)),!!l}function Qd(s,t,e,i){const n=t.points,{count:o,start:a,ilen:r}=aa(n,e,i),{move:l=!0,reverse:d}=i||{};let c=0,u=0,p,h,m,f,g,x;const y=b=>(a+(d?r-b:b))%o,k=()=>{f!==g&&(s.lineTo(c,g),s.lineTo(c,f),s.lineTo(c,x))};for(l&&(h=n[y(0)],s.moveTo(h.x,h.y)),p=0;p<=r;++p){if(h=n[y(p)],h.skip)continue;const b=h.x,w=h.y,S=b|0;S===m?(w<f?f=w:w>g&&(g=w),c=(u*c+b)/++u):(k(),s.lineTo(b,w),m=S,u=0,f=g=w),x=w}k()}function vi(s){const t=s.options,e=t.borderDash&&t.borderDash.length;return!s._decimated&&!s._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?Qd:Zd}function tc(s){return s.stepped?Zr:s.tension||s.cubicInterpolationMode==="monotone"?Qr:te}function ec(s,t,e,i){let n=t._path;n||(n=t._path=new Path2D,t.path(n,e,i)&&n.closePath()),oa(s,t.options),s.stroke(n)}function sc(s,t,e,i){const{segments:n,options:o}=t,a=vi(t);for(const r of n)oa(s,o,r.style),s.beginPath(),a(s,t,r,{start:e,end:e+i-1})&&s.closePath(),s.stroke()}const ic=typeof Path2D=="function";function nc(s,t,e,i){ic&&!t.options.segment?ec(s,t,e,i):sc(s,t,e,i)}class $t extends xt{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const n=i.spanGaps?this._loop:this._fullLoop;Wr(this._points,i,t,n,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=ol(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,i=t.length;return i&&e[t[i-1].end]}interpolate(t,e){const i=this.options,n=t[e],o=this.points,a=Go(this,{property:e,start:n,end:n});if(!a.length)return;const r=[],l=tc(i);let d,c;for(d=0,c=a.length;d<c;++d){const{start:u,end:p}=a[d],h=o[u],m=o[p];if(h===m){r.push(h);continue}const f=Math.abs((n-h[e])/(m[e]-h[e])),g=l(h,m,f,i.stepped);g[e]=t[e],r.push(g)}return r.length===1?r[0]:r}pathSegment(t,e,i){return vi(this)(t,this,e,i)}path(t,e,i){const n=this.segments,o=vi(this);let a=this._loop;e=e||0,i=i||this.points.length-e;for(const r of n)a&=o(t,this,r,{start:e,end:e+i-1});return!!a}draw(t,e,i,n){const o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),nc(t,this,i,n),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}E($t,"id","line"),E($t,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),E($t,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),E($t,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function Wn(s,t,e,i){const n=s.options,{[e]:o}=s.getProps([e],i);return Math.abs(t-o)<n.radius+n.hitRadius}class Ms extends xt{constructor(e){super();E(this,"parsed");E(this,"skip");E(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,i,n){const o=this.options,{x:a,y:r}=this.getProps(["x","y"],n);return Math.pow(e-a,2)+Math.pow(i-r,2)<Math.pow(o.hitRadius+o.radius,2)}inXRange(e,i){return Wn(this,e,"x",i)}inYRange(e,i){return Wn(this,e,"y",i)}getCenterPoint(e){const{x:i,y:n}=this.getProps(["x","y"],e);return{x:i,y:n}}size(e){e=e||this.options||{};let i=e.radius||0;i=Math.max(i,i&&e.hoverRadius||0);const n=i&&e.borderWidth||0;return(i+n)*2}draw(e,i){const n=this.options;this.skip||n.radius<.1||!Dt(this,i,this.size(n)/2)||(e.strokeStyle=n.borderColor,e.lineWidth=n.borderWidth,e.fillStyle=n.backgroundColor,gi(e,n,this.x,this.y))}getRange(){const e=this.options||{};return e.radius+e.hitRadius}}E(Ms,"id","point"),E(Ms,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),E(Ms,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function ra(s,t){const{x:e,y:i,base:n,width:o,height:a}=s.getProps(["x","y","base","width","height"],t);let r,l,d,c,u;return s.horizontal?(u=a/2,r=Math.min(e,n),l=Math.max(e,n),d=i-u,c=i+u):(u=o/2,r=e-u,l=e+u,d=Math.min(i,n),c=Math.max(i,n)),{left:r,top:d,right:l,bottom:c}}function Bt(s,t,e,i){return s?0:Z(t,e,i)}function oc(s,t,e){const i=s.options.borderWidth,n=s.borderSkipped,o=Oo(i);return{t:Bt(n.top,o.top,0,e),r:Bt(n.right,o.right,0,t),b:Bt(n.bottom,o.bottom,0,e),l:Bt(n.left,o.left,0,t)}}function ac(s,t,e){const{enableBorderRadius:i}=s.getProps(["enableBorderRadius"]),n=s.options.borderRadius,o=ne(n),a=Math.min(t,e),r=s.borderSkipped,l=i||O(n);return{topLeft:Bt(!l||r.top||r.left,o.topLeft,0,a),topRight:Bt(!l||r.top||r.right,o.topRight,0,a),bottomLeft:Bt(!l||r.bottom||r.left,o.bottomLeft,0,a),bottomRight:Bt(!l||r.bottom||r.right,o.bottomRight,0,a)}}function rc(s){const t=ra(s),e=t.right-t.left,i=t.bottom-t.top,n=oc(s,e/2,i/2),o=ac(s,e/2,i/2);return{outer:{x:t.left,y:t.top,w:e,h:i,radius:o},inner:{x:t.left+n.l,y:t.top+n.t,w:e-n.l-n.r,h:i-n.t-n.b,radius:{topLeft:Math.max(0,o.topLeft-Math.max(n.t,n.l)),topRight:Math.max(0,o.topRight-Math.max(n.t,n.r)),bottomLeft:Math.max(0,o.bottomLeft-Math.max(n.b,n.l)),bottomRight:Math.max(0,o.bottomRight-Math.max(n.b,n.r))}}}}function ri(s,t,e,i){const n=t===null,o=e===null,r=s&&!(n&&o)&&ra(s,i);return r&&(n||Mt(t,r.left,r.right))&&(o||Mt(e,r.top,r.bottom))}function lc(s){return s.topLeft||s.topRight||s.bottomLeft||s.bottomRight}function dc(s,t){s.rect(t.x,t.y,t.w,t.h)}function li(s,t,e={}){const i=s.x!==e.x?-t:0,n=s.y!==e.y?-t:0,o=(s.x+s.w!==e.x+e.w?t:0)-i,a=(s.y+s.h!==e.y+e.h?t:0)-n;return{x:s.x+i,y:s.y+n,w:s.w+o,h:s.h+a,radius:s.radius}}class Ps extends xt{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:i,backgroundColor:n}}=this,{inner:o,outer:a}=rc(this),r=lc(a.radius)?qe:dc;t.save(),(a.w!==o.w||a.h!==o.h)&&(t.beginPath(),r(t,li(a,e,o)),t.clip(),r(t,li(o,-e,a)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),r(t,li(o,e)),t.fillStyle=n,t.fill(),t.restore()}inRange(t,e,i){return ri(this,t,e,i)}inXRange(t,e){return ri(this,t,null,e)}inYRange(t,e){return ri(this,null,t,e)}getCenterPoint(t){const{x:e,y:i,base:n,horizontal:o}=this.getProps(["x","y","base","horizontal"],t);return{x:o?(e+n)/2:e,y:o?i:(i+n)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}E(Ps,"id","bar"),E(Ps,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),E(Ps,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var cc=Object.freeze({__proto__:null,ArcElement:Ie,BarElement:Ps,LineElement:$t,PointElement:Ms});const yi=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Gn=yi.map(s=>s.replace("rgb(","rgba(").replace(")",", 0.5)"));function la(s){return yi[s%yi.length]}function da(s){return Gn[s%Gn.length]}function uc(s,t){return s.borderColor=la(t),s.backgroundColor=da(t),++t}function pc(s,t){return s.backgroundColor=s.data.map(()=>la(t++)),t}function hc(s,t){return s.backgroundColor=s.data.map(()=>da(t++)),t}function fc(s){let t=0;return(e,i)=>{const n=s.getDatasetMeta(i).controller;n instanceof ie?t=pc(e,t):n instanceof Ve?t=hc(e,t):n&&(t=uc(e,t))}}function Un(s){let t;for(t in s)if(s[t].borderColor||s[t].backgroundColor)return!0;return!1}function gc(s){return s&&(s.borderColor||s.backgroundColor)}function mc(){return U.borderColor!=="rgba(0,0,0,0.1)"||U.backgroundColor!=="rgba(0,0,0,0.1)"}var bc={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(s,t,e){if(!e.enabled)return;const{data:{datasets:i},options:n}=s.config,{elements:o}=n,a=Un(i)||gc(n)||o&&Un(o)||mc();if(!e.forceOverride&&a)return;const r=fc(s);i.forEach(r)}};function xc(s,t,e,i,n){const o=n.samples||i;if(o>=e)return s.slice(t,t+e);const a=[],r=(e-2)/(o-2);let l=0;const d=t+e-1;let c=t,u,p,h,m,f;for(a[l++]=s[c],u=0;u<o-2;u++){let g=0,x=0,y;const k=Math.floor((u+1)*r)+1+t,b=Math.min(Math.floor((u+2)*r)+1,e)+t,w=b-k;for(y=k;y<b;y++)g+=s[y].x,x+=s[y].y;g/=w,x/=w;const S=Math.floor(u*r)+1+t,A=Math.min(Math.floor((u+1)*r)+1,e)+t,{x:C,y:_}=s[c];for(h=m=-1,y=S;y<A;y++)m=.5*Math.abs((C-g)*(s[y].y-_)-(C-s[y].x)*(x-_)),m>h&&(h=m,p=s[y],f=y);a[l++]=p,c=f}return a[l++]=s[d],a}function vc(s,t,e,i){let n=0,o=0,a,r,l,d,c,u,p,h,m,f;const g=[],x=t+e-1,y=s[t].x,b=s[x].x-y;for(a=t;a<t+e;++a){r=s[a],l=(r.x-y)/b*i,d=r.y;const w=l|0;if(w===c)d<m?(m=d,u=a):d>f&&(f=d,p=a),n=(o*n+r.x)/++o;else{const S=a-1;if(!T(u)&&!T(p)){const A=Math.min(u,p),C=Math.max(u,p);A!==h&&A!==S&&g.push({...s[A],x:n}),C!==h&&C!==S&&g.push({...s[C],x:n})}a>0&&S!==h&&g.push(s[S]),g.push(r),c=w,o=0,m=f=d,u=p=h=a}}return g}function ca(s){if(s._decimated){const t=s._data;delete s._decimated,delete s._data,Object.defineProperty(s,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Kn(s){s.data.datasets.forEach(t=>{ca(t)})}function yc(s,t){const e=t.length;let i=0,n;const{iScale:o}=s,{min:a,max:r,minDefined:l,maxDefined:d}=o.getUserBounds();return l&&(i=Z(Pt(t,o.axis,a).lo,0,e-1)),d?n=Z(Pt(t,o.axis,r).hi+1,i,e)-i:n=e-i,{start:i,count:n}}var wc={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(s,t,e)=>{if(!e.enabled){Kn(s);return}const i=s.width;s.data.datasets.forEach((n,o)=>{const{_data:a,indexAxis:r}=n,l=s.getDatasetMeta(o),d=a||n.data;if(De([r,s.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;const c=s.scales[l.xAxisID];if(c.type!=="linear"&&c.type!=="time"||s.options.parsing)return;let{start:u,count:p}=yc(l,d);const h=e.threshold||4*i;if(p<=h){ca(n);return}T(a)&&(n._data=d,delete n.data,Object.defineProperty(n,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(f){this._data=f}}));let m;switch(e.algorithm){case"lttb":m=xc(d,u,p,i,e);break;case"min-max":m=vc(d,u,p,i);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}n._decimated=m})},destroy(s){Kn(s)}};function kc(s,t,e){const i=s.segments,n=s.points,o=t.points,a=[];for(const r of i){let{start:l,end:d}=r;d=qs(l,d,n);const c=wi(e,n[l],n[d],r.loop);if(!t.segments){a.push({source:r,target:c,start:n[l],end:n[d]});continue}const u=Go(t,c);for(const p of u){const h=wi(e,o[p.start],o[p.end],p.loop),m=Wo(r,n,h);for(const f of m)a.push({source:f,target:p,start:{[e]:qn(c,h,"start",Math.max)},end:{[e]:qn(c,h,"end",Math.min)}})}}return a}function wi(s,t,e,i){if(i)return;let n=t[s],o=e[s];return s==="angle"&&(n=tt(n),o=tt(o)),{property:s,start:n,end:o}}function Sc(s,t){const{x:e=null,y:i=null}=s||{},n=t.points,o=[];return t.segments.forEach(({start:a,end:r})=>{r=qs(a,r,n);const l=n[a],d=n[r];i!==null?(o.push({x:l.x,y:i}),o.push({x:d.x,y:i})):e!==null&&(o.push({x:e,y:l.y}),o.push({x:e,y:d.y}))}),o}function qs(s,t,e){for(;t>s;t--){const i=e[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function qn(s,t,e,i){return s&&t?i(s[e],t[e]):s?s[e]:t?t[e]:0}function ua(s,t){let e=[],i=!1;return W(s)?(i=!0,e=s):e=Sc(s,t),e.length?new $t({points:e,options:{tension:0},_loop:i,_fullLoop:i}):null}function Yn(s){return s&&s.fill!==!1}function _c(s,t,e){let n=s[t].fill;const o=[t];let a;if(!e)return n;for(;n!==!1&&o.indexOf(n)===-1;){if(!K(n))return n;if(a=s[n],!a)return!1;if(a.visible)return n;o.push(n),n=a.fill}return!1}function Ac(s,t,e){const i=Pc(s);if(O(i))return isNaN(i.value)?!1:i;let n=parseFloat(i);return K(n)&&Math.floor(n)===n?Cc(i[0],t,n,e):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function Cc(s,t,e,i){return(s==="-"||s==="+")&&(e=t+e),e===t||e<0||e>=i?!1:e}function Ec(s,t){let e=null;return s==="start"?e=t.bottom:s==="end"?e=t.top:O(s)?e=t.getPixelForValue(s.value):t.getBasePixel&&(e=t.getBasePixel()),e}function Mc(s,t,e){let i;return s==="start"?i=e:s==="end"?i=t.options.reverse?t.min:t.max:O(s)?i=s.value:i=t.getBaseValue(),i}function Pc(s){const t=s.options,e=t.fill;let i=R(e&&e.target,e);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function Dc(s){const{scale:t,index:e,line:i}=s,n=[],o=i.segments,a=i.points,r=Rc(t,e);r.push(ua({x:null,y:t.bottom},i));for(let l=0;l<o.length;l++){const d=o[l];for(let c=d.start;c<=d.end;c++)Ic(n,a[c],r)}return new $t({points:n,options:{}})}function Rc(s,t){const e=[],i=s.getMatchingVisibleMetas("line");for(let n=0;n<i.length;n++){const o=i[n];if(o.index===t)break;o.hidden||e.unshift(o.dataset)}return e}function Ic(s,t,e){const i=[];for(let n=0;n<e.length;n++){const o=e[n],{first:a,last:r,point:l}=Tc(o,t,"x");if(!(!l||a&&r)){if(a)i.unshift(l);else if(s.push(l),!r)break}}s.push(...i)}function Tc(s,t,e){const i=s.interpolate(t,e);if(!i)return{};const n=i[e],o=s.segments,a=s.points;let r=!1,l=!1;for(let d=0;d<o.length;d++){const c=o[d],u=a[c.start][e],p=a[c.end][e];if(Mt(n,u,p)){r=n===u,l=n===p;break}}return{first:r,last:l,point:i}}class pa{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,i){const{x:n,y:o,radius:a}=this;return e=e||{start:0,end:H},t.arc(n,o,a,e.end,e.start,!0),!i.bounds}interpolate(t){const{x:e,y:i,radius:n}=this,o=t.angle;return{x:e+Math.cos(o)*n,y:i+Math.sin(o)*n,angle:o}}}function Oc(s){const{chart:t,fill:e,line:i}=s;if(K(e))return $c(t,e);if(e==="stack")return Dc(s);if(e==="shape")return!0;const n=Bc(s);return n instanceof pa?n:ua(n,i)}function $c(s,t){const e=s.getDatasetMeta(t);return e&&s.isDatasetVisible(t)?e.dataset:null}function Bc(s){return(s.scale||{}).getPointPositionForValue?Lc(s):jc(s)}function jc(s){const{scale:t={},fill:e}=s,i=Ec(e,t);if(K(i)){const n=t.isHorizontal();return{x:n?i:null,y:n?null:i}}return null}function Lc(s){const{scale:t,fill:e}=s,i=t.options,n=t.getLabels().length,o=i.reverse?t.max:t.min,a=Mc(e,t,o),r=[];if(i.grid.circular){const l=t.getPointPositionForValue(0,o);return new pa({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(a)})}for(let l=0;l<n;++l)r.push(t.getPointPositionForValue(l,a));return r}function di(s,t,e){const i=Oc(t),{chart:n,index:o,line:a,scale:r,axis:l}=t,d=a.options,c=d.fill,u=d.backgroundColor,{above:p=u,below:h=u}=c||{},m=n.getDatasetMeta(o),f=Uo(n,m);i&&a.points.length&&(Ws(s,e),Fc(s,{line:a,target:i,above:p,below:h,area:e,scale:r,axis:l,clip:f}),Gs(s))}function Fc(s,t){const{line:e,target:i,above:n,below:o,area:a,scale:r,clip:l}=t,d=e._loop?"angle":t.axis;s.save();let c=o;o!==n&&(d==="x"?(Jn(s,i,a.top),ci(s,{line:e,target:i,color:n,scale:r,property:d,clip:l}),s.restore(),s.save(),Jn(s,i,a.bottom)):d==="y"&&(Xn(s,i,a.left),ci(s,{line:e,target:i,color:o,scale:r,property:d,clip:l}),s.restore(),s.save(),Xn(s,i,a.right),c=n)),ci(s,{line:e,target:i,color:c,scale:r,property:d,clip:l}),s.restore()}function Jn(s,t,e){const{segments:i,points:n}=t;let o=!0,a=!1;s.beginPath();for(const r of i){const{start:l,end:d}=r,c=n[l],u=n[qs(l,d,n)];o?(s.moveTo(c.x,c.y),o=!1):(s.lineTo(c.x,e),s.lineTo(c.x,c.y)),a=!!t.pathSegment(s,r,{move:a}),a?s.closePath():s.lineTo(u.x,e)}s.lineTo(t.first().x,e),s.closePath(),s.clip()}function Xn(s,t,e){const{segments:i,points:n}=t;let o=!0,a=!1;s.beginPath();for(const r of i){const{start:l,end:d}=r,c=n[l],u=n[qs(l,d,n)];o?(s.moveTo(c.x,c.y),o=!1):(s.lineTo(e,c.y),s.lineTo(c.x,c.y)),a=!!t.pathSegment(s,r,{move:a}),a?s.closePath():s.lineTo(e,u.y)}s.lineTo(e,t.first().y),s.closePath(),s.clip()}function ci(s,t){const{line:e,target:i,property:n,color:o,scale:a,clip:r}=t,l=kc(e,i,n);for(const{source:d,target:c,start:u,end:p}of l){const{style:{backgroundColor:h=o}={}}=d,m=i!==!0;s.save(),s.fillStyle=h,Nc(s,a,r,m&&wi(n,u,p)),s.beginPath();const f=!!e.pathSegment(s,d);let g;if(m){f?s.closePath():Zn(s,i,p,n);const x=!!i.pathSegment(s,c,{move:f,reverse:!0});g=f&&x,g||Zn(s,i,u,n)}s.closePath(),s.fill(g?"evenodd":"nonzero"),s.restore()}}function Nc(s,t,e,i){const n=t.chart.chartArea,{property:o,start:a,end:r}=i||{};if(o==="x"||o==="y"){let l,d,c,u;o==="x"?(l=a,d=n.top,c=r,u=n.bottom):(l=n.left,d=a,c=n.right,u=r),s.beginPath(),e&&(l=Math.max(l,e.left),c=Math.min(c,e.right),d=Math.max(d,e.top),u=Math.min(u,e.bottom)),s.rect(l,d,c-l,u-d),s.clip()}}function Zn(s,t,e,i){const n=t.interpolate(e,i);n&&s.lineTo(n.x,n.y)}var Vc={id:"filler",afterDatasetsUpdate(s,t,e){const i=(s.data.datasets||[]).length,n=[];let o,a,r,l;for(a=0;a<i;++a)o=s.getDatasetMeta(a),r=o.dataset,l=null,r&&r.options&&r instanceof $t&&(l={visible:s.isDatasetVisible(a),index:a,fill:Ac(r,a,i),chart:s,axis:o.controller.options.indexAxis,scale:o.vScale,line:r}),o.$filler=l,n.push(l);for(a=0;a<i;++a)l=n[a],!(!l||l.fill===!1)&&(l.fill=_c(n,a,e.propagate))},beforeDraw(s,t,e){const i=e.drawTime==="beforeDraw",n=s.getSortedVisibleDatasetMetas(),o=s.chartArea;for(let a=n.length-1;a>=0;--a){const r=n[a].$filler;r&&(r.line.updateControlPoints(o,r.axis),i&&r.fill&&di(s.ctx,r,o))}},beforeDatasetsDraw(s,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const i=s.getSortedVisibleDatasetMetas();for(let n=i.length-1;n>=0;--n){const o=i[n].$filler;Yn(o)&&di(s.ctx,o,s.chartArea)}},beforeDatasetDraw(s,t,e){const i=t.meta.$filler;!Yn(i)||e.drawTime!=="beforeDatasetDraw"||di(s.ctx,i,s.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Qn=(s,t)=>{let{boxHeight:e=t,boxWidth:i=t}=s;return s.usePointStyle&&(e=Math.min(e,t),i=s.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:e,itemHeight:Math.max(t,e)}},Hc=(s,t)=>s!==null&&t!==null&&s.datasetIndex===t.datasetIndex&&s.index===t.index;class to extends xt{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,i){this.maxWidth=t,this.maxHeight=e,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=V(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(i=>t.filter(i,this.chart.data))),t.sort&&(e=e.sort((i,n)=>t.sort(i,n,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,n=J(i.font),o=n.size,a=this._computeTitleHeight(),{boxWidth:r,itemHeight:l}=Qn(i,o);let d,c;e.font=n.string,this.isHorizontal()?(d=this.maxWidth,c=this._fitRows(a,o,r,l)+10):(c=this.maxHeight,d=this._fitCols(a,n,r,l)+10),this.width=Math.min(d,t.maxWidth||this.maxWidth),this.height=Math.min(c,t.maxHeight||this.maxHeight)}_fitRows(t,e,i,n){const{ctx:o,maxWidth:a,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],d=this.lineWidths=[0],c=n+r;let u=t;o.textAlign="left",o.textBaseline="middle";let p=-1,h=-c;return this.legendItems.forEach((m,f)=>{const g=i+e/2+o.measureText(m.text).width;(f===0||d[d.length-1]+g+2*r>a)&&(u+=c,d[d.length-(f>0?0:1)]=0,h+=c,p++),l[f]={left:0,top:h,row:p,width:g,height:n},d[d.length-1]+=g+r}),u}_fitCols(t,e,i,n){const{ctx:o,maxHeight:a,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],d=this.columnSizes=[],c=a-t;let u=r,p=0,h=0,m=0,f=0;return this.legendItems.forEach((g,x)=>{const{itemWidth:y,itemHeight:k}=zc(i,e,o,g,n);x>0&&h+k+2*r>c&&(u+=p+r,d.push({width:p,height:h}),m+=p+r,f++,p=h=0),l[x]={left:m,top:h,col:f,width:y,height:k},p=Math.max(p,y),h+=k+r}),u+=p,d.push({width:p,height:h}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:i,labels:{padding:n},rtl:o}}=this,a=me(o,this.left,this.width);if(this.isHorizontal()){let r=0,l=Q(i,this.left+n,this.right-this.lineWidths[r]);for(const d of e)r!==d.row&&(r=d.row,l=Q(i,this.left+n,this.right-this.lineWidths[r])),d.top+=this.top+t+n,d.left=a.leftForLtr(a.x(l),d.width),l+=d.width+n}else{let r=0,l=Q(i,this.top+t+n,this.bottom-this.columnSizes[r].height);for(const d of e)d.col!==r&&(r=d.col,l=Q(i,this.top+t+n,this.bottom-this.columnSizes[r].height)),d.top=l,d.left+=this.left+n,d.left=a.leftForLtr(a.x(d.left),d.width),l+=d.height+n}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Ws(t,this),this._draw(),Gs(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:i,ctx:n}=this,{align:o,labels:a}=t,r=U.color,l=me(t.rtl,this.left,this.width),d=J(a.font),{padding:c}=a,u=d.size,p=u/2;let h;this.drawTitle(),n.textAlign=l.textAlign("left"),n.textBaseline="middle",n.lineWidth=.5,n.font=d.string;const{boxWidth:m,boxHeight:f,itemHeight:g}=Qn(a,u),x=function(S,A,C){if(isNaN(m)||m<=0||isNaN(f)||f<0)return;n.save();const _=R(C.lineWidth,1);if(n.fillStyle=R(C.fillStyle,r),n.lineCap=R(C.lineCap,"butt"),n.lineDashOffset=R(C.lineDashOffset,0),n.lineJoin=R(C.lineJoin,"miter"),n.lineWidth=_,n.strokeStyle=R(C.strokeStyle,r),n.setLineDash(R(C.lineDash,[])),a.usePointStyle){const M={radius:f*Math.SQRT2/2,pointStyle:C.pointStyle,rotation:C.rotation,borderWidth:_},P=l.xPlus(S,m/2),D=A+p;To(n,M,P,D,a.pointStyleWidth&&m)}else{const M=A+Math.max((u-f)/2,0),P=l.leftForLtr(S,m),D=ne(C.borderRadius);n.beginPath(),Object.values(D).some(N=>N!==0)?qe(n,{x:P,y:M,w:m,h:f,radius:D}):n.rect(P,M,m,f),n.fill(),_!==0&&n.stroke()}n.restore()},y=function(S,A,C){le(n,C.text,S,A+g/2,d,{strikethrough:C.hidden,textAlign:l.textAlign(C.textAlign)})},k=this.isHorizontal(),b=this._computeTitleHeight();k?h={x:Q(o,this.left+c,this.right-i[0]),y:this.top+c+b,line:0}:h={x:this.left+c,y:Q(o,this.top+b+c,this.bottom-e[0].height),line:0},Vo(this.ctx,t.textDirection);const w=g+c;this.legendItems.forEach((S,A)=>{n.strokeStyle=S.fontColor,n.fillStyle=S.fontColor;const C=n.measureText(S.text).width,_=l.textAlign(S.textAlign||(S.textAlign=a.textAlign)),M=m+p+C;let P=h.x,D=h.y;l.setWidth(this.width),k?A>0&&P+M+c>this.right&&(D=h.y+=w,h.line++,P=h.x=Q(o,this.left+c,this.right-i[h.line])):A>0&&D+w>this.bottom&&(P=h.x=P+e[h.line].width+c,h.line++,D=h.y=Q(o,this.top+b+c,this.bottom-e[h.line].height));const N=l.x(P);if(x(N,D,S),P=lr(_,P+m+p,k?P+M:this.right,t.rtl),y(l.x(P),D,S),k)h.x+=M+c;else if(typeof S.text!="string"){const j=d.lineHeight;h.y+=ha(S,j)+c}else h.y+=w}),Ho(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,i=J(e.font),n=st(e.padding);if(!e.display)return;const o=me(t.rtl,this.left,this.width),a=this.ctx,r=e.position,l=i.size/2,d=n.top+l;let c,u=this.left,p=this.width;if(this.isHorizontal())p=Math.max(...this.lineWidths),c=this.top+d,u=Q(t.align,u,this.right-p);else{const m=this.columnSizes.reduce((f,g)=>Math.max(f,g.height),0);c=d+Q(t.align,this.top,this.bottom-m-t.labels.padding-this._computeTitleHeight())}const h=Q(r,u,u+p);a.textAlign=o.textAlign(Bi(r)),a.textBaseline="middle",a.strokeStyle=e.color,a.fillStyle=e.color,a.font=i.string,le(a,e.text,h,c,i)}_computeTitleHeight(){const t=this.options.title,e=J(t.font),i=st(t.padding);return t.display?e.lineHeight+i.height:0}_getLegendItemAt(t,e){let i,n,o;if(Mt(t,this.left,this.right)&&Mt(e,this.top,this.bottom)){for(o=this.legendHitBoxes,i=0;i<o.length;++i)if(n=o[i],Mt(t,n.left,n.left+n.width)&&Mt(e,n.top,n.top+n.height))return this.legendItems[i]}return null}handleEvent(t){const e=this.options;if(!Uc(t.type,e))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const n=this._hoveredItem,o=Hc(n,i);n&&!o&&V(e.onLeave,[t,n,this],this),this._hoveredItem=i,i&&!o&&V(e.onHover,[t,i,this],this)}else i&&V(e.onClick,[t,i,this],this)}}function zc(s,t,e,i,n){const o=Wc(i,s,t,e),a=Gc(n,i,t.lineHeight);return{itemWidth:o,itemHeight:a}}function Wc(s,t,e,i){let n=s.text;return n&&typeof n!="string"&&(n=n.reduce((o,a)=>o.length>a.length?o:a)),t+e.size/2+i.measureText(n).width}function Gc(s,t,e){let i=s;return typeof t.text!="string"&&(i=ha(t,e)),i}function ha(s,t){const e=s.text?s.text.length:0;return t*e}function Uc(s,t){return!!((s==="mousemove"||s==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(s==="click"||s==="mouseup"))}var Kc={id:"legend",_element:to,start(s,t,e){const i=s.legend=new to({ctx:s.ctx,options:e,chart:s});et.configure(s,i,e),et.addBox(s,i)},stop(s){et.removeBox(s,s.legend),delete s.legend},beforeUpdate(s,t,e){const i=s.legend;et.configure(s,i,e),i.options=e},afterUpdate(s){const t=s.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(s,t){t.replay||s.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(s,t,e){const i=t.datasetIndex,n=e.chart;n.isDatasetVisible(i)?(n.hide(i),t.hidden=!0):(n.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:s=>s.chart.options.color,boxWidth:40,padding:10,generateLabels(s){const t=s.data.datasets,{labels:{usePointStyle:e,pointStyle:i,textAlign:n,color:o,useBorderRadius:a,borderRadius:r}}=s.legend.options;return s._getSortedDatasetMetas().map(l=>{const d=l.controller.getStyle(e?0:void 0),c=st(d.borderWidth);return{text:t[l.index].label,fillStyle:d.backgroundColor,fontColor:o,hidden:!l.visible,lineCap:d.borderCapStyle,lineDash:d.borderDash,lineDashOffset:d.borderDashOffset,lineJoin:d.borderJoinStyle,lineWidth:(c.width+c.height)/4,strokeStyle:d.borderColor,pointStyle:i||d.pointStyle,rotation:d.rotation,textAlign:n||d.textAlign,borderRadius:a&&(r||d.borderRadius),datasetIndex:l.index}},this)}},title:{color:s=>s.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:s=>!s.startsWith("on"),labels:{_scriptable:s=>!["generateLabels","filter","sort"].includes(s)}}};class Gi extends xt{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;const n=W(i.text)?i.text.length:1;this._padding=st(i.padding);const o=n*J(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=o:this.width=o}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:e,left:i,bottom:n,right:o,options:a}=this,r=a.align;let l=0,d,c,u;return this.isHorizontal()?(c=Q(r,i,o),u=e+t,d=o-i):(a.position==="left"?(c=i+t,u=Q(r,n,e),l=B*-.5):(c=o-t,u=Q(r,e,n),l=B*.5),d=n-e),{titleX:c,titleY:u,maxWidth:d,rotation:l}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const i=J(e.font),o=i.lineHeight/2+this._padding.top,{titleX:a,titleY:r,maxWidth:l,rotation:d}=this._drawArgs(o);le(t,e.text,0,0,i,{color:e.color,maxWidth:l,rotation:d,textAlign:Bi(e.align),textBaseline:"middle",translation:[a,r]})}}function qc(s,t){const e=new Gi({ctx:s.ctx,options:t,chart:s});et.configure(s,e,t),et.addBox(s,e),s.titleBlock=e}var Yc={id:"title",_element:Gi,start(s,t,e){qc(s,e)},stop(s){const t=s.titleBlock;et.removeBox(s,t),delete s.titleBlock},beforeUpdate(s,t,e){const i=s.titleBlock;et.configure(s,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const ps=new WeakMap;var Jc={id:"subtitle",start(s,t,e){const i=new Gi({ctx:s.ctx,options:e,chart:s});et.configure(s,i,e),et.addBox(s,i),ps.set(s,i)},stop(s){et.removeBox(s,ps.get(s)),ps.delete(s)},beforeUpdate(s,t,e){const i=ps.get(s);et.configure(s,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Te={average(s){if(!s.length)return!1;let t,e,i=new Set,n=0,o=0;for(t=0,e=s.length;t<e;++t){const r=s[t].element;if(r&&r.hasValue()){const l=r.tooltipPosition();i.add(l.x),n+=l.y,++o}}return o===0||i.size===0?!1:{x:[...i].reduce((r,l)=>r+l)/i.size,y:n/o}},nearest(s,t){if(!s.length)return!1;let e=t.x,i=t.y,n=Number.POSITIVE_INFINITY,o,a,r;for(o=0,a=s.length;o<a;++o){const l=s[o].element;if(l&&l.hasValue()){const d=l.getCenterPoint(),c=hi(t,d);c<n&&(n=c,r=l)}}if(r){const l=r.tooltipPosition();e=l.x,i=l.y}return{x:e,y:i}}};function vt(s,t){return t&&(W(t)?Array.prototype.push.apply(s,t):s.push(t)),s}function Ct(s){return(typeof s=="string"||s instanceof String)&&s.indexOf(`
`)>-1?s.split(`
`):s}function Xc(s,t){const{element:e,datasetIndex:i,index:n}=t,o=s.getDatasetMeta(i).controller,{label:a,value:r}=o.getLabelAndValue(n);return{chart:s,label:a,parsed:o.getParsed(n),raw:s.data.datasets[i].data[n],formattedValue:r,dataset:o.getDataset(),dataIndex:n,datasetIndex:i,element:e}}function eo(s,t){const e=s.chart.ctx,{body:i,footer:n,title:o}=s,{boxWidth:a,boxHeight:r}=t,l=J(t.bodyFont),d=J(t.titleFont),c=J(t.footerFont),u=o.length,p=n.length,h=i.length,m=st(t.padding);let f=m.height,g=0,x=i.reduce((b,w)=>b+w.before.length+w.lines.length+w.after.length,0);if(x+=s.beforeBody.length+s.afterBody.length,u&&(f+=u*d.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),x){const b=t.displayColors?Math.max(r,l.lineHeight):l.lineHeight;f+=h*b+(x-h)*l.lineHeight+(x-1)*t.bodySpacing}p&&(f+=t.footerMarginTop+p*c.lineHeight+(p-1)*t.footerSpacing);let y=0;const k=function(b){g=Math.max(g,e.measureText(b).width+y)};return e.save(),e.font=d.string,F(s.title,k),e.font=l.string,F(s.beforeBody.concat(s.afterBody),k),y=t.displayColors?a+2+t.boxPadding:0,F(i,b=>{F(b.before,k),F(b.lines,k),F(b.after,k)}),y=0,e.font=c.string,F(s.footer,k),e.restore(),g+=m.width,{width:g,height:f}}function Zc(s,t){const{y:e,height:i}=t;return e<i/2?"top":e>s.height-i/2?"bottom":"center"}function Qc(s,t,e,i){const{x:n,width:o}=i,a=e.caretSize+e.caretPadding;if(s==="left"&&n+o+a>t.width||s==="right"&&n-o-a<0)return!0}function tu(s,t,e,i){const{x:n,width:o}=e,{width:a,chartArea:{left:r,right:l}}=s;let d="center";return i==="center"?d=n<=(r+l)/2?"left":"right":n<=o/2?d="left":n>=a-o/2&&(d="right"),Qc(d,s,t,e)&&(d="center"),d}function so(s,t,e){const i=e.yAlign||t.yAlign||Zc(s,e);return{xAlign:e.xAlign||t.xAlign||tu(s,t,e,i),yAlign:i}}function eu(s,t){let{x:e,width:i}=s;return t==="right"?e-=i:t==="center"&&(e-=i/2),e}function su(s,t,e){let{y:i,height:n}=s;return t==="top"?i+=e:t==="bottom"?i-=n+e:i-=n/2,i}function io(s,t,e,i){const{caretSize:n,caretPadding:o,cornerRadius:a}=s,{xAlign:r,yAlign:l}=e,d=n+o,{topLeft:c,topRight:u,bottomLeft:p,bottomRight:h}=ne(a);let m=eu(t,r);const f=su(t,l,d);return l==="center"?r==="left"?m+=d:r==="right"&&(m-=d):r==="left"?m-=Math.max(c,p)+n:r==="right"&&(m+=Math.max(u,h)+n),{x:Z(m,0,i.width-t.width),y:Z(f,0,i.height-t.height)}}function hs(s,t,e){const i=st(e.padding);return t==="center"?s.x+s.width/2:t==="right"?s.x+s.width-i.right:s.x+i.left}function no(s){return vt([],Ct(s))}function iu(s,t,e){return Vt(s,{tooltip:t,tooltipItems:e,type:"tooltip"})}function oo(s,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?s.override(e):s}const fa={beforeTitle:_t,title(s){if(s.length>0){const t=s[0],e=t.chart.data.labels,i=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return e[t.dataIndex]}return""},afterTitle:_t,beforeBody:_t,beforeLabel:_t,label(s){if(this&&this.options&&this.options.mode==="dataset")return s.label+": "+s.formattedValue||s.formattedValue;let t=s.dataset.label||"";t&&(t+=": ");const e=s.formattedValue;return T(e)||(t+=e),t},labelColor(s){const e=s.chart.getDatasetMeta(s.datasetIndex).controller.getStyle(s.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(s){const e=s.chart.getDatasetMeta(s.datasetIndex).controller.getStyle(s.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:_t,afterBody:_t,beforeFooter:_t,footer:_t,afterFooter:_t};function nt(s,t,e,i){const n=s[t].call(e,i);return typeof n>"u"?fa[t].call(e,i):n}class ki extends xt{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,i=this.options.setContext(this.getContext()),n=i.enabled&&e.options.animation&&i.animations,o=new Ko(this.chart,n);return n._cacheable&&(this._cachedAnimations=Object.freeze(o)),o}getContext(){return this.$context||(this.$context=iu(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:i}=e,n=nt(i,"beforeTitle",this,t),o=nt(i,"title",this,t),a=nt(i,"afterTitle",this,t);let r=[];return r=vt(r,Ct(n)),r=vt(r,Ct(o)),r=vt(r,Ct(a)),r}getBeforeBody(t,e){return no(nt(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:i}=e,n=[];return F(t,o=>{const a={before:[],lines:[],after:[]},r=oo(i,o);vt(a.before,Ct(nt(r,"beforeLabel",this,o))),vt(a.lines,nt(r,"label",this,o)),vt(a.after,Ct(nt(r,"afterLabel",this,o))),n.push(a)}),n}getAfterBody(t,e){return no(nt(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:i}=e,n=nt(i,"beforeFooter",this,t),o=nt(i,"footer",this,t),a=nt(i,"afterFooter",this,t);let r=[];return r=vt(r,Ct(n)),r=vt(r,Ct(o)),r=vt(r,Ct(a)),r}_createItems(t){const e=this._active,i=this.chart.data,n=[],o=[],a=[];let r=[],l,d;for(l=0,d=e.length;l<d;++l)r.push(Xc(this.chart,e[l]));return t.filter&&(r=r.filter((c,u,p)=>t.filter(c,u,p,i))),t.itemSort&&(r=r.sort((c,u)=>t.itemSort(c,u,i))),F(r,c=>{const u=oo(t.callbacks,c);n.push(nt(u,"labelColor",this,c)),o.push(nt(u,"labelPointStyle",this,c)),a.push(nt(u,"labelTextColor",this,c))}),this.labelColors=n,this.labelPointStyles=o,this.labelTextColors=a,this.dataPoints=r,r}update(t,e){const i=this.options.setContext(this.getContext()),n=this._active;let o,a=[];if(!n.length)this.opacity!==0&&(o={opacity:0});else{const r=Te[i.position].call(this,n,this._eventPosition);a=this._createItems(i),this.title=this.getTitle(a,i),this.beforeBody=this.getBeforeBody(a,i),this.body=this.getBody(a,i),this.afterBody=this.getAfterBody(a,i),this.footer=this.getFooter(a,i);const l=this._size=eo(this,i),d=Object.assign({},r,l),c=so(this.chart,i,d),u=io(i,d,c,this.chart);this.xAlign=c.xAlign,this.yAlign=c.yAlign,o={opacity:1,x:u.x,y:u.y,width:l.width,height:l.height,caretX:r.x,caretY:r.y}}this._tooltipItems=a,this.$context=void 0,o&&this._resolveAnimations().update(this,o),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,i,n){const o=this.getCaretPosition(t,i,n);e.lineTo(o.x1,o.y1),e.lineTo(o.x2,o.y2),e.lineTo(o.x3,o.y3)}getCaretPosition(t,e,i){const{xAlign:n,yAlign:o}=this,{caretSize:a,cornerRadius:r}=i,{topLeft:l,topRight:d,bottomLeft:c,bottomRight:u}=ne(r),{x:p,y:h}=t,{width:m,height:f}=e;let g,x,y,k,b,w;return o==="center"?(b=h+f/2,n==="left"?(g=p,x=g-a,k=b+a,w=b-a):(g=p+m,x=g+a,k=b-a,w=b+a),y=g):(n==="left"?x=p+Math.max(l,c)+a:n==="right"?x=p+m-Math.max(d,u)-a:x=this.caretX,o==="top"?(k=h,b=k-a,g=x-a,y=x+a):(k=h+f,b=k+a,g=x+a,y=x-a),w=k),{x1:g,x2:x,x3:y,y1:k,y2:b,y3:w}}drawTitle(t,e,i){const n=this.title,o=n.length;let a,r,l;if(o){const d=me(i.rtl,this.x,this.width);for(t.x=hs(this,i.titleAlign,i),e.textAlign=d.textAlign(i.titleAlign),e.textBaseline="middle",a=J(i.titleFont),r=i.titleSpacing,e.fillStyle=i.titleColor,e.font=a.string,l=0;l<o;++l)e.fillText(n[l],d.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+r,l+1===o&&(t.y+=i.titleMarginBottom-r)}}_drawColorBox(t,e,i,n,o){const a=this.labelColors[i],r=this.labelPointStyles[i],{boxHeight:l,boxWidth:d}=o,c=J(o.bodyFont),u=hs(this,"left",o),p=n.x(u),h=l<c.lineHeight?(c.lineHeight-l)/2:0,m=e.y+h;if(o.usePointStyle){const f={radius:Math.min(d,l)/2,pointStyle:r.pointStyle,rotation:r.rotation,borderWidth:1},g=n.leftForLtr(p,d)+d/2,x=m+l/2;t.strokeStyle=o.multiKeyBackground,t.fillStyle=o.multiKeyBackground,gi(t,f,g,x),t.strokeStyle=a.borderColor,t.fillStyle=a.backgroundColor,gi(t,f,g,x)}else{t.lineWidth=O(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,t.strokeStyle=a.borderColor,t.setLineDash(a.borderDash||[]),t.lineDashOffset=a.borderDashOffset||0;const f=n.leftForLtr(p,d),g=n.leftForLtr(n.xPlus(p,1),d-2),x=ne(a.borderRadius);Object.values(x).some(y=>y!==0)?(t.beginPath(),t.fillStyle=o.multiKeyBackground,qe(t,{x:f,y:m,w:d,h:l,radius:x}),t.fill(),t.stroke(),t.fillStyle=a.backgroundColor,t.beginPath(),qe(t,{x:g,y:m+1,w:d-2,h:l-2,radius:x}),t.fill()):(t.fillStyle=o.multiKeyBackground,t.fillRect(f,m,d,l),t.strokeRect(f,m,d,l),t.fillStyle=a.backgroundColor,t.fillRect(g,m+1,d-2,l-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,e,i){const{body:n}=this,{bodySpacing:o,bodyAlign:a,displayColors:r,boxHeight:l,boxWidth:d,boxPadding:c}=i,u=J(i.bodyFont);let p=u.lineHeight,h=0;const m=me(i.rtl,this.x,this.width),f=function(C){e.fillText(C,m.x(t.x+h),t.y+p/2),t.y+=p+o},g=m.textAlign(a);let x,y,k,b,w,S,A;for(e.textAlign=a,e.textBaseline="middle",e.font=u.string,t.x=hs(this,g,i),e.fillStyle=i.bodyColor,F(this.beforeBody,f),h=r&&g!=="right"?a==="center"?d/2+c:d+2+c:0,b=0,S=n.length;b<S;++b){for(x=n[b],y=this.labelTextColors[b],e.fillStyle=y,F(x.before,f),k=x.lines,r&&k.length&&(this._drawColorBox(e,t,b,m,i),p=Math.max(u.lineHeight,l)),w=0,A=k.length;w<A;++w)f(k[w]),p=u.lineHeight;F(x.after,f)}h=0,p=u.lineHeight,F(this.afterBody,f),t.y-=o}drawFooter(t,e,i){const n=this.footer,o=n.length;let a,r;if(o){const l=me(i.rtl,this.x,this.width);for(t.x=hs(this,i.footerAlign,i),t.y+=i.footerMarginTop,e.textAlign=l.textAlign(i.footerAlign),e.textBaseline="middle",a=J(i.footerFont),e.fillStyle=i.footerColor,e.font=a.string,r=0;r<o;++r)e.fillText(n[r],l.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+i.footerSpacing}}drawBackground(t,e,i,n){const{xAlign:o,yAlign:a}=this,{x:r,y:l}=t,{width:d,height:c}=i,{topLeft:u,topRight:p,bottomLeft:h,bottomRight:m}=ne(n.cornerRadius);e.fillStyle=n.backgroundColor,e.strokeStyle=n.borderColor,e.lineWidth=n.borderWidth,e.beginPath(),e.moveTo(r+u,l),a==="top"&&this.drawCaret(t,e,i,n),e.lineTo(r+d-p,l),e.quadraticCurveTo(r+d,l,r+d,l+p),a==="center"&&o==="right"&&this.drawCaret(t,e,i,n),e.lineTo(r+d,l+c-m),e.quadraticCurveTo(r+d,l+c,r+d-m,l+c),a==="bottom"&&this.drawCaret(t,e,i,n),e.lineTo(r+h,l+c),e.quadraticCurveTo(r,l+c,r,l+c-h),a==="center"&&o==="left"&&this.drawCaret(t,e,i,n),e.lineTo(r,l+u),e.quadraticCurveTo(r,l,r+u,l),e.closePath(),e.fill(),n.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,i=this.$animations,n=i&&i.x,o=i&&i.y;if(n||o){const a=Te[t.position].call(this,this._active,this._eventPosition);if(!a)return;const r=this._size=eo(this,t),l=Object.assign({},a,this._size),d=so(e,t,l),c=io(t,l,d,e);(n._to!==c.x||o._to!==c.y)&&(this.xAlign=d.xAlign,this.yAlign=d.yAlign,this.width=r.width,this.height=r.height,this.caretX=a.x,this.caretY=a.y,this._resolveAnimations().update(this,c))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(e);const n={width:this.width,height:this.height},o={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const a=st(e.padding),r=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&r&&(t.save(),t.globalAlpha=i,this.drawBackground(o,t,n,e),Vo(t,e.textDirection),o.y+=a.top,this.drawTitle(o,t,e),this.drawBody(o,t,e),this.drawFooter(o,t,e),Ho(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const i=this._active,n=t.map(({datasetIndex:r,index:l})=>{const d=this.chart.getDatasetMeta(r);if(!d)throw new Error("Cannot find a dataset at index "+r);return{datasetIndex:r,element:d.data[l],index:l}}),o=!Os(i,n),a=this._positionChanged(n,e);(o||a)&&(this._active=n,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,i=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const n=this.options,o=this._active||[],a=this._getActiveElements(t,o,e,i),r=this._positionChanged(a,t),l=e||!Os(a,o)||r;return l&&(this._active=a,(n.enabled||n.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),l}_getActiveElements(t,e,i,n){const o=this.options;if(t.type==="mouseout")return[];if(!n)return e.filter(r=>this.chart.data.datasets[r.datasetIndex]&&this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index)!==void 0);const a=this.chart.getElementsAtEventForMode(t,o.mode,o,i);return o.reverse&&a.reverse(),a}_positionChanged(t,e){const{caretX:i,caretY:n,options:o}=this,a=Te[o.position].call(this,t,e);return a!==!1&&(i!==a.x||n!==a.y)}}E(ki,"positioners",Te);var nu={id:"tooltip",_element:ki,positioners:Te,afterInit(s,t,e){e&&(s.tooltip=new ki({chart:s,options:e}))},beforeUpdate(s,t,e){s.tooltip&&s.tooltip.initialize(e)},reset(s,t,e){s.tooltip&&s.tooltip.initialize(e)},afterDraw(s){const t=s.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(s.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(s.ctx),s.notifyPlugins("afterTooltipDraw",e)}},afterEvent(s,t){if(s.tooltip){const e=t.replay;s.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(s,t)=>t.bodyFont.size,boxWidth:(s,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:fa},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:s=>s!=="filter"&&s!=="itemSort"&&s!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},ou=Object.freeze({__proto__:null,Colors:bc,Decimation:wc,Filler:Vc,Legend:Kc,SubTitle:Jc,Title:Yc,Tooltip:nu});const au=(s,t,e,i)=>(typeof t=="string"?(e=s.push(t)-1,i.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function ru(s,t,e,i){const n=s.indexOf(t);if(n===-1)return au(s,t,e,i);const o=s.lastIndexOf(t);return n!==o?e:n}const lu=(s,t)=>s===null?null:Z(Math.round(s),0,t);function ao(s){const t=this.getLabels();return s>=0&&s<t.length?t[s]:s}class Si extends de{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const i=this.getLabels();for(const{index:n,label:o}of e)i[n]===o&&i.splice(n,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(T(t))return null;const i=this.getLabels();return e=isFinite(e)&&i[e]===t?e:ru(i,t,R(e,t),this._addedLabels),lu(e,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:i,max:n}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),e||(n=this.getLabels().length-1)),this.min=i,this.max=n}buildTicks(){const t=this.min,e=this.max,i=this.options.offset,n=[];let o=this.getLabels();o=t===0&&e===o.length-1?o:o.slice(t,e+1),this._valueRange=Math.max(o.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let a=t;a<=e;a++)n.push({value:a});return n}getLabelForValue(t){return ao.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}E(Si,"id","category"),E(Si,"defaults",{ticks:{callback:ao}});function du(s,t){const e=[],{bounds:n,step:o,min:a,max:r,precision:l,count:d,maxTicks:c,maxDigits:u,includeBounds:p}=s,h=o||1,m=c-1,{min:f,max:g}=t,x=!T(a),y=!T(r),k=!T(d),b=(g-f)/(u+1);let w=tn((g-f)/m/h)*h,S,A,C,_;if(w<1e-14&&!x&&!y)return[{value:f},{value:g}];_=Math.ceil(g/w)-Math.floor(f/w),_>m&&(w=tn(_*w/m/h)*h),T(l)||(S=Math.pow(10,l),w=Math.ceil(w*S)/S),n==="ticks"?(A=Math.floor(f/w)*w,C=Math.ceil(g/w)*w):(A=f,C=g),x&&y&&o&&er((r-a)/o,w/1e3)?(_=Math.round(Math.min((r-a)/w,c)),w=(r-a)/_,A=a,C=r):k?(A=x?a:A,C=y?r:C,_=d-1,w=(C-A)/_):(_=(C-A)/w,Le(_,Math.round(_),w/1e3)?_=Math.round(_):_=Math.ceil(_));const M=Math.max(en(w),en(A));S=Math.pow(10,T(l)?M:l),A=Math.round(A*S)/S,C=Math.round(C*S)/S;let P=0;for(x&&(p&&A!==a?(e.push({value:a}),A<a&&P++,Le(Math.round((A+P*w)*S)/S,a,ro(a,b,s))&&P++):A<a&&P++);P<_;++P){const D=Math.round((A+P*w)*S)/S;if(y&&D>r)break;e.push({value:D})}return y&&p&&C!==r?e.length&&Le(e[e.length-1].value,r,ro(r,b,s))?e[e.length-1].value=r:e.push({value:r}):(!y||C===r)&&e.push({value:C}),e}function ro(s,t,{horizontal:e,minRotation:i}){const n=mt(i),o=(e?Math.sin(n):Math.cos(n))||.001,a=.75*t*(""+s).length;return Math.min(t/o,a)}class Vs extends de{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return T(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:i}=this.getUserBounds();let{min:n,max:o}=this;const a=l=>n=e?n:l,r=l=>o=i?o:l;if(t){const l=kt(n),d=kt(o);l<0&&d<0?r(0):l>0&&d>0&&a(0)}if(n===o){let l=o===0?1:Math.abs(o*.05);r(o+l),t||a(n-l)}this.min=n,this.max=o}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:i}=t,n;return i?(n=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,n>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${n} ticks. Limiting to 1000.`),n=1e3)):(n=this.computeTickLimit(),e=e||11),e&&(n=Math.min(e,n)),n}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const n={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},o=this._range||this,a=du(n,o);return t.bounds==="ticks"&&_o(a,this,"value"),t.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}configure(){const t=this.ticks;let e=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const n=(i-e)/Math.max(t.length-1,1)/2;e-=n,i+=n}this._startValue=e,this._endValue=i,this._valueRange=i-e}getLabelForValue(t){return Qe(t,this.chart.options.locale,this.options.ticks.format)}}class _i extends Vs{determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=K(t)?t:0,this.max=K(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,i=mt(this.options.ticks.minRotation),n=(t?Math.sin(i):Math.cos(i))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,o.lineHeight/n))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}E(_i,"id","linear"),E(_i,"defaults",{ticks:{callback:zs.formatters.numeric}});const Je=s=>Math.floor(Tt(s)),qt=(s,t)=>Math.pow(10,Je(s)+t);function lo(s){return s/Math.pow(10,Je(s))===1}function co(s,t,e){const i=Math.pow(10,e),n=Math.floor(s/i);return Math.ceil(t/i)-n}function cu(s,t){const e=t-s;let i=Je(e);for(;co(s,t,i)>10;)i++;for(;co(s,t,i)<10;)i--;return Math.min(i,Je(s))}function uu(s,{min:t,max:e}){t=dt(s.min,t);const i=[],n=Je(t);let o=cu(t,e),a=o<0?Math.pow(10,Math.abs(o)):1;const r=Math.pow(10,o),l=n>o?Math.pow(10,n):0,d=Math.round((t-l)*a)/a,c=Math.floor((t-l)/r/10)*r*10;let u=Math.floor((d-c)/Math.pow(10,o)),p=dt(s.min,Math.round((l+c+u*Math.pow(10,o))*a)/a);for(;p<e;)i.push({value:p,major:lo(p),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(o++,u=2,a=o>=0?1:a),p=Math.round((l+c+u*Math.pow(10,o))*a)/a;const h=dt(s.max,p);return i.push({value:h,major:lo(h),significand:u}),i}class Ai extends de{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const i=Vs.prototype.parse.apply(this,[t,e]);if(i===0){this._zero=!0;return}return K(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=K(t)?Math.max(0,t):null,this.max=K(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!K(this._userMin)&&(this.min=t===qt(this.min,0)?qt(this.min,-1):qt(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let i=this.min,n=this.max;const o=r=>i=t?i:r,a=r=>n=e?n:r;i===n&&(i<=0?(o(1),a(10)):(o(qt(i,-1)),a(qt(n,1)))),i<=0&&o(qt(n,-1)),n<=0&&a(qt(i,1)),this.min=i,this.max=n}buildTicks(){const t=this.options,e={min:this._userMin,max:this._userMax},i=uu(e,this);return t.bounds==="ticks"&&_o(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":Qe(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Tt(t),this._valueRange=Tt(this.max)-Tt(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Tt(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}E(Ai,"id","logarithmic"),E(Ai,"defaults",{ticks:{callback:zs.formatters.logarithmic,major:{enabled:!0}}});function Ci(s){const t=s.ticks;if(t.display&&s.display){const e=st(t.backdropPadding);return R(t.font&&t.font.size,U.font.size)+e.height}return 0}function pu(s,t,e){return e=W(e)?e:[e],{w:xr(s,t.string,e),h:e.length*t.lineHeight}}function uo(s,t,e,i,n){return s===i||s===n?{start:t-e/2,end:t+e/2}:s<i||s>n?{start:t-e,end:t}:{start:t,end:t+e}}function hu(s){const t={l:s.left+s._padding.left,r:s.right-s._padding.right,t:s.top+s._padding.top,b:s.bottom-s._padding.bottom},e=Object.assign({},t),i=[],n=[],o=s._pointLabels.length,a=s.options.pointLabels,r=a.centerPointLabels?B/o:0;for(let l=0;l<o;l++){const d=a.setContext(s.getPointLabelContext(l));n[l]=d.padding;const c=s.getPointPosition(l,s.drawingArea+n[l],r),u=J(d.font),p=pu(s.ctx,u,s._pointLabels[l]);i[l]=p;const h=tt(s.getIndexAngle(l)+r),m=Math.round(Oi(h)),f=uo(m,c.x,p.w,0,180),g=uo(m,c.y,p.h,90,270);fu(e,t,h,f,g)}s.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),s._pointLabelItems=bu(s,i,n)}function fu(s,t,e,i,n){const o=Math.abs(Math.sin(e)),a=Math.abs(Math.cos(e));let r=0,l=0;i.start<t.l?(r=(t.l-i.start)/o,s.l=Math.min(s.l,t.l-r)):i.end>t.r&&(r=(i.end-t.r)/o,s.r=Math.max(s.r,t.r+r)),n.start<t.t?(l=(t.t-n.start)/a,s.t=Math.min(s.t,t.t-l)):n.end>t.b&&(l=(n.end-t.b)/a,s.b=Math.max(s.b,t.b+l))}function gu(s,t,e){const i=s.drawingArea,{extra:n,additionalAngle:o,padding:a,size:r}=e,l=s.getPointPosition(t,i+n+a,o),d=Math.round(Oi(tt(l.angle+q))),c=yu(l.y,r.h,d),u=xu(d),p=vu(l.x,r.w,u);return{visible:!0,x:l.x,y:c,textAlign:u,left:p,top:c,right:p+r.w,bottom:c+r.h}}function mu(s,t){if(!t)return!0;const{left:e,top:i,right:n,bottom:o}=s;return!(Dt({x:e,y:i},t)||Dt({x:e,y:o},t)||Dt({x:n,y:i},t)||Dt({x:n,y:o},t))}function bu(s,t,e){const i=[],n=s._pointLabels.length,o=s.options,{centerPointLabels:a,display:r}=o.pointLabels,l={extra:Ci(o)/2,additionalAngle:a?B/n:0};let d;for(let c=0;c<n;c++){l.padding=e[c],l.size=t[c];const u=gu(s,c,l);i.push(u),r==="auto"&&(u.visible=mu(u,d),u.visible&&(d=u))}return i}function xu(s){return s===0||s===180?"center":s<180?"left":"right"}function vu(s,t,e){return e==="right"?s-=t:e==="center"&&(s-=t/2),s}function yu(s,t,e){return e===90||e===270?s-=t/2:(e>270||e<90)&&(s-=t),s}function wu(s,t,e){const{left:i,top:n,right:o,bottom:a}=e,{backdropColor:r}=t;if(!T(r)){const l=ne(t.borderRadius),d=st(t.backdropPadding);s.fillStyle=r;const c=i-d.left,u=n-d.top,p=o-i+d.width,h=a-n+d.height;Object.values(l).some(m=>m!==0)?(s.beginPath(),qe(s,{x:c,y:u,w:p,h,radius:l}),s.fill()):s.fillRect(c,u,p,h)}}function ku(s,t){const{ctx:e,options:{pointLabels:i}}=s;for(let n=t-1;n>=0;n--){const o=s._pointLabelItems[n];if(!o.visible)continue;const a=i.setContext(s.getPointLabelContext(n));wu(e,a,o);const r=J(a.font),{x:l,y:d,textAlign:c}=o;le(e,s._pointLabels[n],l,d+r.lineHeight/2,r,{color:a.color,textAlign:c,textBaseline:"middle"})}}function ga(s,t,e,i){const{ctx:n}=s;if(e)n.arc(s.xCenter,s.yCenter,t,0,H);else{let o=s.getPointPosition(0,t);n.moveTo(o.x,o.y);for(let a=1;a<i;a++)o=s.getPointPosition(a,t),n.lineTo(o.x,o.y)}}function Su(s,t,e,i,n){const o=s.ctx,a=t.circular,{color:r,lineWidth:l}=t;!a&&!i||!r||!l||e<0||(o.save(),o.strokeStyle=r,o.lineWidth=l,o.setLineDash(n.dash||[]),o.lineDashOffset=n.dashOffset,o.beginPath(),ga(s,e,a,i),o.closePath(),o.stroke(),o.restore())}function _u(s,t,e){return Vt(s,{label:e,index:t,type:"pointLabel"})}class Oe extends Vs{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=st(Ci(this.options)/2),e=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(e,i)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=K(t)&&!isNaN(t)?t:0,this.max=K(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Ci(this.options))}generateTickLabels(t){Vs.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,i)=>{const n=V(this.options.pointLabels.callback,[e,i],this);return n||n===0?n:""}).filter((e,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?hu(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,i,n){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((i-n)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,i,n))}getIndexAngle(t){const e=H/(this._pointLabels.length||1),i=this.options.startAngle||0;return tt(t*e+mt(i))}getDistanceFromCenterForValue(t){if(T(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(T(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const i=e[t];return _u(this.getContext(),t,i)}}getPointPosition(t,e,i=0){const n=this.getIndexAngle(t)-q+i;return{x:Math.cos(n)*e+this.xCenter,y:Math.sin(n)*e+this.yCenter,angle:n}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:i,right:n,bottom:o}=this._pointLabelItems[t];return{left:e,top:i,right:n,bottom:o}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),ga(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:i,grid:n,border:o}=e,a=this._pointLabels.length;let r,l,d;if(e.pointLabels.display&&ku(this,a),n.display&&this.ticks.forEach((c,u)=>{if(u!==0||u===0&&this.min<0){l=this.getDistanceFromCenterForValue(c.value);const p=this.getContext(u),h=n.setContext(p),m=o.setContext(p);Su(this,h,l,a,m)}}),i.display){for(t.save(),r=a-1;r>=0;r--){const c=i.setContext(this.getPointLabelContext(r)),{color:u,lineWidth:p}=c;!p||!u||(t.lineWidth=p,t.strokeStyle=u,t.setLineDash(c.borderDash),t.lineDashOffset=c.borderDashOffset,l=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),d=this.getPointPosition(r,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(d.x,d.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,i=e.ticks;if(!i.display)return;const n=this.getIndexAngle(0);let o,a;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(n),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((r,l)=>{if(l===0&&this.min>=0&&!e.reverse)return;const d=i.setContext(this.getContext(l)),c=J(d.font);if(o=this.getDistanceFromCenterForValue(this.ticks[l].value),d.showLabelBackdrop){t.font=c.string,a=t.measureText(r.label).width,t.fillStyle=d.backdropColor;const u=st(d.backdropPadding);t.fillRect(-a/2-u.left,-o-c.size/2-u.top,a+u.width,c.size+u.height)}le(t,r.label,0,-o,c,{color:d.color,strokeColor:d.textStrokeColor,strokeWidth:d.textStrokeWidth})}),t.restore()}drawTitle(){}}E(Oe,"id","radialLinear"),E(Oe,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:zs.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),E(Oe,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),E(Oe,"descriptors",{angleLines:{_fallback:"grid"}});const Ys={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},ot=Object.keys(Ys);function po(s,t){return s-t}function ho(s,t){if(T(t))return null;const e=s._adapter,{parser:i,round:n,isoWeekday:o}=s._parseOpts;let a=t;return typeof i=="function"&&(a=i(a)),K(a)||(a=typeof i=="string"?e.parse(a,i):e.parse(a)),a===null?null:(n&&(a=n==="week"&&(be(o)||o===!0)?e.startOf(a,"isoWeek",o):e.startOf(a,n)),+a)}function fo(s,t,e,i){const n=ot.length;for(let o=ot.indexOf(s);o<n-1;++o){const a=Ys[ot[o]],r=a.steps?a.steps:Number.MAX_SAFE_INTEGER;if(a.common&&Math.ceil((e-t)/(r*a.size))<=i)return ot[o]}return ot[n-1]}function Au(s,t,e,i,n){for(let o=ot.length-1;o>=ot.indexOf(e);o--){const a=ot[o];if(Ys[a].common&&s._adapter.diff(n,i,a)>=t-1)return a}return ot[e?ot.indexOf(e):0]}function Cu(s){for(let t=ot.indexOf(s)+1,e=ot.length;t<e;++t)if(Ys[ot[t]].common)return ot[t]}function go(s,t,e){if(!e)s[t]=!0;else if(e.length){const{lo:i,hi:n}=$i(e,t),o=e[i]>=t?e[i]:e[n];s[o]=!0}}function Eu(s,t,e,i){const n=s._adapter,o=+n.startOf(t[0].value,i),a=t[t.length-1].value;let r,l;for(r=o;r<=a;r=+n.add(r,1,i))l=e[r],l>=0&&(t[l].major=!0);return t}function mo(s,t,e){const i=[],n={},o=t.length;let a,r;for(a=0;a<o;++a)r=t[a],n[r]=a,i.push({value:r,major:!1});return o===0||!e?i:Eu(s,i,n,e)}class Xe extends de{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const i=t.time||(t.time={}),n=this._adapter=new $l._date(t.adapters.date);n.init(e),je(i.displayFormats,n.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:ho(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,i=t.time.unit||"day";let{min:n,max:o,minDefined:a,maxDefined:r}=this.getUserBounds();function l(d){!a&&!isNaN(d.min)&&(n=Math.min(n,d.min)),!r&&!isNaN(d.max)&&(o=Math.max(o,d.max))}(!a||!r)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),n=K(n)&&!isNaN(n)?n:+e.startOf(Date.now(),i),o=K(o)&&!isNaN(o)?o:+e.endOf(Date.now(),i)+1,this.min=Math.min(n,o-1),this.max=Math.max(n+1,o)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],i=t[t.length-1]),{min:e,max:i}}buildTicks(){const t=this.options,e=t.time,i=t.ticks,n=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&n.length&&(this.min=this._userMin||n[0],this.max=this._userMax||n[n.length-1]);const o=this.min,a=this.max,r=or(n,o,a);return this._unit=e.unit||(i.autoSkip?fo(e.minUnit,this.min,this.max,this._getLabelCapacity(o)):Au(this,r.length,e.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:Cu(this._unit),this.initOffsets(n),t.reverse&&r.reverse(),mo(this,r,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,i=0,n,o;this.options.offset&&t.length&&(n=this.getDecimalForValue(t[0]),t.length===1?e=1-n:e=(this.getDecimalForValue(t[1])-n)/2,o=this.getDecimalForValue(t[t.length-1]),t.length===1?i=o:i=(o-this.getDecimalForValue(t[t.length-2]))/2);const a=t.length<3?.5:.25;e=Z(e,0,a),i=Z(i,0,a),this._offsets={start:e,end:i,factor:1/(e+1+i)}}_generate(){const t=this._adapter,e=this.min,i=this.max,n=this.options,o=n.time,a=o.unit||fo(o.minUnit,e,i,this._getLabelCapacity(e)),r=R(n.ticks.stepSize,1),l=a==="week"?o.isoWeekday:!1,d=be(l)||l===!0,c={};let u=e,p,h;if(d&&(u=+t.startOf(u,"isoWeek",l)),u=+t.startOf(u,d?"day":a),t.diff(i,e,a)>1e5*r)throw new Error(e+" and "+i+" are too far apart with stepSize of "+r+" "+a);const m=n.ticks.source==="data"&&this.getDataTimestamps();for(p=u,h=0;p<i;p=+t.add(p,r,a),h++)go(c,p,m);return(p===i||n.bounds==="ticks"||h===1)&&go(c,p,m),Object.keys(c).sort(po).map(f=>+f)}getLabelForValue(t){const e=this._adapter,i=this.options.time;return i.tooltipFormat?e.format(t,i.tooltipFormat):e.format(t,i.displayFormats.datetime)}format(t,e){const n=this.options.time.displayFormats,o=this._unit,a=e||n[o];return this._adapter.format(t,a)}_tickFormatFunction(t,e,i,n){const o=this.options,a=o.ticks.callback;if(a)return V(a,[t,e,i],this);const r=o.time.displayFormats,l=this._unit,d=this._majorUnit,c=l&&r[l],u=d&&r[d],p=i[e],h=d&&u&&p&&p.major;return this._adapter.format(t,n||(h?u:c))}generateTickLabels(t){let e,i,n;for(e=0,i=t.length;e<i;++e)n=t[e],n.label=this._tickFormatFunction(n.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+i)*e.factor)}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,i=this.ctx.measureText(t).width,n=mt(this.isHorizontal()?e.maxRotation:e.minRotation),o=Math.cos(n),a=Math.sin(n),r=this._resolveTickFontOptions(0).size;return{w:i*o+r*a,h:i*a+r*o}}_getLabelCapacity(t){const e=this.options.time,i=e.displayFormats,n=i[e.unit]||i.millisecond,o=this._tickFormatFunction(t,0,mo(this,[t],this._majorUnit),n),a=this._getLabelSize(o),r=Math.floor(this.isHorizontal()?this.width/a.w:this.height/a.h)-1;return r>0?r:1}getDataTimestamps(){let t=this._cache.data||[],e,i;if(t.length)return t;const n=this.getMatchingVisibleMetas();if(this._normalized&&n.length)return this._cache.data=n[0].controller.getAllParsedValues(this);for(e=0,i=n.length;e<i;++e)t=t.concat(n[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,i;if(t.length)return t;const n=this.getLabels();for(e=0,i=n.length;e<i;++e)t.push(ho(this,n[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Eo(t.sort(po))}}E(Xe,"id","time"),E(Xe,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function fs(s,t,e){let i=0,n=s.length-1,o,a,r,l;e?(t>=s[i].pos&&t<=s[n].pos&&({lo:i,hi:n}=Pt(s,"pos",t)),{pos:o,time:r}=s[i],{pos:a,time:l}=s[n]):(t>=s[i].time&&t<=s[n].time&&({lo:i,hi:n}=Pt(s,"time",t)),{time:o,pos:r}=s[i],{time:a,pos:l}=s[n]);const d=a-o;return d?r+(l-r)*(t-o)/d:r}class Ei extends Xe{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=fs(e,this.min),this._tableRange=fs(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:i}=this,n=[],o=[];let a,r,l,d,c;for(a=0,r=t.length;a<r;++a)d=t[a],d>=e&&d<=i&&n.push(d);if(n.length<2)return[{time:e,pos:0},{time:i,pos:1}];for(a=0,r=n.length;a<r;++a)c=n[a+1],l=n[a-1],d=n[a],Math.round((c+l)/2)!==d&&o.push({time:d,pos:a/(r-1)});return o}_generate(){const t=this.min,e=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(e)||i.length===1)&&i.push(e),i.sort((n,o)=>n-o)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),i=this.getLabelTimestamps();return e.length&&i.length?t=this.normalize(e.concat(i)):t=e.length?e:i,t=this._cache.all=t,t}getDecimalForValue(t){return(fs(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return fs(this._table,i*this._tableRange+this._minPos,!0)}}E(Ei,"id","timeseries"),E(Ei,"defaults",Xe.defaults);var Mu=Object.freeze({__proto__:null,CategoryScale:Si,LinearScale:_i,LogarithmicScale:Ai,RadialLinearScale:Oe,TimeScale:Xe,TimeSeriesScale:Ei});const Pu=[Ol,cc,ou,Mu];gt.register(...Pu);const Hs={commissioner:{role:"Commissioner",name:"Sri M. Dana Kishore, IAS",username:"commissioner",roleText:"Commissioner (GHMC)",modules:["dashboard","projects","users","settings"]},additional_comm:{role:"Additional Commissioner",name:"Smt. S. Priyanka, IAS",username:"additional_comm",roleText:"Addl. Commissioner (ERP)",modules:["dashboard","projects","settings"]},joint_comm:{role:"Joint Commissioner",name:"Sri V. Anand, KAS",username:"joint_comm",roleText:"Joint Commissioner (Admn)",modules:["dashboard","projects"]},se:{role:"Superintending Engineer",name:"Er. B. Venkanna",username:"se",roleText:"Superintending Engineer (SE)",modules:["dashboard","projects","settings"]},engineer:{role:"Executive Engineer",name:"Er. R. Sharma",username:"engineer",roleText:"Executive Engineer (EE)",modules:["dashboard","projects","settings"]},dyee:{role:"Deputy Executive Engineer",name:"Er. K. Mahesh",username:"dyee",roleText:"Deputy Executive Engineer (Dy.EE)",modules:["dashboard","projects"]},ae:{role:"Assistant Engineer",name:"Er. A. Srinivas",username:"ae",roleText:"Assistant Engineer (AE)",modules:["dashboard","projects"]},assistant:{role:"Senior Assistant",name:"Sri V. Kumar",username:"assistant",roleText:"Senior Assistant (Engg)",modules:["dashboard","projects"]},finance_officer:{role:"Finance Officer",name:"Smt. K. Anitha Reddy",username:"finance_officer",roleText:"Chief Finance Officer (CFO)",modules:["dashboard","projects"]},vendor:{role:"Vendor",name:"Global Infrastructure Ltd. (Contractor)",username:"vendor",roleText:"Authorized Contractor / Vendor",modules:["dashboard","projects"]},admin:{role:"Administrator",name:"System Root Operator",username:"admin",roleText:"System Administrator",modules:["dashboard","projects","users","settings"]}},at=["Senior Assistant","Assistant Engineer","Deputy Executive Engineer","Executive Engineer","Superintending Engineer","Joint Commissioner","Additional Commissioner","Commissioner"],Du=["Requirement","Proposal Created","Technical Review","Administrative Approval","Financial Approval","Work Order Issued","Execution","Invoice Submitted","Budget Allocation","Payment Released","Project Completed"],v={currentUser:null,activeView:"login",activeProject:null,activeModule:"dashboard",activeProjectModule:"summary",captchaCode:0,notifications:[{id:1,title:"High Priority File Awaiting Clearance",text:"eOffice File FILE-2026-ENG-402 forwarded to you by Additional Commissioner.",time:"10 mins ago",read:!1},{id:2,title:"New Bill Uploaded by Contractor",text:"Global Infrastructure Ltd. uploaded invoice for Girder work of Rs. 35.0 Lakhs.",time:"2 hours ago",read:!0}],auditLogs:[{id:"AUD-3021",user:"Additional Commissioner",action:"Forwarded File FILE-2026-ENG-402 with remarks to Commissioner",date:"2026-07-03",time:"14:20",ip:"10.2.40.12",status:"Success"},{id:"AUD-3020",user:"Finance Officer",action:"Created Head of Account mapping for Zone-3 Bridges",date:"2026-07-03",time:"11:15",ip:"10.2.80.3",status:"Success"}],projects:[{id:"PRJ-8012",name:"Kondapur Flyover Construction & Widening",department:"Engineering",zone:"Zone-3 (Sherilingampally)",projectType:"Flyover & Grade Separator",status:"In Progress",startDate:"2025-04-12",endDate:"2026-12-15",officerInCharge:"Er. R. Sharma",progress:61,budget:15e7,spent:92e6,description:"Construction of a 4-lane grade separator flyover to ease vehicular bottlenecks at the Kondapur traffic junction corridor.",lastUpdated:"2026-07-03 15:41"},{id:"PRJ-3041",name:"JNTU Junction Stormwater Drain Overhaul",department:"Drainage & Sewerage",zone:"Zone-2 (Kukatpally)",projectType:"Box Drain & Pipe Network",status:"Under Audit",startDate:"2025-06-01",endDate:"2026-05-30",officerInCharge:"Er. P. Srinivas",progress:90,budget:42e6,spent:38e6,description:"Full concrete box-drain renovation and capacity enhancement of stormwater discharge channels running parallel to the JNTU arterial road.",lastUpdated:"2026-07-01 10:15"},{id:"PRJ-5022",name:"Serilingampally Smart Streetlights Phase-2",department:"Electrical & Lighting",zone:"Zone-4 (Secunderabad)",projectType:"Smart Grid LED Network",status:"Completed",startDate:"2025-09-15",endDate:"2026-02-28",officerInCharge:"Er. M. Venkatesh",progress:100,budget:18e6,spent:18e6,description:"Supply, installation, and cloud-gateway commissioning of 1,200 smart light-emitting diode (LED) lamps across municipal layouts.",lastUpdated:"2026-06-30 09:00"},{id:"PRJ-1090",name:"Gachibowli Ring Road Resurfacing Project",department:"Engineering",zone:"Zone-3 (Sherilingampally)",projectType:"Road Laying & Bituminous Overlay",status:"Planning",startDate:"2026-08-01",endDate:"2027-04-15",officerInCharge:"Er. K. Prasad",progress:0,budget:25e7,spent:0,description:"Major bituminous overlay resurfacing, structural asphalt correction, and hot-mix laying for the Gachibowli outer ring road bypass lanes.",lastUpdated:"2026-07-02 11:00"},{id:"PRJ-7720",name:"Kukatpally Integrated Public Park Development",department:"Landscaping & Parks",zone:"Zone-2 (Kukatpally)",projectType:"Public Infrastructure Development",status:"On Hold",startDate:"2025-02-10",endDate:"2026-08-30",officerInCharge:"Er. S. Ramakrishna",progress:20,budget:75e6,spent:15e6,description:"Establishment of an eco-friendly public park featuring native tree forestry, walking walkways, and rainwater-harvesting reservoirs.",lastUpdated:"2026-06-15 14:00"},{id:"PRJ-2026-IT-008",name:"IVR Outbound Call Campaign – Property Tax Scheme",department:"Information Technology",zone:"Head Office",projectType:"IVR Outreach & Public Campaign",status:"Completed",startDate:"2026-04-18",endDate:"2026-06-04",officerInCharge:"Er. G.N. Sai Ram",progress:100,budget:5e5,spent:5e5,description:"Publicity campaign for Early Bird Property Tax Scheme (5% rebate) for FY 2026-27 by executing automated IVR outbound calls targeting 6.5 Lakh citizens.",lastUpdated:"2026-06-04 17:00"}],eOfficeFiles:[{id:"FILE-2026-ENG-402",projectId:"PRJ-8012",subject:"Administrative Sanction for additional lane acquisition at Kondapur Junction",department:"Engineering (Zone-3)",currentCustodian:"Commissioner",priority:"High",status:"Pending Review",attachments:["Land_Acquisition_Report_V2.pdf","Compensation_Matrix_Signed.pdf"],notes:[{writer:"Senior Assistant (Sri V. Kumar)",text:"Verified land survey numbers and area markings. Total area required: 1.2 acres. Proposal forwarded for technical clearance.",date:"2026-06-25 10:30"},{writer:"Executive Engineer (Er. R. Sharma)",text:"Recommended for execution. Technical drawing aligns with master structural blueprints. Standard compensation parameters mapped.",date:"2026-06-28 14:15"},{writer:"Addl. Commissioner (Smt. S. Priyanka, IAS)",text:"Acquisition estimates match public works regulations. File forwarded to Commissioner for final administrative and financial sanction.",date:"2026-07-03 14:20"}],lastUpdated:"2026-07-03"},{id:"FILE-2026-FIN-910",projectId:"PRJ-8012",subject:"Revised budget estimation sanction for steel girder foundations",department:"Finance Division",currentCustodian:"Finance Officer",priority:"High",status:"Under Verification",attachments:["Revised_Girder_Estimate.pdf"],notes:[{writer:"Executive Engineer (Er. R. Sharma)",text:"Escalation of raw material prices warrants a 15% budget revision on standard girder structural concrete work. Proposal uploaded.",date:"2026-07-02 09:12"}],lastUpdated:"2026-07-02"},{id:"FILE-IT/COM/0008/2026",projectId:"PRJ-2026-IT-008",subject:"Providing of IVR Outbound Call Campaign – Early Bird Property Tax Scheme 2026-27 of GHMC – According administrative Sanction and Agency approval – Request – Reg.",department:"Information Technology Division",currentCustodian:"Approved / Closed",priority:"High",status:"Approved / Closed",attachments:["ghmc.pdf","Invoice_TS-26-27-GHMC-0186.pdf","Costing_Proposal.pdf"],notes:[{writer:"G. SATYANARAYANA (SR.ASST-1(IT)-HO)",text:'It is submitted that the Commissioner, GHMC has instructed the IT Section to give wide publicity for the Early Bird Property Tax Scheme (5% rebate) by adopting various modes such as SMS, call campaigns, etc., to ensure maximum outreach before 30th April 2026. In this regard, the IT Section is already sending SMS on a daily basis and further proposes to undertake an IVR Outbound Call Campaign to create awareness among citizens who have not yet paid their Property Tax for the financial year 2026-27. Approach has been made to M/s. EMRI Green Health Services, present call center operator, who proposed to cover 6.5 lakh mobile numbers for a lump sum cost of Rs. 5,00,000/- (Excl GST). The expenditure may be met from the head of account "02A-0201-22012-01" (Communication Expenses). Submitted for approval.',date:"2026-04-20 09:13"},{writer:"G.N. SAI RAM (AE-3(IT)HO)",text:"Recommended for sanction. The agency EMRI GHS currently manages the civic helpline and has the necessary outbound calling setup.",date:"2026-04-21 12:23"},{writer:"NARSING RAO KORMI (DY.EE-2(IT)-HO)",text:"Entrusting work to existing call center agency is technically feasible and cost-effective. Forwarded for administrative approval.",date:"2026-04-21 12:27"},{writer:"C RADHA (JC(IT)HO)",text:"Supported. Early bird campaign is a time-bound revenue generation scheme. Proposal forwarded.",date:"2026-04-21 12:28"},{writer:"MANDA MAKARANDU IAS (ADDL. COMMR(IT))",text:"Recommended. Early bird tax collections require intensive calling push to maximize rebate outreach before April 30 deadline.",date:"2026-04-21 13:35"},{writer:"R V KARNAN IAS (COMMISSIONER)",text:"ok",date:"2026-04-21 15:42"},{writer:"MANDA MAKARANDU IAS (ADDL. COMMR(IT))",text:"Commissioner approved at para 10. Work Order draft DFA/125546 placed in drafts for signature.",date:"2026-04-23 17:22"},{writer:"K. SARATH CHANDRA (FINANCIAL ADVISOR)",text:'Budget entry has been provided vide BAS No. HO-26004560/2026-27. Mappable head of account "02A-0201-22012-01". Supporting proceedings placed in drafts.',date:"2026-05-20 16:32"},{writer:"G. SATYANARAYANA (SR.ASST-1(IT)-HO)",text:"Invoice TS/26-27/GHMC/0186 Dt: 05.05.2026 from EMRI GHS submitted for payment release of Rs. 5,00,000/- based on completion report. Call campaign reports attached (Total calls: 815,707, connected: 146,497). Draft proceedings DFA/127210 placed for signature.",date:"2026-06-04 16:13"}],lastUpdated:"2026-06-04"}],workOrders:[{id:"WO-4012",projectId:"PRJ-8012",title:"Superstructure Girder Erection Work",vendor:"Global Infrastructure Ltd.",amount:35e6,currentStage:"Vendor Execution",stageHistory:{Requirement:"2025-05-10",Proposal:"2025-05-20","Administrative Sanction":"2025-06-05",Tendering:"2025-07-11","Technical Bid":"2025-08-01","Financial Bid":"2025-08-15","Contract Award":"2025-09-02","Work Order":"2025-09-20","Vendor Execution":"2025-10-01"},updates:[{date:"2026-01-15",text:"Foundation concrete pile work completed."},{date:"2026-05-20",text:"Sub-structure concrete pillars fully cured."}]},{id:"WO-4021",projectId:"PRJ-8012",title:"Service Road Blacktopping & Lane Marking",vendor:"Aravind Constructions",amount:85e5,currentStage:"Invoice",stageHistory:{Requirement:"2025-06-01",Proposal:"2025-06-15","Administrative Sanction":"2025-07-02",Tendering:"2025-08-01","Technical Bid":"2025-08-20","Financial Bid":"2025-09-01","Contract Award":"2025-09-15","Work Order":"2025-10-05","Vendor Execution":"2025-11-12",Invoice:"2026-07-02"},updates:[{date:"2026-02-12",text:"Grading and earth-leveling operations finished."},{date:"2026-06-15",text:"Bituminous layer blacktop asphalt poured."}]},{id:"WO-401476",projectId:"PRJ-2026-IT-008",title:"IVR Outbound Call Campaign Services",vendor:"M/s. EMRI Green Health Services",amount:5e5,currentStage:"Payment Released",stageHistory:{Requirement:"2026-04-18",Proposal:"2026-04-20","Administrative Sanction":"2026-04-21","Work Order":"2026-04-24","Vendor Execution":"2026-04-25",Invoice:"2026-05-05","Budget Allocation":"2026-05-20","Finance Approval":"2026-06-03","Payment Released":"2026-06-04"},updates:[{date:"2026-04-23",text:"IVR campaign configuration & SIP lines setup."},{date:"2026-04-30",text:"IVR campaign completed. 8.15 Lakh calls triggered."}]}],bills:[{id:"BILL-901",projectId:"PRJ-8012",woId:"WO-4021",vendor:"Aravind Constructions",amount:4e6,headOfAccount:"",status:"Pending Budget Allocation",date:"2026-07-02"},{id:"BILL-TS/26-27/0186",projectId:"PRJ-2026-IT-008",woId:"WO-401476",vendor:"M/s. EMRI Green Health Services",amount:5e5,headOfAccount:"02A-0201-22012-01",status:"Paid",date:"2026-05-05"}],headOfAccounts:[{code:"4120-ENG-CAP-Z3",description:"Capital Outlay Zone-3 Flyovers & Grade Separators",allocation:12e7,spent:82e6,balance:38e6},{code:"4120-ENG-REV-MNT",description:"Revenue Outlay Road Maintenance and Asphalt works",allocation:3e7,spent:1e7,balance:2e7},{code:"02A-0201-22012-01",description:"IT Division Communication Expenses (IVR & SMS campaigns)",allocation:5e6,spent:5e5,balance:45e5}],eOfficeNotes:[{id:"NOTE-2026-ENG-042",fileNumber:"FILE/ENG/2026/042",subject:"Initiation of Smart Streetlighting Grid in Zone-4",projectName:"Zone-4 Smart LED Streetlighting Phase-3",department:"Electrical & Lighting",zone:"Zone-4 (Secunderabad)",description:"Proposed installation of 1500 smart LED streetlights connected to the Centralized Monitoring and Control System (CCMS).",purpose:"Energy efficiency and smart grid integration",background:"Following the successful execution of Phase-2 (PRJ-5022), Phase-3 covers the remaining wards of Secunderabad.",estimatedBudget:22e6,budgetHead:"4120-ENG-REV-MNT",justification:"Reduces electricity consumption by 40% and provides automated failure reporting.",benefits:"Improved citizen safety, lower maintenance expenditure.",priority:"High",attachments:["CCMS_Technical_Spec_v1.pdf","Smart_LED_Savings_Feasibility.pdf"],remarks:"Estimated budget increased by Rs. 20 Lakhs to account for additional CCMS gateway controller hardware.",additionalConditions:"Gateways must support 4G/5G dual band.",status:"Pending",currentCustodian:"Commissioner",creatorRole:"Senior Assistant",creatorName:"Sri V. Kumar",createdDate:"2026-07-01",createdTime:"10:00",versions:[{version:"v1.0",modifiedBy:"Sri V. Kumar",modifiedRole:"Senior Assistant",modifiedDate:"2026-07-01",modifiedTime:"10:00",subject:"Initiation of Smart Streetlighting Grid in Zone-4",projectName:"Zone-4 Smart LED Streetlighting Phase-3",description:"Proposed installation of 1500 smart LED streetlights connected to the Centralized Monitoring and Control System (CCMS).",purpose:"Energy efficiency and smart grid integration",background:"Following the successful execution of Phase-2 (PRJ-5022), Phase-3 covers the remaining wards of Secunderabad.",estimatedBudget:2e7,budgetHead:"4120-ENG-REV-MNT",justification:"Reduces electricity consumption by 40% and provides automated failure reporting.",benefits:"Improved citizen safety, lower maintenance expenditure.",priority:"High",remarks:"Note sheet created and initiated.",additionalConditions:""},{version:"v1.1",modifiedBy:"Er. R. Sharma",modifiedRole:"Executive Engineer",modifiedDate:"2026-07-02",modifiedTime:"11:15",subject:"Initiation of Smart Streetlighting Grid in Zone-4",projectName:"Zone-4 Smart LED Streetlighting Phase-3",description:"Proposed installation of 1500 smart LED streetlights connected to the Centralized Monitoring and Control System (CCMS).",purpose:"Energy efficiency and smart grid integration",background:"Following the successful execution of Phase-2 (PRJ-5022), Phase-3 covers the remaining wards of Secunderabad.",estimatedBudget:22e6,budgetHead:"4120-ENG-REV-MNT",justification:"Reduces electricity consumption by 40% and provides automated failure reporting.",benefits:"Improved citizen safety, lower maintenance expenditure.",priority:"High",remarks:"Estimated budget increased by Rs. 20 Lakhs to account for additional CCMS gateway controller hardware.",additionalConditions:"Gateways must support 4G/5G dual band."}],workflowStatus:{"Senior Assistant":"Approved","Assistant Engineer":"Approved","Deputy Executive Engineer":"Approved","Executive Engineer":"Approved","Superintending Engineer":"Approved","Joint Commissioner":"Approved","Additional Commissioner":"Approved",Commissioner:"Pending"},approvalHistory:[{officerName:"Sri V. Kumar",role:"Senior Assistant",department:"Engineering (Zone-3)",action:"Initiated & Forwarded",remarks:"Note sheet created for Secunderabad streetlight expansion project.",dateTime:"2026-07-01 10:05",status:"Cleared",versionNumber:"v1.0"},{officerName:"Er. A. Srinivas",role:"Assistant Engineer",department:"Engineering (Zone-4)",action:"Recommended & Forwarded",remarks:"Wards verified. Recommended for further administrative clearance.",dateTime:"2026-07-01 14:22",status:"Cleared",versionNumber:"v1.0"},{officerName:"Er. K. Mahesh",role:"Deputy Executive Engineer",department:"Engineering (Zone-4)",action:"Recommended & Forwarded",remarks:"Aligned with smart city objectives. Forwarded.",dateTime:"2026-07-02 09:12",status:"Cleared",versionNumber:"v1.0"},{officerName:"Er. R. Sharma",role:"Executive Engineer",department:"Engineering (Zone-3)",action:"Edited, Recommended & Forwarded",remarks:"Estimated budget increased by Rs. 20 Lakhs to account for additional CCMS gateway controller hardware.",dateTime:"2026-07-02 11:15",status:"Cleared",versionNumber:"v1.1"},{officerName:"Er. B. Venkanna",role:"Superintending Engineer",department:"Engineering",action:"Recommended & Forwarded",remarks:"Reviewed and forwarded for JC clearance.",dateTime:"2026-07-02 15:40",status:"Cleared",versionNumber:"v1.1"},{officerName:"Sri V. Anand, KAS",role:"Joint Commissioner",department:"Administration Division",action:"Recommended & Forwarded",remarks:"Administrative feasibility verified.",dateTime:"2026-07-03 10:00",status:"Cleared",versionNumber:"v1.1"},{officerName:"Smt. S. Priyanka, IAS",role:"Additional Commissioner",department:"ERP Operations Division",action:"Recommended & Forwarded",remarks:"Forwarded for final approval and sanction.",dateTime:"2026-07-03 16:30",status:"Cleared",versionNumber:"v1.1"}],auditLogs:[{user:"Sri V. Kumar",role:"Senior Assistant",date:"2026-07-01",time:"10:00",ip:"10.2.14.8",action:"Note Created",previousValue:"-",newValue:"v1.0 Initial Draft"},{user:"Er. R. Sharma",role:"Executive Engineer",date:"2026-07-02",time:"11:15",ip:"10.2.5.91",action:"Modify Budget",previousValue:"Rs. 20,000,000",newValue:"Rs. 22,000,000 (v1.1)"}]},{id:"NOTE-2026-ENG-043",fileNumber:"FILE/ENG/2026/043",subject:"CC Road construction at Gachibowli sector-2",projectName:"Gachibowli CC Road Sector-2 Development",department:"Engineering",zone:"Zone-3 (Sherilingampally)",description:"Laying of cement concrete (CC) road in inner lane segments of Gachibowli sector-2 ward.",purpose:"Waterlogging prevention and road strengthening",background:"Inner lane segments suffer from water stagnation during monsoons, damaging bituminous surfaces.",estimatedBudget:85e5,budgetHead:"4120-ENG-REV-MNT",justification:"CC road has a life of 20 years with zero maintenance in water stagnation-prone areas.",benefits:"Citizens will have reliable all-weather access roads.",priority:"Medium",attachments:[],remarks:"",additionalConditions:"",status:"Pending",currentCustodian:"Assistant Engineer",creatorRole:"Senior Assistant",creatorName:"Sri V. Kumar",createdDate:"2026-07-03",createdTime:"11:00",versions:[{version:"v1.0",modifiedBy:"Sri V. Kumar",modifiedRole:"Senior Assistant",modifiedDate:"2026-07-03",modifiedTime:"11:00",subject:"CC Road construction at Gachibowli sector-2",projectName:"Gachibowli CC Road Sector-2 Development",description:"Laying of cement concrete (CC) road in inner lane segments of Gachibowli sector-2 ward.",purpose:"Waterlogging prevention and road strengthening",background:"Inner lane segments suffer from water stagnation during monsoons, damaging bituminous surfaces.",estimatedBudget:85e5,budgetHead:"4120-ENG-REV-MNT",justification:"CC road has a life of 20 years with zero maintenance in water stagnation-prone areas.",benefits:"Citizens will have reliable all-weather access roads.",priority:"Medium",remarks:"Initiated for review.",additionalConditions:""}],workflowStatus:{"Senior Assistant":"Approved","Assistant Engineer":"Pending","Deputy Executive Engineer":"Waiting","Executive Engineer":"Waiting","Superintending Engineer":"Waiting","Joint Commissioner":"Waiting","Additional Commissioner":"Waiting",Commissioner:"Waiting"},approvalHistory:[{officerName:"Sri V. Kumar",role:"Senior Assistant",department:"Engineering (Zone-3)",action:"Initiated & Forwarded",remarks:"CC road proposal for Gachibowli inner lanes.",dateTime:"2026-07-03 11:05",status:"Cleared",versionNumber:"v1.0"}],auditLogs:[{user:"Sri V. Kumar",role:"Senior Assistant",date:"2026-07-03",time:"11:00",ip:"10.2.14.8",action:"Note Created",previousValue:"-",newValue:"v1.0 Initial Draft"}]},{id:"NOTE-2026-ENG-044",fileNumber:"FILE/ENG/2026/044",subject:"Sanitation Corridor Maintenance System",projectName:"Sanitation Corridor IoT Tracking Pilot",department:"Drainage & Sewerage",zone:"Zone-2 (Kukatpally)",description:"Laying out IoT sensor networks on major drainage gates to monitor blockage levels in real-time.",purpose:"Proactive disaster drainage monitoring",background:"Monsoon flooding at Kukatpally is caused by sudden garbage choke points in stormwater outlets.",estimatedBudget:45e5,budgetHead:"4120-ENG-CAP-Z3",justification:"Allows alerts to municipal workers before flooding occurs.",benefits:"Drastically reduces sewer backups.",priority:"Low",attachments:[],remarks:"Re-initiated with corrected budget.",additionalConditions:"",status:"Returned",currentCustodian:"Senior Assistant",creatorRole:"Senior Assistant",creatorName:"Sri V. Kumar",createdDate:"2026-07-02",createdTime:"15:20",versions:[{version:"v1.0",modifiedBy:"Sri V. Kumar",modifiedRole:"Senior Assistant",modifiedDate:"2026-07-02",modifiedTime:"15:20",subject:"Sanitation Corridor Maintenance System",projectName:"Sanitation Corridor IoT Tracking Pilot",description:"Laying out IoT sensor networks on major drainage gates to monitor blockage levels in real-time.",purpose:"Proactive disaster drainage monitoring",background:"Monsoon flooding at Kukatpally is caused by sudden garbage choke points in stormwater outlets.",estimatedBudget:6e6,budgetHead:"4120-ENG-CAP-Z3",justification:"Allows alerts to municipal workers before flooding occurs.",benefits:"Drastically reduces sewer backups.",priority:"Low",remarks:"Initial initiation.",additionalConditions:""},{version:"v1.1",modifiedBy:"Sri V. Kumar",modifiedRole:"Senior Assistant",modifiedDate:"2026-07-03",modifiedTime:"09:30",subject:"Sanitation Corridor Maintenance System",projectName:"Sanitation Corridor IoT Tracking Pilot",description:"Laying out IoT sensor networks on major drainage gates to monitor blockage levels in real-time.",purpose:"Proactive disaster drainage monitoring",background:"Monsoon flooding at Kukatpally is caused by sudden garbage choke points in stormwater outlets.",estimatedBudget:45e5,budgetHead:"4120-ENG-CAP-Z3",justification:"Allows alerts to municipal workers before flooding occurs.",benefits:"Drastically reduces sewer backups.",priority:"Low",remarks:"Budget reduced from Rs. 60 Lakhs to Rs. 45 Lakhs to adjust scope as requested by AE.",additionalConditions:""}],workflowStatus:{"Senior Assistant":"Returned","Assistant Engineer":"Returned","Deputy Executive Engineer":"Waiting","Executive Engineer":"Waiting","Superintending Engineer":"Waiting","Joint Commissioner":"Waiting","Additional Commissioner":"Waiting",Commissioner:"Waiting"},approvalHistory:[{officerName:"Sri V. Kumar",role:"Senior Assistant",department:"Engineering (Zone-3)",action:"Initiated & Forwarded",remarks:"Sanitation tracker proposal.",dateTime:"2026-07-02 15:22",status:"Cleared",versionNumber:"v1.0"},{officerName:"Er. A. Srinivas",role:"Assistant Engineer",department:"Engineering (Zone-4)",action:"Returned for Correction",remarks:"Estimated cost is too high for a pilot project. Reduce budget to under Rs. 50 Lakhs.",dateTime:"2026-07-02 17:15",status:"Returned",versionNumber:"v1.0"}],auditLogs:[{user:"Sri V. Kumar",role:"Senior Assistant",date:"2026-07-02",time:"15:20",ip:"10.2.14.8",action:"Note Created",previousValue:"-",newValue:"v1.0 Initial Draft"},{user:"Er. A. Srinivas",role:"Assistant Engineer",date:"2026-07-02",time:"17:15",ip:"10.2.5.91",action:"Returned to creator",previousValue:"Pending Review",newValue:"Returned"},{user:"Sri V. Kumar",role:"Senior Assistant",date:"2026-07-03",time:"09:30",ip:"10.2.14.8",action:"Resubmit Correction",previousValue:"Rs. 6,000,000",newValue:"Rs. 4,500,000 (v1.1)"}]}]},Lt={"PRJ-8012":[{id:"DOC-801",name:"Admin_Sanction_Order_PRJ8012.pdf",type:"pdf",uploadedBy:"Smt. S. Priyanka, IAS",uploadedDate:"2025-06-05",version:"v1.0",status:"Approved",size:"2.4 MB",category:"Administrative Sanctions"},{id:"DOC-802",name:"Land_Acquisition_Sanction_GOP.pdf",type:"pdf",uploadedBy:"Sri M. Dana Kishore, IAS",uploadedDate:"2026-07-03",version:"v2.1",status:"Approved",size:"4.8 MB",category:"Administrative Sanctions"},{id:"DOC-803",name:"Structural_Blueprint_Kondapur_V3.pdf",type:"pdf",uploadedBy:"Er. R. Sharma",uploadedDate:"2025-08-01",version:"v3.2",status:"Active",size:"15.6 MB",category:"Drawings"},{id:"DOC-804",name:"Traffic_Diversion_Map_Zone3.pdf",type:"pdf",uploadedBy:"Er. R. Sharma",uploadedDate:"2025-09-10",version:"v1.0",status:"Active",size:"1.2 MB",category:"Drawings"},{id:"DOC-805",name:"Civil_Foundation_Soil_Testing.pdf",type:"pdf",uploadedBy:"Er. R. Sharma",uploadedDate:"2025-07-15",version:"v1.1",status:"Archived",size:"6.1 MB",category:"Estimates"},{id:"DOC-806",name:"Girder_Structural_Cost_Estimate.pdf",type:"pdf",uploadedBy:"Er. R. Sharma",uploadedDate:"2025-05-20",version:"v1.0",status:"Active",size:"3.3 MB",category:"Estimates"},{id:"DOC-807",name:"Tender_Award_Notification_Flyover.pdf",type:"pdf",uploadedBy:"Sri V. Anand, KAS",uploadedDate:"2025-09-02",version:"v1.0",status:"Approved",size:"920 KB",category:"Tender Documents"},{id:"DOC-808",name:"WO_Girder_Erection_WO4012.pdf",type:"pdf",uploadedBy:"Er. R. Sharma",uploadedDate:"2025-09-20",version:"v1.0",status:"Active",size:"1.8 MB",category:"Work Orders"},{id:"DOC-809",name:"WO_Blacktopping_WO4021.pdf",type:"pdf",uploadedBy:"Er. R. Sharma",uploadedDate:"2025-10-05",version:"v1.0",status:"Active",size:"1.4 MB",category:"Work Orders"},{id:"DOC-810",name:"EE_Technical_Clearance_Girder.pdf",type:"pdf",uploadedBy:"Er. R. Sharma",uploadedDate:"2025-08-10",version:"v1.0",status:"Approved",size:"540 KB",category:"Approvals"},{id:"DOC-811",name:"Contractor_Progress_Bill_WO4021.pdf",type:"pdf",uploadedBy:"Global Infrastructure Ltd.",uploadedDate:"2026-07-02",version:"v1.0",status:"Pending Review",size:"4.2 MB",category:"Bills"},{id:"DOC-812",name:"Invoice_Claim_Aravind_Road.pdf",type:"pdf",uploadedBy:"Aravind Constructions",uploadedDate:"2026-07-02",version:"v1.0",status:"Pending Payment",size:"1.9 MB",category:"Invoices"},{id:"DOC-813",name:"Foundation_Concrete_Completion.pdf",type:"pdf",uploadedBy:"Er. R. Sharma",uploadedDate:"2026-01-15",version:"v1.0",status:"Approved",size:"2.8 MB",category:"Completion Certificates"},{id:"DOC-814",name:"Environmental_NOC_PollutionBoard.pdf",type:"pdf",uploadedBy:"Sri V. Anand, KAS",uploadedDate:"2025-03-10",version:"v1.0",status:"Approved",size:"3.1 MB",category:"Other Attachments"}],"PRJ-3041":[{id:"DOC-301",name:"Stormwater_Admin_Sanction.pdf",type:"pdf",uploadedBy:"Smt. S. Priyanka, IAS",uploadedDate:"2025-07-02",version:"v1.0",status:"Approved",size:"2.1 MB",category:"Administrative Sanctions"},{id:"DOC-302",name:"Box_Drain_Hydraulic_Drawings.pdf",type:"pdf",uploadedBy:"Er. P. Srinivas",uploadedDate:"2025-08-20",version:"v1.2",status:"Active",size:"8.9 MB",category:"Drawings"}],"PRJ-2026-IT-008":[{id:"DOC-IT-801",name:"ghmc.pdf",type:"pdf",uploadedBy:"Sri G. Satyanarayana",uploadedDate:"2026-04-20",version:"v1.0",status:"Approved",size:"25.8 KB",category:"Administrative Sanctions"},{id:"DOC-IT-802",name:"Proposal_EMRI_GHS_OutboundCall.pdf",type:"pdf",uploadedBy:"EMRI Green Health Services",uploadedDate:"2026-04-20",version:"v1.0",status:"Approved",size:"1.2 MB",category:"Tender Documents"},{id:"DOC-IT-803",name:"WO_IVR_OutboundCall_WO401476.pdf",type:"pdf",uploadedBy:"Er. G.N. Sai Ram",uploadedDate:"2026-04-24",version:"v1.0",status:"Active",size:"890 KB",category:"Work Orders"},{id:"DOC-IT-804",name:"Invoice_TS-26-27-GHMC-0186.pdf",type:"pdf",uploadedBy:"EMRI Green Health Services",uploadedDate:"2026-05-05",version:"v1.0",status:"Pending Payment",size:"1.4 MB",category:"Bills"},{id:"DOC-IT-805",name:"Connected_Calls_Summary_Report.pdf",type:"pdf",uploadedBy:"EMRI Green Health Services",uploadedDate:"2026-05-05",version:"v1.0",status:"Approved",size:"640 KB",category:"Other Attachments"}]},ma={"PRJ-8012":[{stage:"Requirement",officer:"Sri V. Kumar",department:"Senior Assistant (Engg)",dateTime:"2025-05-10 10:15",status:"Completed",remarks:"Identified chronic bottleneck at Kondapur junction. Traffic gridlocks exceed 25 mins during peak hours.",pendingWith:"None"},{stage:"Proposal Created",officer:"Er. R. Sharma",department:"Executive Engineer",dateTime:"2025-05-20 14:30",status:"Completed",remarks:"Designed a 4-lane grade separator layout proposal with service road expansion grids.",pendingWith:"None"},{stage:"Technical Review",officer:"Er. R. Sharma",department:"Executive Engineer",dateTime:"2025-05-28 11:00",status:"Completed",remarks:"Structural designs cleared by engineering panel. Soil load capacity parameters certified.",pendingWith:"None"},{stage:"Administrative Approval",officer:"Smt. S. Priyanka, IAS",department:"Addl. Commissioner",dateTime:"2025-06-05 16:45",status:"Completed",remarks:"Administrative sanction granted. Approved project budget: Rs. 15.0 Crores.",pendingWith:"None"},{stage:"Financial Approval",officer:"Smt. K. Anitha Reddy",department:"Chief Finance Officer",dateTime:"2025-06-12 12:20",status:"Completed",remarks:"Fund reserve allocated under Capital Outlay Code 4120-ENG-CAP-Z3.",pendingWith:"None"},{stage:"Work Order Issued",officer:"Er. R. Sharma",department:"Executive Engineer",dateTime:"2025-09-20 09:30",status:"Completed",remarks:"Work Order WO-4012 released to Global Infrastructure Ltd.",pendingWith:"None"},{stage:"Execution",officer:"Global Infrastructure Ltd.",department:"Contractor",dateTime:"2026-05-20 17:00",status:"Completed",remarks:"Pillar erection, concrete foundation, and support structures completed.",pendingWith:"None"},{stage:"Invoice Submitted",officer:"Global Infrastructure Ltd.",department:"Contractor",dateTime:"2026-07-02 11:30",status:"Completed",remarks:"Invoice submitted for foundation completion milestone. Claim: Rs. 3.5 Crores.",pendingWith:"None"},{stage:"Budget Allocation",officer:"Smt. K. Anitha Reddy",department:"Chief Finance Officer",dateTime:"2026-07-03 11:15",status:"Completed",remarks:"Linked budget account and mapped payment ledger codes.",pendingWith:"None"},{stage:"Payment Released",officer:"Smt. K. Anitha Reddy",department:"Chief Finance Officer",dateTime:"2026-07-03 15:40",status:"In Progress",remarks:"Treasury payment processing. Clearance scheduled within 24 hours.",pendingWith:"Additional Commissioner"},{stage:"Project Completed",officer:"Er. R. Sharma",department:"Executive Engineer",dateTime:"Pending",status:"Pending",remarks:"Final paving and smart system commission operations to follow.",pendingWith:"Contractor / EE"}],"PRJ-2026-IT-008":[{stage:"Requirement",officer:"Sri G. Satyanarayana",department:"Senior Assistant (IT)",dateTime:"2026-04-18 10:15",status:"Completed",remarks:"Commissioner instructed IT Section to launch call campaign targeting early bird property tax rebate outreach.",pendingWith:"None"},{stage:"Proposal Created",officer:"EMRI Green Health Services",department:"Call Center Agency",dateTime:"2026-04-20 14:30",status:"Completed",remarks:"Submitted costing proposal of Rs. 5.0 Lakhs to target 6.5 Lakh citizens.",pendingWith:"None"},{stage:"Technical Review",officer:"Er. G.N. Sai Ram",department:"Assistant Engineer",dateTime:"2026-04-21 11:00",status:"Completed",remarks:"Technical feasibility verified. Agency possesses existing infrastructure.",pendingWith:"None"},{stage:"Administrative Approval",officer:"R V KARNAN IAS",department:"Commissioner",dateTime:"2026-04-21 15:42",status:"Completed",remarks:"Administrative sanction granted for Rs. 5 Lakhs.",pendingWith:"None"},{stage:"Work Order Issued",officer:"Er. G.N. Sai Ram",department:"Assistant Engineer",dateTime:"2026-04-24 09:30",status:"Completed",remarks:"Work Order WO-401476 issued to EMRI GHS.",pendingWith:"None"},{stage:"Execution",officer:"EMRI Green Health Services",department:"Agency",dateTime:"2026-04-30 17:00",status:"Completed",remarks:"IVR Outbound Call campaign completed. Connected calls: 146,497. Not connected: 570,210.",pendingWith:"None"},{stage:"Invoice Submitted",officer:"EMRI Green Health Services",department:"Agency",dateTime:"2026-05-05 11:30",status:"Completed",remarks:"Invoice TS/26-27/GHMC/0186 submitted for Rs. 5,00,000/-",pendingWith:"None"},{stage:"Budget Allocation",officer:"K. SARATH CHANDRA",department:"Financial Advisor",dateTime:"2026-05-20 16:32",status:"Completed",remarks:"Budget entry provided vide BAS No. HO-26004560/2026-27.",pendingWith:"None"},{stage:"Payment Released",officer:"K. SARATH CHANDRA",department:"Financial Advisor",dateTime:"2026-06-04 15:40",status:"Completed",remarks:"Payment released in full. Transaction finalized.",pendingWith:"None"},{stage:"Project Completed",officer:"Er. G.N. Sai Ram",department:"Assistant Engineer",dateTime:"2026-06-04 17:00",status:"Completed",remarks:"Outreach campaign successfully executed and fully settled.",pendingWith:"None"}]},Mi={"PRJ-8012":[{name:"Sri M. Dana Kishore, IAS",role:"Commissioner",department:"Executive wing",avatarText:"DK"},{name:"Smt. S. Priyanka, IAS",role:"Additional Commissioner",department:"ERP Operations Division",avatarText:"SP"},{name:"Sri V. Anand, KAS",role:"Joint Commissioner",department:"Administration Division",avatarText:"VA"},{name:"Er. R. Sharma",role:"Executive Engineer",department:"Engineering (Zone-3)",avatarText:"RS"},{name:"Sri V. Kumar",role:"Senior Assistant",department:"Engineering (Zone-3)",avatarText:"VK"},{name:"Smt. K. Anitha Reddy",role:"Chief Finance Officer",department:"Finance Division",avatarText:"AR"},{name:"Global Infrastructure Ltd.",role:"Lead Contractor",department:"External Partner",avatarText:"GI"}],"PRJ-3041":[{name:"Er. P. Srinivas",role:"Executive Engineer",department:"Drainage & Sewerage",avatarText:"PS"},{name:"Sri V. Kumar",role:"Senior Assistant",department:"Drainage & Sewerage",avatarText:"VK"},{name:"Aravind Constructions",role:"Contractor",department:"External Partner",avatarText:"AC"}],"PRJ-2026-IT-008":[{name:"R V KARNAN IAS",role:"Commissioner",department:"Executive wing",avatarText:"RK"},{name:"MANDA MAKARANDU IAS",role:"Additional Commissioner",department:"IT Division",avatarText:"MM"},{name:"C RADHA",role:"Joint Commissioner",department:"IT Division",avatarText:"CR"},{name:"Er. Narsing Rao Kormi",role:"Deputy Executive Engineer",department:"IT Division",avatarText:"NK"},{name:"Er. G.N. Sai Ram",role:"Assistant Engineer",department:"IT Division",avatarText:"SR"},{name:"Sri G. Satyanarayana",role:"Senior Assistant",department:"IT Division",avatarText:"GS"},{name:"M/s. EMRI Green Health Services",role:"Agency Partner",department:"Call Center Ops",avatarText:"EM"}]},Pi={"PRJ-8012":[{date:"2026-07-03",time:"15:40",actor:"Finance Officer",activity:"Cleared bill payment release transaction for Bill BILL-901."},{date:"2026-07-03",time:"14:20",actor:"Addl. Commissioner",activity:"Forwarded File FILE-2026-ENG-402 with remarks to Commissioner."},{date:"2026-07-03",time:"11:15",actor:"Finance Officer",activity:"Linked budget head 4120-ENG-CAP-Z3 to Work Order WO-4021."},{date:"2026-07-02",time:"11:30",actor:"Global Infrastructure Ltd.",activity:"Submitted invoice claim for girder foundation work."},{date:"2026-06-28",time:"14:15",actor:"Executive Engineer",activity:"Approved structural drawings for steel girder spans."}],"PRJ-2026-IT-008":[{date:"2026-06-04",time:"15:40",actor:"Financial Advisor",activity:"Payment released in full for Invoice TS/26-27/GHMC/0186."},{date:"2026-05-20",time:"16:32",actor:"Financial Advisor",activity:"Budget entry BAS No. HO-26004560/2026-27 approved."},{date:"2026-05-05",time:"11:30",actor:"EMRI Green Health Services",activity:"Submitted Invoice claim of Rs. 5 Lakhs (Excl GST)."},{date:"2026-04-30",time:"17:00",actor:"EMRI Green Health Services",activity:"Completed call campaigns for 6.5 Lakh citizens."},{date:"2026-04-24",time:"09:30",actor:"Assistant Engineer",activity:"Issued Work Order WO-401476."},{date:"2026-04-21",time:"15:42",actor:"Commissioner",activity:"Administrative sanction granted."}]};document.addEventListener("DOMContentLoaded",()=>{var t,e;const s=sessionStorage.getItem("ghmc_user");s&&Hs[s]?(v.currentUser=Hs[s],v.activeView="landing",(t=document.getElementById("login-screen"))==null||t.classList.add("hidden"),(e=document.getElementById("app-wrapper"))==null||e.classList.remove("hidden"),ba(),ht("landing")):(v.activeView="login",He()),Ru(),Iu(),Tu()});function He(){const s=document.getElementById("captcha-equation"),t=Math.floor(Math.random()*9)+1,e=Math.floor(Math.random()*9)+1;v.captchaCode=t+e,s&&(s.textContent=`${t} + ${e} = `);const i=document.getElementById("login-captcha");i&&(i.value="")}function Ru(){const s=document.getElementById("login-form"),t=document.getElementById("refresh-captcha"),e=document.getElementById("login-error");t==null||t.addEventListener("click",()=>He()),s==null||s.addEventListener("submit",n=>{n.preventDefault();const o=document.getElementById("login-username").value.trim().toLowerCase(),a=document.getElementById("login-password").value;if(parseInt(document.getElementById("login-captcha").value,10)!==v.captchaCode){e&&(e.textContent="Captcha validation failed. Please try again.",e.classList.remove("hidden")),He();return}const l=Object.values(Hs).find(d=>d.username===o);l&&a==="password"?bo(l):(e&&(e.textContent='Invalid credentials. Use "password" as standard mock password.',e.classList.remove("hidden")),He())}),document.querySelectorAll(".demo-btn").forEach(n=>{n.addEventListener("click",()=>{const o=n.getAttribute("data-role"),a=Object.values(Hs).find(r=>r.role===o);a&&bo(a)})})}function bo(s){v.currentUser=s,v.activeView="landing",v.activeProject=null,v.activeModule="dashboard",sessionStorage.setItem("ghmc_user",s.username),G(s.roleText,"User authenticated successfully","Success");const t=document.getElementById("login-screen"),e=document.getElementById("app-wrapper");t&&t.classList.add("hidden"),e&&e.classList.remove("hidden");const i=document.getElementById("login-error");i&&i.classList.add("hidden"),ba(),ht("landing"),$(`Welcome back, ${s.name}`)}function ba(){const s=v.currentUser;if(!s)return;const t=document.getElementById("navbar-avatar-text"),e=document.getElementById("navbar-username"),i=document.getElementById("navbar-role"),n=document.getElementById("dropdown-mobile-name"),o=document.getElementById("dropdown-mobile-role");t&&(t.textContent=s.name.split(" ").map(a=>a[0]).filter(a=>a&&a.toUpperCase()===a).slice(0,2).join("")),e&&(e.textContent=s.name),i&&(i.textContent=s.roleText),n&&(n.textContent=s.name),o&&(o.textContent=s.roleText),Ui()}function Iu(){const s=document.getElementById("sidebar-collapse-btn"),t=document.getElementById("sidebar");s==null||s.addEventListener("click",()=>{t==null||t.classList.toggle("w-64"),t==null||t.classList.toggle("w-16")});const e=document.getElementById("user-profile-menu"),i=document.getElementById("profile-dropdown");e==null||e.addEventListener("click",l=>{l.stopPropagation(),i==null||i.classList.toggle("hidden")}),document.addEventListener("click",()=>{i==null||i.classList.add("hidden")});const n=document.getElementById("logout-btn");n==null||n.addEventListener("click",l=>{var d,c;l.preventDefault(),v.currentUser&&G(v.currentUser.roleText,"User signed out","Success"),sessionStorage.removeItem("ghmc_user"),v.currentUser=null,v.activeView="login",v.activeProject=null,(d=document.getElementById("app-wrapper"))==null||d.classList.add("hidden"),(c=document.getElementById("login-screen"))==null||c.classList.remove("hidden"),He()});const o=document.getElementById("navbar-bell"),a=document.getElementById("notification-backdrop"),r=document.getElementById("notification-drawer");o==null||o.addEventListener("click",()=>{r==null||r.classList.remove("translate-x-full"),a==null||a.classList.remove("hidden"),ts()}),a==null||a.addEventListener("click",()=>{r==null||r.classList.add("translate-x-full"),a==null||a.classList.add("hidden")})}function Tu(){const s=document.getElementById("global-search-input"),t=document.getElementById("search-dropdown");s==null||s.addEventListener("input",()=>{const e=s.value.trim().toLowerCase();if(!e){t&&t.classList.add("hidden");return}const i=[],n=new Set,o=(a,r,l)=>{const d=`${a.toLowerCase()}||${r.toLowerCase()}`;n.has(d)||(n.add(d),i.push({title:a,category:r,action:l}))};if(v.projects.forEach(a=>{(a.name.toLowerCase().includes(e)||a.id.toLowerCase().includes(e)||a.department.toLowerCase().includes(e))&&o(`${a.id} - ${a.name}`,"Projects Directory",()=>{ze(a)})}),v.eOfficeFiles.forEach(a=>{if(a.id.toLowerCase().includes(e)||a.subject.toLowerCase().includes(e)){const r=v.projects.find(l=>l.id===a.projectId);o(`${a.id} - ${a.subject}`,"eOffice Files",()=>{r&&(v.activeProject=r,v.activeView="project-workspace",v.activeProjectModule="eoffice",a.id,wt(),ct())})}}),v.workOrders.forEach(a=>{if(a.id.toLowerCase().includes(e)||a.title.toLowerCase().includes(e)||a.vendor.toLowerCase().includes(e)){const r=v.projects.find(l=>l.id===a.projectId);o(`${a.id} - ${a.title} (${a.vendor})`,"Work Orders (ERP)",()=>{r&&(v.activeProject=r,v.activeView="project-workspace",v.activeProjectModule="workorders",a.id,wt(),ct())})}}),Object.entries(Mi).forEach(([a,r])=>{const l=v.projects.find(d=>d.id===a);r.forEach(d=>{["Lead Contractor","Contractor","Agency Partner"].includes(d.role)||d.department==="External Partner"?(d.name.toLowerCase().includes(e)||l&&l.name.toLowerCase().includes(e))&&o(`${d.name} (${d.role})`,`Vendor Partner (Project: ${l?l.name:a})`,()=>{l&&(ze(l),v.activeProjectModule="team",wt(),ct())}):(d.name.toLowerCase().includes(e)||d.role.toLowerCase().includes(e)||d.department.toLowerCase().includes(e))&&o(`${d.name} - ${d.role}`,`GHMC Employee (Dept: ${d.department})`,()=>{l&&(ze(l),v.activeProjectModule="team",wt(),ct())})})}),i.length===0){t&&(t.innerHTML='<div class="p-4 text-center text-xs text-slate-400 font-semibold uppercase tracking-wider">No matching registry found</div>',t.classList.remove("hidden"));return}t&&(t.innerHTML=i.map((r,l)=>`
        <div class="search-result-item px-4 py-2 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 flex items-center justify-between text-xs" data-index="${l}">
          <div>
            <div class="font-bold text-slate-800">${r.title}</div>
            <div class="text-[9px] text-[#2563EB] font-bold uppercase tracking-wider mt-0.5">${r.category}</div>
          </div>
          <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </div>
      `).join(""),t.classList.remove("hidden"),t.querySelectorAll(".search-result-item").forEach(r=>{r.addEventListener("click",()=>{const l=parseInt(r.getAttribute("data-index")||"0",10);i[l].action(),s.value="",t.classList.add("hidden")})}))}),document.addEventListener("click",e=>{t&&!t.contains(e.target)&&e.target!==s&&t.classList.add("hidden")})}function ht(s,t=null){var e;v.activeView=s,s==="project-workspace"&&t?(v.activeProject=t,v.activeProjectModule="summary",pt="overview",G(((e=v.currentUser)==null?void 0:e.roleText)||"Unknown",`Entered project workspace: ${t.name}`,"Success")):s==="projects-list"?(v.activeProject=null,v.activeModule="projects"):s==="landing"?(v.activeProject=null,v.activeModule="dashboard"):s==="tasks-view"?(v.activeProject=null,v.activeModule="tasks"):s==="my-approvals-view"?(v.activeProject=null,v.activeModule="approvals"):s==="reports-view"?(v.activeProject=null,v.activeModule="reports"):s==="notifications-view"?(v.activeProject=null,v.activeModule="notifications"):s==="audit-logs-view"?(v.activeProject=null,v.activeModule="audit"):s==="eoffice-view"&&(v.activeProject=null,v.activeModule="eoffice"),wt(),ct(),es()}function ze(s){ht("project-workspace",s)}function wt(){const s=document.getElementById("sidebar-nav"),t=document.getElementById("sidebar-project-info"),e=document.getElementById("sidebar-proj-name"),i=v.currentUser;if(!(!s||!i))if(s.innerHTML="",v.activeView==="project-workspace"&&v.activeProject){t==null||t.classList.remove("hidden"),e&&(e.textContent=v.activeProject.name);const n=document.createElement("a");n.className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-md text-[#2563EB] hover:bg-[#DBEAFE] cursor-pointer font-bold border-b border-[#E5E7EB] pb-3 mb-2",n.innerHTML=`
      <svg class="w-4 h-4 shrink-0 text-[#2563EB]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
      </svg>
      <span>← Back to Projects</span>
    `,n.addEventListener("click",a=>{a.preventDefault(),ht("projects-list")}),s.appendChild(n),[{id:"summary",name:"Project Summary",svgPath:'<path d="M3 3h18v18H3z"/><path d="M21 9H3"/><path d="M21 15H3"/><path d="M12 3v18"/>'},{id:"tracking",name:"Tracking",svgPath:'<polygon points="5 3 19 12 5 21 5 3"/>'},{id:"approvals",name:"Approvals",svgPath:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'}].forEach(a=>{if(a.id==="approvals"&&i.role==="Vendor")return;const r=v.activeProjectModule===a.id?"bg-[#2563EB] text-white font-semibold shadow-sm":"hover:bg-[#DBEAFE] text-[#4B5563] hover:text-[#2563EB]",l=v.activeProjectModule===a.id?"text-white":"text-[#2563EB]",d=document.createElement("a");d.className=`flex items-center gap-3 px-3 py-2 text-xs rounded-md transition-all cursor-pointer ${r}`,d.innerHTML=`
        <svg class="w-4 h-4 shrink-0 ${l}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${a.svgPath}
        </svg>
        <span class="sidebar-item-text truncate">${a.name}</span>
      `,d.addEventListener("click",c=>{c.preventDefault(),v.activeProjectModule=a.id,wt(),ct()}),s.appendChild(d)})}else t==null||t.classList.add("hidden"),[{id:"dashboard",name:"Dashboard",svgPath:'<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>'},{id:"eoffice",name:"eOffice Notes",svgPath:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>'},{id:"projects",name:"Projects",svgPath:'<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'},{id:"tasks",name:"My Tasks",svgPath:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'},{id:"approvals",name:"My Approvals",svgPath:'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'},{id:"reports",name:"Reports",svgPath:'<path d="M18 20V10M12 20V4M6 20v-6"/>'},{id:"notifications",name:"Notifications",svgPath:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'},{id:"audit",name:"Audit Logs",svgPath:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'}].filter(a=>i.role==="Vendor"?["dashboard","projects","tasks"].includes(a.id):!0).forEach(a=>{const r=v.activeModule===a.id?"bg-[#2563EB] text-white font-semibold shadow-sm":"hover:bg-[#DBEAFE] text-[#4B5563] hover:text-[#2563EB]",l=v.activeModule===a.id?"text-white":"text-[#2563EB]",d=document.createElement("a");d.className=`flex items-center gap-3 px-3 py-2 text-xs rounded-md transition-all cursor-pointer ${r}`,d.innerHTML=`
        <svg class="w-4 h-4 shrink-0 ${l}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${a.svgPath}
        </svg>
        <span class="sidebar-item-text truncate">${a.name}</span>
      `,d.addEventListener("click",c=>{c.preventDefault(),a.id==="dashboard"?ht("landing"):a.id==="eoffice"?ht("eoffice-view"):a.id==="projects"?ht("projects-list"):a.id==="tasks"?ht("tasks-view"):a.id==="approvals"?ht("my-approvals-view"):a.id==="reports"?ht("reports-view"):a.id==="notifications"?ht("notifications-view"):a.id==="audit"&&ht("audit-logs-view")}),s.appendChild(d)})}function Ou(){if(v.activeView==="landing")return`
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <span class="text-slate-850">Portal Home</span>
        <span>/</span>
        <span class="text-slate-400">Dashboard</span>
      </nav>
    `;if(v.activeView==="eoffice-view")return`
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850 font-bold">eOffice Notes Workflow</span>
      </nav>
    `;if(v.activeView==="projects-list")return`
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850">Projects Directory</span>
      </nav>
    `;if(v.activeView==="tasks-view")return`
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850">My Tasks</span>
      </nav>
    `;if(v.activeView==="my-approvals-view")return`
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850">My Approvals</span>
      </nav>
    `;if(v.activeView==="reports-view")return`
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850 font-bold">System Reports</span>
      </nav>
    `;if(v.activeView==="notifications-view")return`
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850 font-bold">Notifications</span>
      </nav>
    `;if(v.activeView==="audit-logs-view")return`
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <span class="text-slate-850 font-bold">Audit Logs</span>
      </nav>
    `;if(v.activeView==="project-workspace"&&v.activeProject){const s=v.activeProjectModule.toUpperCase();return`
      <nav class="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('landing')">Portal Home</a>
        <span>/</span>
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToView('projects-list')">Projects Directory</a>
        <span>/</span>
        <a class="hover:text-indigo-650 cursor-pointer transition-colors" onclick="switchToProjectWorkspace(state.activeProject)">${v.activeProject.id}</a>
        <span>/</span>
        <span class="text-slate-850">${s}</span>
      </nav>
    `}return""}function ct(){const s=document.getElementById("content-panel");if(!s)return;s.scrollTop=0;const t=Ou();v.activeView==="landing"?(s.innerHTML=`${t}<div id="landing-dashboard-view"></div>`,Vu()):v.activeView==="projects-list"?(s.innerHTML=`${t}<div id="projects-list-view" class="animate-toast-slide-in"></div>`,$e()):v.activeView==="project-workspace"&&v.activeProject?(s.innerHTML=`
      ${t}
      <!-- Workspace wrapper -->
      <div id="project-workspace-view" class="animate-toast-slide-in space-y-6"></div>
    `,Fu()):v.activeView==="tasks-view"?(s.innerHTML=`${t}<div id="tasks-view-container" class="animate-toast-slide-in"></div>`,Ts()):v.activeView==="my-approvals-view"?(s.innerHTML=`${t}<div id="my-approvals-container" class="animate-toast-slide-in"></div>`,lt()):v.activeView==="reports-view"?(s.innerHTML=`${t}<div id="reports-view-container" class="animate-toast-slide-in"></div>`,Ku()):v.activeView==="notifications-view"?(s.innerHTML=`${t}<div id="notifications-view-container" class="animate-toast-slide-in"></div>`,Js()):v.activeView==="audit-logs-view"?(s.innerHTML=`${t}<div id="audit-logs-container" class="animate-toast-slide-in"></div>`,va()):v.activeView==="eoffice-view"&&(s.innerHTML=`${t}<div id="eoffice-view-container" class="animate-toast-slide-in"></div>`,Y())}let rt=null,ae=!1,Rt="inbox",Ds="",Rs="",ee=!1,se=null;function Y(){const s=document.getElementById("eoffice-view-container");if(!s)return;const t=v.currentUser;t&&(rt?ju(s,t):ae?Bu(s,t):$u(s,t))}function $u(s,t){var r,l,d,c;const e=v.eOfficeNotes.filter(u=>u.status!=="Draft"&&(u.status==="Pending"&&u.currentCustodian===t.role||u.status==="Returned"&&t.role==="Senior Assistant"&&u.currentCustodian==="Senior Assistant")),i=v.eOfficeNotes.filter(u=>u.currentCustodian!==t.role&&u.approvalHistory.some(p=>p.role===t.role)),n=v.eOfficeNotes.filter(u=>u.status==="Draft"&&u.creatorName===t.name);let o=e;Rt==="outbox"&&(o=i),Rt==="drafts"&&(o=n);const a=t.role==="Senior Assistant";s.innerHTML=`
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">eOffice project initiation notes</h3>
          <p class="text-[10px] text-slate-500 mt-1 font-semibold">Every project must go through note approval before active execution.</p>
        </div>
        ${a?`
          <button id="btn-initiate-note" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded cursor-pointer transition-colors flex items-center gap-2">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Initiate Project Note
          </button>
        `:""}
      </div>
    </div>

    <!-- Tabs Header -->
    <div class="flex border-b border-slate-200 mb-6 bg-white rounded-t-md px-4 pt-3">
      <button class="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${Rt==="inbox"?"border-[#2563EB] text-[#2563EB]":"border-transparent text-slate-500 hover:text-slate-700"}" id="tab-note-inbox">
        Inbox (${e.length})
      </button>
      <button class="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${Rt==="outbox"?"border-[#2563EB] text-[#2563EB]":"border-transparent text-slate-500 hover:text-slate-700"}" id="tab-note-outbox">
        Outbox (${i.length})
      </button>
      ${a?`
        <button class="px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${Rt==="drafts"?"border-[#2563EB] text-[#2563EB]":"border-transparent text-slate-500 hover:text-slate-700"}" id="tab-note-drafts">
          Drafts (${n.length})
        </button>
      `:""}
    </div>

    <!-- List table -->
    <div class="bg-white border border-slate-200 rounded-md overflow-hidden">
      ${o.length===0?`
        <div class="p-12 text-center">
          <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">No Project Notes in this folder</p>
        </div>
      `:`
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 text-slate-450 border-b border-slate-200 text-[9px] font-bold uppercase tracking-widest">
                <th class="p-4">File No & ID</th>
                <th class="p-4">Subject & Project</th>
                <th class="p-4">Budget (Estimated)</th>
                <th class="p-4">Priority</th>
                <th class="p-4">Current Custodian</th>
                <th class="p-4">Status</th>
                <th class="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-xs">
              ${o.map(u=>{let p="bg-slate-50 text-slate-600 border-slate-100";u.priority==="High"?p="bg-rose-50 text-rose-700 border-rose-100":u.priority==="Medium"&&(p="bg-amber-50 text-amber-700 border-amber-100");let h="bg-slate-50 text-slate-600";return u.status==="Approved"?h="bg-emerald-50 text-emerald-700 border border-emerald-100":u.status==="Pending"?h="bg-blue-50 text-blue-700 border border-blue-100":u.status==="Returned"?h="bg-orange-50 text-orange-700 border border-orange-100":u.status==="Rejected"&&(h="bg-rose-50 text-rose-700 border border-rose-100"),`
                  <tr class="hover:bg-slate-50/50 transition-colors">
                    <td class="p-4 font-mono font-semibold text-[10px] text-slate-500">
                      <div>${u.fileNumber}</div>
                      <div class="text-[9px] text-slate-400 mt-0.5">${u.id}</div>
                    </td>
                    <td class="p-4">
                      <div class="font-bold text-slate-800">${u.subject}</div>
                      <div class="text-[10px] text-[#2563EB] font-semibold mt-0.5">${u.projectName}</div>
                    </td>
                    <td class="p-4 font-bold text-slate-800">
                      Rs. ${(u.estimatedBudget/1e5).toFixed(1)} Lakhs
                    </td>
                    <td class="p-4">
                      <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${p}">${u.priority}</span>
                    </td>
                    <td class="p-4 text-slate-600 font-semibold">
                      ${u.currentCustodian}
                    </td>
                    <td class="p-4">
                      <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${h}">${u.status}</span>
                    </td>
                    <td class="p-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        ${u.status==="Draft"?`
                          <button class="btn-edit-draft bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-1 rounded cursor-pointer transition-colors" data-id="${u.id}">
                            Edit
                          </button>
                          <button class="btn-delete-draft bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-1 rounded cursor-pointer transition-colors" data-id="${u.id}">
                            Delete
                          </button>
                        `:`
                          <button class="btn-view-note bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded cursor-pointer transition-colors" data-id="${u.id}">
                            Open Note
                          </button>
                        `}
                      </div>
                    </td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `,(r=document.getElementById("tab-note-inbox"))==null||r.addEventListener("click",()=>{Rt="inbox",Y()}),(l=document.getElementById("tab-note-outbox"))==null||l.addEventListener("click",()=>{Rt="outbox",Y()}),(d=document.getElementById("tab-note-drafts"))==null||d.addEventListener("click",()=>{Rt="drafts",Y()}),(c=document.getElementById("btn-initiate-note"))==null||c.addEventListener("click",()=>{ae=!0,rt=null,Y()}),s.querySelectorAll(".btn-view-note").forEach(u=>{u.addEventListener("click",()=>{rt=u.getAttribute("data-id"),se=null,ee=!1,Y()})}),s.querySelectorAll(".btn-edit-draft").forEach(u=>{u.addEventListener("click",()=>{const p=u.getAttribute("data-id");ae=!0,rt=p,Y()})}),s.querySelectorAll(".btn-delete-draft").forEach(u=>{u.addEventListener("click",()=>{const p=u.getAttribute("data-id");confirm("Are you sure you want to delete this draft note?")&&(v.eOfficeNotes=v.eOfficeNotes.filter(h=>h.id!==p),G(t.roleText,`Deleted draft note: ${p}`,"Success"),$("Draft deleted successfully"),Y())})})}function Bu(s,t){var r,l,d;let e;rt&&(e=v.eOfficeNotes.find(c=>c.id===rt));const i=e?e.fileNumber:`FILE/ENG/2026/${Math.floor(100+Math.random()*900)}`,n=v.headOfAccounts;s.innerHTML=`
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <div class="flex items-center gap-3">
        <button id="btn-form-back" class="text-slate-500 hover:text-slate-700 cursor-pointer p-1 rounded hover:bg-slate-100 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">
            ${e?e.status==="Returned"?"Edit & Resubmit Project Note":"Edit Draft Project Note":"Initiate New Project Note"}
          </h3>
          <p class="text-[10px] text-slate-500 mt-1 font-semibold">${i}</p>
        </div>
      </div>
    </div>

    <form id="note-initiation-form" class="bg-white border border-slate-200 rounded-md p-6 space-y-6">
      <!-- Subject & Project Title -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Subject / Proposal Heading *</label>
          <input type="text" id="form-subject" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="e.g. Laying of CC road at Gachibowli sector-2" required value="${e?e.subject:""}">
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Project Name *</label>
          <input type="text" id="form-project-name" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="e.g. Gachibowli CC Road Sector-2 Development" required value="${e?e.projectName:""}">
        </div>
      </div>

      <!-- Dept, Zone & Priority -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Department *</label>
          <select id="form-dept" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" required>
            <option value="Engineering" ${e&&e.department==="Engineering"?"selected":""}>Engineering</option>
            <option value="Drainage & Sewerage" ${e&&e.department==="Drainage & Sewerage"?"selected":""}>Drainage & Sewerage</option>
            <option value="Electrical & Lighting" ${e&&e.department==="Electrical & Lighting"?"selected":""}>Electrical & Lighting</option>
            <option value="Landscaping & Parks" ${e&&e.department==="Landscaping & Parks"?"selected":""}>Landscaping & Parks</option>
          </select>
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Zone *</label>
          <select id="form-zone" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" required>
            <option value="Zone-1 (Khairetabad)" ${e&&e.zone==="Zone-1 (Khairetabad)"?"selected":""}>Zone-1 (Khairetabad)</option>
            <option value="Zone-2 (Kukatpally)" ${e&&e.zone==="Zone-2 (Kukatpally)"?"selected":""}>Zone-2 (Kukatpally)</option>
            <option value="Zone-3 (Sherilingampally)" ${e&&e.zone==="Zone-3 (Sherilingampally)"?"selected":""}>Zone-3 (Sherilingampally)</option>
            <option value="Zone-4 (Secunderabad)" ${e&&e.zone==="Zone-4 (Secunderabad)"?"selected":""}>Zone-4 (Secunderabad)</option>
            <option value="Head Office" ${e&&e.zone==="Head Office"?"selected":""}>Head Office</option>
          </select>
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Priority *</label>
          <select id="form-priority" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" required>
            <option value="High" ${e&&e.priority==="High"?"selected":""}>High Priority</option>
            <option value="Medium" ${e&&e.priority==="Medium"?"selected":""}>Medium Priority</option>
            <option value="Low" ${e&&e.priority==="Low"?"selected":""}>Low Priority</option>
          </select>
        </div>
      </div>

      <!-- Description & Purpose -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Detailed Description *</label>
          <textarea id="form-desc" rows="4" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Provide a detailed layout of the proposal..." required>${e?e.description:""}</textarea>
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Project Purpose / Objective *</label>
          <textarea id="form-purpose" rows="4" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Why is this project required?" required>${e?e.purpose:""}</textarea>
        </div>
      </div>

      <!-- Background & Justification -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Background Context</label>
          <textarea id="form-background" rows="3" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Previous history, survey details, or complaints if any...">${e?e.background:""}</textarea>
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Justification & Benefits *</label>
          <textarea id="form-justification" rows="3" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="What are the specific justifications and civic benefits?" required>${e?e.justification:""}</textarea>
        </div>
      </div>

      <!-- Financial Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Estimated Budget (Rs.) *</label>
          <input type="number" id="form-budget" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="e.g. 8500000" required value="${e?e.estimatedBudget:""}">
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Mappable Budget Head of Account *</label>
          <select id="form-budget-head" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" required>
            ${n.map(c=>`<option value="${c.code}" ${e&&e.budgetHead===c.code?"selected":""}>${c.code} - ${c.description} (Bal: Rs. ${(c.balance/1e5).toFixed(1)}L)</option>`).join("")}
          </select>
        </div>
      </div>

      <!-- Attachments & Initial Remarks -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Upload Drawings / Survey Estimates</label>
          <input type="text" id="form-attachments" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Enter comma-separated filenames, e.g. layout_drawing.pdf, estimation.xlsx" value="${e&&e.attachments?e.attachments.join(", "):""}">
        </div>
        <div class="space-y-1">
          <label class="text-[10px] font-bold text-slate-550 uppercase tracking-wider">Initiator's remarks (Signature note sheet) *</label>
          <textarea id="form-remarks" rows="2" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Write initial note remarks to be placed on the green sheet..." required>${e?e.remarks:""}</textarea>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between border-t border-slate-100 pt-6">
        <button type="button" id="btn-form-cancel" class="px-4 py-2 text-xs font-bold text-slate-550 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer transition-colors uppercase tracking-wider">
          Cancel
        </button>
        <div class="flex items-center gap-3">
          <button type="button" id="btn-form-save-draft" class="px-4 py-2 text-xs font-bold text-[#2563EB] border border-[#2563EB] rounded-md hover:bg-blue-50/50 cursor-pointer transition-colors uppercase tracking-wider">
            Save Draft
          </button>
          <button type="submit" id="btn-form-submit" class="px-5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md cursor-pointer transition-all shadow-sm flex items-center gap-2 uppercase tracking-wider">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
            Sign & Forward to AE
          </button>
        </div>
      </div>
    </form>
  `,(r=document.getElementById("btn-form-back"))==null||r.addEventListener("click",()=>{ae=!1,rt=null,Y()}),(l=document.getElementById("btn-form-cancel"))==null||l.addEventListener("click",()=>{ae=!1,rt=null,Y()}),(d=document.getElementById("btn-form-save-draft"))==null||d.addEventListener("click",()=>{a(!0)});const o=document.getElementById("note-initiation-form");o==null||o.addEventListener("submit",c=>{c.preventDefault(),a(!1)});function a(c){const u=document.getElementById("form-subject").value.trim(),p=document.getElementById("form-project-name").value.trim(),h=document.getElementById("form-dept").value,m=document.getElementById("form-zone").value,f=document.getElementById("form-priority").value,g=document.getElementById("form-desc").value.trim(),x=document.getElementById("form-purpose").value.trim(),y=document.getElementById("form-background").value.trim(),k=document.getElementById("form-justification").value.trim(),b=parseInt(document.getElementById("form-budget").value,10),w=document.getElementById("form-budget-head").value,S=document.getElementById("form-remarks").value.trim(),C=document.getElementById("form-attachments").value.split(",").map(P=>P.trim()).filter(P=>P.length>0);if(!u||!p||!g||!x||!k||!b||!S){alert("Please fill out all required fields marked with *");return}const _=new Date().toISOString().split("T")[0],M=new Date().toTimeString().split(" ")[0].substring(0,5);if(e){const P=`Budget: Rs. ${e.estimatedBudget}`;if(e.subject=u,e.projectName=p,e.department=h,e.zone=m,e.priority=f,e.description=g,e.purpose=x,e.background=y,e.justification=k,e.estimatedBudget=b,e.budgetHead=w,e.remarks=S,e.attachments=C,c)e.status="Draft",e.currentCustodian="Senior Assistant",$("Draft updated successfully");else{e.status="Pending",e.currentCustodian="Assistant Engineer",e.workflowStatus["Senior Assistant"]="Approved",e.workflowStatus["Assistant Engineer"]="Pending";const D=`v1.${e.versions.length}`,N={version:D,modifiedBy:t.name,modifiedRole:t.role,modifiedDate:_,modifiedTime:M,subject:u,projectName:p,description:g,purpose:x,background:y,estimatedBudget:b,budgetHead:w,justification:k,benefits:k,priority:f,remarks:S,additionalConditions:""};e.versions.push(N),e.approvalHistory.push({officerName:t.name,role:t.role,department:t.roleText,action:"Resubmitted & Forwarded",remarks:S,dateTime:`${_} ${M}`,status:"Cleared",versionNumber:D}),e.auditLogs.push({user:t.name,role:t.role,date:_,time:M,ip:"10.2.14.8",action:"Resubmit Note",previousValue:P,newValue:`Budget: Rs. ${b} (${D})`}),G(t.roleText,`Signed and forwarded note ${e.id} to AE`,"Success"),$("Signed and Forwarded to Assistant Engineer successfully!")}}else{const P=`NOTE-2026-ENG-${Math.floor(100+Math.random()*900)}`,D={id:P,fileNumber:i,subject:u,projectName:p,department:h,zone:m,description:g,purpose:x,background:y,estimatedBudget:b,budgetHead:w,justification:k,benefits:k,priority:f,attachments:C,remarks:S,additionalConditions:"",status:c?"Draft":"Pending",currentCustodian:c?"Senior Assistant":"Assistant Engineer",creatorRole:t.role,creatorName:t.name,createdDate:_,createdTime:M,versions:[{version:"v1.0",modifiedBy:t.name,modifiedRole:t.role,modifiedDate:_,modifiedTime:M,subject:u,projectName:p,description:g,purpose:x,background:y,estimatedBudget:b,budgetHead:w,justification:k,benefits:k,priority:f,remarks:S,additionalConditions:""}],workflowStatus:{"Senior Assistant":c?"Pending":"Approved","Assistant Engineer":c?"Waiting":"Pending","Deputy Executive Engineer":"Waiting","Executive Engineer":"Waiting","Superintending Engineer":"Waiting","Joint Commissioner":"Waiting","Additional Commissioner":"Waiting",Commissioner:"Waiting"},approvalHistory:c?[]:[{officerName:t.name,role:t.role,department:t.roleText,action:"Initiated & Forwarded",remarks:S,dateTime:`${_} ${M}`,status:"Cleared",versionNumber:"v1.0"}],auditLogs:[{user:t.name,role:t.role,date:_,time:M,ip:"10.2.14.8",action:"Note Created",previousValue:"-",newValue:"v1.0 Initial Draft"}]};v.eOfficeNotes.push(D),c?$("Draft note saved successfully."):(G(t.roleText,`Signed and forwarded note ${P} to AE`,"Success"),$("Signed and Forwarded to Assistant Engineer successfully!"))}ae=!1,rt=null,Y()}}function ju(s,t){var l,d,c,u,p,h,m;const e=v.eOfficeNotes.find(f=>f.id===rt);if(!e){s.innerHTML='<div class="p-6 text-red-500 font-bold">Error: Note not found.</div>';return}const i=se&&e.versions.find(f=>f.version===se)||e.versions[e.versions.length-1],n=e.currentCustodian===t.role&&e.status!=="Approved"&&e.status!=="Rejected",o=["Senior Assistant","Assistant Engineer","Deputy Executive Engineer","Executive Engineer","Superintending Engineer","Joint Commissioner","Additional Commissioner","Commissioner"],a=`
    <div class="bg-white border border-slate-200 rounded-md p-4 mb-6 shadow-sm">
      <div class="flex items-center justify-between gap-4 flex-wrap">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">Workflow Tracker</span>
          <span class="text-xs text-slate-800 font-semibold">${e.fileNumber}</span>
        </div>
        <div class="flex items-center gap-1.5 text-xs">
          <span class="font-bold text-slate-500">Status:</span>
          <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${e.status==="Approved"?"bg-emerald-50 text-emerald-700 border border-emerald-100":e.status==="Pending"?"bg-blue-50 text-blue-700 border border-blue-100":e.status==="Returned"?"bg-orange-50 text-orange-700 border border-orange-100":"bg-rose-50 text-rose-700 border border-rose-100"}">${e.status}</span>
        </div>
      </div>

      <!-- Pipeline Steps -->
      <div class="mt-6 flex items-center justify-between overflow-x-auto pb-2 relative">
        <div class="absolute h-0.5 left-8 right-8 top-4 bg-slate-100 -z-1"></div>
        ${o.map((f,g)=>{let x="Waiting";if(e.status==="Approved")x="Approved";else if(e.status==="Rejected"&&e.currentCustodian===f)x="Returned";else if(e.currentCustodian===f)x=e.status==="Returned"?"Returned":"Active";else{const w=o.indexOf(e.currentCustodian);g<w&&(x="Approved")}let y="bg-slate-200 border-slate-300 text-slate-500",k="text-slate-400 font-medium",b=`<span class="text-[10px] font-bold">${g+1}</span>`;return x==="Approved"?(y="bg-emerald-500 border-emerald-600 text-white",k="text-emerald-700 font-bold",b='<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'):x==="Active"?(y="bg-blue-600 border-blue-700 text-white ring-4 ring-blue-100 animate-pulse",k="text-blue-700 font-extrabold"):x==="Returned"&&(y="bg-amber-500 border-amber-600 text-white",k="text-amber-700 font-extrabold",b='<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>'),`
            <div class="flex flex-col items-center text-center px-4 min-w-[90px] relative z-10">
              <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center ${y} transition-all">
                ${b}
              </div>
              <span class="text-[9px] uppercase tracking-wider mt-2 whitespace-nowrap ${k}">${f.split(" ").map(w=>w==="Assistant"?"Asst":w==="Superintending"?"SE":w==="Executive"?"EE":w==="Deputy"?"Dy.EE":w).join(" ")}</span>
            </div>
          `}).join("")}
      </div>
    </div>
  `,r=`Rs. ${(i.estimatedBudget/1e5).toFixed(1)} Lakhs (Budget Head: ${i.budgetHead})`;if(s.innerHTML=`
    <!-- Top toolbar -->
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button id="btn-detail-back" class="text-slate-500 hover:text-slate-700 cursor-pointer p-1 rounded hover:bg-slate-100 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          <div>
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Note Sheet Workspace</h3>
            <p class="text-[10px] text-slate-500 mt-1 font-semibold">${e.fileNumber} | Created by ${e.creatorName} (${e.creatorRole})</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${ee?`
            <button id="btn-exit-compare" class="bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold px-3 py-1.5 rounded cursor-pointer transition-colors border border-rose-100 uppercase tracking-wider">
              Exit Comparison
            </button>
          `:`
            <button id="btn-toggle-compare" class="bg-blue-50 hover:bg-blue-100 text-[#2563EB] text-[10px] font-bold px-3 py-1.5 rounded cursor-pointer transition-colors border border-blue-100 uppercase tracking-wider">
              Compare Versions
            </button>
          `}
        </div>
      </div>
    </div>

    ${a}

    ${ee?`
      <!-- Comparison Screen -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Version 1 Column -->
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h4 class="text-xs font-bold text-slate-900 uppercase">Version A</h4>
            <select id="select-ver-a" class="text-xs p-1 border border-slate-200 rounded bg-white outline-none">
              ${e.versions.map(f=>`<option value="${f.version}" ${f.version===Ds?"selected":""}>${f.version} - ${f.modifiedRole}</option>`).join("")}
            </select>
          </div>
          <div id="compare-column-a"></div>
        </div>

        <!-- Version 2 Column -->
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h4 class="text-xs font-bold text-slate-900 uppercase">Version B</h4>
            <select id="select-ver-b" class="text-xs p-1 border border-slate-200 rounded bg-white outline-none">
              ${e.versions.map(f=>`<option value="${f.version}" ${f.version===Rs?"selected":""}>${f.version} - ${f.modifiedRole}</option>`).join("")}
            </select>
          </div>
          <div id="compare-column-b"></div>
        </div>
      </div>
    `:`
      <!-- Standard Detail Screen -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <!-- Left: Traditional Green Note Sheet (2 cols wide) -->
        <div class="xl:col-span-2 space-y-6">
          <div class="green-note-sheet bg-[#F4FAF4] border-l-4 border-l-[#10B981] border-y border-r border-[#D1E7DD] rounded-md shadow-sm p-8 min-h-[500px]">
            <!-- Government Emblem Banner -->
            <div class="text-center border-b border-slate-200 pb-6 mb-6">
              <h1 class="text-xs font-bold text-slate-700 tracking-widest uppercase">Greater Hyderabad Municipal Corporation</h1>
              <h2 class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">e-Office Note Approval Sheet</h2>
              <div class="w-16 h-0.5 bg-[#10B981] mx-auto mt-2"></div>
            </div>

            <!-- Subject Header -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between items-baseline gap-2">
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">File No:</span>
                <span class="text-xs font-mono font-bold text-slate-800">${e.fileNumber}</span>
              </div>
              <div class="flex justify-between items-baseline gap-2">
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Subject:</span>
                <span class="text-xs font-bold text-slate-800">${i.subject}</span>
              </div>
              <div class="flex justify-between items-baseline gap-2">
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Project:</span>
                <span class="text-xs font-bold text-[#2563EB]">${i.projectName}</span>
              </div>
              <div class="grid grid-cols-2 gap-4 border-y border-slate-200/60 py-3 text-[11px]">
                <div><span class="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Department:</span> <span class="font-semibold text-slate-700">${e.department}</span></div>
                <div><span class="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Zone:</span> <span class="font-semibold text-slate-700">${e.zone}</span></div>
              </div>
            </div>

            <!-- Core Note Paragraphs -->
            <div class="space-y-5 text-xs text-slate-800 leading-relaxed font-serif">
              <p><strong>1. PROPOSAL DESCRIPTION:</strong><br>${i.description}</p>
              <p><strong>2. OBJECTIVE & PURPOSE:</strong><br>${i.purpose}</p>
              ${i.background?`<p><strong>3. BACKGROUND CONTEXT:</strong><br>${i.background}</p>`:""}
              <p><strong>4. JUSTIFICATION & CIVIC BENEFITS:</strong><br>${i.justification}</p>
              <div class="bg-white/80 p-3 rounded border border-emerald-100 font-sans my-4">
                <div class="text-[9px] uppercase tracking-wider font-bold text-slate-500">Proposed Budget Allocation</div>
                <div class="text-xs font-bold text-slate-800 mt-1">${r}</div>
              </div>
              ${i.additionalConditions?`<p><strong>5. CONDITIONAL PROVISIONS / RIDER:</strong><br>${i.additionalConditions}</p>`:""}
              ${e.attachments&&e.attachments.length>0?`
                <div class="mt-4 border-t border-slate-200/60 pt-3 font-sans">
                  <span class="text-[9px] uppercase tracking-wider font-bold text-slate-500">Uploaded Attachments:</span>
                  <div class="flex items-center gap-2 mt-2 flex-wrap">
                    ${e.attachments.map(f=>`
                      <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white text-slate-700 text-[10px] border border-slate-200">
                        <svg class="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                        ${f}
                      </span>
                    `).join("")}
                  </div>
                </div>
              `:""}
            </div>

            <!-- Chronological Remarks / Note Sheets Signatures -->
            <div class="mt-8 border-t-2 border-dashed border-[#A7F3D0] pt-6 space-y-6">
              <h3 class="text-[10px] font-bold text-emerald-800 uppercase tracking-widest mb-4">Official Remarks & Digital Signatures</h3>
              ${e.approvalHistory.map((f,g)=>`
                  <div class="p-4 rounded-md bg-white border border-[#D1E7DD] relative space-y-2 font-serif text-slate-800 text-[11px] shadow-sm">
                    <p class="leading-relaxed"><strong>Para ${g+1}:</strong> ${f.remarks||"Recommended and forwarded."}</p>
                    <div class="flex justify-between items-end border-t border-slate-100 pt-3 mt-3 font-sans text-[10px] text-slate-500">
                      <div>
                        <span class="font-bold text-slate-700">${f.officerName}</span>
                        <div class="text-[9px] text-[#2563EB] font-bold uppercase tracking-wider">${f.role}</div>
                      </div>
                      <div class="text-right">
                        <span class="inline-flex items-center gap-1 text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">
                          <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          Digitally Signed
                        </span>
                        <div class="text-[9px] text-slate-450 mt-1 font-semibold">${f.dateTime}</div>
                      </div>
                    </div>
                  </div>
                `).join("")}
            </div>
          </div>
        </div>

        <!-- Right: Actions, Versions & Audit Log -->
        <div class="space-y-6">
          <!-- Actions panel -->
          <div class="bg-white border border-slate-200 rounded-md p-6">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">Action Panel</h4>
            ${n?`
              <!-- Input Remarks -->
              <div class="space-y-2 mb-4">
                <label class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Enter Note sheet Remarks *</label>
                <textarea id="officer-remarks" rows="4" class="w-full text-xs p-2.5 border border-slate-200 rounded-md outline-none focus:border-[#2563EB]" placeholder="Type your official remarks here..." required></textarea>
              </div>

              <!-- Budget overriding for Dy.EE / Addl. Commissioner -->
              ${t.role==="Deputy Executive Engineer"||t.role==="Additional Commissioner"?`
                <div class="space-y-2 mb-4 p-3 bg-slate-50 border border-slate-250 rounded">
                  <label class="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Verify/Modify Estimated Budget (Rs.)</label>
                  <input type="number" id="officer-modify-budget" class="w-full text-xs p-2 border border-slate-200 rounded outline-none focus:border-[#2563EB]" value="${i.estimatedBudget}">
                  <span class="text-[9px] text-slate-400 font-semibold block mt-1">If budget is modified, a new version of the note will be created automatically.</span>
                </div>
              `:""}

              <!-- Custodian Action Buttons -->
              <div class="space-y-2.5 pt-2">
                <button id="btn-officer-approve" class="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded cursor-pointer transition-all flex items-center justify-center gap-2 uppercase tracking-wider shadow-sm">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ${t.role==="Commissioner"?"Grant Administrative Sanction":"Approve & Forward"}
                </button>
                
                ${t.role!=="Senior Assistant"?`
                  <button id="btn-officer-return" class="w-full py-2.5 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded border border-amber-250 cursor-pointer transition-all flex items-center justify-center gap-2 uppercase tracking-wider">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
                    Return to Previous Officer
                  </button>
                `:""}

                ${t.role==="Commissioner"?`
                  <button id="btn-officer-reject" class="w-full py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded cursor-pointer transition-all flex items-center justify-center gap-2 uppercase tracking-wider">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Reject Proposal
                  </button>
                `:""}
              </div>
            `:`
              <!-- Custodian is someone else -->
              <div class="p-4 bg-slate-50 border border-slate-200 rounded text-center text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <svg class="w-6 h-6 text-slate-400 mx-auto mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Awaiting clearance from<br><span class="text-[#2563EB] font-bold block mt-1">${e.currentCustodian}</span>
              </div>
              ${e.status==="Returned"&&t.role==="Senior Assistant"?`
                <div class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 space-y-2">
                  <p class="font-bold">Proposal Returned for Correction</p>
                  <p class="text-[10px] leading-relaxed">Open the initiation form to adjust values and resubmit.</p>
                  <button id="btn-sa-edit-returned" class="w-full py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded cursor-pointer transition-colors uppercase tracking-wider text-[10px]">
                    Edit & Resubmit Note
                  </button>
                </div>
              `:""}
            `}
          </div>

          <!-- Version History panel -->
          <div class="bg-white border border-slate-200 rounded-md p-6">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">Version Snapshots</h4>
            <div class="space-y-3">
              ${e.versions.map(f=>{const g=se?f.version===se:f.version===e.versions[e.versions.length-1].version;return`
                  <div class="version-select-card p-3 rounded-md border transition-all cursor-pointer flex items-center justify-between text-xs ${g?"border-[#2563EB] bg-blue-50/50 shadow-sm":"border-slate-200 hover:border-slate-350"}" data-ver="${f.version}">
                    <div>
                      <div class="font-bold text-slate-800">${f.version} - ${f.modifiedRole}</div>
                      <div class="text-[9px] text-slate-450 mt-0.5">${f.modifiedBy} | ${f.modifiedDate} ${f.modifiedTime}</div>
                    </div>
                    <svg class="w-4 h-4 text-[#2563EB] ${g?"":"hidden"}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                `}).join("")}
            </div>
          </div>

          <!-- Immutable Audit Logs panel -->
          <div class="bg-white border border-slate-200 rounded-md p-6">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">Immutable Audit Trail</h4>
            <div class="space-y-3 text-[10px] max-h-52 overflow-y-auto pr-2">
              ${e.auditLogs.map(f=>`
                <div class="p-2.5 rounded bg-slate-50 border border-slate-150 space-y-1">
                  <div class="flex justify-between font-bold text-slate-700">
                    <span>${f.action}</span>
                    <span class="text-[9px] text-slate-400 font-semibold">${f.date} ${f.time}</span>
                  </div>
                  <div class="text-slate-500 font-medium">By: ${f.user} (${f.role})</div>
                  <div class="grid grid-cols-2 gap-1 text-[8px] border-t border-slate-100 pt-1.5 mt-1.5 font-mono text-slate-450">
                    <div class="truncate">Old: ${f.previousValue}</div>
                    <div class="truncate">New: ${f.newValue}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `}
  `,(l=document.getElementById("btn-detail-back"))==null||l.addEventListener("click",()=>{rt=null,se=null,ee=!1,Y()}),(d=document.getElementById("btn-toggle-compare"))==null||d.addEventListener("click",()=>{ee=!0,Ds=e.versions[0].version,Rs=e.versions[e.versions.length-1].version,Y()}),(c=document.getElementById("btn-exit-compare"))==null||c.addEventListener("click",()=>{ee=!1,Y()}),s.querySelectorAll(".version-select-card").forEach(f=>{f.addEventListener("click",()=>{se=f.getAttribute("data-ver"),Y()})}),(u=document.getElementById("btn-sa-edit-returned"))==null||u.addEventListener("click",()=>{ae=!0,Y()}),ee){const f=document.getElementById("select-ver-a"),g=document.getElementById("select-ver-b");f==null||f.addEventListener("change",()=>{Ds=f.value,ui(e)}),g==null||g.addEventListener("change",()=>{Rs=g.value,ui(e)}),ui(e)}if(n){const f=document.getElementById("officer-remarks"),g=document.getElementById("officer-modify-budget"),x=new Date().toISOString().split("T")[0],y=new Date().toTimeString().split(" ")[0].substring(0,5);(p=document.getElementById("btn-officer-approve"))==null||p.addEventListener("click",()=>{const k=f.value.trim();if(!k){$("Error: Remarks are mandatory before signing."),f.focus(),f.classList.add("border-rose-350");return}let b=i.estimatedBudget,w=!1;if(g){const A=parseInt(g.value,10);A!==i.estimatedBudget&&(b=A,w=!0)}const S=document.getElementById("btn-officer-approve");S.disabled=!0,S.innerHTML='<span class="animate-pulse">Signing note sheet electronically...</span>',setTimeout(()=>{let A=i.version;w&&(A=`v1.${e.versions.length}`,e.versions.push({...i,version:A,modifiedBy:t.name,modifiedRole:t.role,modifiedDate:x,modifiedTime:y,estimatedBudget:b,remarks:k}),e.auditLogs.push({user:t.name,role:t.role,date:x,time:y,ip:"10.2.20.15",action:"Modify Budget",previousValue:`Rs. ${i.estimatedBudget}`,newValue:`Rs. ${b} (${A})`}));const C=o.indexOf(t.role),_=o[C+1];e.workflowStatus[t.role]="Approved",e.approvalHistory.push({officerName:t.name,role:t.role,department:t.roleText,action:t.role==="Commissioner"?"Granted Administrative Sanction":"Approved & Forwarded",remarks:k,dateTime:`${x} ${y}`,status:"Cleared",versionNumber:A}),t.role==="Commissioner"?(e.status="Approved",e.currentCustodian="Approved / Closed",Lu(e),$("Project Note Approved! Administrative sanction order generated.")):(e.currentCustodian=_,e.workflowStatus[_]="Pending",e.auditLogs.push({user:t.name,role:t.role,date:x,time:y,ip:"10.2.20.15",action:"Approved & Forwarded",previousValue:`Custodian: ${t.role}`,newValue:`Custodian: ${_}`}),G(t.roleText,`Approved note ${e.id} and forwarded to ${_}`,"Success"),$(`Successfully signed and forwarded to ${_}`)),rt=null,Y()},1500)}),(h=document.getElementById("btn-officer-return"))==null||h.addEventListener("click",()=>{const k=f.value.trim();if(!k){$("Error: Remarks are mandatory before returning file."),f.focus(),f.classList.add("border-rose-350");return}const b=o.indexOf(t.role),w=o[b-1];e.status=w==="Senior Assistant"?"Returned":"Pending",e.currentCustodian=w,e.workflowStatus[t.role]="Returned",e.workflowStatus[w]=w==="Senior Assistant"?"Returned":"Pending",e.approvalHistory.push({officerName:t.name,role:t.role,department:t.roleText,action:"Returned to "+w,remarks:k,dateTime:`${x} ${y}`,status:"Returned",versionNumber:i.version}),e.auditLogs.push({user:t.name,role:t.role,date:x,time:y,ip:"10.2.20.15",action:"Returned File",previousValue:`Custodian: ${t.role}`,newValue:`Custodian: ${w} (Returned)`}),G(t.roleText,`Returned note ${e.id} to ${w}`,"Success"),$(`Note returned to ${w}`),rt=null,Y()}),(m=document.getElementById("btn-officer-reject"))==null||m.addEventListener("click",()=>{const k=f.value.trim();if(!k){$("Error: Remarks are mandatory before rejecting proposal."),f.focus(),f.classList.add("border-rose-350");return}confirm("WARNING: Are you sure you want to REJECT this project proposal? This action is permanent.")&&(e.status="Rejected",e.currentCustodian="None",e.workflowStatus.Commissioner="Rejected",e.approvalHistory.push({officerName:t.name,role:t.role,department:t.roleText,action:"Rejected Proposal",remarks:k,dateTime:`${x} ${y}`,status:"Rejected",versionNumber:i.version}),e.auditLogs.push({user:t.name,role:t.role,date:x,time:y,ip:"10.2.20.15",action:"Rejected Proposal",previousValue:"Pending Commissioner Approval",newValue:"Rejected & Closed"}),G(t.roleText,`Rejected note ${e.id} completely`,"Success"),$("Proposal note rejected and closed."),rt=null,Y())})}}function ui(s){const t=document.getElementById("compare-column-a"),e=document.getElementById("compare-column-b");if(!t||!e)return;const i=s.versions.find(r=>r.version===Ds)||s.versions[0],n=s.versions.find(r=>r.version===Rs)||s.versions[s.versions.length-1],o=(r,l,d,c=!1)=>{const u=l!==d,p=h=>c?`Rs. ${(Number(h)/1e5).toFixed(1)} Lakhs`:String(h);return`
      <div class="space-y-1 py-3 border-b border-slate-50 last:border-0">
        <span class="text-[9px] uppercase tracking-wider font-bold text-slate-400">${r}</span>
        <div class="text-xs ${u?"p-2 rounded bg-amber-50/50 border border-amber-100":""}">
          ${u?`
            <div class="text-slate-500 font-semibold">
              <span class="text-[9px] uppercase font-bold text-rose-600 block mb-0.5">Value A:</span>
              ${p(l)}
            </div>
            <div class="text-slate-900 font-bold mt-2">
              <span class="text-[9px] uppercase font-bold text-emerald-600 block mb-0.5">Value B:</span>
              ${p(d)}
            </div>
          `:`
            <span class="text-slate-800 font-bold">${p(l)}</span>
          `}
        </div>
      </div>
    `},a=r=>`
    <div class="space-y-2">
      <div class="text-[10px] text-slate-450 font-semibold mb-4 bg-slate-50 p-2.5 rounded border border-slate-150">
        Snapshot version: ${r.version}<br>
        Modified by: ${r.modifiedBy} (${r.modifiedRole})<br>
        Date: ${r.modifiedDate} ${r.modifiedTime}
      </div>
      <div class="space-y-1">
        ${o("Project Name",i.projectName,n.projectName)}
        ${o("Subject",i.subject,n.subject)}
        ${o("Estimated Budget",i.estimatedBudget,n.estimatedBudget,!0)}
        ${o("Budget Head",i.budgetHead,n.budgetHead)}
        ${o("Priority",i.priority,n.priority)}
        ${o("Description",i.description,n.description)}
        ${o("Purpose",i.purpose,n.purpose)}
        ${o("Justification",i.justification,n.justification)}
        ${o("Remarks",i.remarks,n.remarks)}
      </div>
    </div>
  `;t.innerHTML=a(i),e.innerHTML=a(n)}function Lu(s){const t="PRJ-2026-ENG-"+Math.floor(100+Math.random()*900),e={id:t,name:s.projectName,department:s.department,zone:s.zone,projectType:s.subject.length>30?s.subject.substring(0,30)+"...":s.subject,status:"Planning",startDate:new Date().toISOString().split("T")[0],endDate:new Date(new Date().setFullYear(new Date().getFullYear()+1)).toISOString().split("T")[0],officerInCharge:"Er. R. Sharma",progress:0,budget:s.estimatedBudget,spent:0,description:s.description,lastUpdated:new Date().toISOString().slice(0,16).replace("T"," ")};v.projects.unshift(e),Lt[t]||(Lt[t]=[]),Lt[t].push({id:"DOC-SAN-"+Math.floor(1e3+Math.random()*9e3),name:`Administrative_Sanction_Order_${t}.pdf`,type:"pdf",uploadedBy:"Sri M. Dana Kishore, IAS",uploadedDate:new Date().toISOString().split("T")[0],version:"v1.0",status:"Approved",size:"1.5 MB",category:"Administrative Sanctions"}),v.workOrders.push({id:"WO-"+Math.floor(1e4+Math.random()*9e4),projectId:t,title:`Work Order Proposal for ${s.projectName}`,vendor:"Pending Bid Winner",amount:s.estimatedBudget,currentStage:"Administrative Sanction",stageHistory:{Requirement:s.createdDate,Proposal:s.createdDate,"Administrative Sanction":new Date().toISOString().split("T")[0]},updates:[{date:new Date().toISOString().split("T")[0],text:"Administrative Sanction received. Work order initialized in ERP."}]}),v.notifications.unshift({id:v.notifications.length+1,title:"Project Approved & Initiated",text:`Proposal note ${s.id} approved by Commissioner. Project ${t} created with Administrative Sanction.`,time:"Just now",read:!1}),v.auditLogs.unshift({id:"AUD-"+Math.floor(1e3+Math.random()*9e3),user:"Commissioner",action:`Approved Note ${s.fileNumber} and instantiated project ${t}`,date:new Date().toISOString().split("T")[0],time:new Date().toTimeString().split(" ")[0].substring(0,5),ip:"10.2.3.1",status:"Success"})}let gs="All",ms="All",bs="",ft="recently-updated",pt="overview";function $e(){var c,u,p;const s=document.getElementById("projects-list-view");if(!s)return;const t=v.currentUser;if(!t)return;let e=v.projects.filter(h=>{const m=h.name.toLowerCase().includes(bs)||h.id.toLowerCase().includes(bs),f=gs==="All"||h.department===gs,g=ms==="All"||h.status===ms;return m&&f&&g});ft==="recently-updated"?e.sort((h,m)=>new Date(m.lastUpdated).getTime()-new Date(h.lastUpdated).getTime()):ft==="budget-high"?e.sort((h,m)=>m.budget-h.budget):ft==="budget-low"?e.sort((h,m)=>h.budget-m.budget):ft==="progress-high"?e.sort((h,m)=>m.progress-h.progress):ft==="progress-low"&&e.sort((h,m)=>h.progress-m.progress);const i=["All","Engineering","Drainage & Sewerage","Electrical & Lighting","Landscaping & Parks"],n=["All","Planning","In Progress","Completed","On Hold","Under Audit"],o=v.eOfficeFiles.filter(h=>h.currentCustodian===t.role&&h.status!=="Approved / Closed"&&h.status!=="Rejected"),a=t.role==="Finance Officer"?v.bills.filter(h=>h.status!=="Paid"):[],r=o.length+a.length;v.projects.filter(h=>h.status==="In Progress").length,(v.projects.reduce((h,m)=>h+m.budget,0)/1e7).toFixed(1),(v.projects.reduce((h,m)=>h+m.spent,0)/1e7).toFixed(1),r>0&&`${r}${o.map(h=>{const m=v.projects.find(g=>g.id===h.projectId),f=h.priority==="High"?"bg-rose-50 text-rose-700 border-rose-100":"bg-slate-100 text-slate-655 border-slate-200";return`
              <div class="py-3 flex items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-[9px] font-mono font-bold text-slate-450 uppercase">${h.id}</span>
                    <span class="px-1.5 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider border ${f}">${h.priority}</span>
                    <span class="text-[10px] text-slate-400 font-semibold">${m?m.name:""}</span>
                  </div>
                  <p class="text-xs font-bold text-slate-800">${h.subject}</p>
                </div>
                <button onclick="goToProjectTab('${h.projectId}', 'approvals')" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded cursor-pointer transition-colors shrink-0">
                  Resolve Task
                </button>
              </div>
            `}).join("")}${a.map(h=>{const m=v.projects.find(f=>f.id===h.projectId);return`
              <div class="py-3 flex items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-[9px] font-mono font-bold text-slate-450 uppercase">${h.id}</span>
                    <span class="px-1.5 py-0.2 rounded text-[8px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-100">${h.status}</span>
                    <span class="text-[10px] text-slate-400 font-semibold">${m?m.name:""}</span>
                  </div>
                  <p class="text-xs font-bold text-slate-800">Invoice Claim for ${h.woId} - Rs. ${(h.amount/1e5).toFixed(1)} Lakhs</p>
                </div>
                <button onclick="goToProjectTab('${h.projectId}', 'approvals')" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded cursor-pointer transition-colors shrink-0">
                  Resolve Payment
                </button>
              </div>
            `}).join("")}`,s.innerHTML=`
    <!-- Filter Header -->
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Projects Registry</h3>
          <p class="text-[10px] text-slate-500 mt-1">Select a project to enter its specialized workspace</p>
        </div>
        
        <!-- Controls -->
        <div class="flex flex-wrap items-center gap-3">
          <!-- Search -->
          <div class="flex items-center bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 w-60">
            <span class="text-slate-400 mr-2">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input type="text" id="project-directory-search" class="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent outline-none" placeholder="Search by Project Name / ID..." value="${bs}">
          </div>

          <!-- Dept Filter -->
          <select id="project-directory-dept" class="px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-700 outline-none">
            ${i.map(h=>`<option value="${h}" ${h===gs?"selected":""}>Dept: ${h}</option>`).join("")}
          </select>

          <!-- Status Filter -->
          <select id="project-directory-status" class="px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-700 outline-none">
            ${n.map(h=>`<option value="${h}" ${h===ms?"selected":""}>Status: ${h}</option>`).join("")}
          </select>

          <!-- Sort Options -->
          <select id="project-directory-sort" class="px-3 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-700 outline-none">
            <option value="recently-updated" ${ft==="recently-updated"?"selected":""}>Sort: Recently Updated</option>
            <option value="budget-high" ${ft==="budget-high"?"selected":""}>Sort: Budget (High to Low)</option>
            <option value="budget-low" ${ft==="budget-low"?"selected":""}>Sort: Budget (Low to High)</option>
            <option value="progress-high" ${ft==="progress-high"?"selected":""}>Sort: Progress (High to Low)</option>
            <option value="progress-low" ${ft==="progress-low"?"selected":""}>Sort: Progress (Low to High)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${e.map(h=>{let m="bg-slate-100 text-slate-655";return h.status==="Completed"?m="bg-emerald-50 text-emerald-700":h.status==="In Progress"?m="bg-indigo-50 text-indigo-700":h.status==="Planning"?m="bg-slate-100 text-slate-600":h.status==="On Hold"?m="bg-rose-50 text-rose-700":h.status==="Under Audit"&&(m="bg-amber-50 text-amber-700"),`
          <div class="project-directory-card bg-white border border-slate-200 hover:border-slate-350 rounded-md p-6 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between" data-id="${h.id}">
            <div class="space-y-4">
              <!-- Top Row -->
              <div class="flex justify-between items-center">
                <span class="text-[9px] font-mono font-bold text-slate-400 tracking-wider">${h.id}</span>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${m}">${h.status}</span>
              </div>

              <!-- Title -->
              <div>
                <h4 class="text-xs font-bold text-slate-900 leading-snug hover:text-[#2563EB] transition-colors">${h.name}</h4>
                <p class="text-[10px] text-slate-450 mt-1 font-semibold">${h.projectType}</p>
              </div>
            </div>
          </div>
        `}).join("")}
    </div>
    
    ${e.length===0?'<div class="bg-white border border-slate-200 p-12 text-center text-xs text-slate-450 font-medium rounded-md">No projects matching the selected search parameters.</div>':""}
  `,window.goToProjectTab=(h,m)=>{const f=v.projects.find(g=>g.id===h);f&&(v.activeProject=f,v.activeProjectModule=m,v.activeView="project-workspace",wt(),ct())};const l=document.getElementById("project-directory-search");l==null||l.addEventListener("input",()=>{bs=l.value.trim().toLowerCase(),$e()}),(c=document.getElementById("project-directory-dept"))==null||c.addEventListener("change",h=>{gs=h.target.value,$e()}),(u=document.getElementById("project-directory-status"))==null||u.addEventListener("change",h=>{ms=h.target.value,$e()}),(p=document.getElementById("project-directory-sort"))==null||p.addEventListener("change",h=>{ft=h.target.value,$e()}),s.querySelectorAll(".project-directory-card").forEach(h=>{h.addEventListener("click",()=>{const m=h.getAttribute("data-id"),f=v.projects.find(g=>g.id===m);f&&ze(f)})})}function Fu(){const s=document.getElementById("project-workspace-view"),t=v.activeProject;if(!(!s||!t))switch(s.innerHTML="",v.activeProjectModule){case"summary":xo(s,t);break;case"tracking":Nu(s,t);break;case"approvals":Is(s,t);break;default:xo(s,t)}}function xo(s,t){Mi[t.id];const e=Pi[t.id]||[],i=Lt[t.id]||[];s.innerHTML=`
    <!-- Top Header & Export Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4 mb-4">
      <div>
        <h2 class="text-base font-extrabold text-slate-900 uppercase tracking-wider">${t.id} : ${t.name}</h2>
        <p class="text-xs text-slate-500 mt-1 font-semibold">${t.projectType} • ${t.zone}</p>
      </div>
      
      <!-- Export Options Dropdown -->
      <div class="relative inline-block text-left">
        <button id="project-export-btn" class="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:text-slate-955 transition-colors shadow-xs cursor-pointer">
          <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          <span>Export Options</span>
          <svg class="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        <div id="project-export-dropdown" class="hidden absolute right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-55">
          <div class="px-3 py-1.5 border-b border-slate-100 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Available Formats</div>
          <a class="dropdown-item px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors" onclick="triggerExport('PDF')">
            <svg class="w-3.5 h-3.5 text-red-650" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 9.8 10c5.3 0 9.7-4.3 9.7-9.8S17 2 12 2zm-1.8 13.8h-1.5v-6h1.5v6zm4.5 0h-2.3v-6h2.3v6zm-2.3-2.3h1.5v-1.5h-1.5v1.5z"/></svg>
            <span>Export as PDF (.pdf)</span>
          </a>
          <a class="dropdown-item px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors" onclick="triggerExport('Word')">
            <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 9.8 10 9.7-4.3 9.7-9.8S17 2 12 2zm2 13h-4v-1h4v1zm0-2.5h-4v-1h4v1zm0-2.5h-4V7h4v1z"/></svg>
            <span>Export as Word (.docx)</span>
          </a>
          <a class="dropdown-item px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors" onclick="triggerExport('Excel')">
            <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 9.8 10 9.7-4.3 9.7-9.8S17 2 12 2zm1 13h-2v-2h2v2zm0-4.5h-2v-2h2v2z"/></svg>
            <span>Export as Excel (.xlsx)</span>
          </a>
          <a class="dropdown-item px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors" onclick="triggerExport('CSV')">
            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 9.8 10 9.7-4.3 9.7-9.8S17 2 12 2zm1 13h-2v-2h2v2zm0-4.5h-2v-2h2v2z"/></svg>
            <span>Export as CSV (.csv)</span>
          </a>
          <a class="dropdown-item px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer transition-colors" onclick="window.print()">
            <svg class="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2m-2-4H8v8h8v-8z"/></svg>
            <span>Print Summary</span>
          </a>
          <div class="border-t border-slate-100 my-1"></div>
          <a class="dropdown-item px-4 py-2 text-xs text-indigo-700 hover:bg-indigo-50 flex items-center gap-2 cursor-pointer transition-colors font-bold" onclick="generateProjectReport()">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/></svg>
            <span>Generate Project Report</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Secondary horizontal tab bar -->
    <div class="flex border-b border-slate-200 mb-6 gap-2">
      <button class="project-summary-tab-btn px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${pt==="overview"?"text-[#2563EB] border-[#2563EB]":"text-slate-500 border-transparent hover:text-slate-700"}" data-tab="overview">Overview</button>
      <button class="project-summary-tab-btn px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${pt==="financial"?"text-[#2563EB] border-[#2563EB]":"text-slate-500 border-transparent hover:text-slate-700"}" data-tab="financial">Financial Status</button>
      <button class="project-summary-tab-btn px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${pt==="milestones"?"text-[#2563EB] border-[#2563EB]":"text-slate-500 border-transparent hover:text-slate-700"}" data-tab="milestones">Milestones</button>
      <button class="project-summary-tab-btn px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${pt==="activity"?"text-[#2563EB] border-[#2563EB]":"text-slate-500 border-transparent hover:text-slate-700"}" data-tab="activity">Recent Activity</button>
      <button class="project-summary-tab-btn px-4 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${pt==="documents"?"text-[#2563EB] border-[#2563EB]":"text-slate-500 border-transparent hover:text-slate-700"}" data-tab="documents">Documents</button>
    </div>

    <!-- Tab Contents -->
    <div id="project-summary-tabs-container">
      <!-- 1. OVERVIEW -->
      <div id="tab-content-overview" class="${pt==="overview"?"":"hidden"} animate-toast-slide-in space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6 space-y-6">
          <div>
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Project Overview</h3>
            <p class="text-xs text-slate-600 leading-relaxed font-semibold">${t.description}</p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-500 pt-4 border-t border-slate-100">
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Department / Node</span>
              <span class="text-slate-900 block font-bold">${t.department}</span>
            </div>
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Zone Area</span>
              <span class="text-slate-900 block font-bold">${t.zone}</span>
            </div>
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Project Type</span>
              <span class="text-slate-900 block font-bold">${t.projectType}</span>
            </div>
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Project Manager</span>
              <span class="text-slate-900 block font-bold">${t.officerInCharge}</span>
            </div>
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Start Date</span>
              <span class="text-slate-900 block font-bold">${t.startDate}</span>
            </div>
            <div>
              <span class="text-slate-400 block uppercase text-[8px] tracking-wider mb-0.5">Target Completion</span>
              <span class="text-slate-900 block font-bold">${t.endDate}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. FINANCIAL STATUS -->
      <div id="tab-content-financial" class="${pt==="financial"?"":"hidden"} animate-toast-slide-in space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6 space-y-6">
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Financial Status</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-slate-500">Estimated Cost (Sanction)</span>
                <span class="text-slate-900 font-bold">Rs. ${(t.budget/1e7).toFixed(2)} Cr</span>
              </div>
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-slate-500">Budget Allocated</span>
                <span class="text-slate-900 font-bold">Rs. ${(t.budget/1e7).toFixed(2)} Cr</span>
              </div>
              <div class="flex justify-between text-xs font-semibold">
                <span class="text-slate-500">Budget Utilized (Expenditure)</span>
                <span class="text-slate-900 font-bold">Rs. ${(t.spent/1e7).toFixed(2)} Cr</span>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between items-center text-xs font-semibold mb-1">
                <span class="text-slate-655">Work Construction Progress</span>
                <span class="text-[#2563EB] font-bold">${t.progress}%</span>
              </div>
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#2563EB] rounded-full" style="width: ${t.progress}%"></div>
              </div>
            </div>
          </div>

          <div class="border-t border-slate-100 pt-6">
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Financial Summary</h3>
            <p class="text-xs text-slate-600 leading-relaxed font-semibold">
              Out of the total budget limit of Rs. ${(t.budget/1e7).toFixed(2)} Cr, Rs. ${(t.spent/1e7).toFixed(2)} Cr has been utilized. The construction works are at ${t.progress}% of physical progress completion.
            </p>
          </div>
        </div>
      </div>

      <!-- 3. MILESTONES -->
      <div id="tab-content-milestones" class="${pt==="milestones"?"":"hidden"} animate-toast-slide-in space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Key Project Milestones</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 border border-slate-100 rounded bg-slate-50/30 text-xs font-semibold">
              <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span class="font-bold text-slate-800">Milestone 1: Structural Soil Clearances</span>
              </div>
              <span class="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Completed (2025-07-15)</span>
            </div>

            <div class="flex items-center justify-between p-3 border border-slate-100 rounded bg-slate-50/30 text-xs font-semibold">
              <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span class="font-bold text-slate-800">Milestone 2: Sub-structure Concrete Pillars</span>
              </div>
              <span class="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Completed (2026-01-15)</span>
            </div>

            <div class="flex items-center justify-between p-3 border border-slate-100 rounded bg-slate-50/30 text-xs font-semibold">
              <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse"></span>
                <span class="font-bold text-slate-800">Milestone 3: Steel Girder Erection (Superstructure)</span>
              </div>
              <span class="text-[9px] font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full">In Progress</span>
            </div>

            <div class="flex items-center justify-between p-3 border border-slate-100 rounded bg-slate-50/30 text-xs font-semibold">
              <div class="flex items-center gap-3">
                <span class="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                <span class="font-bold text-slate-400">Milestone 4: Asphalt Road Blacktopping</span>
              </div>
              <span class="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Planned (Oct 2026)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. RECENT ACTIVITY -->
      <div id="tab-content-activity" class="${pt==="activity"?"":"hidden"} animate-toast-slide-in space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Activity Timeline & Updates</h3>
          <div class="space-y-4 max-h-96 overflow-y-auto pr-1 text-xs">
            ${e.map(c=>`
              <div class="border-l border-slate-200 pl-3.5 relative space-y-1 py-1 font-semibold">
                <span class="absolute -left-1 top-2.5 w-2 h-2 rounded-full bg-[#2563EB]"></span>
                <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">${c.date} ${c.time} | ${c.actor}</div>
                <p class="text-slate-650 font-semibold leading-relaxed">${c.activity}</p>
              </div>
            `).join("")}
            ${e.length===0?'<div class="text-center text-xs text-slate-400 p-4">No recent activity logs.</div>':""}
          </div>
        </div>
      </div>

      <!-- 5. DOCUMENTS -->
      <div id="tab-content-documents" class="${pt==="documents"?"":"hidden"} animate-toast-slide-in space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Project Documents & Repository</h3>
              <p class="text-[10px] text-slate-500 mt-1">Audit-ready PDF file archives. Click Preview to view version logs and details</p>
            </div>
            <span class="px-2.5 py-1 rounded bg-[#EEF4FF] text-[#2563EB] text-[9px] font-bold uppercase tracking-wider">
              ${i.length} Documents Attached
            </span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs border-collapse">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-200 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <th class="py-3 px-4">Document Name</th>
                  <th class="py-3 px-4">Category</th>
                  <th class="py-3 px-4">Version</th>
                  <th class="py-3 px-4">Uploaded By</th>
                  <th class="py-3 px-4">Uploaded Date</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-semibold text-slate-700">
                ${i.map(c=>{let u="bg-slate-100 text-slate-600 border border-slate-200";return c.status==="Approved"?u="bg-emerald-50 text-emerald-700 border border-emerald-200":c.status==="Active"?u="bg-indigo-50 text-indigo-700 border border-indigo-200":(c.status==="Pending Payment"||c.status==="Pending Review")&&(u="bg-amber-50 text-amber-700 border border-amber-200"),`
                    <tr class="hover:bg-slate-50/50">
                      <td class="py-3.5 px-4 text-slate-900 font-bold flex items-center gap-2">
                        <svg class="w-4 h-4 text-[#2563EB] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                        </svg>
                        <span>${c.name}</span>
                      </td>
                      <td class="py-3.5 px-4 text-slate-500 font-medium">${c.category}</td>
                      <td class="py-3.5 px-4 text-slate-500 font-mono text-[10px]">${c.version}</td>
                      <td class="py-3.5 px-4 text-slate-655 font-medium">${c.uploadedBy}</td>
                      <td class="py-3.5 px-4 text-slate-500 font-mono text-[10px]">${c.uploadedDate}</td>
                      <td class="py-3.5 px-4">
                        <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${u}">${c.status}</span>
                      </td>
                      <td class="py-3.5 px-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                          <button onclick="previewDocumentById('${c.id}')" class="bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold px-2 py-1 rounded border border-slate-200 cursor-pointer transition-colors">Preview</button>
                          <button onclick="downloadDocumentByName('${c.name}')" class="bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded cursor-pointer transition-colors">Download</button>
                          <button onclick="viewDocumentVersionHistory('${c.id}')" class="bg-white hover:bg-slate-50 text-indigo-755 text-[10px] font-bold px-2 py-1 rounded border border-indigo-150 cursor-pointer transition-colors">History</button>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;const n="px-4 py-2 text-xs font-bold border-b-2 text-[#2563EB] border-[#2563EB] cursor-pointer transition-all",o="px-4 py-2 text-xs font-bold border-b-2 text-slate-500 border-transparent hover:text-slate-700 cursor-pointer transition-all",a=["overview","financial","milestones","activity","documents"],r=s.querySelectorAll(".project-summary-tab-btn");r.forEach(c=>{c.addEventListener("click",()=>{const u=c.getAttribute("data-tab");u&&(pt=u,r.forEach(p=>{p.getAttribute("data-tab")===u?p.className=`project-summary-tab-btn ${n}`:p.className=`project-summary-tab-btn ${o}`}),a.forEach(p=>{const h=document.getElementById(`tab-content-${p}`);h&&(p===u?h.classList.remove("hidden"):h.classList.add("hidden"))}))})});const l=document.getElementById("project-export-btn"),d=document.getElementById("project-export-dropdown");l&&d&&(l.addEventListener("click",c=>{c.stopPropagation(),d.classList.toggle("hidden")}),document.addEventListener("click",()=>{d.classList.add("hidden")})),window.previewDocumentById=c=>{const u=i.find(p=>p.id===c);u&&xa(u)},window.downloadDocumentByName=c=>{$(`Downloading file: ${c}`)},window.viewDocumentVersionHistory=c=>{const u=document.getElementById("document-preview-modal"),p=i.find(h=>h.id===c);u&&p&&(u.classList.remove("hidden"),u.innerHTML=`
        <div class="bg-white border border-slate-200 rounded-md shadow-xl max-w-md w-full p-6 space-y-4 animate-toast-slide-in">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Version History</h4>
              <p class="text-[10px] text-slate-450 mt-1 uppercase font-mono">${p.name}</p>
            </div>
            <button onclick="document.getElementById('document-preview-modal').classList.add('hidden')" class="text-slate-400 hover:text-slate-600 font-bold">✕</button>
          </div>
          <div class="divide-y divide-slate-100 space-y-2">
            <div class="py-2.5 flex justify-between text-xs items-center">
              <div>
                <span class="font-bold text-slate-800">${p.version} (Active)</span>
                <span class="text-[9px] text-slate-400 block">Uploaded by ${p.uploadedBy}</span>
              </div>
              <span class="text-[10px] font-mono text-slate-450 font-bold">${p.uploadedDate}</span>
            </div>
            <div class="py-2.5 flex justify-between text-xs items-center">
              <div>
                <span class="font-medium text-slate-500">v0.9 (Draft)</span>
                <span class="text-[9px] text-slate-400 block">Uploaded by Sri V. Kumar</span>
              </div>
              <span class="text-[10px] font-mono text-slate-450 font-bold">2025-05-15</span>
            </div>
          </div>
          <button onclick="document.getElementById('document-preview-modal').classList.add('hidden')" class="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer">
            Close Version History
          </button>
        </div>
      `)},window.triggerExport=c=>{$(`Successfully exported Project Data as ${c} format!`)},window.generateProjectReport=()=>{const c=document.getElementById("project-report-modal");if(!c)return;Mi[t.id],Pi[t.id];const u=ma[t.id]||[],p=Lt[t.id]||[];c.classList.remove("hidden"),c.innerHTML=`
      <div class="bg-white border border-slate-300 rounded-md shadow-2xl max-w-4xl w-full p-8 space-y-6 my-8 print:p-0 print:border-none print:shadow-none max-h-[90vh] overflow-y-auto animate-toast-slide-in">
        <!-- Print Actions -->
        <div class="flex justify-between items-center pb-4 border-b border-slate-200 print:hidden">
          <span class="text-xs font-bold text-slate-800 uppercase tracking-wider">Official Project Report Preview</span>
          <div class="flex gap-2">
            <button onclick="window.print()" class="px-3.5 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer">
              Print Report
            </button>
            <button onclick="document.getElementById('project-report-modal').classList.add('hidden')" class="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded transition-colors cursor-pointer">
              Close
            </button>
          </div>
        </div>

        <!-- Report Sheet Container -->
        <div class="space-y-6 text-slate-800 font-serif">
          <!-- Letterhead Header -->
          <div class="text-center space-y-2 border-b-2 border-slate-900 pb-4">
            <div class="font-bold text-lg text-slate-900 tracking-wide uppercase">Greater Hyderabad Municipal Corporation</div>
            <div class="text-xs text-slate-700 font-semibold tracking-wider">OFFICE OF THE COMMISSIONER, HEAD OFFICE, TANK BUND ROAD, HYDERABAD</div>
            <div class="text-[10px] text-slate-500 font-mono">Date: ${new Date().toISOString().split("T")[0]} | Ref No: GHMC/IT-ERP/REPORT/${t.id}/${new Date().getFullYear()}</div>
          </div>

          <div class="text-center font-bold text-sm text-slate-900 underline uppercase py-2">
            DETAILED PROJECT STATUS REPORT
          </div>

          <!-- Section 1: Project Information -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans">1. Project Information</h4>
            <table class="w-full text-xs border border-slate-200 border-collapse">
              <tbody>
                <tr>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold w-1/4">Project ID:</td>
                  <td class="p-2 border border-slate-200 font-mono">${t.id}</td>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold w-1/4">Current Status:</td>
                  <td class="p-2 border border-slate-200 font-bold text-indigo-700">${t.status}</td>
                </tr>
                <tr>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold">Project Name:</td>
                  <td class="p-2 border border-slate-200" colspan="3">${t.name}</td>
                </tr>
                <tr>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold">Department / Division:</td>
                  <td class="p-2 border border-slate-200">${t.department}</td>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold">Zone / Area:</td>
                  <td class="p-2 border border-slate-200">${t.zone}</td>
                </tr>
                <tr>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold">Project Manager:</td>
                  <td class="p-2 border border-slate-200">${t.officerInCharge}</td>
                  <td class="p-2 border border-slate-200 bg-slate-50 font-bold">Outlay Timeline:</td>
                  <td class="p-2 border border-slate-200">${t.startDate} to ${t.endDate}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Section 2: Financial Summary -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans">2. Financial Status Summary</h4>
            <table class="w-full text-xs border border-slate-200 border-collapse">
              <thead>
                <tr class="bg-slate-50">
                  <th class="p-2 border border-slate-200 text-left font-bold">Sanction Budget Outlay</th>
                  <th class="p-2 border border-slate-200 text-left font-bold">Disbursed Expenditure</th>
                  <th class="p-2 border border-slate-200 text-left font-bold">Utilization Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-2 border border-slate-200 font-bold">Rs. ${(t.budget/1e7).toFixed(2)} Crores</td>
                  <td class="p-2 border border-slate-200 font-bold">Rs. ${(t.spent/1e7).toFixed(2)} Crores</td>
                  <td class="p-2 border border-slate-200 font-bold text-emerald-700">${(t.spent/t.budget*100).toFixed(1)}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Section 3: Key Milestones -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans">3. Project Milestones & Progress</h4>
            <div class="text-xs space-y-1 font-sans">
              <div class="flex justify-between font-bold text-slate-700 mb-1">
                <span>Overall Physical Completion Progress:</span>
                <span>${t.progress}%</span>
              </div>
              <div class="w-full h-2 bg-slate-100 border border-slate-200 rounded-full overflow-hidden mb-3">
                <div class="h-full bg-slate-900" style="width: ${t.progress}%"></div>
              </div>
              <div class="border border-slate-200 rounded p-2 bg-slate-50/20">
                <ul class="list-disc pl-5 space-y-1 text-slate-700 font-semibold">
                  <li>Milestone 1: Structural Soil Clearances — <span class="text-emerald-700">Completed (2025-07-15)</span></li>
                  <li>Milestone 2: Sub-structure Concrete Pillars — <span class="text-emerald-700">Completed (2026-01-15)</span></li>
                  <li>Milestone 3: Steel Girder Erection (Superstructure) — <span class="text-indigo-700 font-bold">In Progress (${t.progress}%)</span></li>
                  <li>Milestone 4: Asphalt Road Blacktopping — <span class="text-slate-500">Planned (Oct 2026)</span></li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Section 4: Workflow Tracking & Approvals -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans">4. File Movement & Workflow History</h4>
            <table class="w-full text-[10px] border border-slate-200 border-collapse">
              <thead>
                <tr class="bg-slate-50 text-slate-700 font-bold">
                  <th class="p-2 border border-slate-200 text-left">Stage</th>
                  <th class="p-2 border border-slate-200 text-left">Officer Name</th>
                  <th class="p-2 border border-slate-200 text-left">Action Date / Time</th>
                  <th class="p-2 border border-slate-200 text-left">Status</th>
                  <th class="p-2 border border-slate-200 text-left">Remarks Given</th>
                </tr>
              </thead>
              <tbody>
                ${u.map(h=>`
                  <tr>
                    <td class="p-2 border border-slate-200 font-bold">${h.stage}</td>
                    <td class="p-2 border border-slate-200">${h.officer} (${h.department})</td>
                    <td class="p-2 border border-slate-200 font-mono">${h.dateTime}</td>
                    <td class="p-2 border border-slate-200 font-bold">${h.status}</td>
                    <td class="p-2 border border-slate-200 italic">"${h.remarks||"N/A"}"</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <!-- Section 5: Attached Auditable Certificates -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans">5. Attached Files & Certificates</h4>
            <ul class="list-decimal pl-5 text-xs text-slate-700 font-semibold space-y-1">
              ${p.map(h=>`
                <li>${h.name} (Version: ${h.version}, Uploaded by: ${h.uploadedBy} on ${h.uploadedDate}, Status: ${h.status})</li>
              `).join("")}
            </ul>
          </div>

          <!-- Section 6: Officer Signatures & Seal -->
          <div class="pt-8">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-50 p-1 border-l-2 border-slate-900 font-sans mb-8">6. Authorization & Attestations</h4>
            <div class="grid grid-cols-3 gap-8 text-center text-xs font-sans mt-4">
              <div class="space-y-1">
                <div class="h-10 flex items-end justify-center font-mono italic text-slate-400">[Digital Signature Verified]</div>
                <div class="border-t border-slate-350 pt-2 font-bold text-slate-900">Sri M. Dana Kishore, IAS</div>
                <div class="text-[9px] text-slate-500 uppercase tracking-wider">Commissioner, GHMC</div>
              </div>
              <div class="space-y-1">
                <div class="h-10 flex items-end justify-center font-mono italic text-slate-400">[Digital Signature Verified]</div>
                <div class="border-t border-slate-350 pt-2 font-bold text-slate-900">Smt. K. Anitha Reddy</div>
                <div class="text-[9px] text-slate-500 uppercase tracking-wider">Chief Finance Officer</div>
              </div>
              <div class="space-y-1">
                <div class="h-10 flex items-end justify-center font-mono italic text-slate-400">[Digital Signature Verified]</div>
                <div class="border-t border-slate-350 pt-2 font-bold text-slate-900">Er. R. Sharma</div>
                <div class="text-[9px] text-slate-500 uppercase tracking-wider">Executive Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}}function xa(s){var i;const t=document.getElementById("document-preview-modal");if(!t)return;let e="";s.name==="ghmc.pdf"?e=`
      <div class="flex-1 bg-emerald-50/10 p-6 overflow-y-auto border-r border-slate-200 font-mono text-[10px] text-emerald-950 leading-relaxed max-h-full">
        <!-- GHMC Note sheet Header -->
        <div class="text-center border-b border-emerald-900/20 pb-4 mb-4">
          <div class="font-bold text-xs text-emerald-900">GREATER HYDERABAD MUNICIPAL CORPORATION</div>
          <div class="text-[9px] text-emerald-800/80 uppercase font-semibold">O/o SENIOR ASSISTANT-1 INFORMATION TECHNOLOGY, HEAD OFFICE</div>
          <div class="text-[9px] text-emerald-800/60 font-mono mt-1">Computer File No. 401476 | File Ref: IT/COM/0008/2026/SR.ASST-1 (IT)-HO</div>
        </div>

        <div class="mb-4">
          <div class="font-bold text-emerald-900 uppercase mb-1">Subject:</div>
          <p class="font-medium text-emerald-955 bg-white p-2 border border-emerald-900/10 rounded">
            Providing of IVR Outbound Call Campaign – Early Bird Property Tax Scheme 2026-27 of GHMC – According administrative Sanction and Agency approval – Request – Reg.
          </p>
        </div>

        <div class="space-y-4">
          <div class="border-l-2 border-emerald-800/30 pl-3">
            <span class="font-bold text-emerald-900 text-[9px] block">Note #1 (Submitted to AC(IT), GHMC)</span>
            <p class="mt-1">
              It is submitted that the Commissioner, GHMC has instructed the IT Section to give wide publicity for the Early Bird Property Tax Scheme (5% rebate) by adopting various modes such as SMS, call campaigns, etc., to ensure maximum outreach before 30th April 2026.
            </p>
            <p class="mt-2">
              In this regard, the IT Section proposes to undertake an IVR Outbound Call Campaign to create awareness among citizens who have not yet paid their Property Tax for the financial year 2026-27 and to encourage them to avail the Early Bird Scheme.
            </p>
            <p class="mt-2">
              Accordingly, this office has approached M/s. EMRI Green Health Services, the agency presently maintaining the GHMC Call Center (040-21111111) to provide services for conducting the IVR Outbound Call Campaign.
            </p>
            
            <div class="mt-3 bg-white border border-emerald-900/15 rounded p-2">
              <div class="font-bold text-emerald-900 mb-1">Cost Details (Excl GST):</div>
              <div class="flex justify-between border-b border-emerald-900/10 py-1 font-semibold">
                <span>Providing IVR campaign execution (Lump sum)</span>
                <span>Rs. 5,00,000</span>
              </div>
              <div class="flex justify-between pt-1 font-bold">
                <span>Total amount (Rupees Five Lakh Only)</span>
                <span>Rs. 5,00,000</span>
              </div>
            </div>
            
            <div class="text-right mt-2 text-emerald-800/60 font-bold text-[8px] uppercase font-mono">
              Signed: G. SATYANARAYANA (SR.ASST-1(IT)-HO) — 20/04/2026
            </div>
          </div>

          <div class="border-t border-dashed border-emerald-900/10 pt-3">
            <div class="border-l-2 border-emerald-800/30 pl-3">
              <span class="font-bold text-emerald-900 text-[9px] block">Note #2 & #3 (AE / Dy.EE Recommendation)</span>
              <p class="mt-1">Recommended. EMRI GHS currently manages the civic helpline and has the necessary outbound calling setup. Entrusting work to existing call center agency is technically feasible and cost-effective.</p>
              <div class="text-right mt-2 text-emerald-800/60 font-bold text-[8px] uppercase font-mono">
                G.N. SAI RAM (AE-3) / NARSING RAO KORMI (DY.EE) — 21/04/2026
              </div>
            </div>
          </div>

          <div class="border-t border-dashed border-emerald-900/10 pt-3">
            <div class="border-l-2 border-emerald-800/30 pl-3">
              <span class="font-bold text-emerald-900 text-[9px] block">Note #6 (Administrative Sanction)</span>
              <p class="mt-1 font-bold text-emerald-950 font-mono">"ok"</p>
              <div class="text-right mt-2 text-emerald-800/60 font-bold text-[8px] uppercase font-mono">
                R V KARNAN IAS (COMMISSIONER) — 21/04/2026
              </div>
            </div>
          </div>
        </div>
      </div>
    `:e=`
      <div class="flex-1 bg-slate-100 flex flex-col items-center justify-center p-8 border-r border-slate-200">
        <svg class="w-12 h-12 text-slate-400 mb-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
        </svg>
        <span class="text-xs font-bold text-slate-800 text-center">${s.name}</span>
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Mock PDF View Interface</span>
        <button class="mt-6 bg-slate-900 hover:bg-slate-800 text-white text-xs px-3 py-1.5 rounded font-semibold transition-all cursor-pointer" onclick="alert('Viewing full document via PDF.js viewer is disabled in prototype.')">
          Open in Native PDF Viewer
        </button>
      </div>
    `,t.innerHTML=`
    <div class="bg-white border border-slate-200 rounded-md shadow-xl max-w-4xl w-full overflow-hidden flex flex-col h-[600px]">
      <!-- Header -->
      <div class="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h4 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-mono">${s.id} - ${s.name}</h4>
          <p class="text-[10px] text-slate-450 font-semibold mt-1 uppercase tracking-wider">${s.category}</p>
        </div>
        <button id="close-doc-modal-btn" class="text-slate-450 hover:text-slate-750 text-base font-bold cursor-pointer">✕</button>
      </div>

      <!-- Body split -->
      <div class="flex-1 flex overflow-hidden">
        <!-- PDF Preview Panel -->
        ${e}

        <!-- Details & Version History -->
        <div class="w-80 p-5 overflow-y-auto space-y-6 text-xs border-l border-slate-100 bg-slate-50/20">
          <!-- Attributes -->
          <div class="space-y-3">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Specs</div>
            <div class="space-y-2 font-semibold text-slate-655">
              <div class="flex justify-between"><span>Ver:</span> <span class="text-slate-900 font-bold">${s.version}</span></div>
              <div class="flex justify-between"><span>Size:</span> <span class="text-slate-900 font-bold">${s.size}</span></div>
              <div class="flex justify-between"><span>Status:</span> <span class="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">${s.status}</span></div>
              <div class="flex justify-between"><span>Uploaded:</span> <span class="text-slate-900 font-mono text-[10px]">${s.uploadedDate}</span></div>
              <div class="flex justify-between"><span>By:</span> <span class="text-slate-900 font-bold">${s.uploadedBy}</span></div>
            </div>
          </div>

          <!-- Version history list -->
          <div class="space-y-3">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Version History</div>
            <div class="space-y-3">
              <div class="border-l-2 border-slate-950 pl-3 py-0.5">
                <div class="font-bold text-slate-900">v1.0 (Signed PDF)</div>
                <div class="text-[9px] text-slate-450 font-medium">Uploaded by ${s.uploadedBy} on ${s.uploadedDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,t.classList.remove("hidden"),(i=document.getElementById("close-doc-modal-btn"))==null||i.addEventListener("click",()=>{t.classList.add("hidden")})}function Nu(s,t){const e=ma[t.id]||[],i=v.eOfficeFiles.filter(a=>a.projectId===t.id),n=Pi[t.id]||[];if(e.length===0){s.innerHTML='<div class="bg-white border border-slate-200 p-8 text-center text-xs text-slate-400">No workflow movement ledger logged for this project</div>';return}const o=e.find(a=>a.status==="In Progress")||e[e.length-1];s.innerHTML=`
    <!-- Top current status banner -->
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Active Project Stage</span>
          <h3 class="text-sm font-bold text-slate-900">${o?o.stage:"Initiation"}</h3>
        </div>
        <div class="border-l border-slate-100 pl-6">
          <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Custodian Officer</span>
          <span class="text-xs font-bold text-slate-800">${o?o.officer:"Unassigned"}</span>
          <span class="text-[10px] text-slate-400 block">${o?o.department:""}</span>
        </div>
        <div class="border-l border-slate-100 pl-6">
          <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Pending Action With</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider border border-amber-100 mt-1 inline-block">${o&&o.pendingWith!=="None"?o.pendingWith:"No pending action"}</span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Left side: workflow timeline -->
      <div class="xl:col-span-2 space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">Workflow Sanction Stepper</h4>
          <div class="relative pl-6 space-y-6">
            <!-- Line Connector -->
            <div class="absolute left-[34px] top-4 bottom-4 w-0.5 bg-slate-150"></div>

            ${Du.map((a,r)=>{const l=e.findIndex(h=>h.stage.toLowerCase()===a.toLowerCase()||h.stage.includes(a)),d=l!==-1?e[l]:null;let c="border-slate-200 bg-white text-slate-350",u="border-slate-250 bg-white",p="Pending";return d&&(d.status==="Completed"?(c="border-emerald-500 bg-emerald-500 text-white",u="border-emerald-250 bg-emerald-50/10 text-slate-700",p="Cleared"):d.status==="In Progress"&&(c="border-[#2563EB] bg-[#2563EB] text-white ring-4 ring-[#EEF4FF]",u="border-[#2563EB] bg-[#EEF4FF]/10 text-slate-900 ring-2 ring-[#EEF4FF]/20 font-medium",p="Active / In Progress")),`
                <div class="flex gap-6 items-start relative z-10 animate-toast-slide-in">
                  <!-- Stepper Index Circle -->
                  <div class="w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 ${c}">
                    ${d&&d.status==="Completed"?"✓":r+1}
                  </div>

                  <!-- Content Card -->
                  <div class="flex-1 border p-4 rounded-md flex flex-col md:flex-row md:items-start justify-between gap-4 transition-all ${u}">
                    <div class="space-y-2">
                      <div class="flex items-center gap-3">
                        <h4 class="text-xs font-bold text-slate-800 leading-none">${a}</h4>
                        <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${p.includes("Cleared")?"bg-emerald-50 text-emerald-700":p.includes("Active")?"bg-[#2563EB]/10 text-[#2563EB]":"bg-slate-100 text-slate-450"}">${p}</span>
                      </div>
                      
                      ${d?`
                        <div class="text-[10px] text-slate-450 font-bold uppercase tracking-wider flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span><strong>Officer:</strong> ${d.officer}</span>
                          <span>•</span>
                          <span><strong>Dept:</strong> ${d.department}</span>
                          <span>•</span>
                          <span><strong>Date:</strong> <span class="font-mono text-[9px]">${d.dateTime}</span></span>
                        </div>
                        <p class="text-xs text-slate-650 leading-relaxed font-semibold italic">"${d.remarks}"</p>
                      `:`
                        <p class="text-[11px] text-slate-400 italic">Stage pending activation.</p>
                      `}
                    </div>
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>

        <!-- File Movement History -->
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">eOffice File Movement History</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[9px]">
                  <th class="py-2.5 px-1">File Ref</th>
                  <th class="py-2.5 px-1">Subject</th>
                  <th class="py-2.5 px-1">Current Custodian</th>
                  <th class="py-2.5 px-1">Status</th>
                  <th class="py-2.5 px-1">Last Update</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700">
                ${i.map(a=>`
                  <tr>
                    <td class="py-3 px-1 font-mono font-bold text-[#2563EB]">${a.id}</td>
                    <td class="py-3 px-1 font-medium truncate max-w-xs text-slate-900" title="${a.subject}">${a.subject}</td>
                    <td class="py-3 px-1 font-semibold text-slate-700">${a.currentCustodian}</td>
                    <td class="py-3 px-1">
                      <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${a.status==="Approved / Closed"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}">${a.status}</span>
                    </td>
                    <td class="py-3 px-1 font-mono text-[10px] text-slate-500">${a.lastUpdated}</td>
                  </tr>
                `).join("")}
                ${i.length===0?'<tr><td colspan="5" class="py-6 text-center text-slate-450 italic">No active files found.</td></tr>':""}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Right side: activity log -->
      <div class="space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-6">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Project Activity Log</h4>
          <div class="relative pl-6 space-y-6">
            <!-- Line -->
            <div class="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-slate-150"></div>

            ${n.map(a=>`
              <div class="flex gap-4 items-start relative z-10 animate-toast-slide-in">
                <!-- Bullet -->
                <div class="w-5.5 h-5.5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                </div>
                
                <div class="space-y-1">
                  <div class="text-[9px] font-bold text-slate-450 uppercase tracking-wider">${a.date} ${a.time}</div>
                  <p class="text-xs text-slate-800 font-semibold">${a.activity}</p>
                  <div class="text-[10px] text-slate-450 font-bold uppercase tracking-wider">Actor: ${a.actor}</div>
                </div>
              </div>
            `).join("")}

            ${n.length===0?'<div class="text-center text-xs text-slate-400 py-4 italic">No activities logged.</div>':""}
          </div>
        </div>
      </div>
    </div>
  `}let he="";function Is(s,t){const e=v.currentUser;if(!e)return;const i=v.eOfficeFiles.filter(g=>g.projectId===t.id),n=i.length,o=i.filter(g=>g.status==="Approved / Closed").length,a=i.filter(g=>g.status==="Rejected").length,r=i.filter(g=>g.status==="Returned").length,l=i.filter(g=>g.status!=="Approved / Closed"&&g.status!=="Rejected"&&g.status!=="Returned").length,d=i.filter(g=>g.currentCustodian===e.role&&g.status!=="Approved / Closed"&&g.status!=="Rejected"),c=e.role==="Finance Officer"?v.bills.filter(g=>g.projectId===t.id&&g.status!=="Paid"):[];!he&&i.length>0&&(he=i[0].id);const u=i.find(g=>g.id===he);s.innerHTML=`
    <!-- Top Statistics Grid -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Files</span>
        <span class="text-lg font-extrabold text-slate-900 mt-2 font-mono">${n}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Approved / Signed</span>
        <span class="text-lg font-extrabold text-emerald-600 mt-2 font-mono">${o}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Rejected</span>
        <span class="text-lg font-extrabold text-rose-600 mt-2 font-mono">${a}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Pending Sanction</span>
        <span class="text-lg font-extrabold text-amber-600 mt-2 font-mono">${l}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Returned for Correction</span>
        <span class="text-lg font-extrabold text-[#2563EB] mt-2 font-mono">${r}</span>
      </div>
    </div>

    <!-- Active Custodian Note -->
    <div class="bg-white border border-slate-200 rounded-md p-4 mb-6 flex justify-between items-center">
      <div>
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Logged In Role Permission</span>
        <p class="text-xs text-slate-800 font-bold mt-0.5">${e.name} (<span class="text-[#2563EB]">${e.roleText}</span>)</p>
      </div>
      <span class="px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-100 text-[9px] font-bold uppercase tracking-wider">
        Operational Node Access
      </span>
    </div>

    <!-- Grid split layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Actionable approvals + Files list (Col 2) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Actionable items -->
        <div class="space-y-3">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Pending My Approvals (${d.length+c.length})</h4>
          
          ${d.length===0&&c.length===0?`
            <div class="p-8 text-center text-xs text-slate-450 bg-slate-50/50 border border-dashed border-slate-200 rounded-md font-semibold">
              No files currently pending for ${e.roleText} signature.
            </div>
          `:`
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${d.map(g=>{var y;const x=g.priority==="High"?"bg-rose-50 text-rose-700 border-rose-100":"bg-slate-100 text-slate-650 border-slate-200";return`
                  <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between hover:border-slate-350 transition-all cursor-pointer ${he===g.id?"ring-2 ring-[#2563EB]":""}" onclick="selectApprovalFile('${g.id}')">
                    <div class="space-y-2">
                      <div class="flex justify-between items-center">
                        <span class="text-[9px] font-mono font-bold text-slate-400">File No: ${g.id}</span>
                        <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border ${x}">${g.priority}</span>
                      </div>
                      <h5 class="text-xs font-bold text-slate-900 truncate" title="${g.subject}">${g.subject}</h5>
                      <p class="text-[10px] text-slate-500 line-clamp-2 italic">"${((y=g.notes[g.notes.length-1])==null?void 0:y.text)||"No remarks."}"</p>
                    </div>
                    <div class="flex items-center gap-1.5 mt-4 pt-3 border-t border-slate-100">
                      <button onclick="event.stopPropagation(); viewApprovalFile('${g.id}')" class="bg-white hover:bg-slate-50 text-slate-700 text-[9px] font-bold uppercase px-2 py-1 rounded border border-slate-200 cursor-pointer">Note Sheet</button>
                      <button onclick="event.stopPropagation(); actionApprovalFile('${g.id}', 'Approve')" class="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold uppercase px-2 py-1 rounded cursor-pointer">Approve</button>
                      <button onclick="event.stopPropagation(); actionApprovalFile('${g.id}', 'Reject')" class="bg-rose-600 hover:bg-rose-700 text-white text-[9px] font-bold uppercase px-2 py-1 rounded cursor-pointer">Reject</button>
                      <button onclick="event.stopPropagation(); actionApprovalFile('${g.id}', 'Return')" class="bg-amber-600 hover:bg-amber-700 text-white text-[9px] font-bold uppercase px-2 py-1 rounded cursor-pointer">Return</button>
                    </div>
                  </div>
                `}).join("")}

              ${c.map(g=>{const x=g.status==="Pending Budget Allocation"?`<select onchange="allocateBudgetApproval('${g.id}', this.value)" class="text-[9px] font-bold border border-slate-200 bg-white p-1 rounded outline-none cursor-pointer">
                       <option value="">Map Head...</option>
                       ${v.headOfAccounts.map(y=>`<option value="${y.code}">${y.code}</option>`).join("")}
                     </select>`:`<button onclick="clearBillPaymentApproval('${g.id}')" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[9px] font-bold px-2.5 py-1 rounded transition-colors cursor-pointer uppercase tracking-wider">Pay / Clear</button>`;return`
                  <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between hover:border-slate-350 transition-all">
                    <div class="space-y-2">
                      <div class="flex justify-between items-center">
                        <span class="text-[9px] font-mono font-bold text-slate-400">Bill ID: ${g.id}</span>
                        <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-slate-100 text-slate-650 border border-slate-200">${g.status}</span>
                      </div>
                      <h5 class="text-xs font-bold text-slate-900">Claim for Work Order: ${g.woId}</h5>
                      <div class="text-[10px] text-slate-500 font-semibold space-y-0.5">
                        <div class="flex justify-between"><span>Vendor:</span> <span class="text-slate-800">${g.vendor}</span></div>
                        <div class="flex justify-between"><span>Claim Value:</span> <span class="text-slate-950 font-bold">Rs. ${(g.amount/1e5).toFixed(1)} L</span></div>
                        <div class="flex justify-between"><span>Head Code:</span> <span class="font-mono">${g.headOfAccount||'<span class="text-rose-500">Unmapped</span>'}</span></div>
                      </div>
                    </div>
                    <div class="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                      <span class="text-[9px] font-bold text-slate-400 uppercase">Settlement</span>
                      ${x}
                    </div>
                  </div>
                `}).join("")}
            </div>
          `}
        </div>

        <!-- All Project Files Directory -->
        <div class="bg-white border border-slate-200 rounded-md p-5 space-y-4">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">All Project Approval Files (${i.length})</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-100 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  <th class="py-2.5 px-3">File ID</th>
                  <th class="py-2.5 px-3">Subject / Document Type</th>
                  <th class="py-2.5 px-3">Current Custodian</th>
                  <th class="py-2.5 px-3">Status</th>
                  <th class="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-semibold text-slate-700">
                ${i.map(g=>{let x="bg-slate-150 text-slate-700";return g.status==="Approved / Closed"?x="bg-emerald-50 text-emerald-700":g.status==="Rejected"?x="bg-rose-50 text-rose-700":g.status==="Returned"?x="bg-amber-50 text-amber-700":g.status==="Approved & Forwarded"&&(x="bg-blue-50 text-blue-700"),`
                    <tr class="hover:bg-slate-50/50 cursor-pointer ${he===g.id?"bg-[#EEF4FF]/30":""}" onclick="selectApprovalFile('${g.id}')">
                      <td class="py-3 px-3 font-mono font-bold text-slate-900">${g.id}</td>
                      <td class="py-3 px-3 truncate max-w-xs font-medium text-slate-800" title="${g.subject}">${g.subject}</td>
                      <td class="py-3 px-3 text-slate-655">${g.currentCustodian}</td>
                      <td class="py-3 px-3">
                        <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${x}">${g.status}</span>
                      </td>
                      <td class="py-3 px-3 text-right">
                        <button onclick="event.stopPropagation(); viewApprovalFile('${g.id}')" class="text-[#2563EB] hover:text-[#1D4ED8] text-[10px] font-bold cursor-pointer">View Details</button>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Selected File Approval History (Col 1) -->
      <div class="space-y-6">
        <div class="bg-white border border-slate-200 rounded-md p-5 space-y-4">
          <div class="border-b border-slate-100 pb-3">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Approval History</h4>
            <p class="text-[9px] text-slate-400 mt-1 uppercase font-mono">${u?u.id:"No file selected"}</p>
          </div>

          ${u?`
            <div class="space-y-4">
              <!-- Header Details -->
              <div class="bg-slate-50 p-3 rounded text-[10px] font-semibold text-slate-600 space-y-1 border border-slate-100">
                <div class="flex justify-between"><span>Initiated By:</span> <span class="text-slate-900 font-bold">Sri V. Kumar</span></div>
                <div class="flex justify-between"><span>Current Custodian:</span> <span class="text-slate-900 font-bold">${u.currentCustodian}</span></div>
                <div class="flex justify-between"><span>Priority Status:</span> <span class="text-slate-900 font-bold">${u.priority}</span></div>
                <div class="flex justify-between"><span>Category Type:</span> <span class="text-slate-900 font-bold">eOffice Note Sheet</span></div>
              </div>

              <!-- Timeline stepper -->
              <div class="relative pl-5 space-y-4 pt-2">
                <!-- Vertical Line -->
                <div class="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-150"></div>

                ${u.notes.map((g,x)=>`
                  <div class="relative pl-3 text-xs space-y-1">
                    <span class="absolute -left-[15px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></span>
                    <div class="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">${g.date}</div>
                    <div class="font-bold text-slate-800">${g.writer}</div>
                    <p class="text-slate-500 font-medium italic">"${g.text}"</p>
                  </div>
                `).join("")}
                
                ${u.status!=="Approved / Closed"&&u.status!=="Rejected"?`
                  <div class="relative pl-3 text-xs space-y-1">
                    <span class="absolute -left-[15px] top-1.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse ring-4 ring-amber-50"></span>
                    <div class="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">Pending</div>
                    <div class="font-bold text-slate-800">Awaiting Signature</div>
                    <p class="text-slate-500 font-medium italic">Pending with ${u.currentCustodian}</p>
                  </div>
                `:""}
              </div>
            </div>
          `:`
            <div class="text-center text-xs text-slate-400 py-8">Select an approval file card to view its timeline history.</div>
          `}
        </div>
      </div>
    </div>

    <!-- Quick Action Modal -->
    <div id="approval-action-modal" class="hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-55 flex items-center justify-center p-4">
      <div class="bg-white border border-slate-200 rounded-md shadow-xl max-w-md w-full overflow-hidden animate-toast-slide-in">
        <div class="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider" id="action-modal-title">Sign Note Sheet</h4>
          <button onclick="closeActionModal()" class="text-slate-400 hover:text-slate-650 text-sm font-bold cursor-pointer">✕</button>
        </div>
        <div class="p-6 space-y-4">
          <div class="space-y-1">
            <label class="text-[9px] font-bold text-slate-500 uppercase tracking-wider block" id="action-remarks-label">Signature Remarks</label>
            <textarea id="action-remarks-textarea" class="w-full min-h-[90px] p-3 text-xs border border-slate-250 rounded font-mono text-slate-800 focus:outline-none focus:border-[#2563EB]" placeholder="Type official signature remarks here..."></textarea>
          </div>
          <div class="flex justify-end gap-2 pt-2">
            <button onclick="closeActionModal()" class="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-1.5 rounded border border-slate-200 cursor-pointer">Cancel</button>
            <button id="submit-action-btn" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold px-4 py-1.5 rounded cursor-pointer">Submit Signature</button>
          </div>
        </div>
      </div>
    </div>
  `,window.selectApprovalFile=g=>{he=g,Is(s,t)},window.viewApprovalFile=g=>{var y,k;const x=v.eOfficeFiles.find(b=>b.id===g);if(x){xa({id:x.id,name:x.id+"_Notes.pdf",uploadedBy:((y=x.notes[0])==null?void 0:y.writer)||"Draft",uploadedDate:((k=x.notes[0])==null?void 0:k.date)||x.lastUpdated,version:"v1.0",status:x.status,size:"1.2 MB",category:"Administrative Sanctions"});const b=document.getElementById("document-preview-modal");if(b){const w=b.querySelector(".flex-1");w&&(w.innerHTML=`
            <div class="flex-1 bg-emerald-50/15 p-6 overflow-y-auto border-r border-slate-200 font-mono text-[11px] text-emerald-950 leading-relaxed max-h-full">
              <div class="text-center border-b border-emerald-900/20 pb-4 mb-4">
                <div class="font-bold text-xs text-emerald-900">GREATER HYDERABAD MUNICIPAL CORPORATION</div>
                <div class="text-[9px] text-emerald-800/80 uppercase font-semibold">eOffice green Note Sheet Ledger</div>
                <div class="text-[9px] text-emerald-800/60 font-mono mt-1">File Ref: ${x.id} | Department: ${x.department}</div>
              </div>
              <div class="space-y-4">
                ${x.notes.map((S,A)=>`
                  <div class="pl-8 relative border-l border-emerald-900/10">
                    <span class="absolute left-0 top-0 text-[10px] font-bold text-emerald-900/30">#${A+1}</span>
                    <p class="font-mono text-emerald-900 leading-relaxed">${S.text}</p>
                    <div class="text-right mt-2 text-[9px] font-bold uppercase tracking-wider text-emerald-800/60 font-mono">
                      Signed: ${S.writer} | ${S.date}
                    </div>
                  </div>
                `).join('<div class="border-b border-dashed border-emerald-900/10 my-3"></div>')}
              </div>
            </div>
          `)}}};let p="",h="Approve";window.actionApprovalFile=(g,x)=>{p=g,h=x;const y=document.getElementById("approval-action-modal"),k=document.getElementById("action-modal-title"),b=document.getElementById("action-remarks-label"),w=document.getElementById("action-remarks-textarea"),S=document.getElementById("submit-action-btn");y&&k&&b&&w&&S&&(w.value="",x==="Approve"?(k.textContent="Sign & Approve File",b.textContent="Approval Remarks (Optional)",w.placeholder="e.g. Recommended for administrative sanction. Approved.",S.className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 rounded cursor-pointer"):x==="Reject"?(k.textContent="Reject File",b.textContent="Reason for Rejection (Required)",w.placeholder="Please state clearly the reason for rejecting this file...",S.className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-1.5 rounded cursor-pointer"):(k.textContent="Return File with Remarks",b.textContent="Remarks for Return (Required)",w.placeholder="Please explain what clarifications are needed...",S.className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-1.5 rounded cursor-pointer"),y.classList.remove("hidden"))},window.closeActionModal=()=>{const g=document.getElementById("approval-action-modal");g&&g.classList.add("hidden")},window.allocateBudgetApproval=(g,x)=>{x&&(window.allocateBudget(g,x),Is(s,t))},window.clearBillPaymentApproval=g=>{window.clearBillPayment(g),Is(s,t)};const m=document.getElementById("submit-action-btn");m==null||m.replaceWith(m.cloneNode(!0));const f=document.getElementById("submit-action-btn");f==null||f.addEventListener("click",()=>{const x=document.getElementById("action-remarks-textarea").value.trim();if((h==="Reject"||h==="Return")&&!x){$("Please enter remarks/reasons before submitting.");return}const y=v.eOfficeFiles.find(k=>k.id===p);if(y&&e){const k=new Date,b=k.toISOString().substring(0,10)+" "+k.toTimeString().substring(0,5),w=`${e.role} (${e.name})`;if(h==="Approve"){const S=at.indexOf(y.currentCustodian),A=S<at.length-1?at[S+1]:"Approved / Closed";y.notes.push({writer:w,text:x||"Approved & Forwarded.",date:b}),y.currentCustodian=A,A==="Approved / Closed"?(y.status="Approved / Closed",t.status==="Planning"&&(t.status="In Progress")):y.status="Approved & Forwarded",G(e.name,`Approved & Forwarded File ${y.id} to ${A}`,"Success"),$(`File successfully approved and forwarded to ${A}.`)}else if(h==="Reject")y.notes.push({writer:w,text:"REJECTED: "+x,date:b}),y.status="Rejected",y.currentCustodian="Approved / Closed",G(e.name,`Rejected File ${y.id}`,"Success"),$(`File ${y.id} has been marked as Rejected.`);else{const S=at.indexOf(y.currentCustodian),A=S>0?at[S-1]:"Senior Assistant";y.notes.push({writer:w,text:"RETURNED WITH REMARKS: "+x,date:b}),y.currentCustodian=A,y.status="Returned",G(e.name,`Returned File ${y.id} to ${A}`,"Success"),$(`File returned to ${A}.`)}y.lastUpdated=k.toISOString().substring(0,10),window.closeActionModal(),wt(),ct()}})}function G(s,t,e){const i=["10.2.40.12","10.2.80.3","10.2.5.91","10.2.14.8"],n=i[Math.floor(Math.random()*i.length)],o=new Date,a=o.toISOString().substring(0,10),r=o.toTimeString().substring(0,5);v.auditLogs.unshift({id:`AUD-${Math.floor(Math.random()*9e3)+1e3}`,user:s,action:t,date:a,time:r,ip:n,status:e})}function $(s){const t=document.getElementById("toast-container");if(!t)return;const e=document.createElement("div");e.className="bg-slate-900 border border-slate-850 text-white text-xs px-4 py-3 rounded-md shadow-lg animate-toast-slide-in flex items-center justify-between gap-4 max-w-sm",e.innerHTML=`
    <span>${s}</span>
    <button class="text-slate-400 hover:text-white font-bold cursor-pointer" onclick="this.parentElement.remove()">✕</button>
  `,t.appendChild(e),setTimeout(()=>{e.remove()},4500)}function Ui(){const s=document.getElementById("navbar-bell-badge");if(!s)return;const t=v.notifications.filter(e=>!e.read).length;t>0?(s.textContent=String(t),s.classList.remove("hidden")):s.classList.add("hidden")}function ts(){const s=document.getElementById("notification-drawer-body");if(!s)return;if(v.notifications.length===0){s.innerHTML='<div class="p-6 text-center text-xs text-slate-400">No notifications</div>';return}s.innerHTML=v.notifications.map((e,i)=>`
    <div class="py-3 flex flex-col gap-1 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors ${e.read?"opacity-60":""}" data-index="${i}">
      <div class="flex justify-between items-center text-[10px] font-bold text-slate-900">
        <span>${e.title}</span>
        <span class="text-slate-400 font-medium">${e.time}</span>
      </div>
      <div class="text-[11px] text-slate-500 leading-normal">${e.text}</div>
    </div>
  `).join(""),s.querySelectorAll("[data-index]").forEach(e=>{e.addEventListener("click",()=>{const i=parseInt(e.getAttribute("data-index")||"0",10);v.notifications[i].read=!0,Ui(),ts()})})}function Vu(){const s=document.getElementById("landing-dashboard-view");if(!s)return;const t=v.currentUser;if(!t)return;const e=v.projects.length,i=v.projects.filter(d=>d.status==="In Progress").length,n=v.eOfficeFiles.filter(d=>d.currentCustodian===t.role).length,o=v.projects.reduce((d,c)=>d+c.budget,0),a=v.projects.reduce((d,c)=>d+c.spent,0),r=(o/1e7).toFixed(2),l=(a/1e7).toFixed(2);s.innerHTML=`
    <div class="bg-white border border-slate-200 rounded-md p-6 mb-6">
      <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Welcome back, ${t.name}</h3>
      <p class="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">${t.roleText} — GHMC Unified Administration Portal</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white border border-slate-200 rounded-md p-6">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Monitored Projects</span>
        <span class="text-2xl font-bold text-slate-900">${e}</span>
        <span class="text-[9px] text-emerald-600 font-bold block mt-1">● ${i} In Progress</span>
      </div>

      <div class="bg-white border border-slate-200 rounded-md p-6">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">eOffice Files In Basket</span>
        <span class="text-2xl font-bold text-slate-900">${n}</span>
        <span class="text-[9px] text-amber-600 font-bold block mt-1">Requires immediate sign-off</span>
      </div>

      <div class="bg-white border border-slate-200 rounded-md p-6">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Budget Sanctions</span>
        <span class="text-2xl font-bold text-slate-900">Rs. ${r} Cr</span>
        <span class="text-[9px] text-slate-500 font-semibold block mt-1">Across all zones</span>
      </div>

      <div class="bg-white border border-slate-200 rounded-md p-6">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Disbursed Expenditures</span>
        <span class="text-2xl font-bold text-slate-900">Rs. ${l} Cr</span>
        <span class="text-[9px] text-slate-500 font-semibold block mt-1">Capped at ${(a/o*100).toFixed(0)}% utilization</span>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div class="bg-white border border-slate-200 rounded-md p-6 xl:col-span-2 space-y-4">
        <div class="flex justify-between items-center mb-2">
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Your Pending eOffice Inbox</h4>
          <a class="text-[10px] font-bold text-indigo-650 hover:underline cursor-pointer" onclick="switchToView('projects-list');">View Full eOffice Desk</a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[9px]">
                <th class="py-2 px-1">File Ref</th>
                <th class="py-2 px-1">Subject</th>
                <th class="py-2 px-1">Priority</th>
                <th class="py-2 px-1">Last Action Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${v.eOfficeFiles.filter(d=>d.currentCustodian===t.role).map(d=>{const c=d.priority==="High"?"bg-rose-50 text-rose-700":"bg-slate-100 text-slate-650";return`
                    <tr class="hover:bg-slate-50/50 cursor-pointer" onclick="openGlobalFile('${d.id}')">
                      <td class="py-3 px-1 font-mono font-bold text-slate-900">${d.id}</td>
                      <td class="py-3 px-1 font-medium truncate max-w-xs" title="${d.subject}">${d.subject}</td>
                      <td class="py-3 px-1">
                        <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${c}">${d.priority}</span>
                      </td>
                      <td class="py-3 px-1 font-mono text-[10px] text-slate-550">${d.lastUpdated}</td>
                    </tr>
                  `}).join("")}
              ${v.eOfficeFiles.filter(d=>d.currentCustodian===t.role).length===0?'<tr><td colspan="4" class="py-6 text-center text-slate-400 italic font-semibold">No files pending your attention.</td></tr>':""}
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-md p-6 flex flex-col justify-between">
        <div>
          <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Capital Outlay Chart</h4>
          <div class="w-full h-48 relative flex items-center justify-center">
            <canvas id="dashboard-budget-canvas"></canvas>
          </div>
        </div>
        <div class="text-[10px] text-slate-400 font-semibold mt-4 text-center">
          Chart shows distributed budget allocation vs spent across active projects.
        </div>
      </div>
    </div>
  `,setTimeout(()=>{const d=document.getElementById("dashboard-budget-canvas");d&&new gt(d,{type:"doughnut",data:{labels:v.projects.map(c=>c.id),datasets:[{data:v.projects.map(c=>c.budget),backgroundColor:["#0f172a","#3b82f6","#10b981","#f59e0b","#ef4444"],borderWidth:1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}}}})},100)}window.openGlobalFile=s=>{const t=v.eOfficeFiles.find(i=>i.id===s);if(!t)return;const e=v.projects.find(i=>i.id===t.projectId);e&&(ze(e),v.activeProjectModule="eoffice",wt(),ct())};function Hu(s){s.innerHTML=`
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white border border-slate-200 rounded-md p-6">
        <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Capital vs Utilization Allocation</h4>
        <div class="h-64 relative flex items-center justify-center">
          <canvas id="reports-budget-bar-canvas"></canvas>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-md p-6">
        <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">Project Construction Progress</h4>
        <div class="h-64 relative flex items-center justify-center">
          <canvas id="reports-progress-line-canvas"></canvas>
        </div>
      </div>
    </div>
  `,setTimeout(()=>{const t=document.getElementById("reports-budget-bar-canvas"),e=document.getElementById("reports-progress-line-canvas");t&&new gt(t,{type:"bar",data:{labels:v.projects.map(i=>i.id),datasets:[{label:"Budget Sanction (Rs. Cr)",data:v.projects.map(i=>i.budget/1e7),backgroundColor:"#0f172a"},{label:"Expenditure Disbursed (Rs. Cr)",data:v.projects.map(i=>i.spent/1e7),backgroundColor:"#3b82f6"}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{boxWidth:12,font:{size:10,family:"Inter"}}}},scales:{y:{ticks:{font:{size:9,family:"Inter"}}},x:{ticks:{font:{size:9,family:"Inter"}}}}}}),e&&new gt(e,{type:"line",data:{labels:v.projects.map(i=>i.id),datasets:[{label:"Completion Progress %",data:v.projects.map(i=>i.progress),borderColor:"#10b981",backgroundColor:"#10b98122",fill:!0,tension:.3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{boxWidth:12,font:{size:10,family:"Inter"}}}},scales:{y:{min:0,max:100,ticks:{font:{size:9,family:"Inter"}}},x:{ticks:{font:{size:9,family:"Inter"}}}}}})},100)}let Ee="",Yt="All",fe="All";function Ts(){const s=document.getElementById("tasks-view-container"),t=v.currentUser;if(!s||!t)return;const e=v.eOfficeFiles.filter(d=>d.currentCustodian===t.role&&d.status!=="Approved / Closed"&&d.status!=="Rejected"),i=t.role==="Finance Officer"||t.role==="Commissioner"||t.role==="Administrator"?v.bills.filter(d=>d.status==="Pending Budget Allocation"||d.status==="Pending Approval"):[],n=[];e.forEach(d=>{var u;const c=v.projects.find(p=>p.id===d.projectId);n.push({id:d.id,type:"eOffice File",title:d.subject,project:c?c.name:"Unknown Project",projectId:d.projectId,priority:d.priority,date:d.lastUpdated,remarks:((u=d.notes[d.notes.length-1])==null?void 0:u.text)||"No remarks",rawObj:d})}),i.forEach(d=>{const c=v.projects.find(u=>u.id===d.projectId);n.push({id:d.id,type:"ERP Bill",title:`Invoice Claim from ${d.vendor} (Rs. ${(d.amount/1e5).toFixed(1)} Lakhs)`,project:c?c.name:"Unknown Project",projectId:d.projectId,priority:d.amount>=2e6?"High":"Normal",date:d.date,remarks:`Status: ${d.status}`,rawObj:d})});const o=n.filter(d=>{const c=d.title.toLowerCase().includes(Ee)||d.id.toLowerCase().includes(Ee)||d.project.toLowerCase().includes(Ee),u=Yt==="All"||Yt==="eOffice"&&d.type==="eOffice File"||Yt==="ERP"&&d.type==="ERP Bill",p=fe==="All"||d.priority===fe;return c&&u&&p});s.innerHTML=`
    <div class="bg-white border border-slate-200 rounded-md p-6 space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Inbox - Tasks Assigned to Me</h3>
          <p class="text-[9px] text-slate-450 mt-1 uppercase font-mono">Process and clear eOffice records and ERP work receipts</p>
        </div>

        <div class="flex flex-wrap gap-2">
          <div class="border border-slate-200 rounded-md flex items-center bg-slate-50 px-2.5 py-1">
            <input type="text" id="global-tasks-search" class="text-xs text-slate-800 bg-transparent outline-none w-48 font-medium" placeholder="Search ID, Subject, Project..." value="${Ee}">
          </div>

          <select id="global-tasks-category" class="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-700 font-semibold cursor-pointer">
            <option value="All" ${Yt==="All"?"selected":""}>All Categories</option>
            <option value="eOffice" ${Yt==="eOffice"?"selected":""}>eOffice Files</option>
            <option value="ERP" ${Yt==="ERP"?"selected":""}>ERP Bills/Claims</option>
          </select>

          <select id="global-tasks-priority" class="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-700 font-semibold cursor-pointer">
            <option value="All" ${fe==="All"?"selected":""}>All Priorities</option>
            <option value="High" ${fe==="High"?"selected":""}>High Priority</option>
            <option value="Normal" ${fe==="Normal"?"selected":""}>Normal Priority</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto font-semibold">
        <table class="w-full text-xs text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              <th class="py-2.5 px-3">Type</th>
              <th class="py-2.5 px-3">Ref ID</th>
              <th class="py-2.5 px-3">Subject / Details</th>
              <th class="py-2.5 px-3">Project Link</th>
              <th class="py-2.5 px-3">Priority</th>
              <th class="py-2.5 px-3">Date Pending</th>
              <th class="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            ${o.map(d=>{const c=d.priority==="High"?"bg-rose-50 text-rose-700 border-rose-100":"bg-slate-105 text-slate-600 border-slate-200";return`
                <tr class="hover:bg-slate-50/50">
                  <td class="py-3 px-3">
                    <span class="px-1.5 py-0.5 rounded text-[8px] font-bold border uppercase tracking-wider ${d.type==="eOffice File"?"bg-emerald-50 text-emerald-700 border-emerald-100":"bg-blue-50 text-blue-700 border-blue-100"}">
                      ${d.type}
                    </span>
                  </td>
                  <td class="py-3 px-3 font-mono font-bold text-slate-800">${d.id}</td>
                  <td class="py-3 px-3 max-w-xs">
                    <div class="truncate text-slate-900 font-bold">${d.title}</div>
                    <div class="text-[10px] text-slate-400 font-semibold truncate mt-0.5">${d.remarks}</div>
                  </td>
                  <td class="py-3 px-3 text-slate-600">${d.project}</td>
                  <td class="py-3 px-3">
                    <span class="px-1.5 py-0.5 rounded text-[8px] font-bold border uppercase ${c}">
                      ${d.priority}
                    </span>
                  </td>
                  <td class="py-3 px-3 font-mono text-slate-450">${d.date}</td>
                  <td class="py-3 px-3 text-right font-bold">
                    <button onclick="window.goToProjectTab('${d.projectId}', 'approvals')" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded cursor-pointer transition-all">
                      Open Action
                    </button>
                  </td>
                </tr>
              `}).join("")}
            ${o.length===0?'<tr><td colspan="7" class="py-8 text-center text-slate-400 italic">No tasks currently pending in your inbox.</td></tr>':""}
          </tbody>
        </table>
      </div>
    </div>
  `;const a=document.getElementById("global-tasks-search");a==null||a.addEventListener("input",()=>{Ee=a.value.trim().toLowerCase(),Ts()});const r=document.getElementById("global-tasks-category");r==null||r.addEventListener("change",()=>{Yt=r.value,Ts()});const l=document.getElementById("global-tasks-priority");l==null||l.addEventListener("change",()=>{fe=l.value,Ts()})}let ge="",Jt=!1,Xt="latest",xs="",vs="",Zt=!1;function zu(s){var e,i;s.noteNumber||(s.noteNumber=`NOTE-2026-${s.id.split("-").pop()}`);const t=v.projects.find(n=>n.id===s.projectId);if(s.projectName||(s.projectName=t?t.name:"Zone-3 Infrastructure Works"),s.zone||(s.zone=t?t.zone:"Zone-3 (Secunderabad)"),s.creatorRole||(s.creatorRole="Senior Assistant"),s.creatorName||(s.creatorName="Sri V. Kumar"),s.createdDate||(s.createdDate="2026-06-25"),s.createdTime||(s.createdTime="10:30"),s.estimatedBudget||(s.estimatedBudget=t?t.budget:12e6),s.budgetHead||(s.budgetHead="4120-ENG-CAP-Z3"),s.description||(s.description=((e=s.notes[0])==null?void 0:e.text)||s.subject),s.purpose||(s.purpose="Administrative approval and financial sanction for public infrastructure enhancements."),s.background||(s.background="This proposal has been initiated to address urgent utility and roadway demands based on local ward representations."),s.justification||(s.justification="Required to prevent seasonal overflow, traffic blockages, and ensure regulatory alignment."),s.benefits||(s.benefits="Will benefit over 2.5 Lakh daily commuters and local residents."),s.additionalConditions||(s.additionalConditions="Standard quality standards must be followed during execution."),(!s.versions||s.versions.length===0)&&(s.versions=[{version:"v1.0",modifiedBy:s.creatorName,modifiedRole:s.creatorRole,modifiedDate:s.createdDate,modifiedTime:s.createdTime,subject:s.subject,projectName:s.projectName,description:s.description,purpose:s.purpose,background:s.background,estimatedBudget:s.estimatedBudget,budgetHead:s.budgetHead,justification:s.justification,benefits:s.benefits,priority:s.priority,remarks:((i=s.notes[0])==null?void 0:i.text)||"",additionalConditions:s.additionalConditions}]),!s.workflowStatus){const n={"Senior Assistant":"Approved","Assistant Engineer":"Waiting","Deputy Executive Engineer":"Waiting","Executive Engineer":"Waiting","Superintending Engineer":"Waiting","Joint Commissioner":"Waiting","Additional Commissioner":"Waiting",Commissioner:"Waiting"};if(s.status==="Approved / Closed")Object.keys(n).forEach(o=>{n[o]="Approved"});else if(s.status==="Rejected")Object.keys(n).forEach(o=>{n[o]="Rejected"});else{const o=at.indexOf(s.currentCustodian);if(o!==-1){for(let a=0;a<o;a++)n[at[a]]="Approved";n[s.currentCustodian]=s.status==="Returned"?"Returned":"Pending"}}s.workflowStatus=n}(!s.approvalHistory||s.approvalHistory.length===0)&&(s.approvalHistory=s.notes.map((n,o)=>{let a="Officer",r=n.writer;if(n.writer.includes("(")){const l=n.writer.split(" (");a=l[0],r=l[1].replace(")","")}else(n.writer.includes(" JC")||n.writer.includes("COMMISSIONER")||n.writer.includes("ADDL. COMMR"))&&(n.writer.includes("COMMISSIONER")?(a="Commissioner",r="Sri R V Karnan, IAS"):n.writer.includes("ADDL. COMMR")?(a="Additional Commissioner",r="Sri Manda Makarandu, IAS"):(a="Joint Commissioner",r="C Radha"));return{officerName:r,role:a,department:s.department,action:o===0?"Created Initial Note":"Approved & Forwarded",remarks:n.text,dateTime:n.date,status:"Approved",versionNumber:"v1.0"}})),(!s.auditLogs||s.auditLogs.length===0)&&(s.auditLogs=s.approvalHistory.map((n,o)=>({user:n.officerName,role:n.role,date:n.dateTime.split(" ")[0],time:n.dateTime.split(" ")[1]||"12:00",ip:`10.2.14.${50+o}`,action:n.action,previousValue:o===0?"N/A":"Pending Review",newValue:"Approved"})))}function ys(s){const t=v.eOfficeNotes.find(e=>e.fileNumber===s.id||e.id===s.id||e.id.replace("NOTE","FILE")===s.id||s.id.replace("FILE","NOTE")===e.id);t&&(t.status=s.status,t.currentCustodian=s.currentCustodian,t.subject=s.subject,t.projectName=s.projectName||t.projectName,t.description=s.description||t.description,t.purpose=s.purpose||t.purpose,t.background=s.background||t.background,t.estimatedBudget=s.estimatedBudget||t.estimatedBudget,t.budgetHead=s.budgetHead||t.budgetHead,t.justification=s.justification||t.justification,t.benefits=s.benefits||t.benefits,t.additionalConditions=s.additionalConditions||t.additionalConditions,t.versions=s.versions||t.versions,t.approvalHistory=s.approvalHistory||t.approvalHistory,t.auditLogs=s.auditLogs||t.auditLogs,t.workflowStatus=s.workflowStatus||t.workflowStatus,t.attachments=s.attachments||t.attachments)}function Wu(s,t){const e=parseFloat(s.replace("v",""));return t==="Joint Commissioner"||t==="Additional Commissioner"?`v${Math.floor(e+1)}.0`:`v${(e+.1).toFixed(1)}`}function Gu(s){const t=at.indexOf(s);return t===-1?"Approved / Closed":t<at.length-1?at[t+1]:"Approved / Closed"}function Uu(s){const t=at.indexOf(s);return t<=0?"Senior Assistant":at[t-1]}function lt(){var p,h,m,f,g,x,y,k;const s=document.getElementById("my-approvals-container"),t=v.currentUser;if(!s||!t)return;const e=v.eOfficeFiles;e.forEach(b=>{zu(b),ys(b)});const i=e.length,n=e.filter(b=>b.status==="Approved / Closed").length,o=e.filter(b=>b.status==="Rejected").length,a=e.filter(b=>b.status==="Returned").length,r=e.filter(b=>b.status!=="Approved / Closed"&&b.status!=="Rejected"&&b.status!=="Returned").length,l=e.filter(b=>b.currentCustodian===t.role&&b.status!=="Approved / Closed"&&b.status!=="Rejected"),d=t.role==="Finance Officer"||t.role==="Commissioner"||t.role==="Administrator"?v.bills.filter(b=>b.status==="Pending Budget Allocation"||b.status==="Pending Approval"):[];!ge&&e.length>0&&(ge=e[0].id);const c=e.find(b=>b.id===ge);let u="";if(c){let b=(p=c.versions)==null?void 0:p[c.versions.length-1];Xt!=="latest"&&(b=((h=c.versions)==null?void 0:h.find(_=>_.version===Xt))||b);const w=((m=c.versions)==null?void 0:m.map(_=>`<option value="${_.version}" ${Xt===_.version?"selected":""}>Version ${_.version.replace("v","")} - ${_.modifiedRole}</option>`).join(""))||"",S=`
      <div class="border border-slate-200 rounded p-4 bg-slate-50/50 space-y-3 font-semibold text-[11px] select-none">
        <div class="text-[9px] font-bold uppercase text-slate-450 tracking-wider">Approval Stage Tracker</div>
        <div class="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          ${at.map(_=>{var N;const M=((N=c.workflowStatus)==null?void 0:N[_])||"Waiting";let P="bg-slate-100 text-slate-400 border-slate-205",D="Waiting";return M==="Approved"?(P="bg-emerald-50 text-emerald-700 border-emerald-200",D="Approved"):M==="Rejected"?(P="bg-rose-50 text-rose-700 border-rose-200",D="Rejected"):M==="Returned"?(P="bg-blue-50 text-blue-700 border-blue-200",D="Returned"):M==="Pending"&&(P="bg-amber-50 text-amber-700 border-amber-200 animate-pulse",D="Pending"),`
              <div class="flex flex-col items-center justify-center p-2 rounded bg-white border border-slate-200 text-center space-y-1">
                <span class="font-bold text-[9px] text-slate-700 truncate w-full" title="${_}">${_.replace(" Engineer","").replace(" Assistant","")}</span>
                <span class="px-1 py-0.5 rounded text-[7px] font-extrabold uppercase border ${P}">${D}</span>
              </div>
            `}).join("")}
        </div>
      </div>
    `,A=((f=c.approvalHistory)==null?void 0:f.map((_,M)=>`
      <div class="border-l-2 border-emerald-900/15 pl-4 py-1 relative">
        <span class="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-white"></span>
        <div class="flex justify-between text-[9px] font-mono text-emerald-800/60 uppercase font-bold">
          <span>${_.officerName} (${_.role})</span>
          <span class="text-slate-400 font-semibold">${_.dateTime}</span>
        </div>
        <p class="text-xs text-slate-800 italic mt-1 leading-normal font-sans font-semibold">"${_.remarks||"No remarks."}"</p>
        <div class="mt-1 flex justify-between items-center text-[9px] text-emerald-800/50 font-mono font-bold">
          <span>Action: ${_.action}</span>
          <span class="bg-emerald-50 px-1 rounded border border-emerald-100">Ver: ${_.versionNumber}</span>
        </div>
      </div>
    `).join('<div class="border-b border-dashed border-emerald-900/5 my-2"></div>'))||"";let C="";if(Zt){const _=(g=c.versions)==null?void 0:g.find(P=>P.version===xs),M=(x=c.versions)==null?void 0:x.find(P=>P.version===vs);_&&M&&(C=`
          <div class="grid grid-cols-2 gap-4 border border-dashed border-slate-300 p-3 bg-slate-50/50 rounded mt-2">
            <div class="space-y-2 border-r border-slate-200 pr-2">
              <div class="text-[10px] font-bold text-slate-450 uppercase font-mono">Version ${_.version.replace("v","")} (${_.modifiedRole})</div>
              <div class="text-[10px] text-slate-800"><strong>Subject:</strong> ${_.subject}</div>
              <div class="text-[10px] text-slate-800 font-mono"><strong>Budget:</strong> Rs. ${(_.estimatedBudget/1e5).toFixed(1)}L</div>
              <div class="text-[10px] text-slate-650 italic line-clamp-4"><strong>Description:</strong> ${_.description}</div>
            </div>
            <div class="space-y-2">
              <div class="text-[10px] font-bold text-slate-450 uppercase font-mono">Version ${M.version.replace("v","")} (${M.modifiedRole})</div>
              <div class="text-[10px] text-slate-800"><strong>Subject:</strong> ${_.subject!==M.subject?`<span class="bg-emerald-100 text-emerald-900">${M.subject}</span>`:M.subject}</div>
              <div class="text-[10px] text-slate-800 font-mono"><strong>Budget:</strong> ${_.estimatedBudget!==M.estimatedBudget?`<span class="bg-emerald-100 text-emerald-900 font-bold">Rs. ${(M.estimatedBudget/1e5).toFixed(1)}L</span>`:`Rs. ${(M.estimatedBudget/1e5).toFixed(1)}L`}</div>
              <div class="text-[10px] text-slate-650 italic line-clamp-4"><strong>Description:</strong> ${_.description!==M.description?`<span class="bg-emerald-100 text-emerald-900">${M.description}</span>`:M.description}</div>
            </div>
          </div>
        `)}u=`
      <div class="xl:col-span-1 bg-white border border-slate-200 rounded-md p-6 space-y-6 overflow-y-auto max-h-[85vh] shadow-xs">
        
        <!-- Header Details -->
        <div class="border-b border-slate-150 pb-4 space-y-3">
          <div class="flex justify-between items-start gap-2">
            <div>
              <span class="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">eOffice File Reference</span>
              <h4 class="text-xs font-bold text-slate-900 font-mono">${c.id}</h4>
            </div>
            <span class="px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border ${c.priority==="High"?"bg-rose-50 text-rose-700 border-rose-200":"bg-slate-100 text-slate-650 border-slate-200"}">${c.priority}</span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[10px] text-slate-700">
            <div><strong class="text-slate-450 uppercase text-[8px]">Note Number:</strong> <span class="font-mono text-slate-900 font-bold">${c.noteNumber}</span></div>
            <div><strong class="text-slate-450 uppercase text-[8px]">Status:</strong> <span class="px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase ${c.status==="Approved / Closed"?"bg-emerald-50 text-emerald-700 border border-emerald-100":c.status==="Rejected"?"bg-rose-50 text-rose-700 border border-rose-100":c.status==="Returned"?"bg-blue-50 text-blue-700 border border-blue-100":"bg-amber-50 text-amber-700 border border-amber-100"}">${c.status}</span></div>
            <div><strong class="text-slate-450 uppercase text-[8px]">Created By:</strong> <span class="font-semibold text-slate-800">${c.creatorName}</span></div>
            <div><strong class="text-slate-450 uppercase text-[8px]">Created On:</strong> <span class="font-mono text-slate-800">${c.createdDate}</span></div>
            <div><strong class="text-slate-450 uppercase text-[8px]">Department:</strong> <span class="font-semibold text-slate-800 truncate block">${c.department}</span></div>
            <div><strong class="text-slate-450 uppercase text-[8px]">Custodian:</strong> <span class="font-semibold text-slate-800 truncate block">${c.currentCustodian}</span></div>
          </div>
        </div>

        <!-- Stage Stepper Timeline -->
        ${S}

        <!-- Version Selection -->
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
          <div class="flex items-center gap-2 font-semibold">
            <span class="text-[9px] font-bold text-slate-450 uppercase tracking-wider">Note Sheet Version:</span>
            <select onchange="changeApprovalVersion(this.value)" class="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-700 font-bold cursor-pointer outline-none">
              <option value="latest" ${Xt==="latest"?"selected":""}>Latest Version</option>
              ${w}
            </select>
          </div>
          
          ${c.versions&&c.versions.length>1?`
            <button onclick="toggleCompareApprovalVersions()" class="text-[#2563EB] hover:text-[#1D4ED8] text-[9px] font-extrabold uppercase tracking-wider cursor-pointer">
              ${Zt?"Close Compare":"Compare Versions"}
            </button>
          `:""}
        </div>

        ${Zt?`
          <div class="flex gap-2 items-center bg-slate-50 border border-slate-200 p-2 rounded">
            <span class="text-[9px] font-bold text-slate-450 uppercase font-mono">Compare</span>
            <select onchange="changeCompareVer1(this.value)" class="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-700 outline-none cursor-pointer">
              ${(y=c.versions)==null?void 0:y.map(_=>`<option value="${_.version}" ${xs===_.version?"selected":""}>Version ${_.version.replace("v","")}</option>`).join("")}
            </select>
            <span class="text-[9px] font-bold text-slate-450 uppercase font-mono">with</span>
            <select onchange="changeCompareVer2(this.value)" class="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-700 outline-none cursor-pointer">
              ${(k=c.versions)==null?void 0:k.map(_=>`<option value="${_.version}" ${vs===_.version?"selected":""}>Version ${_.version.replace("v","")}</option>`).join("")}
            </select>
          </div>
          ${C}
        `:""}

        <!-- Main Workspace Body (View or Edit) -->
        ${Jt?`
          <!-- Editable Note Editor -->
          <div class="bg-slate-50 border border-slate-200 rounded p-6 space-y-4 font-semibold text-xs text-slate-800">
            <div class="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-250 pb-2">Edit Note Sheet (New Version Draft)</div>
            
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-450 uppercase">Subject</label>
              <input type="text" id="edit-approval-subject" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none" value="${c.subject}">
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-450 uppercase">Project Name</label>
              <input type="text" id="edit-approval-projname" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none" value="${c.projectName}">
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="block text-[10px] text-slate-450 uppercase">Estimated Budget (Rs.)</label>
                <input type="number" id="edit-approval-budget" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none" value="${c.estimatedBudget}">
              </div>
              <div class="space-y-1">
                <label class="block text-[10px] text-slate-450 uppercase">Budget Head</label>
                <select id="edit-approval-budgethead" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none cursor-pointer">
                  ${v.headOfAccounts.map(_=>`<option value="${_.code}" ${c.budgetHead===_.code?"selected":""}>${_.code} (Rs. ${(_.balance/1e5).toFixed(1)}L bal)</option>`).join("")}
                </select>
              </div>
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-450 uppercase">1. Description & Context</label>
              <textarea id="edit-approval-description" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none h-24 whitespace-pre-wrap">${c.description}</textarea>
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-450 uppercase">2. Purpose & Need</label>
              <textarea id="edit-approval-purpose" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none h-16 whitespace-pre-wrap">${c.purpose}</textarea>
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-450 uppercase">3. Background context</label>
              <textarea id="edit-approval-background" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none h-16 whitespace-pre-wrap">${c.background}</textarea>
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-450 uppercase">4. Justification & Benefits</label>
              <textarea id="edit-approval-justification" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none h-16 whitespace-pre-wrap">${c.justification}</textarea>
            </div>

            <div class="space-y-1">
              <label class="block text-[10px] text-slate-450 uppercase">5. Special Conditions/Remarks</label>
              <textarea id="edit-approval-conditions" class="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-xs outline-none h-16 whitespace-pre-wrap">${c.additionalConditions||""}</textarea>
            </div>

            <div class="space-y-2 border-t border-slate-200 pt-3">
              <label class="block text-[10px] text-slate-450 uppercase">Attached Supporting Documents</label>
              <div class="space-y-1.5">
                ${c.attachments.map(_=>`
                  <div class="flex justify-between items-center bg-white border border-slate-200 px-2 py-1 rounded font-bold">
                    <span class="font-mono text-[10px]">${_}</span>
                    <button onclick="removeApprovalAttachment('${_}')" class="text-rose-650 hover:text-rose-800 text-[10px] font-bold cursor-pointer">Delete</button>
                  </div>
                `).join("")}
              </div>
              <div class="flex gap-2 mt-2">
                <input type="text" id="add-approval-attachment-name" class="flex-1 bg-white border border-slate-200 rounded px-2 py-1 text-xs outline-none" placeholder="Enter file name (e.g. Design_Draft_V2.pdf)">
                <button onclick="addApprovalAttachment()" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-3 py-1 rounded text-[10px] font-bold cursor-pointer">Attach</button>
              </div>
            </div>

            <div class="flex justify-end gap-2 border-t border-slate-200 pt-4 font-bold">
              <button onclick="cancelApprovalEditNote()" class="px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-50 text-[10px] uppercase font-bold rounded cursor-pointer">Cancel</button>
              <button onclick="saveApprovalEditNote()" class="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] uppercase font-bold rounded cursor-pointer">Save Draft</button>
            </div>
          </div>
        `:`
          <!-- Green ledger note sheet -->
          ${b?`
            <div class="green-note-sheet p-6 rounded-md border border-emerald-200 bg-[#F4FAF4]/45 font-serif leading-relaxed text-emerald-950 text-xs">
              <div class="text-center border-b border-emerald-900/20 pb-4 mb-4 font-sans">
                <div class="font-bold text-sm text-emerald-900 tracking-wider">GREATER HYDERABAD MUNICIPAL CORPORATION</div>
                <div class="text-[10px] text-emerald-800/80 uppercase font-bold tracking-wider">eOffice Green Note Sheet Ledger</div>
                <div class="text-[9px] text-emerald-855 font-mono mt-1">File Ref: ${c.id} | Note ID: ${c.noteNumber}</div>
              </div>

              <div class="space-y-4">
                <div><strong>Subject Matter:</strong> ${b.subject}</div>
                <div><strong>Project Name:</strong> ${b.projectName}</div>
                <div class="grid grid-cols-2 gap-4">
                  <div><strong>Estimated Budget:</strong> Rs. ${(b.estimatedBudget/1e5).toFixed(1)} Lakhs</div>
                  <div><strong>Budget Head:</strong> ${b.budgetHead}</div>
                </div>
                <div class="border-t border-emerald-900/10 pt-2">
                  <strong>1. Description & Context:</strong>
                  <p class="indent-4 leading-normal mt-1 whitespace-pre-wrap">${b.description}</p>
                </div>
                <div class="border-t border-emerald-900/10 pt-2">
                  <strong>2. Purpose & Need:</strong>
                  <p class="indent-4 leading-normal mt-1 whitespace-pre-wrap">${b.purpose}</p>
                </div>
                <div class="border-t border-emerald-900/10 pt-2">
                  <strong>3. Background context:</strong>
                  <p class="indent-4 leading-normal mt-1 whitespace-pre-wrap">${b.background}</p>
                </div>
                <div class="border-t border-emerald-900/10 pt-2">
                  <strong>4. Justification & Benefits:</strong>
                  <p class="indent-4 leading-normal mt-1 whitespace-pre-wrap">${b.justification}</p>
                </div>
                ${b.additionalConditions?`
                <div class="border-t border-emerald-900/10 pt-2">
                  <strong>5. Special Conditions/Remarks:</strong>
                  <p class="indent-4 leading-normal mt-1 whitespace-pre-wrap">${b.additionalConditions}</p>
                </div>
                `:""}
              </div>

              <!-- Signed Remarks Timeline -->
              <div class="border-t border-emerald-900/25 mt-6 pt-4 font-sans space-y-4">
                <div class="text-[10px] font-bold text-emerald-900 uppercase tracking-wider mb-2">Chronological Official Remarks & Signature Stamps</div>
                ${A}
              </div>
            </div>
          `:""}
        `}

        <!-- Attached Documents -->
        ${Jt?"":`
          <div class="border border-slate-200 rounded p-4 bg-white space-y-3 font-semibold text-xs">
            <div class="text-[9px] font-bold uppercase text-slate-450 tracking-wider">Attached Correspondence & Reference Files</div>
            <div class="space-y-2 font-bold">
              ${c.attachments.map(_=>`
                <div class="flex justify-between items-center border border-slate-150 p-2 rounded hover:bg-slate-50/55 cursor-pointer" onclick="viewAttachedDocument('${_}')">
                  <div class="flex items-center gap-2">
                    <span class="text-rose-650 text-[10px] font-extrabold font-mono">PDF</span>
                    <span class="text-slate-800 truncate max-w-[150px] font-sans text-[11px] font-semibold">${_}</span>
                  </div>
                  <span class="text-[9px] text-[#2563EB] uppercase hover:underline">View</span>
                </div>
              `).join("")}
              ${c.attachments.length===0?'<div class="text-[11px] text-slate-400 italic font-semibold">No attachments uploaded.</div>':""}
            </div>
          </div>
        `}

        <!-- Actions Panel -->
        ${c.currentCustodian===t.role&&c.status!=="Approved / Closed"&&c.status!=="Rejected"?`
          <div class="border border-slate-200 rounded p-6 bg-slate-50/50 space-y-4 font-semibold text-xs">
            <div class="text-[10px] font-bold text-slate-450 uppercase tracking-wider font-semibold">Mandatory Action Remarks</div>
            
            <div class="space-y-1">
              <label class="block text-[10px] text-slate-450 uppercase">Official Remarks <span class="text-rose-600">*</span></label>
              <textarea id="workspace-remarks-textarea" class="w-full bg-white border border-slate-200 rounded p-2 text-xs outline-none h-20" placeholder="Please enter your official decision remarks here..."></textarea>
            </div>

            <div class="flex flex-wrap gap-2 border-t border-slate-200 pt-4 font-bold">
              ${t.role!=="Commissioner"&&t.role!=="Vendor"&&!Jt?`
                <button onclick="editApprovalNoteSheet()" class="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all border border-teal-200">Edit Note</button>
              `:""}

              <button onclick="actionApprovalWorkspace('Keep Pending')" class="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all border border-amber-200 font-bold">Keep Pending</button>

              ${t.role!=="Senior Assistant"&&t.role!=="Vendor"?`
                <button onclick="actionApprovalWorkspace('Return')" class="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all border border-blue-200 font-bold">Return for Correction</button>
              `:""}

              ${["Assistant Engineer","Executive Engineer","Additional Commissioner","Commissioner"].includes(t.role)?`
                <button onclick="actionApprovalWorkspace('Reject')" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all border border-rose-200 font-bold">Reject</button>
              `:""}

              <button onclick="actionApprovalWorkspace('Forward')" class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all border border-indigo-200 font-bold">Forward to Next</button>

              ${t.role==="Commissioner"?`
                <button onclick="actionApprovalWorkspace('Approve')" class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all shadow-sm font-bold">Grant Sanction</button>
              `:`
                <button onclick="actionApprovalWorkspace('Approve')" class="px-3 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] uppercase tracking-wider rounded cursor-pointer transition-all shadow-sm font-bold">Approve & Forward</button>
              `}
            </div>
          </div>
        `:`
          <div class="border border-slate-100 rounded p-4 bg-slate-50/50 text-center text-[10px] text-slate-400 uppercase font-mono font-bold">
            ✔ Currently Awaiting clearance at ${c.currentCustodian}'s desk
          </div>
        `}

      </div>
    `}else u=`
      <div class="xl:col-span-1 bg-white border border-slate-200 rounded-md p-12 text-center text-xs text-slate-400 italic font-semibold">
        Select an active eOffice file to inspect its Approval Workspace.
      </div>
    `;s.innerHTML=`
    <!-- Top Statistics Grid -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total eOffice Files</span>
        <span class="text-lg font-extrabold text-slate-900 mt-2 font-mono">${i}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Approved / Closed</span>
        <span class="text-lg font-extrabold text-emerald-600 mt-2 font-mono">${n}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Rejected Files</span>
        <span class="text-lg font-extrabold text-rose-600 mt-2 font-mono">${o}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Returned Files</span>
        <span class="text-lg font-extrabold text-amber-600 mt-2 font-mono">${a}</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Pending Actions</span>
        <span class="text-lg font-extrabold text-[#2563EB] mt-2 font-mono">${r}</span>
      </div>
    </div>

    <!-- Main Workspace Split Pane -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start font-semibold">
      
      <!-- Left 2 Cols: Actionable Items list & Selection -->
      <div class="xl:col-span-2 space-y-6">
        
        <!-- Files awaiting role signature -->
        <div class="bg-white border border-slate-200 rounded-md p-6 space-y-4">
          <div class="border-b border-slate-100 pb-3">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider font-bold">Awaiting My Signature (${l.length})</h4>
            <p class="text-[9px] text-slate-400 mt-1 uppercase font-mono font-semibold">eOffice official note sheets currently assigned to your desk</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${l.map(b=>{var A;const w=b.priority==="High"?"bg-rose-50 text-rose-700 border-rose-100":"bg-slate-100 text-slate-650 border-slate-200",S=v.projects.find(C=>C.id===b.projectId);return`
                <div class="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between hover:border-slate-350 transition-all cursor-pointer ${ge===b.id?"ring-2 ring-[#2563EB]":""}" onclick="selectGlobalApprovalFile('${b.id}')">
                  <div class="space-y-1">
                    <div class="flex justify-between items-start gap-2">
                      <span class="font-mono text-[10px] font-bold text-slate-900">${b.id}</span>
                      <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border ${w}">${b.priority}</span>
                    </div>
                    <h5 class="text-xs font-bold text-slate-800 truncate">${b.subject}</h5>
                    <p class="text-[10px] text-slate-450 font-semibold truncate">${S?S.name:"Unknown Project"}</p>
                    <p class="text-[9px] text-slate-400 font-mono mt-2 font-medium">Forwarded: ${((A=b.notes[b.notes.length-1])==null?void 0:A.date)||b.lastUpdated}</p>
                  </div>

                  <div class="flex justify-end gap-1.5 mt-4 border-t border-slate-50 pt-3 font-bold">
                    <button onclick="event.stopPropagation(); selectGlobalApprovalFile('${b.id}')" class="px-2.5 py-1 bg-[#2563EB] text-white hover:bg-[#1D4ED8] text-[9px] font-bold uppercase tracking-wider rounded cursor-pointer transition-all font-bold">Open Workspace</button>
                  </div>
                </div>
              `}).join("")}
            ${l.length===0?`
              <div class="col-span-2 py-8 text-center text-xs text-slate-400 italic font-semibold">
                No eOffice file approvals currently pending for your role.
              </div>
            `:""}
          </div>
        </div>

        <!-- ERP Claims / Bills awaiting action -->
        ${t.role==="Finance Officer"||t.role==="Commissioner"||t.role==="Administrator"?`
          <div class="bg-white border border-slate-200 rounded-md p-6 space-y-4 font-bold">
            <div class="border-b border-slate-100 pb-3">
              <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">ERP Invoices & Bill Claims Awaiting Clearance</h4>
              <p class="text-[9px] text-slate-400 mt-1 uppercase font-mono">ERP financial payment vouchers and head mapping clearances</p>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-xs text-left border-collapse">
                <thead>
                  <tr class="bg-slate-50 border-b border-slate-100 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    <th class="py-2 px-3">Bill ID</th>
                    <th class="py-2 px-3">Vendor / Contractor</th>
                    <th class="py-2 px-3">Amount</th>
                    <th class="py-2 px-3">Head mapping</th>
                    <th class="py-2 px-3">Status</th>
                    <th class="py-2 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-700 font-semibold">
                  ${d.map(b=>{const w=b.status==="Paid"?"bg-emerald-50 text-emerald-700":b.status==="Pending Approval"?"bg-amber-50 text-amber-700":"bg-rose-50 text-rose-700";return`
                      <tr class="hover:bg-slate-50/50">
                        <td class="py-3 px-3 font-mono font-bold text-slate-800">${b.id}</td>
                        <td class="py-3 px-3 text-slate-700 font-bold">${b.vendor}</td>
                        <td class="py-3 px-3 font-mono text-slate-900">Rs. ${(b.amount/1e5).toFixed(1)} Lakhs</td>
                        <td class="py-3 px-3">
                          ${b.status==="Pending Budget Allocation"?`
                            <select onchange="allocateBudgetApproval('${b.id}', this.value)" class="bg-white border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-700 cursor-pointer outline-none font-bold">
                              <option value="">-- Link Head --</option>
                              ${v.headOfAccounts.map(S=>`<option value="${S.code}">${S.code} (${S.balance/1e5}L bal)</option>`).join("")}
                            </select>
                          `:`<span class="font-mono text-slate-550 font-bold">${b.headOfAccount||"N/A"}</span>`}
                        </td>
                        <td class="py-3 px-3">
                          <span class="px-2 py-0.5 rounded-full text-[9px] font-bold ${w}">${b.status}</span>
                        </td>
                        <td class="py-3 px-3 text-right font-bold">
                          ${b.status==="Pending Approval"?`
                            <button onclick="clearBillPaymentApproval('${b.id}')" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded cursor-pointer font-bold">
                              Release Payment
                            </button>
                          `:'<span class="text-[10px] text-slate-400 font-semibold">Awaiting Head Mapping</span>'}
                        </td>
                      </tr>
                    `}).join("")}
                  ${d.length===0?'<tr><td colspan="6" class="py-4 text-center text-slate-400 italic">No payment claims currently pending.</td></tr>':""}
                </tbody>
              </table>
            </div>
          </div>
        `:""}

        <!-- Complete eOffice File Directory Table -->
        <div class="bg-white border border-slate-200 rounded-md p-6 space-y-4">
          <div class="border-b border-slate-100 pb-3">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider font-bold">All Active eOffice File Vouchers</h4>
            <p class="text-[9px] text-slate-400 mt-1 uppercase font-mono font-semibold">Tracking status directory of all registered administrative files</p>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 border-b border-slate-100 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  <th class="py-2 px-3">File ID</th>
                  <th class="py-2 px-3">Subject Matter</th>
                  <th class="py-2 px-3">Custodian Desk</th>
                  <th class="py-2 px-3">Department</th>
                  <th class="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-700 font-semibold">
                ${e.map(b=>{let w="bg-slate-150 text-slate-700";return b.status==="Approved / Closed"?w="bg-emerald-50 text-emerald-700":b.status==="Rejected"?w="bg-rose-50 text-rose-700":b.status==="Returned"?w="bg-amber-50 text-amber-700":b.status==="Approved & Forwarded"&&(w="bg-blue-50 text-blue-700"),`
                    <tr class="hover:bg-slate-50/50 cursor-pointer ${ge===b.id?"bg-[#EEF4FF]/30":""}" onclick="selectGlobalApprovalFile('${b.id}')">
                      <td class="py-3 px-3 font-mono font-bold text-slate-800">${b.id}</td>
                      <td class="py-3 px-3 text-slate-900 font-bold">${b.subject}</td>
                      <td class="py-3 px-3 text-slate-700 font-medium">${b.currentCustodian}</td>
                      <td class="py-3 px-3 text-slate-550 font-semibold">${b.department}</td>
                      <td class="py-3 px-3">
                        <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${w}">${b.status}</span>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <!-- Right 1 Col: Approval Workspace -->
      ${u}

    </div>
  `,window.selectGlobalApprovalFile=b=>{ge=b,Jt=!1,Zt=!1,Xt="latest",lt()},window.editApprovalNoteSheet=()=>{Jt=!0,lt()},window.cancelApprovalEditNote=()=>{Jt=!1,lt()},window.changeApprovalVersion=b=>{Xt=b,lt()},window.toggleCompareApprovalVersions=()=>{var b,w;Zt=!Zt,Zt&&c&&c.versions&&(xs=((b=c.versions[0])==null?void 0:b.version)||"",vs=((w=c.versions[c.versions.length-1])==null?void 0:w.version)||""),lt()},window.changeCompareVer1=b=>{xs=b,lt()},window.changeCompareVer2=b=>{vs=b,lt()},window.viewAttachedDocument=b=>{$(`Opening attached reference document: ${b}`)},window.removeApprovalAttachment=b=>{c&&(c.attachments=c.attachments.filter(w=>w!==b),lt())},window.addApprovalAttachment=()=>{const b=document.getElementById("add-approval-attachment-name"),w=b==null?void 0:b.value.trim();w&&c&&(c.attachments.includes(w)||c.attachments.push(w),b.value="",lt())},window.saveApprovalEditNote=()=>{var St,Ht;if(!c)return;const b=document.getElementById("edit-approval-subject").value.trim(),w=document.getElementById("edit-approval-projname").value.trim(),S=parseFloat(document.getElementById("edit-approval-budget").value),A=document.getElementById("edit-approval-budgethead").value,C=document.getElementById("edit-approval-description").value.trim(),_=document.getElementById("edit-approval-purpose").value.trim(),M=document.getElementById("edit-approval-background").value.trim(),P=document.getElementById("edit-approval-justification").value.trim(),D=document.getElementById("edit-approval-benefits").value.trim(),N=document.getElementById("edit-approval-conditions").value.trim();if(!b||!w||isNaN(S)||!C){$("Subject, Project Name, Budget and Description are mandatory.");return}const j=((Ht=(St=c.versions)==null?void 0:St[c.versions.length-1])==null?void 0:Ht.version)||"v1.0",I=Wu(j,t.role),L=new Date,z=L.toISOString().substring(0,10),it=L.toTimeString().substring(0,5),X={version:I,modifiedBy:t.name,modifiedRole:t.role,modifiedDate:z,modifiedTime:it,subject:b,projectName:w,description:C,purpose:_,background:M,estimatedBudget:S,budgetHead:A,justification:P,benefits:D,priority:c.priority,remarks:`Edited note details, created version ${I}.`,additionalConditions:N};c.versions||(c.versions=[]),c.versions.push(X),c.subject=b,c.projectName=w,c.estimatedBudget=S,c.budgetHead=A,c.description=C,c.purpose=_,c.background=M,c.justification=P,c.benefits=D,c.additionalConditions=N,c.auditLogs||(c.auditLogs=[]),c.auditLogs.push({user:t.name,role:t.role,date:z,time:it,ip:"10.2.14.99",action:`Created new version ${I}`,previousValue:j,newValue:I}),G(t.name,`Edited Note Sheet for File ${c.id} (Version ${I})`,"Success"),Jt=!1,Xt="latest",$(`Note details saved successfully as Version ${I.replace("v","")}`),ys(c),lt()},window.actionApprovalWorkspace=b=>{var D,N;if(!c)return;const w=document.getElementById("workspace-remarks-textarea"),S=(w==null?void 0:w.value.trim())||"";if(b!=="Keep Pending"&&!S){$("Official remarks are mandatory for this action.");return}const A=new Date,C=A.toISOString().substring(0,10),_=A.toTimeString().substring(0,5),M=`${C} ${_}`,P=((N=(D=c.versions)==null?void 0:D[c.versions.length-1])==null?void 0:N.version)||"v1.0";if(b==="Keep Pending"){c.status="Pending with Current Officer",c.workflowStatus&&(c.workflowStatus[t.role]="Pending"),c.approvalHistory||(c.approvalHistory=[]),c.approvalHistory.push({officerName:t.name,role:t.role,department:c.department,action:"Keep Pending",remarks:S||"Review in progress. Kept pending.",dateTime:M,status:"Pending",versionNumber:P}),c.auditLogs||(c.auditLogs=[]),c.auditLogs.push({user:t.name,role:t.role,date:C,time:_,ip:"10.2.14.99",action:"Review Kept Pending",previousValue:c.status,newValue:"Pending with Current Officer"}),G(t.name,`Kept review pending for File ${c.id}`,"Success"),$("File status marked as Pending. You can continue reviewing later."),ys(c),lt();return}s.innerHTML,s.innerHTML=`
      <div class="flex flex-col items-center justify-center py-20 space-y-4">
        <div class="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin"></div>
        <p class="text-xs font-bold text-slate-800 uppercase tracking-widest animate-pulse">Verifying e-Sign Credentials & Cryptographic Ledger...</p>
      </div>
    `,setTimeout(()=>{if(b==="Approve"||b==="Forward"){const j=Gu(c.currentCustodian);if(c.workflowStatus&&(c.workflowStatus[t.role]="Approved",j!=="Approved / Closed"&&(c.workflowStatus[j]="Pending")),c.approvalHistory||(c.approvalHistory=[]),c.approvalHistory.push({officerName:t.name,role:t.role,department:c.department,action:b==="Approve"?"Approved & Signed":"Forwarded without edits",remarks:S,dateTime:M,status:"Approved",versionNumber:P}),c.notes.push({writer:`${t.role} (${t.name})`,text:S,date:M}),c.currentCustodian=j,j==="Approved / Closed"){c.status="Approved / Closed";const I=`PRJ-2026-${c.id.split("-").pop()}`,L={id:I,name:c.projectName||c.subject,department:c.department,zone:c.zone||"Zone-3 (Secunderabad)",projectType:"General Infrastructure Work",status:"Planning",startDate:C,endDate:"2027-12-31",officerInCharge:"Er. R. Sharma",progress:0,budget:c.estimatedBudget||12e6,spent:0,description:c.description||c.subject,lastUpdated:`${C} 10:00`};v.projects.unshift(L),Lt[I]||(Lt[I]=[]),Lt[I].unshift({id:`DOC-SAN-${c.id.split("-").pop()}`,name:`Administrative_Sanction_Order_${c.id.replace(/-/g,"_")}.pdf`,type:"pdf",uploadedBy:"Sri M. Dana Kishore, IAS",uploadedDate:C,version:"v1.0",status:"Approved",size:"1.8 MB",category:"Administrative Sanctions"}),v.workOrders.unshift({id:`WO-${c.id.split("-").pop()}`,projectId:I,title:`Work Order for ${c.projectName}`,vendor:"Pending Bid Selection",amount:c.estimatedBudget||12e6,currentStage:"Tendering",stageHistory:{Requirement:C},updates:[]}),v.notifications.unshift({id:Date.now(),title:`Project Sanctioned: ${c.projectName}`,text:`Administrative sanction order issued for File ${c.id} with budget Rs. ${(c.estimatedBudget||0).toLocaleString("en-IN")}`,time:"Just now",read:!1}),v.auditLogs.unshift({id:`AUD-${Math.floor(1e3+Math.random()*9e3)}`,user:t.name,action:`Granted Administrative Sanction for File ${c.id} and created Project ${I}`,date:C,time:_,ip:"10.2.14.99",status:"Success"}),$("Sanction Granted! Project created and registered under active directory.")}else c.status="Approved & Forwarded",$(`File successfully approved and routed to ${j}.`);c.auditLogs||(c.auditLogs=[]),c.auditLogs.push({user:t.name,role:t.role,date:C,time:_,ip:"10.2.14.99",action:"Approved & Forwarded",previousValue:c.currentCustodian,newValue:j}),G(t.name,`Approved & Forwarded File ${c.id} to ${j}`,"Success")}else if(b==="Reject")c.workflowStatus&&(c.workflowStatus[t.role]="Rejected"),c.approvalHistory||(c.approvalHistory=[]),c.approvalHistory.push({officerName:t.name,role:t.role,department:c.department,action:"Rejected proposal",remarks:S,dateTime:M,status:"Rejected",versionNumber:P}),c.notes.push({writer:`${t.role} (${t.name})`,text:`REJECTED: ${S}`,date:M}),c.status="Rejected",c.currentCustodian=c.creatorRole||"Senior Assistant",c.auditLogs||(c.auditLogs=[]),c.auditLogs.push({user:t.name,role:t.role,date:C,time:_,ip:"10.2.14.99",action:"Rejected File",previousValue:"Pending Review",newValue:"Rejected"}),G(t.name,`Rejected File ${c.id}`,"Success"),$(`File ${c.id} has been marked as Rejected.`);else if(b==="Return"){const j=Uu(c.currentCustodian);c.workflowStatus&&(c.workflowStatus[t.role]="Returned",c.workflowStatus[j]="Pending"),c.approvalHistory||(c.approvalHistory=[]),c.approvalHistory.push({officerName:t.name,role:t.role,department:c.department,action:"Returned for Correction",remarks:S,dateTime:M,status:"Returned",versionNumber:P}),c.notes.push({writer:`${t.role} (${t.name})`,text:`RETURNED WITH REMARKS: ${S}`,date:M}),c.status="Returned",c.currentCustodian=j,c.auditLogs||(c.auditLogs=[]),c.auditLogs.push({user:t.name,role:t.role,date:C,time:_,ip:"10.2.14.99",action:"Returned File",previousValue:c.currentCustodian,newValue:j}),G(t.name,`Returned File ${c.id} to ${j}`,"Success"),$(`File returned for correction to ${j}.`)}c.lastUpdated=C,ys(c),wt(),lt()},1500)}}function Ku(){const s=document.getElementById("reports-view-container");if(!s)return;s.innerHTML=`
    <!-- Top Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total Sanctioned Outlay</span>
        <span class="text-lg font-extrabold text-slate-900 mt-2 font-mono">Rs. 33.15 Cr</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Released Expenditure</span>
        <span class="text-lg font-extrabold text-[#2563EB] mt-2 font-mono">Rs. 16.35 Cr</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Average Project Progress</span>
        <span class="text-lg font-extrabold text-emerald-600 mt-2 font-mono">61.8%</span>
      </div>
      <div class="bg-white border border-slate-200 rounded-md p-5 flex flex-col justify-between shadow-xs">
        <span class="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Clearances Cleared</span>
        <span class="text-lg font-extrabold text-indigo-700 mt-2 font-mono">92%</span>
      </div>
    </div>

    <!-- Reports engine controls -->
    <div class="bg-white border border-slate-200 rounded-md p-4 mb-6 flex flex-wrap justify-between items-center gap-4">
      <div>
        <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider">GHMC MIS Reporting Engine</h4>
        <p class="text-[9px] text-slate-450 mt-1 uppercase font-semibold">Generate and download official PDF/Excel audit outlays</p>
      </div>
      <div class="flex gap-2 font-bold">
        <button onclick="alert('Downloading Department Summary Outlay PDF...')" class="bg-white hover:bg-slate-50 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-slate-200 cursor-pointer">
          Download PDF Summary
        </button>
        <button onclick="alert('Exporting Budget Performance Excel...')" class="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded cursor-pointer">
          Export Excel Report
        </button>
      </div>
    </div>

    <div id="reports-charts-wrapper" class="space-y-6"></div>
  `;const t=document.getElementById("reports-charts-wrapper");t&&Hu(t)}function Js(){const s=document.getElementById("notifications-view-container");if(!s)return;const t=v.notifications;s.innerHTML=`
    <div class="bg-white border border-slate-200 rounded-md p-6 max-w-4xl space-y-6">
      <div class="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Alert & System Notifications</h3>
          <p class="text-[9px] text-slate-400 mt-1 uppercase font-mono">Real-time eOffice and ERP transaction ledger events</p>
        </div>
        <button onclick="markAllNotificationsRead()" class="text-[#2563EB] hover:text-[#1D4ED8] text-[10px] font-bold cursor-pointer uppercase tracking-wider">
          Mark All As Read
        </button>
      </div>

      <div class="divide-y divide-slate-100 font-semibold">
        ${t.map(e=>`
          <div class="py-4 flex justify-between items-start gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full ${e.read?"bg-slate-300":"bg-[#2563EB] animate-pulse"}"></span>
                <h4 class="text-xs font-bold text-slate-800">${e.title}</h4>
                ${e.read?"":'<span class="bg-blue-50 text-[#2563EB] text-[8px] font-bold px-1 rounded uppercase tracking-wider border border-blue-100">New</span>'}
              </div>
              <p class="text-xs text-slate-500 font-semibold pl-3.5 leading-relaxed">${e.text}</p>
              <span class="text-[9px] text-slate-400 font-mono block pl-3.5">${e.time}</span>
            </div>
            <div class="flex gap-2 font-bold">
              ${e.read?"":`<button onclick="markNotificationRead(${e.id})" class="text-xs text-slate-400 hover:text-slate-700 font-bold cursor-pointer" title="Mark as read">✓</button>`}
              <button onclick="deleteNotification(${e.id})" class="text-xs text-rose-450 hover:text-rose-600 font-bold cursor-pointer" title="Delete notification">✕</button>
            </div>
          </div>
        `).join("")}
        ${t.length===0?'<div class="text-center text-xs text-slate-450 py-8 italic">No notifications present.</div>':""}
      </div>
    </div>
  `}let Me="";function va(){const s=document.getElementById("audit-logs-container");if(!s)return;const t=v.auditLogs.filter(i=>i.user.toLowerCase().includes(Me)||i.action.toLowerCase().includes(Me)||i.id.toLowerCase().includes(Me));s.innerHTML=`
    <div class="bg-white border border-slate-200 rounded-md p-6 space-y-6">
      <div class="flex flex-wrap justify-between items-center gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Security Auditing Ledger</h3>
          <p class="text-[9px] text-slate-400 mt-1 uppercase font-mono">Immutable cryptographic transaction logs and IP nodes</p>
        </div>
        
        <div class="w-64 border border-slate-200 rounded-md flex items-center bg-slate-50/50 px-2.5 py-1">
          <input type="text" id="audit-search-input" class="w-full text-xs text-slate-800 bg-transparent outline-none font-medium" placeholder="Filter by User or Action..." value="${Me}">
        </div>
      </div>

      <div class="overflow-x-auto font-semibold">
        <table class="w-full text-xs text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-100 text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              <th class="py-2.5 px-3">Log ID</th>
              <th class="py-2.5 px-3">Operator / Role</th>
              <th class="py-2.5 px-3">Transaction Details</th>
              <th class="py-2.5 px-3">Timestamp</th>
              <th class="py-2.5 px-3">Node IP</th>
              <th class="py-2.5 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            ${t.map(i=>`
              <tr class="hover:bg-slate-50/50">
                <td class="py-3 px-3 font-mono font-bold text-slate-400">${i.id}</td>
                <td class="py-3 px-3 text-slate-850 font-bold">${i.user}</td>
                <td class="py-3 px-3 text-slate-600 font-semibold">${i.action}</td>
                <td class="py-3 px-3 font-mono text-[10px] text-slate-500">${i.date} ${i.time}</td>
                <td class="py-3 px-3 font-mono text-[10px] text-slate-500">${i.ip}</td>
                <td class="py-3 px-3 text-right">
                  <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100">
                    ${i.status}
                  </span>
                </td>
              </tr>
            `).join("")}
            ${t.length===0?'<tr><td colspan="6" class="py-6 text-center text-slate-450 italic">No audit records found matching query.</td></tr>':""}
          </tbody>
        </table>
      </div>
    </div>
  `;const e=document.getElementById("audit-search-input");e==null||e.addEventListener("input",()=>{Me=e.value.trim().toLowerCase(),va()})}function es(){const s=document.getElementById("navbar-pending-approvals-text"),t=v.currentUser;if(s&&t){const e=v.eOfficeFiles.filter(o=>o.currentCustodian===t.role&&o.status!=="Approved / Closed"&&o.status!=="Rejected").length,i=t.role==="Finance Officer"?v.bills.filter(o=>o.status!=="Paid").length:0,n=e+i;s.textContent=`${n} Pending`}Ui()}function Be(){const s=document.getElementById("quick-action-modal");s&&s.classList.add("hidden")}window.closeQuickActionModal=Be;window.openQuickActionModal=s=>{var r;const t=document.getElementById("quick-action-modal");if(!t)return;let e="";s==="file"?e=`
      <form id="quick-file-form" class="space-y-4">
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Project Link</label>
          <select id="quick-file-project" required class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
            ${v.projects.map(l=>`<option value="${l.id}">${l.id} - ${l.name}</option>`).join("")}
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Subject Matter / File Name</label>
          <input type="text" id="quick-file-subject" required placeholder="Enter administrative sanction subject..." class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Department Division</label>
          <input type="text" id="quick-file-dept" required placeholder="e.g. Information Technology Division" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none" value="${((r=v.currentUser)==null?void 0:r.role)==="Vendor"?"External Partner":"Engineering Wing"}">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Initial Priority</label>
            <select id="quick-file-priority" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
              <option value="Normal">Normal Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Send to Desk</label>
            <select id="quick-file-custodian" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
              ${at.map(l=>`<option value="${l}">${l}</option>`).join("")}
            </select>
          </div>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Initial Note Sheet Remark</label>
          <textarea id="quick-file-remark" required placeholder="Write initial proposal/findings note sheet details here..." class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 h-20 outline-none"></textarea>
        </div>
        <div class="flex justify-end gap-2 border-t border-slate-100 pt-4 font-bold">
          <button type="button" onclick="closeQuickActionModal()" class="px-4 py-1.5 border border-slate-200 hover:border-slate-350 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider rounded cursor-pointer">Cancel</button>
          <button type="submit" class="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">Dispatch File</button>
        </div>
      </form>
    `:s==="note"?e=`
      <form id="quick-note-form" class="space-y-4">
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Target eOffice File</label>
          <select id="quick-note-file" required class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
            ${v.eOfficeFiles.map(l=>`<option value="${l.id}">${l.id} - ${l.subject}</option>`).join("")}
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Note Sheet Remark Description</label>
          <textarea id="quick-note-text" required placeholder="Write official note remark to sign and attach to file..." class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 h-32 outline-none"></textarea>
        </div>
        <div class="flex justify-end gap-2 border-t border-slate-100 pt-4 font-bold">
          <button type="button" onclick="closeQuickActionModal()" class="px-4 py-1.5 border border-slate-200 hover:border-slate-350 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider rounded cursor-pointer">Cancel</button>
          <button type="submit" class="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">Sign & Append</button>
        </div>
      </form>
    `:s==="workorder"?e=`
      <form id="quick-wo-form" class="space-y-4">
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Project Link</label>
          <select id="quick-wo-project" required class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
            ${v.projects.map(l=>`<option value="${l.id}">${l.id} - ${l.name}</option>`).join("")}
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Work Contract Title</label>
          <input type="text" id="quick-wo-title" required placeholder="e.g. Pile foundation works for metro spans" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Vendor Partner Organization</label>
          <input type="text" id="quick-wo-vendor" required placeholder="e.g. Aaditya Construction Group" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contract Amount (INR)</label>
            <input type="number" id="quick-wo-amount" required placeholder="e.g. 5000000" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Initial Stage</label>
            <select id="quick-wo-stage" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
              <option value="Work Order">Work Order Issued</option>
              <option value="Vendor Execution">Vendor Execution</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end gap-2 border-t border-slate-100 pt-4 font-bold">
          <button type="button" onclick="closeQuickActionModal()" class="px-4 py-1.5 border border-slate-200 hover:border-slate-350 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider rounded cursor-pointer">Cancel</button>
          <button type="submit" class="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">Disburse Contract</button>
        </div>
      </form>
    `:e=`
      <form id="quick-doc-form" class="space-y-4">
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Project Context</label>
          <select id="quick-doc-project" required class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
            ${v.projects.map(l=>`<option value="${l.id}">${l.id} - ${l.name}</option>`).join("")}
          </select>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Document Title / Name</label>
          <input type="text" id="quick-doc-name" required placeholder="e.g. Soil load capacity certification report.pdf" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category Classification</label>
            <select id="quick-doc-category" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-700 outline-none">
              <option value="Administrative Sanctions">Administrative Sanction</option>
              <option value="Technical Estimates">Technical Estimate</option>
              <option value="Structural Drawings">Structural Drawing</option>
              <option value="Audit Clearance">Audit Clearance</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Version</label>
            <input type="text" id="quick-doc-version" required value="v1.0" class="w-full bg-white border border-slate-200 rounded p-2 text-xs text-slate-800 outline-none">
          </div>
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">File Attachment (Mock Drag-Drop)</label>
          <div class="border-2 border-dashed border-slate-200 rounded-md p-4 text-center hover:bg-slate-50 transition-all cursor-pointer">
            <span class="text-xs text-slate-450 font-semibold block">Drag PDF/Excel attachment files here</span>
            <span class="text-[9px] text-slate-400 mt-1 uppercase font-mono block">Max size: 25MB</span>
          </div>
        </div>
        <div class="flex justify-end gap-2 border-t border-slate-100 pt-4 font-bold">
          <button type="button" onclick="closeQuickActionModal()" class="px-4 py-1.5 border border-slate-200 hover:border-slate-350 text-xs font-bold text-slate-600 hover:text-slate-900 uppercase tracking-wider rounded cursor-pointer">Cancel</button>
          <button type="submit" class="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">Upload & Index</button>
        </div>
      </form>
    `,t.innerHTML=`
    <div class="bg-white rounded-md shadow-xl border border-slate-200 w-full max-w-lg p-6 space-y-4 animate-toast-slide-in relative">
      <button onclick="closeQuickActionModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-650 text-sm font-bold cursor-pointer">✕</button>
      <div>
        <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Action Interface</h3>
        <p class="text-[9px] text-slate-400 mt-0.5 uppercase font-mono">Create, link, and disburse records securely</p>
      </div>
      <div class="border-t border-slate-100 pt-4">
        ${e}
      </div>
    </div>
  `,t.classList.remove("hidden");const i=document.getElementById("quick-file-form");i==null||i.addEventListener("submit",l=>{var y,k,b;l.preventDefault();const d=document.getElementById("quick-file-project").value,c=document.getElementById("quick-file-subject").value,u=document.getElementById("quick-file-dept").value,p=document.getElementById("quick-file-priority").value,h=document.getElementById("quick-file-custodian").value,m=document.getElementById("quick-file-remark").value,f=`FILE-2026-${d.split("-")[1]}-${Math.floor(Math.random()*900)+100}`,g=new Date,x=g.toISOString().substring(0,10)+" "+g.toTimeString().substring(0,5);v.eOfficeFiles.unshift({id:f,projectId:d,subject:c,department:u,currentCustodian:h,priority:p,status:"Pending Approval",attachments:[],notes:[{writer:`${(y=v.currentUser)==null?void 0:y.role} (${(k=v.currentUser)==null?void 0:k.name})`,text:m,date:x}],lastUpdated:g.toISOString().substring(0,10)}),G(((b=v.currentUser)==null?void 0:b.name)||"Unknown",`Created eOffice File ${f} link under ${d}`,"Success"),$(`eOffice File ${f} successfully created.`),Be(),ct(),es()});const n=document.getElementById("quick-note-form");n==null||n.addEventListener("submit",l=>{var p,h,m;l.preventDefault();const d=document.getElementById("quick-note-file").value,c=document.getElementById("quick-note-text").value,u=v.eOfficeFiles.find(f=>f.id===d);if(u){const f=new Date,g=f.toISOString().substring(0,10)+" "+f.toTimeString().substring(0,5);u.notes.push({writer:`${(p=v.currentUser)==null?void 0:p.role} (${(h=v.currentUser)==null?void 0:h.name})`,text:c,date:g}),u.lastUpdated=f.toISOString().substring(0,10),G(((m=v.currentUser)==null?void 0:m.name)||"Unknown",`Appended note to File ${d}`,"Success"),$("Note appended successfully.")}Be(),ct()});const o=document.getElementById("quick-wo-form");o==null||o.addEventListener("submit",l=>{var x;l.preventDefault();const d=document.getElementById("quick-wo-project").value,c=document.getElementById("quick-wo-title").value,u=document.getElementById("quick-wo-vendor").value,p=parseFloat(document.getElementById("quick-wo-amount").value),h=document.getElementById("quick-wo-stage").value,m=`WO-${Math.floor(Math.random()*9e4)+1e4}`,g=new Date().toISOString().substring(0,10);v.workOrders.unshift({id:m,projectId:d,title:c,vendor:u,amount:p,currentStage:h,stageHistory:{Requirement:g,"Work Order":g},updates:[{date:g,text:"Work Order contract initiated."}]}),G(((x=v.currentUser)==null?void 0:x.name)||"Unknown",`Created Work Order ${m} for ${u}`,"Success"),$(`Work Order ${m} successfully created.`),Be(),ct()});const a=document.getElementById("quick-doc-form");a==null||a.addEventListener("submit",l=>{var p;l.preventDefault();const d=document.getElementById("quick-doc-project").value,c=document.getElementById("quick-doc-name").value;document.getElementById("quick-doc-category").value,document.getElementById("quick-doc-version").value,new Date().toISOString().substring(0,10),G(((p=v.currentUser)==null?void 0:p.name)||"Unknown",`Uploaded Document "${c}" under project ${d}`,"Success"),$(`Document attachment "${c}" uploaded successfully.`),Be(),ct()})};window.openHelpGuide=()=>{const s=document.getElementById("quick-action-modal");s&&(s.innerHTML=`
    <div class="bg-white rounded-md shadow-xl border border-slate-200 w-full max-w-2xl p-6 space-y-6 animate-toast-slide-in relative max-h-[90vh] overflow-y-auto">
      <button onclick="closeQuickActionModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer">✕</button>
      
      <div class="border-b border-slate-100 pb-3">
        <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">GHMC Unified Digital Portal User Guide</h3>
        <p class="text-[9px] text-slate-450 mt-0.5 uppercase font-mono">Standard Operating Procedures & Role Permission Matrices</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start font-semibold">
        <!-- left menu tabs -->
        <div class="space-y-1 md:col-span-1">
          <button id="guide-tab-roles" onclick="switchGuideTab('roles')" class="w-full text-left px-3 py-2 text-xs font-bold rounded hover:bg-slate-50 text-slate-700 bg-slate-100 border-l-2 border-[#2563EB]">Role Permissions</button>
          <button id="guide-tab-flow" onclick="switchGuideTab('flow')" class="w-full text-left px-3 py-2 text-xs font-bold rounded hover:bg-slate-50 text-slate-500">eOffice File Flow</button>
          <button id="guide-tab-erp" onclick="switchGuideTab('erp')" class="w-full text-left px-3 py-2 text-xs font-bold rounded hover:bg-slate-50 text-slate-500">ERP & Finance Integration</button>
        </div>

        <!-- right pane content -->
        <div id="guide-pane-content" class="md:col-span-2 text-xs text-slate-600 space-y-4 leading-relaxed font-semibold">
          <!-- Roles tab default -->
          <div class="space-y-3">
            <h4 class="font-bold text-slate-800">System Role Permission Matrix</h4>
            <ul class="list-disc pl-4 space-y-1.5 text-slate-550">
              <li><strong class="text-slate-700">Commissioner:</strong> Full administrative clearance authority, final note sheet approval, transaction audit access, and global MIS reports download.</li>
              <li><strong class="text-slate-700">Additional Commissioner:</strong> General workspace review, file forwarding/clearance authority, and technical log auditing.</li>
              <li><strong class="text-slate-700">Executive Engineer:</strong> Technical proposal creation, structural drawings upload, milestone execution certification, and technical note submissions.</li>
              <li><strong class="text-slate-700">Finance Officer:</strong> Head of Account ledger mapping, payment voucher release, budget performance monitoring, and financial statement audit.</li>
              <li><strong class="text-slate-700">Vendor Partner:</strong> Workspace timeline overview, payment status verification, invoice submission, and progress remark logs.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex justify-end border-t border-slate-100 pt-4 font-bold">
        <button onclick="closeQuickActionModal()" class="px-4 py-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer">Close Guide</button>
      </div>
    </div>
  `,s.classList.remove("hidden"),window.switchGuideTab=t=>{const e=document.getElementById("guide-tab-roles"),i=document.getElementById("guide-tab-flow"),n=document.getElementById("guide-tab-erp"),o=document.getElementById("guide-pane-content");if(!o)return;[e,i,n].forEach(r=>{r&&(r.className="w-full text-left px-3 py-2 text-xs font-bold rounded hover:bg-slate-50 text-slate-500")});const a=document.getElementById(`guide-tab-${t}`);a&&(a.className="w-full text-left px-3 py-2 text-xs font-bold rounded hover:bg-slate-50 text-slate-700 bg-slate-100 border-l-2 border-[#2563EB]"),t==="roles"?o.innerHTML=`
        <div class="space-y-3">
          <h4 class="font-bold text-slate-800">System Role Permission Matrix</h4>
          <ul class="list-disc pl-4 space-y-1.5 text-slate-550">
            <li><strong class="text-slate-700">Commissioner:</strong> Full administrative clearance authority, final note sheet approval, transaction audit access, and global MIS reports download.</li>
            <li><strong class="text-slate-700">Additional Commissioner:</strong> General workspace review, file forwarding/clearance authority, and technical log auditing.</li>
            <li><strong class="text-slate-700">Executive Engineer:</strong> Technical proposal creation, structural drawings upload, milestone execution certification, and technical note submissions.</li>
            <li><strong class="text-slate-700">Finance Officer:</strong> Head of Account ledger mapping, payment voucher release, budget performance monitoring, and financial statement audit.</li>
            <li><strong class="text-slate-700">Vendor Partner:</strong> Workspace timeline overview, payment status verification, invoice submission, and progress remark logs.</li>
          </ul>
        </div>
      `:t==="flow"?o.innerHTML=`
        <div class="space-y-3">
          <h4 class="font-bold text-slate-800">eOffice Note Sheet Flow Standard</h4>
          <p class="text-slate-500">Every administrative file follows a rigid hierarchy to guarantee accountability and digital audit logs:</p>
          <div class="flex flex-col gap-2 border-l border-slate-200 pl-4 mt-2">
            <div>
              <span class="text-[9px] font-bold text-slate-400 block uppercase">Step 1: Senior Assistant</span>
              <span class="font-semibold text-slate-705">Initiates file proposal note mapping required land survey numbers or cost estimation details.</span>
            </div>
            <div>
              <span class="text-[9px] font-bold text-slate-400 block uppercase">Step 2: Executive Engineer</span>
              <span class="font-semibold text-slate-705">Reviews technical specifications and attaches loadcapacity calculations.</span>
            </div>
            <div>
              <span class="text-[9px] font-bold text-slate-400 block uppercase">Step 3: Joint/Addl. Commissioner</span>
              <span class="font-semibold text-slate-705">Verifies project alignment with public work directives and forwards to desk of Commissioner.</span>
            </div>
            <div>
              <span class="text-[9px] font-bold text-slate-400 block uppercase">Step 4: Commissioner</span>
              <span class="font-semibold text-slate-705">Grants final administrative signature, officially approving proposal for execution.</span>
            </div>
          </div>
        </div>
      `:o.innerHTML=`
        <div class="space-y-3">
          <h4 class="font-bold text-slate-800">ERP & Financial Release Protocol</h4>
          <p class="text-slate-500">Payments to contractors are linked directly to milestone progress verified by the Executive Engineer:</p>
          <ol class="list-decimal pl-4 space-y-1.5 text-slate-550">
            <li><strong class="text-slate-700">Milestone Completed:</strong> Vendor uploads work invoice under work order panel.</li>
            <li><strong class="text-slate-700">Technical Audit:</strong> Executive Engineer checks and signs the completion report.</li>
            <li><strong class="text-slate-700">Budget Head Mapping:</strong> CFO maps the bill to the corresponding Head of Account (ensuring sufficient balance outlay).</li>
            <li><strong class="text-slate-700">Payment Released:</strong> CFO releases treasury fund disbursement. Payment status changes to "Paid".</li>
          </ol>
        </div>
      `})};window.markNotificationRead=s=>{var e;const t=v.notifications.find(i=>i.id===s);t&&(t.read=!0,G(((e=v.currentUser)==null?void 0:e.name)||"Unknown",`Marked notification "${t.title}" as read`,"Success"),$("Notification marked as read."),es(),ts(),v.activeView==="notifications-view"&&Js())};window.markAllNotificationsRead=()=>{var s;v.notifications.forEach(t=>t.read=!0),G(((s=v.currentUser)==null?void 0:s.name)||"Unknown","Marked all notifications as read","Success"),$("All notifications marked as read."),es(),ts(),v.activeView==="notifications-view"&&Js()};window.deleteNotification=s=>{var e;const t=v.notifications.findIndex(i=>i.id===s);if(t!==-1){const i=v.notifications[t].title;v.notifications.splice(t,1),G(((e=v.currentUser)==null?void 0:e.name)||"Unknown",`Deleted notification "${i}"`,"Success"),$("Notification deleted."),es(),ts(),v.activeView==="notifications-view"&&Js()}};
