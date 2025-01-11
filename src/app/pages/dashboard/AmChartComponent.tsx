import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const AmChartComponent: React.FC = () => {
  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        groupData: false,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let series0 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "price0",
        valueXField: "date0",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    let series1 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series 2",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "price1",
        valueXField: "date1",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series0.data.setAll(generateData(2015, 0));
    series1.data.setAll(generateData(2017, 0));

    chart.set(
      "scrollbarX",
      am5.Scrollbar.new(root, {
        orientation: "horizontal",
      })
    );

    return () => {
      root.dispose();
    };
  }, []);

  const generateData = (year: number, seriesIndex: number) => {
    let data = [];
    let price = seriesIndex === 0 ? 1000 : 1200;

    for (let i = 0; i < 360; i++) {
      price += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      data.push({
        ["date" + seriesIndex]: new Date(year, 0, i).getTime(),
        ["price" + seriesIndex]: price,
      });
    }

    return data;
  };

  return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default AmChartComponent;
