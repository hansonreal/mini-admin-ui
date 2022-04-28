<template>
  <div class="page-content">
    <icon-selector @getIcon="getIcon"/>
  </div>
</template>

<script>
import IconSelector from '@/components/Icons/IconSelector'
export default {
  components: {
    IconSelector
  },
  methods: {
    getIcon(icon) {
      
    }
  }
};
</script>

