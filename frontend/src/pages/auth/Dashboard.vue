<template>
  <Layout>
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      <p class="text-sm text-gray-500">
        Welcome back! Here's what's happening today.
      </p>
    </div>

    <!-- Top Grid Section -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link
          to="/adminAudit/manage-user"
          class="transform hover:scale-105 transition-transform duration-300"
        >
          <Card
            title="Users"
            :value="summary.totalUsers"
            icon="👤"
            bgClass="bg-gradient-to-br from-amber-500 to-amber-600"
            textClass="text-white"
          />
        </router-link>

        <router-link
          to="/inventory/sparepart-list"
          class="transform hover:scale-105 transition-transform duration-300"
        >
          <Card
            title="Spareparts"
            :value="summary.totalSpareparts"
            icon="🛠️"
            bgClass="bg-gradient-to-br from-blue-400 to-blue-600"
            textClass="text-white"
          />
        </router-link>

        <router-link
          to="/sa/service-list"
          class="transform hover:scale-105 transition-transform duration-300"
        >
          <Card
            title="Services"
            :value="summary.totalServiceReports || 0"
            icon="📦"
            bgClass="bg-gradient-to-br from-purple-400 to-purple-600"
            textClass="text-white"
          />
        </router-link>

        <router-link
          to="/auth/complete"
          class="transform hover:scale-105 transition-transform duration-300"
        >
          <Card
            title="Completed"
            :value="summary.serviceReportStats?.completed || 0"
            icon="🏁"
            bgClass="bg-gradient-to-br from-green-400 to-green-600"
            textClass="text-white"
          />
        </router-link>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Service Chart -->
      <div
        class="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 h-full flex flex-col"
      >
        <div class="bg-gradient-to-br py-4 px-6">
          <h2 class="text-xl font-bold text-grey flex items-center">
            <span class="mr-2">📊</span> Monthly Service Report
          </h2>
        </div>
        <div class="p-4 flex-1" style="min-height: 300px">
          <BarChart
            :chart-data="chartData"
            :chart-options="chartOptions"
            css-classes="w-full h-full"
          />
        </div>
      </div>

      <!-- Jobdesk Role Section -->
      <div
        class="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100"
      >
        <div class="bg-gradient-to-br py-4 px-6">
          <h2 class="text-xl font-bold text-grey flex items-center">
            <span class="mr-2">🗂️</span> Role Job Descriptions
          </h2>
        </div>

        <div class="p-7 overflow-auto max-100">
          <table class="min-w-full text-sm divide-y divide-gray-200">
            <thead class="sticky top-0 bg-white">
              <tr>
                <th
                  class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
                >
                  Role
                </th>
                <th
                  class="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
                >
                  Responsibilities
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(job, index) in jobdesks"
                :key="index"
                class="hover:bg-gray-50 transition-colors duration-200"
              >
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                      :class="getRoleBadgeColor(job.role)"
                    >
                      <span class="text-white text-sm font-medium">{{
                        job.role.charAt(0)
                      }}</span>
                    </div>
                    <span class="font-medium text-gray-900">{{
                      job.role
                    }}</span>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <p class="text-gray-700">{{ job.task }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { BarChart } from "vue-chart-3";
import api from "@/api/api.js";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

import Card from "@/components/dashboard/Card.vue";
import Layout from "@/components/dashboard/Layout.vue";

// Data summary dari backend
const summary = ref({
  totalUsers: 0,
  totalSpareparts: 0,
  totalServiceReports: 0,
  serviceReportStats: {
    completed: 0,
  },
});

// Data jobdesk per role
const jobdesks = [
  {
    role: "Sales Assistant",
    task: "Membuat Service Order dan mengelola Service List pelanggan.",
  },
  {
    role: "Quality Control",
    task: "Melakukan First QC dan Final QC terhadap barang yang diservice.",
  },
  {
    role: "Mechanic",
    task: "Memperbaiki barang sesuai checklist dan update status service.",
  },
  {
    role: "Inventory",
    task: "Mengelola data sparepart dan membuat Daily Report stok.",
  },
  {
    role: "Admin Audit",
    task: "Mengelola user, approval sparepart, serta memantau audit trail.",
  },
];

// Data chart with improved styling
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Total Service",
      backgroundColor: "rgba(255, 183, 77, 0.8)",
      borderColor: "#FF9800",
      borderWidth: 4,
      borderRadius: 6,
      data: [],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      titleFont: {
        size: 14,
        weight: "bold",
      },
      bodyFont: {
        size: 13,
      },
      displayColors: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        drawBorder: false,
        color: "rgba(0, 0, 0, 0.05)",
      },
      ticks: {
        font: {
          size: 12,
        },
      },
    },
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        font: {
          size: 12,
        },
      },
    },
  },
  animation: {
    duration: 2000,
    easing: "easeOutQuart",
  },
});

// Warna badge role with more vibrant colors
const getRoleBadgeColor = (role) => {
  const colors = {
    "Sales Assistant": "bg-amber-500",
    "Quality Control": "bg-purple-500",
    Mechanic: "bg-blue-500",
    Inventory: "bg-green-500",
    "Admin Audit": "bg-red-500",
  };
  return colors[role] || "bg-gray-500";
};

// Fetch data dari API
const fetchSummary = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/auth/dashboard/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    summary.value = response.data;

    // Ambil chart data
    const chartRes = await api.get("/service-report/chart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (chartRes.data && chartRes.data.labels && chartRes.data.data) {
      const { labels, data } = chartRes.data;
      chartData.value.labels = labels;
      chartData.value.datasets[0].data = data;
    }
  } catch (err) {
    console.error("Gagal fetch summary/chart:", err);
  }
};

onMounted(() => {
  fetchSummary();
});
</script>

<style scoped>
/* Add custom animations and transitions */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.layout-content {
  animation: fadeIn 0.5s ease-out;
}
</style>
