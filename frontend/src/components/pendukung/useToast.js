import { ref } from "vue";

const isVisible = ref(false);
const message = ref("");
const type = ref("success"); // success | error | info

export function useToast() {
  const showToast = (msg, toastType = "success") => {
    message.value = msg;
    type.value = toastType;
    isVisible.value = true;
    setTimeout(() => {
      isVisible.value = false;
    }, 3000);
  };

  return {
    isVisible,
    message,
    type,
    showToast,
  };
}
