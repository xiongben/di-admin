<template>
  <div class='chart-container'>
    <h4>生命不息，折腾不止</h4>
    <chart height='100%' width='100%'></chart>
  </div>
</template>

<script>
import Chart from '@/components/Charts/xbtest'

export default {
  name: 'xbChart',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  padding: 20px;
  width: 100%;
  height:85vh;
}
</style>

