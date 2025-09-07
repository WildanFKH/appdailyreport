<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Header Section -->
      <header
        class="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b pb-4 space-y-4 sm:space-y-0"
      >
        <div class="flex items-center mb-2">
          <span
            class="bg-amber-100 text-amber-600 p-2.5 rounded-lg mr-3 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </span>
          <h1
            class="text-2xl font-bold text-gray-800 hidden md:block border-r pr-6 mr-6 border-gray-200"
          >
            Service Order List
          </h1>
          <p class="text-gray-600">
            This page displays the list of service orders. You can filter by
            status and search for specific services.
          </p>
        </div>

        <!-- Search Input -->
        <div class="relative w-full sm:w-64">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search service..."
            class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            @input="applyFilters"
          />
          <div class="absolute left-3 top-2.5 text-gray-400">
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
          </div>
        </div>
      </header>

      <!-- Filters -->
      <div class="mb-6">
        <h2 class="text-sm font-medium text-gray-700 mb-2">
          Filter by Status:
        </h2>
        <div class="flex flex-wrap gap-2">
          <button
            @click="selectStatusFilter('all')"
            class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            :class="
              selectedStatus === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            "
          >
            All
          </button>
          <button
            v-for="status in statusOptions"
            :key="status"
            @click="selectStatusFilter(status)"
            class="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            :class="{
              'bg-yellow-500 text-white':
                selectedStatus === 'Pending QC' && status === 'Pending QC',
              'bg-blue-500 text-white':
                selectedStatus === 'Assign Mechanic' &&
                status === 'Assign Mechanic',
              'bg-purple-500 text-white':
                selectedStatus === 'Repaired' && status === 'Repaired',
              'bg-orange-500 text-white':
                selectedStatus === 'Ready for Check' &&
                status === 'Ready for Check',
              'bg-teal-500 text-white':
                selectedStatus === 'Audit Approved' &&
                status === 'Audit Approved',
              'bg-green-500 text-white':
                selectedStatus === 'Completed' && status === 'Completed',
              'bg-red-500 text-white':
                selectedStatus === 'Rejected' && status === 'Rejected',
              'bg-yellow-100 text-yellow-800 hover:bg-yellow-200':
                status === 'Pending QC' && selectedStatus !== 'Pending QC',
              'bg-blue-100 text-blue-800 hover:bg-blue-200':
                status === 'Assign Mechanic' &&
                selectedStatus !== 'Assign Mechanic',
              'bg-purple-100 text-purple-800 hover:bg-purple-200':
                status === 'Repaired' && selectedStatus !== 'Repaired',
              'bg-orange-200 text-orange-800 hover:bg-orange-300':
                status === 'Ready for Check' &&
                selectedStatus !== 'Ready for Check',
              'bg-teal-200 text-teal-800 hover:bg-teal-300':
                status === 'Audit Approved' &&
                selectedStatus !== 'Audit Approved',
              'bg-green-100 text-green-800 hover:bg-green-200':
                status === 'Completed' && selectedStatus !== 'Completed',
              'bg-red-100 text-red-800 hover:bg-red-200':
                status === 'Rejected' && selectedStatus !== 'Rejected',
            }"
          >
            {{ status }}
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-12"
      >
        <svg
          class="animate-spin h-10 w-10 text-primary mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="text-lg text-gray-600">Loading Service Data...</p>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg overflow-hidden">
          <thead class="bg-gray-100">
            <tr class="text-left text-gray-700">
              <th class="py-3 px-4 font-semibold">Customer</th>
              <th class="py-3 px-4 font-semibold">Product</th>
              <th class="py-3 px-4 font-semibold">Service Type</th>
              <th class="py-3 px-4 font-semibold">Components</th>
              <th class="py-3 px-4 font-semibold">Status</th>
              <th class="py-3 px-4 font-semibold">Estimated Date</th>
              <th class="py-3 px-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="report in paginatedReports"
              :key="report._id"
              class="hover:bg-gray-50 transition-colors duration-150"
            >
              <td class="py-3 px-4">
                <div class="font-medium">{{ report.customer.name }}</div>
                <div class="text-sm text-gray-500">
                  {{ report.customer.phone }}
                </div>
              </td>
              <td class="py-3 px-4">
                <div class="font-medium">{{ report.product.brand }}</div>
                <div class="text-sm text-gray-500">
                  {{ report.product.collection }}
                </div>
              </td>
              <td class="py-3 px-4">
                <span
                  class="px-2 py-1 text-xs rounded-full font-semibold"
                  :class="{
                    'bg-blue-100 text-blue-800':
                      report.serviceRequest === 'Repair',
                    'bg-purple-100 text-purple-800':
                      report.serviceRequest === 'Replace',
                  }"
                >
                  {{ report.serviceRequest }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="spare in report.spareparts.slice(0, 2)"
                    :key="spare.name"
                    class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md"
                  >
                    {{ spare.name }}
                    <span v-if="spare.customItem" class="ml-1 text-gray-500"
                      >({{ spare.customItem }})</span
                    >
                  </span>
                  <span
                    v-if="report.spareparts.length > 2"
                    class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md"
                  >
                    +{{ report.spareparts.length - 2 }} Other
                  </span>
                </div>
              </td>
              <td class="py-3 px-4">
                <span
                  class="px-2 py-1 text-xs rounded-full font-semibold"
                  :class="{
                    'bg-yellow-100 text-yellow-800':
                      report.status === 'Pending QC',
                    'bg-blue-100 text-blue-800':
                      report.status === 'Assign Mechanic',
                    'bg-purple-100 text-purple-800':
                      report.status === 'Repaired',
                    'bg-orange-200 text-orange-800':
                      report.status === 'Ready for Check',
                    'bg-teal-200 text-teal-800':
                      report.status === 'Audit Approved',
                    'bg-green-100 text-green-800':
                      report.status === 'Completed',
                    'bg-red-100 text-red-800': report.status === 'Rejected',
                  }"
                >
                  {{ report.status }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-400 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{{
                    new Date(report.finishEstimate).toLocaleDateString("id-ID")
                  }}</span>
                </div>
              </td>
              <td class="py-3 px-4 text-center">
                <router-link
                  :to="`/sa/service-detail/${report._id}`"
                  class="inline-flex items-center px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-opacity-90 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Detail
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div
          v-if="filteredReports.length === 0"
          class="flex flex-col items-center justify-center py-12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p class="text-lg text-gray-500 mb-2">Data Not Found</p>
          <p class="text-gray-400">
            Try changing your search filters or keywords.
          </p>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredReports.length > 0"
          class="flex justify-between items-center mt-6"
        >
          <div class="text-sm text-gray-500">
            Showing
            <span class="font-medium"
              >{{
                Math.min(currentPage * itemsPerPage, filteredReports.length) -
                (currentPage - 1) * itemsPerPage
              }}
              of {{ paginatedReports.length }}</span
            >
            items from page
            <span class="font-medium">{{ currentPage }}</span> (Total:
            <span class="font-medium">{{ filteredReports.length }}</span
            >)
          </div>
          <div class="flex space-x-1">
            <button
              @click="prevPage"
              class="px-3 py-1 border rounded-md hover:bg-gray-50 transition-colors"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              :disabled="currentPage === 1"
            >
              Previous
            </button>

            <!-- Page Numbers -->
            <div class="flex space-x-1">
              <button
                v-for="page in displayedPageNumbers"
                :key="page"
                @click="goToPage(page)"
                class="px-3 py-1 rounded-md transition-colors"
                :class="
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'border hover:bg-gray-50'
                "
              >
                {{ page }}
              </button>
            </div>

            <button
              @click="nextPage"
              class="px-3 py-1 border rounded-md hover:bg-gray-50 transition-colors"
              :class="{
                'opacity-50 cursor-not-allowed': currentPage === totalPages,
              }"
              :disabled="currentPage === totalPages"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import api from "@/api/api.js";
