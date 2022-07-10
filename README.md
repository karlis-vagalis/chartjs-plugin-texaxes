# chartjs-plugin-texaxes
Chart.js plugin to add support for TeX style axes titles

## Usage

Example of HTML file HEAD:
```html
<script>
MathJax = {
	tex: {},
	svg: {
		fontCache: 'local'
	}
};
</script>

<!-- Load MathJAX required for this plugin, (tex input, svg output) variant -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-mml-svg.js"></script>

<!-- Load plugin script -->
<script src="chartjs-plugin-texaxes.js"></script>
```

Example of usage in Javascript script:
```javascript
const pltConfig = {
	type: "line",
	data: {
		datasets: datasets,
	},
	options: {
		scales: {
			xAxis: {
				type: 'linear',
			},
			yAxis: {
				type: 'linear',
			}
		},
		plugins: {
			texaxes: {
				xTitle : "\\frac{1}{Re}",
				yTitle : "f(x) =  \\frac{1}{xy}",
			}
		}
	}
}

const myChart = new Chart(
	document.getElementById('mainCanvas'),
	pltConfig
);
```
