<template>
  switch parent border: <el-switch v-model="parentBorder" /> switch child
  border: <el-switch v-model="childBorder" />
  <Dialog :visible="dialogVisible" @update:visible="dialogVisible = $event" @submit="createClient"></Dialog>
  <div class="pagination-control">
    <el-select v-model="loadCount" placeholder="每頁顯示" @change="handlePageSizeChange">
      <el-option v-for="item in pageSizes" :key="item" :label="`${item} 筆`" :value="item" />
    </el-select>
  </div>
  <div class="pagination-container">
    <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="loadCount" :total="totalCount"
      @current-change="handlePageChange" />
  </div>
  <el-table :data="memberData" :border="parentBorder" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <el-button type="primary" round>更新資料</el-button>
        <el-button type="danger" round @click="deleteClient(props.row.id)">刪除用戶</el-button>
        <div m="4">
          <!-- <p m="t-0 b-2">State: {{ props.row.state }}</p>
          <p m="t-0 b-2">City: {{ props.row.city }}</p>   
          <p m="t-0 b-2">Address: {{ props.row.address }}</p>
          <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
          <h3>Family</h3> -->
          <el-table :data="props.row.family" :border="childBorder">
            <el-table-column label="cost" prop="cost" />
            <el-table-column label="createdAt" prop="createdAt" />
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="id" prop="id" />
    <el-table-column label="number" prop="number" />
    <el-table-column label="name" prop="name" />
    <el-table-column label="phone" prop="phone" />
    <el-table-column label="email" prop="email" />
    <el-table-column label="gender" prop="gender" />
    <el-table-column label="birthday" prop="birthday" />
    <el-table-column label="idNo" prop="idNo" />
    <el-table-column label="canIntroduce" prop="canIntroduce" />
    <el-table-column label="isVip" prop="isVip" />
    <el-table-column label="totalCost" prop="totalCost" />
    <el-table-column label="headPic" prop="headPic" />
    <el-table-column label="comment" prop="comment" />
    <el-table-column label="delMk" prop="delMk" />
    <el-table-column label="createdAt" prop="createdAt" />
    <el-table-column label="updatedAt" prop="updatedAt" />
  </el-table>
  <div class="pagination-container">
    <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="loadCount" :total="totalCount"
      @current-change="handlePageChange" />
  </div>

</template>

<script setup>
import { ref } from 'vue'
import Swal from "sweetalert2";
import axios from 'axios';
import Swal from 'sweetalert2';
import Dialog from '@/components/Dialog.vue';
const clients_API = import.meta.env.VITE_API_URL_CLIENTS
const client_API = import.meta.env.VITE_API_URL_CLIENT
const parentBorder = ref(false)
const childBorder = ref(false)
const memberData = ref([])
const page = ref(1); //目前狀態頁數
const loadCount = ref(10); //單頁筆數
const totalCount = ref(0); //總共比數
const pageSizes = ref([10, 20, 50, 100]); //選單筆數
const dialogVisible = ref(false)



