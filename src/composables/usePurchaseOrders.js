import { ref } from 'vue'
import axios from 'axios'
import useSweetAlert from './useSweetAlert'

export default function usePurchaseOrders() {
  const baseUrl = 'http://127.0.0.1:8000/api'
  const purchaseOrders = ref([])
  const { flash, confirmAction } = useSweetAlert()

  const getPurchaseOrders = (page = 1) => {
    axios.get(`${baseUrl}/purchase-orders?page=${page}`).then((res) => {
      purchaseOrders.value = res.data
    })
  }

  const deleteOne = (id) => {
    confirmAction('Are you sure you want to delete this item?', () => {
      axios.delete(`${baseUrl}/purchase-orders/${id}`).then((res) => {
        if (res.status == 200) {
          flash('Success', res.data.message, 'success')
          getPurchaseOrders()
        }
      })
    })
  }

  const deleteMany = async (ids) => {
    console.log(ids)
    confirmAction('Are you sure you want to delete the selected item(s)?', () => {
      axios.delete(`${baseUrl}/purchase-orders/delete/`, { data: { ids } }).then((res) => {
        if (res.status == 200) {
          flash('Success', res.data.message, 'success')
          getPurchaseOrders()
        }
      })
    })
  }

  return { purchaseOrders, getPurchaseOrders, deleteOne, deleteMany }
}
