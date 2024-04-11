<script setup>
import PurchaseOrderForm from '@/components/PurchaseOrders/PurchaseOrderForm.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import usePurchaseOrders from '@/composables/usePurchaseOrders'
import { useRouter } from 'vue-router'
import useSweetAlert from '@/composables/useSweetAlert'
import { ref, watch } from 'vue'

const { create } = usePurchaseOrders()
const router = useRouter()
const { flash } = useSweetAlert()
const displayErrors = ref(false)
const errors = ref({})

const createPurchaseOrder = async (data) => {
  const res = await create(data)
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
  <PurchaseOrderForm :onSave="createPurchaseOrder" />
</template>
