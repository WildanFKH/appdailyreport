<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <header class="flex items-center space-x-3 mb-8 border-b pb-4">
        <div class="flex items-center mb-2">
          <span
            class="bg-green-100 text-green-600 p-2.5 rounded-lg mr-3 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-600"
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
            Service Complete List
          </h1>
          <p class="text-gray-600">
            List of completed service reports. You can see the details of each
            service report.
          </p>
        </div>
      </header>
      <div class="mb-6 flex flex-wrap gap-3">
        <button
          @click="fetchCompleted('all')"
          class="px-4 py-2 bg-secondary text-white rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity flex items-center"
          :class="{
            'ring-2 ring-offset-2 ring-secondary': activeTab === 'all',
          }"
        >
          All
        </button>
        <button
          @click="fetchCompleted('today')"
          class="px-4 py-2 bg-green-500 text-white rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity flex items-center"
          :class="{
            'ring-2 ring-offset-2 ring-green-600': activeTab === 'today',
          }"
        >
          Today
        </button>
        <button
          @click="fetchCompleted('week')"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity flex items-center"
          :class="{
            'ring-2 ring-offset-2 ring-blue-600': activeTab === 'week',
          }"
        >
          Last Week
        </button>
        <button
          @click="fetchCompleted('month')"
          class="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium shadow-sm hover:opacity-90 transition-opacity flex items-center"
          :class="{
            'ring-2 ring-offset-2 ring-purple-600': activeTab === 'month',
          }"
        >
          Last Month
        </button>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
        ></div>
      </div>

      <div
        v-else-if="services.length === 0"
        class="bg-white rounded-xl p-8 text-center shadow-sm"
      >
        <div class="text-gray-400 text-6xl mb-4">📭</div>
        <p class="text-gray-500 font-medium">
          There are no completed service reports for this period.
        </p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="report in services"
          :key="report._id"
          class="bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden"
        >
          <!-- Card Header -->
          <div
            class="bg-gradient-to-r from-green-600 to-green-500 p-4 border-b"
          >
            <div class="flex justify-between items-start">
              <h2 class="text-xl font-semibold text-white mb-1">
                {{ report.customer.name }}
              </h2>
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {{ report.status }}
              </span>
            </div>
            <p class="text-white font-medium">
              {{ report.product.brand }} {{ report.product.collection }}
            </p>
          </div>

          <!-- Card Body -->
          <div class="p-4">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="text-sm">
                <p class="text-gray-500 mb-1">Product Details</p>
                <p class="font-medium">
                  {{ report.product.size }} - {{ report.product.color }}
                </p>
              </div>

              <div class="text-sm">
                <p class="text-gray-500 mb-1">Mechanic</p>
                <p class="font-medium">
                  {{ report.assignedTo?.username || "—" }}
                </p>
              </div>

              <div class="text-sm">
                <p class="text-gray-500 mb-1">Created By</p>
                <p class="font-medium">{{ report.created_by }}</p>
              </div>

              <div class="text-sm">
                <p class="text-gray-500 mb-1">Completion Date</p>
                <p class="font-medium">{{ formatDate(report.updatedAt) }}</p>
              </div>
            </div>

            <!-- Final QC Section -->
            <div
              v-if="report.finalQc"
              class="mt-4 pt-4 border-t border-dashed border-gray-200"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold text-gray-700 flex items-center">
                  <span class="mr-2">🧾</span> Detail Final QC
                </h3>
                <span
                  class="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded"
                >
                  QC By : {{ report.finalQc.checkedBy?.username || "—" }}
                </span>
              </div>

              <!-- Spareparts - Moved above service fee -->
              <div
                v-if="
                  report.finalQc.usedSpareparts &&
                  report.finalQc.usedSpareparts.length > 0
                "
                class="mb-4"
              >
                <p class="text-gray-500 text-sm font-medium mb-2">
                  Spareparts:
                </p>
                <ul class="space-y-2">
                  <li
                    v-for="(item, index) in report.finalQc.usedSpareparts"
                    :key="index"
                    class="text-sm bg-gray-50 p-3 rounded-md border border-gray-100"
                  >
                    <div class="flex justify-between items-center">
                      <div>
                        <span class="font-medium">{{
                          item.sparepart?.name
                        }}</span>
                        <span class="text-gray-500 ml-1"
                          >x{{ item.quantity }}</span
                        >

                        <!-- Variant details -->
                        <div class="text-xs text-gray-600 mt-1">
                          <span v-if="item.sparepart?.brand" class="mr-2">
                            Brand: {{ item.sparepart.brand }}
                          </span>
                          <span v-if="item.sparepart?.size" class="mr-2">
                            Size: {{ item.sparepart.size }}
                          </span>
                          <span
                            v-if="
                              item.sparepart?.colour || item.sparepart?.color
                            "
                          >
                            Colour:
                            {{
                              item.sparepart?.colour || item.sparepart?.color
                            }}
                          </span>
                        </div>
                      </div>
                      <span class="font-medium text-sm"
                        >Rp
                        {{
                          item.quantity > 0
                            ? item.priceWT.toLocaleString()
                            : "0"
                        }}</span
                      >
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Service Fee & Total -->
              <div class="bg-gray-50 rounded-lg p-3 mb-3">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-600 text-sm">Service Fee:</span>
                  <span class="font-medium text-sm"
                    >Rp {{ report.finalQc.serviceFee.toLocaleString() }}</span
                  >
                </div>
                <div
                  class="flex justify-between items-center font-semibold border-t border-gray-200 pt-2 mt-2"
                >
                  <span class="text-gray-700">Total:</span>
                  <span class="text-primary text-lg"
                    >Rp
                    {{ report.finalQc.totalEstimate.toLocaleString() }}</span
                  >
                </div>
              </div>

              <div v-if="report.finalQc.notes" class="mb-3">
                <p class="text-gray-500 text-sm mb-1">Notes:</p>
                <p class="text-sm italic bg-yellow-50 p-2 rounded">
                  {{ report.finalQc.notes }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Layout from "@/components/dashboard/Layout.vue";
import api from "@/api/api.js";

const services = ref([]);
const loading = ref(true);
const activeTab = ref("all");

// Date formatting function
const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const fetchCompleted = async (period = "all") => {
  loading.value = true;
  activeTab.value = period;

  try {
    const token = localStorage.getItem("token");
    let endpoint = "/service-report/complete";

    // Add period filter
    if (period === "today") {
      endpoint = "/service-report/complete/today";
    } else if (period === "week") {
      endpoint = "/service-report/complete/week";
    } else if (period === "month") {
      endpoint = "/service-report/complete/month";
    }

    const res = await api.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    services.value = res.data;
  } catch (err) {
    console.error(`Failed to fetch ${period} data:`, err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCompleted();
});
</script>
