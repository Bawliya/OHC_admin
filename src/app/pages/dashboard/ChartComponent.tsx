import React, { useEffect, useRef } from "react";
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

Chart.register(PieController, ArcElement, Tooltip, Title, Legend);

const ChartComponent: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Define colors
    const primaryColor = "bg-primary";
    const dangerColor = "bg-danger";
    const successColor = "bg-success";
    const warningColor = "bg-warning";
    const infoColor = "bg-info";

    // Define fonts
    // const fontFamily = "--bs-font-sans-serif";

    // Chart labels
    const labels = ["January", "February", "March", "April", "May"];

    // Chart data
    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100, 80, 120],
          backgroundColor: [
            primaryColor,
            dangerColor,
            successColor,
            warningColor,
            infoColor,
          ],
          hoverOffset: 4,
        },
      ],
    };

    // Chart config
    const config = {
      type: "pie",
      data: data,
      options: {
        plugins: {
          title: {
            display: false,
          },
        },
        responsive: true,
        defaults: {
          //   global: {
          //     defaultFontFamily: fontFamily,
          //   },
        },
      },
    };

    // const myChart = new Chart(chartRef?.current);

    // return () => {
    //   myChart.destroy();
    // };
  }, []);

  return (
    <canvas id="kt_chartjs_3" ref={chartRef} className="mh-400px"></canvas>
  );
};

export default ChartComponent;
