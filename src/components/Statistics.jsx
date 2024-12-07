import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryTheme,
  VictoryPie,
  VictoryTooltip,
} from "victory";
import "../scss/components/Statistics.scss";

function Statistics({ formattedData, formattedDataDonut, tickValues, colors }) {
  if (formattedData.length === 0) {
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

  return (
    <>
      <div className="statistics">
        <div className="statistics-monthlist">
          <h2 className="statistics-title">Gastos Mensuales</h2>
        </div>

        <div className="statistics-chart">
          <div style={{ width: "100%", height: "480px" }}>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={20}
              style={{ height: "100%", width: "100%" }}
            >
              <VictoryAxis
                dependentAxis
                label="Gasto (€)"
                tickValues={tickValues}
                style={{
                  axisLabel: { padding: 40, fontFamily: "'Lato', sans-serif" },
                  ticks: { size: 5 },
                  tickLabels: {
                    fontSize: 12,
                    fontFamily: "'Lato', sans-serif",
                  },
                }}
              />
              <VictoryAxis
                tickFormat={formattedData.map((data) => data.x)}
                style={{
                  axisLabel: { padding: 30, fontFamily: "'Lato', sans-serif" },
                  ticks: { size: 5 },
                  tickLabels: {
                    angle: 45,
                    fontSize: 12,
                    padding: 10,
                    fontFamily: "'Lato', sans-serif",
                  },
                }}
              />
              <VictoryScatter
                className="chart-scatter"
                data={formattedData}
                labels={({ datum }) => `${datum.x}: ${datum.y.toFixed(2)}€`}
                labelComponent={<VictoryTooltip />}
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

          <div style={{ marginTop: "40px", width: "100%", height: "450px" }}>
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
                  fontFamily: "'Lato', sans-serif",
                },
              }}
              labels={({ datum }) => `${datum.x}: ${datum.y.toFixed(2)}€`}
              labelComponent={<VictoryTooltip />}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
