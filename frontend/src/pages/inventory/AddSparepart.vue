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
            Add Sparepart
          </h1>
          <p class="text-gray-600">
            This form is used to add new spare parts to the system. Make sure
            all information entered is correct and complete.
          </p>
        </div>
      </header>

      <form
        @submit.prevent="handleSubmit"
        class="space-y-5 bg-white p-6 rounded-xl shadow-lg border border-gray-100"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="label"
              >Name <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.name"
              class="input focus:ring-2 focus:ring-green focus:outline-none"
              placeholder="Enter the name of the sparepart"
              required
            />
          </div>

          <div>
            <label class="label"
              >Brand <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.brand"
              class="input focus:ring-2 focus:ring-green focus:outline-none"
              placeholder="Enter brand"
              required
            />
          </div>

          <div>
            <label class="label">Size</label>
            <input
              v-model="form.size"
              class="input focus:ring-2 focus:ring-green focus:outline-none"
              placeholder="Enter size"
            />
          </div>

          <div>
            <label class="label">Colour</label>
            <input
              v-model="form.colour"
              class="input focus:ring-2 focus:ring-green focus:outline-none"
              placeholder="Enter colour"
            />
          </div>
        </div>

        <div class="border-t border-gray-100 my-4 pt-4">
          <h2 class="text-lg font-semibold text-gray-700 mb-3">
            Price & Stock Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="label"
                >Purchase Price (Cost)<span class="text-red-500">*</span></label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <span class="text-gray-500">Rp</span>
                </div>
                <input
                  type="number"
                  v-model.number="form.cost"
                  class="block w-full pl-10 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div>
              <label class="label"
                >Selling Price (With Tax)<span class="text-red-500"
                  >*</span
                ></label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <span class="text-gray-500">Rp</span>
                </div>
                <input
                  type="number"
                  v-model.number="form.priceWT"
                  class="block w-full pl-10 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div>
              <label class="label"
                >Initial Stock<span class="text-red-500">*</span></label
              >
              <input
                type="number"
                v-model.number="form.quantity"
                class="input focus:ring-2 focus:ring-green focus:outline-none"
                placeholder="0"
                required
              />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between pt-4">
          <button
            type="button"
            @click="router.push('/inventory/Inventory')"
            class="btn-secondary"
          >
            Cancel
          </button>
          <button
            class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            type="submit"
          >
            Save Spareparts
          </button>
        </div>
      </form>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "vue-toastification";
import api from "@/api/api.js";
import Layout from "@/components/dashboard/Layout.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();

const form = ref({
  name: "",
  brand: "",
  size: "",
  colour: "",
  cost: null,
  priceWT: null,
  quantity: null,
});

const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.brand &&
    form.value.cost > 0 &&
    form.value.priceWT > 0 &&
    form.value.quantity >= 0
  );
});

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("token");
    const konfirmasi = confirm("Are you sure you want to add this sparepart?");
    if (!konfirmasi) return;
    await api.post("/sparepart", form.value, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Success notification
    toast.success("Sparepart added successfully!");
    router.push("/inventory/sparepart-list");
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
</script>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700;
}

.label {
  @apply text-sm font-medium text-gray-700 mb-1 block;
}

.btn-primary {
  @apply bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors duration-200 font-medium flex items-center justify-center;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium flex items-center justify-center;
}
</style>
