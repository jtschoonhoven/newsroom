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

edgeEffect.source = source;
target.source = edgeEffect;

seriously.go();