const loadMember = async () => {
  try {
    // 顯示加載提示
    Swal.fire({
      title: 'Loading...',
      text: '請稍候',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false, // 禁止外部點擊關閉
    });

    const response = await axios.get(`${clients_API}?page=${page.value}&count=${loadCount.value}`);
    totalCount.value = response.data.totalCount;

    for (let i = 0; i < response.data.rows.length; i++) {
      response.data.rows[i].createdAt = convertUTCDateToLocalDate(response.data.rows[i].createdAt);
      response.data.rows[i].updatedAt = convertUTCDateToLocalDate(response.data.rows[i].updatedAt);
    }

    memberData.value = response.data.rows;
    console.log(response.data.rows);

    // 關閉加載提示
    Swal.close();
  } catch (error) {
    console.error("Error Fetching : ", error);
    Swal.fire({
      icon: 'error',
      title: '加載失敗',
      text: '請重試。',
    });
  }
};
const deleteClient = async (id) => {
  try {
    const result = await Swal.fire({
      title: "確定要刪除嗎?",
      showDenyButton: true,
      confirmButtonText: "確定",
      denyButtonText: `取消`,
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Loading',
        text: '請稍候',
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // 執行刪除操作
      const response = await axios.delete(`${client_API}/${id}`);

      // 刪除成功，重新載入資料
      loadMember();

      // 關閉Loading
      Swal.close();

      // 成功提示
      await Swal.fire({
        icon: 'success',
        title: '刪除成功',
        text: '客戶已成功刪除！',
        timer: 1500,
        showConfirmButton: false
      });

    } else if (result.isDenied) {
      Swal.close();
    }
  } catch (error) {
    Swal.close();
    console.error("Error deleting client:", error);

    // 錯誤提示
    Swal.fire({
      icon: 'error',
      title: '刪除失敗',
      text: '刪除客戶時出現問題，請稍後再試。',
    });
  }
};
const createClient = async (formData) => {
  console.log('提交的資料:', formData); // 確認接收到的資料
  try {
    const birth = convertUTCDateToLocalDate(formData.birthday).replace(/\s+/g, '').slice(0, 10);
    formData.birthday = birth;
    formData.gender = parseInt(formData.gender);
    Swal.fire({
      title: 'Loading...',
      text: '請稍候',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false, // 禁止外部點擊關閉
    });

    const response = await axios({
      method: 'post',
      url: '',
      baseURL: client_API,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // 成功提交後顯示成功提示
    Swal.fire({
      icon: 'success',
      title: '新增成功',
      text: '用戶已新增',
    }).then(() => {
      // 在視窗關閉後執行 loadMember()
      loadMember();
    });


    // 清空表單數據
    formData.name = '';
    formData.phone = '';
    formData.email = '';
    formData.gender = '';
    formData.birthday = '';
    formData.idNo = '';

    // 可選：關閉對話框或其他後續處理
    // dialogVisible.value = false;

  } catch (error) {
    console.error('提交失敗:', error);

    // 顯示錯誤提示
    Swal.fire({
      icon: 'error',
      title: '提交失敗',
      text: '請檢查您的輸入並重試。',
    });
  }
}
const updateCLient = async () => {
}



const init = () => {
  loadMember();
}
init();
const handlePageChange = (newPage) => {
  page.value = newPage;
  loadMember();
};
const handlePageSizeChange = () => {
  page.value = 1; // 重置為第1頁
  loadMember();
};
function convertUTCDateToLocalDate(utcDateStr) {
  const date = new Date(utcDateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}
  -${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

// const get_Image_Upload_API = "https://metadata.moaifamily.io/client/1/image?fileName=test1/test2.json"
// const createdAt = ref()
// const updatedAt = ref()
// const getUploadUrl = async () => {
//   try {
//     const response = await axios.get(get_Image_Upload_API);
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error Fetching: ", error);
//   }
// }
// getUploadUrl();

// const tableData = [
//   {
//     date: '2016-05-03',
//     name: 'Tom',
//     state: 'California',
//     city: 'San Francisco',
//     address: '3650 21st St, San Francisco',
//     zip: 'CA 94114',
//     family: [
//       {
//         name: 'Jerry',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Spike',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Tyke',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//     ],
//   },
//   {
//     date: '2016-05-02',
//     name: 'Tom',
//     state: 'California',
//     city: 'San Francisco',
//     address: '3650 21st St, San Francisco',
//     zip: 'CA 94114',
//     family: [
//       {
//         name: 'Jerry',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Spike',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Tyke',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//     ],
//   },
//   {
//     date: '2016-05-04',
//     name: 'Tom',
//     state: 'California',
//     city: 'San Francisco',
//     address: '3650 21st St, San Francisco',
//     zip: 'CA 94114',
//     family: [
//       {
//         name: 'Jerry',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Spike',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Tyke',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//     ],
//   },
//   {
//     date: '2016-05-01',
//     name: 'Tom',
//     state: 'California',
//     city: 'San Francisco',
//     address: '3650 21st St, San Francisco',
//     zip: 'CA 94114',
//     family: [
//       {
//         name: 'Jerry',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Spike',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Tyke',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//     ],
//   },
//   {
//     date: '2016-05-08',
//     name: 'Tom',
//     state: 'California',
//     city: 'San Francisco',
//     address: '3650 21st St, San Francisco',
//     zip: 'CA 94114',
//     family: [
//       {
//         name: 'Jerry',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Spike',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Tyke',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//     ],
//   },
//   {
//     date: '2016-05-06',
//     name: 'Tom',
//     state: 'California',
//     city: 'San Francisco',
//     address: '3650 21st St, San Francisco',
//     zip: 'CA 94114',
//     family: [
//       {
//         name: 'Jerry',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Spike',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Tyke',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//     ],
//   },
//   {
//     date: '2016-05-07',
//     name: 'Tom',
//     state: 'California',
//     city: 'San Francisco',
//     address: '3650 21st St, San Francisco',
//     zip: 'CA 94114',
//     family: [
//       {
//         name: 'Jerry',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Spike',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//       {
//         name: 'Tyke',
//         state: 'California',
//         city: 'San Francisco',
//         address: '3650 21st St, San Francisco',
//         zip: 'CA 94114',
//       },
//     ],
//   },
// ]

</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.pagination-control {
  display: flex;
  justify-content: center;
  /* margin-bottom: 10px; */
  width: 100px;
}
</style>