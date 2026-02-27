import React from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// --- Mock Data ---
const kpiData = [
    { name: 'Day 1', value: 1800 }, { name: 'Day 2', value: 1900 },
    { name: 'Day 3', value: 1850 }, { name: 'Day 4', value: 1890 }
];

const barData = [
    { category: 'A', group1: 400, group2: 240 },
    { category: 'B', group1: 300, group2: 139 },
    { category: 'C', group1: 200, group2: 980 }
];

const pieData = [
    { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// --- Components ---

const KPICard = ({ title, value, color }:{title:string ,value:string , color:string}) => (
    <div className={`p-4 rounded shadow-md text-white ${color}`}>
        <p className="text-sm opacity-80">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
        <div className="h-10">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpiData}>
                    <Line type="monotone" dataKey="value" stroke="white" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default function Dashboard() {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* 1. Top KPI Row (Sparklines) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <KPICard title="Avg Contract Value" value="1890" color="bg-teal-600" />
                <KPICard title="Lead Response Time" value="1090" color="bg-cyan-500" />
                <KPICard title="Sales Cycle Length" value="11.46k" color="bg-orange-400" />
                <KPICard title="Sales LEP" value="263" color="bg-orange-500" />
            </div>

            {/* 2. Main Chart Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Grouped Bar Chart */}
                <div className="lg:col-span-2 bg-white p-4 rounded shadow">
                    <h3 className="mb-4 font-semibold">Avg. Contract Value</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="group1" fill="#0f9484" />
                            <Bar dataKey="group2" fill="#2er4BF" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Data Table Mockup */}
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="mb-4 font-semibold">Top 5 Channels</h3>
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-teal-800 text-white"><th className="p-2">Date</th><th className="p-2">Source</th></tr>
                        </thead>
                        <tbody>
                            <tr className="border-b"><td className="p-2">01/01/24</td><td className="p-2">Direct</td></tr>
                            <tr className="border-b"><td className="p-2">02/01/24</td><td className="p-2">Organic</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 3. Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {/* Donut Chart */}
                <div className="bg-white p-4 rounded shadow flex flex-col items-center">
                    <h3 className="mb-2 font-semibold">Deal Type</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Placeholder for Bubble Chart / Activity */}
                <div className="bg-white p-4 rounded shadow md:col-span-2">
                    <h3 className="mb-4 font-semibold">Sales Activity</h3>
                    <p className="text-gray-400 text-center py-10">Bubble Chart Integration Point</p>
                </div>
            </div>
        </div>
    )}