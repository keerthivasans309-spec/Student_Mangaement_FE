import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Layout from "./Layout";

export default function Dashboard() {
  const navigate = useNavigate();
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    instructors: 0,
    enrollments: 0,
  });

  useEffect(() => {
    fetchStats();
    fetchChartData();
  }, []);

  // 🔹 Fetch dashboard stats from backend
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:8080/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // 🔹 Fetch chart data from backend
  const fetchChartData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/dashboard/course-stats",
      );

      const formatted = res.data.map((item) => ({
        name: item.courseName,
        students: item.studentCount,
      }));

      setChartData(formatted);
    } catch (err) {
      console.error("Error fetching chart data:", err);
    }
  };
  return (
    <Layout>
      {/* HEADER */}
      <div className="mb-4">
        <h2 style={{
  fontWeight: "700",
  background: "linear-gradient(to right, #2563eb, #06b6d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent"
}}>
  Dashboard
</h2>
        <p style={{ color: "gray" }}>
          Overview of students, courses and instructors.
        </p>
      </div>

      {/* STATS */}
      <div className="row mb-4">
        <StatCard title="Total Students" value={stats.totalStudents} />
        <StatCard title="Total Courses" value={stats.totalCourses} />
        <StatCard title="Instructors" value={stats.instructors} />
        <StatCard title="Enrollments" value={stats.enrollments} />
      </div>

      {/* CHART */}
      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">Students per Course</h5>

        {chartData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
  <BarChart data={chartData}>
    
    <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
    
    <XAxis 
      dataKey="name" 
      tick={{ fill: "#6b7280" }} 
    />
    
    <YAxis 
      tick={{ fill: "#6b7280" }} 
    />
    
    <Tooltip 
      contentStyle={{
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #e5e7eb"
      }}
    />

    <Bar dataKey="students" fill="#3b82f6" />
    
  </BarChart>
</ResponsiveContainer>
        )}
      </div>
    </Layout>
  );
}
function StatCard({ title, value }) {
  return (
    <div className="col-lg-3 col-md-6 mb-3">
      <div className="card p-3 shadow-sm border-0 h-100">
        <p style={{ color: "gray", marginBottom: 5 }}>{title}</p>
        <h3>{value}</h3>
      </div>
    </div>
  );
}
