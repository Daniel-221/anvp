<!--  -->
<template>
  <div>
    <Chart :option="settingoption" style="height: 400px" />
  </div>
</template>
<script>
import Chart from "../../components/Chart";
// import random from "lodash/random";
import axios from "axios";
export default {
  components: {
    Chart,
  },
  data() {
    return {
      settingoption: {
      
      },
    };
  },
  mounted() {
    
  this.getChartData()
    // //3s随机改变一次option里的数据
    // this.interval = setInterval(() => {

    //   this.settingoption.series[0].data = this.settingoption.series[0].data.map(()=>Math.floor(500*Math.random()));}, 3000);
        
    // this.interval = setInterval(this.getChartData(), 3000);
  },
methods:{
  getChartData(){
    
    axios.get('/api/dashboard/chart',{params:{ID:12345}})
    .then(response=>{
    console.log("hello");  
    this.settingoption={
    title: {
          text: "第一个 ECharts 实例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data:response.data
          },
        ],
};
    })
  }},

  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
