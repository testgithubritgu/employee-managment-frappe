import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { day: "Mon", present: 40, absent: 5 },
    { day: "Tue", present: 38, absent: 7 },
    { day: "Wed", present: 42, absent: 3 },
    { day: "Thu", present: 36, absent: 9 },
    { day: "Fri", present: 44, absent: 1 },
];

export default function AttendanceChart() {
    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="present" stroke="#22c55e" />
                    <Line type="monotone" dataKey="absent" stroke="#ef4444" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}