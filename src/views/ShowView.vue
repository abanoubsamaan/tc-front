<script setup>
import { useRoute, useRouter } from 'vue-router'
import usePurchaseOrders from '@/composables/usePurchaseOrders'
import { onMounted } from 'vue'
import useSweetAlert from '@/composables/useSweetAlert'

const { purchaseOrder, getPurchaseOrder } = usePurchaseOrders()
const route = useRoute()
const router = useRouter()
const { flash } = useSweetAlert()

onMounted(async () => {
  try {
    await getPurchaseOrder(route.params.id)
  } catch (error) {
    router.push({ name: 'home' })
    flash('Something went wrong', error.response.data.message, 'warning')
  }
})
</script>

<template>
  <div class="mt-5 d-flex justify-content-between">
    <h3>Purchase order information</h3>
    <RouterLink :to="`${route.params.id}/edit`" class="btn btn-secondary">Edit</RouterLink>
  </div>
  <div class="d-md-flex gap-5">
    <div class="mt-3">
      <div class="d-flex gap-3">
        <p><strong>PO Number: </strong></p>
        <p>{{ purchaseOrder.po_number }}</p>
      </div>
      <div class="d-flex gap-3">
        <p><strong>Buyer name: </strong></p>
        <p>{{ purchaseOrder.buyer_name }}</p>
      </div>
      <div class="d-flex gap-3">
        <p><strong>Total amount: </strong></p>
        <p>${{ purchaseOrder.total }}</p>
      </div>
    </div>
    <div class="mt-md-3">
      <div class="d-flex gap-3">
        <p><strong>Received at </strong></p>
        <p>{{ purchaseOrder.date_received }}</p>
      </div>
      <div class="d-flex gap-3">
        <p><strong>Updated at: </strong></p>
        <p>{{ purchaseOrder.date_updated }}</p>
      </div>
    </div>
  </div>

  <div class="mt-5">
    <h4>Items</h4>
  </div>
  <table class="table table-striped table-hover">
    <thead class="table-dark">
      <tr>
        <th>Description</th>
        <th>Unit Price</th>
        <th>Quantity</th>
        <th>Total</th>
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in purchaseOrder.items" :key="item.id">
        <td>{{ item.description }}</td>
        <td>{{ item.unit_price }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.unit_price * item.quantity }}</td>
        <td>{{ item.category.name }}</td>
      </tr>
    </tbody>
  </table>
</template>
