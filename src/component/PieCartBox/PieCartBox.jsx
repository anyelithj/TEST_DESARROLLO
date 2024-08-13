import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "../../App.css";

export const PieCartBox = ({ data }) => {
  if (!Array.isArray(data)) {
    return <div>No data available</div>;
  }

  const limitedData = data.slice(0, 6);

  return (
    <div className="pieChartBox">
      <div className="chartpie">
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
        <div className="options">
          {limitedData.map((item) => (
            <div className="option" key={item.name}>
              <div className="title">
                <div className="dot" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
