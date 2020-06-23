<template>
  <div class="box" :class="`box-${type}`">
    <div class="box-label">
      <img :src="require(`../assets/img/dashboard/${icon}.png`)">
      <label v-html="title"></label>
    </div>
    <div class="box-cont">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Box',

  props: {
    type: {
      type: String,
      default: 'blue'
    },
    icon: {
      type: String,
      default: 'user'
    },
    title: String
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  background-color: #fff;
  border-radius: 4px;
  min-height: 120px;
  align-items: center;
  padding: 10px;
  margin-bottom: 20px;

  &-label {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    margin-left: 10px;

    img {
      display: block;
      width: 40px;
      margin-bottom: 10px;
    }

    label {
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
    }
  }

  &-cont {
    flex: 1;
    display: flex;
    flex-flow: column;
    align-items: center;

    strong {
      color: #fff;
      font-size: 18px;

      label {
        font-size: 14px;
      }

      span {
        font-size: 14px;
      }
    }

    span {
      color: #fff;
    }
  }

  &-blue {
    background-color: #43aeff;
  }
  &-red {
    background-color: #fa3a53;
  }
  &-green {
    background-color: #87c959;
  }
  &-blue-light {
    background-color: #a7b4e2;
  }
  &-purple {
    background-color: #d1a3d1;
  }
  &-green-dark {
    background-color: #1acd92;
  }

  @media (max-width: 768px) {
    padding: 0;

    &-label {

      img {
        width: 30px;
      }

      label {
        font-size: 12px;
      }
    }

    &-cont {
      strong {
        font-size: 16px;

        label,
        span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
