import $ from 'jquery';

import { html } from 'lit-html';


/**
 * Return an HTML template for the news ticker.
 * Rendering the template must be done separately.
 */
function getNewsTickerTemplate() {
    const textSource = $('#ticker-text');

    function getText() {
        const rawText = textSource.text();
        console.log(textSource);
        const result = rawText.split('\n').map(line => line.trim()).join(' • ');
        console.log(result);
        return result;
    }

    textSource.change(() => {
        textSource.text = getText();
    });

    return html`
        <h2 id="headline">BREAKING NEWS</h2>
        <marquee id="marquee" behavior="scroll" direction="left">${getText(textSource)}</marquee>
        <img id="logo" src="img/logo_white.png" />
    `;
}


export default getNewsTickerTemplate;
