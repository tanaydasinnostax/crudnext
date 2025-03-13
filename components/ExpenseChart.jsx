"use client";
import {Line} from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, plugins, PointElement, Title, Tooltip } from "chart.js";
import moment from "moment";


ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

export default function ExpenseChart({expenses}){
    const labels = expenses.map((expense) => new Date(expense.expenseDate).toLocaleDateString());
    const values = expenses.map((expense) => expense.value);
    const chartData = {
        labels,
        datasets: [
            {
                label:"Expense Over Time",
                data: values,
                borderColor: "#5726BF",
                backgroundColor: "rgba(87,38,191,0.5",
                fill: true,
            },
        ],
    };
    const options = {
        responsive:true,
        maintainAspectRatio:false,
        plugins: {
            legend: {display:true},
            tooltip: {enabled: true},
        },
        scales:{
            x: {title: {display:true,text:"Date"}},
            y: {title: {display:true,text:"Amount"}},
        },
    };
    return (
        <div className="w-full h-80 bg-gray-300 p-7 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-white,mb-4 text-center">Expense Trend (Date vs Amount)</h2>
            <Line data={chartData} options={options} />
        </div>
    );
}