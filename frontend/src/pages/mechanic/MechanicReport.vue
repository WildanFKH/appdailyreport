<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <!-- Header -->
      <header class="flex items-center space-x-3 mb-8 border-b pb-4">
        <div class="flex items-center mb-2">
          <span
            class="bg-blue-100 text-blue-600 p-2.5 rounded-lg mr-3 shadow-sm"
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </span>
          <h1
            class="text-2xl font-bold text-gray-800 hidden md:block border-r pr-6 mr-6 border-gray-200"
          >
            Mechanic Reports
          </h1>
          <p class="text-gray-600">
            This page displays service reports assigned to you. Only the
            mechanic who claimed the job can see these reports.
          </p>
        </div>
      </header>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl"
      >
        <svg
          class="animate-spin h-12 w-12 text-blue-600 mb-4"
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
        <p class="text-lg font-medium text-gray-700">
          Loading service reports...
        </p>
        <p class="text-sm text-gray-500 mt-2">
          Please wait while we fetch your assigned tasks
        </p>
      </div>

      <!-- Empty State -->
      <div
        v-else-if="reports.length === 0"
        class="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl"
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
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">
          No Reports In Progress
        </h3>
        <p class="text-gray-500 text-center max-w-md">
          You currently have no reports assigned. When a report is assigned, it
          will appear here.
        </p>
      </div>

      <!-- Reports List -->
      <div v-else class="space-y-6">
        <div
          v-for="report in reports"
          :key="report._id"
          class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
        >
          <!-- Report Header -->
          <div class="p-5 bg-blue-50 border-b">
            <div class="flex flex-col md:flex-row justify-between items-start">
              <div class="mb-3 md:mb-0">
                <div class="flex items-center">
                  <h3 class="font-bold text-lg text-gray-800">
                    {{ report.customer.name }}
                  </h3>
                  <span
                    class="ml-3 px-3 py-1 text-xs rounded-full font-semibold"
                    :class="{
                      'bg-yellow-100 text-yellow-800':
                        report.status === 'Pending QC',
                      'bg-blue-100 text-blue-800':
                        report.status === 'Assign Mechanic',
                      'bg-purple-100 text-purple-800':
                        report.status === 'Repaired',
                      'bg-orange-200 text-orange-800':
                        report.status === 'Ready for Check',
                      'bg-green-100 text-green-800':
                        report.status === 'Completed',
                      'bg-red-100 text-red-800':
                        report.status === 'Rejected QC',
                    }"
                  >
                    {{ report.status }}
                  </span>
                </div>
                <div class="flex items-center mt-2 text-gray-600">
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span
                    >{{ report.product.brand }} -
                    {{ report.product.collection }}</span
                  >
                </div>
              </div>
              <div
                class="bg-white px-3 py-2 rounded-md shadow-sm border border-gray-200"
              >
                <div class="text-xs text-gray-500 uppercase tracking-wider">
                  Service ID:
                </div>
                <div class="font-mono text-sm text-gray-700">
                  {{ report._id }}
                </div>
              </div>
            </div>
          </div>

          <!-- Report Body -->
          <div class="p-5">
            <!-- Spareparts Checklist -->
            <div class="mb-6">
              <h4 class="font-medium text-gray-700 mb-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-500"
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
                Components Used:
              </h4>
              <div class="space-y-4">
                <div
                  v-for="(sparepart, index) in report.spareparts"
                  :key="index"
                  class="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  <div class="font-medium mb-2 flex items-center">
                    <input
                      type="checkbox"
                      v-model="checkedSpareparts[report._id][sparepart._id]"
                      class="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-3"
                    />
                    <span class="text-lg">{{ sparepart.name }}</span>
                  </div>
                  <div class="text-sm text-gray-500 mb-3 ml-8">
                    Quantity required:
                    <span class="font-semibold">{{ sparepart.quantity }}</span>
                  </div>

                  <!-- Sparepart Selector dari Database -->
                  <div
                    v-if="checkedSpareparts[report._id][sparepart._id]"
                    class="ml-8 bg-white p-3 rounded-lg border border-gray-200"
                  >
                    <p class="text-sm font-medium text-gray-700 mb-2">
                      Select {{ sparepart.name }} from stock:
                    </p>

                    <div class="space-y-3">
                      <div
                        v-if="filteredDbSpareparts(sparepart).length === 0"
                        class="text-center py-3"
                      >
                        <p class="text-sm text-red-500">
                          There is no stock available for {{ sparepart.name }}
                        </p>
                      </div>

                      <div
                        v-for="dbSparepart in filteredDbSpareparts(sparepart)"
                        :key="dbSparepart._id"
                        class="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        <div class="flex items-center">
                          <input
                            type="radio"
                            :name="`sparepart_${report._id}_${sparepart._id}`"
                            :id="`sparepart_${report._id}_${sparepart._id}_${dbSparepart._id}`"
                            :value="dbSparepart._id"
                            v-model="
                              selectedDbSpareparts[report._id][sparepart._id]
                            "
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <label
                            :for="`sparepart_${report._id}_${sparepart._id}_${dbSparepart._id}`"
                            class="ml-2 block text-sm"
                          >
                            <span class="font-medium text-gray-800">{{
                              dbSparepart.name
                            }}</span>
                            <span class="ml-1 text-gray-500">
                              {{ formatSparepartDetails(dbSparepart) }}
                            </span>
                          </label>
                        </div>
                        <div class="flex items-center space-x-4">
                          <span
                            class="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                          >
                            {{ dbSparepart.quantity }} Available
                          </span>
                          <span
                            class="text-xs px-2 py-1 bg-blue-100 rounded-full text-blue-700"
                          >
                            Rp. {{ formatPrice(dbSparepart.priceWT) }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mechanic Notes -->
            <div class="mb-6">
              <label
                for="notes"
                class="block font-medium text-gray-700 mb-2 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-500"
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
                Mechanic Notes:
              </label>
              <textarea
                v-model="notes[report._id]"
                id="notes"
                rows="3"
                placeholder="Notes from mechanic....."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-700 resize-none shadow-sm"
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="mt-6 flex justify-end">
              <button
                @click="confirmSubmit(report._id)"
                class="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors font-medium shadow-sm"
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
                Mark Complete
              </button>
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
import Layout from "@/components/dashboard/Layout.vue";
import api from "@/api/api.js";

const reports = ref([]);
const dbSpareparts = ref([]);
const toast = useToast();
const loading = ref(true);
const checkedSpareparts = ref({});
const selectedDbSpareparts = ref({});
const notes = ref({});

// Format harga dalam format rupiah
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

// Format detail sparepart (size, colour)
const formatSparepartDetails = (sparepart) => {
  let details = [];

  if (sparepart.brand) {
    details.push(sparepart.brand);
  }

  if (sparepart.size) {
    details.push(`Size: ${sparepart.size}`);
  }

  if (sparepart.colour) {
    details.push(`Warna: ${sparepart.colour}`);
  }

  return details.length > 0 ? `(${details.join(", ")})` : "";
};

const ensureSparepartHasId = (spareparts) => {
  return spareparts.map((sparepart, index) => {
    if (!sparepart._id) {
      sparepart._id = `${sparepart.name}_${index}`;
    }
    return sparepart;
  });
};

// Filter sparepart database berdasarkan nama sparepart di laporan
const filteredDbSpareparts = (reportSparepart) => {
  return dbSpareparts.value.filter((dbSparepart) => {
    // Filter berdasarkan nama yang sama dan stok yang tersedia
    return (
      dbSparepart.name.toLowerCase() === reportSparepart.name.toLowerCase() &&
      dbSparepart.quantity > 0
    );
  });
};

// Ambil semua sparepart dari database
const fetchAllSpareparts = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get("/sparepart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dbSpareparts.value = res.data;
  } catch (err) {
    console.error("Gagal mengambil data sparepart:", err);
    toast.error("Unable to retrieve sparepart data. Please try again later.");
  }
};

