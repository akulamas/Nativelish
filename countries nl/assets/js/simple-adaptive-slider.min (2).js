class ItcSimpleSlider{static PREFIX="itcss";static CLASS_NAME_ITEM=`${ItcSimpleSlider.PREFIX}__item`;static CLASS_NAME_ITEM_ACTIVE=`${ItcSimpleSlider.PREFIX}__item_active`;static CLASS_NAME_ITEMS=`${ItcSimpleSlider.PREFIX}__items`;static CLASS_NAME_INDICATOR=`${ItcSimpleSlider.PREFIX}__indicator`;static CLASS_NAME_INDICATOR_ACTIVE=`${ItcSimpleSlider.PREFIX}__indicator_active`;static CLASS_NAME_INDICATORS=`${ItcSimpleSlider.PREFIX}__indicators`;static CLASS_NAME_CONTROL=`${ItcSimpleSlider.PREFIX}__control`;static CLASS_NAME_CONTROL_PREV=`${ItcSimpleSlider.PREFIX}__control_prev`;static CLASS_NAME_CONTROL_NEXT=`${ItcSimpleSlider.PREFIX}__control_next`;static CLASS_NAME_CONTROL_SHOW=`${ItcSimpleSlider.PREFIX}__control_show`;static SELECTOR_ITEMS=`.${ItcSimpleSlider.CLASS_NAME_ITEMS}`;static SELECTOR_ITEM=`.${ItcSimpleSlider.CLASS_NAME_ITEM}`;static SELECTOR_ITEM_ACTIVE=`.${ItcSimpleSlider.CLASS_NAME_ITEM_ACTIVE}`;static SELECTOR_INDICATOR_ACTIVE=`.${ItcSimpleSlider.CLASS_NAME_INDICATOR_ACTIVE}`;static SELECTOR_INDICATORS=`.${ItcSimpleSlider.CLASS_NAME_INDICATORS}`;static SELECTOR_WRAPPER=`.${ItcSimpleSlider.PREFIX}__wrapper`;static SELECTOR_CONTROL=`.${ItcSimpleSlider.CLASS_NAME_CONTROL}`;static SELECTOR_CONTROL_NEXT=`.${ItcSimpleSlider.CLASS_NAME_CONTROL_NEXT}`;static SELECTOR_CONTROL_PREV=`.${ItcSimpleSlider.CLASS_NAME_CONTROL_PREV}`;static SWIPE_THRESHOLD=20;static TRANSITION_NONE="transition-none";constructor(t,e){this._el="string"==typeof t?document.querySelector(t):t,this._elWrapper=this._el.querySelector(ItcSimpleSlider.SELECTOR_WRAPPER),this._elItems=this._el.querySelector(ItcSimpleSlider.SELECTOR_ITEMS),this._elsItem=this._el.querySelectorAll(ItcSimpleSlider.SELECTOR_ITEM),this._currentIndex=0,this._minOrder=0,this._maxOrder=0,this._$itemWithMinOrder=null,this._$itemWithMaxOrder=null,this._minTranslate=0,this._maxTranslate=0,this._direction="next",this._balancingItemsFlag=!1,this._transform=0,this._width=this._elWrapper.getBoundingClientRect().width,this._supportResizeObserver=void 0!==window.ResizeObserver,this._hasSwipeState=!1,this._swipeStartPosX=0,this._intervalId=null;if(this._config=Object.assign({autoplay:!1,loop:!0,indicators:!0,interval:5e3,swipe:!0},e),this._elItems.dataset.translate=0,this._elsItem.forEach(((t,e)=>{t.dataset.order=e,t.dataset.index=e,t.dataset.translate=0})),this._config.loop){var i=this._elsItem.length-1,s=-this._elsItem.length;this._elsItem[i].dataset.order=-1,this._elsItem[i].dataset.translate=-this._elsItem.length;var r=s*this._width;this._elsItem[i].style.transform="translateX("+r+"px)"}this._addIndicators(),this._refreshExtremeValues(),this._setActiveClass(),this._addEventListener(),this._autoplay()}_setActiveClass(){const t=this._el.querySelector(ItcSimpleSlider.SELECTOR_ITEM_ACTIVE);t&&t.classList.remove(ItcSimpleSlider.CLASS_NAME_ITEM_ACTIVE);const e=this._el.querySelector(`[data-index="${this._currentIndex}"]`);e&&e.classList.add(ItcSimpleSlider.CLASS_NAME_ITEM_ACTIVE);const i=this._el.querySelector(ItcSimpleSlider.SELECTOR_INDICATOR_ACTIVE);i&&i.classList.remove(ItcSimpleSlider.CLASS_NAME_INDICATOR_ACTIVE);const s=this._el.querySelector(`[data-slide-to="${this._currentIndex}"]`);s&&s.classList.add(ItcSimpleSlider.CLASS_NAME_INDICATOR_ACTIVE);const r=this._el.querySelector(ItcSimpleSlider.SELECTOR_CONTROL_PREV),a=this._el.querySelector(ItcSimpleSlider.SELECTOR_CONTROL_NEXT);r&&r.classList.add(ItcSimpleSlider.CLASS_NAME_CONTROL_SHOW),a&&a.classList.add(ItcSimpleSlider.CLASS_NAME_CONTROL_SHOW),this._config.loop||0!==this._currentIndex?this._config.loop||this._currentIndex!==this._elsItem.length-1||a.classList.remove(ItcSimpleSlider.CLASS_NAME_CONTROL_SHOW):r.classList.remove(ItcSimpleSlider.CLASS_NAME_CONTROL_SHOW),this._el.dispatchEvent(new CustomEvent("active.itc.slider",{bubbles:!0}))}_move(t){var e;if(this._elItems.classList.remove(ItcSimpleSlider.TRANSITION_NONE),!1===t&&this._elItems.classList.add(ItcSimpleSlider.TRANSITION_NONE),"none"===this._direction)return e=this._transform*this._width,void(this._elItems.style.transform="translateX("+e+"px)");if(!this._config.loop){if(this._currentIndex+1>=this._elsItem.length&&"next"===this._direction)return void this._autoplay("stop");if(this._currentIndex<=0&&"prev"===this._direction)return}var i="next"===this._direction?-1:1,s=this._transform+i;"next"===this._direction?++this._currentIndex>this._elsItem.length-1&&(this._currentIndex-=this._elsItem.length):--this._currentIndex<0&&(this._currentIndex+=this._elsItem.length),this._transform=s,this._elItems.dataset.translate=s,e=s*this._width,this._elItems.style.transform="translateX("+e+"px)",this._elItems.dispatchEvent(new CustomEvent("transition-start",{bubbles:!0})),this._setActiveClass()}_moveTo(t,e){var i=this._currentIndex;this._direction=t>i?"next":"prev";for(var s=0;s<Math.abs(t-i);s++)this._move(e)}_autoplay=function(t){if(this._config.autoplay)return"stop"===t?(clearInterval(this._intervalId),void(this._intervalId=null)):void(null===this._intervalId&&(this._intervalId=setInterval(function(){this._direction="next",this._move()}.bind(this),this._config.interval)))};_addIndicators(){if(this._el.querySelector(ItcSimpleSlider.SELECTOR_INDICATORS)||!this._config.indicators)return;let t="";for(let e=0,i=this._elsItem.length;e<i;e++)t+=`<li class="${ItcSimpleSlider.CLASS_NAME_INDICATOR}" data-slide-to="${e}"></li>`;this._el.insertAdjacentHTML("beforeend",`<ol class="${ItcSimpleSlider.CLASS_NAME_INDICATORS}">${t}</ol>`)}_refreshExtremeValues(){this._minOrder=parseInt(this._elsItem[0].dataset.order),this._maxOrder=this._minOrder,this._$itemWithMinOrder=this._elsItem[0],this._$itemWithMaxOrder=this._$itemWithMinOrder,this._minTranslate=parseInt(this._elsItem[0].dataset.translate),this._maxTranslate=this._minTranslate;for(var t=0,e=this._elsItem.length;t<e;t++){var i=this._elsItem[t],s=parseInt(i.dataset.order);s<this._minOrder?(this._minOrder=s,this._$itemWithMinOrder=i,this._minTranslate=parseInt(i.dataset.translate)):s>this._maxOrder&&(this._maxOrder=s,this._$itemWithMaxOrder=i,this._maxTranslate=parseInt(i.dataset.translate))}}_balancingItems(){if(this._balancingItemsFlag){var t,e,i=this._elWrapper.getBoundingClientRect(),s=i.width/2,r=this._elsItem.length;if("next"===this._direction){var a=i.left,n=this._$itemWithMinOrder;t=this._minTranslate,n.getBoundingClientRect().right<a-s&&(n.dataset.order=this._minOrder+r,t+=r,n.dataset.translate=t,e=t*this._width,n.style.transform="translateX("+e+"px)",this._refreshExtremeValues())}else if("prev"===this._direction){var _=i.right,l=this._$itemWithMaxOrder;t=this._maxTranslate,l.getBoundingClientRect().left>_+s&&(l.dataset.order=this._maxOrder-r,t-=r,l.dataset.translate=t,e=t*this._width,l.style.transform="translateX("+e+"px)",this._refreshExtremeValues())}requestAnimationFrame(this._balancingItems.bind(this))}}_addEventListener(){var t=this._elItems;function e(t){if(this._autoplay("stop"),!t.target.closest(ItcSimpleSlider.CLASS_NAME_CONTROL)){var e=0===t.type.search("touch")?t.touches[0]:t;this._swipeStartPosX=e.clientX,this._swipeStartPosY=e.clientY,this._hasSwipeState=!0,this._hasSwiping=!1}}function i(t){if(this._hasSwipeState){var e=0===t.type.search("touch")?t.touches[0]:t,i=this._swipeStartPosX-e.clientX,s=this._swipeStartPosY-e.clientY;if(!this._hasSwiping){if(Math.abs(s)>Math.abs(i)||0===Math.abs(i))return void(this._hasSwipeState=!1);this._hasSwiping=!0}t.preventDefault(),this._config.loop||(this._currentIndex+1>=this._elsItem.length&&i>=0&&(i/=4),this._currentIndex<=0&&i<=0&&(i/=4));var r=i/this._elWrapper.getBoundingClientRect().width,a=this._transform-r;this._elItems.classList.add(ItcSimpleSlider.TRANSITION_NONE),a*=this._width,this._elItems.style.transform="translateX("+a+"px)"}}function s(t){if(this._hasSwipeState){var e=0===t.type.search("touch")?t.changedTouches[0]:t,i=this._swipeStartPosX-e.clientX;if(0!==i){this._config.loop||(this._currentIndex+1>=this._elsItem.length&&i>=0&&(i/=7),this._currentIndex<=0&&i<=0&&(i/=7));var s=i/this._elWrapper.getBoundingClientRect().width*100;this._elItems.classList.remove(ItcSimpleSlider.TRANSITION_NONE),s>ItcSimpleSlider.SWIPE_THRESHOLD?(this._direction="next",this._move()):s<-ItcSimpleSlider.SWIPE_THRESHOLD?(this._direction="prev",this._move()):(this._direction="none",this._move()),this._hasSwipeState=!1,this._config.loop&&this._autoplay()}else this._hasSwipeState=!1}}if(this._el.addEventListener("click",function(t){var e=t.target;if(this._autoplay("stop"),e.classList.contains(ItcSimpleSlider.CLASS_NAME_CONTROL))t.preventDefault(),this._direction=e.dataset.slide,this._move();else if(e.dataset.slideTo){t.preventDefault();var i=parseInt(e.dataset.slideTo);this._moveTo(i)}this._config.loop&&this._autoplay()}.bind(this)),this._config.loop&&(t.addEventListener("transition-start",function(){this._balancingItemsFlag||(this._balancingItemsFlag=!0,window.requestAnimationFrame(this._balancingItems.bind(this)))}.bind(this)),t.addEventListener("transitionend",function(){this._balancingItemsFlag=!1,this._el.dispatchEvent(new CustomEvent("transition-end",{bubbles:!0}))}.bind(this))),this._config.autoplay&&(this._el.addEventListener("mouseenter",function(){this._autoplay("stop")}.bind(this)),this._el.addEventListener("mouseleave",function(){this._config.loop&&this._autoplay()}.bind(this))),this._config.swipe){var r=!1;try{var a=Object.defineProperty({},"passive",{get:function(){r=!0}});window.addEventListener("testPassiveListener",null,a)}catch(t){}this._el.addEventListener("touchstart",e.bind(this),!!r&&{passive:!1}),this._el.addEventListener("touchmove",i.bind(this),!!r&&{passive:!1}),this._el.addEventListener("mousedown",e.bind(this)),this._el.addEventListener("mousemove",i.bind(this)),document.addEventListener("touchend",s.bind(this)),document.addEventListener("mouseup",s.bind(this)),document.addEventListener("mouseout",s.bind(this))}if(this._el.addEventListener("dragstart",function(t){t.preventDefault()}.bind(this)),document.addEventListener("visibilitychange",function(){"hidden"===document.visibilityState?this._autoplay("stop"):"visible"===document.visibilityState&&this._config.loop&&this._autoplay()}.bind(this)),this._supportResizeObserver){var n=new ResizeObserver(function(t){var e,i=t[0].contentBoxSize,s=t[0].contentRect,r=s?s.width:(i[0]||i).inlineSize;if(this._width.toFixed(1)!==r.toFixed(1)){this._autoplay("stop"),this._elItems.classList.add(ItcSimpleSlider.TRANSITION_NONE),this._width=parseInt(r.toFixed(1),10),e=r*parseInt(this._elItems.dataset.translate,10),this._elItems.style.transform="translateX("+e+"px)";for(var a=this._elsItem,n=0;n<a.length;n++)e=parseInt(a[n].dataset.translate)*r,a[n].style.transform="translateX("+e+"px)";this._config.loop&&this._autoplay()}}.bind(this));n.observe(this._elWrapper)}else;}next(){this._direction="next",this._move()}prev(){this._direction="prev",this._move()}autoplay(t){this._autoplay("stop")}moveTo(t,e){this._moveTo(t,e)}}
