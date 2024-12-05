import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
  VictoryPie,
} from "victory";
import "../scss/components/Statistics.scss";

function Statistics({ monthlyTotals }) {
  if (Object.keys(monthlyTotals).length === 0) {
    return (
      <div className="statistics">
        <div className="statistics-norecords">
          <div className="statistics-norecords-monthlist">
            <h2 className="statistics-title">No hay gastos registrados</h2>
          </div>
        </div>
      </div>
    );
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Deciembre",
  ];

  const formatMonthYear = (monthYear, short = false) => {
    const [month, year] = monthYear.split("/");
    return short
      ? `${month}/${year.slice(-2)}`
      : `${monthNames[+month - 1]} / ${year}`;
  };

  const formattedData = Object.entries(monthlyTotals).map(
    ([date, { total, purchaseCount }]) => ({
      x: formatMonthYear(date, true),
      y: total,
    })
  );

  const formattedDataDonut = Object.entries(monthlyTotals)
    .map(([date, { total }]) => ({
      x: formatMonthYear(date, true),
      y: total,
    }))
    .filter((data) => data.y > 0);

  const colors = [
    "hsl(100,91%,17.5%)",
    "hsl(114.4,26.2%,52.2%)",
    "hsl(99,47.6%,83.5%)",
    "hsl(133.3,52.9%,16.7%)",
    "hsl(45.1,97.5%,46.3%)",
    "hsl(340.3,78.8%,33.3%)",
    "hsl(88,59.6%,43.7%)",
    "hsl(67.9,70.6%,60%)",
    "hsl(336.3,70.6%,60%)",
    "hsl(248.4,100%,8.4%)",
    "hsl(307.5,80%,88.2%)",
    "hsl(0,0%,69.8%)",
  ];

  return (
    <>
      <div className="statistics">
        <div className="statistics-monthlist">
          <h2 className="statistics-title">Gastos Mensuales</h2>
        </div>

        <div className="statistics-chart">
          <div style={{ width: "100%", height: "450px" }}>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={20}
              style={{ height: "100%", width: "100%" }}
            >
              <VictoryAxis
                dependentAxis
                label="Gasto (€)"
                style={{
                  axisLabel: { padding: 40 },
                  ticks: { size: 5 },
                  tickLabels: { fontSize: 12 },
                }}
              />
              <VictoryAxis
                tickFormat={formattedData.map((data) => data.x)}
                style={{
                  axisLabel: { padding: 30 },
                  ticks: { size: 5 },
                  tickLabels: { angle: 45, fontSize: 12, padding: 10 },
                }}
              />
              <VictoryScatter
                className="chart-scatter"
                data={formattedData}
                style={{
                  data: {
                    fill: "hsl(150, 17%, 43%)",
                    stroke: "hsl(150, 17%, 43%)",
                    strokeWidth: 2,
                    size: 6,
                  },
                }}
              />
            </VictoryChart>
          </div>

          <div style={{ marginTop: "40px", width: "100%", height: "400px" }}>
            <VictoryPie
              className="chart-pie"
              data={formattedDataDonut}
              x="x"
              y="y"
              innerRadius={50}
              labelRadius={80}
              style={{
                data: {
                  fill: ({ index }) => colors[index % colors.length],
                  stroke: "#ffffff",
                  strokeWidth: 2,
                },
                labels: {
                  fontSize: 12,
                  fill: "#000",
                },
              }}
              labels={({ datum }) => `${datum.x}: ${datum.y.toFixed(2)}€`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
