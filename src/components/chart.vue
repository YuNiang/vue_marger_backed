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

  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => ['createdAt', 'count']
    }
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
        columns: [],
        rows: []
      }
    }
  },

  created () {
    this.init()
  },

  watch: {
    data () {
      this.init()
    },
    columns () {
      this.init()
    }
  },

  methods: {
    init () {
      this.options.columns = this.columns
      this.options.rows = this.data
    }
  }
}
</script>
<style lang="less">
  .chart {
    width: 100%;
    height: 300px;
  }
</style>
