import { select } from "optimal-select"

let DOMEle = {
    getWindow(ele) {
        return elem !== null && elem === window ? elem : elem.nodeType === 9 && elem.defaultView;
    },
    getSelector(ele) {

        if (!ele) {
            return;
        }

        const options = {
            priority: ['id', 'class'], // NO I18N
            ignore: {
                attribute(name, value, defaultPredicate) {

                    if (!(/id|class/).test(name)) {
                        return true;
                    }

                    return (/data-*/).test(name) || defaultPredicate(name, value);
                }
            }
        };

        return select(ele, options);

    },
    getOffset(ele) {
        return optimize.$(ele).offset();
    },
    getScrollOffset() {
        const scroll = {};
        let xOff = 0;
        let yOff = 0;
        if (window.pageYOffset) {
            // Netscape
            yOff = window.pageYOffset;
            xOff = window.pageXOffset;
        } else if (document.body.scrollLeft || document.body.scrollTop) {
            // firefox
            yOff = document.body.scrollTop;
            xOff = document.body.scrollLeft;
        } else if (document.documentElement &&
            (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
            // IE
            yOff = document.documentElement.scrollTop;
            xOff = document.documentElement.scrollLeft;
        }

        scroll.left = xOff;
        scroll.top = yOff;

        return scroll;
    },
    getBoxWH(ele) {

        const box = {};

        if (ele.getBoundingClientRect) {

            const rect = ele.getBoundingClientRect();
            box.width = Math.floor(rect.width || (rect.right - rect.left));
            box.height = Math.floor(rect.height || (rect.bottom - rect.top));

        } else {
            b.width = ele.offsetWidth;
            b.height = ele.offsetHeight;
        }

        return box;
    },
    getDisplayText(ele) {

        if (!ele) {
            return "";
        }

        let text = "";
        if ((ele.firstChild && ele.firstChild.nodeType == 3) || (ele.lastChild && ele.lastChild.nodeType == 3)) {

            text = optimize.$(ele.firstChild).text().trim() || optimize.$(ele.lastChild).text().trim();

        } else if (ele.nodeName && ele.nodeName.toLowerCase() == "input") {

            if ((ele.type.toLowerCase() == "submit") || (ele.type.toLowerCase() == "button") || (ele.type.toLowerCase() == "radio")) {

                text = ele.value;

            } else {

                text = ele.name;
            }
        }

        return text.substring(0, 200);
    }
}

export default DOMEle;