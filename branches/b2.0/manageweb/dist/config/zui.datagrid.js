!function(e){"function"==typeof define&&define.amd?define("config/zui.datagrid",["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(g){var f,u,e=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],t="onwheel"in document||9<=document.documentMode?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],p=Array.prototype.slice;if(g.event.fixHooks)for(var a=e.length;a;)g.event.fixHooks[e[--a]]=g.event.mouseHooks;var v=g.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var e=t.length;e;)this.addEventListener(t[--e],r,!1);else this.onmousewheel=r;g.data(this,"mousewheel-line-height",v.getLineHeight(this)),g.data(this,"mousewheel-page-height",v.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var e=t.length;e;)this.removeEventListener(t[--e],r,!1);else this.onmousewheel=null;g.removeData(this,"mousewheel-line-height"),g.removeData(this,"mousewheel-page-height")},getLineHeight:function(e){var t=g(e),a=t["offsetParent"in g.fn?"offsetParent":"parent"]();return a.length||(a=g("body")),parseInt(a.css("fontSize"),10)||parseInt(t.css("fontSize"),10)||16},getPageHeight:function(e){return g(e).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};function r(e){var t,a=e||window.event,r=p.call(arguments,1),o=0,i=0,n=0,l=0,s=0;if((e=g.event.fix(a)).type="mousewheel","detail"in a&&(n=-1*a.detail),"wheelDelta"in a&&(n=a.wheelDelta),"wheelDeltaY"in a&&(n=a.wheelDeltaY),"wheelDeltaX"in a&&(i=-1*a.wheelDeltaX),"axis"in a&&a.axis===a.HORIZONTAL_AXIS&&(i=-1*n,n=0),o=0===n?i:n,"deltaY"in a&&(o=n=-1*a.deltaY),"deltaX"in a&&(i=a.deltaX,0===n&&(o=-1*i)),0!==n||0!==i){if(1===a.deltaMode){var d=g.data(this,"mousewheel-line-height");o*=d,n*=d,i*=d}else if(2===a.deltaMode){var c=g.data(this,"mousewheel-page-height");o*=c,n*=c,i*=c}if(t=Math.max(Math.abs(n),Math.abs(i)),(!u||t<u)&&w(a,u=t)&&(u/=40),w(a,t)&&(o/=40,i/=40,n/=40),o=Math[1<=o?"floor":"ceil"](o/u),i=Math[1<=i?"floor":"ceil"](i/u),n=Math[1<=n?"floor":"ceil"](n/u),v.settings.normalizeOffset&&this.getBoundingClientRect){var h=this.getBoundingClientRect();l=e.clientX-h.left,s=e.clientY-h.top}return e.deltaX=i,e.deltaY=n,e.deltaFactor=u,e.offsetX=l,e.offsetY=s,e.deltaMode=0,r.unshift(e,o,i,n),f&&clearTimeout(f),f=setTimeout(m,200),(g.event.dispatch||g.event.handle).apply(this,r)}}function m(){u=null}function w(e,t){return v.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120==0}g.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}),function(W,F){"use strict";var v="zui.datagrid",d={date:{getter:function(e,t,a){var r=a.options.defaultDateFormater;return Date.create(e).format(r)},setter:function(e,t,a){if("string"==typeof e){var r=parseInt(e,10);isNaN(r)||(e=r)}return Date.timestamp(e)}}},c={},n={page:0,recTotal:0,recPerPage:10},h={fixedLeftUntil:0,fixedTopUntil:0,order:"asc",sortBy:null,pager:n,selections:{}},m=function(e,n){var l=0,s=n.length,d=0,c={};return W.each(e,function(e,t){var a=typeof t;"number"===a||"number"===a?t+="":"string"!==a&&(t=JSON.stringify(a));for(var r=0,o=0;o<s;++o){var i=n[o];t.includes(i)&&(r=t.startsWith(i)?10:20,c[i]||(c[i]=1,d++))}l+=r}),l=d===s?l:0},w=function(e,t){return e==t?0:e<t?-1:1},g={zh_cn:{errorCannotGetDataFromRemote:"无法从远程服务器（{0}）获取数据。",errorCannotHandleRemoteData:"无法处理远程服务器返回的数据。"},zh_tw:{errorCannotGetDataFromRemote:"無法從遠程服務器（{0}）獲取數據。",errorCannotHandleRemoteData:"無法處理遠程服務器返回的數據。"},en:{errorCannotGetDataFromRemote:"Cannot fetch data from remote server {0}.",errorCannotHandleRemoteData:"Cannot handle the remote data."}},y=function(e,t){var f=this,a=f.$=W(e);f.name=v,f.uuid=W.zui.uuid(),f.id="zui-datagrid-"+f.uuid;var r=(t=W.extend({},y.DEFAULTS,f.$.data(),t)).lang||"zh_cn";f.lang=W.isPlainObject(r)?W.extend(!0,{},g[r.lang||W.zui.clientLang()],r):g[r],t.valueOperator=W.extend({},d,t.valueOperator),t.rowDefaultHeight=t.rowDefaultHeight||30,t.headerHeight=t.headerHeight||t.rowDefaultHeight||30,"number"!=typeof(f.options=t).borderWidth&&(t.borderWidth=1),a.is("table")&&(t.dataSource=W.extend(function(e){var a=[];e.find("thead>tr:first>th").each(function(e){var t=W(this);if(a.push(W.extend({name:e,label:t.html(),html:!0,width:t.outerWidth()},t.data())),t.attr("colspan")&&"1"!==t.attr("colspan"))throw new Erorr("Table th element with colspan attribute is not support.")});var r=[];return e.find("tbody>tr").each(function(){var e=W(this),t={};e.children("td").each(function(e){t[e]=W(this).html()}),r.push(W.extend(t,e.data()))}),{cols:a,array:r,length:r.length}}(f.$),t.dataSource),a.hide(),a=W('<div class="datagrid" id="datagrid-'+f.uuid+'" />').insertAfter(f.$));var u=a.find(".datagrid-container:first");u.length||(u=W('<div class="datagrid-container" />').appendTo(a)),u.css({width:t.width,borderWidth:t.borderWidth});var p=W(document),o=function(o){var r=u.find(".datagrid-scrollbar-"+o);r.length||(r=W('<div class="datagrid-scrollbar datagrid-scrollbar-'+o+'"><div class="bar"></div></div>').appendTo(u));var i,n,l,s,d=!1,c=null,h=".scrollbar"+o+"."+v+"."+f.uuid,g=function(e){if(d){var t=e["h"===o?"pageX":"pageY"];if(c!==t){t=(c=t)-i+n;var a,r=f.layout[o+"Scroll"];a=l?c-i+s:Math.max(0,Math.min(r.space,t-Math.round(r.barSize/2))),"h"===o?f.setScrollbarOffset(a):f.setScrollbarOffset(null,a)}}};r.on("mousedown",function(e){e.preventDefault(),d=!0;var t=f.layout[o+"Scroll"],a="h"===o?"X":"Y";n=e["offset"+a],i=e["page"+a],l=W(e.target).is(".bar"),s=t.offset,l&&(n+=s),g(e),r.addClass("scrolling"),p.on("mouseup"+h,function(e){d=!1,g(e),p.off(h),r.removeClass("scrolling")}).on("mousemove"+h,g)}),f["$"+o+"Scroll"]=r,f["$"+o+"Scrollbar"]=r.find(".bar")};o("h"),o("v");var i=t.mouseWheelFactor;window.navigator.userAgent.match(/Win/i)&&(i*=20),u.on("mousewheel",function(e){f.scroll(f.layout.scrollLeft-Math.round(e.deltaX*i),f.layout.scrollTop-Math.round(e.deltaY*i)),e.preventDefault()}),f.$container=u;var n=a.find(".datagrid-cells:first");if(n.length||(n=W('<div class="datagrid-cells" />').appendTo(u)),n.toggleClass("datagrid-hover-cell",!!t.hoverCell).toggleClass("datagrid-hover-row",!!t.hoverRow).toggleClass("datagrid-hover-col",!!t.hoverCol).toggleClass("datagrid-hover-shadow",!!t.hoverCol),f.$cells=n,f.isFuncConfigs=W.isFunction(t.configs),f.configs=f.isFuncConfigs?t.configs:W.extend({},c,t.configs),f.layout={scrollLeft:0,scrollTop:0},f.configsCache={},f.userConfigs={},f.states=W.extend(!0,{},h,t.states),f.cells=[],f.setPager(f.states.pager),f.setDataSource(t.dataSource),t.responsive){u.width();u.on("resize",function(){f.layout.cols=null,f.render()})}if(t.hoverCol&&n.on("mouseenter",".datagrid-cell-head",function(){var e=W(this).data("col");f.$cells.find(".datagrid-cell.hover").removeClass("hover"),f.$cells.find('.datagrid-cell[data-col="'+e+'"]').addClass("hover")}).on("mouseleave",".datagrid-cell-head.hover",function(){f.$cells.find(".datagrid-cell.hover").removeClass("hover")}),t.sortable&&n.on("click",".datagrid-col-sortable",function(){var e=W(this).data("col"),t=f.getColConfig(e),a=f.states.sortBy,r=f.states.order;a!==t.name?(a=t.name,r="desc"):"desc"===r?r="asc":"asc"===r&&(a=""),f.sortBy(a,r)}),t.checkable&&(t.selectable&&W.fn.selectable?(f.selectable=n.selectable(W.extend({selector:".datagrid-row-cell",trigger:t.checkByClickRow?null:".datagrid-row-cell .datagrid-has-checkbox",clickBehavior:"multi",select:function(e){f.checkRow(e.id,!0)},unselect:function(e){f.checkRow(e.id,!1)}},W.isPlainObject(t.selectable)?t.selectable:null)).data("zui.selectable"),n.on("click",".datagrid-cell-head.datagrid-has-checkbox",function(){f.checkRow(W(this).data("row")),f.selectable.syncSelectionsFromClass()})):n.on("click",t.checkByClickRow?".datagrid-row":".datagrid-has-checkbox",function(e){var t=W(this).data("row");(t||W(e.target).closest(".datagrid-has-checkbox").length)&&f.checkRow(t)})),W.fn.pager){var l=f.$.find(".pager");l.length&&(f.pagerObj=l.pager(W.extend({},f.pager,{onPageChange:function(e){f.setPager(e).render()}})).data("zui.pager"))}if(W.fn.searchBox){var s=f.$.find(".search-box");s&&(f.searchbox=s.searchBox({onSearchChange:function(e){f.search(e)}}))}f.render()};y.prototype.setPager=function(e,t,a){var r=this;"object"==typeof e&&(a=e.recPerPage,t=e.recTotal,e=e.page);var o=r.pager,i=W.extend({},o);return o||(o=W.extend({},n)),"number"==typeof a&&0<a&&(o.recPerPage=a),"number"==typeof t&&0<=t&&(o.recTotal=t),"number"==typeof e&&0<=e&&(o.page=e),o.totalPage=o.recTotal&&o.recPerPage?Math.ceil(o.recTotal/o.recPerPage):1,o.page=Math.max(0,Math.min(o.page,o.totalPage)),o.pageRecCount=o.recTotal,o.page&&o.recTotal&&(o.page<o.totalPage?o.pageRecCount=o.recPerPage:1<o.page&&(o.pageRecCount=o.recTotal-o.recPerPage*(o.page-1))),o.skip=1<o.page?(o.page-1)*o.recPerPage:0,o.end=o.skip+o.pageRecCount,r.pager=o,i.page===o.page&&i.recTotal===o.recTotal&&i.recPerPage===o.recPerPage||(r.scroll(0,0),r.layout.cols=null),r},y.prototype.goToPage=function(e){return this.setPager(e).render()},y.prototype.setSearch=function(e){return e!==F&&null!==e||(e=""),this.states.search=W.trim(e),this},y.prototype.search=function(e){return e!==this.states.search&&this.pager.page&&this.setPager(1),this.setSearch(e).render()},y.prototype.setSorter=function(e,t){return t===F&&(t="desc"===this.states.order?"asc":"desc"),this.states.order=t.toLowerCase(),this.states.sortBy=e,this},y.prototype.sortBy=function(e,t){return this.setSorter(e,t).render()},y.prototype.setDataSource=function(e,t){var a=this,r={},o=a.dataSource&&a.dataSource.cols;if(W.isArray(e)?(r.array=e,r.length=e.length,a.setPager("",e.length)):W.isPlainObject(e)?r=W.extend(r,e):"string"==typeof e&&(r.remote=e),!0===r.cache||r.cache===F?(r.cache=[],r.cacheSize=1):"number"==typeof r.cache&&(r.cacheSize=r.cache,r.cache=[]),W.isArray(r.data)?(r.array=r.data,r.length=r.array.length,a.setPager("",r.length),delete r.data):!r.data&&W.isFunction(r.getByIndex)&&a.setPager("",r.length),a.dataSource=r,(t=t||r.cols||o||[]).length)for(var i=0;i<t.length;++i){var n=t[i];"string"==typeof n&&(t[i]={name:n})}t!==o&&(a.layout.cols=null),r.cols=t},y.prototype.filterData=function(e,t){var r=this,a=e,o=null;if(t.search){var i=t.search.replace(/\s{2,}/g," ").split(" ");a=[];for(var n=r.options.searchFunc||m,l=0;l<e.length;++l){var s=e[l],d=n(s,i,l,t,r);d&&(null===o&&(o="number"==typeof d),o&&(s._SCORE=d),a.push(s))}}if(r.setPager(-1,a.length),a.length){var c=t.sortBy||!!o&&"_SCORE";if(c){var h="_SCORE"===c?"DESC":t.order,g=r.getColConfigByName(c),f="desc"===h,u=g&&g.sortFunc||r.options.sortFunc||w;a.sort(function(e,t){var a=u(e[c],t[c],e,t,c,r);return f?-1*a:a})}var p=r.pager;if(p.page){1<p.page&&(p.page,p.recPerPage);a=a.slice(p.skip,p.end)}}return a},y.prototype.getFilterParams=function(){var e=this.states;return{page:this.pager.page,recPerPage:this.pager.recPerPage,search:e.search,sortBy:e.sortBy,order:e.order}},y.prototype.loadData=function(t){var i=this;i.loadingId=W.zui.uuid();var a=function(e){return i.$.callComEvent(i,"onLoad",e),t&&t(e)},e=i.getFilterParams(),r=[e.page,e.recPerPage,e.search,e.sortBy,e.order].join("&"),o=i.getData(r);if(o)return a(o);var n=i.dataSource;if(n.array)return o=i.filterData(n.array,e),i.resetData(r,o,i.pager),a(o);if(n.getByIndex)return o=n.getByIndex,i.resetData(r,o),a(o);var l=n.loader,s=n.remote;if(!l&&s&&(l=function(e,o){var t=W.isFunction(s)?s(e,i):{url:s};W.ajax(W.extend({type:"GET",data:e,dataType:"json",success:function(e,t,a){if(n.remoteConverter&&(e=n.remoteConverter(e,t,a,i)),"string"==typeof e&&(e=W.parseJSON(e)),W.isPlainObject(e)&&e.data){var r=e.result||e.status;"success"===r||"ok"===r||200===r?o(e):o(!1,e.message||e.reason||i.lang.errorCannotHandleRemoteData,e)}else o(!1,i.lang.errorCannotHandleRemoteData,e)},error:function(){o(!1,i.lang.errorCannotGetDataFromRemote.format(n.remote))}},t))}),!l)return a(!1);i.renderLoading(!0);var d=i.loadingId;l(e,function(e,t){if(d===i.loadingId){if(i.renderLoading(!1),t)return i.showMessage(t,"danger"),void a(!1);i.resetData(r,e.data,e.pager),a(e.data)}})},y.prototype.getDataItem=function(e,t,a){return"function"==typeof(t=t||this.getData())?t(e,a=a||this.getFilterParams()):t[e]},y.prototype.showMessage=function(e,t,a){var r=this;r.msgerAutoCloseTimer&&(clearTimeout(r.msgerAutoCloseTimer),r.msgerAutoCloseTimer=null);var o=r.$container.find(".datagrid-messager");e?(t=t||"info",a===F&&(a=5e3),o.length||(o=W('<div class="datagrid-messager" style="display: none"><div class="content"></div><button type="button" class="close">×</button></div>').appendTo(r.$container).on("click",".close",function(){o.slideUp(),r.msgerAutoCloseTimer&&(clearTimeout(r.msgerAutoCloseTimer),r.msgerAutoCloseTimer=null)})),o.attr("class","datagrid-messager bg-"+t).find(".content").text(e),o.slideDown(),a&&(r.msgerAutoCloseTimer=setTimeout(function(){o.slideUp(),r.msgerAutoCloseTimer=null},a))):o.slideUp()},y.prototype.renderLoading=function(e){e!==F&&(this.states.loading=e);var t=this.$container.find(".datagrid-loading");e?(t.length||(t=W('<div class="datagrid-loading" style="display: none"><div class="content"><i class="icon icon-spin icon-spinner icon-2x"></i><div className="datagrid-loading-message"></div></div></div>').appendTo(this.$container)),t.find(".datagrid-loading-message").text("string"==typeof e?e:""),t.fadeIn()):t.fadeOut()},y.prototype.getData=function(e){var t=this.dataSource,a=null;if(e&&e!==t.dataId){if(t.cache&&t.cache.length)for(var r=t.cache.length-1;0<=r;--r){var o=t.cache[r];if(o.id===e){t.dataId=e,t.data=o.data,this.setPager(o.pager),a=o.data;break}}}else a=t.data;return a},y.prototype.resetData=function(e,t,a){var r=this.dataSource;if(r.dataId=e,r.data=t,r.cache){for(var o=r.cache.length-1;0<o;--o){if(r.cache[o].id===e){r.cache.splice(o,1);break}}for(r.cache.push({id:e,data:t,pager:W.extend({},a)});r.cache.length>r.cacheSize;)r.cache.shift()}a&&this.setPager(a)},y.prototype.getRowLayout=function(e){var t=this.layout;if(0===e)return{top:0,height:t.headerHeight};var a=t.rowHeight;return{height:a,top:t.headerHeight+(1<e?(e-1)*a:0)+e*t.borderWidth}},y.prototype.updateLayout=function(){var e=this,t=e.options,a=e.layout,r=(e.data,e.pager),o=r.pageRecCount,i=e.$container,n=i.width(),l=e.dataSource;if(!l.cols.length&&o&&W.each(e.getDataItem(0),function(e){l.cols.push({name:e})}),!a.cols){for(var s,d,c=l.cols,h=t.colAutoMinWidth,g=t.colAutoDefaultWidth,f=0,u=0,p=t.rowIndexWidth,v=[{left:0,width:t.showRowIndex?"auto"===p?8*(o+e.pager.skip+"").length+18:p:0}],m=0,w=v[0].width,y=!1,C=0,b=0,x=0;x<c.length;++x){var S=c[x];S&&((d=S.width)&&"auto"!==d||(d=.1),s={left:0},1<=d?(S.minWidth!==F&&(d=Math.max(d,S.minWidth)),w+=s.width=d):(S.minWidth===F&&(S.minWidth=h),f+=s.grow=d,u+=S.minWidth,C<=s.grow&&(C=s.grow,y=x+1)),s.minWidth=S.minWidth,!b&&S.checkbox&&(b=x+1,s.checkbox=!0),v.push(s))}t.checkable&&!b&&(v[0].checkbox=!0,"auto"===p&&(v[0].width+=30,w+=30));for(var T=n-w,D=T<u,R=v.length,M=0;M<R;++M){if((d=(s=v[M]).width)||0===d||(d=D?g*s.grow*10:T*s.grow/f,d=Math.floor(Math.max(s.minWidth,d)),s.width=d),0<M){var P=v[M-1];s.left=P.left+P.width}m+=d}var L=n-m;y&&0<L&&(v[y].width+=L,m+=L),a.width=m,a.cols=v}a.containerWidth=n,a.rowHeight=t.rowDefaultHeight,a.borderWidth=t.borderWidth,a.headerHeight=t.showHeader?t.headerHeight:0,a.rowsLength=o+1,a.colsLength=a.cols.length,a.height=a.headerHeight+o*(a.rowHeight+a.borderWidth),a.spanMap={};var k=t.height;"page"===k&&(k=a.headerHeight+e.pager.recPerPage*(a.rowHeight+a.borderWidth)),i.css("height",k),a.containerHeight=k,a.vScrollSpare=a.height-a.containerHeight,a.hScrollSpare=a.width-a.containerWidth,e.layout=a;var H=!!r.page||t.partialRendering;return"auto"===H&&(H=a.height>2*a.containerHeight),a.partialRendering=H,a},y.prototype.getCell=function(e,t){var a,r,o=this,i=o.getCellConfig(e,t),n=0<t?o.dataSource.cols[t-1]:null,l={rowIndex:e,colIndex:t,config:i,checked:o.isRowChecked(i.rowId)};if(0===t){a="index";var s=0<e?o.pager.skip+e:"";r=i.label!==F?i.label:s}else 0===e?(a="head",r=i.label!==F?i.label:i.name!==F?i.name:t):(a="cell",r=i.data&&i.data[o.options.dataItemIsArray?t:n.name]);if(0<e){var d=o.options.valueOperator,c=i.valueType,h=i.valueOperator||(d&&c?d[c]:null);h&&h.getter&&(r=h.getter(r,l,o))}r===F&&(r=""),l.value=r,l.type=a;var g=o.layout.spanMap;if(g[i.id]||i.hidden)l.hidden=!0;else if(i.colspan&&1<i.colspan||i.rowspan&&1<i.rowspan){for(var f=e+(i.rowspan||1),u=t+(i.colspan||1),p=e;p<f;++p)for(var v=t;v<u;++v)p===e&&v===t||(g["R"+p+"C"+v]=i.id);i.span=!0}return l},y.prototype.getRowConfig=function(e){var t=this,a="R"+e,r=t.configsCache[a];r||(r=W.extend({},t.isFuncConfigs?t.configs(a):t.configs[a],t.userConfigs[a]),t.configsCache[a]=r);var o=0<e?t.getDataItem(e-1):null;a=(r.data=o)&&(o.rowId||o.id);return r.rowId=a!==F?a:0===e?"#header":e,r},y.prototype.getColConfigByName=function(e){for(var t=this.dataSource.cols,a=0;a<t.length;++a)if(t[a].name===e)return this.getColConfig(a+1);return null},y.prototype.getColConfig=function(e){var t=this,a="C"+e,r=null;return r||(r=W.extend({valueType:"string"},0<e?t.dataSource.cols[e-1]:null,t.layout.cols?t.layout.cols[e]:null,t.isFuncConfigs?t.configs(a):t.configs[a],t.userConfigs[a]),0!==e||t.options.showRowIndex||(r.hidden=!0)),r},y.prototype.getCellConfig=function(e,t){var a=this,r="R"+e+"C"+t,o=null;return o||(o=W.extend({id:r},a.getColConfig(t),a.getRowConfig(e),a.isFuncConfigs?a.configs(r):a.configs[r],a.userConfigs[r])),o},y.prototype.isRowChecked=function(e){return!!this.states.selections[e]},y.prototype.checkRow=function(e,t){var a=this,r=a.states.selections,o=a.getRowConfig(e),i=o.rowId;if(t===F&&(t=!r[i]),r[i]!==t){if(t?r[i]=o:(delete r[i],0<e&&r["#header"]&&(delete r["#header"],a.renderRow(0))),a.renderRow(e),0===e&&a.layout.rowsLength<500)for(var n=1;n<a.layout.rowsLength;++n)a.checkRow(n,t);return a.renderFixeds(),t}},y.prototype.getCheckItems=function(){var e=this.states.selections;console.log(e);var t=[];for(var a in console.log(e),e)console.log(e[a].data),t.push(e[a].data);return t},y.prototype.renderCell=function(e,t,a){var r=this,o=r.options,i=r.getCell(e,t),n=i.config;if(!i.hidden){var l=n.checkbox,s=[r.id,"cell",e,t].join("-"),d=W("#"+s);if(!d.length&&(a=a||W("#"+r.id+"-row-"+e),(d=(o.cellCreator?o.cellCreator(i,r):W('<div class="datagrid-cell" />')).appendTo(a)).attr({id:s,"data-type":i.type,"data-col":i.colIndex,"data-row":i.rowIndex}).toggleClass("datagrid-cell-head",0===e).toggleClass("datagrid-cell-cell","cell"===i.type).toggleClass("datagrid-cell-index",0===t),l)){var c=d.find(".datagrid-checkbox");c.length||(c=W('<div class="checkbox-primary datagrid-checkbox"><label class="content"></label></div>').prependTo(d.addClass("datagrid-has-checkbox")))}var h=o.borderWidth,g=r.layout,f=g.colsLength,u={top:h?-h:0,bottom:h?-h:0,left:h?n.left-h:n.left,width:h?n.width+(f-1===t?2:1)*h:n.width,borderWidth:h};if(n.span&&(n.rowspan&&1<n.rowspan&&(u.bottom-=(n.rowspan-1)*(g.rowHeight+h)),n.colspan&&1<n.colspan))for(var p=t+n.colspan,v=t+1;v<p;++v){var m=r.getCell(e,v);u.width+=m.config.width}var w=n.style;W.isFunction(w)&&(w=w(i,u,r));var y=W.extend({},w,u);if(d.css(y).toggleClass("datagrid-cell-span",!!n.span),o.cellFormator)o.cellFormator(d,i,r);else(l?d.find(".content"):d)[i.config.html?"html":"text"](i.value),n.className&&d.addClass(n.className);if(0<t&&0===e&&o.sortable&&!1!==n.sort){var C=!1;n.name===r.states.sortBy&&(C="desc"===r.states.order?"down":"up");var b=d.find(".datagrid-sorter");b.length||(b=W('<div class="datagrid-sorter"><i class="icon icon-sort"></i></div>').appendTo(d),d.addClass("datagrid-col-sortable")),b.toggleClass("datagrid-sort-up","up"===C).toggleClass("datagrid-sort-down","down"===C)}return l&&(d.find(".datagrid-checkbox").toggleClass("checked",i.checked),a.toggleClass("active",i.checked)),d}},y.prototype.renderRow=function(e){var t=this,a=t.layout,r=t.options,o=t.getRowLayout(e),i=a.colsLength,n=t.id+"-row-"+e,l=W("#"+n);l.length?a.partialRendering&&l.css("top",o.top-a.scrollTop):(l=(r.rowCreator?r.rowCreator(e,t):W('<div class="datagrid-row" />')).appendTo(t.$cells)).attr({id:n,"data-row":e,"data-id":e}).css({top:a.partialRendering?o.top-a.scrollTop:o.top,height:o.height}).toggleClass("datagrid-row-head",0===e).toggleClass("datagrid-row-cell",0!==e);for(var s=0;s<i;++s)t.renderCell(e,s,l);return l},y.prototype.renderData=function(){var e=this,t=e.layout;t.cols||e.updateLayout();var a=1,r=t.rowsLength-1;if(t.partialRendering){var o=t.rowHeight+t.borderWidth;a=Math.min(r,Math.max(1,Math.floor((t.scrollTop-t.headerHeight)/o))),r=Math.min(r,Math.max(1,Math.ceil((t.scrollTop+t.containerHeight-t.headerHeight)/o))),e.$cells.find(".datagrid-row").each(function(){var e=W(this),t=e.data("row");0<t&&!e.hasClass("datagrid-fixed")&&(t<a||r<t)&&e.remove()})}e.options.showHeader&&e.renderRow(0);for(var i=a;i<=r;++i)e.renderRow(i);if(t.vScrollSpare){var n=e.states,l=n.fixedTopUntil,s=n.fixedBottomFrom;if("number"==typeof l&&0<l&&l<a)for(i=1;i<=l;++i)e.renderRow(i);if("number"==typeof s&&0<s&&r<s)for(i=s;i<=t.rowsLength-1;++i)e.renderRow(i)}e.pagerObj&&e.pagerObj.set(e.pager)},y.prototype.render=function(e){var a=this,t=a.options;return!e&&t.renderDelay?(a.renderDelayTimer&&clearTimeout(a.renderDelayTimer),a.renderDelayTimer=setTimeout(function(){a.render(!0)},t.renderDelay)):(a.renderDelayTimer&&(clearTimeout(a.renderDelayTimer),a.renderDelayTimer=null),a.loadData(function(e){var t=a.updateLayout();a.$cells.css({width:t.width,height:t.partialRendering?t.containerHeight:a.layout.height}),a.renderData(),a.renderScrolls(),a.renderFixeds(),a.$.callComEvent(a,"onRender")})),a},y.prototype.setScrollbarOffset=function(e,t){var a=this.layout,r=a.scrollLeft,o=a.scrollTop;if("number"==typeof e){var i=a.hScroll;i.offset!==e&&(r=Math.round(e*a.hScrollSpare/i.space))}if("number"==typeof t){var n=a.vScroll;n.offset!==t&&(o=Math.round(t*a.vScrollSpare/n.space))}this.scroll(r,o)},y.prototype.renderScrolls=function(){var e=this,t=e.layout,a=t.vScrollSpare,r=t.hScrollSpare,o=0<a,i=0<r;if(e.$vScroll.toggle(o),e.$hScroll.toggle(i),t.scrollLeft=i?Math.max(0,Math.min(r,t.scrollLeft)):0,t.scrollTop=o?Math.max(0,Math.min(a,t.scrollTop)):0,o){var n=e.$vScrollbar,l=t.containerHeight/t.height,s=Math.max(20,Math.floor(l*t.containerHeight)),d=(g=t.containerHeight-s)/a,c=Math.round(t.scrollTop*d);t.vScroll={space:g,size:a,scale:d,barSize:s,offset:c};var h={height:s,top:c};n.css(h)}if(i){n=e.$hScrollbar,l=t.containerWidth/t.width,s=Math.max(20,Math.floor(l*t.containerWidth));var g=t.containerWidth-s;h={width:s,left:c=Math.round(t.scrollLeft*g/r)};t.hScroll={offset:c,space:g,size:r,barSize:s},n.css(h)}e.$cells.css({top:t.partialRendering?0:-t.scrollTop,left:-t.scrollLeft})},y.prototype.scroll=function(e,t,a){var r=this,o=new Date,i=r.options.scrollDelay;if(i){if(!a&&r.lastScrollTime&&o-r.lastScrollTime<i)return r.scrollDelayTimer&&clearTimeout(r.scrollDelayTimer),void(r.scrollDelayTimer=setTimeout(function(){r.scroll(e,t)},i-(o-r.lastScrollTime)));r.scrollDelayTimer&&(clearTimeout(r.scrollDelayTimer),r.scrollDelayTimer=null),r.lastScrollTime=o}var n=r.layout,l=!1,s=!1;"number"==typeof e&&(e=Math.max(0,Math.min(e,n.width-n.containerWidth)))!==n.scrollLeft&&(l=!0,n.scrollLeft=e),"number"==typeof t&&(t=Math.max(0,Math.min(t,n.height-n.containerHeight)))!==n.scrollTop&&(s=!0,n.scrollTop=t),s&&n.partialRendering&&r.renderData(),(l||s)&&(r.renderScrolls(),r.renderFixeds()),r.$.callComEvent(r,"onScroll",[e,t,{vScrolled:s,hScrolled:l}])},y.prototype.renderFixeds=function(){var e=this,t=e.states,a=e.layout;if(e.$cells.find(".datagrid-fixed").removeClass("datagrid-fixed"),e.$cells.find(".datagrid-fixed-edge-top").removeClass("datagrid-fixed-edge-top"),e.$cells.find(".datagrid-fixed-edge-bottom").removeClass("datagrid-fixed-edge-bottom"),e.$cells.find(".datagrid-fixed-edge-left").removeClass("datagrid-fixed-edge-left"),e.$cells.find(".datagrid-fixed-edge-right").removeClass("datagrid-fixed-edge-right"),a.vScrollSpare){var r=t.fixedTopUntil;if("number"==typeof r&&-1<r){r=Math.min(r,a.rowsLength);for(var o=0;o<=r;++o){var i=e.getRowLayout(o),n=W("#"+e.id+"-row-"+o),l=a.partialRendering?i.top:i.top+a.scrollTop;n.addClass("datagrid-fixed").css("top",l),o===r&&a.scrollTop&&n.addClass("datagrid-fixed-edge-top")}}else r=-1;var s=t.fixedBottomFrom;if("number"==typeof s&&-1<s)for(o=s=Math.max(-1<r?r+1:1,Math.min(s,a.rowsLength));o<a.rowsLength;++o){i=e.getRowLayout(o),n=W("#"+e.id+"-row-"+o),l=a.partialRendering?i.top-a.vScrollSpare:i.top-a.vScrollSpare+a.scrollTop;n.addClass("datagrid-fixed").css("top",l),o===s&&a.scrollTop<a.vScrollSpare&&n.addClass("datagrid-fixed-edge-bottom")}}if(a.hScrollSpare){var d=t.fixedLeftUntil;if("number"==typeof d&&-1<d){d=Math.min(d,a.colsLength);for(o=0;o<=d;++o){var c=a.cols[o],h=e.$cells.find('.datagrid-cell[data-col="'+o+'"]'),g=c.left+a.scrollLeft-a.borderWidth;h.addClass("datagrid-fixed").css("left",g),o===d&&a.scrollLeft&&h.addClass("datagrid-fixed-edge-left")}}else d=-1;var f=t.fixedRightFrom;if("number"==typeof f&&-1<f)for(o=f=Math.max(-1<d?d+1:1,Math.min(f,a.colsLength));o<a.colsLength;++o){c=a.cols[o],h=e.$cells.find('.datagrid-cell[data-col="'+o+'"]'),g=c.left-a.hScrollSpare+a.scrollLeft;h.addClass("datagrid-fixed").css("left",g),o===f&&a.scrollLeft<a.hScrollSpare&&h.addClass("datagrid-fixed-edge-right")}}},y.DEFAULTS={width:"auto",height:400,rowDefaultHeight:36,colAutoDefaultWidth:80,colAutoMinWidth:50,showHeader:!0,headerHeight:36,showRowIndex:!0,rowIndexWidth:"auto",borderWidth:1,hoverRow:!0,hoverCol:!0,hoverCell:!1,responsive:!0,defaultDateFormater:"yyyy-MM-dd hh:mm",partialRendering:"auto",scrollDelay:0,renderDelay:100,checkByClickRow:!0,selectable:!0,mouseWheelFactor:1},W.fn.datagrid=function(r){return this.each(function(){var e=W(this),t=e.data(v),a="object"==typeof r&&r;t||e.data(v,t=new y(this,a)),"string"==typeof r&&t[r]()})},y.NAME=v,W.fn.datagrid.Constructor=y,W(function(){W('[data-ride="datagrid"]').datagrid()})}(jQuery,void 0);