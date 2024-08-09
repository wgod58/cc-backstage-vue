<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <table class="table">
              <thead>
                <tr>
                  <th>編碼</th>
                  <th>大頭貼</th>
                  <th>姓名</th>
                  <th>電話</th>
                  <th>身分證</th>
                  <th>註冊時間</th>
                  <th>星星(圖案)</th>
                </tr>
              </thead>
              <tbody class="member_list">
                <tr>
                  <th>1</th>
                  <td>Mark</td>
                  <td>0912345678</td>
                  <td>A123456789</td>
                  <td>2024-08-09</td>
                  <td>star</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Mark</td>
                  <td>0912345678</td>
                  <td>A123456789</td>
                  <td>2024-08-09</td>
                  <td>star</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Mark</td>
                  <td>0912345678</td>
                  <td>A123456789</td>
                  <td>2024-08-09</td>
                  <td>star</td>
                </tr>
              </tbody>
            </table>
  <!-- <RouterView /> -->
</template>

<style scoped>
.table {
  width: 50vw
}
.table *{
  border: 1px solid white;
}
.member_list {
  border: 1px solid white;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
