<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-6">
      <!-- Header -->
      <header
        class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b pb-6"
      >
        <div class="flex items-center mb-4 md:mb-0">
          <span class="bg-red-100 text-red-600 p-3 rounded-lg mr-4 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </span>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Daily Report</h1>
            <p class="text-gray-600 text-sm mt-1">
              View and analyze daily operational reports with date range selection
            </p>
          </div>
        </div>
        <div class="text-sm text-gray-500 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-1 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Admin Audit Access</span>
        </div>
      </header>

      <!-- Content -->
      <div class="space-y-6">
        <!-- Date Range Picker -->
        <div class="bg-red-50 p-5 rounded-lg border border-red-100 shadow-sm">
          <h2 class="text-lg font-semibold text-red-800 mb-4">
            Report Selection
          </h2>
          
          <!-- Report Type Toggle -->
          <div class="mb-4">
            <div class="flex space-x-1 bg-red-100 p-1 rounded-lg inline-flex">
              <button
                @click="reportType = 'single'"
                :class="[
                  reportType === 'single' 
                    ? 'bg-red-600 text-white' 
                    : 'text-red-600 hover:bg-red-200',
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors'
                ]"
              >
                Single Date
              </button>
              <button
                @click="reportType = 'range'"
                :class="[
                  reportType === 'range' 
                    ? 'bg-red-600 text-white' 
                    : 'text-red-600 hover:bg-red-200',
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors'
                ]"
              >
                Date Range
              </button>
            </div>
          </div>

          <!-- Date Selection -->
          <div class="flex flex-col lg:flex-row items-end gap-4">
            <!-- Single Date -->
            <div v-if="reportType === 'single'" class="flex-1 w-full">
              <label class="block text-sm font-medium text-red-800 mb-2">
                Select Date:
              </label>
              <input
                type="date"
                v-model="selectedDate"
                :max="new Date().toISOString().split('T')[0]"
                class="w-full border-2 border-red-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

            <!-- Date Range -->
            <div v-else class="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-red-800 mb-2">
                  From Date:
                </label>
                <input
                  type="date"
                  v-model="fromDate"
                  :max="toDate"
                  class="w-full border-2 border-red-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-red-800 mb-2">
                  To Date:
                </label>
                <input
                  type="date"
                  v-model="toDate"
                  :min="fromDate"
                  :max="new Date().toISOString().split('T')[0]"
                  class="w-full border-2 border-red-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-2">
              <button
                @click="fetchReport"
                class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Generate Report
              </button>
              
              <button
                v-if="report && Object.keys(report.sparepartUsage || {}).length > 0"
                @click="exportToExcel"
                :disabled="exporting"
                class="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-md transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <svg
                  v-if="!exporting"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div v-else class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                {{ exporting ? 'Exporting...' : 'Export Excel' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Loading Indicator -->
        <div v-if="loading" class="flex justify-center items-center py-12">
          <div class="flex flex-col items-center">
            <div
              class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"
            ></div>
            <p class="text-red-600 font-medium">Loading report data...</p>
          </div>
        </div>

        <!-- Report Content -->
        <div v-else-if="report" class="space-y-6">
          <!-- Report Header -->
          <div class="bg-red-50 p-5 rounded-lg shadow-sm border border-red-100">
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6"
            >
              <div>
                <h2 class="text-xl font-semibold text-red-800">
                  <span v-if="reportType === 'single'">
                    Report for {{ formatDate(selectedDate) }}
                  </span>
                  <span v-else>
                    Report from {{ formatDate(fromDate) }} to {{ formatDate(toDate) }}
                  </span>
                </h2>
                <p class="text-sm text-red-600 mt-1">
                  Generated on {{ new Date().toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) }}
                </p>
              </div>
            </div>

            <!-- Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Total Sparepart -->
              <div
                class="bg-white p-4 rounded-lg shadow-sm border border-red-100 flex items-center"
              >
                <div class="bg-red-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-red-600 font-medium">
                    Total Sparepart Cost
                  </div>
                  <div class="text-2xl font-bold text-red-800">
                    Rp {{ (report.totalSparepartCost || 0).toLocaleString() }}
                  </div>
                </div>
              </div>

              <!-- Total Service Fee -->
              <div
                class="bg-white p-4 rounded-lg shadow-sm border border-red-100 flex items-center"
              >
                <div class="bg-red-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-red-600 font-medium">
                    Total Service Fee
                  </div>
                  <div class="text-2xl font-bold text-red-800">
                    Rp {{ (report.totalServiceFee || 0).toLocaleString() }}
                  </div>
                </div>
              </div>

              <!-- Total Estimated Cost -->
              <div
                class="bg-white p-4 rounded-lg shadow-sm border border-red-100 flex items-center"
              >
                <div class="bg-red-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text-sm text-red-600 font-medium">
                    Total Estimated Cost
                  </div>
                  <div class="text-2xl font-bold text-red-800">
                    Rp {{ (report.totalEstimate || 0).toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Spareparts Table -->
          <div
            class="bg-white rounded-lg shadow-sm border border-red-100 overflow-hidden"
          >
            <div
              class="bg-red-600 text-white px-4 py-3 flex items-center justify-between"
            >
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <h3 class="font-semibold">Spareparts Usage Details</h3>
              </div>
              <div class="text-sm">
                {{ Object.keys(report.sparepartUsage || {}).length }} items found
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="bg-red-50 text-left text-red-800">
                    <th class="p-4 font-semibold">Sparepart Name</th>
                    <th class="p-4 font-semibold">Brand</th>
                    <th class="p-4 font-semibold">Size</th>
                    <th class="p-4 font-semibold">Color</th>
                    <th class="p-4 font-semibold">Quantity</th>
                    <th class="p-4 font-semibold">Unit Price</th>
                    <th class="p-4 font-semibold">Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(data, name) in report.sparepartUsage"
                    :key="name"
                    class="border-t border-red-100 hover:bg-red-50 transition-colors"
                  >
                    <td class="p-4 font-medium">{{ name }}</td>
                    <td class="p-4">{{ data.brand || "-" }}</td>
                    <td class="p-4">{{ data.size || "-" }}</td>
                    <td class="p-4">{{ data.colour || "-" }}</td>
                    <td class="p-4">{{ data.quantity }} pcs</td>
                    <td class="p-4">
                      Rp
                      {{
                        data.quantity > 0
                          ? (data.totalCost / data.quantity).toLocaleString()
                          : (data.unitPrice ?? 0).toLocaleString()
                      }}
                    </td>
                    <td class="p-4 font-semibold">
                      Rp {{ data.totalCost.toLocaleString() }}
                    </td>
                  </tr>
                  <tr
                    v-if="Object.keys(report.sparepartUsage || {}).length === 0"
                    class="border-t border-red-100"
                  >
                    <td colspan="7" class="p-6 text-center text-gray-500">
                      <div class="flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-8 w-8 text-gray-400 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p>No spareparts used for this period</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot
                  v-if="Object.keys(report.sparepartUsage || {}).length > 0"
                  class="bg-red-50 font-semibold text-red-800"
                >
                  <tr>
                    <td colspan="6" class="p-4 text-right">Total</td>
                    <td class="p-4">
                      Rp {{ (report.totalSparepartCost || 0).toLocaleString() }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <!-- No Report Available -->
        <div v-else class="py-12 text-center">
          <div class="bg-red-50 inline-block p-5 rounded-full mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">
            Select Date to Generate Report
          </h3>
          <p class="text-lg text-gray-600 mb-2">
            Choose a single date or date range to view the operational report.
          </p>
          <p class="text-sm text-gray-500 mt-2">
            Reports are available for admin audit personnel only.
          </p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import * as XLSX from 'xlsx';
import api from "@/api/api.js";
import Layout from "@/components/dashboard/Layout.vue";

// Reactive variables
const reportType = ref('single');
const selectedDate = ref(new Date().toISOString().slice(0, 10));
const fromDate = ref(new Date().toISOString().slice(0, 10));
const toDate = ref(new Date().toISOString().slice(0, 10));
const report = ref(null);
const loading = ref(false);
const exporting = ref(false);
const toast = useToast();

// Helper function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Date validation function
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

// Fetch report function
const fetchReport = async () => {
  // Validate dates before making request
  if (reportType.value === 'single') {
    if (!selectedDate.value || !isValidDate(selectedDate.value)) {
      toast.error("Please select a valid date");
      return;
    }
  } else {
    if (!fromDate.value || !isValidDate(fromDate.value)) {
      toast.error("Please select a valid start date");
      return;
    }
    if (!toDate.value || !isValidDate(toDate.value)) {
      toast.error("Please select a valid end date");
      return;
    }
    if (new Date(fromDate.value) > new Date(toDate.value)) {
      toast.error("Start date cannot be later than end date");
      return;
    }
  }

  loading.value = true;
  report.value = null;
  
  try {
    const token = localStorage.getItem("token");
    let endpoint = '';
    
    if (reportType.value === 'single') {
      // Format single date as ISO string for consistency
      const formattedDate = new Date(selectedDate.value).toISOString().split('T')[0];
      endpoint = `/daily-report?date=${formattedDate}`;
    } else {
      // Format date range as ISO strings for consistency
      const formattedFromDate = new Date(fromDate.value).toISOString().split('T')[0];
      const formattedToDate = new Date(toDate.value).toISOString().split('T')[0];
      endpoint = `/daily-report?fromDate=${formattedFromDate}&toDate=${formattedToDate}`;
    }
    
    console.log('Requesting:', endpoint); // Debug log
    
    const res = await api.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    report.value = res.data;
    toast.success("Report data loaded successfully");
  } catch (err) {
    console.error("Error fetching report:", err);
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 403) {
      toast.error(
        "Access denied: Your role does not have permission to view this page."
      );
    } else if (status === 400) {
      toast.error("Invalid date format. Please check your date selection.");
    } else {
      toast.error(message || "Failed to load report data. Please try again.");
    }
  } finally {
    loading.value = false;
  }
};

// Export to Excel function
const exportToExcel = async () => {
  if (!report.value || !report.value.sparepartUsage) {
    toast.error("No data available to export");
    return;
  }

  exporting.value = true;
  
  try {
    // Prepare data for Excel
    const worksheetData = [];
    
    // Add header information
    const dateRange = reportType.value === 'single' 
      ? formatDate(selectedDate.value)
      : `${formatDate(fromDate.value)} - ${formatDate(toDate.value)}`;
      
    worksheetData.push(['INVOICE REPORT']);
    worksheetData.push(['Period:', dateRange]);
    worksheetData.push(['Generated:', new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })]);
    worksheetData.push([]); // Empty row
    
    // Add summary
    worksheetData.push(['SUMMARY']);
    worksheetData.push(['Total Sparepart Cost:', `Rp ${(report.value.totalSparepartCost || 0).toLocaleString()}`]);
    worksheetData.push(['Total Service Fee:', `Rp ${(report.value.totalServiceFee || 0).toLocaleString()}`]);
    worksheetData.push(['Total Estimated Cost:', `Rp ${(report.value.totalEstimate || 0).toLocaleString()}`]);
    worksheetData.push([]); // Empty row
    
    // Add table headers
    worksheetData.push([
      'Sparepart Name',
      'Brand',
      'Size',
      'Color',
      'Quantity',
      'Unit Price (Rp)',
      'Total Cost (Rp)'
    ]);
    
    // Add sparepart data
    Object.entries(report.value.sparepartUsage).forEach(([name, data]) => {
      const unitPrice = data.quantity > 0 
        ? (data.totalCost / data.quantity)
        : (data.unitPrice ?? 0);
        
      worksheetData.push([
        name,
        data.brand || '-',
        data.size || '-',
        data.colour || '-',
        `${data.quantity} pcs`,
        unitPrice,
        data.totalCost
      ]);
    });
    
    // Add total row
    worksheetData.push([
      '', '', '', '', '', 'TOTAL:',
      report.value.totalSparepartCost || 0
    ]);
    
    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
    // Set column widths
    const colWidths = [
      { wch: 25 }, // Sparepart Name
      { wch: 15 }, // Brand
      { wch: 10 }, // Size
      { wch: 10 }, // Color
      { wch: 12 }, // Quantity
      { wch: 15 }, // Unit Price
      { wch: 15 }  // Total Cost
    ];
    worksheet['!cols'] = colWidths;
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice Report');
    
    // Generate filename
    const filename = reportType.value === 'single'
      ? `Invoice_Report_${selectedDate.value}.xlsx`
      : `Invoice_Report_${fromDate.value}_to_${toDate.value}.xlsx`;
    
    // Save file
    XLSX.writeFile(workbook, filename);
    
    toast.success("Excel file exported successfully");
  } catch (error) {
    console.error("Export error:", error);
    toast.error("Failed to export Excel file");
  } finally {
    exporting.value = false;
  }
};

// Initialize with today's report
fetchReport();
</script>