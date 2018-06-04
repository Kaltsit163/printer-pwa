<template>
  <section class="p-coupon-list"
           :class="{ 'css-bg-noMoreCoupon': realHasNo }">
    <div class="m-head-tip">
      <span>温馨提示: 每笔订单仅限使用一张打印劵</span>
      <!-- <span class="js-share-ct" @click="jumpToNextPage(sharePageUrl)"><i class="i-font icon-share-logo"></i>分享我的优惠券</span> -->
    </div>
    <div class="m-couponList-ct">
      <ul class="i-coupon-list" v-if="couponList.length > 0">
        <li class="i-coupon-item" v-for="(item, index) in couponList" :key="index" @click="jumpToNextPage(item)">
          <!-- 顶部颜色区域 -->
          <!-- 此处做兼容，为啥前面的前端使用status，但是后端文档上没有，后端使用expired，还在线上跑了大半年 -->
          <div class="i-area-up"
              :class="{'over-due': (item.status && item.status === 3) || item.expired}"
              :style="calStyle(item)">
            <!-- 金额减免券 -->
            <p class="coupon-val type-feeCut" v-if="item.cutType === 'feeCut'"><span>{{item.value}}</span>元</p>
            <!-- 数量减免券 -->
            <p class="coupon-val type-countCut" v-if="item.cutType === 'countCut'"><span>{{item.value}}</span>张</p>
            <!-- 优惠券名称 -->
            <span>{{item.name}}</span>
          </div>
          <div class="i-area-down">
            <!-- 中间波浪线 -->
            <div class="i-dot-line"></div>
            <!-- 底部小文字提示 -->
            <ul class="i-tips-list">
              <li v-for="(data, num) in item.desc" :key="num">{{data}}</li>
            </ul>
          </div>
        </li>
        <!--无限加载组件-->
        <ScrollLoad
            :loading-event="requestCouponList"
            :is-loading="requesting"
            :is-not-ending="!noMoreCoupon"></ScrollLoad>
      </ul>
      <div class="i-loading-tip" v-show="requesting">
        <span>加载中</span>
        <img src="https://res.jiuyan.info/201506171136/tugoweb/3.0/images/loading.gif">
      </div>
      <div class="i-no-coupon" v-if="realHasNo"></div>
    </div>
    <div class="m-bottom-exchange">
      <input v-model="couponCode" @focus="focusHandler()"  type="text" placeholder="请输入优惠码（可长按粘贴）" class="common js-ipt-submit">
      <span class="common js-btn-submit" 
            :class="{'active': couponCode && couponCode.length > 0}"
            @click="submitCode()">兑换</span>
    </div>
  </section>  
</template>

<script>

/**
  * Author: xiaolin@in66.com
  * Data: 2017.10.30
    在埋点迁移中，在提交优惠券代码之后的埋点
    case 1001: Tracker.add('printer*code*success')
    case 1002: Tracker.add('printer*code*checked')
    case 1003: Tracker.add('printer*code*expired')
    case 1004: Tracker.add('printer*code*wrong')
    Tracker.add('couponList*click*exchangeBtn') 兑换按钮有效点击
    Tracker.add('couponList*enter*input') 输入兑换优惠码
*/

import ScrollLoad from '@/components/ScrollLoad'
import Request from '@/utils/http.js'
import Tracker from '@/utils/tracker.js'
import env from '@/mixin/env.js'
import Util from '@/utils/util.js'

const ApiUrl = {
  'exchangeCoupon': '/coupon/exchange',
  'getCouponList': '/my/coupon'
}

const TrackerStr = {
  'clickSubmitCode': 'couponList*click*exchangeBtn',
  'focusEnterCode': 'couponList*enter*input'
}

