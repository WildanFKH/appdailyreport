<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-6">
      <!-- Header Section -->
      <div class="flex justify-between items-center mb-6 border-b pb-4">
        <div class="flex items-center">
          <div class="bg-red-100 text-red-600 p-3 rounded-lg mr-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-secondary">Audit Trail</h1>
            <p class="text-gray-600 text-sm mt-1">Monitor and track all system activities</p>
          </div>
        </div>
        
        <div class="hidden md:flex items-center">
          <div class="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last updated: {{ currentDateTime }}
          </div>
          
          <button class="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm flex items-center transition shadow-sm" @click="refreshData">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Data
          </button>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="md:w-1/4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select v-model="filters.dateRange" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div class="md:w-1/4">
            <label class="block text-sm font-medium text-gray-700 mb-1">User Role</label>
            <select v-model="filters.role" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option value="all">All Roles</option>
              <option value="SA">Sales Assistant</option>
              <option value="QC">Quality Control</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Inventory">Inventory</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          
          <div class="md:w-1/4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
            <select v-model="filters.actionType" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent">
              <option value="all">All Actions</option>
              <option value="CREATE SERVICE REPORT">Create Service Report</option>
              <option value="UPDATE SERVICE REPORT">Update Service Report</option>
              <option value="DELETE SERVICE REPORT">Delete Service Report</option>
              <option value="FIRST QC SUBMIT">First QC</option>
              <option value="FINAL QC SUBMIT">Final QC</option>
              <option value="MECHANIC CLAIM JOB">Claim Job</option>
              <option value="MECHANIC SUBMIT JOB">Send Report</option>
              <option value="CREATE SPAREPART">Create Sparepart</option>
              <option value="SPAREPART REQUEST">Update Sparepart</option>
              <option value="DELETE SPAREPART">Delete Sparepart</option>
              <option value="APPROVE SPAREPART REQUEST">Approve Sparepart</option>
              <option value="REJECT SPAREPART REQUEST">Reject Sparepart</option>
              <option value="APPROVE SERVICE REPORT">Approve Service</option>
              <option value="REJECT SERVICE REPORT">Reject Service</option>
              <option value="CREATE USER">Create User</option>
              <option value="UPDATE USER">Update User</option>
              <option value="DELETE USER">Delete User</option>

            </select>
          </div>
          
          <div class="md:w-1/4 flex items-end">
            <button class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm flex items-center justify-center transition shadow-sm" @click="applyFilters">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Apply Filters
            </button>
          </div>
        </div>
        
        <!-- Custom date range selector (shows only when custom range is selected) -->
        <div v-if="filters.dateRange === 'custom'" class="mt-4 flex flex-col md:flex-row gap-4">
          <div class="md:w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input 
              type="date" 
              v-model="filters.startDate" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div class="md:w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input 
              type="date" 
              v-model="filters.endDate" 
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="flex flex-col items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
          <p class="text-red-600 font-medium">Loading audit trail data...</p>
        </div>
      </div>

      <!-- Audit Trail Table -->
      <div v-else class="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <div class="bg-red-600 text-white px-4 py-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 class="font-semibold">Activity Log Records</h3>
          </div>
          <div class="text-sm">
            {{ filteredLogs.length }} entries found
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full bg-white text-sm">
            <thead class="bg-gray-100 text-left text-gray-700">
              <tr>
                <th class="p-4 font-semibold">Timestamp</th>
                <th class="p-4 font-semibold">Username</th>
                <th class="p-4 font-semibold">Role</th>
                <th class="p-4 font-semibold">Action</th>
                <th class="p-4 font-semibold">Target ID</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="log in paginatedLogs" :key="log._id" class="border-t hover:bg-gray-50 transition-colors">
                <td class="p-4">
                  <div class="flex items-center">
                    <span class="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                    {{ formatDate(log.timestamp) }}
                  </div>
                </td>
                <td class="p-4">
                  <div class="flex items-center">
                    <div class="bg-gray-200 p-1 rounded-full mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    {{ log.username }}
                  </div>
                </td>
                <td class="p-4">
                  <span :class="{
                    'bg-orange-100 text-orange-800': log.role === 'SA',
                    'bg-purple-100 text-purple-800': log.role === 'QC',
                    'bg-blue-100 text-blue-800': log.role === 'Mechanic',
                    'bg-green-100 text-green-800': log.role === 'Inventory',
                    'bg-red-100 text-red-800': log.role === 'Admin',
                  }" class="px-2 py-1 rounded-md text-xs font-medium">
                    {{ log.role }}
                  </span>
                </td>
                <td class="p-4">
                  <span class="px-2 py-1 rounded-md text-xs font-medium">
                    {{ log.action }}
                  </span>
                </td>
                <td class="p-4">
                  <span class="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {{ log.targetId }}
                  </span>
                </td>
              </tr>
              <tr v-if="filteredLogs.length === 0">
                <td colspan="5" class="p-8 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-lg font-medium mb-1">No audit records found</p>
                    <p class="text-sm">
                      Try changing your filters or refresh the data.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination Section -->
      <div v-if="!loading && filteredLogs.length > 0" class="mt-6 flex justify-between items-center">
        <div class="text-sm text-gray-600">
          Showing <span class="font-medium">{{ paginationStart }}</span> to <span class="font-medium">{{ paginationEnd }}</span> of <span class="font-medium">{{ filteredLogs.length }}</span> entries
        </div>
        
        <div class="flex space-x-1">
          <button 
            :disabled="currentPage === 1" 
            @click="currentPage--" 
            :class="{'text-gray-400 bg-gray-50': currentPage === 1}" 
            class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Previous
          </button>
          
          <template v-if="totalPages <= 5">
            <button 
              v-for="page in totalPages" 
              :key="page" 
              @click="currentPage = page" 
              :class="{'border-red-500 bg-red-500 text-white': currentPage === page, 'border-gray-300 hover:bg-gray-100': currentPage !== page}" 
              class="px-3 py-1 rounded border transition-colors"
            >
              {{ page }}
            </button>
          </template>
          
          <template v-else>
            <!-- First page -->
            <button 
              @click="currentPage = 1" 
              :class="{'border-red-500 bg-red-500 text-white': currentPage === 1, 'border-gray-300 hover:bg-gray-100': currentPage !== 1}" 
              class="px-3 py-1 rounded border transition-colors"
            >
              1
            </button>
            
            <!-- Ellipsis if needed -->
            <span v-if="currentPage > 3" class="px-3 py-1">...</span>
            
            <!-- Pages around current page -->
            <template v-for="page in paginationRange" :key="page">
              <button 
                v-if="page !== 1 && page !== totalPages" 
                @click="currentPage = page" 
                :class="{'border-red-500 bg-red-500 text-white': currentPage === page, 'border-gray-300 hover:bg-gray-100': currentPage !== page}" 
                class="px-3 py-1 rounded border transition-colors"
              >
                {{ page }}
              </button>
            </template>
            
            <!-- Ellipsis if needed -->
            <span v-if="currentPage < totalPages - 2" class="px-3 py-1">...</span>
            
            <!-- Last page -->
            <button 
              @click="currentPage = totalPages" 
              :class="{'border-red-500 bg-red-500 text-white': currentPage === totalPages, 'border-gray-300 hover:bg-gray-100': currentPage !== totalPages}" 
              class="px-3 py-1 rounded border transition-colors"
            >
              {{ totalPages }}
            </button>
          </template>
          
          <button 
            :disabled="currentPage === totalPages" 
            @click="currentPage++" 
            :class="{'text-gray-400 bg-gray-50': currentPage === totalPages}" 
            class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import api from "@/api/api.js";
