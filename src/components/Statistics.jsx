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

function Statistics({ monthlyTotals }) {
  if (Object.keys(monthlyTotals).length === 0) {
    return (
      <div className="statistics">
        <Nav />
        <div className="statistics__norecords">
          <div className="statistics__norecords__monthlist">
            <h2 className="statistics__title">No recorded expenses</h2>
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

  const generateMonthYearKeys = () => {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: 12 },
      (_, month) => `${String(month + 1).padStart(2, "0")}/${currentYear}`
    );
  };

  const groupByMonthYear = (totals) => {
    return Object.entries(totals).reduce(
      (grouped, [date, { total, purchaseCount }]) => {
        grouped[date] = {
          total: (grouped[date]?.total || 0) + total,
          purchaseCount: (grouped[date]?.purchaseCount || 0) + purchaseCount,
        };
        return grouped;
      },
      {}
    );
  };

  const groupedTotals = groupByMonthYear(monthlyTotals);
  const allMonthYearKeys = generateMonthYearKeys();
  const completeTotals = allMonthYearKeys.reduce((acc, monthYear) => {
    acc[monthYear] = groupedTotals[monthYear] || { total: 0, purchaseCount: 0 };
    return acc;
  }, {});

  const formattedData = Object.keys(completeTotals).map((monthYear) => ({
    monthYear: formatMonthYear(monthYear, true),
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
              {Object.entries(completeTotals)
                .filter(([, { purchaseCount }]) => purchaseCount > 0)
                .map(([monthYear, { total, purchaseCount }]) => (
                  <li className="statistics__li" key={monthYear}>
                    <strong>{formatMonthYear(monthYear)}</strong>:{" "}
                    {total.toFixed(2)}€ ({purchaseCount}{" "}
                    {purchaseCount === 1 ? "purchase" : "purchases"})
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
              <Bar dataKey="total" fill="rgb(255, 179, 48)" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
