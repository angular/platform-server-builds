var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined;}else{return get(parent,property,receiver);}}else if("value"in desc){return desc.value;}else{var getter=desc.get;if(getter===undefined){return undefined;}return getter.call(receiver);}};var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}/**
 * @license Angular v4.0.0-beta.8-3c9a46c
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */import{Injectable,Inject,ɵALLOW_MULTIPLE_PLATFORMS,Injector,PLATFORM_INITIALIZER,PLATFORM_ID,ɵDebugDomRootRenderer,isDevMode,RendererFactoryV2,RootRenderer,NgModule,platformCore,createPlatformFactory,Optional,InjectionToken,NgZone,APP_ID,ViewEncapsulation,ApplicationRef,Version}from'@angular/core';import{ɵgetDOM,DOCUMENT,ɵSharedStylesHost,BrowserModule,ɵsetRootDomAdapter,ɵDomAdapter,AnimationDriver,ɵNAMESPACE_URIS,ɵsplitNamespace,ɵisNamespaced,ɵshimHostAttribute,ɵshimContentAttribute,ɵflattenStyles,ɵTRANSITION_ID}from'@angular/platform-browser';import{PlatformLocation,ɵPLATFORM_SERVER_ID}from'@angular/common';import{platformCoreDynamic,CssSelector,SelectorMatcher,DomElementSchemaRegistry}from'@angular/compiler';import{HttpModule,ReadyState,Http,XSRFStrategy,BrowserXhr,RequestOptions,XHRBackend}from'@angular/http';import{Observable}from'rxjs/Observable';import{Subject}from'rxjs/Subject';import*as url from'url';import{filter}from'rxjs/operator/filter';import{first}from'rxjs/operator/first';import{toPromise}from'rxjs/operator/toPromise';/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */var/** @type {?} */parse5=require('parse5');/**
 * Representation of the current platform state.
 *
 * \@experimental
 */var PlatformState=function(){/**
     * @param {?} _doc
     */function PlatformState(_doc){_classCallCheck(this,PlatformState);this._doc=_doc;}/**
     * Renders the current state of the platform to string.
     * @return {?}
     */_createClass(PlatformState,[{key:'renderToString',value:function renderToString(){return ɵgetDOM().getInnerHTML(this._doc);}/**
     * Returns the current DOM state.
     * @return {?}
     */},{key:'getDocument',value:function getDocument(){return this._doc;}}]);return PlatformState;}();PlatformState.decorators=[{type:Injectable}];/** @nocollapse */PlatformState.ctorParameters=function(){return[{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]}];};/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */var/** @type {?} */xhr2=require('xhr2');var ServerXhr=function(){function ServerXhr(){_classCallCheck(this,ServerXhr);}_createClass(ServerXhr,[{key:'build',/**
     * @return {?}
     */value:function build(){return new xhr2.XMLHttpRequest();}}]);return ServerXhr;}();ServerXhr.decorators=[{type:Injectable}];/** @nocollapse */ServerXhr.ctorParameters=function(){return[];};var ServerXsrfStrategy=function(){function ServerXsrfStrategy(){_classCallCheck(this,ServerXsrfStrategy);}_createClass(ServerXsrfStrategy,[{key:'configureRequest',/**
     * @param {?} req
     * @return {?}
     */value:function configureRequest(req){}}]);return ServerXsrfStrategy;}();ServerXsrfStrategy.decorators=[{type:Injectable}];/** @nocollapse */ServerXsrfStrategy.ctorParameters=function(){return[];};var ZoneMacroTaskConnection=function(){/**
     * @param {?} request
     * @param {?} backend
     */function ZoneMacroTaskConnection(request,backend){var _this=this;_classCallCheck(this,ZoneMacroTaskConnection);this.request=request;this.response=new Observable(function(observer){var task=null;var scheduled=false;var sub=null;var savedResult=null;var savedError=null;var scheduleTask=function scheduleTask(_task){task=_task;scheduled=true;_this.lastConnection=backend.createConnection(request);sub=_this.lastConnection.response.subscribe(function(res){return savedResult=res;},function(err){if(!scheduled){throw new Error('invoke twice');}savedError=err;scheduled=false;task.invoke();},function(){if(!scheduled){throw new Error('invoke twice');}scheduled=false;task.invoke();});};var cancelTask=function cancelTask(_task){if(!scheduled){return;}scheduled=false;if(sub){sub.unsubscribe();sub=null;}};var onComplete=function onComplete(){if(savedError!==null){observer.error(savedError);}else{observer.next(savedResult);observer.complete();}};// MockBackend is currently synchronous, which means that if scheduleTask is by
// scheduleMacroTask, the request will hit MockBackend and the response will be
// sent, causing task.invoke() to be called.
var _task=Zone.current.scheduleMacroTask('ZoneMacroTaskConnection.subscribe',onComplete,{},function(){return null;},cancelTask);scheduleTask(_task);return function(){if(scheduled&&task){task.zone.cancelTask(task);scheduled=false;}if(sub){sub.unsubscribe();sub=null;}};});}/**
     * @return {?}
     */_createClass(ZoneMacroTaskConnection,[{key:'readyState',get:function get(){return!!this.lastConnection?this.lastConnection.readyState:ReadyState.Unsent;}}]);return ZoneMacroTaskConnection;}();var ZoneMacroTaskBackend=function(){/**
     * @param {?} backend
     */function ZoneMacroTaskBackend(backend){_classCallCheck(this,ZoneMacroTaskBackend);this.backend=backend;}/**
     * @param {?} request
     * @return {?}
     */_createClass(ZoneMacroTaskBackend,[{key:'createConnection',value:function createConnection(request){return new ZoneMacroTaskConnection(request,this.backend);}}]);return ZoneMacroTaskBackend;}();/**
 * @param {?} xhrBackend
 * @param {?} options
 * @return {?}
 */function httpFactory(xhrBackend,options){var/** @type {?} */macroBackend=new ZoneMacroTaskBackend(xhrBackend);return new Http(macroBackend,options);}var/** @type {?} */SERVER_HTTP_PROVIDERS=[{provide:Http,useFactory:httpFactory,deps:[XHRBackend,RequestOptions]},{provide:BrowserXhr,useClass:ServerXhr},{provide:XSRFStrategy,useClass:ServerXsrfStrategy}];/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */var/** @type {?} */globalScope=void 0;if(typeof window==='undefined'){if(typeof WorkerGlobalScope!=='undefined'&&self instanceof WorkerGlobalScope){// TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
globalScope=self;}else{globalScope=global;}}else{globalScope=window;}/**
 * @param {?} fn
 * @return {?}
 */function scheduleMicroTask(fn){Zone.current.scheduleMicroTask('scheduleMicrotask',fn);}// Need to declare a new variable for global here since TypeScript
