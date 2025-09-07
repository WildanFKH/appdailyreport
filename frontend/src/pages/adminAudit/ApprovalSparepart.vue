<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <header
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b pb-4"
      >
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-3"
        >
          <div class="flex items-center">
            <span
              class="bg-red-100 text-red-600 p-2.5 rounded-lg mr-3 shadow-sm"
            >
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <div class="flex flex-col sm:flex-row sm:items-center">
              <h1
                class="text-2xl font-bold text-gray-800 border-r pr-6 mr-6 border-gray-200"
              >
                Approve Sparepart
              </h1>
              <p class="text-gray-600 mt-1 sm:mt-0">
                Only audit admin can approve or reject the submitted requests.
              </p>
            </div>
          </div>
        </div>

        <div
          class="bg-red-50 px-4 py-2 rounded-lg text-sm text-red-700 flex items-center w-full md:w-auto"
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ requests.filter((r) => r.status === "Pending").length }} Waiting
          for review
        </div>
      </header>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"
        ></div>
        <span class="ml-3 text-gray-700">Load Request...</span>
      </div>

      <div
        v-else-if="requests.length === 0"
        class="bg-gray-50 rounded-xl p-12 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto text-gray-400 mb-4"
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
        <p class="text-gray-600 text-lg">
          There is no request for spare parts at this time.
        </p>
      </div>

      <div v-else>
        <!-- Filter tabs -->
        <div class="flex border-b mb-6">
          <button
            @click="activeFilter = 'all'"
            :class="[
              'px-4 py-2 font-medium',
              activeFilter === 'all'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500',
            ]"
          >
            All ({{ requests.length }})
          </button>
          <button
            @click="activeFilter = 'pending'"
            :class="[
              'px-4 py-2 font-medium',
              activeFilter === 'pending'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500',
            ]"
          >
            Pending ({{
              requests.filter((r) => r.status === "Pending").length
            }})
          </button>
          <button
            @click="activeFilter = 'approved'"
            :class="[
              'px-4 py-2 font-medium',
              activeFilter === 'approved'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500',
            ]"
          >
            Approved ({{
              requests.filter((r) => r.status === "Approved").length
            }})
          </button>
          <button
            @click="activeFilter = 'rejected'"
            :class="[
              'px-4 py-2 font-medium',
              activeFilter === 'rejected'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500',
            ]"
          >
            Rejected ({{
              requests.filter((r) => r.status === "Rejected").length
            }})
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="req in filteredRequests"
            :key="req._id"
            class="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex justify-between">
              <div class="flex-1">
                <div class="flex items-center mb-2">
                  <span
                    :class="[
                      'px-2 py-0.5 rounded-full text-xs font-medium',
                      req.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : req.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800',
                    ]"
                  >
                    {{ req.status }}
                  </span>
                  <span class="ml-2 text-sm text-gray-500">
                    {{
                      req.createdAt
                        ? `Submited ${formatTimeAgo(req.createdAt)}`
                        : ""
                    }}
                  </span>
                </div>

                <h2
                  class="font-bold text-gray-800 text-lg mb-1 flex items-center"
                >
                  <span class="mr-2">{{ req.sparepart?.name }}</span>
                  <span
                    class="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
                  >
                    {{ req.quantity }} pcs
                  </span>
                </h2>

                <div class="grid grid-cols-3 gap-4 mt-3 text-sm">
                  <div>
                    <p class="text-gray-500">Brand</p>
                    <p class="font-medium">{{ req.sparepart?.brand || "-" }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500">Size</p>
                    <p class="font-medium">{{ req.sparepart?.size || "-" }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500">Colour</p>
                    <p class="font-medium">
                      {{ req.sparepart?.colour || "-" }}
                    </p>
                  </div>
                </div>

                <div class="mt-3">
                  <p class="text-gray-500 text-sm">Notes:</p>
                  <p class="text-gray-700">{{ req.note || "-" }}</p>
                </div>

                <div class="mt-3 flex items-center">
                  <div class="flex-shrink-0">
                    <div
                      class="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center text-gray-600 font-medium"
                    >
                      {{
                        req.requestedBy?.username
                          ? req.requestedBy.username.charAt(0).toUpperCase()
                          : "?"
                      }}
                    </div>
                  </div>
                  <div class="ml-2">
                    <p class="text-xs text-gray-500">Update Stock :</p>
                    <p class="text-sm font-medium">
                      {{ req.requestedBy?.username }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="req.status !== 'Pending'"
                  class="mt-3 text-sm border-t border-gray-100 pt-3"
                >
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div
                        class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-medium"
                      >
                        {{
                          req.reviewedBy?.username
                            ? req.reviewedBy.username.charAt(0).toUpperCase()
                            : "?"
                        }}
                      </div>
                    </div>
                    <p class="ml-2">
                      <span class="font-medium">{{
                        req.reviewedBy?.username
                      }}</span>
                      <span class="text-gray-500">
                        {{ req.status === "Approved" ? " Approve" : " Reject" }} Update Stock {{ formatDate(req.reviewedAt) }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div v-if="req.status === 'Pending'" class="ml-4">
                <div class="flex flex-col gap-2">
                  <button
                    @click="approve(req._id)"
                    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Approve
                  </button>

                  <button
                    @click="reject(req._id)"
                    class="bg-white border border-red-500 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg"
                  >
                    Reject
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
import { ref, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import api from "@/api/api.js";
import Layout from "@/components/dashboard/Layout.vue";

const toast = useToast();
const requests = ref([]);
const loading = ref(true);
const activeFilter = ref("all");
const showModal = ref(false);
const modalAction = ref("");
const selectedRequest = ref(null);

const filteredRequests = computed(() => {
  if (activeFilter.value === "all") return requests.value;
  return requests.value.filter(
    (req) => req.status.toLowerCase() === activeFilter.value
  );
});

const fetchRequests = async () => {
  const token = localStorage.getItem("token");
  loading.value = true;
  try {
    const res = await api.get("/sparepart-requests", {
      headers: { Authorization: `Bearer ${token}` },
    });
    requests.value = res.data;
  } catch (err) {
    console.error("Gagal ambil permintaan:", err);
    toast.error("Failed to load sparepart request");
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  showModal.value = false;
  selectedRequest.value = null;
};

const approve = async (id) => {
  const token = localStorage.getItem("token");
  const konfirmasi = confirm("Are you sure you want to approve this request?");
  if (!konfirmasi) return;
  try {
    await api.patch(
      `/sparepart-requests/${id}/approve`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success("Request successfully approved!");
    fetchRequests();
  } catch (err) {
    console.error("Error saat submit:", err);
    const status = err.response?.status;
    const message = err.response?.data?.message;
    if (status === 403) {
      toast.error(
        "Access denied: Your role does not have permission to this page"
      );
    } else {
      toast.error(message || "Failed to approve request");
    }
  }
};

const reject = async (id) => {
  const token = localStorage.getItem("token");
  const konfirmasi = confirm("Are you sure you want to reject this request?");
  if (!konfirmasi) return;
  try {
    await api.patch(
      `/sparepart-requests/${id}/reject`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success("Request successfully rejected!");
    fetchRequests();
  } catch (err) {
    console.error("Error saat submit:", err);
    const status = err.response?.status;
    const message = err.response?.data?.message;
    if (status === 403) {
      toast.error(
        "Access denied: Your role does not have permission to this page."
      );
    } else {
      toast.error(message || "Failed to reject request");
    }
  }
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatTimeAgo = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "Just Now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} Minutes Ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} Hours Ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} Days Ago`;
  }
};

onMounted(fetchRequests);
</script>
