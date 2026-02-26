import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface LineData {
    name:string,
    sales:number,
    profit:number
}

type Data = LineData[]
const data: Data = [
    { name: 'Jan', sales: 400, profit: 240 },
    { name: 'Feb', sales: 300, profit: 139 },
    { name: 'Mar', sales: 200, profit: 980 },
];

export default function AttendanceChart() {
    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#8884d8"
                        strokeWidth={2}
                    />

                    <Line
                        type="monotone"
                        dataKey="profit"
                        stroke="#82ca9d"
    
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}