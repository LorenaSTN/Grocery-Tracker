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

  const formatMonthYear = (monthYear) => {
    const [month, year] = monthYear.split("/");
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
    return `${monthNames[parseInt(month, 10) - 1]} / ${year}`;
  };

  const groupByMonthYear = (totals) => {
    const grouped = {};

    Object.keys(totals).forEach((date) => {
      const monthYear = date;

      if (!grouped[monthYear]) {
        grouped[monthYear] = { total: 0, purchaseCount: 0 };
      }
      grouped[monthYear].total += totals[date].total;
      grouped[monthYear].purchaseCount += totals[date].purchaseCount;
    });

    return grouped;
  };

  const groupedTotals = groupByMonthYear(monthlyTotals);

  const formattedLabels = Object.keys(groupedTotals).map((monthYear) =>
    formatMonthYear(monthYear)
  );

  const monthlyData = {
    labels: formattedLabels,
    datasets: [
      {
        label: "Monthly Expenses (€)",
        data: Object.values(groupedTotals).map((data) => data.total),
        fill: false,
        backgroundColor: "rgb(165, 0, 83 )",
        borderColor: "rgb(165, 0, 83 )",
        borderWidth: 5,
      },
    ],
  };

  const purchasesData = {
    labels: formattedLabels,
    datasets: [
      {
        label: "Number of Purchases",
        data: Object.values(groupedTotals).map((data) => data.purchaseCount),
        fill: false,
        backgroundColor: "rgb(22, 196, 220 )",
        borderColor: "rgb(22, 196, 220 )",
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

          <div className="statistics__list">
            <ul>
              {Object.keys(groupedTotals).map((monthYear) => (
                <li className="statistics__li" key={monthYear}>
                  {formatMonthYear(monthYear)}:{" "}
                  {groupedTotals[monthYear].total.toFixed(2)}€ (
                  {groupedTotals[monthYear].purchaseCount}{" "}
                  {groupedTotals[monthYear].purchaseCount === 1
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
        <div className="statistics__chart">
          <Line data={purchasesData} />
        </div>
      </div>
    </div>
  );
}

export default Statistics;
