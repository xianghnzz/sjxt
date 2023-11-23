import{r as e,t,aa as o,o as r,c as a,w as l,u as s,d,e as n,a as i,b as c,l as _,m as u,F as f,p,s as g,h as m,i as y,g as h,j as x,_ as b,v as k,ab as j,G as w,H as v}from"./index-855f89f9.js";import{_ as I}from"./no-data.bcb4c8a9.js";import{a as C,o as N,r as O}from"./uni-app.es.8f4863ce.js";import{_ as q}from"./back_bai.3f7a0c49.js";import{_ as S}from"./_plugin-vue_export-helper.1b428a4d.js";const T=S({__name:"order",setup(S){const T=e({triggered:!1,queryInfo:{order_custom_id:"",pageNum:1,pageSize:10},list:[],current_page:1,last_page:1}),{triggered:E,queryInfo:F,list:J}=t(T),P=o((()=>g.state.userInfo)),B=()=>{T.triggered=!0,T.list=[],T.current_page=1,T.last_page=1,T.queryInfo.pageNum=1,R()},D=()=>{if(T.current_page>=T.last_page)return d.showToast("没有更多数据了"),!1;R()},R=()=>{n.getMyOrderList(T.queryInfo).then((e=>{console.log("res",e),e.data.data.forEach((e=>{e.order_info_list=JSON.parse(e.order_info||"[]"),e.order_material_info_obj=JSON.parse(e.order_material_info||"{}"),e.order_commodity_info_obj=JSON.parse(e.order_commodity_info||"{}"),e.order_spec_info_obj=JSON.parse(e.order_spec_info||"{}"),e.order_product_info_obj=JSON.parse(e.order_product_info||"{}")})),T.queryInfo.pageNum=T.queryInfo.pageNum+1,T.list=[...T.list,...e.data.data],T.current_page=e.data.current_page,T.last_page=e.data.last_page,console.log("data.list",T.list),T.triggered=!1}),(()=>{T.triggered=!1}))};return C((()=>{})),N((()=>{T.queryInfo.order_custom_id=P.value.custom_id,R()})),(e,t)=>{const o=m,C=y,N=h,S=O(x("no-data"),I),F=O(x("page"),b);return r(),a(F,{bgColor:"#F7F8F9",topColor:"#00AEEF",topHeight:88,refresherEnabled:!0,triggered:s(E),refresherrefresh:B,scrolltolower:D},{navBar:l((()=>[i(N,{class:"text-center flex align-center justify-center",style:{height:"88rpx"}},{default:l((()=>[i(o,{class:"font-36 text-white"},{default:l((()=>[c("我的订单")])),_:1}),i(N,{onClick:t[0]||(t[0]=e=>s(d).goBack()),class:"position-absolute rounded-circle flex align-center justify-center",style:{width:"40rpx",height:"32rpx",left:"32rpx"}},{default:l((()=>[i(C,{style:{width:"40rpx",height:"32rpx"},src:q,mode:""})])),_:1})])),_:1})])),content:l((()=>[i(N,{class:"p-3"},{default:l((()=>[(r(!0),_(f,null,u(s(J),((e,t)=>(r(),a(N,{key:t,class:"rounded-10 overflow-hidden bg-white mb-2"},{default:l((()=>[i(N,{class:"order-linear-gradient flex align-center px-2 font-32 text-primary font-weight-bold",style:{height:"80rpx"}},{default:l((()=>[i(o,null,{default:l((()=>[c("ID:")])),_:1}),i(o,null,{default:l((()=>[c(k(e.order_id),1)])),_:2},1024)])),_:2},1024),i(N,{class:"py-2 px-2"},{default:l((()=>[i(N,{class:"rounded-10 px-2 py-2",style:{"background-color":"#eefafe"}},{default:l((()=>[(r(!0),_(f,null,u(e.order_info_list,((e,t)=>(r(),a(N,{key:t,class:"font-28 py-1"},{default:l((()=>[i(o,{style:{color:"#777"}},{default:l((()=>[c(k(e.configs_name)+":",1)])),_:2},1024),i(o,{class:"ml-1"},{default:l((()=>[c(k(e.configs_use_input),1)])),_:2},1024)])),_:2},1024)))),128))])),_:2},1024),i(N,{class:"rounded-10 px-2 py-2 mt-2",style:{"background-color":"#fef0f7"}},{default:l((()=>[i(N,{class:"font-28 py-1"},{default:l((()=>[i(o,{style:{color:"#777"}},{default:l((()=>[c("模版名称：")])),_:1}),i(o,{class:"ml-1"},{default:l((()=>[c(k(e.order_product_name),1)])),_:2},1024)])),_:2},1024),i(N,{class:"font-28 py-1"},{default:l((()=>[i(o,{style:{color:"#777"}},{default:l((()=>[c("规格：")])),_:1}),i(o,{class:"ml-1"},{default:l((()=>[c(k(e.order_spec_name),1)])),_:2},1024)])),_:2},1024),i(N,{class:"font-28 py-1"},{default:l((()=>[i(o,{style:{color:"#777"}},{default:l((()=>[c("商品：")])),_:1}),i(o,{class:"ml-1"},{default:l((()=>[c(k(e.order_commodity_name),1)])),_:2},1024)])),_:2},1024),i(N,{class:"font-28 py-1"},{default:l((()=>[i(o,{style:{color:"#777"}},{default:l((()=>[c("材质：")])),_:1}),i(o,{class:"ml-1"},{default:l((()=>[c(k(e.order_material_name),1)])),_:2},1024)])),_:2},1024)])),_:2},1024),i(N,{class:"mt-2 flex align-center justify-between px-2"},{default:l((()=>[i(N,{onClick:t=>{return o=e.order_id,void j({data:o,success:e=>{w({title:"复制成功",icon:"none",duration:2e3})}});var o},class:"rounded-circle flex align-center justify-center",style:{width:"192rpx",height:"64rpx","background-color":"#00a9b6"}},{default:l((()=>[i(o,{class:"text-white font-28"},{default:l((()=>[c("复制ID")])),_:1})])),_:2},1032,["onClick"]),i(N,{onClick:t=>(e=>{var t,o,r;console.log("item",e),g.commit("SET_ORDER_FORM",e),1==(null==(t=null==e?void 0:e.order_commodity_info_obj)?void 0:t.commodity_book)?1==(null==(o=null==e?void 0:e.order_commodity_info_obj)?void 0:o.commodity_mode)?d.goToPage("product-book-free-edit"):d.goToPage("product-book-edit"):1==(null==(r=null==e?void 0:e.order_commodity_info_obj)?void 0:r.commodity_mode)?d.goToPage("product-free-edit"):d.goToPage("compile")})(e),class:"rounded-circle flex align-center justify-center",style:{width:"192rpx",height:"64rpx","background-color":"#edb75c"}},{default:l((()=>[i(o,{class:"text-white font-28"},{default:l((()=>[c("查看详情")])),_:1})])),_:2},1032,["onClick"]),i(N,{onClick:t=>(e=>{v({title:"提示",content:"订单信息删除后，将不能恢复，确认删除吗？",success:function(t){t.confirm?n.updateOrderList({ids:[e.order_id]}).then((e=>{d.showToast("删除成功"),T.list=[],T.current_page=1,T.last_page=1,T.queryInfo.pageNum=1,R()})):t.cancel&&console.log("用户点击取消")}})})(e),class:"rounded-circle flex align-center justify-center",style:{width:"192rpx",height:"64rpx","background-color":"#00aeef"}},{default:l((()=>[i(o,{class:"text-white font-28"},{default:l((()=>[c("删除")])),_:1})])),_:2},1032,["onClick"])])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1}),0==s(J).length?(r(),a(S,{key:0})):p("",!0)])),_:1},8,["triggered"])}}},[["__scopeId","data-v-62b0b64f"]]);export{T as default};