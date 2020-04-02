<template>
<div class="home">
    <h1>这是录题页面~</h1>
</div>
</template>
<script>
import { get_question_list } from '@/api/course_enter'
export default {
    data(){
        return {

        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            console.log(999)
            get_question_list({ page_index:1,page_size:10 }).then(res => {
                
            }).catch(error => {
                
            })
        }
    }
}
</script>
<style lang="scss">
.home{
    text-align: center;
    color: #304156;
    h1{
        margin-top: 200px;
        font-size: 40px;
    }
}
</style>