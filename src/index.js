import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import $ from 'jquery';
import { render } from 'lit-html';

import Seriously from './vendor/seriouslyjs/seriously';
import './vendor/seriouslyjs/effects';
import './vendor/seriouslyjs/sources/seriously.camera';

import getEffectSelectorTemplate from './templates/effect_selector';
import getEffectSettingsTemplate from './templates/effect_settings';
import getNewsTickerTemplate from './templates/news_ticker';
import { getEffectsSettings } from './services/seriously';

/*
Welcome to the source! I hope you enjoy this project.
This was hacked together under a deadline and is extra kludgy.
There are a lot of worst-practices here so use caution when copy/pasting.
*/


// globals
const seriously = new Seriously();
const target = seriously.target('canvas');
const scale = seriously.transform('reformat');
const effectsSettings = getEffectsSettings();
let backgroundIdx = 0;
let currentEffect;


function reformat() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    target.width = window.innerWidth * devicePixelRatio;
    target.height = target.width;
    scale.width = target.width;
    scale.height = target.height;
}
window.onresize = reformat;
reformat();


/**
 *
 */
function parseColorSetting(settingName) {
    const rInput = $(`#setting-${settingName}-red`);
    const gInput = $(`#setting-${settingName}-green`);
    const bInput = $(`#setting-${settingName}-blue`);

    function toArray() {
        return [rInput.val() / 255, gInput.val() / 255, bInput.val() / 255];
    }

    rInput.change(() => {
        currentEffect[settingName] = toArray();
    });
    gInput.change(() => {
        currentEffect[settingName] = toArray();
    });
    bInput.change(() => {
        currentEffect[settingName] = toArray();
    });

    return toArray();
}


/**
 * Load a new SeriouslyJS effect. Cleanup any old effects.
 */
function loadEffect(effectName) {
    const effectSettings = effectsSettings[effectName];
    if (!scale.source) {
        scale.source = seriously.source('camera');
    }
    if (currentEffect) {
        target.source.destroy();
        currentEffect.destroy();
        currentEffect = undefined;
    }
    if (effectName) {
        currentEffect = seriously.effect(effectName);
        // link to input in dom
        Object.keys(effectSettings.settings).forEach((settingName) => {
            const effectSetting = effectSettings.settings[settingName];

            // special-case for "color" type inputs
            if (effectSetting.type === 'color') {
                currentEffect[settingName] = parseColorSetting(settingName);
            }
            else {
                currentEffect[settingName] = `#setting-${settingName}`;
            }
        });
        currentEffect.source = scale;
        target.source = currentEffect;
    }
    else {
        target.source = scale;
    }
    return currentEffect;
}


/**
 *
 */
function renderEffectSettings(effectName) {
    const effect = effectsSettings[effectName];
    const effectSettingsTemplate = getEffectSettingsTemplate(effect);
    render(effectSettingsTemplate, document.getElementById('effect-settings'));
}


// capture keyboard events
window.addEventListener('keydown', (event) => {
    // show/hide menu
    if (event.key === 'Escape') {
        $('#controls').toggle();
    }

    // change background image on left/right keydown
    else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        // initialize if backgroundIdx is not set
        if (event.key === 'ArrowRight') {
            backgroundIdx += 1;
        }
        else if (event.key === 'ArrowLeft') {
            backgroundIdx -= 1;
        }
        document.getElementById('bg').style.backgroundImage = `url(dist/img/bg_0${backgroundIdx}.jpg)`;
    }
});


/**
 * Define event listener to rerender controls and video on effect change.
 */
function onEffectChange(e) {
    const effectName = e.target.value;
    renderEffectSettings(effectName);
    loadEffect(effectName);
    seriously.go();
}


// temporary hack to render effect selector
const effectSelectorTemplate = getEffectSelectorTemplate(effectsSettings, onEffectChange);
render(effectSelectorTemplate, document.getElementById('effect-selector'));

const newsTickerTemplate = getNewsTickerTemplate();
render(newsTickerTemplate, document.getElementById('ticker'));
