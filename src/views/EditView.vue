<script setup>
import PurchaseOrderForm from '@/components/PurchaseOrders/PurchaseOrderForm.vue'
import usePurchaseOrders from '@/composables/usePurchaseOrders'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import useSweetAlert from '@/composables/useSweetAlert'
import ValidationErrors from '@/components/ValidationErrors.vue'

const { purchaseOrder, getPurchaseOrder, update } = usePurchaseOrders()
const route = useRoute()
const router = useRouter()
const { flash } = useSweetAlert()
const displayErrors = ref(false)
const errors = ref({})

onMounted(async () => {
  try {
    await getPurchaseOrder(route.params.id)
  } catch (error) {
    router.push({ name: 'home' })
    flash('Something went wrong', error.response.data.message, 'warning')
  }
})

const editPurchaseOrder = async (data) => {
  console.log(data)
  const res = await update(route.params.id, data)
  if (res.code == 200) {
    router.push({ name: 'home' })
    flash('Done!', res.data.message, 'success')
  } else if (res.code == 422) {
    errors.value = res.data
  } else {
    console.log(res)
  }
}

watch(errors, () => {
  if (Object.keys(errors.value).length) {
    displayErrors.value = true
  } else {
    displayErrors.value = false
  }
})
</script>
<template>
  <ValidationErrors :errors="errors" v-if="displayErrors" />
  <PurchaseOrderForm :purchaseOrder="purchaseOrder" :onSave="editPurchaseOrder" />
</template>
