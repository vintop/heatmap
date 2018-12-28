 import DOMEle from "./domElements";

 let handleClick = {

     selectorText: {},
     heatclicks : {},

     initData() {

        handleClick.heatclicks = {};
     },
     getSelectorText(selector) {

        if(handleClick.selectorText.hasOwnProperty(selector)){
            return handleClick.selectorText[selector];
        }
        return "";
     },
     addClicks(s, x, y, ele) {

         if (!s) {
             return;
         }
         console.log("dudududuud")
         let exist = false;
         const subheatclicks = {};
         const hc = handleClick.heatclicks[s] || [];

         for (let i = 0; i < hc.length; i++) {
             const obj = hc[i];
             if (obj.x === x && obj.y === y) {
                 obj.c += 1;
                 exist = true;
             }
         }

         if (!exist) {
             subheatclicks.x = x;
             subheatclicks.y = y;
             subheatclicks.c = 1;
             hc.push(subheatclicks);
             handleClick.heatclicks[s] = hc;
         }

         if (!handleClick.selectorText.hasOwnProperty(s)) {

             handleClick.selectorText[s] = DOMEle.getDisplayText(ele);
         }
     },
     click({ srcElement, target, pageX, pageY }) {
         const ele = srcElement || target;
         if (!ele) {
             return;
         }

         let selector;
         let px;
         let py;
         let box;
         let offset;

         selector = DOMEle.getSelector(ele);
         px = pageX;
         py = pageY;
         offset = DOMEle.getOffset(ele);
         box = DOMEle.getBoxWH(ele);
         const xWithinBox = Math.round(1000 * (px - offset.left) / box.width) / 1000;
         const yWithinBox = Math.round(1000 * (py - offset.top) / box.height) / 1000;
         handleClick.addClicks(selector, xWithinBox, yWithinBox, ele);
     }
 }

export default handleClick;
