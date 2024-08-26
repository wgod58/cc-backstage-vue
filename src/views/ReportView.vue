<template>
        <div class="demo-date-picker">
          <div class="block">
            <span class="demonstration">set prefix-icon</span>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="Pick a day"
              :prefix-icon="customPrefix"
            />
            <div class="btn-search"><el-button type="primary">查詢</el-button></div>
          </div>
        </div>
        <div class = "day-cost">
                當日營業額：<p>100,000,000</p>
        </div>
      </template>
      
      <script lang="ts" setup>
      import { h, ref, shallowRef } from 'vue'
      
      const value1 = ref('')
      
      const customPrefix = shallowRef({
        render() {
          return h('p', 'pre')
        },
      })
      </script>
      <style scoped>
      .btn-search{
        margin-top: 10px;
      }
      .day-cost{
        font-size: 50px;
        text-align: center;
      }
      .demo-date-picker {
        display: flex;
        width: 100%;
        padding: 0;
        flex-wrap: wrap;
      }
      .demo-date-picker .block {
        padding: 30px 0;
        text-align: center;
        border-right: solid 1px var(--el-border-color);
        flex: 1;
      }
      .demo-date-picker .block:last-child {
        border-right: none;
      }
      .demo-date-picker .demonstration {
        display: block;
        color: var(--el-text-color-secondary);
        font-size: 14px;
        margin-bottom: 20px;
      }
      </style>
      