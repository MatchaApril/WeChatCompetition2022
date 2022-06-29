// compontents/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // tabs为父组件传来的值
    tabs:{
      // 类型
      type:Array,
      // 默认值
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击事件
    handleItemTap(e){
      const {index}=e.currentTarget.dataset;
      this.triggerEvent("tabsItemChange",{index})
    }
  }
})
