<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Header with improved styling -->
      <header class="flex items-center space-x-3 mb-8 border-b pb-4">
        <div class="flex items-center mb-2">
          <span class="bg-red-100 text-red-600 p-2.5 rounded-lg mr-3 shadow-sm">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
          <h1
            class="text-2xl font-bold text-gray-800 hidden md:block border-r pr-6 mr-6 border-gray-200"
          >
            Audit Approval
          </h1>
          <p class="text-gray-600">
            Review and approve or reject service reports that need auditing.
          </p>
        </div>
      </header>

      <!-- Loading State with improved animation -->
      <div v-if="loading" class="flex justify-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
        ></div>
      </div>

      <!-- Empty State with improved illustration -->
      <div
        v-else-if="services.length === 0"
        class="bg-white rounded-xl shadow-sm p-8 text-center"
      >
        <div
          class="bg-red-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-red-400"
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
        <p class="text-gray-500 font-medium">
          All caught up! No service reports pending for auditing.
        </p>
      </div>

      <!-- Service List with improved card design -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="service in services"
          :key="service._id"
          class="bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden"
        >
          <!-- Card Header with gradient accent -->
          <div class="bg-gradient-to-r from-red-500 to-red-400 p-4 border-b">
            <div class="flex justify-between items-start">
              <h2
                class="text-xl font-semibold text-white mb-1 flex items-center"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {{ service.customer?.name || "Customer" }}
              </h2>
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
              >
                {{ service.status }}
              </span>
            </div>
            <p class="text-white font-medium ml-7">
              {{ service.product?.brand || "" }}
              {{ service.product?.collection || "" }}
            </p>
          </div>

          <!-- Card Body with improved layout -->
          <div class="p-4">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="text-sm">
                <p class="text-gray-500 mb-1">Product Details</p>
                <p class="font-medium">
                  {{ service.product?.size || "—" }} -
                  {{ service.product?.color || "—" }}
                </p>
              </div>

              <div class="text-sm">
                <p class="text-gray-500 mb-1">Mechanic</p>
                <p class="font-medium">
                  {{ service.assignedTo?.username || "—" }}
                </p>
              </div>

              <div class="text-sm">
                <p class="text-gray-500 mb-1">Created By</p>
                <p class="font-medium">{{ service.created_by || "—" }}</p>
              </div>

              <div class="text-sm">
                <p class="text-gray-500 mb-1">Created Date</p>
                <p class="font-medium">{{ formatDate(service.createdAt) }}</p>
              </div>
            </div>

            <!-- Final QC Section -->
            <div
              v-if="service.finalQc"
              class="mt-4 pt-4 border-t border-dashed border-gray-200"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold text-gray-700 flex items-center">
                  <span class="mr-2">🧾</span> Detail Final QC
                </h3>
                <span
                  class="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded"
                >
                  QC By: {{ service.finalQc.checkedBy?.username || "—" }}
                </span>
              </div>

              <!-- Spareparts Section -->
              <div
                v-if="
                  service.finalQc.usedSpareparts &&
                  service.finalQc.usedSpareparts.length > 0
                "
                class="mb-4"
              >
                <p class="text-gray-500 text-sm font-medium mb-2">
                  Spareparts:
                </p>
                <ul class="space-y-2">
                  <li
                    v-for="(item, index) in service.finalQc.usedSpareparts"
                    :key="index"
                    class="text-sm bg-gray-50 p-3 rounded-md border border-gray-100"
                  >
                    <div class="flex justify-between items-center">
                      <div>
                        <span class="font-medium">{{
                          item.sparepart?.name || "Unnamed Part"
                        }}</span>
                        <span class="text-gray-500 ml-1"
                          >x{{ item.quantity || 0 }}</span
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
                      <span class="font-medium text-sm">
                        Rp
                        {{
                          item.priceWT && item.quantity > 0
                            ? item.priceWT.toLocaleString()
                            : "0"
                        }}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Service Fee & Total -->
              <div class="bg-gray-50 rounded-lg p-3 mb-3">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-600 text-sm">Service Fee:</span>
                  <span class="font-medium text-sm"
                    >Rp
                    {{
                      service.finalQc.serviceFee
                        ? service.finalQc.serviceFee.toLocaleString()
                        : "0"
                    }}</span
                  >
                </div>
                <div
                  class="flex justify-between items-center font-semibold border-t border-gray-200 pt-2 mt-2"
                >
                  <span class="text-gray-700">Total:</span>
                  <span class="text-primary text-lg"
                    >Rp
                    {{
                      service.finalQc.totalEstimate
                        ? service.finalQc.totalEstimate.toLocaleString()
                        : "0"
                    }}</span
                  >
                </div>
              </div>

              <div v-if="service.finalQc.notes" class="mb-3">
                <p class="text-gray-500 text-sm mb-1">Notes:</p>
                <p class="text-sm italic bg-yellow-50 p-2 rounded">
                  {{ service.finalQc.notes }}
                </p>
              </div>
            </div>

            <!-- Actions with improved layout and buttons -->
            <div class="mt-4 pt-4 border-t border-gray-200">
              <div class="flex flex-col space-y-3">
                <!-- Approve Button -->
                <button
                  @click="approveService(service._id)"
                  class="flex items-center justify-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors w-full"
                  :disabled="submitting"
                >
                  <svg
                    v-if="submitting"
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  <svg
                    v-else
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
                  {{ submitting ? "Loading..." : "Approve" }}
                </button>

                <!-- Reject Button and Notes -->
                <div class="flex flex-col w-full">
                  <button
                    @click="rejectService(service._id)"
                    class="flex items-center justify-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors w-full"
                    :disabled="!rejectReasons[service._id] || submitting"
                    :class="{
                      'opacity-50 cursor-not-allowed':
                        !rejectReasons[service._id] || submitting,
                    }"
                  >
                    <svg
                      v-if="submitting"
                      class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    <svg
                      v-else
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    {{ submitting ? "Loading..." : "Reject" }}
                  </button>

                  <textarea
                    v-model="rejectReasons[service._id]"
                    placeholder="Notes if rejected (required)"
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-700 shadow-sm mt-2"
                    rows="2"
                  ></textarea>
                </div>
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
import api from "@/api/api.js";
import { useToast } from "vue-toastification";
import Layout from "@/components/dashboard/Layout.vue";

