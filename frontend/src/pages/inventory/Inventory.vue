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
              class="h-6 w-6 text-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6m10 6l2 2m4-10a8 8 0 11-16 0 8 8 0 0116 0z"
              />
            </svg>
          </span>
          <h1
            class="text-2xl font-bold text-gray-800 hidden md:block border-r pr-6 mr-6 border-gray-200"
          >
            Sparepart List
          </h1>
          <p class="text-gray-600">
            List of spare parts available in the system. You can search, filter,
            and submit requests for additional spare part stock through this
            page.
          </p>
        </div>
      </header>

      <!-- Search and Filter -->
      <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="search"
              type="text"
              placeholder="Looking for spareparts..."
              class="w-full px-4 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
            />
          </div>
          <div class="flex gap-2">
            <select
              v-model="filterBrand"
              class="px-4 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            >
              <option value="">All Brands</option>
              <option v-for="brand in uniqueBrands" :key="brand" :value="brand">
                {{ brand }}
              </option>
            </select>
            <select
              v-model="sortBy"
              class="px-4 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            >
              <option value="name">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
              <option value="stockLow">Stock (Lowest)</option>
              <option value="stockHigh">Stock (Highest)</option>
              <option value="priceLowest">Price (Lowest)</option>
              <option value="priceHighest">Price (Highest)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Request Form -->
      <div
        v-if="showRequestForm"
        class="mb-6 bg-white p-6 rounded-lg shadow-md border-l-4"
      >
        <h2 class="text-xl font-semibold mb-4 text-grey-700">
          Request additional stock
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Select Spareparts</label
            >
            <select
              v-model="requestForm.sparepart"
              class="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            >
              <option disabled value="">Select Spareparts</option>
              <option v-for="sp in spareparts" :key="sp._id" :value="sp._id">
                {{ sp.name }} (stock: {{ sp.quantity }})
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Quantity</label
            >
            <input
              v-model.number="requestForm.quantity"
              type="number"
              min="1"
              class="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Notes"
            />
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Notes</label
          >
          <textarea
            v-model="requestForm.note"
            class="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
            placeholder="Notes (Optional)"
            rows="3"
          ></textarea>
        </div>
        <div class="flex justify-end gap-2">
          <button
            @click="showRequestForm = false"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="submitRequest"
            class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
          >
            Send Request
          </button>
        </div>
      </div>

      <!-- Stock Alert -->
      <div
        v-if="lowStockItems.length > 0"
        class="mb-6 bg-red-50 p-4 rounded-lg border border-red-200"
      >
        <div class="flex items-center text-grey-800 mb-2">
          <span class="text-xl mr-2">⚠️</span>
          <h3 class="font-semibold">Low Stock Warning</h3>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="item in lowStockItems"
            :key="item._id"
            class="px-3 py-1 bg-white border border-grey-300 rounded-full text-sm"
          >
            {{ item.name }}: {{ item.quantity }} Unit
          </span>
        </div>
      </div>

      <!-- List Spareparts -->
      <div
        v-if="filteredSpareparts.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="sp in filteredSpareparts"
          :key="sp._id"
          class="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
        >
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold truncate flex-1">
              {{ sp.name }}
            </h3>
            <span
              :class="[
                'text-xs px-2 py-1 rounded-full',
                sp.quantity <= 5
                  ? 'bg-red-100 text-red-600'
                  : sp.quantity <= 10
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-green-100 text-green-600',
              ]"
            >
              Stock: {{ sp.quantity }}
            </span>
          </div>
          <div class="space-y-2">
            <div class="flex flex-wrap gap-x-4 text-sm text-gray-600">
              <p class="flex items-center">
                <span class="font-medium mr-1">Brand:</span> {{ sp.brand }}
              </p>
              <p v-if="sp.size" class="flex items-center">
                <span class="font-medium mr-1">Size:</span> {{ sp.size }}
              </p>
              <p v-if="sp.colour" class="flex items-center">
                <span class="font-medium mr-1">Colour:</span> {{ sp.colour }}
              </p>
            </div>
            <p class="text-lg font-semibold">
              Rp {{ sp.priceWT.toLocaleString() }}
            </p>
          </div>
          <div
            class="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center"
          >
            <button
              @click="quickRequest(sp)"
              class="text-primary hover:bg-primary hover:bg-opacity-10 px-3 py-1 rounded-lg text-sm transition-colors"
            >
              Submit Add Stock
            </button>
            <button
              @click="confirmDelete(sp._id)"
              class="text-red-500 hover:bg-red-100 px-3 py-1 rounded-lg text-sm transition-colors"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-12">
        <div class="text-gray-400 text-5xl mb-4">🔍</div>
        <h3 class="text-xl font-medium text-gray-600 mb-2">
          No spareparts found
        </h3>
        <p class="text-gray-500">Try changing your search filters</p>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useToast } from "vue-toastification";
