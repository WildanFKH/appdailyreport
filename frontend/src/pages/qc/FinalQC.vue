<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Header with Icon -->
      <header class="flex items-center space-x-3 mb-8 border-b pb-4">
        <div class="flex items-center mb-2">
          <span
            class="bg-purple-100 text-purple-600 p-2.5 rounded-lg mr-3 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <h1
            class="text-2xl font-bold text-gray-800 hidden md:block border-r pr-6 mr-6 border-gray-200"
          >
            Final Quality Control
          </h1>
          <p class="text-gray-600">
            Approve and finalize the QC process for the reports listed below.
          </p>
        </div>
      </header>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-16"
      >
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"
        ></div>
        <p class="text-gray-600 font-medium">Loading QC data...</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="reports.length === 0"
        class="bg-white rounded-xl shadow-sm p-8 text-center"
      >
        <div
          class="bg-purple-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-gray-400"
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
        </div>
        <p class="text-lg font-medium text-gray-800 mb-2">
          No Reports Available
        </p>
        <p class="text-gray-500">
          There are currently no reports awaiting Final QC approval.
        </p>
      </div>

      <!-- Report Cards Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="report in reports"
          :key="report._id"
          class="bg-white border border-grey-100 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
        >
          <!-- Card Header -->
          <div class="bg-purple-50 border-b px-5 py-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-lg text-gray-800">
                  {{ report.product.brand }}
                </h3>
                <p class="text-gray-500 text-sm">
                  {{ report.product.collection || "Standard Collection" }}
                </p>
              </div>
              <span
                class="px-3 py-1.5 text-xs font-medium rounded-full shadow-sm"
                :class="{
                  'bg-orange-200 text-orange-800 hover:bg-orange-300':
                    report.status === 'Ready for Check',
                }"
              >
                {{ report.status }}
              </span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-5">
            <!-- Customer Info -->
            <div class="mb-4">
              <div class="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-purple-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <h4 class="font-semibold text-gray-700">Customer:</h4>
              </div>
              <div class="ml-7">
                <p class="text-gray-800">{{ report.customer.name }}</p>
                <p class="text-gray-500 text-sm">{{ report.customer.phone }}</p>
              </div>
            </div>

            <!-- Cost Inputs -->
            <div class="space-y-3 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Service Fee</label
                >
                <div class="relative rounded-md shadow-sm">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <span class="text-gray-500 sm:text-sm">Rp</span>
                  </div>
                  <input
                    v-model.number="costs[report._id].service"
                    type="number"
                    class="focus:ring-primary focus:border-primary block w-full pl-10 pr-12 py-2 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <!-- Total Cost -->
            <div class="bg-gray-50 p-3 rounded-lg mb-4">
              <div class="flex justify-between items-center">
                <span class="font-medium text-gray-700">Total Cost:</span>
                <span class="font-bold text-lg text-gray-900">
                  Rp
                  {{ formatNumber(getTotalCost(report)) }}
                </span>
              </div>
            </div>

            <!-- Action Button -->
            <button
              @click="confirmApprove(report)"
              class="w-full flex items-center justify-center py-2.5 px-4 bg-purple-600 hover:bg-purple-400 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              :disabled="!isValidCost(report._id)"
              :class="{
                'opacity-50 cursor-not-allowed': !isValidCost(report._id),
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Approve & Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Layout from "@/components/dashboard/Layout.vue";
import { useToast } from "vue-toastification";
import api from "@/api/api.js";

const reports = ref([]);
const costs = ref({});
const loading = ref(true);
const toast = useToast();

const fetchReadyReports = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    const res = await api.get("/final-qc/ready", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Ensure each report has usedSpareparts array, even if empty
    res.data.forEach((report) => {
      if (!report.finalQc) {
        report.finalQc = { usedSpareparts: [] };
      } else if (!report.finalQc.usedSpareparts) {
        report.finalQc.usedSpareparts = [];
      }
    });

    reports.value = res.data;

    // Initialize cost data
    res.data.forEach((r) => {
      // Calculate sparepart cost
      let sparepartCost = 0;
      if (r.finalQc.usedSpareparts.length > 0) {
        sparepartCost = r.finalQc.usedSpareparts.reduce((total, item) => {
          return total + (item.quantity || 0) * (item.priceWT || 0);
        }, 0);
      }

      costs.value[r._id] = {
        sparepart: sparepartCost,
        service: 0,
      };
    });
  } catch (err) {
    console.error("Failed to fetch data:", err);
    toast.error("Failed to load reports for QC", "error");
  } finally {
    loading.value = false;
  }
};

const calculateSparepartTotal = (report) => {
  if (!report.finalQc?.usedSpareparts) return "0";

  const total = report.finalQc.usedSpareparts.reduce((sum, item) => {
    return sum + (item.quantity || 0) * (item.priceWT || 0);
  }, 0);

  return formatNumber(total);
};

const getTotalCost = (report) => {
  const sparepartCost = costs.value[report._id].sparepart || 0;
  const serviceCost = costs.value[report._id].service || 0;
  return sparepartCost + serviceCost;
};

const confirmApprove = (report) => {
  if (!isValidCost(report._id)) return;

  const totalCost = getTotalCost(report);

  if (
    confirm(
      `Approve repair for ${report.customer.name}'s ${
        report.product.brand
      } with total cost Rp ${formatNumber(totalCost)}?`
    )
  ) {
    approveFinalQC(report._id);
  }
};

const isValidCost = (id) => {
  return (
    (costs.value[id].sparepart || 0) >= 0 && (costs.value[id].service || 0) >= 0
  );
};

const formatNumber = (num) => {
  return new Intl.NumberFormat("id-ID").format(num);
};

const approveFinalQC = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await api.post(
      `/final-qc/approve/${id}`,
      {
        serviceFee: costs.value[id].service,
        notes: "Approved by QC",
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Service has been successfully completed!");
    fetchReadyReports();
  } catch (err) {
    console.error("Error saat submit:", err);
    const status = err.response?.status;
    const message = err.response?.data?.message;
    if (status === 403) {
      toast.error(
        "Access denied: Your role does not have permission to this page."
      );
    } else {
      toast.error(message || "Failed to approve report, please try again.");
    }
  }
};

onMounted(fetchReadyReports);
</script>
