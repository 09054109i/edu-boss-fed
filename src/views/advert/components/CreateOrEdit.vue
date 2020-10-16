<template>
    <div class="menu-create">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{ isEdit? '编辑菜单' : '创建菜单'}}</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="广告名称:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="广告位置:">
                    <el-select v-model="form.spaceId" placeholder="请选择广告位置">
                        <el-option
                            :key="item.id"
                            :label="item.name"
                            v-for="item in advertSpace"
                            :value="item.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间:">
                    <el-date-picker
                      v-model="form.startTime"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="到期时间:">
                    <el-date-picker
                      v-model="form.endTime"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
               <el-form-item label="上线/下线:">
                  <el-radio v-model="form.status" :label="0">下线</el-radio>
                  <el-radio v-model="form.status" :label="1">上线</el-radio>
                </el-form-item>
                <el-form-item label="广告图片:">
                  <el-upload
                    action="/boss//course/upload"
                    list-type="picture-card"
                    :on-success="handleCourseImgUrlSuccess"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreview"
                    :limit="fileLimitedNumber"
                    :on-remove="()=>form.img=''"
                    :file-list="!form.img? []: [{url:form.img}]"
                    >
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">建议尺寸：750*422px，JPG、PNG格式，图片小于150K</div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="form.courseListImg" alt="">
                  </el-dialog>
                </el-form-item>
                <el-form-item label="广告链接:">
                    <el-input v-model="form.link"></el-input>
                </el-form-item>
                <el-form-item label="广告备注:">
                    <el-input type="textarea" v-model="form.text"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { createOrUpdateAdvert } from '@/services/advert'
import { getAllAdvertSpaces } from '@/services/advert-space'

export default Vue.extend({
  name: 'AdvertSpaceCreateOrEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        endTime: '2020-10-27T16:00:00.000Z',
        img: 'https://edu-lagou.oss-cn-beijing.aliyuncs.com/images/2020/10/16/16028254457007039.jpg',
        link: '广告链接',
        name: '广告名称',
        sort: 0,
        spaceId: 162,
        startTime: '2020-10-26T16:00:00.000Z',
        status: 0,
        text: '广告备注：'
      },
      advertSpace: [],
      pageNum: 1,
      pageSize: 5,
      dialogVisible: false,
      fileLimitedNumber: 1
    }
  },
  created () {
    this.loadAdvertSpaces()
  },
  methods: {
    async onSubmit () {
      const { data } = await createOrUpdateAdvert(this.form)
      if (data.state === 1) {
        this.$message.success('提交成功')
        this.$router.push({
          name: 'advert'
        })
      }
    },
    async loadAdvertSpaces () {
      const { data } = await getAllAdvertSpaces(this.pageNum, this.pageSize)
      if (data.state === 1) {
        this.advertSpace = data.content
      }
    },
    handlePictureCardPreview (file: any) {
      this.dialogVisible = true
    },
    handleCourseImgUrlSuccess (res: any, file: any) {
      console.log(file)
      this.form.img = file.response.data.name
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
</style>