export default {
  data () {
    return {
      isIn: Util.isInApp,
      realHasNo: false,
      couponCode: '',
      sharePageUrl: '',
      requesting: false,
      noMoreCoupon: false,
      submitting: false,
      couponList: [],
      currentPage: 1
    }
  },
  mixins: [env],
  components: {
    ScrollLoad
  },
  created () {
    this.requestCouponList()
  },
  methods: {
    focusHandler () {
      Tracker.add(TrackerStr.focusEnterCode)
    },
    trackCode (code) {
      switch (code) {
        case 1001:
          Tracker.add('printer*code*success')
          break
        case 1002:
          Tracker.add('printer*code*checked')
          break
        case 1003:
          Tracker.add('printer*code*expired')
          break
        case 1004: Tracker.add('printer*code*wrong')
          break
      }
    },
    isFromHomepage () {
      const tplReg = new RegExp(/\/new\/newHomepage.html/g)
      return tplReg.test(document.referrer)
    },
    requestCouponList () {
      if (this.requesting || this.noMoreCoupon) return
      this.requesting = true
      Request.get(ApiUrl.getCouponList, {
        params: {
          'page': this.currentPage++,
          't': new Date().getTime()
        }
      }).then((res) => {
        res = res.data
        this.requesting = false
        if (res.code === '401' && !this.isIn) {
          const homePage = `${location.origin}/new/newHomepage.html`
          const redirectUrl = this.isFromHomepage() ? homePage : location.href
          Util.loginHandler(Util.addSourceTracker(redirectUrl))
          return // 加return是因为，避免出现弹出请求错误的toast
        }
        if (res.succ) {
          if (res.data && res.data.length > 0) {
            this.noMoreCoupon = (res.data.length === 0)
            this.couponList = this.couponList.concat(res.data)
          } else {
            this.noMoreCoupon = true
            this.realHasNo = (res.data.length === 0 && this.couponList.length === 0)
          }
        } else {
          this.$toast(res.msg ? res.msg : '请求失败')
        }
      }).catch((error) => {
        this.requesting = false
        this.$toast('网络错误')
        console.log(error)
      })
    },
    submitCode () {
      if (this.checkSubmit()) {
        this.submitting = true
        const tplData = {
          'code': this.couponCode
        }
        Tracker.add(TrackerStr.clickSubmitCode)
        Request.post(ApiUrl.exchangeCoupon, tplData).then((res) => {
          this.submitting = false
          res = res.data
          if (res.succ) {
            this.$toast(res.msg ? res.msg : '您成功的兑取成功一张优惠券')
            this.trackCode(res.data.code)
            setTimeout(() => {
              location.reload()
            }, 1500)
          } else {
            this.$toast(res.msg ? res.msg : '请求失败')
          }
        }).catch(() => {
          this.submitting = false
          this.$toast('网络错误')
        })
      }
    },
    checkSubmit () {
      let tplResult = false
      if (this.submitting) {
        this.$toast('正在兑换中，请稍等片刻')
      } else {
        if (this.couponCode.length > 0) {
          tplResult = true
        } else if (this.couponCode.length === 0) {
          this.$toast('请输入您的优惠码')
        }
      }
      return tplResult
    },
    jumpToNextPage (data) {
      const url = data.url
      if (url && url.length > 0 && parseInt(data.status) !== 3 && !data.expired) {
        location.href = url
      }
    },
    calStyle (coupon) {
      let tplStyle = {}
      const tplStatus = parseInt(coupon.status)
      // 此处做兼容，为啥前面的前端使用status，但是后端文档上没有，后端使用expired，还在线上跑了大半年
      if (tplStatus === 3 || coupon.expired) {
        tplStyle = {
          'backgroundImage': "url('https://inimg01.jiuyan.info/in/2017/10/31/D899D1FA-587B-2D2E-1E7A-5C73063ECF62.png')",
          'backgroundColor': '#cccccc'
        }
      } else {
        if (coupon.bgImage && coupon.bgImage.length > 0) {
          tplStyle = {
            'backgroundImage': `url(${coupon.bgImage})`,
            'backgroundColor': 'transparent'
          }
        }
        if (coupon.bgColor && coupon.bgColor.length > 0) {
          tplStyle.backgroundColor = coupon.bgColor
        }
      }
      return tplStyle
    }
  }
}
</script>
<style lang="scss" scoped>
  .p-coupon-list {
    position: relative;
    min-height: 100vh;
    background-color: #f1f1f1;
  }

  .css-bg-noMoreCoupon {
    background-color: #ffffff;
  }

  .m-head-tip {
    text-align: center;
    color: #b2b2b2;
    font-size: 24px;
    padding: 20px 0;
    .js-share-ct {
      margin-left: 20px;
    }
  }

  .m-couponList-ct {
    padding-bottom: 120px;
    .i-coupon-list {
      text-align: center;
      margin-top: 40px;
      -webkit-overflow-scrolling: touch;
    }
    .i-coupon-item {
      display: inline-block;
      width: 640px;
      border-radius: 10px;
      background-color: #fff;
      color: #fff;
      margin-bottom: 40px;
      overflow: hidden;
      box-shadow: 2px 17px 30px 0 rgba(0, 0, 0, .19);
      .i-area-up {
        display: flex;
        padding: 40px 30px;
        font-size: 34px;
        justify-content: space-between;
        align-items: center;
        background: #62b6e8;
        background-position: 60% 50%;
        background-size: cover;
        background-repeat: no-repeat;
        &.over-due {
          background-size: contain;
        }
        .coupon-val {
          font-size: 26px;
          span {
            font-size: 56px;
            margin-right: 10px;
          }
        }
      }
      .i-area-down {
        padding: 30px 60px;
        position: relative;
        .i-dot-line {
          position: absolute; 
          left: 0;
          top: -9px;
          width: 100%;
          height: 10px;
          background-color: transparent;
          border: none;
          background-position: 0% 50%;
          background-image: url('https://inimg01.jiuyan.info/in/2017/10/31/337DC4FD-DA72-A12F-896D-5EC0F6D6FC84.png');
          background-repeat: repeat-x;
        }
        .i-tips-list {
          text-align: left;
          font-size: 20px;
          color: #ccc;
          li {
             list-style-type: disc;
          }
        }
      }
    }
  }

  .i-loading-tip {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    span {
      margin-right: 10px;
    }
  }

  .i-no-coupon {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    background-image: url('https://inimg07.jiuyan.info/in/2017/10/31/FAAF9CA8-6EEE-CDE8-8687-6DA54CE53A3E.png');
    display: inline-block;
    width: 260px;
    height: 190px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .m-bottom-exchange {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    width: 750px;
    padding: 20px 0;
    left: 0;
    bottom: 0;
    z-index: 9;
    background-color: #ececec;
    .common {
      display: inline-block;
      height: 80px;
      line-height: 80px;
      border-radius: 6px;
    }
    .js-ipt-submit {
      width: 530px;
      font-size: 24px;
      background-color: #fff;
      padding: 0 20px;
      border: 1px solid #ddd; /* no */
    }
    .js-btn-submit {
      transition: all 0.3s;
      width: 120px;
      font-size: 28px;
      text-align: center;
      color: #fff;
      background-color: #B0B0B0;
      &.active{
        background-color: #ff4545;
      }
    }
  }
</style>
