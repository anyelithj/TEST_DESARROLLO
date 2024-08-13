import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "../../App.css";

export const BarChartBox = ({ data, dataKey, xAxisKey }) => {
  return (
    <div className="bar-chart-box">
      <div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={data}>
            <XAxis dataKey={xAxisKey} />
            <YAxis />
            <Tooltip
              contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey={dataKey} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
