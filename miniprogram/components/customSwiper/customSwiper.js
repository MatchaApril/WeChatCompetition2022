// components/theSwiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange(e) {
      this.setData({
        currentIndex: e.detail.current
      });
    }
  }
});
/*

<view class="dots-box own-class">
  <view class="dots {{currentIndex == index ? 'bg-333' : ''}}" wx: for="{{ imgUrls }}" wx:key="{{ index }}"></view>
</view >
*/