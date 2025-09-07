<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Header with improved styling -->
      <header class="flex items-center space-x-3 mb-8 border-b pb-4">
        <div class="flex items-center mb-2">
          <span
            class="bg-purple-100 text-purple-600 p-2.5 rounded-lg mr-3 shadow-sm"
          >
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </span>
          <h1
            class="text-2xl font-bold text-gray-800 hidden md:block border-r pr-6 mr-6 border-gray-200"
          >
            First Quality Control
          </h1>
          <p class="text-gray-600">
            Verify and approve incoming service requests
          </p>
        </div>
      </header>

      <!-- Loading State with improved animation -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm"
      >
        <div class="relative">
          <div
            class="h-16 w-16 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"
          ></div>
          <div
            class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-l-4 border-purple-300 animate-ping opacity-50"
          ></div>
        </div>
        <p class="text-gray-600 mt-4 font-medium">
          Loading pending QC items...
        </p>
      </div>

      <!-- Empty State with improved illustration -->
      <div
        v-else-if="reports.length === 0"
        class="bg-white rounded-xl shadow-sm p-8 text-center"
      >
        <div
          class="mx-auto w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-green-500"
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
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">All caught up!</h3>
        <p class="text-gray-500 max-w-md mx-auto">
          No items pending quality control at the moment. Check back later for
          new service submissions.
        </p>
      </div>

      <!-- QC List with improved card design -->
      <div v-else class="space-y-6">
        <div
          v-for="report in reports"
          :key="report._id"
          class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
        >
          <!-- Header with gradient accent -->
          <div class="bg-purple-50 p-5 border-b border-gray-100 relative">
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between pt-2"
            >
              <div>
                <h3 class="text-lg font-medium text-gray-900 flex items-center">
                  <span class="text-indigo-500 mr-2">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  {{ report.customer.name }}
                </h3>
                <p class="text-sm text-gray-500 mt-1 ml-7 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5 mr-1 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {{ report.customer.phone || "No phone number" }}
                </p>
              </div>
              <div class="mt-2 md:mt-0">
                <span
                  class="px-3 py-1.5 text-xs font-medium rounded-full shadow-sm"
                  :class="{
                    'bg-yellow-500 text-white': report.status === 'Pending QC',
                  }"
                >
                  {{ report.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Body with improved layout -->
          <div class="px-5 py-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Product Info with enhanced icons -->
              <div class="space-y-4">
                <div class="flex items-start">
                  <div
                    class="flex-shrink-0 bg-purple-50 text-purple-600 rounded-md p-2.5 mt-1"
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
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h4 class="text-sm font-medium text-gray-900">Product</h4>
                    <p class="text-sm text-gray-700 font-medium mt-1">
                      {{ report.product.brand }}
                    </p>
                    <p class="text-sm text-gray-500">
                      {{ report.product.collection }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="flex-shrink-0 bg-purple-50 text-purple-600 rounded-md p-2.5 mt-1"
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
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h4 class="text-sm font-medium text-gray-900">
                      Service Type
                    </h4>
                    <p class="text-sm text-gray-700 font-medium mt-1">
                      {{ report.serviceRequest || "Not specified" }}
                    </p>
                  </div>
                </div>

                <div v-if="report.finishEstimate" class="flex items-start">
                  <div
                    class="flex-shrink-0 bg-purple-50 text-purple-600 rounded-md p-2.5 mt-1"
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h4 class="text-sm font-medium text-gray-900">
                      Estimated Finish
                    </h4>
                    <p class="text-sm text-gray-700 font-medium mt-1">
                      {{
                        new Date(report.finishEstimate).toLocaleDateString(
                          "id-ID",
                          { year: "numeric", month: "long", day: "numeric" }
                        )
                      }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Components Info with better tag styling -->
              <div
                v-if="report.spareparts && report.spareparts.length > 0"
                class="space-y-3"
              >
                <div class="flex items-start">
                  <div
                    class="flex-shrink-0 bg-purple-50 text-purple-600 rounded-md p-2.5 mt-1"
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h4 class="text-sm font-medium text-gray-900">
                      Components
                    </h4>
                    <div class="mt-2 flex flex-wrap gap-2">
                      <span
                        v-for="(part, index) in report.spareparts.slice(0, 3)"
                        :key="index"
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                      >
                        {{ part.name }}
                        <span
                          v-if="part.customItem"
                          class="ml-1 text-blue-500 font-normal"
                          >({{ part.customItem }})</span
                        >
                      </span>
                      <span
                        v-if="report.spareparts.length > 3"
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 shadow-sm"
                      >
                        +{{ report.spareparts.length - 3 }} more
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions with improved layout and buttons -->
            <div class="mt-8 border-t border-gray-100 pt-6">
              <div
                class="flex flex-col lg:flex-row items-start justify-between gap-4"
              >
                <button
                  @click="approve(report._id)"
                  class="flex items-center justify-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
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
                  Approve & Assign Mechanic
                </button>

                <div class="flex flex-col w-full lg:w-auto">
                  <div class="relative">
                    <textarea
                      v-model="notes[report._id]"
                      placeholder="Notes if rejected (required)"
                      class="w-full lg:w-72 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-700 shadow-sm"
                      rows="2"
                    ></textarea>
                    <div
                      class="absolute bottom-2 right-2 text-xs text-gray-400"
                      v-if="notes[report._id]"
                    >
                      {{ notes[report._id].length }} characters
                    </div>
                  </div>
                  <button
                    @click="reject(report._id)"
                    class="mt-3 flex items-center justify-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    :disabled="!notes[report._id]"
                    :class="{
                      'opacity-50 cursor-not-allowed': !notes[report._id],
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Reject Service
                  </button>
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

const reports = ref([]);
const notes = ref({});
const loading = ref(true);
const toast = useToast();

const fetchPendingQC = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    const res = await api.get("/first-qc/pending", {
      headers: { Authorization: `Bearer ${token}` },
    });
    reports.value = res.data;
  } catch (err) {
    console.error("Error ambil pending QC:", err);
    toast.error("Failed to load pending QC items. Please try again.");
  } finally {
    loading.value = false;
  }
};

const approve = async (id) => {
  const konfirmasi = confirm(
    "Are you sure you want to approve this service and assign a mechanic?"
  );
  if (!konfirmasi) return;

  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    await api.post(
      `/first-qc/${id}`,
      { isApproved: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Service successfully approved and assigned to mechanic!");
    await fetchPendingQC();
  } catch (err) {
    console.error("Error approving service:", err);
    if (err.response?.status === 403) {
      toast.error(
        "Access denied: Your role does not have permission to perform this action."
      );
    } else {
      toast.error("Failed to approve service. Please try again.");
    }

    loading.value = false;
  }
};

const reject = async (id) => {
  if (!notes.value[id]) {
    toast.warning("Please provide rejection notes", {
      icon: "⚠️",
      timeout: 3000,
    });
    return;
  }

  const konfirmasi = confirm(
    "Are you sure you want to reject this service request?"
  );
  if (!konfirmasi) return;

  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    await api.post(
      `/first-qc/${id}`,
      {
        isApproved: false,
        notes: notes.value[id],
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Service request rejected successfully");
    await fetchPendingQC();
  } catch (err) {
    console.error("Error rejecting service:", err);

    if (err.response?.status === 403) {
      toast.error(
        "Access denied: Your role does not have permission to perform this action."
      );
    } else {
      toast.error("Failed to reject service. Please try again.");
    }

    loading.value = false;
  }
};

onMounted(fetchPendingQC);
</script>
