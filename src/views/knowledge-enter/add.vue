<template>
    <div class="add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="知识点编码" prop="knowledge_code">
            <el-input v-model="ruleForm.knowledge_code"></el-input>
        </el-form-item>
        <el-form-item label="知识点1" prop="p1">
            <el-input v-model="ruleForm.p1"></el-input>
        </el-form-item>
        <el-form-item label="知识点2" prop="p2">
            <el-input v-model="ruleForm.p2"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{code?'提交编辑':'添加'}}</el-button>
            <el-button  @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { add, update_knowledge } from '@/api/knowledge_enter'
import { isNUm_letter } from '@/utils/validate'
export default{
    data(){
        const validate_isNUm_letter = (rule, value, callback) => {
        if (!isNUm_letter(value)) {
            callback(new Error('编码由数字和字母组成~'))
        } else {
            callback()
        }
        }
        return {
            ruleForm: {
                knowledge_code: '',
                p1: '',
                p2: '',
            },
            rules: {
                knowledge_code: [
                    { required: true, message: '请输入知识点编码', trigger: 'blur' },
                    { min: 3,  message: '长度大于3个字符', trigger: 'blur' },
                    {trigger: 'blur', validator: validate_isNUm_letter}
                ],
                p1: [
                    { required: true, message: '请输入知识点1', trigger: 'blur' },
                ],
                p2: [
                    { required: true, message: '请输入知识点2', trigger: 'blur' },
                ],
            }
        }
    },
    created(){
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const { ruleForm } = this
                    if(this.$route.query.code){
                        this.update_methods()
                    } else {
                        this.add_methods()
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        add_methods(){
            add({...this.ruleForm}).then(res=>{
                if(res.status == 1){
                    this.$router.push({
                        path:'/knowledge/know_ledge_list'
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="scss" scoped>
.add{
    max-width: 500px;
    margin-left: 150px;
    margin-top: 40px;
}
</style>