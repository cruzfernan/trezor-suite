import * as UAParser from 'ua-parser-js';
import iconChrome from './images/browser-chrome.png';
import iconFirefox from './images/browser-firefox.png';

window.onload = () => {
    // TODO: need better text & resolve translations
    const unsupportedBrowser = `<div style="position:absolute;left:0;right:0;top:0;bottom:0;background:#fff;z-index:99999;text-align:center;padding-top:150px"><h1 style="text-rendering:optimizeLegibility;color:#494949;font-weight:bold;margin:0;padding:0;font-size:2rem;padding-bottom:10px">Your browser is not supported</h1><p style="font-size:1rem;line-height:1.8;color:#757575;padding:0;margin:0">Please choose one of the supported browsers</p><div style="width:300px;margin:15px auto"><div style="float:left;width:50%;text-align:center"><img src="${iconChrome}" alt="Chrome" width="56px"><div style="display:block"><a href="https://www.google.com/chrome/" target="_blank" style="display:inline-block;margin-top: 10px;position:relative;align-items:center;padding:11px 24px;text-align:center;border-radius:3px;font-size:1rem;font-weight:300;cursor:pointer;outline:none;background:#01B757;color:#FFFFFF;border:1px solid #01B757;justify-content:center;" rel="noopener noreferrer">Get Chrome</a></div></div><div style="float:left;width:50%;text-align:center"><img src="${iconFirefox}" alt="Firefox" height="56px"><div style="display:block"><a href="https://www.mozilla.org/firefox/" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top: 10px;position:relative;align-items:center;padding:11px 24px;text-align:center;border-radius:3px;font-size:1rem;font-weight:300;cursor:pointer;outline:none;background:#01B757;color:#FFFFFF;border:1px solid #01B757;justify-content:center;">Get Firefox</a></div></div></div></div>`;

    const updateChrome =
        '<div style="position:absolute;left:0;right:0;top:0;bottom:0;background:#fff;z-index:99999;text-align:center;padding-top:150px"><h1 style="text-rendering:optimizeLegibility;color:#494949;font-weight:bold;margin:0;padding:0;font-size:2rem;padding-bottom:10px">Your browser is outdated</h1><p style="font-size:1rem;line-height:1.8;color:#757575;padding:0;margin:0">Please update your browser to the latest version.</p><a href="https://support.google.com/chrome/answer/95414?co=GENIE.Platform%3DDesktop&amp;hl=en" target="_blank" style="display:inline-block;margin-top: 10px;position:relative;align-items:center;padding:11px 24px;text-align:center;border-radius:3px;font-size:1rem;font-weight:300;cursor:pointer;outline:none;background:#01B757;color:#FFFFFF;border:1px solid #01B757;justify-content:center;" rel="noopener noreferrer">Update Chrome</a></div>';

    const updateFirefox =
        '<div style="position:absolute;left:0;right:0;top:0;bottom:0;background:#fff;z-index:99999;text-align:center;padding-top:150px"><h1 style="text-rendering:optimizeLegibility;color:#494949;font-weight:bold;margin:0;padding:0;font-size:2rem;padding-bottom:10px">Your browser is outdated</h1><p style="font-size:1rem;line-height:1.8;color:#757575;padding:0;margin:0">Please update your browser to the latest version.</p><a href="https://support.mozilla.org/en-US/kb/update-firefox-latest-release" target="_blank" style="display:inline-block;margin-top: 10px;position:relative;align-items:center;padding:11px 24px;text-align:center;border-radius:3px;font-size:1rem;font-weight:300;cursor:pointer;outline:none;background:#01B757;color:#FFFFFF;border:1px solid #01B757;justify-content:center;" rel="noopener noreferrer">Update Firefox</a></div>';

    const getChromeAndroid =
        '<div style="position:absolute;left:0;right:0;top:0;bottom:0;background:#fff;z-index:99999;text-align:center;padding-top:150px"><h1 style="text-rendering:optimizeLegibility;color:#494949;font-weight:bold;margin:0;padding:0;font-size:2rem;padding-bottom:10px">Get Chrome for Android</h1><p style="font-size:1rem;line-height:1.8;color:#757575;padding:0;margin:0">Only Chrome for Android has WebUSB support.</p><a href="https://play.google.com/store/apps/details?id=com.android.chrome&hl=en" target="_blank" style="display:inline-block;margin-top: 10px;position:relative;align-items:center;padding:11px 24px;text-align:center;border-radius:3px;font-size:1rem;font-weight:300;cursor:pointer;outline:none;background:#01B757;color:#FFFFFF;border:1px solid #01B757;justify-content:center;" rel="noopener noreferrer">Get Chrome for Android</a></div>';

    const noWebUSB =
        '<div style="position:absolute;left:0;right:0;top:0;bottom:0;background:#fff;z-index:99999;text-align:center;padding-top:150px"><h1 style="text-rendering:optimizeLegibility;color:#494949;font-weight:bold;margin:0;padding:0;font-size:2rem;padding-bottom:10px">No WebUSB support</h1><p style="font-size:1rem;line-height:1.8;color:#757575;padding:0;margin:0">Only Chrome for Android has WebUSB support.</p></div>';

    // this should match browserslist config
    const supportedBrowsers = [
        {
            name: 'Chrome',
            version: 69,
            mobile: true,
        },
        {
            name: 'Chromium',
            version: 69,
            mobile: true,
        },
        {
            name: 'Firefox',
            version: 62,
            mobile: false, // no webusb support
        },
    ];

    const parser = new UAParser();
    const result = parser.getResult();

    const isMobile = result.device.type === 'mobile';
    const supportedBrowser = supportedBrowsers.find(browser => {
        return browser.name === result.browser.name;
    });
    const updateRequired =
        supportedBrowser && result.browser.version
            ? supportedBrowser.version > parseInt(result.browser.version, 10)
            : false;
    const setBody = content => {
        document.body.innerHTML = '';
        document.body.insertAdjacentHTML('afterbegin', content);
    };

    if (result.os.name === 'iOS') {
        // Any iOS device: no WebUSB support (suggest to download iOS app?)
        setBody(noWebUSB);
    } else if (isMobile && (!supportedBrowser || (supportedBrowser && !supportedBrowser.mobile))) {
        // Unsupported mobile browser: get Chrome for Android
        setBody(getChromeAndroid);
    } else if (updateRequired) {
        if (supportedBrowser?.name === 'Chrome' || supportedBrowser?.name === 'Chromium') {
            // Outdated browser: update Chrome
            setBody(updateChrome);
        }
        if (supportedBrowser?.name === 'Firefox') {
            // Outdated browser: update Firefox
            setBody(updateFirefox);
        }
    } else if (!supportedBrowser) {
        // Unsupported browser
        setBody(unsupportedBrowser);
    }
};
