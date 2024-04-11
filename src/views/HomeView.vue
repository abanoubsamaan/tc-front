<script setup>
import { Bootstrap5Pagination } from 'laravel-vue-pagination'
import PurchaseOrderList from '@/components/PurchaseOrders/PurchaseOrderList.vue'
import ItemsPerCategoryChart from '@/components/PurchaseOrders/Charts/ItemsPerCategoryChart.vue'
import OrdersPerDayChart from '@/components/PurchaseOrders/Charts/OrdersPerDayChart.vue'
import usePurchaseOrders from '@/composables/usePurchaseOrders'
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const { purchaseOrders, getPurchaseOrders, deleteOne, deleteMany } = usePurchaseOrders()
const router = useRouter()
const searchTerm = ref('')

onMounted(() => {
  getPurchaseOrders(router.currentRoute.value.query.page, searchTerm.value)
})

const search = () => {
  getPurchaseOrders(1, searchTerm.value)
}

const paginationGetData = (page) => {
  getPurchaseOrders(page, searchTerm.value)
  router.push({ path: '/', query: { page: page } })
}
</script>

<template>
  <div class="card mt-5 mb-3">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <h5 class="mt-2">Purchase orders</h5>
        <RouterLink to="purchase-order/create" class="btn btn-secondary"
          >Create <i class="bi bi-plus-lg"></i
        ></RouterLink>
      </div>
    </div>
    <div class="card-body">
      <!-- Charts -->
      <div class="d-flex mb-5">
        <ItemsPerCategoryChart />
        <OrdersPerDayChart />
      </div>

      <!-- Search Form -->
      <form class="d-flex mb-4" @submit.prevent="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search by PO number or buyer name"
          v-model="searchTerm"
        />
        <button class="btn btn-success" type="submit"><i class="bi bi-search"></i></button>
      </form>

      <!-- Purchase orders list -->
      <PurchaseOrderList
        :purchaseOrders="purchaseOrders.data"
        :deleteMany="deleteMany"
        :deleteOne="deleteOne"
      />

      <!-- Not found expression -->
      <p class="text-center m-2" v-if="purchaseOrders.data && purchaseOrders.data.length === 0">
        No purchase orders found
      </p>

      <!-- Paginator -->
      <Bootstrap5Pagination :data="purchaseOrders" @pagination-change-page="paginationGetData" />
    </div>
  </div>
</template>
