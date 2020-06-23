<template>
  <div class="dashboard">
    Dashboard
  </div>
</template>
<script>

  export default {
    name: 'dashboard',

    components: {},

    data() {
      return {}
    },

    created() {
    },

    computed: {},

    methods: {},

    filters: {}
  }
</script>

<style lang="less">
  @import "../../../assets/less/reset.less";

  .dashboard {
    &-panel {
      border-radius: 4px;

      &-title {
        display: flex;
        align-items: center;
        padding: 10px;
        min-height: 28px;

        h3 {
          font-size: 14px;
          margin: 0;
          flex: 1;
        }
      }
    }

    &-balance {
      margin-bottom: 20px;
      width: 100%;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      padding-top: 1em;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

      p {
        font-size: 18px;
        color: #409EFF;
      }
    }
  }
</style>
