<template>
  <div class="his chart">
    <div class="head">
      <p class="line-title">
        <i class="iconfont" style="color: #1890FF; background-color: rgb(230, 247, 255)">&#xe75e;</i>
        <span>{{$t('console.histogram.title')}}</span>
      </p>
    </div>
    
    <div class="histogram">
      <ve-histogram :data="chartData" :extend="chartExtend"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Histogram",
  data() {
    this.chartExtend = {
      legend: {
        show: false
      },
      color: [
        new echarts.graphic.LinearGradient( 0,1,0,0,[
          {offset: 0, color: 'rgba(45, 140, 240, 0.8)'},
          {offset: 1, color: 'rgba(66, 197, 246, 0.7)'}
        ])
      ],
      series: {
        barMaxWidth: 35,
        barCategoryGap: '50%',
        itemStyle: { 
          barBorderRadius: [2, 2, 0 ,0],
        }
      },
      xAxis: {
        show: true,
        position: 'bottom',
        offset: 8,
        type: 'category', 
        axisLabel: {
          show: true,
          textStyle: {
            color: "#666",
          }
        }
      },
      yAxis: {
        show: true, 
        position: 'left',
        offset: 0,
        type: 'value',
        splitLine: {
          show: false,
          lineStyle: {
            color: '#666',
            width: 1,
            type: 'dashed'
          }
        }
      },
    }
    return {
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { '日期': '1月', '访问用户': 1391},
          { '日期': '2月', '访问用户': 2530},
          { '日期': '3月', '访问用户': 2023},
          { '日期': '4月', '访问用户': 1723},
          { '日期': '5月', '访问用户': 1492},
          { '日期': '6月', '访问用户': 1893},
          { '日期': '7月', '访问用户': 2393},
          { '日期': '8月', '访问用户': 3030},
          { '日期': '9月', '访问用户': 2023},
          { '日期': '10月', '访问用户': 2723},
          { '日期': '11月', '访问用户': 2023},
          { '日期': '12月', '访问用户': 1423},
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
  .his {
    width: 55%;
    margin-right: 20px;
    position: relative;

    .histogram {
      width: calc(100% - 30px);
      position: absolute;
      bottom: -40px;
      left: 0;
      right: 0;
      margin: auto;
    }
  }
  
  @media only screen and (max-width: $device-ipad) { 
    .his {
      width: 100%;
      margin-right: 0px !important;

      .histogram {
        width: 100%;
      }
    }
  }
</style>