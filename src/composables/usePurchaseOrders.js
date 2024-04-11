import { ref } from 'vue'
import axios from 'axios'
import useSweetAlert from './useSweetAlert'

export default function usePurchaseOrders() {
  const baseUrl = 'http://127.0.0.1:8000/api'
  const { flash, confirmAction } = useSweetAlert()

  const purchaseOrders = ref([])
  const getPurchaseOrders = (page = 1, search = '') => {
    axios.get(`${baseUrl}/purchase-orders?page=${page}&search=${search}`).then((res) => {
      purchaseOrders.value = res.data
    })
  }

  const purchaseOrder = ref([])
  const getPurchaseOrder = async (id) => {
    await axios.get(`${baseUrl}/purchase-orders/${id}`).then((res) => {
      purchaseOrder.value = res.data.data
    })
  }

  const categories = ref([])
  const getCategories = async () => {
    await axios.get(`${baseUrl}/categories`).then((res) => {
      categories.value = res.data.data
    })
  }

  const POsPerDay = ref([])
  const getPOsPerDay = async () => {
    await axios.get(`${baseUrl}/purchase-orders/grouped-by-day`).then((res) => {
      POsPerDay.value = res.data
    })
  }

  const create = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/purchase-orders`, data)
      return { code: 200, data: response.data }
    } catch (error) {
      return { code: error.response.status, data: error.response.data.details }
    }
  }

  const update = async (id, data) => {
    try {
      const response = await axios.patch(`${baseUrl}/purchase-orders/${id}`, data)
      return { code: 200, data: response.data }
    } catch (error) {
      return { code: error.response.status, data: error.response.data.details }
    }
  }

  const deleteOne = (id) => {
    confirmAction('Are you sure you want to delete this item?', () => {
      axios.delete(`${baseUrl}/purchase-orders/${id}`).then((res) => {
        if (res.status == 200) {
          flash('Success', res.data.message, 'success')
          getPurchaseOrders()
          getCategories()
        }
      })
    })
  }

  const deleteMany = async (ids) => {
    confirmAction('Are you sure you want to delete the selected item(s)?', () => {
      axios.delete(`${baseUrl}/purchase-orders/delete/`, { data: { ids } }).then((res) => {
        if (res.status == 200) {
          flash('Success', res.data.message, 'success')
          getPurchaseOrders()
          getCategories()
        }
      })
    })
  }

  return {
    purchaseOrders,
    getPurchaseOrders,
    purchaseOrder,
    getPurchaseOrder,
    categories,
    create,
    update,
    getCategories,
    deleteOne,
    deleteMany,
    getPOsPerDay,
    POsPerDay
  }
}
