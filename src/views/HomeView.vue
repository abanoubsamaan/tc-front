<script setup>
import PurchaseOrderList from '@/components/PurchaseOrders/PurchaseOrderList.vue'
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
      <PurchaseOrderList />
      <div class="d-flex justify-content-start">
        <nav>
          <ul class="pagination">
            <li class="page-item disabled">
              <span class="page-link">Previous</span>
            </li>
            <li class="page-item"><a class="page-link text-dark" href="#">1</a></li>
            <li class="page-item active bg-dark" aria-current="page">
              <span class="page-link">2</span>
            </li>
            <li class="page-item"><a class="page-link text-dark" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link text-dark" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
