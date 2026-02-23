import { useState, type JSX } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function DynamicChart(): JSX.Element {
    const [dataPoints, setDataPoints] = useState([
        { label: "Jan", y: 10 },
        { label: "Feb", y: 15 },
        { label: "Mar", y: 25 }
    ]);

    const options = {
        title: { text: "Monthly Growth" },
        data: [
            {
                type: "line",
                dataPoints
            }
        ]
    };

    return (
        <>
            <CanvasJSChart options={options} />
            <button onClick={() =>
                setDataPoints([...dataPoints, { label: "Apr", y: 30 }])
            }>
                Add Data
            </button>
        </>
    );
}

export default DynamicChart;