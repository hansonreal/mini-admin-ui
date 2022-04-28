<template>
  <div class="line-chart chart">
    <div class="head">
      <p class="line-title">
        <i class="iconfont" style="color: #7E3AD5; background: rgba(249, 240, 255, 1)">&#xe817;</i>
        <span>{{$t('console.lingChart.title')}}</span>
      </p>
    </div>
    
    <div id="chart"></div>
  </div>
</template>

<script>
  export default {
    props: {
      grid: {
        type: Object,
        default: () => {
          return {
            top: '8%',
            left: '0',
            right: '0',
            bottom: '22%',
            containLabel: true 
          }
        }
      }
    },
    data() {
      return {
        chart: '',
        data: {},
      }
    },
    mounted() {
      this.getData()
      this.windowsResize()
    },
    beforeDestroy() {
      this.removeWindowsResize()
    },
    methods: {
      getData() {
        this.data.xData = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

        this.data.data = [
          [393, 530, 923, 723, 792, 593, 492],
          [93, 230, 623, 423, 492, 293, 216]
        ]

        this.drawLine()
      },
      // 绘图
      drawLine() {
        let chart = this.$echarts.init(document.getElementById("chart"))
        this.chart = chart
        let _this = this

        chart.setOption({
          color: ['#308FF0', '#74D488'],
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return `浏览量：${params[0].value}<br/> 访问数：${params[1].value}`
            }
          },
          grid: this.grid,
          xAxis: {
            data: this.data.xData,
            show: true,
            position: 'bottom',
            offset: 8,
            type: 'category',
            nameGap: 15,
            nameRotate: 0,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#999',
                width: 1,
                type: 'solid'
              }
            },
            axisTick:{
              show: false
            }
          },
          yAxis: {
            show: true,
            position: 'left',
            offset: -20,
            type: 'value',
            nameLocation: 'end',
            nameTextStyle: {
              color: '#fff',
              padding: [5, 0, 0, 5]
            },
            nameRotate: 270,
            splitLine: {
              show: false, 
              lineStyle: {
                color: '#eee',
                width: 1,
                type: 'solid'
              }
            }
          },
          series: [
            this.seriesItem(
              _this.$echarts, 
              this.data.data[0], 
              ['#308FF0', '#308FF0'], 
              ['rgba(45, 140, 240, 0.3)', 'rgba(45, 140, 240, 0)']
            ),
            this.seriesItem(
              _this.$echarts, 
              this.data.data[1], 
              ['#74D488', '#74D488'], 
              ['rgba(119, 213, 138, 0.3)', 'rgba(119, 213, 138, 0)']
            ),
          ]
        })
      },
      windowsResize() {
        window.addEventListener('resize', () => {
          this.chart.resize()
        })
      },
      removeWindowsResize() {
        window.removeEventListener('resize', this.windowsResize)
        this.chart.dispose()
      },
      seriesItem(charts, data, lineColor, linearColor) {
        return {
          type: "line",
          smooth: true,
          symbol: 'circle',
          symbolSize: 2,
          itemStyle: {
            normal: {
              lineStyle: {  //线条渐变色
                width: 2,
                type: "solid",
                color: new charts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: lineColor[0]
                  },
                  {
                    offset: 1,
                    color: lineColor[1]
                  }
                ]) 
              }
            },
            emphasis: {
              color: "#308FF0",
              lineStyle: {
                width: 2,
                type: "solid"
              }
            }
          }, 
          areaStyle: {
            normal: {
              color: new charts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: linearColor[0]
                },
                {
                  offset: 1,
                  color: linearColor[1]
                }
              ])
            }
          },
          data
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .line-chart {
    width: 40%;
    height: 100%;
    background: #101638;
    position: relative;

    #chart {
      width: 100%;
      height: 100%;
    }
  }

  @media only screen and (max-width: $device-ipad) { 
    .line-chart {
      width: 100%;
      margin-top: 15px;
    }
  }
</style>
