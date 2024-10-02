import "../scss/main/Statistics.scss";
import Nav from "./Nav";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import Nuts from "../images/nuts.png";

function Statistics({ monthlyTotals }) {
  if (Object.keys(monthlyTotals).length === 0) {
    return (
      <div className="statistics">
        <Nav />
        <h2 className="statistics__title">No recorded expenses</h2>
      </div>
    );
  }

  const groupByMonthYear = (totals) => {
    const grouped = {};

    Object.keys(totals).forEach((date) => {
      const monthYear = date;

      if (!grouped[monthYear]) {
        grouped[monthYear] = 0;
      }
      grouped[monthYear] += totals[date].total;
    });

    return grouped;
  };

  const groupedTotals = groupByMonthYear(monthlyTotals);

  const monthlyData = {
    labels: Object.keys(groupedTotals),
    datasets: [
      {
        label: "Monthly Expenses (€)",
        data: Object.values(groupedTotals),
        fill: false,
        backgroundColor: "rgba(159, 0, 0, 1)",
        borderColor: "rgba(159, 0, 0, 1)",
        borderWidth: 5,
      },
    ],
  };

  return (
    <div className="statistics">
      <Nav />
      <img className="statistics__nuts" src={Nuts} alt="Nuts" />
      <div className="statistics__container">
        <div className="statistics__monthlist">
          <h2 className="statistics__title">Monthly Expenses </h2>

          <div className="statistics__section">
            <div className="statistics__list">
              <ul>
                {Object.keys(groupedTotals).map((monthYear) => (
                  <li className="statistics__li" key={monthYear}>
                    {monthYear}: {groupedTotals[monthYear].toFixed(2)}€ (
                    {monthlyTotals[monthYear].purchaseCount}{" "}
                    {monthlyTotals[monthYear].purchaseCount === 1
                      ? "purchase"
                      : "purchases"}
                    )
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="statistics__section">
          <div className="statistics__chart">
            <Bar data={monthlyData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
