<template>
    <div class="add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="习题编码" prop="item_code">
            <el-input :disabled="code?true:false" v-model="ruleForm.item_code"></el-input>
        </el-form-item>
        <el-form-item label="习题名称" prop="item_name">
            <el-input v-model="ruleForm.item_name"></el-input>
        </el-form-item>
        <el-form-item label="习题难度" prop="star">
            <el-input v-model="ruleForm.star"></el-input>
        </el-form-item>
        <el-form-item label="习题知识点" prop="knowledge">
            <el-input v-model="ruleForm.knowledge"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{code?'提交编辑':'添加'}}</el-button>
            <el-button v-if="!code" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { add, get_item, update_item } from '@/api/course_enter'
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
            code:this.$route.query.code,
            ruleForm: {
                item_code: '',
                item_name: '',
                star: '',
                knowledge: '',
            },
            rules: {
                item_code: [
                    { required: true, message: '请输入习题编码', trigger: 'blur' },
                    { min: 3,  message: '长度大于3个字符', trigger: 'blur' },
                    {trigger: 'blur', validator: validate_isNUm_letter}
                ],
                item_name: [
                    { required: true, message: '请输入习题名称', trigger: 'blur' },
                ],
                star: [
                    { required: true, message: '请输入习题难度', trigger: 'blur' },
                ],
                knowledge: [
                    { required: true, message: '请输入习题知识点', trigger: 'blur' },
                ],
            }
        }
    },
    created(){
        if(this.$route.query.code) this.get_item()
    },
    methods:{
        get_item(){
            let item_code = this.$route.query.code||''
            get_item(item_code).then(res=>{
                this.ruleForm.item_code = res.data.item_code
                this.ruleForm.item_name = res.data.item_name
                this.ruleForm.star = res.data.star
                this.ruleForm.knowledge = res.data.knowledge
            })
        },
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
                        path:'/course/question_list'
                    })
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        update_methods(){
            update_item({...this.ruleForm}).then(res=>{
                if(res.status == 1){
                    this.$router.push({
                        path:'/course/question_list'
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