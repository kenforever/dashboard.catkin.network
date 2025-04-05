"use client"

import { useEffect, useState } from "react"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

interface IncomeChartProps {
  interval: "daily" | "monthly"
}

export function IncomeChart({ interval }: IncomeChartProps) {
  const [chartData, setChartData] = useState<ChartData<"line" | "bar">>({
    datasets: [],
  })

  useEffect(() => {
    const fetchData = () => {
      // This would be an API call in a real application
      if (interval === "daily") {
        setChartData({
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Income",
              data: [150, 230, 380, 220, 420, 200, 320],
              borderColor: "rgb(99, 102, 241)",
              backgroundColor: "rgba(99, 102, 241, 0.5)",
            },
          ],
        })
      } else {
        setChartData({
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Income",
              data: [1500, 2300, 3800, 2200, 4200, 3800, 4500, 5100, 4700, 5300, 6100, 5800],
              borderColor: "rgb(99, 102, 241)",
              backgroundColor: "rgba(99, 102, 241, 0.5)",
            },
          ],
        })
      }
    }

    fetchData()
  }, [interval])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="h-[300px]">
      {interval === "daily" ? <Bar data={chartData} options={options} /> : <Line data={chartData} options={options} />}
    </div>
  )
}