import Layout from "@/components/dashboard/Layout.vue";

const logs = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const itemsPerPage = ref(20);
const currentDateTime = ref(new Date().toLocaleString("id-ID"));

// Filter state
const filters = ref({
  dateRange: "all",
  role: "all",
  actionType: "all",
  startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
  endDate: new Date().toISOString().split('T')[0]
});

// Fetch initial data
const fetchLogs = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    const res = await api.get("/admin/audit-trail", {
      headers: { Authorization: `Bearer ${token}` },
    });
    logs.value = res.data.length ? res.data : generateMockData(); // Use mock data if API returns empty array
    currentDateTime.value = new Date().toLocaleString("id-ID");
  } catch (err) {
    console.error("Gagal fetch audit trail:", err);
    logs.value = generateMockData(); // Use mock data if API call fails
  } finally {
    loading.value = false;
  }
};

// Generate mock data for demo purposes
const generateMockData = () => {  
  return Array.from({ length: 87 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(Math.floor(Math.random() * 24));
    
    const username = [Math.floor(Math.random() * 5)];
    const role = roles[Math.floor(Math.random() * roles.length)];
    
    return {
      _id: `log_${i + 1}`,
      timestamp: date.toISOString(),
      username: username,
      role: role,
      action: actions[Math.floor(Math.random() * actions.length)],
      targetId: `target_${Math.floor(Math.random() * 1000)}`,
    };
  });
};

// Format date helper
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("id-ID");
};

// Apply filters to the logs
const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    // Date filter
    const logDate = new Date(log.timestamp);
    let passesDateFilter = true;
    
    if (filters.value.dateRange === "today") {
      const today = new Date();
      passesDateFilter = logDate.toDateString() === today.toDateString();
    } else if (filters.value.dateRange === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      passesDateFilter = logDate >= weekAgo;
    } else if (filters.value.dateRange === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      passesDateFilter = logDate >= monthAgo;
    } else if (filters.value.dateRange === "custom") {
      const startDate = new Date(filters.value.startDate);
      const endDate = new Date(filters.value.endDate);
      endDate.setHours(23, 59, 59, 999); // Set to end of day
      passesDateFilter = logDate >= startDate && logDate <= endDate;
    }
    
    // Role filter
    let passesRoleFilter = true;
    if (filters.value.role !== "all") {
      passesRoleFilter = log.role === filters.value.role;
    }
    
    // Action filter
    let passesActionFilter = true;
    if (filters.value.actionType !== "all") {
      passesActionFilter = log.action.toLowerCase().includes(filters.value.actionType.toLowerCase());
    }
    
    return passesDateFilter && passesRoleFilter && passesActionFilter;
  });
});

// Pagination computed properties
const totalPages = computed(() => {
  return Math.ceil(filteredLogs.value.length / itemsPerPage.value);
});

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredLogs.value.slice(start, end);
});

const paginationRange = computed(() => {
  const range = [];
  const startPage = Math.max(2, currentPage.value - 1);
  const endPage = Math.min(totalPages.value - 1, currentPage.value + 1);
  
  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }
  
  return range;
});

const paginationStart = computed(() => {
  return filteredLogs.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1;
});

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredLogs.value.length);
});

// Watch for changes in filters that might affect pagination
watch(filteredLogs, () => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value;
  }
});

// Functions
const refreshData = () => {
  loading.value = true;
  setTimeout(() => {
    fetchLogs();
  }, 300);
};

const applyFilters = () => {
  currentPage.value = 1; // Reset to first page when applying filters
};

onMounted(fetchLogs);
</script>