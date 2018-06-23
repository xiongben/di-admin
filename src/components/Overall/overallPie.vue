<template>
  <div :class="className" :style="{height:height,width:width}">
      
  </div>
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { getOverallPie } from "@/api/getForm";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "400px"
    }
  },
  data() {
    return {
      chart: null,
      typeArr:null,
      dataArr:null,
    };
  },
  mounted() {
    this.getData();
    
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHanlder);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    getData() {
      getOverallPie().then(res => {
          let resArr = res.data[0].data;
          let dataArr = [];
          let typeArr = [];
          for(let i = 0;i < resArr.length;i++){
              let typeKey = resArr[i][0];
              let typeVal = resArr[i][1];
              let typeObj = {};
              typeObj.value = typeVal;
              typeObj.name = typeKey;
              dataArr.push(typeObj);
              typeArr.push(typeKey);
          }
          this.dataArr=dataArr;
          this.typeArr=typeArr;
          this.initChart();
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: this.typeArr
        },
        calculable: true,
        series: [
          {
            name: "user",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: this.dataArr,
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      });
    }
  }
};
</script>
