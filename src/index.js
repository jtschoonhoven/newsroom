import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import { html, render } from 'lit-html';
import $ from 'jquery';
import Seriously, { seriousEffects } from './vendor/seriouslyjs/seriously';

import './vendor/seriouslyjs/effects';
import './vendor/seriouslyjs/sources/seriously.camera';

// constants
const NUMBER_TYPE = 'number';
const BOOLEAN_TYPE = 'boolean';
const COLOR_TYPE = 'color';
const ENUM_TYPE = 'enum';
const SETTING_TYPES = [NUMBER_TYPE, BOOLEAN_TYPE, COLOR_TYPE, ENUM_TYPE];

const RANGE_INPUT_NUM_STEPS = 10;


// setup
const seriously = new Seriously();
const target = seriously.target('canvas');
const reformatTransform = seriously.transform('reformat');
const greenScreenEffect = seriously.effect('chroma');


/**
 * Return an object of all loaded SeriouslyJS effects and their configuration.
 *
 * {
 *     exposure: {
 *         name: 'Exposure',
 *         description: 'exposure control',
 *         settings: {
 *             exposure: {
 *                 name: 'exposure',
 *                 type: 'number',
 *                 default: 1,
 *                 min: -8,
 *                 max: 8,
 *             }
 *         }
 *     },
 *     ...
 * }
 */
function getEffectSettings() {
    const effectSettings = {};

    // loop through each loaded SeriouslyJS effect
    Object.keys(seriousEffects).forEach((effectName) => {
        const effect = seriousEffects[effectName];

        // skip any property that doesn't accept inputs
        if (!effect.inputs) {
            return;
        }

        // add each effect to the effectSettings object
        effectSettings[effectName] = {
            name: effect.title || effectName,
            description: effect.description,
            settings: {}, // we'll set this in a moment...
        };

        // save a convenient reference to the effect settings
        const settings = effectSettings[effectName].settings;

        // add each input as a setting on the effect object
        Object.keys(effect.inputs).forEach((inputName) => {
            const input = effect.inputs[inputName];

            // skip any setting that doesn't have a supported type
            if (!SETTING_TYPES.includes(input.type)) {
                return;
            }

            // extract input configuration and set on settings object
            settings[inputName] = {
                name: inputName,
                type: input.type,
                default: input.defaultValue,
                min: input.min,
                max: input.max,
            };
        });
    });
    return effectSettings;
}


/**
 * Return an HTML template for the "effect selector" dropdown menu.
 * Rendering the template must be done separately.
 */
function getEffectSelectorTemplate(effectSettings) {
    const effectOptionTemplates = [];

    // add an "empty" option to the option templates list
    const emptyOptionTemplate = html`<option disabled selected>Select an effect</option>`;
    effectOptionTemplates.push(emptyOptionTemplate);

    // generate an HTML template for each <option> tag in the <select> menu
    Object.keys(effectSettings).forEach((effectName) => {
        const effect = effectSettings[effectName];
        const optionTemplate = html`<option value=${effectName}>${effect.name}</option>`;
        effectOptionTemplates.push(optionTemplate);
    });

    // generate an HTML template for the <select> menu that includes <option> tags
    const effectSelectorTemplate = html`
        <label for="fx">Choose an effect.</label>
        <select id="fx">${effectOptionTemplates}</select>
    `;

    return effectSelectorTemplate;
}

// temporary hack to render effect selector
const effectSettings = getEffectSettings();
const effectSelectorTemplate = getEffectSelectorTemplate(effectSettings);
render(effectSelectorTemplate, document.getElementById('effect-selector'));


/**
 *
 */
function getNumberInputTemplate(setting) {
    const stepValue = (setting.max - setting.min) / RANGE_INPUT_NUM_STEPS;
    return html`
        <label>${setting.name}</label>
        <input
            type="range"
            id=${setting.name}
            min=${setting.min}
            max=${setting.max}
            step=${stepValue}
            value=${setting.default}
        />
    `;
}


/**
 *
 */
function getEffectSettingsTemplate(effect) {
    const inputTemplates = [];

    // generate an HTML template with <input> with <label> for each effect setting
    Object.keys(effect.settings).forEach((settingName) => {
        const setting = effect.settings[settingName];
        if (setting.type === NUMBER_TYPE) {
            const inputTemplate = getNumberInputTemplate(setting);
            inputTemplates.push(inputTemplate);
        }
    });

    // generate an HTML template that includes all <input> tags created above
    const effectSettingsTemplate = html`${inputTemplates}`;
    return effectSettingsTemplate;
}


// temporary hack to render effect settings
const currentEffect = effectSettings.chroma;
const effectSettingsTemplate = getEffectSettingsTemplate(currentEffect);
render(effectSettingsTemplate, document.getElementById('effect-settings'));


function reformat() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    target.width = window.innerWidth * devicePixelRatio;
    target.height = window.innerHeight * devicePixelRatio;
    reformatTransform.width = target.width;
    reformatTransform.height = target.height;
}
window.onresize = reformat;
reformat();


// green screen settings
const redFilterSlider = $('#gs-red');
const greenFilterSlider = $('#gs-green');
const blueFilterSlider = $('#gs-blue');

redFilterSlider.val(100);
greenFilterSlider.val(150);
blueFilterSlider.val(150);

function adjustColorFilter() {
    greenScreenEffect.screen = [
        redFilterSlider.val() / 255,
        greenFilterSlider.val() / 255,
        blueFilterSlider.val() / 255,
        1,
    ];
}
adjustColorFilter();

$('input[type="range"].gs-color').change(adjustColorFilter);
greenScreenEffect.balance = '#gs-balance';
greenScreenEffect.weight = '#gs-weight';
greenScreenEffect.clipBlack = '#gs-clipBlack';
greenScreenEffect.clipWhite = '#gs-clipWhite';
greenScreenEffect.mask = '#gs-mask';

$('canvas').click(() => {
    const source = seriously.source('camera');

    reformatTransform.source = source;
    greenScreenEffect.source = reformatTransform;
    target.source = greenScreenEffect;

    seriously.go();
});

window.s = seriously;
window.se = seriousEffects;
