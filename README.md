# printer

> in打印商城

## 构建命令

``` bash

npm install # install dependencies
npm run dev # serve with hot reload at localhost:8080
npm run build # build for production with minification
npm run build --report # build for production and view the bundle analyzer report
npm run unit # run unit tests
npm run e2e # run e2e tests
npm test # run all tests
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 统计参数
| 参数        | 描述          |
|:-------------:|:-------------:|
|确认订单||
| payment_address_change        | 修改地址         
| payment_address_add        | 添加地址    
| payment_recommend_showPreview        | 点击优惠搭配显示预览    
| payment_recommend_check        | 更改优惠搭配勾选状态    
| payment_confirmorder_${this.shelvesId}      | 确认订单按钮
| payment_confirmPay_${this.shelvesId}        | 确认支付按钮         
| payment_closePayChannel_${this.shelvesId}   | 关闭选择渠道弹窗按钮  
|支付成功||
| paysucc_illustrator_contact | 联系插画师按钮  
| paysucc_illustrator_close | 关闭联系插画师弹窗按钮  
| paysucc_goto_orderDetail | 查看详情按钮  
| paysucc_goto_illustHome | 返回首页按钮  
|插画师订单列表||
| illustOrder_orderSubmit_btnclick | 差价订单提交按钮（成功弹出确认窗） 
| illustOrder_orderSubmit_popok | 弹窗点击确认 
| illustOrder_orderSubmit_popcancel | 弹窗点击取消 
| illustOrder_delivery_btnclick | 发货按钮（成功弹出确认窗） 
| illustOrder_delivery_popok | 弹窗点击确认 
| illustOrder_delivery_popcancel | 弹窗点击取消 
|买家付尾款页面||
| buyerNotify_page_needpay | 渲染未支付页面
| buyerNotify_page_paysucc | 渲染支付成功页面
| buyerNotify_page_cancelpay | 取消支付
| buyerNotify_confirmorder_click | 页面底部确认支付按钮
| buyerNotify_confirmPay_click | 最终确认支付按钮
| buyerNotify_closePayChannel_click | 关闭选择渠道弹窗按钮
|帆布包编辑页面||
|canvasBag_operate_submit| 提交编辑结果
|canvasBag_choose_btn| 点击添加插画
|canvasBag_image_delete| 删除插画
|canvasBag_image_clear| 清空插画
|canvasBag_image_add| 添加一张插画
|插画师个人主页||
|illustHome_jumpdetail_${sku_id}| 点击跳转到详情页
|illustHome_follow_${illustrator_id}| 点击关注按钮
|illustHome_share_${this.illustrator_id}| 微信分享成功，in分享成功并返回in
|插画师分格详情页||
|illust_detail_download| in外点击确认订单下载
|照片书预览||
|photoBook_preview_addPage| 点击添加页
|photoBook_preview_sortBook| 点击排序
|photoBook_preview_gotoEditor| 点击去编辑页面
|photoBook_preview_goback| 点击标题栏后退
|photoBook_preview_finish| 点击标题栏完成
|photoBook_preview_showPopQuit| 显示是否后退弹窗
|photoBook_preview_quit| 放弃制作照片书 确认按钮
|photoBook_preview_cancelQuit| 放弃制作照片书 取消按钮
|photoBook_preview_gotoAddTitle| 弹窗去添加标题按钮
|photoBook_preview_showUpdateApp| 显示更新弹窗
|photoBook_preview_updateApp| 更新弹窗 升级按钮
|photoBook_preview_cancelUpdateApp| 更新弹窗 取消升级按钮
|照片书编辑||
|photoBook_editor_goback| 点击标题栏后退
|photoBook_editor_finish| 点击标题栏完成
|photoBook_editor_showWaring| 点击警告标志
|photoBook_editor_changeText| 修改文案
|photoBook_editor_finishInput| 输入完成
|photoBook_editor_changeImage| 修改图片
|photoBook_editor_showDeleteDialog| 显示删除弹窗
|photoBook_editor_deletePage| 删除弹窗 确认按钮
|photoBook_editor_cancelDeletePage| 删除弹窗 取消按钮
|photoBook_editor_slidePrev| 上一页
|photoBook_editor_slideNext| 下一页
|photoBook_editor_onSlideChangeEnd| 滑动操作
|photoBook_editor_selectPage| 选择某页
|插画师平台首页||
|illust_goto_illustHome | 从插画师平台首页跳转到插画师首页
|illust_choose_jumpdetailfromskulist | 从skulist(包含精选和优惠)跳转定制详情
|illust_choose_jumpdetailfromstylecube| 从stylecube(插画师风格方块)跳转定制详情
|illust_choose_jumpdetail| 从画师精选Tab跳转定制详情
|illust_choose_jumpdetailfrompromotion| 从限时优惠Tab跳转定制详情
|优惠券弹窗||
|illust_show_coupon| 无点击交互的优惠券展现埋点
|illust_close_coupon| 无点击交互的优惠券点击关闭按钮