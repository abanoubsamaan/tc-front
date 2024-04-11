<script setup>
import usePurchaseOrders from '@/composables/usePurchaseOrders'
import { onMounted, reactive, watch } from 'vue'

const props = defineProps({
  purchaseOrder: Object,
  onSave: {
    type: Function,
    required: true
  }
})

const { categories, getCategories } = usePurchaseOrders()

onMounted(async () => {
  handleFormInputs()
  await getCategories()
})

let purchaseOrderData = reactive({
  po_number: '',
  buyer_name: '',
  items: []
})

watch(
  () => categories,
  async () => {
    await getCategories()
  }
)

watch(
  () => props.purchaseOrder,
  () => {
    handleFormInputs()
  }
)

const save = () => {
  props.onSave(purchaseOrderData)
}

const handleFormInputs = () => {
  if (props.purchaseOrder) {
    purchaseOrderData = props.purchaseOrder
  } else {
    // Initialize with a single empty item
    purchaseOrderData.items = [
      {
        description: null,
        unit_price: null,
        quantity: null,
        category_id: null,
        category: {
          id: null
        }
      }
    ]
  }
}

const addItem = () => {
  purchaseOrderData.items.push({
    description: null,
    unit_price: null,
    quantity: null,
    category_id: null,
    category: {
      id: null
    }
  })
}

const deleteItem = (index) => {
  // delete only if we have more than one item
  if (purchaseOrderData.items.length > 1) {
    purchaseOrderData.items.splice(index, 1)
  }
}
</script>
<template>
  <div class="mt-5 d-flex justify-content-between">
    <h3>Purchase order information</h3>
  </div>
  <div class="mt-3">
    <div class="form-group">
      <label for="poNumber"><strong>PO Number</strong></label>
      <input
        id="poNumber"
        class="form-control"
        placeholder="Enter purchase order number"
        v-model="purchaseOrderData.po_number"
      />
      <p></p>
    </div>
    <div class="form-group">
      <label for="buyerName"><strong>Buyer name</strong></label>
      <input
        id="buyerName"
        class="form-control"
        placeholder="Enter buyer name"
        v-model="purchaseOrderData.buyer_name"
      />
    </div>
  </div>

  <div class="mt-5 d-flex justify-content-between">
    <h4>Items</h4>
    <button class="btn btn-secondary btn-sm mb-2" @click="addItem" id="addItem">
      <i class="bi bi-plus-lg"></i> Add new item
    </button>
  </div>

  <table class="table table-striped table-hover">
    <thead class="table-dark">
      <tr>
        <th>Description</th>
        <th>Unit Price</th>
        <th>Quantity</th>
        <th>Category</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in purchaseOrderData.items" :key="index">
        <td>
          <input
            :id="`item_${index}_description`"
            class="form-control description"
            v-model="item.description"
            placeholder="Enter the item description"
          />
        </td>
        <td>
          <input
            :id="`item_${index}_unit_price`"
            class="form-control unit-price"
            v-model="item.unit_price"
            placeholder="Enter the unit price"
            type="number"
          />
        </td>
        <td>
          <input
            :id="`item_${index}_quantity`"
            class="form-control quantity"
            v-model="item.quantity"
            placeholder="Enter the quantity"
            type="number"
          />
        </td>
        <td>
          <select class="form-select" v-model="item.category_id" :id="`item_${index}_category_id`">
            <option :value="null" disabled>Select one</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </td>
        <td>
          <button
            class="btn btn-danger btn-sm delete-row-btn"
            @click="deleteItem(index)"
            :disabled="purchaseOrderData.items.length == 1"
          >
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <button class="btn btn-secondary mb-2" @click="save" id="submit">
    <i class="bi bi-check2"></i> Save
  </button>
</template>
