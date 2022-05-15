import { useEffect } from "react";
import Chart from "chart.js/auto";

const properties = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness", "valence"];

const FeatureChart = (props) => {
	const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

	useEffect(() => {
		const createDataset = (features) => {
			const dataset = {};
			properties.forEach((prop) => {
				dataset[prop] = features.length ? avg(features.map((feat) => feat && feat[prop])) : features[prop];
			});
			return dataset;
		};

		const createChart = (dataset) => {
			const { type } = props;
			const ctx = document.getElementById("chart");
			const labels = Object.keys(dataset);
			const data = Object.values(dataset);

			new Chart(ctx, {
				type: type || "bar",
				data: {
					labels,
					datasets: [
						{
							label: "",
							data,
							backgroundColor: [
								"rgba(255, 99, 132, 0.3)",
								"rgba(255, 159, 64, 0.3)",
								"rgba(255, 206, 86, 0.3)",
								"rgba(75, 192, 192, 0.3)",
								"rgba(54, 162, 235, 0.3)",
								"rgba(104, 132, 245, 0.3)",
								"rgba(153, 102, 255, 0.3)",
							],
							borderColor: [
								"rgba(255,99,132,1)",
								"rgba(255, 159, 64, 1)",
								"rgba(255, 206, 86, 1)",
								"rgba(75, 192, 192, 1)",
								"rgba(54, 162, 235, 1)",
								"rgba(104, 132, 245, 1)",
								"rgba(153, 102, 255, 1)",
							],
							borderWidth: 1,
						},
					],
				},
				options: {
					layout: {
						padding: {
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
						},
					},
					plugins: {
						legend: {
							display: false,
						},
						title: {
							display: true,
							text: "Audio Features",
							font: {
								size: 19,
							},
							padding: {
								top: 40,
								bottom: 40,
							},
							color: "#d6d6d6cc",
						},
					},
					scales: {
						x: {
							ticks: {
								color: "#b5b5b5",
							},
							grid: {
								color: "#b5b5b540",
							},
						},
						y: {
							ticks: {
								color: "#b5b5b5",
							},
							grid: {
								color: "#b5b5b528",
								borderWidth: 11,
							},
						},
					},
				},
			});
		};

		const parseData = () => {
			let chartStatus = Chart.getChart("chart");
			if (chartStatus != undefined) {
				chartStatus.destroy();
			}
			const { features } = props;
			const dataset = createDataset(features);
			createChart(dataset);
		};

		parseData();
	}, [props]);

	return (
		<div>
			<canvas id="chart" width="600" height="600" />
		</div>
	);
};

export default FeatureChart;
