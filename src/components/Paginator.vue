<script setup>
defineProps({
  links: Object,
  meta: Object
})
</script>
<template>
  <div class="d-flex justify-content-start">
    <nav>
      <ul class="pagination">
        <li class="page-item disabled">
          <span class="page-link">Previous</span>
        </li>

        <li class="page-item" v-for="link in meta.links" :key="link.label">
          <a class="page-link text-dark" href="#">{{ link.label }}</a>
        </li>
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
</template>
