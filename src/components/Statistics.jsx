import "../scss/main/Statistics.scss";
import Nav from "./Nav";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
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

  const formatMonthYearShort = (monthYear) => {
    const [month, year] = monthYear.split("/");
    return `${month}/${year.slice(-2)}`;
  };

  const generateMonthYearKeys = () => {
    const currentYear = new Date().getFullYear();
    const keys = [];

    for (let month = 1; month <= 12; month++) {
      const monthKey = `${String(month).padStart(2, "0")}/${currentYear}`;
      keys.push(monthKey);
    }

    return keys;
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
  const currentYear = new Date().getFullYear();
  const allMonthYearKeys = generateMonthYearKeys();
  const completeTotals = allMonthYearKeys.reduce((acc, monthYear) => {
    acc[monthYear] = groupedTotals[monthYear] || { total: 0, purchaseCount: 0 };
    return acc;
  }, {});

  const formattedData = Object.keys(completeTotals).map((monthYear) => ({
    monthYear: formatMonthYearShort(monthYear),
    total: completeTotals[monthYear].total,
    purchaseCount: completeTotals[monthYear].purchaseCount,
  }));

  return (
    <div className="statistics">
      <Nav />

      <div className="statistics__section">
        <div className="statistics__monthlist">
          <h2 className="statistics__title">Monthly Expenses</h2>

          <div className="statistics__list">
            <ul>
              {Object.keys(completeTotals)
                .filter(
                  (monthYear) => completeTotals[monthYear].purchaseCount > 0
                )
                .map((monthYear) => (
                  <li className="statistics__li" key={monthYear}>
                    {formatMonthYear(monthYear)}:{" "}
                    {completeTotals[monthYear].total.toFixed(2)}€ (
                    {completeTotals[monthYear].purchaseCount}{" "}
                    {completeTotals[monthYear].purchaseCount === 1
                      ? "purchase"
                      : "purchases"}
                    )
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="statistics__chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={formattedData} margin={{ left: 0, right: 0 }}>
              <XAxis dataKey="monthYear" padding={{ left: 0, right: 15 }} />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#DDAE7E" />
              <Bar dataKey="total" fill="rgb(165, 0, 83)" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
