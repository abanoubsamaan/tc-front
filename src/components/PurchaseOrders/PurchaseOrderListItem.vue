<script setup>
import { defineEmits } from 'vue'

defineProps({
  purchaseOrder: Object,
  deleteOne: Function
})

const emit = defineEmits(['selectedId'])

const toggleSelection = (id) => {
  emit('selectedId', id)
}
</script>
<template>
  <tr>
    <td>
      <input type="checkbox" class="form-check-input" @change="toggleSelection(purchaseOrder.id)" />
    </td>
    <td>{{ purchaseOrder.id }}</td>
    <td>{{ purchaseOrder.po_number }}</td>
    <td>{{ purchaseOrder.buyer_name }}</td>
    <td>{{ purchaseOrder.total }}</td>
    <td>
      <RouterLink :to="`/purchase-order/${purchaseOrder.id}`" class="btn btn-secondary btn-sm m-1"
        ><i class="bi bi-eye"></i
      ></RouterLink>
      <RouterLink
        :to="`/purchase-order/${purchaseOrder.id}/edit`"
        class="btn btn-success btn-sm m-1"
        ><i class="bi bi-pen"></i
      ></RouterLink>
      <button class="btn btn-danger btn-sm m-1" @click="deleteOne(purchaseOrder.id)">
        <i class="bi bi-archive"></i>
      </button>
    </td>
  </tr>
</template>
