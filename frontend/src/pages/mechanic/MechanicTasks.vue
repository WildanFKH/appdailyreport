<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <!-- Header Section -->
      <header class="flex items-center space-x-3 mb-8 border-b pb-4">
        <div class="flex items-center mb-2">
          <span
            class="bg-blue-100 text-blue-600 p-2.5 rounded-lg mr-3 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-600"
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
          </span>
          <h1
            class="text-2xl font-bold text-gray-800 hidden md:block border-r pr-6 mr-6 border-gray-200"
          >
            Mechanic Tasks
          </h1>
          <p class="text-gray-600">
            Mechanics can view and claim jobs assigned to them.
          </p>
        </div>
      </header>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-16"
      >
        <svg
          class="animate-spin h-12 w-12 text-blue-500 mb-4"
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
        <p class="text-lg text-gray-600">Loading job list...</p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="tasks.length === 0"
        class="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div class="bg-blue-50 p-4 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">No Jobs Yet</h3>
        <p class="text-gray-500 text-center max-w-md">
          There are no services available to work on at this time. Please check
          back later.
        </p>
      </div>

      <!-- Task Cards -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="task in tasks"
          :key="task._id"
          class="bg-blue rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          <div class="bg-blue-50 border-b p-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-lg text-gray-800">
                  {{ task.product.brand }}
                </h3>
                <p class="text-sm text-gray-500">
                  {{ task.product.collection }}
                </p>
              </div>
              <span
                class="px-2 py-1 text-xs rounded-full font-medium"
                :class="{
                  'bg-yellow-100 text-yellow-800': task.status === 'Pending QC',
                  'bg-blue-100 text-blue-800':
                    task.status === 'Assign Mechanic',
                  'bg-purple-100 text-purple-800': task.status === 'Repaired',
                  'bg-orange-100 text-orange-800':
                    task.status === 'Ready for Check',
                }"
              >
                {{ task.status }}
              </span>
            </div>
          </div>

          <div class="p-4">
            <div class="mb-4">
              <div class="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400 mr-2"
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
                <div class="text-sm font-medium">{{ task.customer.name }}</div>
              </div>

              <div class="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400 mr-2"
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
                <div class="text-sm text-gray-600">
                  {{ task.customer.phone }}
                </div>
              </div>

              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400 mr-2"
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
                <div class="text-sm text-gray-600">
                  Estimate:
                  {{
                    new Date(task.finishEstimate).toLocaleDateString("id-ID")
                  }}
                </div>
              </div>
            </div>

            <!-- Service Type Badge -->
            <div class="mb-4">
              <span
                class="inline-block px-3 py-1 text-xs font-medium rounded-full"
                :class="{
                  'bg-blue-100 text-blue-800': task.serviceRequest === 'Repair',
                  'bg-purple-100 text-purple-800':
                    task.serviceRequest === 'Replace',
                }"
              >
                {{ task.serviceRequest }}
              </span>

              <!-- Components Tags (optional) -->
              <div
                v-if="task.spareparts && task.spareparts.length"
                class="flex flex-wrap mt-2 gap-1"
              >
                <span
                  v-for="(spare, index) in task.spareparts.slice(0, 2)"
                  :key="index"
                  class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md"
                >
                  {{ spare.name }}
                </span>
                <span
                  v-if="task.spareparts.length > 2"
                  class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md"
                >
                  +{{ task.spareparts.length - 2 }} Others
                </span>
              </div>
            </div>

            <button
              @click="claimJob(task._id)"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center"
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Take a Job
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
import api from "@/api/api.js";
import { useToast } from "vue-toastification";

const tasks = ref([]);
const loading = ref(true);
const toast = useToast();

const fetchTasks = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    const res = await api.get("/mechanic/assigned", {
      headers: { Authorization: `Bearer ${token}` },
    });
    tasks.value = res.data;
  } catch (err) {
    console.error("Gagal fetch data:", err);
    toast.error("Failed to load job list. Please try again.");
  } finally {
    loading.value = false;
  }
};

const claimJob = async (id) => {
  const konfirmasi = confirm("Are you sure you want to take this job?");
  if (!konfirmasi) return;
  try {
    const token = localStorage.getItem("token");
    await api.patch(
      `/mechanic/claim/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success("Successfully take the job!");
    fetchTasks(); // refresh list
  } catch (err) {
    console.error("Error saat submit:", err);
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 403) {
      toast.error(
        "Access denied: Your role does not have permission to this page."
      );
    } else {
      toast.error(message || "Failed to take the job. Please try again.");
    }
  }
};

onMounted(fetchTasks);
</script>