import Layout from "@/components/dashboard/Layout.vue";

const serviceReports = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const selectedStatus = ref("all");
const toast = useToast();

// Pagination variables
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Predefined status options
const statusOptions = [
  "Pending QC",
  "Assign Mechanic",
  "Repaired",
  "Ready for Check",
  "Audit Approved",
  "Completed",
  "Rejected",
];

// Filter service reports based on search query and selected status
const filteredReports = computed(() => {
  let filtered = [...serviceReports.value];

  // Apply status filter if not 'all'
  if (selectedStatus.value !== "all") {
    filtered = filtered.filter(
      (report) => report.status === selectedStatus.value
    );
  }

  // Apply search filter if query exists
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    filtered = filtered.filter((report) => {
      return (
        // Search in customer info
        report.customer.name.toLowerCase().includes(query) ||
        report.customer.phone.toLowerCase().includes(query) ||
        // Search in product info
        report.product.brand.toLowerCase().includes(query) ||
        report.product.collection.toLowerCase().includes(query) ||
        // Search in service type
        report.serviceRequest.toLowerCase().includes(query) ||
        // Search in components
        report.spareparts.some(
          (part) =>
            part.name.toLowerCase().includes(query) ||
            (part.customItem && part.customItem.toLowerCase().includes(query))
        )
      );
    });
  }

  return filtered;
});

// Compute total pages
const totalPages = computed(() => {
  return Math.ceil(filteredReports.value.length / itemsPerPage.value);
});

// Get paginated reports for the current page
const paginatedReports = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredReports.value.slice(startIndex, endIndex);
});

// Calculate which page numbers to show
const displayedPageNumbers = computed(() => {
  const range = [];
  const maxVisiblePages = 5; // Show up to 5 page numbers
  let startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxVisiblePages / 2)
  );
  let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);

  // Adjust startPage if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }

  return range;
});

const selectStatusFilter = (status) => {
  selectedStatus.value = status;
  currentPage.value = 1; // Reset to first page when filter changes
};

const applyFilters = () => {
  currentPage.value = 1; // Reset to first page when search changes
};

const goToPage = (page) => {
  currentPage.value = page;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/service-report", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    serviceReports.value = res.data;
  } catch (err) {
    console.error("Gagal ambil data:", err);
    toast.error("Failed to retrieve service data. Please try again.");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>
