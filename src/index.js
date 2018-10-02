import 'bootstrap';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style/main.scss';
import Seriously from './vendor/seriouslyjs/seriously';
import './vendor/seriouslyjs/sources/seriously.camera';
import './vendor/seriouslyjs/effects/seriously.edge';


const seriously = new Seriously();
const source = seriously.source('camera');
const target = seriously.target('canvas');
const edgeEffect = seriously.effect('edge');
const reformatTransform = seriously.transform('reformat');

function reformat() {
    const devicePixelRatio = window.devicePixelRatio || 1;
    target.width = window.innerWidth * devicePixelRatio;
    target.height = window.innerHeight * devicePixelRatio;
    reformatTransform.width = target.width;
    reformatTransform.height = target.height;
}
window.onresize = reformat;
reformat();

reformatTransform.source = source;
edgeEffect.source = reformatTransform;
target.source = edgeEffect;

seriously.go();
