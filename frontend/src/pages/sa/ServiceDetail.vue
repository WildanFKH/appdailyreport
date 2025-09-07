<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Header with Back Button -->
      <div
        class="flex flex-col md:flex-row md:items-center justify-between border-b pb-6 mb-6"
      >
        <div class="flex items-center mb-4 md:mb-0">
          <button
            @click="goBack"
            class="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h1 class="text-3xl font-bold text-secondary">
              Detail Service Report
            </h1>
            <p v-if="report" class="text-gray-500 text-sm mt-1">
              ID: #{{ report._id }}
            </p>
          </div>
        </div>

        <div class="flex space-x-3">
          <router-link
            v-if="report"
            :to="`/sa/service-edit/${report._id}`"
            class="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </router-link>

          <button
            @click="handleDelete"
            class="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m5-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
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
        <p class="text-lg text-gray-600">Load data service...</p>
      </div>

      <!-- Not Found State -->
      <div
        v-else-if="!report"
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
        <p class="text-xl font-medium text-gray-600 mb-2">Data Not Found</p>
        <p class="text-gray-500">
          This service report may have been removed or is no longer available.
        </p>
        <button
          @click="goBack"
          class="mt-4 inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Back to list
        </button>
      </div>

      <!-- Report Content -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Status Badge -->
          <div class="mb-6">
            <span
              class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
              :class="{
                'bg-yellow-100 text-yellow-800': report.status === 'Pending QC',
                'bg-blue-100 text-blue-800': report.status === 'Assign Mechanic',
                'bg-purple-100 text-purple-800': report.status === 'Repaired',
                'bg-orange-200 text-orange-800':report.status === 'Ready for Check',
                'bg-teal-100 text-teal-800': report.status === 'Audit Approved',
                'bg-green-100 text-green-800': report.status === 'Completed',
                'bg-red-100 text-red-800': report.status === 'Rejected',
              }"
            >
              <span class="relative flex h-3 w-3 mr-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  :class="{
                    'bg-yellow-500': report.status === 'Pending QC',
                    'bg-blue-500': report.status === 'Assign Mechanic',
                    'bg-purple-500': report.status === 'Repaired',
                    'bg-orange-500': report.status === 'Ready for Check',
                    'bg-teal-500': report.status === 'Audit Approved',
                    'bg-green-500': report.status === 'Completed',
                    'bg-red-500': report.status === 'Cancelled',
                  }"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-3 w-3"
                  :class="{
                    'bg-yellow-500': report.status === 'Pending QC',
                    'bg-blue-500': report.status === 'Assign Mechanic',
                    'bg-purple-500': report.status === 'Repaired',
                    'bg-orange-500': report.status === 'Ready for Check',
                    'bg-teal-500': report.status === 'Audit Approved',
                    'bg-green-500': report.status === 'Completed',
                    'bg-red-500': report.status === 'Rejected',
                  }"
                ></span>
              </span>
              {{ report.status }}
            </span>
          </div>

          <!-- Customer Info -->
          <section class="bg-gray-50 p-5 rounded-lg">
            <h2
              class="text-lg font-semibold text-secondary mb-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-primary"
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
              Customer
            </h2>
            <div class="space-y-2">
              <div class="text-lg font-medium">{{ report.customer.name }}</div>
              <div class="flex items-start space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span class="text-gray-600">{{ report.customer.address }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
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
                <span class="text-gray-600">{{ report.customer.phone }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span class="text-gray-600">{{ report.customer.email }}</span>
              </div>
            </div>
          </section>

          <!-- Product Info -->
          <section class="bg-gray-50 p-5 rounded-lg">
            <h2
              class="text-lg font-semibold text-secondary mb-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-primary"
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
              Product
            </h2>
            <div class="space-y-3">
              <div class="flex space-x-2">
                <div class="font-medium w-24">Brand:</div>
                <div>{{ report.product.brand }}</div>
              </div>
              <div class="flex space-x-2">
                <div class="font-medium w-24">Collection:</div>
                <div>{{ report.product.collection }}</div>
              </div>
              <div class="flex space-x-2">
                <div class="font-medium w-24">Size:</div>
                <div>{{ report.product.size }}</div>
              </div>
              <div class="flex space-x-2">
                <div class="font-medium w-24">Color:</div>
                <div>{{ report.product.color }}</div>
              </div>
            </div>
          </section>

          <!-- Service Type -->
          <section class="bg-gray-50 p-5 rounded-lg">
            <h2
              class="text-lg font-semibold text-secondary mb-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              Service Type
            </h2>
            <div class="mt-2">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="{
                  'bg-blue-100 text-blue-800':
                    report.serviceRequest === 'Repair',
                  'bg-purple-100 text-purple-800':
                    report.serviceRequest === 'Replace',
                }"
              >
                {{ report.serviceRequest }}
              </span>
            </div>
          </section>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Spareparts -->
          <section class="bg-gray-50 p-5 rounded-lg">
            <h2
              class="text-lg font-semibold text-secondary mb-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-primary"
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
              Spareparts
            </h2>
            <div class="space-y-2">
              <div
                v-for="s in report.spareparts"
                :key="s.name"
                class="flex items-center p-2 bg-white rounded-lg border border-gray-100"
              >
                <div class="bg-primary bg-opacity-10 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div class="flex-grow">
                  <div class="font-medium">{{ s.name }}</div>
                  <div
                    v-if="s.customItem || s.quantity"
                    class="text-sm text-gray-500"
                  >
                    <span v-if="s.customItem">{{ s.customItem }}</span>
                    <span v-if="s.quantity && s.customItem"> - </span>
                    <span v-if="s.quantity">Qty: {{ s.quantity }}</span>
                  </div>
                </div>
              </div>
              <div
                v-if="report.spareparts.length === 0"
                class="text-gray-500 italic"
              >
                No spare parts selected
              </div>
            </div>
          </section>

          <!-- Kondisi -->
          <section class="bg-gray-50 p-5 rounded-lg">
            <h2
              class="text-lg font-semibold text-secondary mb-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-primary"
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
              Condition
            </h2>
            <div class="p-3 bg-white rounded-lg border border-gray-100">
              <p class="whitespace-pre-line">{{ report.conditionNotes }}</p>
            </div>
          </section>

          <!-- Estimasi & Garansi -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section class="bg-gray-50 p-5 rounded-lg">
              <h2
                class="text-lg font-semibold text-secondary mb-3 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-primary"
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
                Estimate Completed
              </h2>
              <div
                class="flex items-center p-2 bg-white rounded-lg border border-gray-100"
              >
                <div class="text-lg">
                  {{
                    new Date(report.finishEstimate).toLocaleDateString("id-ID")
                  }}
                </div>
              </div>
            </section>

            <section class="bg-gray-50 p-5 rounded-lg">
              <h2
                class="text-lg font-semibold text-secondary mb-3 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Warranty
              </h2>
              <div class="space-y-2">
                <div
                  class="flex items-center p-2 bg-white rounded-lg border border-gray-100"
                >
                  <span
                    class="px-3 py-1 rounded-full text-xs font-medium"
                    :class="{
                      'bg-green-100 text-green-800':
                        report.warranty.isUnderWarranty === true ||
                        report.warranty.isUnderWarranty === 'true',
                      'bg-gray-100 text-gray-800':
                        !report.warranty.isUnderWarranty,
                    }"
                  >
                    {{
                      report.warranty.isUnderWarranty === true ||
                      report.warranty.isUnderWarranty === "true"
                        ? "Warranty"
                        : "Not Warranty"
                    }}
                  </span>
                </div>
                <div
                  v-if="report.warranty.purchaseDate"
                  class="flex items-center p-2 bg-white rounded-lg border border-gray-100 text-sm"
                >
                  <span class="text-gray-600">Purchase Date:</span>
                  <span class="ml-2">{{
                    new Date(report.warranty.purchaseDate).toLocaleDateString(
                      "id-ID"
                    )
                  }}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
import api from "@/api/api.js";
import Layout from "@/components/dashboard/Layout.vue";

const route = useRoute();
const router = useRouter();
const report = ref(null);
const loading = ref(true);
const toast = useToast();

const handleDelete = async () => {
  const confirmed = confirm("Are you sure you want to delete this report?");
  if (!confirmed) return;
  try {
    const token = localStorage.getItem("token");
    await api.delete(`/service-report/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Report successfully deleted!");
    await router.push("/sa/service-list");
  } catch (err) {
    console.error("Error saat hapus:", err);
    if (err.response?.status === 403) {
      toast.error(
        "The report cannot be deleted because the status is no longer Pending QC"
      );
    } else {
      toast.error("Failed to delete report");
    }
  }
};

const goBack = () => {
  router.push("/sa/service-list");
};

const fetchDetail = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get(`service-report/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    report.value = res.data;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDetail);
</script>
