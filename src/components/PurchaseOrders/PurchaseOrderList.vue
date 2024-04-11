<script setup>
import PurchaseOrderListItem from './PurchaseOrderListItem.vue'
import { ref, defineProps } from 'vue'

defineProps({
  purchaseOrders: Object,
  deleteOne: Function,
  deleteMany: Function
})

const selectedIds = ref([])

const updateSelectedIds = (id) => {
  if (selectedIds.value.includes(id)) {
    // If ID exists, remove it
    selectedIds.value = selectedIds.value.filter((selectedId) => selectedId !== id)
  } else {
    // If ID doesn't exist, add it
    selectedIds.value.push(id)
  }
}

const resetSelection = () => {
  selectedIds.value = []
}
</script>

<template>
  <table class="table table-striped table-hover">
    <thead class="table-light">
      <tr>
        <td>
          <button
            v-if="selectedIds.length"
            class="btn btn-danger btn-sm"
            @click="deleteMany(selectedIds), resetSelection()"
          >
            <i class="bi bi-archive"></i>
          </button>
        </td>
        <td>#</td>
        <td>PO number</td>
        <td>Buyer name</td>
        <td>Total</td>
        <td>Actions</td>
      </tr>
    </thead>
    <tbody>
      <PurchaseOrderListItem
        v-for="purchaseOrder in purchaseOrders"
        :key="purchaseOrder.id"
        :purchaseOrder
        :deleteOne
        @selected-id="updateSelectedIds"
      />
    </tbody>
  </table>
</template>
