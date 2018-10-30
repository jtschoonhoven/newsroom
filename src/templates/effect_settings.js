import { html } from 'lit-html';

import { BOOLEAN_INPUT_TYPE, COLOR_INPUT_TYPE, NUMBER_INPUT_TYPE } from '../services/seriously';
import getCheckboxInputTemplate from './inputs/checkbox';
import getColorInputTemplate from './inputs/color';
import getRangeInputTemplate from './inputs/range';


/**
 *
 */
function getEffectSettingsTemplate(effectSetting) {
    const inputTemplates = [];

    // generate an HTML template with <input> with <label> for each effect setting
    if (effectSetting) {
        Object.keys(effectSetting.settings).forEach((settingName) => {
            const setting = effectSetting.settings[settingName];

            // number type settings get a range slider
            if (setting.type === NUMBER_INPUT_TYPE) {
                const inputTemplate = getRangeInputTemplate(setting);
                inputTemplates.push(inputTemplate);
            }

            // color type settings are controled by RGB sliders
            else if (setting.type === COLOR_INPUT_TYPE) {
                const inputTemplate = getColorInputTemplate(setting);
                inputTemplates.push(inputTemplate);
            }

            else if (setting.type === BOOLEAN_INPUT_TYPE) {
                const inputTemplate = getCheckboxInputTemplate(setting);
                inputTemplates.push(inputTemplate);
            }
        });
    }

    // generate an HTML template that includes all <input> tags created above
    const effectSettingsTemplate = html`${inputTemplates}`;
    return effectSettingsTemplate;
}


export default getEffectSettingsTemplate;
