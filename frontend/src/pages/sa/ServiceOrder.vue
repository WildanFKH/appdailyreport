<template>
  <Layout>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <header class="flex items-center space-x-3 mb-8 border-b pb-4">
        <div class="flex items-center mb-2">
          <span
            class="bg-amber-100 text-amber-600 p-2.5 rounded-lg mr-3 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-primary"
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
          </span>
          <h1
            class="text-2xl font-bold text-gray-800 hidden md:block border-r pr-6 mr-6 border-gray-200"
          >
            Form Service Order
          </h1>
          <p class="text-gray-600">Create a service order for the customer.</p>
        </div>
      </header>

      <form @submit.prevent="submitForm" class="space-y-8">
        <!-- Customer Info -->
        <section class="bg-gray-50 p-6 rounded-lg">
          <h2
            class="text-xl font-semibold text-secondary mb-4 flex items-center"
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
            Customer Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <input
                v-model="form.customer.name"
                type="text"
                placeholder="Enter full name"
                required
                class="input focus:border-primary"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Address</label
              >
              <input
                v-model="form.customer.address"
                type="text"
                placeholder="Enter complete address"
                required
                class="input focus:border-primary"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >No. Telp</label
              >
              <input
                v-model="form.customer.phone"
                type="number"
                placeholder="Example: 0812XXXXXXXX"
                required
                class="input focus:border-primary"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Email</label
              >
              <input
                v-model="form.customer.email"
                type="email"
                placeholder="example@email.com"
                required
                class="input focus:border-primary"
              />
            </div>
          </div>
        </section>

        <!-- Product Info -->
        <section class="bg-gray-50 p-6 rounded-lg">
          <h2
            class="text-xl font-semibold text-secondary mb-4 flex items-center"
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
            Product Information
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Brand</label
              >
              <input
                v-model="form.product.brand"
                type="text"
                placeholder="Enter the product brand"
                required
                class="input focus:border-primary"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Collection</label
              >
              <input
                v-model="form.product.collection"
                type="text"
                placeholder="Enter a product collection"
                required
                class="input focus:border-primary"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Size</label
              >
              <input
                v-model="form.product.size"
                type="text"
                placeholder="Enter a product size"
                required
                class="input focus:border-primary"
              />
            </div>
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Color</label
              >
              <input
                v-model="form.product.color"
                type="text"
                placeholder="Enter a product colour"
                required
                class="input focus:border-primary"
              />
            </div>
          </div>
        </section>

        <!-- Service Type -->
        <section class="bg-gray-50 p-6 rounded-lg">
          <h2
            class="text-xl font-semibold text-secondary mb-4 flex items-center"
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
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Select the type of service required</label
            >
            <div class="flex flex-wrap gap-4 mt-2">
              <label
                class="relative flex items-center p-4 rounded-md border cursor-pointer hover:bg-gray-100 transition"
                :class="{
                  'border-primary bg-primary bg-opacity-5':
                    form.serviceRequest === 'Repair',
                  'border-gray-200': form.serviceRequest !== 'Repair',
                }"
              >
                <input
                  type="radio"
                  value="Repair"
                  v-model="form.serviceRequest"
                  class="absolute opacity-0"
                />
                <div class="mr-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-primary"
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
                <div>
                  <span class="block font-medium">Repair</span>
                  <span class="text-sm text-gray-500"
                    >Repair damaged components</span
                  >
                </div>
              </label>

              <label
                class="relative flex items-center p-4 rounded-md border cursor-pointer hover:bg-gray-100 transition"
                :class="{
                  'border-primary bg-primary bg-opacity-5':
                    form.serviceRequest === 'Replace',
                  'border-gray-200': form.serviceRequest !== 'Replace',
                }"
              >
                <input
                  type="radio"
                  value="Replace"
                  v-model="form.serviceRequest"
                  class="absolute opacity-0"
                />
                <div class="mr-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div>
                  <span class="block font-medium">Replace</span>
                  <span class="text-sm text-gray-500"
                    >Replacement of components with new ones</span
                  >
                </div>
              </label>
            </div>
          </div>
        </section>

        <!-- Komponen Diperbaiki -->
        <section class="bg-gray-50 p-6 rounded-lg">
          <h2
            class="text-xl font-semibold text-secondary mb-4 flex items-center"
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Components
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div
              v-for="item in sparepartOptions"
              :key="item"
              class="flex flex-col space-y-2 p-3 border rounded-md hover:bg-gray-100 transition"
              :class="{
                'border-primary bg-primary bg-opacity-5':
                  form.selectedSpareparts.includes(item),
                'border-gray-200': !form.selectedSpareparts.includes(item),
              }"
            >
              <label class="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  :value="item"
                  v-model="form.selectedSpareparts"
                  class="w-5 h-5 text-primary rounded focus:ring-primary"
                />
                <span class="font-medium">{{ item }}</span>
              </label>

              <div
                v-if="
                  form.selectedSpareparts.includes(item) &&
                  form.serviceRequest === 'Replace'
                "
                class="pl-8 space-y-3 mt-2"
              >
                <div class="flex flex-col space-y-1">
                  <label class="text-sm text-gray-600">Quantity</label>
                  <input
                    v-model="form.replacedQuantities[item]"
                    type="number"
                    min="1"
                    placeholder="Qty"
                    class="border px-3 py-2 rounded focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div class="flex flex-col space-y-1">
                  <label class="text-sm text-gray-600"
                    >Merk/Brand (optional)</label
                  >
                  <input
                    v-model="form.customItems[item]"
                    type="text"
                    placeholder="Component Specifications"
                    class="border px-3 py-2 rounded focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Komponen custom -->
          <div class="mt-6 space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Other Components (Optional)</label
            >
            <input
              v-model="form.customItem"
              type="text"
              placeholder="Name the components that are not on the list."
              class="input focus:border-primary"
            />
          </div>
        </section>

        <!-- Kondisi Barang -->
        <section class="bg-gray-50 p-6 rounded-lg">
          <h2
            class="text-xl font-semibold text-secondary mb-4 flex items-center"
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
            Notes Conditions
          </h2>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Describe the current condition of the item</label
            >
            <textarea
              v-model="form.conditionNotes"
              rows="4"
              class="input focus:border-primary w-full"
              placeholder="Describe the condition of the damaged items in detail."
              required
            ></textarea>
          </div>
        </section>

        <!-- Garansi -->
        <section class="bg-gray-50 p-6 rounded-lg">
          <h2
            class="text-xl font-semibold text-secondary mb-4 flex items-center"
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
            Warranty Status
          </h2>
          <div class="space-y-4">
            <div class="flex space-x-6">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="true"
                  v-model="form.warranty.isUnderWarranty"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <span>Warranty</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  value="false"
                  v-model="form.warranty.isUnderWarranty"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <span>Not Warranty</span>
              </label>
            </div>

            <div
              v-if="form.warranty.isUnderWarranty === 'true'"
              class="space-y-2"
            >
              <label class="block text-sm font-medium text-gray-700"
                >Product Purchase Date</label
              >
              <input
                v-model="form.warranty.purchaseDate"
                type="date"
                class="input focus:border-primary"
              />
            </div>
          </div>
        </section>

        <!-- Tanggal Estimasi -->
        <section class="bg-gray-50 p-6 rounded-lg">
          <h2
            class="text-xl font-semibold text-secondary mb-4 flex items-center"
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
            Estimated Completion Date
          </h2>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700"
              >Select the estimated date for picking up the items</label
            >
            <input
              v-model="form.finishEstimate"
              type="date"
              required
              class="input focus:border-primary"
            />
          </div>
        </section>

        <!-- Submit -->
        <div class="flex justify-center pt-4">
          <button
            type="submit"
            class="bg-primary text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-opacity-90 transition-colors shadow-md flex items-center space-x-2"
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Create Service Order</span>
          </button>
        </div>
      </form>
    </div>
  </Layout>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import Layout from "@/components/dashboard/Layout.vue";
