<!--  -->
<template>
  <div ref="chartDom" style="height: 400px"></div>
</template>
<script>
import echarts from 'echarts';
import debounce from 'lodash/debounce'
import {addListener,removeListener}from "resize-detector";
export default{
    props:{
        option:{
            type:Object,
            default:()=>{}
        }
    },
//监听option变化，更新chart
    watch:{
        option:{
            handler(val){
                this.chart.setOption(val);
            },
            deep:true}
    },
    create(){
        this.resize=debounce(this.resize,300);
    },
    mounted(){
        this.renderChart();
        // 基于准备好的dom，初始化echarts实例

        addListener(this.$refs.chartDom,this.resize)


    },

    beforeDestroy(){
        //当组件销毁的时候要把组件的事件监听移除掉
        removeListener(this.$refs.chartDom,this.resize);
        //同时组件销毁的时候把chart实例销毁掉，防止内存泄漏
        this.chart.dispose();
        this.chart=null;
        },
    methods:{
        resize(){
            this.chart.resize();
        },
        renderChart(){
           this.chart = echarts.init(this.$refs.chartDom);

         this.chart.setOption(this.option);
        }

    }
}
</script>
