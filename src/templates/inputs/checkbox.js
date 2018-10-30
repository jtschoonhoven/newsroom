import { html } from 'lit-html';


/**
 *
 */
function getCheckboxInputTemplate(setting) {
    return html`
        <label>${setting.name}</label>
        <input type="checkbox" id=setting-${setting.name} ?checked=${setting.default}>
        <br />
    `;
}


export default getCheckboxInputTemplate;
