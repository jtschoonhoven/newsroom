import { html } from 'lit-html';


/**
 * Return an HTML template for the "effect selector" dropdown menu.
 * Rendering the template must be done separately.
 */
function getEffectSelectorTemplate(settings, onEffectChange) {
    const effectOptionTemplates = [];

    // add an "empty" option to the option templates list
    const emptyOptionTemplate = html`<option disabled selected>Select an effect</option>`;
    effectOptionTemplates.push(emptyOptionTemplate);

    // add "None" option to option templates list
    const noneOptionTemplate = html`<option value>None</option>`;
    effectOptionTemplates.push(noneOptionTemplate);

    // generate an HTML template for each <option> tag in the <select> menu
    Object.keys(settings).forEach((effectName) => {
        const effect = settings[effectName];
        const optionTemplate = html`<option value=${effectName}>${effect.name}</option>`;
        effectOptionTemplates.push(optionTemplate);
    });

    // generate an HTML template for the <select> menu that includes <option> tags
    const effectSelectorTemplate = html`
        <label for="fx">Choose an effect</label>
        <select id="fx" @change=${onEffectChange}>${effectOptionTemplates}</select>
        <p><small>Press "s" or "h" to show/hide this menu. Use arrow keys to change the backdrop.</small></p>
    `;

    return effectSelectorTemplate;
}


export default getEffectSelectorTemplate;