// exports the original value of the symbol.
var/** @type {?} */global$1=globalScope;// TODO: remove calls to assert in production environment
// Note: Can't just export this and import in in other files
// as `assert` is a reserved keyword in Dart
global$1.assert=function assert(condition){// TODO: to be fixed properly via #2830, noop for now
};/**
 * @param {?} obj
 * @return {?}
 */function isPresent(obj){return obj!=null;}/**
 * @param {?} obj
 * @return {?}
 */function isBlank(obj){return obj==null;}/**
 * @param {?} token
 * @return {?}
 */function stringify(token){if(typeof token==='string'){return token;}if(token==null){return''+token;}if(token.overriddenName){return''+token.overriddenName;}if(token.name){return''+token.name;}var/** @type {?} */res=token.toString();var/** @type {?} */newLineIndex=res.indexOf('\n');return newLineIndex===-1?res:res.substring(0,newLineIndex);}/**
 * @param {?} global
 * @param {?} path
 * @param {?} value
 * @return {?}
 */function setValueOnPath(global,path,value){var/** @type {?} */parts=path.split('.');var/** @type {?} */obj=global;while(parts.length>1){var/** @type {?} */name=parts.shift();if(obj.hasOwnProperty(name)&&obj[name]!=null){obj=obj[name];}else{obj=obj[name]={};}}if(obj===undefined||obj===null){obj={};}obj[parts.shift()]=value;}/**
 * The DI token for setting the initial config for the platform.
 *
 * @experimental
 */var/** @type {?} */INITIAL_CONFIG=new InjectionToken('Server.INITIAL_CONFIG');/**
 * @param {?} urlStr
 * @return {?}
 */function parseUrl(urlStr){var/** @type {?} */parsedUrl=url.parse(urlStr);return{pathname:parsedUrl.pathname||'',search:parsedUrl.search||'',hash:parsedUrl.hash||''};}/**
 * Server-side implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */var ServerPlatformLocation=function(){/**
     * @param {?} _doc
     * @param {?} _config
     */function ServerPlatformLocation(_doc,_config){_classCallCheck(this,ServerPlatformLocation);this._doc=_doc;this._path='/';this._search='';this._hash='';this._hashUpdate=new Subject();var config=_config;if(!!config&&!!config.url){var parsedUrl=parseUrl(config.url);this._path=parsedUrl.pathname;this._search=parsedUrl.search;this._hash=parsedUrl.hash;}}/**
     * @return {?}
     */_createClass(ServerPlatformLocation,[{key:'getBaseHrefFromDOM',value:function getBaseHrefFromDOM(){return ɵgetDOM().getBaseHref(this._doc);}/**
     * @param {?} fn
     * @return {?}
     */},{key:'onPopState',value:function onPopState(fn){}// No-op: a state stack is not implemented, so
// no events will ever come.
/**
     * @param {?} fn
     * @return {?}
     */},{key:'onHashChange',value:function onHashChange(fn){this._hashUpdate.subscribe(fn);}/**
     * @return {?}
     */},{key:'setHash',/**
     * @param {?} value
     * @param {?} oldUrl
     * @return {?}
     */value:function setHash(value,oldUrl){var _this2=this;if(this._hash===value){// Don't fire events if the hash has not changed.
return;}this._hash=value;var/** @type {?} */newUrl=this.url;scheduleMicroTask(function(){return _this2._hashUpdate.next(/** @type {?} */{type:'hashchange',oldUrl:oldUrl,newUrl:newUrl});});}/**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */},{key:'replaceState',value:function replaceState(state,title,newUrl){var/** @type {?} */oldUrl=this.url;var/** @type {?} */parsedUrl=parseUrl(newUrl);this._path=parsedUrl.pathname;this._search=parsedUrl.search;this.setHash(parsedUrl.hash,oldUrl);}/**
     * @param {?} state
     * @param {?} title
     * @param {?} newUrl
     * @return {?}
     */},{key:'pushState',value:function pushState(state,title,newUrl){this.replaceState(state,title,newUrl);}/**
     * @return {?}
     */},{key:'forward',value:function forward(){throw new Error('Not implemented');}/**
     * @return {?}
     */},{key:'back',value:function back(){throw new Error('Not implemented');}},{key:'pathname',get:function get(){return this._path;}/**
     * @return {?}
     */},{key:'search',get:function get(){return this._search;}/**
     * @return {?}
     */},{key:'hash',get:function get(){return this._hash;}/**
     * @return {?}
     */},{key:'url',get:function get(){return''+this.pathname+this.search+this.hash;}}]);return ServerPlatformLocation;}();ServerPlatformLocation.decorators=[{type:Injectable}];/** @nocollapse */ServerPlatformLocation.ctorParameters=function(){return[{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:undefined,decorators:[{type:Optional},{type:Inject,args:[INITIAL_CONFIG]}]}];};var ListWrapper=function(){function ListWrapper(){_classCallCheck(this,ListWrapper);}_createClass(ListWrapper,null,[{key:'findLast',/**
     * @param {?} arr
     * @param {?} condition
     * @return {?}
     */value:function findLast(arr,condition){for(var/** @type {?} */i=arr.length-1;i>=0;i--){if(condition(arr[i])){return arr[i];}}return null;}/**
     * @param {?} list
     * @param {?} items
     * @return {?}
     */},{key:'removeAll',value:function removeAll(list,items){for(var/** @type {?} */i=0;i<items.length;++i){var/** @type {?} */index=list.indexOf(items[i]);if(index>-1){list.splice(index,1);}}}/**
     * @param {?} list
     * @param {?} el
     * @return {?}
     */},{key:'remove',value:function remove(list,el){var/** @type {?} */index=list.indexOf(el);if(index>-1){list.splice(index,1);return true;}return false;}/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */},{key:'equals',value:function equals(a,b){if(a.length!=b.length)return false;for(var/** @type {?} */i=0;i<a.length;++i){if(a[i]!==b[i])return false;}return true;}/**
     * @param {?} list
     * @return {?}
     */},{key:'flatten',value:function flatten(list){return list.reduce(function(flat,item){var/** @type {?} */flatItem=Array.isArray(item)?ListWrapper.flatten(item):item;return flat.concat(flatItem);},[]);}}]);return ListWrapper;}();/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */var/** @type {?} */parse5$1=require('parse5');var/** @type {?} */treeAdapter=void 0;var/** @type {?} */_attrToPropMap={'class':'className','innerHtml':'innerHTML','readonly':'readOnly','tabindex':'tabIndex'};var/** @type {?} */mapProps=['attribs','x-attribsNamespace','x-attribsPrefix'];/**
 * @param {?} methodName
 * @return {?}
 */function _notImplemented(methodName){return new Error('This method is not implemented in Parse5DomAdapter: '+methodName);}/**
 * Parses a document string to a Document object.
 * @param {?} html
 * @return {?}
 */function parseDocument(html){return parse5$1.parse(html,{treeAdapter:parse5$1.treeAdapters.htmlparser2});}/**
 * A `DomAdapter` powered by the `parse5` NodeJS module.
 *
 * \@security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */var Parse5DomAdapter=function(_DomAdapter){_inherits(Parse5DomAdapter,_DomAdapter);function Parse5DomAdapter(){_classCallCheck(this,Parse5DomAdapter);return _possibleConstructorReturn(this,(Parse5DomAdapter.__proto__||Object.getPrototypeOf(Parse5DomAdapter)).apply(this,arguments));}_createClass(Parse5DomAdapter,[{key:'hasProperty',/**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */value:function hasProperty(element,name){return _HTMLElementPropertyList.indexOf(name)>-1;}/**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */},{key:'setProperty',value:function setProperty(el,name,value){if(name==='innerHTML'){this.setInnerHTML(el,value);}else if(name==='className'){el.attribs['class']=el.className=value;}else{el[name]=value;}}/**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */},{key:'getProperty',value:function getProperty(el,name){return el[name];}/**
     * @param {?} error
     * @return {?}
     */},{key:'logError',value:function logError(error){console.error(error);}/**
     * @param {?} error
     * @return {?}
     */},{key:'log',value:function log(error){console.log(error);}/**
     * @param {?} error
     * @return {?}
     */},{key:'logGroup',value:function logGroup(error){console.error(error);}/**
     * @return {?}
     */},{key:'logGroupEnd',value:function logGroupEnd(){}/**
     * @return {?}
     */},{key:'querySelector',/**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */value:function querySelector(el,selector){return this.querySelectorAll(el,selector)[0];}/**
     * @param {?} el
     * @param {?} selector
     * @return {?}
     */},{key:'querySelectorAll',value:function querySelectorAll(el,selector){var _this4=this;var/** @type {?} */res=[];var/** @type {?} */_recursive=function _recursive(result,node,selector,matcher){var/** @type {?} */cNodes=node.childNodes;if(cNodes&&cNodes.length>0){for(var/** @type {?} */i=0;i<cNodes.length;i++){var/** @type {?} */childNode=cNodes[i];if(_this4.elementMatches(childNode,selector,matcher)){result.push(childNode);}_recursive(result,childNode,selector,matcher);}}};var/** @type {?} */matcher=new SelectorMatcher();matcher.addSelectables(CssSelector.parse(selector));_recursive(res,el,selector,matcher);return res;}/**
     * @param {?} node
     * @param {?} selector
     * @param {?=} matcher
     * @return {?}
     */},{key:'elementMatches',value:function elementMatches(node,selector){var matcher=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;if(this.isElementNode(node)&&selector==='*'){return true;}var/** @type {?} */result=false;if(selector&&selector.charAt(0)=='#'){result=this.getAttribute(node,'id')==selector.substring(1);}else if(selector){if(!matcher){matcher=new SelectorMatcher();matcher.addSelectables(CssSelector.parse(selector));}var/** @type {?} */cssSelector=new CssSelector();cssSelector.setElement(this.tagName(node));if(node.attribs){for(var/** @type {?} */attrName in node.attribs){cssSelector.addAttribute(attrName,node.attribs[attrName]);}}var/** @type {?} */classList=this.classList(node);for(var/** @type {?} */i=0;i<classList.length;i++){cssSelector.addClassName(classList[i]);}matcher.match(cssSelector,function(selector,cb){result=true;});}return result;}/**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */},{key:'on',value:function on(el,evt,listener){var/** @type {?} */listenersMap=el._eventListenersMap;if(!listenersMap){listenersMap={};el._eventListenersMap=listenersMap;}var/** @type {?} */listeners=listenersMap[evt]||[];listenersMap[evt]=[].concat(_toConsumableArray(listeners),[listener]);}/**
     * @param {?} el
     * @param {?} evt
     * @param {?} listener
     * @return {?}
     */},{key:'onAndCancel',value:function onAndCancel(el,evt,listener){this.on(el,evt,listener);return function(){ListWrapper.remove(/** @type {?} */el._eventListenersMap[evt],listener);};}/**
     * @param {?} el
     * @param {?} evt
     * @return {?}
     */},{key:'dispatchEvent',value:function dispatchEvent(el,evt){if(!evt.target){evt.target=el;}if(el._eventListenersMap){var/** @type {?} */listeners=el._eventListenersMap[evt.type];if(listeners){for(var/** @type {?} */i=0;i<listeners.length;i++){listeners[i](evt);}}}if(el.parent){this.dispatchEvent(el.parent,evt);}if(el._window){this.dispatchEvent(el._window,evt);}}/**
     * @param {?} eventType
     * @return {?}
     */},{key:'createMouseEvent',value:function createMouseEvent(eventType){return this.createEvent(eventType);}/**
     * @param {?} eventType
     * @return {?}
     */},{key:'createEvent',value:function createEvent(eventType){var/** @type {?} */event={type:eventType,defaultPrevented:false,preventDefault:function preventDefault(){event.defaultPrevented=true;}};return event;}/**
     * @param {?} event
     * @return {?}
     */},{key:'preventDefault',value:function preventDefault(event){event.returnValue=false;}/**
     * @param {?} event
     * @return {?}
     */},{key:'isPrevented',value:function isPrevented(event){return isPresent(event.returnValue)&&!event.returnValue;}/**
     * @param {?} el
     * @return {?}
     */},{key:'getInnerHTML',value:function getInnerHTML(el){return parse5$1.serialize(this.templateAwareRoot(el),{treeAdapter:treeAdapter});}/**
     * @param {?} el
     * @return {?}
     */},{key:'getTemplateContent',value:function getTemplateContent(el){return null;}/**
     * @param {?} el
     * @return {?}
     */},{key:'getOuterHTML',value:function getOuterHTML(el){var/** @type {?} */fragment=treeAdapter.createDocumentFragment();this.appendChild(fragment,el);return parse5$1.serialize(fragment,{treeAdapter:treeAdapter});}/**
     * @param {?} node
     * @return {?}
     */},{key:'nodeName',value:function nodeName(node){return node.tagName;}/**
     * @param {?} node
     * @return {?}
     */},{key:'nodeValue',value:function nodeValue(node){return node.nodeValue;}/**
     * @param {?} node
     * @return {?}
     */},{key:'type',value:function type(node){throw _notImplemented('type');}/**
     * @param {?} node
     * @return {?}
     */},{key:'content',value:function content(node){return node.childNodes[0];}/**
     * @param {?} el
     * @return {?}
     */},{key:'firstChild',value:function firstChild(el){return el.firstChild;}/**
     * @param {?} el
     * @return {?}
     */},{key:'nextSibling',value:function nextSibling(el){return el.nextSibling;}/**
     * @param {?} el
     * @return {?}
     */},{key:'parentElement',value:function parentElement(el){return el.parent;}/**
     * @param {?} el
     * @return {?}
     */},{key:'childNodes',value:function childNodes(el){return el.childNodes;}/**
     * @param {?} el
     * @return {?}
     */},{key:'childNodesAsList',value:function childNodesAsList(el){var/** @type {?} */childNodes=el.childNodes;var/** @type {?} */res=new Array(childNodes.length);for(var/** @type {?} */i=0;i<childNodes.length;i++){res[i]=childNodes[i];}return res;}/**
     * @param {?} el
     * @return {?}
     */},{key:'clearNodes',value:function clearNodes(el){while(el.childNodes.length>0){this.remove(el.childNodes[0]);}}/**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */},{key:'appendChild',value:function appendChild(el,node){this.remove(node);treeAdapter.appendChild(this.templateAwareRoot(el),node);}/**
     * @param {?} el
     * @param {?} node
     * @return {?}
     */},{key:'removeChild',value:function removeChild(el,node){if(el.childNodes.indexOf(node)>-1){this.remove(node);}}/**
     * @param {?} el
     * @return {?}
     */},{key:'remove',value:function remove(el){var/** @type {?} */parent=el.parent;if(parent){var/** @type {?} */index=parent.childNodes.indexOf(el);parent.childNodes.splice(index,1);}var/** @type {?} */prev=el.previousSibling;var/** @type {?} */next=el.nextSibling;if(prev){prev.next=next;}if(next){next.prev=prev;}el.prev=null;el.next=null;el.parent=null;return el;}/**
     * @param {?} parent
     * @param {?} ref
     * @param {?} newNode
     * @return {?}
     */},{key:'insertBefore',value:function insertBefore(parent,ref,newNode){this.remove(newNode);if(ref){treeAdapter.insertBefore(parent,newNode,ref);}else{this.appendChild(parent,newNode);}}/**
     * @param {?} parent
     * @param {?} ref
     * @param {?} nodes
     * @return {?}
     */},{key:'insertAllBefore',value:function insertAllBefore(parent,ref,nodes){var _this5=this;nodes.forEach(function(n){return _this5.insertBefore(parent,ref,n);});}/**
     * @param {?} parent
     * @param {?} ref
     * @param {?} node
     * @return {?}
     */},{key:'insertAfter',value:function insertAfter(parent,ref,node){if(ref.nextSibling){this.insertBefore(parent,ref.nextSibling,node);}else{this.appendChild(parent,node);}}/**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */},{key:'setInnerHTML',value:function setInnerHTML(el,value){this.clearNodes(el);var/** @type {?} */content=parse5$1.parseFragment(value,{treeAdapter:treeAdapter});for(var/** @type {?} */i=0;i<content.childNodes.length;i++){treeAdapter.appendChild(el,content.childNodes[i]);}}/**
     * @param {?} el
     * @param {?=} isRecursive
     * @return {?}
     */},{key:'getText',value:function getText(el,isRecursive){if(this.isTextNode(el)){return el.data;}if(this.isCommentNode(el)){// In the DOM, comments within an element return an empty string for textContent
// However, comment node instances return the comment content for textContent getter
return isRecursive?'':el.data;}if(!el.childNodes||el.childNodes.length==0){return'';}var/** @type {?} */textContent='';for(var/** @type {?} */i=0;i<el.childNodes.length;i++){textContent+=this.getText(el.childNodes[i],true);}return textContent;}/**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */},{key:'setText',value:function setText(el,value){if(this.isTextNode(el)||this.isCommentNode(el)){el.data=value;}else{this.clearNodes(el);if(value!=='')treeAdapter.insertText(el,value);}}/**
     * @param {?} el
     * @return {?}
     */},{key:'getValue',value:function getValue(el){return el.value;}/**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */},{key:'setValue',value:function setValue(el,value){el.value=value;}/**
     * @param {?} el
     * @return {?}
     */},{key:'getChecked',value:function getChecked(el){return el.checked;}/**
     * @param {?} el
     * @param {?} value
     * @return {?}
     */},{key:'setChecked',value:function setChecked(el,value){el.checked=value;}/**
     * @param {?} text
     * @return {?}
     */},{key:'createComment',value:function createComment(text){return treeAdapter.createCommentNode(text);}/**
     * @param {?} html
     * @return {?}
     */},{key:'createTemplate',value:function createTemplate(html){var/** @type {?} */template=treeAdapter.createElement('template','http://www.w3.org/1999/xhtml',[]);var/** @type {?} */content=parse5$1.parseFragment(html,{treeAdapter:treeAdapter});treeAdapter.setTemplateContent(template,content);return template;}/**
     * @param {?} tagName
     * @return {?}
     */},{key:'createElement',value:function createElement(tagName){return treeAdapter.createElement(tagName,'http://www.w3.org/1999/xhtml',[]);}/**
     * @param {?} ns
     * @param {?} tagName
     * @return {?}
     */},{key:'createElementNS',value:function createElementNS(ns,tagName){return treeAdapter.createElement(tagName,ns,[]);}/**
     * @param {?} text
     * @return {?}
     */},{key:'createTextNode',value:function createTextNode(text){var/** @type {?} */t=this.createComment(text);t.type='text';return t;}/**
     * @param {?} attrName
     * @param {?} attrValue
     * @return {?}
     */},{key:'createScriptTag',value:function createScriptTag(attrName,attrValue){return treeAdapter.createElement('script','http://www.w3.org/1999/xhtml',[{name:attrName,value:attrValue}]);}/**
     * @param {?} css
     * @return {?}
     */},{key:'createStyleElement',value:function createStyleElement(css){var/** @type {?} */style=this.createElement('style');this.setText(style,css);return style;}/**
     * @param {?} el
     * @return {?}
     */},{key:'createShadowRoot',value:function createShadowRoot(el){el.shadowRoot=treeAdapter.createDocumentFragment();el.shadowRoot.parent=el;return el.shadowRoot;}/**
     * @param {?} el
     * @return {?}
     */},{key:'getShadowRoot',value:function getShadowRoot(el){return el.shadowRoot;}/**
     * @param {?} el
     * @return {?}
     */},{key:'getHost',value:function getHost(el){return el.host;}/**
     * @param {?} el
     * @return {?}
     */},{key:'getDistributedNodes',value:function getDistributedNodes(el){throw _notImplemented('getDistributedNodes');}/**
     * @param {?} node
     * @return {?}
     */},{key:'clone',value:function clone(node){var/** @type {?} */_recursive=function _recursive(node){var/** @type {?} */nodeClone=Object.create(Object.getPrototypeOf(node));for(var/** @type {?} */prop in node){var/** @type {?} */desc=Object.getOwnPropertyDescriptor(node,prop);if(desc&&'value'in desc&&_typeof(desc.value)!=='object'){nodeClone[prop]=node[prop];}}nodeClone.parent=null;nodeClone.prev=null;nodeClone.next=null;nodeClone.children=null;mapProps.forEach(function(mapName){if(isPresent(node[mapName])){nodeClone[mapName]={};for(var/** @type {?} */_prop in node[mapName]){nodeClone[mapName][_prop]=node[mapName][_prop];}}});var/** @type {?} */cNodes=node.children;if(cNodes){var/** @type {?} */cNodesClone=new Array(cNodes.length);for(var/** @type {?} */i=0;i<cNodes.length;i++){var/** @type {?} */childNode=cNodes[i];var/** @type {?} */childNodeClone=_recursive(childNode);cNodesClone[i]=childNodeClone;if(i>0){childNodeClone.prev=cNodesClone[i-1];cNodesClone[i-1].next=childNodeClone;}childNodeClone.parent=nodeClone;}nodeClone.children=cNodesClone;}return nodeClone;};return _recursive(node);}/**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */},{key:'getElementsByClassName',value:function getElementsByClassName(element,name){return this.querySelectorAll(element,'.'+name);}/**
     * @param {?} element
     * @param {?} name
     * @return {?}
     */},{key:'getElementsByTagName',value:function getElementsByTagName(element,name){return this.querySelectorAll(element,name);}/**
     * @param {?} element
     * @return {?}
     */},{key:'classList',value:function classList(element){var/** @type {?} */classAttrValue=null;var/** @type {?} */attributes=element.attribs;if(attributes&&attributes['class']!=null){classAttrValue=attributes['class'];}return classAttrValue?classAttrValue.trim().split(/\s+/g):[];}/**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */},{key:'addClass',value:function addClass(element,className){var/** @type {?} */classList=this.classList(element);var/** @type {?} */index=classList.indexOf(className);if(index==-1){classList.push(className);element.attribs['class']=element.className=classList.join(' ');}}/**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */},{key:'removeClass',value:function removeClass(element,className){var/** @type {?} */classList=this.classList(element);var/** @type {?} */index=classList.indexOf(className);if(index>-1){classList.splice(index,1);element.attribs['class']=element.className=classList.join(' ');}}/**
     * @param {?} element
     * @param {?} className
     * @return {?}
     */},{key:'hasClass',value:function hasClass(element,className){return this.classList(element).indexOf(className)>-1;}/**
     * @param {?} element
     * @param {?} styleName
     * @param {?=} styleValue
     * @return {?}
     */},{key:'hasStyle',value:function hasStyle(element,styleName){var styleValue=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var/** @type {?} */value=this.getStyle(element,styleName)||'';return styleValue?value==styleValue:value.length>0;}/**
     * \@internal
     * @param {?} element
     * @return {?}
     */},{key:'_readStyleAttribute',value:function _readStyleAttribute(element){var/** @type {?} */styleMap={};var/** @type {?} */attributes=element.attribs;if(attributes&&attributes['style']!=null){var/** @type {?} */styleAttrValue=attributes['style'];var/** @type {?} */styleList=styleAttrValue.split(/;+/g);for(var/** @type {?} */i=0;i<styleList.length;i++){if(styleList[i].length>0){var/** @type {?} */elems=styleList[i].split(/:+/g);styleMap[elems[0].trim()]=elems[1].trim();}}}return styleMap;}/**
     * \@internal
     * @param {?} element
     * @param {?} styleMap
     * @return {?}
     */},{key:'_writeStyleAttribute',value:function _writeStyleAttribute(element,styleMap){var/** @type {?} */styleAttrValue='';for(var/** @type {?} */key in styleMap){var/** @type {?} */newValue=styleMap[key];if(newValue){styleAttrValue+=key+':'+styleMap[key]+';';}}element.attribs['style']=styleAttrValue;}/**
     * @param {?} element
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */},{key:'setStyle',value:function setStyle(element,styleName,styleValue){var/** @type {?} */styleMap=this._readStyleAttribute(element);styleMap[styleName]=styleValue;this._writeStyleAttribute(element,styleMap);}/**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */},{key:'removeStyle',value:function removeStyle(element,styleName){this.setStyle(element,styleName,null);}/**
     * @param {?} element
     * @param {?} styleName
     * @return {?}
     */},{key:'getStyle',value:function getStyle(element,styleName){var/** @type {?} */styleMap=this._readStyleAttribute(element);return styleMap.hasOwnProperty(styleName)?styleMap[styleName]:'';}/**
     * @param {?} element
     * @return {?}
     */},{key:'tagName',value:function tagName(element){return element.tagName=='style'?'STYLE':element.tagName;}/**
     * @param {?} element
     * @return {?}
     */},{key:'attributeMap',value:function attributeMap(element){var/** @type {?} */res=new Map();var/** @type {?} */elAttrs=treeAdapter.getAttrList(element);for(var/** @type {?} */i=0;i<elAttrs.length;i++){var/** @type {?} */attrib=elAttrs[i];res.set(attrib.name,attrib.value);}return res;}/**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */},{key:'hasAttribute',value:function hasAttribute(element,attribute){return element.attribs&&element.attribs[attribute]!=null;}/**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */},{key:'hasAttributeNS',value:function hasAttributeNS(element,ns,attribute){throw'not implemented';}/**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */},{key:'getAttribute',value:function getAttribute(element,attribute){return this.hasAttribute(element,attribute)?element.attribs[attribute]:null;}/**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @return {?}
     */},{key:'getAttributeNS',value:function getAttributeNS(element,ns,attribute){throw'not implemented';}/**
     * @param {?} element
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */},{key:'setAttribute',value:function setAttribute(element,attribute,value){if(attribute){element.attribs[attribute]=value;if(attribute==='class'){element.className=value;}}}/**
     * @param {?} element
     * @param {?} ns
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */},{key:'setAttributeNS',value:function setAttributeNS(element,ns,attribute,value){throw'not implemented';}/**
     * @param {?} element
     * @param {?} attribute
     * @return {?}
     */},{key:'removeAttribute',value:function removeAttribute(element,attribute){if(attribute){delete element.attribs[attribute];}}/**
     * @param {?} element
     * @param {?} ns
     * @param {?} name
     * @return {?}
     */},{key:'removeAttributeNS',value:function removeAttributeNS(element,ns,name){throw'not implemented';}/**
     * @param {?} el
     * @return {?}
     */},{key:'templateAwareRoot',value:function templateAwareRoot(el){return this.isTemplateElement(el)?treeAdapter.getTemplateContent(el):el;}/**
     * @return {?}
     */},{key:'createHtmlDocument',value:function createHtmlDocument(){var/** @type {?} */newDoc=treeAdapter.createDocument();newDoc.title='fakeTitle';var/** @type {?} */head=treeAdapter.createElement('head',null,[]);var/** @type {?} */body=treeAdapter.createElement('body','http://www.w3.org/1999/xhtml',[]);this.appendChild(newDoc,head);this.appendChild(newDoc,body);newDoc['head']=head;newDoc['body']=body;newDoc['_window']={};return newDoc;}/**
     * @param {?} el
     * @return {?}
     */},{key:'getBoundingClientRect',value:function getBoundingClientRect(el){return{left:0,top:0,width:0,height:0};}/**
     * @param {?} doc
     * @return {?}
     */},{key:'getTitle',value:function getTitle(doc){return doc.title||'';}/**
     * @param {?} doc
     * @param {?} newTitle
     * @return {?}
     */},{key:'setTitle',value:function setTitle(doc,newTitle){doc.title=newTitle;}/**
     * @param {?} el
     * @return {?}
     */},{key:'isTemplateElement',value:function isTemplateElement(el){return this.isElementNode(el)&&this.tagName(el)==='template';}/**
     * @param {?} node
     * @return {?}
     */},{key:'isTextNode',value:function isTextNode(node){return treeAdapter.isTextNode(node);}/**
     * @param {?} node
     * @return {?}
     */},{key:'isCommentNode',value:function isCommentNode(node){return treeAdapter.isCommentNode(node);}/**
     * @param {?} node
     * @return {?}
     */},{key:'isElementNode',value:function isElementNode(node){return node?treeAdapter.isElementNode(node):false;}/**
     * @param {?} node
     * @return {?}
     */},{key:'hasShadowRoot',value:function hasShadowRoot(node){return isPresent(node.shadowRoot);}/**
     * @param {?} node
     * @return {?}
     */},{key:'isShadowRoot',value:function isShadowRoot(node){return this.getShadowRoot(node)==node;}/**
     * @param {?} node
     * @return {?}
     */},{key:'importIntoDoc',value:function importIntoDoc(node){return this.clone(node);}/**
     * @param {?} node
     * @return {?}
     */},{key:'adoptNode',value:function adoptNode(node){return node;}/**
     * @param {?} el
     * @return {?}
     */},{key:'getHref',value:function getHref(el){return el.href;}/**
     * @param {?} el
     * @param {?} baseUrl
     * @param {?} href
     * @return {?}
     */},{key:'resolveAndSetHref',value:function resolveAndSetHref(el,baseUrl,href){if(href==null){el.href=baseUrl;}else{el.href=baseUrl+'/../'+href;}}/**
     * \@internal
     * @param {?} parsedRules
     * @param {?=} css
     * @return {?}
     */},{key:'_buildRules',value:function _buildRules(parsedRules,css){var/** @type {?} */rules=[];for(var/** @type {?} */i=0;i<parsedRules.length;i++){var/** @type {?} */parsedRule=parsedRules[i];var/** @type {?} */rule={};rule['cssText']=css;rule['style']={content:'',cssText:''};if(parsedRule.type=='rule'){rule['type']=1;rule['selectorText']=parsedRule.selectors.join(', '.replace(/\s{2,}/g,' ').replace(/\s*~\s*/g,' ~ ').replace(/\s*\+\s*/g,' + ').replace(/\s*>\s*/g,' > ').replace(/\[(\w+)=(\w+)\]/g,'[$1="$2"]'));if(isBlank(parsedRule.declarations)){continue;}for(var/** @type {?} */j=0;j<parsedRule.declarations.length;j++){var/** @type {?} */declaration=parsedRule.declarations[j];rule['style']=declaration.property[declaration.value];rule['style'].cssText+=declaration.property+': '+declaration.value+';';}}else if(parsedRule.type=='media'){rule['type']=4;rule['media']={mediaText:parsedRule.media};if(parsedRule.rules){rule['cssRules']=this._buildRules(parsedRule.rules);}}rules.push(rule);}return rules;}/**
     * @return {?}
     */},{key:'supportsDOMEvents',value:function supportsDOMEvents(){return false;}/**
     * @return {?}
     */},{key:'supportsNativeShadowDOM',value:function supportsNativeShadowDOM(){return false;}/**
     * @param {?} doc
     * @param {?} target
     * @return {?}
     */},{key:'getGlobalEventTarget',value:function getGlobalEventTarget(doc,target){if(target=='window'){return doc._window;}else if(target=='document'){return doc;}else if(target=='body'){return doc.body;}}/**
     * @param {?} doc
     * @return {?}
     */},{key:'getBaseHref',value:function getBaseHref(doc){var/** @type {?} */base=this.querySelector(doc,'base');var/** @type {?} */href='';if(base){href=this.getHref(base);}// TODO(alxhub): Need relative path logic from BrowserDomAdapter here?
return isBlank(href)?null:href;}/**
     * @return {?}
     */},{key:'resetBaseElement',value:function resetBaseElement(){throw'not implemented';}/**
     * @return {?}
     */},{key:'getHistory',value:function getHistory(){throw'not implemented';}/**
     * @return {?}
     */},{key:'getLocation',value:function getLocation(){throw'not implemented';}/**
     * @return {?}
     */},{key:'getUserAgent',value:function getUserAgent(){return'Fake user agent';}/**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */},{key:'getData',value:function getData(el,name){return this.getAttribute(el,'data-'+name);}/**
     * @param {?} el
     * @return {?}
     */},{key:'getComputedStyle',value:function getComputedStyle(el){throw'not implemented';}/**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */},{key:'setData',value:function setData(el,name,value){this.setAttribute(el,'data-'+name,value);}/**
     * @param {?} path
     * @param {?} value
     * @return {?}
     */},{key:'setGlobalVar',value:function setGlobalVar(path,value){setValueOnPath(global$1,path,value);}/**
     * @return {?}
     */},{key:'supportsWebAnimation',value:function supportsWebAnimation(){return false;}/**
     * @return {?}
     */},{key:'performanceNow',value:function performanceNow(){return Date.now();}/**
     * @return {?}
     */},{key:'getAnimationPrefix',value:function getAnimationPrefix(){return'';}/**
     * @return {?}
     */},{key:'getTransitionEnd',value:function getTransitionEnd(){return'transitionend';}/**
     * @return {?}
     */},{key:'supportsAnimation',value:function supportsAnimation(){return true;}/**
     * @param {?} el
     * @param {?} newNode
     * @param {?} oldNode
     * @return {?}
     */},{key:'replaceChild',value:function replaceChild(el,newNode,oldNode){throw new Error('not implemented');}/**
     * @param {?} templateHtml
     * @return {?}
     */},{key:'parse',value:function parse(templateHtml){throw new Error('not implemented');}/**
     * @param {?} el
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */},{key:'invoke',value:function invoke(el,methodName,args){throw new Error('not implemented');}/**
     * @param {?} event
     * @return {?}
     */},{key:'getEventKey',value:function getEventKey(event){throw new Error('not implemented');}/**
     * @return {?}
     */},{key:'supportsCookies',value:function supportsCookies(){return false;}/**
     * @param {?} name
     * @return {?}
     */},{key:'getCookie',value:function getCookie(name){throw new Error('not implemented');}/**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */},{key:'setCookie',value:function setCookie(name,value){throw new Error('not implemented');}/**
     * @param {?} element
     * @param {?} keyframes
     * @param {?} options
     * @return {?}
     */},{key:'animate',value:function animate(element,keyframes,options){throw new Error('not implemented');}},{key:'attrToPropMap',get:function get(){return _attrToPropMap;}}],[{key:'makeCurrent',/**
     * @return {?}
     */value:function makeCurrent(){treeAdapter=parse5$1.treeAdapters.htmlparser2;ɵsetRootDomAdapter(new Parse5DomAdapter());}}]);return Parse5DomAdapter;}(ɵDomAdapter);// TODO: build a proper list, this one is all the keys of a HTMLInputElement
