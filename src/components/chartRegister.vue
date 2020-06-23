<template>
  <div class="chart">
    <ve-line :data="options" width="100%" height="100%" :legend-visible="false" :grid="grid"></ve-line>
  </div>
</template>
<script>
import VeLine from 'v-charts/lib/line'
import { GetAccountPeriod } from '@/api/statistics'
export default {
  components: {
    VeLine
  },
  data () {
    return {
      grid: {
        top: 20,
        left: 20,
        right: 10,
        bottom: 20
      },
      options: {
        columns: ['createdAt', 'count'],
        rows: []
      }
    }
  },
  created () {
    GetAccountPeriod()
      .then(data => {
        this.options.rows = data.reverse()
      })
  }
}
</script>
<style lang="less">
  .chart {
    width: 100%;
    height: 300px;
  }
</style>
