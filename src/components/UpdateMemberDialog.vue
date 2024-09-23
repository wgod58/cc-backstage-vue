<template>
    <el-button class="dialog" type="primary" plain @click="openDialog" round>
        更新資料
    </el-button>

    <el-dialog v-model="dialogFormVisible" append-to-body title="更新用戶資料" width="500" @close="closeDialog">
        <el-form :model="form">
            <el-form-item label="會員編號" :label-width="formLabelWidth">
                <el-input v-model="form.number" disabled autocomplete="off" />
            </el-form-item>
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
                <el-select v-model="form.gender" placeholder="請選擇性別">
                    <el-option label="男生" :value="true" />
                    <el-option label="女生" :value="false" />
                </el-select>
            </el-form-item>
            <el-form-item label="可否介紹" :label-width="formLabelWidth">
                <el-switch v-model="form.canIntroduce" />
            </el-form-item>
            <el-form-item label="是否為VIP" :label-width="formLabelWidth">
                <el-switch v-model="form.isVip" />
            </el-form-item>
            <el-form-item label="備註" :label-width="formLabelWidth">
                <el-input v-model="form.comment" type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="handleClick">送出</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';

const dialogFormVisible = ref(false);
const formLabelWidth = '140px';

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    memberId: Number,
    name: String,
    phone: String,
    email: String,
    gender: Boolean,
    idNo: String,
    canIntroduce: Boolean,
    isVip: Boolean,
    comment: String,
});

const emit = defineEmits(['update:visible', 'submit']);

const form = reactive({
    number: props.memberId,
    name: props.name,
    phone: props.phone,
    email: props.email,
    gender: props.gender,
    idNo: props.idNo,
    canIntroduce: props.canIntroduce,
    isVip: props.isVip,
    comment: props.comment,
});

// 用來打開對話框的函數，並重置表單
const openDialog = () => {
    dialogFormVisible.value = true;
    resetForm();
};

// 重置表單數據
const resetForm = () => {
    form.number = props.memberId;
    form.name = props.name;
    form.phone = props.phone;
    form.email = props.email;
    form.gender = props.gender;
    form.idNo = props.idNo;
    form.canIntroduce = props.canIntroduce;
    form.isVip = props.isVip;
    form.comment = props.comment;
};

// 監聽對話框可見性以重置表單
watch(dialogFormVisible, (newVal) => {
    if (newVal) {
        resetForm();
    }
});

const closeDialog = () => {
    dialogFormVisible.value = false;
};

const handleClick = () => {
    emit('submit', { ...form });
    closeDialog();
};

</script>

<style scoped>
.dialog {
    color: black;
    margin-left: 10px;
}
</style>
