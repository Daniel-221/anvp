<template>
  <div>
   

    <a-drawer
    class="drawer"
      title="Basic Drawer"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
     <template v-slot:handle>
        <div class="handle" @click="visible=!visible">
            <a-icon :type="visible?'close':'setting'"></a-icon>

        </div>
    </template>
     <div>
  <div>
    <h2>整体风格定制</h2>
    <a-radio-group 
    :value="$route.query.navTheme||'dark'"
     @change="e=>handleSettingChange('navTheme',e.target.value)">
      <a-radio value="dark">
        黑色
      </a-radio>
      <a-radio value="light">
        白色
      </a-radio>
    </a-radio-group>
     
    <h2>导航模式</h2>
    <a-radio-group 
    :value="$route.query.navLayout||'left'"

     @change="e=>handleSettingChange('navLayout',e.target.value)">
      <a-radio value="left">
        左侧
      </a-radio>
      <a-radio value="right">
        顶部
      </a-radio>
    </a-radio-group>
  </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
       value: 1,    
  }
  },
  
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
     onChange(e) {
      console.log('radio checked', e.target.value);
    },
    handleSettingChange(type,value){
      this.$router.push(
        {//保留route上原有的query
          query:{...this.$route.query,[type]:value}
        }
      )

    }
  },
};
</script>



<style scoped>
    .handle{
    height: 64px;
    width: 64px;
    background: #1890ff;
    position: absolute;
    right: 256px;
    top: 204px;
    line-height: 67px;
    text-align: center;
    color: white;
    font-size: 24px;
    border-radius: 6px 0 0 6px;
    }
   
   
</style>