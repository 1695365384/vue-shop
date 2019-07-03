<template>
  <div>
    <v-chart :options="polar" />
    <v-chart :options="options2" />
  </div>
</template>
<style lang="less" scoped>
.echarts {
  float: left;
}
</style>

<script>
export default {
  name: 'reports',
  data() {
    return {
      polar: {},
      options2: {}
    }
  },

  methods: {},

  mounted() {
    ;(this.polar = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }),
      (this.options2 = {
        angleAxis: {},
        radiusAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四'],
          z: 10
        },
        polar: {},
        series: [
          {
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: 'A',
            stack: 'a'
          },
          {
            type: 'bar',
            data: [2, 4, 6, 8],
            coordinateSystem: 'polar',
            name: 'B',
            stack: 'a'
          },
          {
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: 'C',
            stack: 'a'
          }
        ],
        legend: {
          show: true,
          data: ['A', 'B', 'C']
        }
      })
  }
}
</script>