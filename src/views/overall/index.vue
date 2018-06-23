<template>
  <div class='chart-container'>
    <OverallForm height='100%'></OverallForm>
    <p class="title">user base come from</p>
    <PieChart></PieChart>
  </div>
</template>

<script>
import OverallForm from '@/components/Overall/overallForm'
import PieChart from '@/components/Overall/overallPie'

export default {
  name: 'xbChart',
  components: { OverallForm , PieChart}
}
</script>

<style scoped>
.chart-container{
  position: relative;
  padding: 20px;
  width: 100%;
  height:85vh;
}
.title{
  height:50px;
  margin-top:50px;
}
</style>