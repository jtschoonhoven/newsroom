import { html } from 'lit-html';


const RANGE_INPUT_NUM_STEPS = 10;


/**
 *
 */
function getRangeInputTemplate(setting) {
    const stepValue = (setting.max - setting.min) / RANGE_INPUT_NUM_STEPS;
    return html`
        <label>${setting.name}</label>
        <input
            type="range"
            id=setting-${setting.name}
            min=${setting.min}
            max=${setting.max}
            step=${stepValue}
            value=${setting.default}
        />
        <br />
    `;
}


export default getRangeInputTemplate;
