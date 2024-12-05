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
        <div className="statistics__norecords">
          <div className="statistics__norecords__monthlist">
            <h2 className="statistics__title">No hay gastos registrados</h2>
          </div>
        </div>
      </div>
    );
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formatMonthYear = (monthYear, short = false) => {
    const [month, year] = monthYear.split("/");
    return short
      ? `${month}/${year.slice(-2)}`
      : `${monthNames[+month - 1]} / ${year}`;
  };

  const formattedData = Object.entries(monthlyTotals).map(
    ([date, { total, purchaseCount }]) => ({
      x: formatMonthYear(date, true), // Eje X: Mes/Año
      y: total, // Eje Y: Total del mes
    })
  );

  const formattedDataDonut = Object.entries(monthlyTotals)
    .map(([date, { total }]) => ({
      x: formatMonthYear(date, true),
      y: total,
    }))
    .filter((data) => data.y > 0);

  const colors = [
    "#ffb330",
    "#57c8ff",
    "#7bff57",
    "#ff5757",
    "#ff33d7",
    "#33ffdf",
    "#ffdb33",
    "#ff5733",
    "#33d7ff",
    "#7b33ff",
    "#57ff7b",
    "#57b8ff",
  ];

  return (
    <>
      <div className="statistics">
        <div className="statistics__monthlist">
          <h2 className="statistics__title">Gastos Mensuales</h2>
          <div className="statistics__list">
            <ul>
              {Object.entries(monthlyTotals)
                .filter(([, { total }]) => total > 0)
                .map(([monthYear, { total, purchaseCount }]) => (
                  <li className="statistics__li" key={monthYear}>
                    <strong>{formatMonthYear(monthYear)}</strong>:{" "}
                    {total.toFixed(2)}€ ({purchaseCount}{" "}
                    {purchaseCount === 1 ? "compra" : "compras"})
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="statistics__chart">
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
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
              className="chart__scatter"
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

          <div style={{ marginTop: "40px" }}>
            <VictoryPie
              className="chart__pie"
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

            <VictoryLegend
              x={350}
              y={10}
              orientation="horizontal"
              gutter={20}
              colorScale={colors}
              data={formattedDataDonut.map((data, index) => ({
                name: data.x,
                symbol: { fill: colors[index % colors.length] },
              }))}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
