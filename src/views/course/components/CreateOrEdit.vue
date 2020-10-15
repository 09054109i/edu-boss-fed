<template>
    <div class="menu-create">
        <div style="margin-bottom: 20px;">{{ isEdit? '编辑课程' : '创建课程'}}</div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="名称:">
                    <el-input v-model="form.courseName" maxlength="10" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="讲师姓名:">
                    <el-input v-model="form.teacherDTO.teacherName"></el-input>
                </el-form-item>
                <el-form-item label="职位:">
                    <el-input v-model="form.teacherDTO.position"></el-input>
                </el-form-item>
                <el-form-item label="讲师简介:">
                    <el-input v-model="form.teacherDTO.description"></el-input>
                </el-form-item>
                <el-form-item label="课程概述:">
                    <el-input v-model="form.previewFirstField"></el-input>
                    <el-input v-model="form.previewSecondField"></el-input>
                </el-form-item>
                <el-form-item label="课程封面:">
                  <el-upload
                    action="/boss//course/upload"
                    list-type="picture-card"
                    :on-success="handleCourseImgUrlSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreview"
                    :limit="fileLimitedNumber"
                    :on-remove="()=>form.courseImgUrl=''"
                    :file-list="!form.courseImgUrl? []: [{url:form.courseImgUrl}]"
                    >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">建议尺寸：750*422px，JPG、PNG格式，图片小于150K</div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="form.courseImgUrl" alt="">
                  </el-dialog>
                </el-form-item>
                <el-form-item label="解锁封面:">
                    <el-upload
                    action="/boss//course/upload"
                    list-type="picture-card"
                    :on-success="handleCourseListImgUrlSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreview"
                    :limit="fileLimitedNumber"
                    :on-remove="()=>form.courseListImg=''"
                    :file-list="!form.courseListImg? []: [{url:form.courseListImg}]"
                    >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">建议尺寸：750*422px，JPG、PNG格式，图片小于150K</div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="form.courseListImg" alt="">
                  </el-dialog>
                </el-form-item>
                <el-form-item label="课程排序:">
                    <el-input-number v-model="form.sortNum" :min="1" label="描述文字"></el-input-number>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售信息</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="售卖价格:">
                    <el-input v-model="form.discounts"></el-input>
                </el-form-item>
                <el-form-item label="商品原价:">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="销量:">
                    <el-input v-model="form.sales"></el-input>
                </el-form-item>
                <el-form-item label="活动标签:">
                    <el-input v-model="form.discountsTag"></el-input>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>秒杀活动</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="限时秒杀:">
                  <el-switch
                    v-model="form.activityCourse"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
                <div v-show="form.activityCourse">
                  <el-form-item label="开始时间:">
                        <el-date-picker
                          v-model="form.activityCourseDTO.beginTime"
                          type="datetime"
                          placeholder="选择日期时间">
                        </el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间:">
                        <el-date-picker
                          v-model="form.activityCourseDTO.endTime"
                          type="datetime"
                          placeholder="选择日期时间">
                        </el-date-picker>
                  </el-form-item>
                  <el-form-item label="秒杀价:">
                      <el-input v-model="form.activityCourseDTO.amount"></el-input>
                  </el-form-item>
                  <el-form-item label="秒杀库存:">
                      <el-input v-model="form.activityCourseDTO.stock"></el-input>
                  </el-form-item>
                </div>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>课程详情</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="课程详情:">
                    <el-input v-model="form.courseDescriptionMarkDown"></el-input>
                </el-form-item>
            </el-form>
        </el-card>
        <el-button type="primary" @click="onSubmit">提交</el-button>

    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { createOrUpdateCourse } from '@/services/course'

export default Vue.extend({
  name: 'MenuCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        activityCourse: false,
        activityCourseDTO: {
          amount: '2',
          beginTime: '',
          endTime: '',
          stock: '22'
        },
        brief: '3333',
        courseDescriptionMarkDown: '<p>3333</p>↵',
        courseImgUrl: '',
        courseListImg: 'https://edu-lagou.oss-cn-beijing.aliyuncs.com/images/2020/10/15/16027406159256526.jpg',
        courseName: '3333',
        discounts: '3333',
        discountsTag: '3333',
        id: '',
        previewFirstField: '3333',
        previewSecondField: '',
        price: '3333',
        priceTag: '',
        sales: '0',
        sortNum: '1',
        status: '0',
        teacherDTO: {
          courseId: '',
          id: '',
          teacherHeadPicUrl: '',
          description: '3333',
          position: '3333',
          teacherName: '3333'
        }
      },
      dialogVisible: false,
      fileLimitedNumber: 1,
      parentMenuList: []
    }
  },
  created () {
    // this.loadMenuInfo()
  },
  methods: {
    async onSubmit () {
      const { data } = await createOrUpdateCourse(this.form)
      if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.push({
          name: 'course'
        })
      }
    },
    handlePictureCardPreview (file: any) {
      this.dialogVisible = true
    },
    handleCourseImgUrlSuccess (res: any, file: any) {
      console.log(file)
      this.form.courseImgUrl = file.response.data.name
    },
    handleCourseListImgUrlSuccess (res: any, file: any) {
      console.log(file)
      this.form.courseListImg = file.response.data.name
    },
    beforeAvatarUpload (file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 < 150

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 150KB!')
      }
      return isJPG && isLt2M
    },
    handleRemove (file: any, fileList: any) {
      console.log(file, fileList)
    }
  }
})
</script>
<style scoped lang = "scss">
.menu-create .box-card{
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
