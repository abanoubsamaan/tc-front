<script setup>
import PurchaseOrderListItem from './PurchaseOrderListItem.vue'
import { onMounted, defineProps, ref } from 'vue'

let purchaseOrders = ref([])
// defineProps(() => {})

onMounted(() => {
  purchaseOrders.value = ['hey', '1']
  console.log(purchaseOrders.value)
})
</script>
<template>
  <table class="table table-striped table-hover">
    <thead class="table-light">
      <tr>
        <td></td>
        <td>#</td>
        <td>PO number</td>
        <td>Buyer name</td>
        <td>Total</td>
        <td>Actions</td>
      </tr>
    </thead>
    <tbody>
      <PurchaseOrderListItem />
    </tbody>
  </table>
</template>
