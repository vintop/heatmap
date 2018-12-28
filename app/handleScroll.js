import DOMEle from "./domElements";

let handleScroll = {

    scrolldata:[],
    isScrolling: false,
    isActiveOnPage: true,
    isIdleOnPageBeyondThreshold: false,
    ALLOWED_IDLE_TIME: 1000,
    MIN_SCROLL_TIME_DIFF: 1000,
    visibilityChangeEventName: undefined,
    hiddenPropName: undefined,
    checkstateTimeoutInMS: 250,
    idleTimeoutThresholdInMS: 30 * 60 * 1000,

    init() {

        handleScroll.lastrecordpos = null;
        handleScroll.lastrecordtime = 0;
        handleScroll.idleAt = {};
        handleScroll.idleSince = 0;
        handleScroll.currentIdleTime = 0;
        handleScroll.initCheckForVisibility();
        handleScroll.initTrack();
    },
    initData () {
        handleScroll.scrolldata = [];
    },
    initTrack() {

        handleScroll.track_pos = {};
        handleScroll.track_start_time = 0;
        handleScroll.track_end_time = 0;
    },
    getScrollPosition(e) {
        const evt = e || window;
        return {
            top: evt.pageYOffset,
            left: evt.pageXOffset,
            height: evt.innerHeight,
            width: evt.innerWidth
        }
    },
    onScroll(evt) {

        handleScroll.isScrolling = true;
        window.setInterval(e => {
            handleScroll.isScrolling = false;
        }, 100);
    },
    isPosMatch(pos1, pos2) {

        if (pos1 == null || pos2 == null) {
            return !1;
        }

        if (pos1.top == pos2.top && pos1.height == pos2.height) {
            return !0;
        }
        return !1;
    },
    isScrollCriteriaSatisfied(currPos) {
        const currtime = +new Date;
        const height = currPos.height;

        if (handleScroll.isIdleOnPageBeyondThreshold) {

            if (handleScroll.track_start_time && handleScroll.track_end_time && handleScroll.track_pos) {

                const timespent = handleScroll.track_end_time - handleScroll.track_start_time - handleScroll.idleTimeoutThresholdInMS;
                handleScroll.pushToScrollData(handleScroll.track_pos, timespent);
                handleScroll.initTrack();

            }
            return !1;
        }

        if (handleScroll.isPosMatch(currPos, handleScroll.idleAt) && !handleScroll.track_start_time && handleScroll.isActiveOnPage) {

            if (!ZAB.zab.exists(handleScroll.lastrecordpos) ||
                (Math.abs(currPos.top - handleScroll.lastrecordpos.top) >= height / 2 &&
                    (currtime - handleScroll.lastrecordtime >= handleScroll.MIN_SCROLL_TIME_DIFF)) ||
                (currtime - handleScroll.idleSince >= handleScroll.ALLOWED_IDLE_TIME)) {

                handleScroll.track_start_time = new Date();
                handleScroll.track_pos = currPos;
                return !1;
            }

        } else if (!handleScroll.isPosMatch(currPos, handleScroll.idleAt) || !handleScroll.isActiveOnPage) {

            handleScroll.track_end_time = new Date();
            handleScroll.idleAt = currPos;
            handleScroll.idleSince = currtime;

            if (handleScroll.track_start_time && handleScroll.track_end_time && handleScroll.track_pos) {

                handleScroll.lastrecordpos = currPos;
                handleScroll.lastrecordtime = currtime;
                return !0;
            }

        }

        return !1;
    },
    pushToScrollData({ top, height }, timespent) {

        if (timespent > 0) {
            handleScroll.scrolldata.push({

                y1: Math.floor(top),
                y2: Math.floor(top) + Math.floor(height),
                h: Math.floor(height),
                t: timespent
            });
        }

    },
    trackScroll() {

        const sPos = handleScroll.getScrollPosition();

        if (!handleScroll.isScrolling && handleScroll.isScrollCriteriaSatisfied(sPos)) {

            const timespent = handleScroll.track_end_time - handleScroll.track_start_time;
            const trackpos = handleScroll.track_pos;

            handleScroll.pushToScrollData(trackpos, timespent);
            handleScroll.initTrack();
        }
    },
    userHasLeftPage() {
        handleScroll.isActiveOnPage = false;
    },
    userHasReturned() {
        handleScroll.isActiveOnPage = true;
    },
    resetIdleTimeout() {

        if (handleScroll.isIdleOnPageBeyondThreshold) {
            handleScroll.userHasReturned();
        }

        handleScroll.isIdleOnPageBeyondThreshold = false;
        handleScroll.currentIdleTime = 0;
    },
    checkVisibilityState() {

        if (!handleScroll.isIdleOnPageBeyondThreshold && handleScroll.currentIdleTime > handleScroll.idleTimeoutThresholdInMS) {

            handleScroll.isIdleOnPageBeyondThreshold = true;
            handleScroll.userHasLeftPage();
        } else {
            handleScroll.currentIdleTime += handleScroll.checkstateTimeoutInMS;
        }
    },
    initCheckForVisibility() {

        if (typeof document.hidden !== "undefined") {
            handleScroll.hiddenPropName = "hidden"; // NO I18N
            handleScroll.visibilityChangeEventName = "visibilitychange"; // NO I18N
        } else if (typeof document.mozHidden !== "undefined") {
            handleScroll.hiddenPropName = "mozHidden"; // NO I18N
            handleScroll.visibilityChangeEventName = "mozvisibilitychange"; // NO I18N
        } else if (typeof document.msHidden !== "undefined") { // NO I18N
            handleScroll.hiddenPropName = "msHidden"; // NO I18N
            handleScroll.visibilityChangeEventName = "msvisibilitychange"; // NO I18N
        } else if (typeof document.webkitHidden !== "undefined") {
            handleScroll.hiddenPropName = "webkitHidden"; // NO I18N
            handleScroll.visibilityChangeEventName = "webkitvisibilitychange"; // NO I18N
        }

        document.addEventListener(handleScroll.visibilityChangeEventName, () => {
            if (document[handleScroll.hiddenPropName]) {
                handleScroll.userHasLeftPage();
            } else {
                handleScroll.userHasReturned();
            }
        }, false);

        window.addEventListener('blur', () => {
            handleScroll.userHasLeftPage();
        });

        window.addEventListener('focus', () => {
            handleScroll.resetIdleTimeout();
            handleScroll.userHasReturned();
        });

        document.addEventListener("keyup", handleScroll.resetIdleTimeout);
        document.addEventListener("touchstart", handleScroll.resetIdleTimeout);
        document.addEventListener("mousemove", handleScroll.resetIdleTimeout);
        document.addEventListener("scroll", handleScroll.resetIdleTimeout);

        setInterval(() => {
            handleScroll.checkVisibilityState();
        }, handleScroll.checkstateTimeoutInMS);

    },
    setUserAsInactive() {

        if (handleScroll.isActiveOnPage) {

            handleScroll.userHasLeftPage();
            handleScroll.trackScroll();
        }
    },
    cleanup() {
        window.clearInterval(handleScroll.scrollInterval);
    }
}

export default handleScroll;
