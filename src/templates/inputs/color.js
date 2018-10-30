import { html } from 'lit-html';


/**
 *
 */
function getColorInputTemplate(setting) {
    return html`
        <label>${setting.name} Red</label>
        <input type="range" id=setting-${setting.name}-red value=0 min=0 max=255/>
        <br />

        <label>${setting.name} Green</label>
        <input type="range" id=setting-${setting.name}-green value=0 min=0 max=255/>
        <br />

        <label>${setting.name} Blue</label>
        <input type="range" id=setting-${setting.name}-blue value=0 min=0 max=255/>
        <br />
    `;
}


export default getColorInputTemplate;
