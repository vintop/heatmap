import handleClick from "./app/handleClick";
import handleScroll from "./app/handleScroll";

class main {

    constructor() {

        if (document.readyState == 'interactive' || document.readyState == 'complete') {
            this.initialize();
        } else {
            document.addEventListener("DOMContentLoaded", this.initialize.bind(this));
        }
    };

    initialize() {

        if (!window.ZAB) {
            return;
        }

        this.initData();
        this.enableHeatmap();
        this.enableScrollmap();
    }

    initData() {

        handleClick.initData();
        handleScroll.initData();
    }

    onPageHide(ev) {

        let heatclicks = handleClick.heatclicks;
        let scrolldata = handleScroll.scrolldata;

        if (!!Object.keys(heatclicks).length) {
            this.sendHeatmapInfo(heatclicks);
        }

        handleScroll.setUserAsInactive();
        if (scrolldata.length > 0) {
            this.sendScrollmapInfo(scrolldata);
        }

        const start = +new Date;
        while ((+new Date - start) < 1000);

        return null;
    }

    enableHeatmap() {

        if (document.addEventListener) {
            document.addEventListener("mousedown", handleClick.click, true);
        } else {
            document.attachEvent("on" + "mousedown", handleClick.click);
        }

        setInterval(() => {

            let heatclicks = handleClick.heatclicks;
            let scrolldata = handleScroll.scrolldata;

            if (!!Object.keys(heatclicks).length) {
                this.sendHeatmapInfo(heatclicks);
            }

            if (scrolldata.length > 0) {
                this.sendScrollmapInfo(scrolldata);
            }

            this.initData();

        }, 10000);


        if (window.addEventListener) {
            window.addEventListener("pagehide", this.onPageHide.bind(this), false);
        } else {
            window.attachEvent("on" + "pagehide", this.onPageHide.bind(this));
        }
    }

    enableScrollmap() {

        if (document.addEventListener) {
            document.addEventListener("scroll", handleScroll.onScroll, false);
        } else {
            document.attachEvent("on" + "scroll", handleScroll.onScroll);
        }

        handleScroll.init();
        handleScroll.cleanup();
        handleScroll.scrollInterval = window.setInterval(handleScroll.trackScroll, 150);
    }

    generateMapRawData() {

        const heatmapdata = [];
        let info;

        if (ZAB.experiment && ZAB.experiment.heatmap === 2) {
            info = {
                a: ZAB.portal,
                b: ZAB.experiment.key,
                c: ZAB.variation.key,
                n: !ZAB.returning,
            }
            heatmapdata.push(info);
        }

        if (ZAB.heatmapexp) {

            info = {
                a: ZAB.portal,
                b: ZAB.heatmapexp.key,
                c: "original", // NO I18N
                n: !ZAB.heatmapexp.returning,
            }
            heatmapdata.push(info);
        }
        return heatmapdata;
    }

    formatHMClicks(clicks) {

        let hmclick;
        const hmclicks = [];

        for (let selector in clicks) {
            hmclick = {};

            if (clicks.hasOwnProperty(selector)) {

                hmclick.s = selector;
                hmclick.dt = handleClick.getSelectorText(selector);
                hmclick.p = clicks[selector];
                hmclicks.push(hmclick);
            }
        }
        return hmclicks;
    }

    generateHeatmapInfo(clicks) {
        const heatmaprawdata = this.generateMapRawData();
        if (!heatmaprawdata || heatmaprawdata.length === 0) {
            return;
        }

        ZAB.zab.generateUserAgentData();
        return {
            hrd: heatmaprawdata,
            urd: ZAB.useragentrawdata,
            hp: this.formatHMClicks(clicks)
        };
    }

    generateScrollmapInfo(scrolldata) {

        const scrollmaprawdata = this.generateMapRawData();
        if (!scrollmaprawdata || scrollmaprawdata.length === 0) {
            return;
        }

        ZAB.zab.generateUserAgentData();
        return {
            srd: scrollmaprawdata,
            urd: ZAB.useragentrawdata,
            sd: scrolldata
        };
    }

    sendScrollmapInfo(scrolldata) {

        if (!ZAB.zab.exists(scrolldata)) {
            return;
        }
        const scrollmapInfo = this.generateScrollmapInfo(scrolldata);
        if (ZAB.zab.exists(scrollmapInfo)) {
            ZAB.zab.sendDataToServer(4, scrollmapInfo);
        }
    }

    sendHeatmapInfo(data) {

        if (!ZAB.zab.exists(data)) {
            return;
        }

        const heatmapInfo = this.generateHeatmapInfo(data);
        if (ZAB.zab.exists(heatmapInfo)) {
            ZAB.zab.sendDataToServer(3, heatmapInfo);
        }
    }
}

if (!window.ps_heatmapscript) {
    window.ps_heatmapscript = new main();
}
