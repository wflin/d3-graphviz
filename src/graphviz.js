import * as d3 from "d3-selection";
import {dispatch} from "d3-dispatch";
import render from "./render";
import dot from "./dot";
import {initViz} from "./dot";
import renderDot from "./renderDot";
import transition from "./transition";
import attributer from "./attributer";
import engine from "./engine";
import totalMemory from "./totalMemory";
import keyMode from "./keyMode";
import fade from "./fade";
import tweenPaths from "./tweenPaths";
import tweenShapes from "./tweenShapes";
import convertEqualSidedPolygons from "./convertEqualSidedPolygons";
import tweenPrecision from "./tweenPrecision";
import growEnteringEdges from "./growEnteringEdges";
import zoom from "./zoom";
import on from "./on";
import logEvents from "./logEvents";

export function Graphviz(selection) {
    if (typeof Worker != 'undefined') {
        this._worker = new Worker("../src/dotWorker.js");
    }
    this._selection = selection;
    this._active = false;
    this._busy = false;
    this._jobs = [];
    this._queue = [];
    this._keyModes = new Set([
        'title',
        'id',
        'tag-index',
        'index'
    ]);
    this._engine = 'dot';
    this._totalMemory = undefined;
    this._keyMode = 'title';
    this._fade = true;
    this._tweenPaths = true;
    this._tweenShapes = true;
    this._convertEqualSidedPolygons = true;
    this._tweenPrecision = 1;
    this._growEnteringEdges = true;
    this._translation = {x: 0, y: 0};
    this._zoom = true;
    this._eventTypes = [
        'initEnd',
        'start',
        'layoutStart',
        'layoutEnd',
        'dataExtractEnd',
        'dataProcessEnd',
        'renderStart',
        'renderEnd',
        'transitionStart',
        'transitionEnd',
        'restoreEnd',
        'end'
    ];
    this._dispatch = dispatch(...this._eventTypes);
    initViz.call(this);
}

export default function graphviz(selector) {
    var g = new Graphviz(d3.select(selector));
    return g;
}

Graphviz.prototype = graphviz.prototype = {
    constructor: Graphviz,
    engine: engine,
    totalMemory: totalMemory,
    keyMode: keyMode,
    fade: fade,
    tweenPaths: tweenPaths,
    tweenShapes: tweenShapes,
    convertEqualSidedPolygons: convertEqualSidedPolygons,
    tweenPrecision: tweenPrecision,
    growEnteringEdges: growEnteringEdges,
    zoom: zoom,
    render: render,
    dot: dot,
    renderDot: renderDot,
    transition: transition,
    attributer: attributer,
    on: on,
    logEvents: logEvents,
};