// Ambil laporan dari database
const fetchReports = async () => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    const res = await api.get("/mechanic/my-reports", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Pastikan setiap sparepart memiliki _id yang unik
    reports.value = res.data.map((report) => {
      report.spareparts = ensureSparepartHasId(report.spareparts);
      return report;
    });

    res.data.forEach((report) => {
      // Siapkan objek untuk menyimpan status checkbox
      if (!checkedSpareparts.value[report._id]) {
        checkedSpareparts.value[report._id] = {};
      }

      // Siapkan objek untuk menyimpan sparepart yang dipilih dari database
      if (!selectedDbSpareparts.value[report._id]) {
        selectedDbSpareparts.value[report._id] = {};
      }

      // Atur nilai awal untuk setiap sparepart
      report.spareparts.forEach((sparepart) => {
        checkedSpareparts.value[report._id][sparepart._id] = false;
        selectedDbSpareparts.value[report._id][sparepart._id] = "";
      });

      // Inisialisasi catatan jika belum ada
      if (!notes.value[report._id]) {
        notes.value[report._id] = "";
      }
    });
  } catch (err) {
    console.error("Gagal mengambil data laporan:", err);
    toast.error("Unable to retrieve report data. Please try again later.");
  } finally {
    loading.value = false;
  }
};

