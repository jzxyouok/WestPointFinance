/*
 SeaJS - A Module Loader for the Web
 v1.3.0 | seajs.org | MIT Licensed
*/
this.seajs={_seajs:this.seajs};seajs.version="1.3.0";seajs._util={};seajs._config={debug:"",preload:[]};
(function(a){var b=Object.prototype.toString,d=Array.prototype;a.isString=function(a){return"[object String]"===b.call(a)};a.isFunction=function(a){return"[object Function]"===b.call(a)};a.isRegExp=function(a){return"[object RegExp]"===b.call(a)};a.isObject=function(a){return a===Object(a)};a.isArray=Array.isArray||function(a){return"[object Array]"===b.call(a)};a.indexOf=d.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return c;return-1};var c=a.forEach=
d.forEach?function(a,b){a.forEach(b)}:function(a,b){for(var c=0;c<a.length;c++)b(a[c],c,a)};a.map=d.map?function(a,b){return a.map(b)}:function(a,b){var d=[];c(a,function(a,c,e){d.push(b(a,c,e))});return d};a.filter=d.filter?function(a,b){return a.filter(b)}:function(a,b){var d=[];c(a,function(a,c,e){b(a,c,e)&&d.push(a)});return d};var e=a.keys=Object.keys||function(a){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(c);return b};a.unique=function(a){var b={};c(a,function(a){b[a]=1});return e(b)};
a.now=Date.now||function(){return(new Date).getTime()}})(seajs._util);(function(a){a.log=function(){if("undefined"!==typeof console){var a=Array.prototype.slice.call(arguments),d="log";console[a[a.length-1]]&&(d=a.pop());if("log"!==d||seajs.debug)if(console[d].apply)console[d].apply(console,a);else{var c=a.length;if(1===c)console[d](a[0]);else if(2===c)console[d](a[0],a[1]);else if(3===c)console[d](a[0],a[1],a[2]);else console[d](a.join(" "))}}}})(seajs._util);
(function(a,b,d){function c(a){a=a.match(p);return(a?a[0]:".")+"/"}function e(a){f.lastIndex=0;f.test(a)&&(a=a.replace(f,"$1/"));if(-1===a.indexOf("."))return a;for(var b=a.split("/"),c=[],d,e=0;e<b.length;e++)if(d=b[e],".."===d){if(0===c.length)throw Error("The path is invalid: "+a);c.pop()}else"."!==d&&c.push(d);return c.join("/")}function l(a){var a=e(a),b=a.charAt(a.length-1);if("/"===b)return a;"#"===b?a=a.slice(0,-1):-1===a.indexOf("?")&&!k.test(a)&&(a+=".js");0<a.indexOf(":80/")&&(a=a.replace(":80/",
"/"));return a}function g(a){if("#"===a.charAt(0))return a.substring(1);var c=b.alias;if(c&&r(a)){var d=a.split("/"),e=d[0];c.hasOwnProperty(e)&&(d[0]=c[e],a=d.join("/"))}return a}function i(a){return 0<a.indexOf("://")||0===a.indexOf("//")}function m(a){return"/"===a.charAt(0)&&"/"!==a.charAt(1)}function r(a){var b=a.charAt(0);return-1===a.indexOf("://")&&"."!==b&&"/"!==b}var p=/.*(?=\/.*$)/,f=/([^:\/])\/\/+/g,k=/\.(?:css|js)$/,o=/^(.*?\w)(?:\/|$)/,j={},d=d.location,q=d.protocol+"//"+d.host+function(a){"/"!==
a.charAt(0)&&(a="/"+a);return a}(d.pathname);0<q.indexOf("\\")&&(q=q.replace(/\\/g,"/"));a.dirname=c;a.realpath=e;a.normalize=l;a.parseAlias=g;a.parseMap=function(d){var f=b.map||[];if(!f.length)return d;for(var n=d,m=0;m<f.length;m++){var h=f[m];if(a.isArray(h)&&2===h.length){var g=h[0];if(a.isString(g)&&-1<n.indexOf(g)||a.isRegExp(g)&&g.test(n))n=n.replace(g,h[1])}else a.isFunction(h)&&(n=h(n))}i(n)||(n=e(c(q)+n));n!==d&&(j[n]=d);return n};a.unParseMap=function(a){return j[a]||a};a.id2Uri=function(a,
d){if(!a)return"";a=g(a);d||(d=q);var e;i(a)?e=a:0===a.indexOf("./")||0===a.indexOf("../")?(0===a.indexOf("./")&&(a=a.substring(2)),e=c(d)+a):e=m(a)?d.match(o)[1]+a:b.base+"/"+a;return l(e)};a.isAbsolute=i;a.isRoot=m;a.isTopLevel=r;a.pageUri=q})(seajs._util,seajs._config,this);
(function(a,b){function d(a,c){a.onload=a.onerror=a.onreadystatechange=function(){p.test(a.readyState)&&(a.onload=a.onerror=a.onreadystatechange=null,a.parentNode&&!b.debug&&i.removeChild(a),a=void 0,c())}}function c(b,c){j||q?(a.log("Start poll to fetch css"),setTimeout(function(){e(b,c)},1)):b.onload=b.onerror=function(){b.onload=b.onerror=null;b=void 0;c()}}function e(a,b){var c;if(j)a.sheet&&(c=!0);else if(a.sheet)try{a.sheet.cssRules&&(c=!0)}catch(d){"NS_ERROR_DOM_SECURITY_ERR"===d.name&&(c=
!0)}setTimeout(function(){c?b():e(a,b)},1)}function l(){}var g=document,i=g.head||g.getElementsByTagName("head")[0]||g.documentElement,m=i.getElementsByTagName("base")[0],r=/\.css(?:\?|$)/i,p=/loaded|complete|undefined/,f,k;a.fetch=function(b,e,j){var g=r.test(b),h=document.createElement(g?"link":"script");j&&(j=a.isFunction(j)?j(b):j)&&(h.charset=j);e=e||l;"SCRIPT"===h.nodeName?d(h,e):c(h,e);g?(h.rel="stylesheet",h.href=b):(h.async="async",h.src=b);f=h;m?i.insertBefore(h,m):i.appendChild(h);f=null};
a.getCurrentScript=function(){if(f)return f;if(k&&"interactive"===k.readyState)return k;for(var a=i.getElementsByTagName("script"),b=0;b<a.length;b++){var c=a[b];if("interactive"===c.readyState)return k=c}};a.getScriptAbsoluteSrc=function(a){return a.hasAttribute?a.src:a.getAttribute("src",4)};a.importStyle=function(a,b){if(!b||!g.getElementById(b)){var c=g.createElement("style");b&&(c.id=b);i.appendChild(c);c.styleSheet?c.styleSheet.cssText=a:c.appendChild(g.createTextNode(a))}};var o=navigator.userAgent,
j=536>Number(o.replace(/.*AppleWebKit\/(\d+)\..*/,"$1")),q=0<o.indexOf("Firefox")&&!("onload"in document.createElement("link"))})(seajs._util,seajs._config,this);(function(a){var b=/(?:^|[^.$])\brequire\s*\(\s*(["'])([^"'\s\)]+)\1\s*\)/g;a.parseDependencies=function(d){var c=[],e,d=d.replace(/^\s*\/\*[\s\S]*?\*\/\s*$/mg,"").replace(/^\s*\/\/.*$/mg,"");for(b.lastIndex=0;e=b.exec(d);)e[2]&&c.push(e[2]);return a.unique(c)}})(seajs._util);
(function(a,b,d){function c(a,b){this.uri=a;this.status=b||0}function e(a,d){return b.isString(a)?c._resolve(a,d):b.map(a,function(a){return e(a,d)})}function l(a,t){var e=b.parseMap(a);v[e]?(f[a]=f[e],t()):q[e]?u[e].push(t):(q[e]=!0,u[e]=[t],c._fetch(e,function(){v[e]=!0;var d=f[a];d.status===j.FETCHING&&(d.status=j.FETCHED);n&&(c._save(a,n),n=null);s&&d.status===j.FETCHED&&(f[a]=s,s.realUri=a);s=null;q[e]&&delete q[e];if(d=u[e])delete u[e],b.forEach(d,function(a){a()})},d.charset))}function g(a,
b){var c=a(b.require,b.exports,b);void 0!==c&&(b.exports=c)}function i(a){var c=a.realUri||a.uri,d=k[c];d&&(b.forEach(d,function(b){g(b,a)}),delete k[c])}function m(a){var c=a.uri;return b.filter(a.dependencies,function(a){h=[c];if(a=r(f[a]))h.push(c),b.log("Found circular dependencies:",h.join(" --\> "),void 0);return!a})}function r(a){if(!a||a.status!==j.SAVED)return!1;h.push(a.uri);a=a.dependencies;if(a.length){var c=a.concat(h);if(c.length>b.unique(c).length)return!0;for(c=0;c<a.length;c++)if(r(f[a[c]]))return!0}h.pop();
return!1}function p(a){var b=d.preload.slice();d.preload=[];b.length?w._use(b,a):a()}var f={},k={},o=[],j={FETCHING:1,FETCHED:2,SAVED:3,READY:4,COMPILING:5,COMPILED:6};c.prototype._use=function(a,c){b.isString(a)&&(a=[a]);var d=e(a,this.uri);this._load(d,function(){p(function(){var a=b.map(d,function(a){return a?f[a]._compile():null});c&&c.apply(null,a)})})};c.prototype._load=function(a,d){function e(a){(a||{}).status<j.READY&&(a.status=j.READY);0===--i&&d()}var x=b.filter(a,function(a){return a&&
(!f[a]||f[a].status<j.READY)}),g=x.length;if(0===g)d();else for(var i=g,h=0;h<g;h++)(function(a){function b(){d=f[a];if(d.status>=j.SAVED){var t=m(d);t.length?c.prototype._load(t,function(){e(d)}):e(d)}else e()}var d=f[a]||(f[a]=new c(a,j.FETCHING));d.status>=j.FETCHED?b():l(a,b)})(x[h])};c.prototype._compile=function(){function a(b){b=e(b,c.uri);b=f[b];if(!b)return null;if(b.status===j.COMPILING)return b.exports;b.parent=c;return b._compile()}var c=this;if(c.status===j.COMPILED)return c.exports;
if(c.status<j.SAVED&&!k[c.realUri||c.uri])return null;c.status=j.COMPILING;a.async=function(a,b){c._use(a,b)};a.resolve=function(a){return e(a,c.uri)};a.cache=f;c.require=a;c.exports={};var d=c.factory;b.isFunction(d)?(o.push(c),g(d,c),o.pop()):void 0!==d&&(c.exports=d);c.status=j.COMPILED;i(c);return c.exports};c._define=function(a,d,g){var h=arguments.length;1===h?(g=a,a=void 0):2===h&&(g=d,d=void 0,b.isArray(a)&&(d=a,a=void 0));!b.isArray(d)&&b.isFunction(g)&&(d=b.parseDependencies(g.toString()));
var h={id:a,dependencies:d,factory:g},i;if(document.attachEvent){var m=b.getCurrentScript();m&&(i=b.unParseMap(b.getScriptAbsoluteSrc(m)));i||b.log("Failed to derive URI from interactive script for:",g.toString(),"warn")}if(m=a?e(a):i){if(m===i){var k=f[i];k&&(k.realUri&&k.status===j.SAVED)&&(f[i]=null)}h=c._save(m,h);if(i){if((f[i]||{}).status===j.FETCHING)f[i]=h,h.realUri=i}else s||(s=h)}else n=h};c._getCompilingModule=function(){return o[o.length-1]};c._find=function(a){var c=[];b.forEach(b.keys(f),
function(d){if(b.isString(a)&&-1<d.indexOf(a)||b.isRegExp(a)&&a.test(d))d=f[d],d.exports&&c.push(d.exports)});return c};c._modify=function(b,c){var d=e(b),i=f[d];i&&i.status===j.COMPILED?g(c,i):(k[d]||(k[d]=[]),k[d].push(c));return a};c.STATUS=j;c._resolve=b.id2Uri;c._fetch=b.fetch;c._save=function(a,d){var i=f[a]||(f[a]=new c(a));i.status<j.SAVED&&(i.id=d.id||a,i.dependencies=e(b.filter(d.dependencies||[],function(a){return!!a}),a),i.factory=d.factory,i.status=j.SAVED);return i};var q={},v={},u=
{},n=null,s=null,h=[],w=new c(b.pageUri,j.COMPILED);a.use=function(b,c){p(function(){w._use(b,c)});return a};a.define=c._define;a.cache=c.cache=f;a.find=c._find;a.modify=c._modify;c.fetchedList=v;a.pluginSDK={Module:c,util:b,config:d}})(seajs,seajs._util,seajs._config);
(function(a,b,d){var c="seajs-ts="+b.now(),e=document.getElementById("seajsnode");e||(e=document.getElementsByTagName("script"),e=e[e.length-1]);var l=e&&b.getScriptAbsoluteSrc(e)||b.pageUri,l=b.dirname(function(a){if(a.indexOf("??")===-1)return a;var c=a.split("??"),a=c[0],c=b.filter(c[1].split(","),function(a){return a.indexOf("sea.js")!==-1});return a+c[0]}(l));b.loaderDir=l;var g=l.match(/^(.+\/)seajs\/[\.\d]+(?:-dev)?\/$/);g&&(l=g[1]);d.base=l;d.main=e&&e.getAttribute("data-main");d.charset=
"utf-8";a.config=function(e){for(var g in e)if(e.hasOwnProperty(g)){var l=d[g],p=e[g];if(l&&g==="alias")for(var f in p){if(p.hasOwnProperty(f)){var k=l[f],o=p[f];/^\d+\.\d+\.\d+$/.test(o)&&(o=f+"/"+o+"/"+f);k&&k!==o&&b.log("The alias config is conflicted:","key =",'"'+f+'"',"previous =",'"'+k+'"',"current =",'"'+o+'"',"warn");l[f]=o}}else if(l&&(g==="map"||g==="preload")){b.isString(p)&&(p=[p]);b.forEach(p,function(a){a&&l.push(a)})}else d[g]=p}if((e=d.base)&&!b.isAbsolute(e))d.base=b.id2Uri((b.isRoot(e)?
"":"./")+e+"/");if(d.debug===2){d.debug=1;a.config({map:[[/^.*$/,function(a){a.indexOf("seajs-ts=")===-1&&(a=a+((a.indexOf("?")===-1?"?":"&")+c));return a}]]})}if(d.debug)a.debug=!!d.debug;return this};d.debug&&(a.debug=!!d.debug)})(seajs,seajs._util,seajs._config);
(function(a,b,d){a.log=b.log;a.importStyle=b.importStyle;a.config({alias:{seajs:b.loaderDir}});b.forEach(function(){var a=[],e=d.location.search,e=e.replace(/(seajs-\w+)(&|$)/g,"$1=1$2"),e=e+(" "+document.cookie);e.replace(/seajs-(\w+)=[1-9]/g,function(b,d){a.push(d)});return b.unique(a)}(),function(b){a.use("seajs/plugin-"+b);"debug"===b&&(a._use=a.use,a._useArgs=[],a.use=function(){a._useArgs.push(arguments);return a})})})(seajs,seajs._util,this);
(function(a,b,d){var c=a._seajs;if(c&&!c.args)d.seajs=a._seajs;else{d.define=a.define;b.main&&a.use(b.main);if(b=(c||0).args)for(var c={"0":"config",1:"use",2:"define"},e=0;e<b.length;e+=2)a[c[b[e]]].apply(a,b[e+1]);d.define.cmd={};delete a.define;delete a._util;delete a._config;delete a._seajs}})(seajs,seajs._config,this);


//<fileConfig>
var Config_FileVersion = {
    "defaults": "?2015-10-15T09:30:00.505Z",
    "index.js": "index.js?v=lfEJf1bKtHjC6ZNPGynmWQ%3D%3D",
    "T.js": "T.js?v=Tis57k2xwHSaTs3xxeR5YQ%3D%3D",
    "product.js": "product.js?v=l7tZ6dXcwYCJYsOw9HcD%2Bg%3D%3D",
    "insList.js": "insList.js?v=aZAS7%2FZCA1teHsElmA0Xhg%3D%3D",
    "clause-detail.js": "clause-detail.js?v=jdbfG1bNlr%2BOF1RUWBa%2FqQ%3D%3D",
    "clause.js": "clause.js?v=4GsLmat6De7Ts3vnhlYJfw%3D%3D",
    "comment.js": "comment.js?v=0YIZVAAFKxaxWoxCagttlQ%3D%3D",
    "detail.js": "detail.js?v=dkbTRH3YqaGxeta6RsFykQ%3D%3D",
    "needknow.js": "needknow.js?v=czAmKEjOTMtURZo%2BiBlQlQ%3D%3D",
    "changepassword.js": "changepassword.js?v=BSn14WtfGvq9fJTdO%2BF4Pg%3D%3D",
    "hztip.js": "hztip.js?v=bvtKeqFYMnWCf5gGLV9IzQ%3D%3D",
    "insCompose.js": "insCompose.js?v=AlNaB4L%2BEfScmzRVH3eDwQ%3D%3D",
    "myaccount.js": "myaccount.js?v=ctEYIVTWKVOqURH7HQOC0g%3D%3D",
    "mysafe.js": "mysafe.js?v=c75iTbk9Me4ObiEQBrPuAQ%3D%3D",
    "register-password.js": "register-password.js?v=6iTotYHF6rXx6%2ByRvlChgA%3D%3D",
    "register.js": "register.js?v=rNW3ip%2BcsUJXG11hQxQXnA%3D%3D",
    "retrieve-email.js": "retrieve-email.js?v=g7JPbT9W6HzAii3XMzUXfg%3D%3D",
    "retrieve-emailsuccess.js": "retrieve-emailsuccess.js?v=i0%2BV71i9ahrz6ut%2F23%2Bx8g%3D%3D",
    "retrieve-kefu.js": "retrieve-kefu.js?v=tDh9k9h9dcJDzr62ZzlNpw%3D%3D",
    "retrieve-mobile.js": "retrieve-mobile.js?v=prjNVtzq35i0QylxDUVDog%3D%3D",
    "retrieve-password.js": "retrieve-password.js?v=cfHm4dSuUqeUdCSBOGKuuA%3D%3D",
    "retrieve.js": "retrieve.js?v=6ka8cb65%2BQDg2cDnmdEklg%3D%3D",
    "signIn.js": "signIn.js?v=IlnJRhaZty%2Fb%2BuqK0yh9FQ%3D%3D",
    "detector.js": "detector.js?v=%2FEdwHzmvSWa6M2zsqorjzQ%3D%3D",
    "jobdetail.js": "jobdetail.js?v=1OFb4Jn3SwHZY0AtGTpSKQ%3D%3D",
    "share.js": "share.js?v=1UPvMZqUnbKbZvGeHmXzzg%3D%3D",
    "signInFloat.js": "signInFloat.js?v=TOkdr7Fo0FvsmDl4u3e5Cw%3D%3D",
    "about.js": "about.js?v=ewQC8cUW%2B%2B9Bw%2BJ%2FLHrFCA%3D%3D",
    "balance.js": "balance.js?v=V0uk6O%2BLu0FScEND2eQBaA%3D%3D",
    "claims.js": "claims.js?v=s54c0bWNn6Q0MgAu5nyF8g%3D%3D",
    "contact.js": "contact.js?v=l%2FaV%2B3sDaU6ZnBUXG2KdKw%3D%3D",
    "favorite.js": "favorite.js?v=6GPQznoQPfNHtKjMiYoFPg%3D%3D",
    "goldbean.js": "goldbean.js?v=5HRFNskoY%2BEswYmIw6yu6w%3D%3D",
    "myinformation.js": "myinformation.js?v=Pb92n9AlB4HOv4jBWZQHbg%3D%3D",
    "payConfirm.js": "payConfirm.js?v=lkPBmsYit4yU3YrIzrcqIQ%3D%3D",
    "payPost.js": "payPost.js?v=Z1k0ujFxD2ahiWl5PH7%2BNA%3D%3D",
    "paySuccess.js": "paySuccess.js?v=GBHHiVnqKvSYynfY6Mna5g%3D%3D",
    "policydetail.js": "policydetail.js?v=BQwgA5Oe0AqaLb1%2FrnvHLQ%3D%3D",
    "policyquery.js": "policyquery.js?v=hU15TdKAnDabkZwCWDqrpg%3D%3D",
    "policyqueryresult.js": "policyqueryresult.js?v=cJWFwaib1qDTjh0Wky%2F5%2BA%3D%3D",
    "productCustomList.js": "productCustomList.js?v=OKOqzstapKbHeJaY5WatCQ%3D%3D",
    "productCustomListDetail.js": "productCustomListDetail.js?v=LbHn%2F9hF2IKd79ZzQxAukg%3D%3D",
    "redenvelope.js": "redenvelope.js?v=KBUbObHJ5LxWfD0f9%2FJPLw%3D%3D",
    "member.js": "member.js?v=ysgWttpn04Y8OiLMggfqjQ%3D%3D",
    "mypolicy.js": "mypolicy.js?v=geAqJZ46ezGN3Ad8%2Bp4vQA%3D%3D",
    "productCustomDetailTip.js": "productCustomDetailTip.js?v=Upb%2FE75FOZxsc5%2FZGOJo0w%3D%3D",
    "weixin.js": "weixin.js?v=25VjguYOrVZy1SYNzAARMg%3D%3D",
    "hzcommon.js": "hzcommon.js?v=s1NM%2F3o30nhBBjvQgG8o1g%3D%3D",
    "commonProblem.js": "commonProblem.js?v=ckyaLkr4DhMhhFUBhQX%2BOw%3D%3D",
    "customComment.js": "customComment.js?v=uRB0HNdaN1uaCArkIAWYIA%3D%3D",
    "errTip.js": "errTip.js?v=4dwTAD8%2FZkyYiZR%2FtTVTkA%3D%3D",
    "productCustomTerms.js": "productCustomTerms.js?v=d41u2K9pPi7mNZqP58XzLg%3D%3D",
    "topicList.js": "topicList.js?v=gXGuhxVzaZ7IhzY7ivKWOQ%3D%3D",
    "brandIntro.js": "brandIntro.js?v=kR14VZKzAhxVoKBYWJNdpw%3D%3D",
    "T.Input.js": "T.Input.js?v=y72pWv8qW0VaM5fUoFwXag%3D%3D",
    "topicNav.js": "topicNav.js?v=Ptu6sRH0jfH2uaAPDyWDOQ%3D%3D",
    "login-weixin.js": "login-weixin.js?v=6n1mXDxCIi%2Fn1b1TOVLPZA%3D%3D",
    "payProjectConfirm.js": "payProjectConfirm.js?v=lCC6F4lSoqrZq2bevFDJNA%3D%3D",
    "projectInsCompose.js": "projectInsCompose.js?v=Il2cRumhKSwjrzBL%2B7%2Byyw%3D%3D",
    "studyList.js": "studyList.js?v=wOkm7JGWlUDGunnVg%2B4T7w%3D%3D",
    "studyDetail.js": "studyDetail.js?v=qiG0dNlO2H4gV8kwQmtLiA%3D%3D",
    "studySearch.js": "studySearch.js?v=EfT86aE4YurCC7g7Sf%2FxSw%3D%3D",
    "studyTag.js": "studyTag.js?v=2OOyOEQjw0Onm6HwvxkGzQ%3D%3D",
    "studyStag.js": "studyStag.js?v=EMpAhiRLuFE1yNLTM%2BAM2w%3D%3D",
    "studyWord.js": "studyWord.js?v=hIjOy7pFWEAQ8Smae833yQ%3D%3D",
    "studyMap.js": "studyMap.js?v=VVrmwKN%2BunCu9DNjniC4Wg%3D%3D",
    "questionList.js": "questionList.js?v=cA8MAbN5pJOdbA%2FcqylheQ%3D%3D",
    "questionDetail.js": "questionDetail.js?v=hHzRIUKfPyktWwj1qRr%2BhQ%3D%3D",
    "specialList.js": "specialList.js?v=hbf5%2FFKDX9ZGJOqeCyDN0A%3D%3D",
    "specialDetail.js": "specialDetail.js?v=02BjA2oTtXUJUPLeR5rNfA%3D%3D",
    "T-DateSelector.js": "T-DateSelector.js?v=6uP%2BP9kjIwUjqECxjb%2FNPw%3D%3D",
    "T-SelectPagePannel.js": "T-SelectPagePannel.js?v=FPBZDLrxJLE86lCjHSEJLg%3D%3D",
    "T-SelectPannel.js": "T-SelectPannel.js?v=uciO%2BEhVdKVofcg4NN%2BF6Q%3D%3D",
    "T-SlideSelector.js": "T-SlideSelector.js?v=Z3KZ%2FB59B9kLLPn7iISGmg%3D%3D",
    "data.js": "data.js?v=C3XX1A098ruK%2FEh62ZGC%2BA%3D%3D",
    "eval-index.js": "eval-index.js?v=1OXL4OeJ%2BIUpEThGvz2vPg%3D%3D",
    "eval-list.js": "eval-list.js?v=FmbL3lA9xbUI8oyMtM9buA%3D%3D",
    "eval-productList.js": "eval-productList.js?v=oht8CKf%2Fl4nOdayU1aWEVw%3D%3D",
    "eval-projectList.js": "eval-projectList.js?v=6PT7VXcRZwmWG9Au1YvPiA%3D%3D",
    "eval-result.js": "eval-result.js?v=y7H%2F7bHjYXEyb0z9TF19zg%3D%3D",
    "eval-steps.js": "eval-steps.js?v=Ye86pVEtdipFaH5vTCkTbQ%3D%3D",
    "eval-suggest.js": "eval-suggest.js?v=e9vb5OSoO5Q%2F0%2FwAxS%2F2%2BQ%3D%3D",
    "iscroll.js": "iscroll.js?v=GQ6mICdKhmRE2tIyux4x3g%3D%3D",
    "mainNavPanel.js": "mainNavPanel.js?v=T9mi3DIYgQRUIquBsFXjCQ%3D%3D",
    "pay-detail.js": "pay-detail.js?v=P62jBU5%2BuRUXPG7OpXdu%2FA%3D%3D",
    "regularInsureDetail.js": "regularInsureDetail.js?v=w6phYmlcKSjEmoh95hy34A%3D%3D",
    "regularInsureEdit.js": "regularInsureEdit.js?v=dvbJfJ1T0iPz6LzBv5Iceg%3D%3D",
    "regularInsureList.js": "regularInsureList.js?v=cJ1MIA6CUi7YWhd9mlGfdg%3D%3D",
    "template.js": "template.js?v=GdLicr1jk8rHlMg%2FWNwNNQ%3D%3D",
    "zepto.utils.js": "zepto.utils.js?v=Ty7uL2VixnSsnYjRTvrdug%3D%3D",
    "contactUs.js": "contactUs.js?v=Q5GIerEvj%2FBNmRKg3P%2F9oA%3D%3D",
    "familyInfo.js": "familyInfo.js?v=D%2BWxaEftF3flSsmR7jekpw%3D%3D",
    "introduce.js": "introduce.js?v=LV2z63KI18kw95VpauyeNw%3D%3D"
};
var mapArr =[["defaults","?2015-10-15T09:30:00.505Z"],["index.js","index.js?v=lfEJf1bKtHjC6ZNPGynmWQ%3D%3D"],["T.js","T.js?v=Tis57k2xwHSaTs3xxeR5YQ%3D%3D"],["product.js","product.js?v=l7tZ6dXcwYCJYsOw9HcD%2Bg%3D%3D"],["insList.js","insList.js?v=aZAS7%2FZCA1teHsElmA0Xhg%3D%3D"],["clause-detail.js","clause-detail.js?v=jdbfG1bNlr%2BOF1RUWBa%2FqQ%3D%3D"],["clause.js","clause.js?v=4GsLmat6De7Ts3vnhlYJfw%3D%3D"],["comment.js","comment.js?v=0YIZVAAFKxaxWoxCagttlQ%3D%3D"],["detail.js","detail.js?v=dkbTRH3YqaGxeta6RsFykQ%3D%3D"],["needknow.js","needknow.js?v=czAmKEjOTMtURZo%2BiBlQlQ%3D%3D"],["changepassword.js","changepassword.js?v=BSn14WtfGvq9fJTdO%2BF4Pg%3D%3D"],["hztip.js","hztip.js?v=bvtKeqFYMnWCf5gGLV9IzQ%3D%3D"],["insCompose.js","insCompose.js?v=AlNaB4L%2BEfScmzRVH3eDwQ%3D%3D"],["myaccount.js","myaccount.js?v=ctEYIVTWKVOqURH7HQOC0g%3D%3D"],["mysafe.js","mysafe.js?v=c75iTbk9Me4ObiEQBrPuAQ%3D%3D"],["register-password.js","register-password.js?v=6iTotYHF6rXx6%2ByRvlChgA%3D%3D"],["register.js","register.js?v=rNW3ip%2BcsUJXG11hQxQXnA%3D%3D"],["retrieve-email.js","retrieve-email.js?v=g7JPbT9W6HzAii3XMzUXfg%3D%3D"],["retrieve-emailsuccess.js","retrieve-emailsuccess.js?v=i0%2BV71i9ahrz6ut%2F23%2Bx8g%3D%3D"],["retrieve-kefu.js","retrieve-kefu.js?v=tDh9k9h9dcJDzr62ZzlNpw%3D%3D"],["retrieve-mobile.js","retrieve-mobile.js?v=prjNVtzq35i0QylxDUVDog%3D%3D"],["retrieve-password.js","retrieve-password.js?v=cfHm4dSuUqeUdCSBOGKuuA%3D%3D"],["retrieve.js","retrieve.js?v=6ka8cb65%2BQDg2cDnmdEklg%3D%3D"],["signIn.js","signIn.js?v=IlnJRhaZty%2Fb%2BuqK0yh9FQ%3D%3D"],["detector.js","detector.js?v=%2FEdwHzmvSWa6M2zsqorjzQ%3D%3D"],["jobdetail.js","jobdetail.js?v=1OFb4Jn3SwHZY0AtGTpSKQ%3D%3D"],["share.js","share.js?v=1UPvMZqUnbKbZvGeHmXzzg%3D%3D"],["signInFloat.js","signInFloat.js?v=TOkdr7Fo0FvsmDl4u3e5Cw%3D%3D"],["about.js","about.js?v=ewQC8cUW%2B%2B9Bw%2BJ%2FLHrFCA%3D%3D"],["balance.js","balance.js?v=V0uk6O%2BLu0FScEND2eQBaA%3D%3D"],["claims.js","claims.js?v=s54c0bWNn6Q0MgAu5nyF8g%3D%3D"],["contact.js","contact.js?v=l%2FaV%2B3sDaU6ZnBUXG2KdKw%3D%3D"],["favorite.js","favorite.js?v=6GPQznoQPfNHtKjMiYoFPg%3D%3D"],["goldbean.js","goldbean.js?v=5HRFNskoY%2BEswYmIw6yu6w%3D%3D"],["myinformation.js","myinformation.js?v=Pb92n9AlB4HOv4jBWZQHbg%3D%3D"],["payConfirm.js","payConfirm.js?v=lkPBmsYit4yU3YrIzrcqIQ%3D%3D"],["payPost.js","payPost.js?v=Z1k0ujFxD2ahiWl5PH7%2BNA%3D%3D"],["paySuccess.js","paySuccess.js?v=GBHHiVnqKvSYynfY6Mna5g%3D%3D"],["policydetail.js","policydetail.js?v=BQwgA5Oe0AqaLb1%2FrnvHLQ%3D%3D"],["policyquery.js","policyquery.js?v=hU15TdKAnDabkZwCWDqrpg%3D%3D"],["policyqueryresult.js","policyqueryresult.js?v=cJWFwaib1qDTjh0Wky%2F5%2BA%3D%3D"],["productCustomList.js","productCustomList.js?v=OKOqzstapKbHeJaY5WatCQ%3D%3D"],["productCustomListDetail.js","productCustomListDetail.js?v=LbHn%2F9hF2IKd79ZzQxAukg%3D%3D"],["redenvelope.js","redenvelope.js?v=KBUbObHJ5LxWfD0f9%2FJPLw%3D%3D"],["member.js","member.js?v=ysgWttpn04Y8OiLMggfqjQ%3D%3D"],["mypolicy.js","mypolicy.js?v=geAqJZ46ezGN3Ad8%2Bp4vQA%3D%3D"],["productCustomDetailTip.js","productCustomDetailTip.js?v=Upb%2FE75FOZxsc5%2FZGOJo0w%3D%3D"],["weixin.js","weixin.js?v=25VjguYOrVZy1SYNzAARMg%3D%3D"],["hzcommon.js","hzcommon.js?v=s1NM%2F3o30nhBBjvQgG8o1g%3D%3D"],["commonProblem.js","commonProblem.js?v=ckyaLkr4DhMhhFUBhQX%2BOw%3D%3D"],["customComment.js","customComment.js?v=uRB0HNdaN1uaCArkIAWYIA%3D%3D"],["errTip.js","errTip.js?v=4dwTAD8%2FZkyYiZR%2FtTVTkA%3D%3D"],["productCustomTerms.js","productCustomTerms.js?v=d41u2K9pPi7mNZqP58XzLg%3D%3D"],["topicList.js","topicList.js?v=gXGuhxVzaZ7IhzY7ivKWOQ%3D%3D"],["brandIntro.js","brandIntro.js?v=kR14VZKzAhxVoKBYWJNdpw%3D%3D"],["T.Input.js","T.Input.js?v=y72pWv8qW0VaM5fUoFwXag%3D%3D"],["topicNav.js","topicNav.js?v=Ptu6sRH0jfH2uaAPDyWDOQ%3D%3D"],["login-weixin.js","login-weixin.js?v=6n1mXDxCIi%2Fn1b1TOVLPZA%3D%3D"],["payProjectConfirm.js","payProjectConfirm.js?v=lCC6F4lSoqrZq2bevFDJNA%3D%3D"],["projectInsCompose.js","projectInsCompose.js?v=Il2cRumhKSwjrzBL%2B7%2Byyw%3D%3D"],["studyList.js","studyList.js?v=wOkm7JGWlUDGunnVg%2B4T7w%3D%3D"],["studyDetail.js","studyDetail.js?v=qiG0dNlO2H4gV8kwQmtLiA%3D%3D"],["studySearch.js","studySearch.js?v=EfT86aE4YurCC7g7Sf%2FxSw%3D%3D"],["studyTag.js","studyTag.js?v=2OOyOEQjw0Onm6HwvxkGzQ%3D%3D"],["studyStag.js","studyStag.js?v=EMpAhiRLuFE1yNLTM%2BAM2w%3D%3D"],["studyWord.js","studyWord.js?v=hIjOy7pFWEAQ8Smae833yQ%3D%3D"],["studyMap.js","studyMap.js?v=VVrmwKN%2BunCu9DNjniC4Wg%3D%3D"],["questionList.js","questionList.js?v=cA8MAbN5pJOdbA%2FcqylheQ%3D%3D"],["questionDetail.js","questionDetail.js?v=hHzRIUKfPyktWwj1qRr%2BhQ%3D%3D"],["specialList.js","specialList.js?v=hbf5%2FFKDX9ZGJOqeCyDN0A%3D%3D"],["specialDetail.js","specialDetail.js?v=02BjA2oTtXUJUPLeR5rNfA%3D%3D"],["T-DateSelector.js","T-DateSelector.js?v=6uP%2BP9kjIwUjqECxjb%2FNPw%3D%3D"],["T-SelectPagePannel.js","T-SelectPagePannel.js?v=FPBZDLrxJLE86lCjHSEJLg%3D%3D"],["T-SelectPannel.js","T-SelectPannel.js?v=uciO%2BEhVdKVofcg4NN%2BF6Q%3D%3D"],["T-SlideSelector.js","T-SlideSelector.js?v=Z3KZ%2FB59B9kLLPn7iISGmg%3D%3D"],["data.js","data.js?v=C3XX1A098ruK%2FEh62ZGC%2BA%3D%3D"],["eval-index.js","eval-index.js?v=1OXL4OeJ%2BIUpEThGvz2vPg%3D%3D"],["eval-list.js","eval-list.js?v=FmbL3lA9xbUI8oyMtM9buA%3D%3D"],["eval-productList.js","eval-productList.js?v=oht8CKf%2Fl4nOdayU1aWEVw%3D%3D"],["eval-projectList.js","eval-projectList.js?v=6PT7VXcRZwmWG9Au1YvPiA%3D%3D"],["eval-result.js","eval-result.js?v=y7H%2F7bHjYXEyb0z9TF19zg%3D%3D"],["eval-steps.js","eval-steps.js?v=Ye86pVEtdipFaH5vTCkTbQ%3D%3D"],["eval-suggest.js","eval-suggest.js?v=e9vb5OSoO5Q%2F0%2FwAxS%2F2%2BQ%3D%3D"],["iscroll.js","iscroll.js?v=GQ6mICdKhmRE2tIyux4x3g%3D%3D"],["mainNavPanel.js","mainNavPanel.js?v=T9mi3DIYgQRUIquBsFXjCQ%3D%3D"],["pay-detail.js","pay-detail.js?v=P62jBU5%2BuRUXPG7OpXdu%2FA%3D%3D"],["regularInsureDetail.js","regularInsureDetail.js?v=w6phYmlcKSjEmoh95hy34A%3D%3D"],["regularInsureEdit.js","regularInsureEdit.js?v=dvbJfJ1T0iPz6LzBv5Iceg%3D%3D"],["regularInsureList.js","regularInsureList.js?v=cJ1MIA6CUi7YWhd9mlGfdg%3D%3D"],["template.js","template.js?v=GdLicr1jk8rHlMg%2FWNwNNQ%3D%3D"],["zepto.utils.js","zepto.utils.js?v=Ty7uL2VixnSsnYjRTvrdug%3D%3D"],["contactUs.js","contactUs.js?v=Q5GIerEvj%2FBNmRKg3P%2F9oA%3D%3D"],["familyInfo.js","familyInfo.js?v=D%2BWxaEftF3flSsmR7jekpw%3D%3D"],["introduce.js","introduce.js?v=LV2z63KI18kw95VpauyeNw%3D%3D"]];
//</fileConfig>

seajs.config({
    alias: {            
    },
    charset: 'utf-8',
    map: mapArr, 
    charset: 'utf-8'
});

(function () {
    seajs.ResourcePath = location.host;
    seajs.ResCssPath = "http://res.hzins.com/short/hzh5";
    seajs.loadCss = function (cssName) {
        var url = _getFileUrl(cssName);
        document.write('<link rel="stylesheet" href="', seajs.ResCssPath, '/css/' + url + '" />');
    }

    seajs.loadJs = function (jsName) {
        if(jsName.indexOf("http://")!=-1){
            document.write('<script src="'+jsName+'"></script>');
        }else {
            var url = _getFileUrl(jsName);
            document.write('<script src="http://', seajs.ResourcePath, '/js/' + url + '"></script>');
        }
    }
    function _getFileUrl(url) {
        url = Config_FileVersion[url] || url + Config_FileVersion["defaults"];
        return url;
    }
    seajs.loadJs("http://static.huizecdn.com/js/libs/zepto/1.1.6/zepto.min.js");
    seajs.loadJs("zepto.utils.js");
})()

