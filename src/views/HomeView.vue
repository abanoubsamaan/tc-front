<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination'
import PurchaseOrderList from '@/components/PurchaseOrders/PurchaseOrderList.vue'
import usePurchaseOrders from '@/composables/usePurchaseOrders'
import { onMounted } from 'vue'

let { purchaseOrders, getPurchaseOrders, deleteOne, deleteMany } = usePurchaseOrders()

onMounted(() => {
  getPurchaseOrders()
})
</script>

<template>
  <div class="card mt-5 mb-3">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <div>
          <h5 class="mt-2">Purchase orders</h5>
        </div>

        <div>
          <a class="btn btn-secondary">Create</a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <PurchaseOrderList
        :purchaseOrders="purchaseOrders.data"
        :deleteMany="deleteMany"
        :deleteOne="deleteOne"
      />
      <Bootstrap5Pagination :data="purchaseOrders" @pagination-change-page="getPurchaseOrders" />
    </div>
  </div>
</template>