var/** @type {?} */_HTMLElementPropertyList=['webkitEntries','incremental','webkitdirectory','selectionDirection','selectionEnd','selectionStart','labels','validationMessage','validity','willValidate','width','valueAsNumber','valueAsDate','value','useMap','defaultValue','type','step','src','size','required','readOnly','placeholder','pattern','name','multiple','min','minLength','maxLength','max','list','indeterminate','height','formTarget','formNoValidate','formMethod','formEnctype','formAction','files','form','disabled','dirName','checked','defaultChecked','autofocus','autocomplete','alt','align','accept','onautocompleteerror','onautocomplete','onwaiting','onvolumechange','ontoggle','ontimeupdate','onsuspend','onsubmit','onstalled','onshow','onselect','onseeking','onseeked','onscroll','onresize','onreset','onratechange','onprogress','onplaying','onplay','onpause','onmousewheel','onmouseup','onmouseover','onmouseout','onmousemove','onmouseleave','onmouseenter','onmousedown','onloadstart','onloadedmetadata','onloadeddata','onload','onkeyup','onkeypress','onkeydown','oninvalid','oninput','onfocus','onerror','onended','onemptied','ondurationchange','ondrop','ondragstart','ondragover','ondragleave','ondragenter','ondragend','ondrag','ondblclick','oncuechange','oncontextmenu','onclose','onclick','onchange','oncanplaythrough','oncanplay','oncancel','onblur','onabort','spellcheck','isContentEditable','contentEditable','outerText','innerText','accessKey','hidden','webkitdropzone','draggable','tabIndex','dir','translate','lang','title','childElementCount','lastElementChild','firstElementChild','children','onwebkitfullscreenerror','onwebkitfullscreenchange','nextElementSibling','previousElementSibling','onwheel','onselectstart','onsearch','onpaste','oncut','oncopy','onbeforepaste','onbeforecut','onbeforecopy','shadowRoot','dataset','classList','className','outerHTML','innerHTML','scrollHeight','scrollWidth','scrollTop','scrollLeft','clientHeight','clientWidth','clientTop','clientLeft','offsetParent','offsetHeight','offsetWidth','offsetTop','offsetLeft','localName','prefix','namespaceURI','id','style','attributes','tagName','parentElement','textContent','baseURI','ownerDocument','nextSibling','previousSibling','lastChild','firstChild','childNodes','parentNode','nodeType','nodeValue','nodeName','closure_lm_714617','__jsaction'];var/** @type {?} */TEMPLATE_COMMENT_TEXT='template bindings={}';var/** @type {?} */TEMPLATE_BINDINGS_EXP=/^template bindings=(.*)$/;var/** @type {?} */EMPTY_ARRAY=[];var ServerRootRenderer=function(){/**
     * @param {?} document
     * @param {?} sharedStylesHost
     * @param {?} animationDriver
     * @param {?} appId
     * @param {?} _zone
     */function ServerRootRenderer(document,sharedStylesHost,animationDriver,appId,_zone){_classCallCheck(this,ServerRootRenderer);this.document=document;this.sharedStylesHost=sharedStylesHost;this.animationDriver=animationDriver;this.appId=appId;this._zone=_zone;this.registeredComponents=new Map();this._schema=new DomElementSchemaRegistry();throw new Error('RootRenderer is no longer supported. Please use the `RendererFactoryV2` instead!');}/**
     * @param {?} componentProto
     * @return {?}
     */_createClass(ServerRootRenderer,[{key:'renderComponent',value:function renderComponent(componentProto){var/** @type {?} */renderer=this.registeredComponents.get(componentProto.id);if(!renderer){renderer=new ServerRenderer(this,componentProto,this.animationDriver,this.appId+'-'+componentProto.id,this._zone,this._schema);this.registeredComponents.set(componentProto.id,renderer);}return renderer;}}]);return ServerRootRenderer;}();ServerRootRenderer.decorators=[{type:Injectable}];/** @nocollapse */ServerRootRenderer.ctorParameters=function(){return[{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:ɵSharedStylesHost},{type:AnimationDriver},{type:undefined,decorators:[{type:Inject,args:[APP_ID]}]},{type:NgZone}];};var ServerRenderer=function(){/**
     * @param {?} _rootRenderer
     * @param {?} componentProto
     * @param {?} _animationDriver
     * @param {?} styleShimId
     * @param {?} _zone
     * @param {?} _schema
     */function ServerRenderer(_rootRenderer,componentProto,_animationDriver,styleShimId,_zone,_schema){_classCallCheck(this,ServerRenderer);this._rootRenderer=_rootRenderer;this.componentProto=componentProto;this._animationDriver=_animationDriver;this._zone=_zone;this._schema=_schema;this._styles=ɵflattenStyles(styleShimId,componentProto.styles,[]);if(componentProto.encapsulation===ViewEncapsulation.Native){throw new Error('Native encapsulation is not supported on the server!');}this._rootRenderer.sharedStylesHost.addStyles(this._styles);if(this.componentProto.encapsulation===ViewEncapsulation.Emulated){this._contentAttr=ɵshimContentAttribute(styleShimId);this._hostAttr=ɵshimHostAttribute(styleShimId);}else{this._contentAttr=null;this._hostAttr=null;}}/**
     * @param {?} selectorOrNode
     * @param {?} debugInfo
     * @return {?}
     */_createClass(ServerRenderer,[{key:'selectRootElement',value:function selectRootElement(selectorOrNode,debugInfo){var/** @type {?} */el=void 0/** TODO #9100 */;if(typeof selectorOrNode==='string'){el=ɵgetDOM().querySelector(this._rootRenderer.document,selectorOrNode);if(isBlank(el)){throw new Error('The selector "'+selectorOrNode+'" did not match any elements');}}else{el=selectorOrNode;}ɵgetDOM().clearNodes(el);return el;}/**
     * @param {?} parent
     * @param {?} name
     * @param {?} debugInfo
     * @return {?}
     */},{key:'createElement',value:function createElement(parent,name,debugInfo){var/** @type {?} */el=void 0;if(ɵisNamespaced(name)){var/** @type {?} */nsAndName=ɵsplitNamespace(name);el=ɵgetDOM().createElementNS(ɵNAMESPACE_URIS[nsAndName[0]],nsAndName[1]);}else{el=ɵgetDOM().createElement(name);}if(isPresent(this._contentAttr)){ɵgetDOM().setAttribute(el,this._contentAttr,'');}if(isPresent(parent)){ɵgetDOM().appendChild(parent,el);}return el;}/**
     * @param {?} hostElement
     * @return {?}
     */},{key:'createViewRoot',value:function createViewRoot(hostElement){var/** @type {?} */nodesParent=void 0/** TODO #9100 */;if(isPresent(this._hostAttr)){ɵgetDOM().setAttribute(hostElement,this._hostAttr,'');}nodesParent=hostElement;return nodesParent;}/**
     * @param {?} parentElement
     * @param {?} debugInfo
     * @return {?}
     */},{key:'createTemplateAnchor',value:function createTemplateAnchor(parentElement,debugInfo){var/** @type {?} */comment=ɵgetDOM().createComment(TEMPLATE_COMMENT_TEXT);if(isPresent(parentElement)){ɵgetDOM().appendChild(parentElement,comment);}return comment;}/**
     * @param {?} parentElement
     * @param {?} value
     * @param {?} debugInfo
     * @return {?}
     */},{key:'createText',value:function createText(parentElement,value,debugInfo){var/** @type {?} */node=ɵgetDOM().createTextNode(value);if(isPresent(parentElement)){ɵgetDOM().appendChild(parentElement,node);}return node;}/**
     * @param {?} parentElement
     * @param {?} nodes
     * @return {?}
     */},{key:'projectNodes',value:function projectNodes(parentElement,nodes){if(isBlank(parentElement))return;appendNodes(parentElement,nodes);}/**
     * @param {?} node
     * @param {?} viewRootNodes
     * @return {?}
     */},{key:'attachViewAfter',value:function attachViewAfter(node,viewRootNodes){moveNodesAfterSibling(node,viewRootNodes);}/**
     * @param {?} viewRootNodes
     * @return {?}
     */},{key:'detachView',value:function detachView(viewRootNodes){for(var/** @type {?} */i=0;i<viewRootNodes.length;i++){ɵgetDOM().remove(viewRootNodes[i]);}}/**
     * @param {?} hostElement
     * @param {?} viewAllNodes
     * @return {?}
     */},{key:'destroyView',value:function destroyView(hostElement,viewAllNodes){}/**
     * @param {?} renderElement
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */},{key:'listen',value:function listen(renderElement,name,callback){var _this6=this;// Note: We are not using the EventsPlugin here as this is not needed
// to run our tests.
var/** @type {?} */outsideHandler=function outsideHandler(event){return _this6._zone.runGuarded(function(){return callback(event);});};return this._zone.runOutsideAngular(function(){return ɵgetDOM().onAndCancel(renderElement,name,outsideHandler);});}/**
     * @param {?} target
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */},{key:'listenGlobal',value:function listenGlobal(target,name,callback){var/** @type {?} */renderElement=ɵgetDOM().getGlobalEventTarget(this._rootRenderer.document,target);return this.listen(renderElement,name,callback);}/**
     * @param {?} tagName
     * @param {?} propertyName
     * @return {?}
     */},{key:'_isSafeToReflectProperty',value:function _isSafeToReflectProperty(tagName,propertyName){return this._schema.securityContext(tagName,propertyName,true)===this._schema.securityContext(tagName,propertyName,false);}/**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */},{key:'setElementProperty',value:function setElementProperty(renderElement,propertyName,propertyValue){ɵgetDOM().setProperty(renderElement,propertyName,propertyValue);// Mirror property values for known HTML element properties in the attributes.
var/** @type {?} */tagName=renderElement.tagName.toLowerCase();if(isPresent(propertyValue)&&(typeof propertyValue==='number'||typeof propertyValue=='string')&&this._schema.hasElement(tagName,EMPTY_ARRAY)&&this._schema.hasProperty(tagName,propertyName,EMPTY_ARRAY)&&this._isSafeToReflectProperty(tagName,propertyName)){this.setElementAttribute(renderElement,propertyName,propertyValue.toString());}}/**
     * @param {?} renderElement
     * @param {?} attributeName
     * @param {?} attributeValue
     * @return {?}
     */},{key:'setElementAttribute',value:function setElementAttribute(renderElement,attributeName,attributeValue){var/** @type {?} */attrNs=void 0;var/** @type {?} */attrNameWithoutNs=attributeName;if(ɵisNamespaced(attributeName)){var/** @type {?} */nsAndName=ɵsplitNamespace(attributeName);attrNameWithoutNs=nsAndName[1];attributeName=nsAndName[0]+':'+nsAndName[1];attrNs=ɵNAMESPACE_URIS[nsAndName[0]];}if(isPresent(attributeValue)){if(isPresent(attrNs)){ɵgetDOM().setAttributeNS(renderElement,attrNs,attributeName,attributeValue);}else{ɵgetDOM().setAttribute(renderElement,attributeName,attributeValue);}}else{if(isPresent(attrNs)){ɵgetDOM().removeAttributeNS(renderElement,attrNs,attrNameWithoutNs);}else{ɵgetDOM().removeAttribute(renderElement,attributeName);}}}/**
     * @param {?} renderElement
     * @param {?} propertyName
     * @param {?} propertyValue
     * @return {?}
     */},{key:'setBindingDebugInfo',value:function setBindingDebugInfo(renderElement,propertyName,propertyValue){if(ɵgetDOM().isCommentNode(renderElement)){var/** @type {?} */existingBindings=ɵgetDOM().getText(renderElement).replace(/\n/g,'').match(TEMPLATE_BINDINGS_EXP);var/** @type {?} */parsedBindings=JSON.parse(existingBindings[1]);parsedBindings[/** TODO #9100 */propertyName]=propertyValue;ɵgetDOM().setText(renderElement,TEMPLATE_COMMENT_TEXT.replace('{}',JSON.stringify(parsedBindings,null,2)));}else{propertyName=propertyName.replace(/\$/g,'_');this.setElementAttribute(renderElement,propertyName,propertyValue);}}/**
     * @param {?} renderElement
     * @param {?} className
     * @param {?} isAdd
     * @return {?}
     */},{key:'setElementClass',value:function setElementClass(renderElement,className,isAdd){if(isAdd){ɵgetDOM().addClass(renderElement,className);}else{ɵgetDOM().removeClass(renderElement,className);}}/**
     * @param {?} renderElement
     * @param {?} styleName
     * @param {?} styleValue
     * @return {?}
     */},{key:'setElementStyle',value:function setElementStyle(renderElement,styleName,styleValue){if(isPresent(styleValue)){ɵgetDOM().setStyle(renderElement,styleName,stringify(styleValue));}else{ɵgetDOM().removeStyle(renderElement,styleName);}}/**
     * @param {?} renderElement
     * @param {?} methodName
     * @param {?} args
     * @return {?}
     */},{key:'invokeElementMethod',value:function invokeElementMethod(renderElement,methodName,args){ɵgetDOM().invoke(renderElement,methodName,args);}/**
     * @param {?} renderNode
     * @param {?} text
     * @return {?}
     */},{key:'setText',value:function setText(renderNode,text){ɵgetDOM().setText(renderNode,text);}/**
     * @param {?} element
     * @param {?} startingStyles
     * @param {?} keyframes
     * @param {?} duration
     * @param {?} delay
     * @param {?} easing
     * @param {?=} previousPlayers
     * @return {?}
     */},{key:'animate',value:function animate(element,startingStyles,keyframes,duration,delay,easing){var previousPlayers=arguments.length>6&&arguments[6]!==undefined?arguments[6]:[];return this._animationDriver.animate(element,startingStyles,keyframes,duration,delay,easing,previousPlayers);}}]);return ServerRenderer;}();/**
 * @param {?} ref
 * @param {?} nodes
 * @return {?}
 */function moveNodesAfterSibling(ref,nodes){var/** @type {?} */parent=ɵgetDOM().parentElement(ref);if(nodes.length>0&&parent){var/** @type {?} */nextSibling=ɵgetDOM().nextSibling(ref);if(nextSibling){for(var/** @type {?} */i=0;i<nodes.length;i++){ɵgetDOM().insertBefore(parent,nextSibling,nodes[i]);}}else{for(var/** @type {?} */_i=0;_i<nodes.length;_i++){ɵgetDOM().appendChild(parent,nodes[_i]);}}}}/**
 * @param {?} parent
 * @param {?} nodes
 * @return {?}
 */function appendNodes(parent,nodes){for(var/** @type {?} */i=0;i<nodes.length;i++){ɵgetDOM().appendChild(parent,nodes[i]);}}var ServerRendererFactoryV2=function(){/**
     * @param {?} ngZone
     * @param {?} document
     * @param {?} sharedStylesHost
     */function ServerRendererFactoryV2(ngZone,document,sharedStylesHost){_classCallCheck(this,ServerRendererFactoryV2);this.ngZone=ngZone;this.document=document;this.sharedStylesHost=sharedStylesHost;this.rendererByCompId=new Map();this.schema=new DomElementSchemaRegistry();this.defaultRenderer=new DefaultServerRendererV2(document,ngZone,this.schema);}_createClass(ServerRendererFactoryV2,[{key:'createRenderer',/**
     * @param {?} element
     * @param {?} type
     * @return {?}
     */value:function createRenderer(element,type){if(!element||!type){return this.defaultRenderer;}switch(type.encapsulation){case ViewEncapsulation.Emulated:{var/** @type {?} */renderer=this.rendererByCompId.get(type.id);if(!renderer){renderer=new EmulatedEncapsulationServerRendererV2(this.document,this.ngZone,this.sharedStylesHost,this.schema,type);this.rendererByCompId.set(type.id,renderer);}renderer.applyToHost(element);return renderer;}case ViewEncapsulation.Native:throw new Error('Native encapsulation is not supported on the server!');default:{if(!this.rendererByCompId.has(type.id)){var/** @type {?} */styles=ɵflattenStyles(type.id,type.styles,[]);this.sharedStylesHost.addStyles(styles);this.rendererByCompId.set(type.id,this.defaultRenderer);}return this.defaultRenderer;}}}}]);return ServerRendererFactoryV2;}();ServerRendererFactoryV2.decorators=[{type:Injectable}];/** @nocollapse */ServerRendererFactoryV2.ctorParameters=function(){return[{type:NgZone},{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:ɵSharedStylesHost}];};var DefaultServerRendererV2=function(){/**
     * @param {?} document
     * @param {?} ngZone
     * @param {?} schema
     */function DefaultServerRendererV2(document,ngZone,schema){_classCallCheck(this,DefaultServerRendererV2);this.document=document;this.ngZone=ngZone;this.schema=schema;this.data=Object.create(null);}/**
     * @return {?}
     */_createClass(DefaultServerRendererV2,[{key:'destroy',value:function destroy(){}/**
     * @param {?} name
     * @param {?=} namespace
     * @param {?=} debugInfo
     * @return {?}
     */},{key:'createElement',value:function createElement(name,namespace,debugInfo){if(namespace){return ɵgetDOM().createElementNS(ɵNAMESPACE_URIS[namespace],name);}return ɵgetDOM().createElement(name);}/**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */},{key:'createComment',value:function createComment(value,debugInfo){return ɵgetDOM().createComment(value);}/**
     * @param {?} value
     * @param {?=} debugInfo
     * @return {?}
     */},{key:'createText',value:function createText(value,debugInfo){return ɵgetDOM().createTextNode(value);}/**
     * @param {?} parent
     * @param {?} newChild
     * @return {?}
     */},{key:'appendChild',value:function appendChild(parent,newChild){ɵgetDOM().appendChild(parent,newChild);}/**
     * @param {?} parent
     * @param {?} newChild
     * @param {?} refChild
     * @return {?}
     */},{key:'insertBefore',value:function insertBefore(parent,newChild,refChild){if(parent){ɵgetDOM().insertBefore(parent,refChild,newChild);}}/**
     * @param {?} parent
     * @param {?} oldChild
     * @return {?}
     */},{key:'removeChild',value:function removeChild(parent,oldChild){if(parent){ɵgetDOM().removeChild(parent,oldChild);}}/**
     * @param {?} selectorOrNode
     * @param {?=} debugInfo
     * @return {?}
     */},{key:'selectRootElement',value:function selectRootElement(selectorOrNode,debugInfo){var/** @type {?} */el=void 0;if(typeof selectorOrNode==='string'){el=ɵgetDOM().querySelector(this.document,selectorOrNode);if(!el){throw new Error('The selector "'+selectorOrNode+'" did not match any elements');}}else{el=selectorOrNode;}ɵgetDOM().clearNodes(el);return el;}/**
     * @param {?} node
     * @return {?}
     */},{key:'parentNode',value:function parentNode(node){return ɵgetDOM().parentElement(node);}/**
     * @param {?} node
     * @return {?}
     */},{key:'nextSibling',value:function nextSibling(node){return ɵgetDOM().nextSibling(node);}/**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @param {?=} namespace
     * @return {?}
     */},{key:'setAttribute',value:function setAttribute(el,name,value,namespace){if(namespace){ɵgetDOM().setAttributeNS(el,ɵNAMESPACE_URIS[namespace],namespace+':'+name,value);}else{ɵgetDOM().setAttribute(el,name,value);}}/**
     * @param {?} el
     * @param {?} name
     * @param {?=} namespace
     * @return {?}
     */},{key:'removeAttribute',value:function removeAttribute(el,name,namespace){if(namespace){ɵgetDOM().removeAttributeNS(el,ɵNAMESPACE_URIS[namespace],name);}else{ɵgetDOM().removeAttribute(el,name);}}/**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */},{key:'addClass',value:function addClass(el,name){ɵgetDOM().addClass(el,name);}/**
     * @param {?} el
     * @param {?} name
     * @return {?}
     */},{key:'removeClass',value:function removeClass(el,name){ɵgetDOM().removeClass(el,name);}/**
     * @param {?} el
     * @param {?} style
     * @param {?} value
     * @param {?} hasVendorPrefix
     * @param {?} hasImportant
     * @return {?}
     */},{key:'setStyle',value:function setStyle(el,style,value,hasVendorPrefix,hasImportant){ɵgetDOM().setStyle(el,style,value);}/**
     * @param {?} el
     * @param {?} style
     * @param {?} hasVendorPrefix
     * @return {?}
     */},{key:'removeStyle',value:function removeStyle(el,style,hasVendorPrefix){ɵgetDOM().removeStyle(el,style);}/**
     * @param {?} tagName
     * @param {?} propertyName
     * @return {?}
     */},{key:'_isSafeToReflectProperty',value:function _isSafeToReflectProperty(tagName,propertyName){return this.schema.securityContext(tagName,propertyName,true)===this.schema.securityContext(tagName,propertyName,false);}/**
     * @param {?} el
     * @param {?} name
     * @param {?} value
     * @return {?}
     */},{key:'setProperty',value:function setProperty(el,name,value){ɵgetDOM().setProperty(el,name,value);// Mirror property values for known HTML element properties in the attributes.
var/** @type {?} */tagName=el.tagName.toLowerCase();if(isPresent(value)&&(typeof value==='number'||typeof value=='string')&&this.schema.hasElement(tagName,EMPTY_ARRAY)&&this.schema.hasProperty(tagName,name,EMPTY_ARRAY)&&this._isSafeToReflectProperty(tagName,name)){this.setAttribute(el,name,value.toString());}}/**
     * @param {?} node
     * @param {?} value
     * @return {?}
     */},{key:'setValue',value:function setValue(node,value){ɵgetDOM().setText(node,value);}/**
     * @param {?} target
     * @param {?} eventName
     * @param {?} callback
     * @return {?}
     */},{key:'listen',value:function listen(target,eventName,callback){var _this7=this;// Note: We are not using the EventsPlugin here as this is not needed
// to run our tests.
var/** @type {?} */el=typeof target==='string'?ɵgetDOM().getGlobalEventTarget(this.document,target):target;var/** @type {?} */outsideHandler=function outsideHandler(event){return _this7.ngZone.runGuarded(function(){return callback(event);});};return this.ngZone.runOutsideAngular(function(){return ɵgetDOM().onAndCancel(el,eventName,outsideHandler);});}}]);return DefaultServerRendererV2;}();var EmulatedEncapsulationServerRendererV2=function(_DefaultServerRendere){_inherits(EmulatedEncapsulationServerRendererV2,_DefaultServerRendere);/**
     * @param {?} document
     * @param {?} ngZone
     * @param {?} sharedStylesHost
     * @param {?} schema
     * @param {?} component
     */function EmulatedEncapsulationServerRendererV2(document,ngZone,sharedStylesHost,schema,component){_classCallCheck(this,EmulatedEncapsulationServerRendererV2);var _this8=_possibleConstructorReturn(this,(EmulatedEncapsulationServerRendererV2.__proto__||Object.getPrototypeOf(EmulatedEncapsulationServerRendererV2)).call(this,document,ngZone,schema));_this8.component=component;var styles=ɵflattenStyles(component.id,component.styles,[]);sharedStylesHost.addStyles(styles);_this8.contentAttr=ɵshimContentAttribute(component.id);_this8.hostAttr=ɵshimHostAttribute(component.id);return _this8;}/**
     * @param {?} element
     * @return {?}
     */_createClass(EmulatedEncapsulationServerRendererV2,[{key:'applyToHost',value:function applyToHost(element){_get(EmulatedEncapsulationServerRendererV2.prototype.__proto__||Object.getPrototypeOf(EmulatedEncapsulationServerRendererV2.prototype),'setAttribute',this).call(this,element,this.hostAttr,'');}/**
     * @param {?} parent
     * @param {?} name
     * @return {?}
     */},{key:'createElement',value:function createElement(parent,name){var/** @type {?} */el=_get(EmulatedEncapsulationServerRendererV2.prototype.__proto__||Object.getPrototypeOf(EmulatedEncapsulationServerRendererV2.prototype),'createElement',this).call(this,parent,name);_get(EmulatedEncapsulationServerRendererV2.prototype.__proto__||Object.getPrototypeOf(EmulatedEncapsulationServerRendererV2.prototype),'setAttribute',this).call(this,el,this.contentAttr,'');return el;}}]);return EmulatedEncapsulationServerRendererV2;}(DefaultServerRendererV2);var ServerStylesHost=function(_SharedStylesHost){_inherits(ServerStylesHost,_SharedStylesHost);/**
     * @param {?} doc
     * @param {?} transitionId
     */function ServerStylesHost(doc,transitionId){_classCallCheck(this,ServerStylesHost);var _this9=_possibleConstructorReturn(this,(ServerStylesHost.__proto__||Object.getPrototypeOf(ServerStylesHost)).call(this));_this9.doc=doc;_this9.transitionId=transitionId;_this9.head=null;_this9.head=ɵgetDOM().getElementsByTagName(doc,'head')[0];return _this9;}/**
     * @param {?} style
     * @return {?}
     */_createClass(ServerStylesHost,[{key:'_addStyle',value:function _addStyle(style){var/** @type {?} */adapter=ɵgetDOM();var/** @type {?} */el=adapter.createElement('style');adapter.setText(el,style);if(!!this.transitionId){adapter.setAttribute(el,'ng-transition',this.transitionId);}adapter.appendChild(this.head,el);}/**
     * @param {?} additions
     * @return {?}
     */},{key:'onStylesAdded',value:function onStylesAdded(additions){var _this10=this;additions.forEach(function(style){return _this10._addStyle(style);});}}]);return ServerStylesHost;}(ɵSharedStylesHost);ServerStylesHost.decorators=[{type:Injectable}];/** @nocollapse */ServerStylesHost.ctorParameters=function(){return[{type:undefined,decorators:[{type:Inject,args:[DOCUMENT]}]},{type:undefined,decorators:[{type:Optional},{type:Inject,args:[ɵTRANSITION_ID]}]}];};var/** @type {?} */INTERNAL_SERVER_PLATFORM_PROVIDERS=[{provide:DOCUMENT,useFactory:_document,deps:[Injector]},{provide:PLATFORM_ID,useValue:ɵPLATFORM_SERVER_ID},{provide:PLATFORM_INITIALIZER,useFactory:initParse5Adapter,multi:true,deps:[Injector]},{provide:PlatformLocation,useClass:ServerPlatformLocation},PlatformState,// Add special provider that allows multiple instances of platformServer* to be created.
{provide:ɵALLOW_MULTIPLE_PLATFORMS,useValue:true}];/**
 * @param {?} injector
 * @return {?}
 */function initParse5Adapter(injector){return function(){Parse5DomAdapter.makeCurrent();};}/**
 * @param {?} rootRenderer
 * @return {?}
 */function _createConditionalRootRenderer(rootRenderer){return isDevMode()?new ɵDebugDomRootRenderer(rootRenderer):rootRenderer;}var/** @type {?} */SERVER_RENDER_PROVIDERS=[ServerRootRenderer,{provide:RootRenderer,useFactory:_createConditionalRootRenderer,deps:[ServerRootRenderer]},ServerRendererFactoryV2,{provide:RendererFactoryV2,useExisting:ServerRendererFactoryV2},ServerStylesHost,{provide:ɵSharedStylesHost,useExisting:ServerStylesHost}];/**
 * The ng module for the server.
 *
 * \@experimental
 */var ServerModule=function ServerModule(){_classCallCheck(this,ServerModule);};ServerModule.decorators=[{type:NgModule,args:[{exports:[BrowserModule],imports:[HttpModule],providers:[SERVER_RENDER_PROVIDERS,SERVER_HTTP_PROVIDERS]}]}];/** @nocollapse */ServerModule.ctorParameters=function(){return[];};/**
 * @param {?} injector
 * @return {?}
 */function _document(injector){var/** @type {?} */config=injector.get(INITIAL_CONFIG,null);if(config&&config.document){return parseDocument(config.document);}else{return ɵgetDOM().createHtmlDocument();}}/**
 * @experimental
 */var/** @type {?} */platformServer=createPlatformFactory(platformCore,'server',INTERNAL_SERVER_PLATFORM_PROVIDERS);/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */var/** @type {?} */platformDynamicServer=createPlatformFactory(platformCoreDynamic,'serverDynamic',INTERNAL_SERVER_PLATFORM_PROVIDERS);var/** @type {?} */parse5$2=require('parse5');/**
 * @param {?} platformFactory
 * @param {?} options
 * @return {?}
 */function _getPlatform(platformFactory,options){var/** @type {?} */extraProviders=options.extraProviders?options.extraProviders:[];return platformFactory([{provide:INITIAL_CONFIG,useValue:{document:options.document,url:options.url}},extraProviders]);}/**
 * @param {?} platform
 * @param {?} moduleRefPromise
 * @return {?}
 */function _render(platform,moduleRefPromise){return moduleRefPromise.then(function(moduleRef){var/** @type {?} */transitionId=moduleRef.injector.get(ɵTRANSITION_ID,null);if(!transitionId){throw new Error('renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure\nthe server-rendered app can be properly bootstrapped into a client app.');}var/** @type {?} */applicationRef=moduleRef.injector.get(ApplicationRef);return toPromise.call(first.call(filter.call(applicationRef.isStable,function(isStable){return isStable;}))).then(function(){var/** @type {?} */output=platform.injector.get(PlatformState).renderToString();platform.destroy();return output;});});}/**
 * Renders a Module to string.
 *
 * Do not use this in a production server environment. Use pre-compiled {\@link NgModuleFactory} with
 * {link renderModuleFactory} instead.
 *
 * \@experimental
 * @param {?} module
 * @param {?} options
 * @return {?}
 */function renderModule(module,options){var/** @type {?} */platform=_getPlatform(platformDynamicServer,options);return _render(platform,platform.bootstrapModule(module));}/**
 * Renders a {\@link NgModuleFactory} to string.
 *
 * \@experimental
 * @param {?} moduleFactory
 * @param {?} options
 * @return {?}
 */function renderModuleFactory(moduleFactory,options){var/** @type {?} */platform=_getPlatform(platformServer,options);return _render(platform,platform.bootstrapModuleFactory(moduleFactory));}/**
 * @stable
 */var/** @type {?} */VERSION=new Version('4.0.0-beta.8-3c9a46c');export{PlatformState,ServerModule,platformDynamicServer,platformServer,INITIAL_CONFIG,renderModule,renderModuleFactory,VERSION,INTERNAL_SERVER_PLATFORM_PROVIDERS as ɵINTERNAL_SERVER_PLATFORM_PROVIDERS,SERVER_RENDER_PROVIDERS as ɵSERVER_RENDER_PROVIDERS,SERVER_HTTP_PROVIDERS as ɵh,ServerXhr as ɵe,ServerXsrfStrategy as ɵf,httpFactory as ɵg,_createConditionalRootRenderer as ɵa,ServerRendererFactoryV2 as ɵc,ServerRootRenderer as ɵb,ServerStylesHost as ɵd};
