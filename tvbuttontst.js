(function() {
   'use strict';
   if (!Lampa.Platform.screen("mobile")) {

    function log(lgs) {
        var text = lgs;
        console.log.apply(console.log, ['lmpPlugs', '[TvColorKeys]: ' + lgs])
    }
       log('TVkeys keys loaded');

       var htmlx = '<div> \n \
    <div class="simple-button simple-button--filter selector filter--home"> \n \
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16"> \n \
          <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/> \n \
       </svg> \n \
       <span>Home</span> \n \
       <div class="hide"></div> \n \
    </div> \n \
    <div class="simple-button simple-button--filter selector filter--search"> \n \
       <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg"> \n \
          <circle cx="9.9964" cy="9.63489" r="8.43556" stroke="currentColor" stroke-width="2.4"/> \n \
          <path d="M20.7768 20.4334L18.2135 17.8701" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/> \n \
       </svg> \n \
       <div class="hide"></div> \n \
    </div> \n \
    <div class="simple-button simple-button--filter selector filter--sort"> \n \
       <span>#{filter_sorted}</span> \n \
       <div class="hide"></div> \n \
    </div> \n \
    <div class="simple-button simple-button--filter selector filter--filter"> \n \
       <span>#{filter_filtred}</span> \n \
       <div class="hide"></div> \n \
    </div> \n \
 </div>'

       var styles = '.tfilter_btn_wr { \n \
     border: solid, 0.1em; \n \
     border-radius: 0.8em; \n \
     flex-basis: 24%; \n \
 } \n \
     .simple-button.simple-button--filter { \n \
     margin: 0; \n \
     padding: 1em; \n \
     font-size: 1em !important; \n \
     border-radius 0; \n \
 } \n \
   .torrent-filter { \n \
   display: grid; \n \
   grid-template-columns: 1fr 1fr 1fr 1fr; \n \
   gap: 0px 10px; \n \
   grid-auto-flow: row; \n \
   justify-content: space-between; \n \
   align-content: stretch; \n \
   justify-items: stretch; \n \
   align-items: stretch; \n \
 }'

       Lampa.Template.add('filter', htmlx);
       var styleSheet = document.createElement("style");
       styleSheet.textContent = styles;
       document.head.appendChild(styleSheet);
       log('Templates patched');

       var clCodes = ["ColorF0Red", "ColorF1Green", "ColorF2Yellow", "ColorF3Blue"];
       var act_tfilter = '';
       function plugTVkeys(e) {
           if (e.type == 'start') {
               var tfilter = document.getElementsByClassName("torrent-filter")[0] || '';
               if (tfilter) {
                   if (!tfilter.classList.contains('TVbuttons')) {
                       if (tfilter.children.length > 4) {
                           tfilter.removeChild(tfilter.firstChild)
                       }
                       tfilter.children[0].on('hover:enter', () => Lampa.Activity.push({
                           'component': 'main'
                       }));
                       wrapEach(tfilter);
                       tfilter.addClass('TVbuttons');
                       document.addEventListener("keyup", listenTVkeys);
                       Lampa.Controller.listener.follow('toggle', reBindRight)
                   }
                   act_tfilter = tfilter;
               } else {
                   act_tfilter = '';
                   document.removeEventListener("keyup", listenTVkeys);
                   Lampa.Controller.listener.follow('toggle', reBindRight)
               }
           }
       }

       function wrapEach(tfilter) {
           var toWrap = Array.prototype.slice.call(tfilter.children).slice(0);
           var clrs = ['red', 'green', 'yellow', 'blue'];
           toWrap.forEach(function(el, indx) {
               var wrapperx = document.createElement('div');
               wrapperx.classList.add('tfilter_btn_wr');
               wrapperx.style.borderColor = clrs[indx];
               el.parentNode.insertBefore(wrapperx, el);
               wrapperx.appendChild(el);
           })
       }

       function listenTVkeys(e) {
           var opt;
           if (clCodes.indexOf(e.key) > -1) {
               opt = clCodes.indexOf(e.key)
           } else {
               return
           }
           var tpanel = act_tfilter.children;
           if (tpanel[opt].firstChild.checkVisibility()) {
               Lampa.Utils.trigger(tpanel[opt].firstChild, 'hover:enter')
           }
       }

       function reBindRight(e) {
           if (e.name == 'content') {
               Lampa.Controller.enabled().controller.right = function right() {
                   if (Navigator.canmove('right')) {Navigator.move('right'); log('reBindRigth')}
                   else Lampa.Controller.long();
               };
           }
       }

       Lampa.Listener.follow('activity', plugTVkeys);
       log('Listener started')

   }
})();