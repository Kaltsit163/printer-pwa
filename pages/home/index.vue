<template>
  <section class="p-dingding">
    <section class="m-head"></section>
    <section class="m-tab">
      <span v-for="(item, index) in tab" :key="index" @click="jumpTo(item.link)"></span>
    </section>
    <section class="m-elite" @click="jumpTo(elite.link)"></section>
    <section class="m-right">
      <span v-for="(item, index) in right" :key="index" @click="jumpTo(item.link)"></span>
    </section>
    <section class="m-sku-list">
      <section v-for="(item, index) in sku" :key="index">
        <img v-lazy="item.img" @click="jumpTo(item.link)">
        <img v-if="item.btn.length > 0" v-lazy="item.btn" @click="jumpTo(item.btnLink)">
      </section>
    </section>
    <section class="m-foot"></section>
  </section>
</template>
<script>
export default {
  name: 'DingDing',
  data() {
    return {
      tab: [
        {
          link:
            'https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2017111409929370%26page%3Dpages%2Findex%2Findex%26query%3D_s%3Ddingnianhuilomo'
        },
        {
          link:
            'https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2017111409929370%26page%3Dpages%2Findex%2Findex%26query%3D_s%3Ddingnianhuitaili'
        },
        {
          link: 'https://j.in66.com/commonPromo/2404'
        },
        {
          link:
            'https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2017111409929370%26page%3Dpages%2Findex%2Findex%26query%3D_s%3Ddingnianhuishoujike'
        }
      ],
      elite: {
        link:
          'https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2017111409929370%26page%3Dpages%2Findex%2Findex%26query%3D_s%3Ddingnianhuilomo'
      },
      right: [
        {
          link:
            'https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2017111409929370%26page%3Dpages%2Findex%2Findex%26query%3D_s%3Ddingnianhuilomo'
        },
        {
          link: 'https://ding.fanqier.com/f/mgs7np'
        }
      ],
      sku: [
        {
          img:
            '//inimg05.jiuyan.info/in/2017/12/25/55A965C2-05FF-00A0-2B71-5A2CC9EC3A03.jpg',
          btn:
            '//inimg02.jiuyan.info/in/2017/12/25/66756063-4E70-5AE4-83E8-CADEACE4B76B.jpg',
          link:
            'https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2017111409929370%26page%3Dpages%2Findex%2Findex%26query%3D_s%3Ddingnianhuitaili',
          btnLink: 'https://ding.fanqier.com/f/mgs7np'
        },
        {
          img:
            '//inimg07.jiuyan.info/in/2017/12/27/2A0571E0-2BD3-6E3A-06B0-73F8B3BD44B6.jpg',
          btn:
            '//inimg01.jiuyan.info/in/2017/12/25/D187D513-6F2C-0D9E-3D96-28D3D29B9B0B.jpg',
          link: 'https://j.in66.com/commonPromo/2404',
          btnLink: 'https://ding.fanqier.com/f/mgs7np'
        },
        {
          img:
            '//inimg05.jiuyan.info/in/2017/12/25/DD4DFF4D-A3D6-956E-FD75-EA594F7CBCD1.jpg',
          btn: '',
          link:
            'https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2017111409929370%26page%3Dpages%2Findex%2Findex%26query%3D_s%3Ddingnianhuishoujike',
          btnLink: 'https://ding.fanqier.com/f/mgs7np'
        },
        {
          img:
            '//inimg01.jiuyan.info/in/2017/12/25/8D5331F7-90AC-E7EA-B43A-1FC622EE9436.jpg',
          btn:
            '//inimg05.jiuyan.info/in/2017/12/25/9A82CFB4-1773-1CFA-254F-8DEDB027930E.jpg',
          link:
            'https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2017111409929370%26page%3Dpages%2Findex%2Findex%26query%3D_s%3Ddingnianhuiweiyi',
          btnLink: 'https://ding.fanqier.com/f/mgs7np'
        },
        {
          img:
            '//inimg07.jiuyan.info/in/2017/12/25/53148C79-5833-CE15-2614-27ECCA31E6D2.jpg',
          btn:
            '//inimg02.jiuyan.info/in/2017/12/25/3EDEBC3A-24FF-9002-BC60-C21A459DE7A6.jpg',
          link:
            'https://ds.alipay.com/?from=mobilecodec&scheme=alipays%3A%2F%2Fplatformapi%2FstartApp%3FappId%3D2017111409929370%26page%3Dpages%2Findex%2Findex%26query%3D_s%3Ddingnianhuitxu',
          btnLink: 'https://ding.fanqier.com/f/mgs7np'
        }
      ]
    }
  },
  methods: {
    jumpTo(link) {
      if (link && link.length > 0) {
        window.location.href = link
      }
    }
  }
}
</script>
<style scoped lang="scss">
.p-dingding {
  background-color: #ff6052;
  font-size: 0;
  .m-head {
    display: inline-block;
    width: 100%;
    height: 458px;
    background-image: url('//inimg07.jiuyan.info/in/2017/12/25/8FF9FB79-142F-BD2E-080E-660602D55D56.jpg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .m-tab {
    display: flex;
    background-image: url('//inimg05.jiuyan.info/in/2017/12/25/BCB5C23A-FFC0-052D-328E-AC6F4726C1F5.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    height: 202px;
    > span {
      flex: 1;
    }
  }
  .m-elite {
    display: inline-block;
    width: 100%;
    height: 454px;
    background-image: url('//inimg05.jiuyan.info/in/2017/12/25/6E7E6E52-2B82-9446-832A-3EBCC10C8412.jpg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  .m-right {
    display: flex;
    background-image: url('//inimg07.jiuyan.info/in/2017/12/27/5FBB2182-F994-0058-F55F-ABA30B850DA6.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    height: 539px;
    > span {
      flex: 1;
    }
  }
  .m-foot {
    display: inline-block;
    background-image: url('//inimg02.jiuyan.info/in/2017/12/25/46FA8AC5-D46C-9857-7E88-1FABA787DC1F.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 244px;
  }
  img {
    width: 100%;
    height: auto;
  }
}
</style>
