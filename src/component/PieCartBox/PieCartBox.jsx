import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "../../App.css";

export const PieCartBox = ({ data }) => {
  if (!Array.isArray(data)) {
    return <div className="pie-chart-box__no-data">No data available</div>;
  }

  const limitedData = data.slice(0, 6);

  return (
    <div className="pie-chart-box">
      <div className="pie-chart-box__chart">
        <ResponsiveContainer width="50%" height={190}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={limitedData}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {limitedData.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pie-chart-box__options">
          {limitedData.map((item) => (
            <div className="pie-chart-box__option" key={item.name}>
              <div className="pie-chart-box__title">
                <div
                  className="pie-chart-box__dot"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
              <span className="pie-chart-box__value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