const confirmSubmit = (id) => {
  const konfirmasi = confirm(
    "Are you sure you want to mark this fix as complete?"
  );
  if (!konfirmasi) return;

  // Periksa apakah ada checkbox yang dicentang
  const anyChecked = Object.values(checkedSpareparts.value[id]).some(
    (value) => value === true
  );

  if (!anyChecked) {
    if (
      confirm(
        "You have not selected any components to use. Are you sure you want to continue?"
      )
    ) {
      submitChecklist(id);
    }
    return;
  }

  // Periksa apakah sparepart dari database sudah dipilih untuk semua item yang dicentang
  const report = reports.value.find((r) => r._id === id);
  const unchosenParts = [];

  report.spareparts.forEach((sparepart) => {
    if (
      checkedSpareparts.value[id][sparepart._id] &&
      !selectedDbSpareparts.value[id][sparepart._id]
    ) {
      unchosenParts.push(sparepart.name);
    }
  });

  if (unchosenParts.length > 0) {
    toast.warning(`Select a specific variant for: ${unchosenParts.join(", ")}`);
    return;
  }

  submitChecklist(id);
};

const submitChecklist = async (id) => {
  try {
    loading.value = true;
    const token = localStorage.getItem("token");
    const report = reports.value.find((r) => r._id === id);

    // Siapkan data untuk dikirim ke server
    const usedSpareparts = [];

    report.spareparts.forEach((reportSparepart) => {
      if (checkedSpareparts.value[id][reportSparepart._id]) {
        const dbSparepartId =
          selectedDbSpareparts.value[id][reportSparepart._id];
        const dbSparepart = dbSpareparts.value.find(
          (sp) => sp._id === dbSparepartId
        );

        if (dbSparepart) {
          usedSpareparts.push({
            sparepart: dbSparepartId, 
            quantity: reportSparepart.quantity,
          });
        }
      }
    });

    await api.post(
      "/mechanic/submit-checklist",
      {
        serviceReportId: id,
        notes: notes.value[id],
        usedSpareparts: usedSpareparts,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success(
      "Report successfully completed and status changed to Ready for Check"
    );
    fetchReports(); // refresh list
  } catch (err) {
    console.error("Error completing service:", err);
    if (err.response?.status === 403) {
      toast.error(
        "Access denied: Your role does not have permission to this page."
      );
    } else {
      toast.error("An error occurred while sending. Please try again.");
    }
    loading.value = false;
  }
};

onMounted(() => {
  fetchAllSpareparts();
  fetchReports();
});
</script>
