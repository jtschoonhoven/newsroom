import { html } from 'lit-html';


const DEFAULT_HEADLINES = `\
SCIENTISTS BAFFLED BY LASERS
WHALES ARE FISH: "WE WERE WRONG"
NEW RESEARCH CASTS DOUBT ON LIZARDS\
`;


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
        <label for="fx">Select video effect</label>
        <select id="fx" @change=${onEffectChange}>${effectOptionTemplates}</select>
        <p><small>
            Press "Escape" to show/hide this menu.<br/>
            Use arrows to change the backdrop for green screen.<br/>
        </small></p>
        <small><strong>Ticker text:</br></strong></small>
        <textarea id="ticker-text">${DEFAULT_HEADLINES}</textarea>
        <input type="checkbox" id="ticker-toggle" checked />
        <small><strong>Show ticker</br></strong></small>
    `;

    return effectSelectorTemplate;
}


export default getEffectSelectorTemplate;
