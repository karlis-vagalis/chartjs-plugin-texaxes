/**
 * Chart.js plugin to display math equation style expressions on x- and y-axes of a chart.
 * 
 * Requires MathJAX v3.0+ using tex input and svg output setting and written for Chart.js v3.8.0
 * 
 * Author: Karlis Vagalis
 * 
 * Version: v1.0
 */

const texaxes = {

	id : "texaxes",

	xTitle : "none",
	yTitle : "none",
	xScaleID : "xAxis",
	yScaleID : "yAxis",
	texOptions : {em: 10, ex: 5, display: true},
	padding : 5,

	_xScale : null,
	_yScale : null,
	_xRender : null,
	_yRender : null,

	beforeInit: function(chart, args, options) {

		// Read user defined plugin options
		if (typeof chart.options.plugins.texaxis.xTitle !== "undefined") {
			this.xTitle = chart.options.plugins.texaxis.xTitle;
		}
		if (typeof chart.options.plugins.texaxis.yTitle !== "undefined") {
			this.yTitle = chart.options.plugins.texaxis.yTitle;
		}
		if (typeof chart.options.plugins.texaxis.xScaleID !== "undefined") {
			this.xScaleID = chart.options.plugins.texaxis.xScaleID;
		}
		if (typeof chart.options.plugins.texaxis.yScaleID !== "undefined") {
			this.yScaleID = chart.options.plugins.texaxis.yScaleID;
		}
		if (typeof chart.options.plugins.texaxis.texOptions !== "undefined") {
			this.texOptions = chart.options.plugins.texaxis.texOptions;
		}
		if (typeof chart.options.plugins.texaxis.padding !== "undefined") {
			this.padding = chart.options.plugins.texaxis.padding;
		}

		// Create MathJAX objects containing titles
		mth_jax_x = MathJax.tex2svg(this.xTitle, this.texOptions);
		mth_jax_y = MathJax.tex2svg(this.yTitle, this.texOptions);

		// Convert MathJAX objects to Image objects via svg as source
		this._xRender = new Image();
		this._xRender.src = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(mth_jax_x.getElementsByTagName("svg")[0].outerHTML)))}`;

		this._yRender = new Image();
		this._yRender.src = `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(mth_jax_y.getElementsByTagName("svg")[0].outerHTML)))}`;

	},
	beforeLayout: function(chart, args, options) {

		// Load scales
		this._xScale = chart.scales[this.xScaleID];
		this._yScale = chart.scales[this.yScaleID];

		// Add space for axes titles
		chart.options.layout.padding.bottom = this._xRender.height + this.padding;
		chart.options.layout.padding.left = this._yRender.height + this.padding;

	},
	afterDraw: function(chart, args, options) {

		var ctx = chart.ctx;

		// Calculate postion for x-Axis title
		var x1 = this._xScale.left + (this._xScale.width / 2) - (this._xRender.width/2);
		var y1 = this._xScale.bottom + this.padding;

		// Calculate postion for y-Axis title
		var x2 = this._yScale.left - this._yRender.height - this.padding;
		var y2 = this._yScale.bottom - (this._yScale.height / 2) + (this._yRender.width/2);
		
		// Draw x-Axis title
		ctx.drawImage(this._xRender, x1, y1);

		// Draw y-Axis title
		ctx.save(); 
		ctx.translate(x2, y2);
		ctx.rotate(-Math.PI/2);
		ctx.drawImage(this._yRender, 0, 0);
		ctx.restore();
	}
}

Chart.register(texaxes);