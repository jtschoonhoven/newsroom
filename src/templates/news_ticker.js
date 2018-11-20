import $ from 'jquery';

import { html } from 'lit-html';


/**
 * Return an HTML template for the news ticker.
 * Rendering the template must be done separately.
 */
function getNewsTickerTemplate() {
    const textSource = $('#ticker-text');
    const checkboxToggle = $('#ticker-toggle');

    function getText(el) {
        const rawText = el.value;
        const result = rawText.split('\n').map(line => line.trim().toUpperCase()).join(' • ');
        if (!result) {
            return 'YOUR MESSAGE HERE';
        }
        return result;
    }

    textSource.change((e) => {
        const text = getText(e.target);
        document.getElementById('marquee').innerHTML = text;
    });

    checkboxToggle.change((e) => {
        document.getElementById('ticker').hidden = !e.target.checked;
    });

    return html`
        <h2 id="headline">BREAKING NEWS</h2>
        <marquee id="marquee" behavior="scroll" direction="left" scrollamount="12">
            ${getText(textSource[0])}
        </marquee>
        <img id="logo" src="img/logo_white.png" />
    `;
}


export default getNewsTickerTemplate;