import api from "@/api/api.js";

const router = useRouter();
const toast = useToast();
const form = ref({
  customer: { name: "", address: "", phone: "", email: "" },
  product: { brand: "", collection: "", size: "", color: "" },
  serviceRequest: "",
  selectedSpareparts: [],
  replacedQuantities: {},
  customItems: {},
  customItem: "",
  conditionNotes: "",
  warranty: { isUnderWarranty: "", purchaseDate: "" },
  finishEstimate: "",
});

const sparepartOptions = [
  "Wheels",
  "Top Handle",
  "Side Handle",
  "Zipper",
  "Lock",
  "Trolley",
  "Stud",
  "Inner Compartment",
];

const submitForm = async () => {
  try {
    const token = localStorage.getItem("token");

    // Validasi field kosong
    if (
      !form.value.customer.name ||
      !form.value.customer.address ||
      !form.value.customer.phone ||
      !form.value.customer.email ||
      !form.value.product.brand ||
      !form.value.product.collection ||
      !form.value.product.size ||
      !form.value.product.color ||
      !form.value.serviceRequest ||
      !form.value.conditionNotes ||
      !form.value.finishEstimate
    ) {
      toast.warning("Complete all data first.");
      return;
    }

    // Validasi tanggal estimasi selesai (maksimal 7 hari dari hari ini)
    const today = new Date();
    const selectedDate = new Date(form.value.finishEstimate);
    const maxAllowedDate = new Date();
    maxAllowedDate.setDate(today.getDate() + 7);

    if (selectedDate > maxAllowedDate) {
      toast.error("Estimated completion date cannot exceed 7 days from today.");
      return;
    }

    // Validasi tanggal tidak boleh sebelum hari ini
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      toast.error("Estimated completion date cannot be in the past.");
      return;
    }

    const payload = {
      ...form.value,
      spareparts: form.value.selectedSpareparts.map((name) => ({
        name,
        quantity:
          form.value.serviceRequest === "Replace"
            ? form.value.replacedQuantities[name] || 1
            : undefined,
        customItem: form.value.customItems[name] || "",
      })),
    };

    await api.post("/service-report", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Service report successfully submitted!");
    await router.push("/sa/service-list");
  } catch (err) {
    console.error("Error saat submit:", err);
    const status = err.response?.status;
    const message = err.response?.data?.message;

    if (status === 403) {
      toast.error(
        "Access denied: Your role does not have permission to this page."
      );
    } else {
      toast.error(message || "Failed to save service order.");
    }
  }
};
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary;
}
</style>
