<template>
    <el-button class="dialog" type="info" plain @click="dialogFormVisible = true">
        新增用戶
    </el-button>
    <el-dialog v-model="dialogFormVisible" title="新增用戶" width="500">
        <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="電話" :label-width="formLabelWidth">
                <el-input v-model="form.phone" autocomplete="off" />
            </el-form-item>
            <el-form-item label="電子郵件" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off" />
            </el-form-item>
            <el-form-item label="身份證字號" :label-width="formLabelWidth">
                <el-input v-model="form.idNo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="性別" :label-width="formLabelWidth">
                <el-select v-model="form.gender" placeholder="Please select a zone">
                    <el-option label="男生" value="1" />
                    <el-option label="女生" value="0" />
                </el-select>
            </el-form-item>
            <el-form-item label="生日" :label-width="formLabelWidth">
                <el-date-picker v-model="form.birthday" type="date" placeholder="Pick a day" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="handleClick">
                    送出
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const props = defineProps(['visible', 'modelValue'])
const emit = defineEmits(['update:visible', 'update:modelValue', 'submit'])

const form = reactive({
    name: '',
    phone: '',
    email: '',
    gender: '',
    birthday: '',
    idNo: '',
})

const visible = computed({
    get() {
        return props.visible
    },
    set(value) {
        emit('update:visible', value)
    }
})

const closeDialog = () => {
    dialogFormVisible.value = false
}

const handleClick = () => {
    console.log(form)
    emit('submit', { ...form }) // 觸發提交事件
    closeDialog() // 提交後關閉對話框
    resetForm() // 可選：清空表單數據
}

const resetForm = () => {
    form.name = ''
    form.phone = ''
    form.email = ''
    form.gender = ''
    form.birthday = ''
    form.idNo = ''
}
</script>

<style scoped>
.dialog {
    color: black;
    margin-left: 10px;
}
</style>