const services = ref([]);
const loading = ref(false);
const submitting = ref(false);
const toast = useToast();
const rejectReasons = ref({});

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

const fetchServices = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/admin/approved-service", {
      headers: { Authorization: `Bearer ${token}` },
    });
    services.value = res.data;
  } catch (err) {
    console.error("FETCH_ERROR:", err);
    toast.error(
      "Gagal memuat data service: " +
        (err.response?.data?.message || err.message)
    );
  } finally {
    loading.value = false;
  }
};

const approveService = async (serviceId) => {
  const konfirmasi = confirm("Are you sure you want to approve this service?");
  if (!konfirmasi) return;

  submitting.value = true;
  try {
    const token = localStorage.getItem("token");
    await api.post(
      `/admin/approve-service/${serviceId}`,
      { isApproved: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Service approved successfully!");
    await fetchServices();
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to approve service.");
  } finally {
    submitting.value = false;
  }
};

const rejectService = async (serviceId) => {
  if (!rejectReasons.value[serviceId]) {
    toast.warning("Please provide rejection notes", {
      icon: "⚠️",
      timeout: 3000,
    });
    return;
  }

  const konfirmasi = confirm("Are you sure you want to reject this service?");
  if (!konfirmasi) return;

  submitting.value = true;
  try {
    const token = localStorage.getItem("token");
    await api.post(
      `/admin/approve-service/${serviceId}`,
      { isApproved: false, notes: rejectReasons.value[serviceId] },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Service rejected successfully!");
    await fetchServices();
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to reject service.");
  } finally {
    submitting.value = false;
  }
};

onMounted(fetchServices);
</script>