import Layout from "@/components/dashboard/Layout.vue";
import api from "@/api/api.js";

const spareparts = ref([]);
const toast = useToast();
const showRequestForm = ref(false);
const search = ref("");
const filterBrand = ref("");
const sortBy = ref("name");

const requestForm = ref({
  sparepart: "",
  quantity: 1,
  note: "",
});

const fetchSpareparts = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.get("/sparepart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    spareparts.value = res.data;
  } catch (err) {
    console.error("Failed to fetch spareparts:", err);
  }
};

const submitRequest = async () => {
  if (!requestForm.value.sparepart) {
    toast.warning("Please selectspare parts!");
    return;
  }

  if (requestForm.value.quantity < 1) {
    toast.warning("The number must be bigger than 0!");
    return;
  }

  const token = localStorage.getItem("token");
  const konfirmasi = confirm("Are you sure you want to add this sparepart?");
  if (!konfirmasi) return;
  try {
    await api.post("/sparepart-requests", requestForm.value, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Request sent successfully!");
    showRequestForm.value = false;
    requestForm.value = { sparepart: "", quantity: 1, note: "" };
  } catch (err) {
    console.error("Error saat submit:", err);
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 403) {
      toast.error(
        "Access denied: Your role does not have permission to this page."
      );
    } else {
      toast.error(message || "Failed to send request.");
    }
  }
};

const confirmDelete = async (id) => {
  const konfirmasi = confirm("Are you sure you want to delete this sparepart?");
  if (!konfirmasi) return;

  const token = localStorage.getItem("token");
  try {
    await api.delete(`/sparepart/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Sparepart successfully deleted");
    fetchSpareparts();
  } catch (err) {
    console.error("Error saat submit:", err);
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 403) {
      toast.error(
        "Access denied: Your role does not have permission to this page."
      );
    } else {
      toast.error(message || "Failed to add sparepart.");
    }
  }
};

const quickRequest = (sparepart) => {
  requestForm.value.sparepart = sparepart._id;
  requestForm.value.quantity = 1;
  requestForm.value.note = `Penambahan stok untuk ${sparepart.name}`;
  showRequestForm.value = true;
};

const uniqueBrands = computed(() => {
  const brands = new Set(spareparts.value.map((item) => item.brand));
  return Array.from(brands);
});

const lowStockItems = computed(() => {
  return spareparts.value.filter((item) => item.quantity <= 5);
});

const filteredSpareparts = computed(() => {
  let result = [...spareparts.value];

  // Filter by search
  if (search.value) {
    const searchLower = search.value.toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.brand.toLowerCase().includes(searchLower)
    );
  }

  // Filter by brand
  if (filterBrand.value) {
    result = result.filter((item) => item.brand === filterBrand.value);
  }

  // Sort
  result.sort((a, b) => {
    switch (sortBy.value) {
      case "name":
        return a.name.localeCompare(b.name);
      case "nameDesc":
        return b.name.localeCompare(a.name);
      case "stockLow":
        return a.quantity - b.quantity;
      case "stockHigh":
        return b.quantity - a.quantity;
      case "priceLowest":
        return a.priceWT - b.priceWT;
      case "priceHighest":
        return b.priceWT - a.priceWT;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return result;
});

onMounted(fetchSpareparts);
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border rounded mb-1;
}
.btn-primary {
  @apply bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90;
}
</style>
