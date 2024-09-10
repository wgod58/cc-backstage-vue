<template>
  switch parent border: <el-switch v-model="parentBorder" /> switch child
  border: <el-switch v-model="childBorder" />
  <Dialog ></Dialog>
  <!-- <Dialog :visible="dialogFormVisible" @submit="createClient" @close="dialogFormVisible = false"></Dialog> -->
  <el-table :data="memberData" :border="parentBorder" style="width: 100%" @expand-change="handleExpandChange">
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
</template>

<script setup>
import { ref } from 'vue'
import Swal from "sweetalert2";
import axios from 'axios';
import Dialog from '../components/Dialog.vue'
// const API_URL_CLIENT_DATA = 'https://metadata.moaifamily.io/clients?page=1&count=10'
const API_URL_CLIENT_DATA = 'https://metadata.moaifamily.io/clients?page=1&count=100'
const API_URL_CLIENT_COST = 'https://metadata.moaifamily.io/clients?page=1&count=10'
const parentBorder = ref(false)
const childBorder = ref(false)
const memberData = ref([])
const createdAt = ref()
const updatedAt = ref()
const handleExpandChange = (row, expandedRows) => {
  console.log("expand")
  console.log(row)
  console.log(expandedRows)
}
function convertUTCDateToLocalDate(utcDateStr) {
  const date = new Date(utcDateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}
  -${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

}
const loadMember = async () => {
  try {
    const response = await axios.get(API_URL_CLIENT_DATA)
    for (let i = 0; i < response.data.rows.length; i++) {
      response.data.rows[i].createdAt = convertUTCDateToLocalDate(response.data.rows[i].createdAt)
      response.data.rows[i].updatedAt = convertUTCDateToLocalDate(response.data.rows[i].updatedAt)
    }
    memberData.value = response.data.rows
    console.log(response.data.rows)
  } catch (error) {
    console.error("Error Fetching : ", error)
  }
}

const ClientCost = ref([])
const fetchingClientCosts = async () => {
  try {
    const response = await axios.get(API_URL_CLIENT_COST)
    ClientCost.value = response.data.rows;
    console.log(response.data.rows)
  } catch (error) {
    console.error("Error Fetching : ", error)
  }
}
loadMember();


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
      })
      const response = await axios.delete(`https://metadata.moaifamily.io/client/${id}`);
      console.log(response);
      loadMember();
      Swal.close();
    } else if (result.isDenied) {
      Swal.close();
    }
  } catch (error) {
    console.error("Error deleting client:", error);
  }
};

const createClient = async ()=>{
  console.log("createClient")
}


const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
]
</script>

<style scop></style>