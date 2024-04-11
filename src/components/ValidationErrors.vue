<script setup>
defineProps({ errors: Object })
</script>

<template>
  <div class="alert alert-warning mt-4" role="alert">
    <ul class="m-0">
      <li v-for="(error, index) in errors" :key="index">{{ error[0] }}</li>
    </ul>
  </div>
</template>
