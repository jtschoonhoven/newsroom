import { seriousEffects } from '../vendor/seriouslyjs/seriously';


const NUMBER_INPUT_TYPE = 'number';
const BOOLEAN_INPUT_TYPE = 'boolean';
const COLOR_INPUT_TYPE = 'color';
const SETTING_TYPES = [NUMBER_INPUT_TYPE, BOOLEAN_INPUT_TYPE, COLOR_INPUT_TYPE];


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
function getEffectsSettings() {
    const effectsSettings = {};

    // loop through each loaded SeriouslyJS effect
    Object.keys(seriousEffects).forEach((effectName) => {
        const effect = seriousEffects[effectName];

        // skip any property that doesn't accept inputs
        if (!effect.inputs) {
            return;
        }

        // add each effect to the effectSettings object
        effectsSettings[effectName] = {
            name: effect.title || effectName,
            description: effect.description,
            settings: {}, // we'll set this in a moment...
        };

        // save a convenient reference to the effect settings
        const settings = effectsSettings[effectName].settings;

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
    return effectsSettings;
}


export { getEffectsSettings, BOOLEAN_INPUT_TYPE, COLOR_INPUT_TYPE, NUMBER_INPUT_TYPE };
