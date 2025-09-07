<template>
  <div
    class="rounded-xl shadow-lg overflow-hidden transition-all duration-300 h-full"
    :class="bgClass || 'bg-white'"
  >
    <div class="p-6">
      <div class="flex items-center justify-between">
        <div>
          <p
            class="text-sm font-medium uppercase"
            :class="textClass || 'text-gray-500'"
          >
            {{ title }}
          </p>
          <h3
            class="text-2xl font-bold mt-2"
            :class="textClass || 'text-gray-800'"
          >
            {{ formatValue(value) }}
          </h3>
        </div>
        <div
          class="flex items-center justify-center w-12 h-12 rounded-full bg-opacity-25"
          :class="iconBgClass || 'bg-gray-100'"
        >
          <span class="text-2xl">{{ icon }}</span>
        </div>
      </div>

      <div class="mt-4" v-if="trend">
        <div class="flex items-center">
          <span
            class="text-sm mr-1"
            :class="trend > 0 ? 'text-green-500' : 'text-red-500'"
          >
            {{ trend > 0 ? "↑" : "↓" }} {{ Math.abs(trend) }}%
          </span>
          <span class="text-xs text-gray-400">vs last month</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: [Number, String],
  icon: String,
  trend: Number,
  bgClass: String,
  textClass: String,
  iconBgClass: String,
});

const formatValue = (val) => {
  if (typeof val === "number" && val > 999) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  return val || 0;
};
</script>
