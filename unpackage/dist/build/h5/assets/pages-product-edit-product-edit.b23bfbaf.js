import{r as e,t,aa as l,af as r,ag as o,ah as s,o as i,c as a,w as n,e as c,a as d,b as u,u as p,d as f,l as _,m as g,F as h,v as x,n as m,s as y,y as b,h as v,i as w,g as j,j as I,_ as k,p as $,Z as N}from"./index-855f89f9.js";import{_ as O}from"./tui-modal.dd985726.js";import{a as T,o as P,b as F,r as C}from"./uni-app.es.8f4863ce.js";import{_ as J}from"./back_bai.3f7a0c49.js";import{_ as S}from"./gg.7b849707.js";import{_ as E}from"./_plugin-vue_export-helper.1b428a4d.js";const L=E({__name:"product-edit",setup(E){const L=e({triggered:!1,product_print_list:[],bili:1,showModal:0,pictureNumber:1,configsInfo:{},cItem:{},cIndex:0}),{triggered:B,product_print_list:M,bili:z,showModal:U,pictureNumber:q,configsInfo:H,cItem:A,cIndex:Z}=t(L),D=l((()=>y.state.userInfo)),G=l((()=>y.state.orderFrom)),K=l((()=>{var e,t;return 1==(null==(t=null==(e=G.value)?void 0:e.order_commodity_info_obj)?void 0:t.commodity_print)?1:0})),Q=l((()=>{let e=0;return L.product_print_list.forEach((t=>{e+=t.pages_content.imgList.reduce(((e,t)=>"photo"==t.type&&t.url?e+1:e),0)})),e})),R=()=>{if(G.value.order_id>0){if(G.value.order_status>0)return void f.showToast("该订单已经定稿，不能修改");V()}else W()},V=()=>{var e;const t=JSON.parse(JSON.stringify(G.value)),l=[L.coverPage,...L.product_print_list,L.endPage];t.order_product_info_obj.product_print=JSON.stringify(l),t.order_product_info=JSON.stringify(t.order_product_info_obj),t.order_cover=(null==(e=t.order_spec_info_obj)?void 0:e.spec_cover)||"",t.order_custom_id=D.value.custom_id,t.order_frequency=Number(t.order_frequency)+1,c.updateOrder(t).then((e=>{L.showModal=0,f.showToast("提交成功"),setTimeout((()=>{f.reToPage("home")}),1800)})),console.log("newOrderInfo",t)},W=()=>{var e;const t=JSON.parse(JSON.stringify(G.value));t.order_product_info_obj.product_print=JSON.stringify(L.product_print_list),t.order_product_info=JSON.stringify(t.order_product_info_obj),t.order_cover=(null==(e=t.order_spec_info_obj)?void 0:e.spec_cover)||"",t.order_custom_id=D.value.custom_id,c.addOrder(t).then((e=>{L.showModal=0,f.showToast("提交成功"),setTimeout((()=>{f.reToPage("home")}),1800)})),console.log("newOrderInfo",t)},X=()=>{if(Q.value>=L.pictureNumber)return void f.showToast("图片位置已占满，请点击图片更换图片");const e=L.pictureNumber-Q.value;b({count:e>9?9:e,sizeType:["original","compressed"],sourceType:["album"],success:async e=>{for(let t=0;t<e.tempFilePaths.length;t++){const l=await c.uploadFile({filePath:e.tempFilePaths[t],name:"file"});console.log("res.tempFilePaths[i]",e.tempFilePaths[t]),Y(l.data.url)}}})},Y=e=>{for(let t of L.product_print_list){let l=0;for(let r of t.pages_content.imgList)if("photo"==r.type&&""==r.url){r.url=e,l=1,console.log("item2.url",r.url);break}if(1==l)break}};return T((()=>{})),P((e=>{var t,l;if(c.getConfigsById({configs_id:102}).then((e=>{L.configsInfo=e.data})),null==(l=null==(t=G.value)?void 0:t.order_product_info_obj)?void 0:l.product_print){if(L.product_print_list=JSON.parse(G.value.order_product_info_obj.product_print),L.product_print_list.length>0){const e=r(710);L.product_print_list.forEach((t=>{t.bili=t.pages_area_width/e})),(()=>{let e=0;L.product_print_list.forEach((t=>{e+=t.pages_content.imgList.reduce(((e,t)=>"photo"==t.type?e+1:e),0)})),L.pictureNumber=e})()}}else L.product_print_list=[];console.log("data.product_print_list",L.product_print_list),o("updatePageInfo",(e=>{(e=>{const t=r(344);e.bili=e.pages_area_width/t,L.product_print_list[L.cIndex]=Object.assign({},e)})(e)}))})),F((()=>{s("updatePageInfo")})),(e,t)=>{const l=v,r=w,o=j,s=C(I("tui-modal"),O),y=C(I("page"),k);return i(),a(y,{bgColor:"#fff",topColor:"#00AEEF",topHeight:88,bottomHeight:180,refresherEnabled:!1},{navBar:n((()=>[d(o,{class:"text-center flex align-center justify-center",style:{height:"88rpx"}},{default:n((()=>[d(l,{class:"font-36 text-white"},{default:n((()=>[u("模版编辑")])),_:1}),d(o,{onClick:t[0]||(t[0]=e=>p(f).goBack()),class:"position-absolute rounded-circle flex align-center justify-center",style:{width:"40rpx",height:"32rpx",left:"32rpx"}},{default:n((()=>[d(r,{style:{width:"40rpx",height:"32rpx"},src:J,mode:""})])),_:1})])),_:1})])),content:n((()=>[d(o,{class:"p-2"},{default:n((()=>[(i(!0),_(h,null,g(p(M),((e,t)=>(i(),a(o,{key:t,style:{width:"710rpx"}},{default:n((()=>[d(o,{onClick:l=>((e,t)=>{var l,r,o,s;if(L.cItem=e,L.cIndex=t,1==((null==(r=null==(l=G.value)?void 0:l.order_spec_info_obj)?void 0:r.spec_edit)||0)){const e=(null==(s=null==(o=G.value)?void 0:o.order_spec_info_obj)?void 0:s.spec_template_edit_mode)||0;1==e?f.goToPage("easy-edit",`pageInfo=${JSON.stringify(L.cItem)}`):2==e?f.goToPage("professional-edit",`pageInfo=${JSON.stringify(L.cItem)}`):f.showToast("所选页面只允许换图片")}else f.showToast("该模版只允许换图片")})(e,t),class:"position-relative flex align-center justify-center",style:{width:"710rpx"}},{default:n((()=>{var s;return[(null==(s=null==e?void 0:e.pages_content)?void 0:s.bgImg)?(i(),a(r,{key:0,class:"border",style:{width:"710rpx"},src:p(f).showImageUrl(e.pages_content.bgImg),mode:"widthFix"},null,8,["src"])):$("",!0),d(o,{class:"position-absolute top-0 left-0 right-0 bottom-0"},{default:n((()=>[(i(!0),_(h,null,g(e.pages_content.imgList,((s,_)=>(i(),a(o,{key:_,class:""},{default:n((()=>["photo"==s.type?(i(),a(o,{key:0,onClick:N((e=>{return l=t,r=_,void b({count:1,sizeType:["original","compressed"],sourceType:["album"],success:e=>{const t=e.tempFilePaths[0];c.uploadFile({filePath:t,name:"file"}).then((e=>{L.product_print_list[l].pages_content.imgList[r].url=e.data.url}))}});var l,r}),["stop"]),class:"position-absolute border border-primary flex align-center justify-center overflow-hidden",style:m([{"background-color":"rgba(51, 102, 255, 0.2)"},`transform:scale(${s.scale}) rotate(${s.r||0}deg);border-radius: ${s.radius}px;top:${s.y/e.bili}px;left:${s.x/e.bili}px;width: ${s.width/e.bili}px; height:${s.height/e.bili}px;`])},{default:n((()=>[s.url?(i(),a(r,{key:0,style:m(`width: ${s.width/e.bili}px; height:${s.height/e.bili}px;`),src:p(f).showImageUrl(s.url),mode:"widthFix"},null,8,["style","src"])):(i(),a(l,{key:1,class:"text-primary font-40 font-weight-bold"},{default:n((()=>[u("+")])),_:1}))])),_:2},1032,["onClick","style"])):(i(),a(o,{key:1,class:"position-absolute"},{default:n((()=>[d(r,{class:"position-absolute",style:m(`transform:scale(${s.scale}) rotate(${s.r||0}deg);border-radius: ${s.radius}px;top:${s.y/e.bili}px;left:${s.x/e.bili}px;width: ${s.width/e.bili}px; height:${s.height/e.bili}px;`),src:p(f).showImageUrl(s.url),mode:""},null,8,["style","src"])])),_:2},1024))])),_:2},1024)))),128))])),_:2},1024),1==p(K)&&(t+1)%2==0?(i(),a(o,{key:1,class:"bg-opacity p-1 position-absolute right-0 top-0 flex align-center justify-center rounded-circle",style:{width:"60rpx",height:"30rpx"}},{default:n((()=>[d(l,{class:"font-20 text-white"},{default:n((()=>[u("反面")])),_:1})])),_:1})):$("",!0)]})),_:2},1032,["onClick"]),d(o,{class:"flex align-center justify-center py-2 font-30 font-weight-bold"},{default:n((()=>[d(l,null,{default:n((()=>{var e,t;return[u(x(null==(t=null==(e=p(G))?void 0:e.order_spec_info_obj)?void 0:t.spec_page_prefix),1)]})),_:1}),d(l,{class:"mx-1"},{default:n((()=>[u(x(t+1),1)])),_:2},1024),d(l,null,{default:n((()=>{var e,t;return[u(x(null==(t=null==(e=p(G))?void 0:e.order_spec_info_obj)?void 0:t.spec_page_suffix),1)]})),_:1})])),_:2},1024)])),_:2},1024)))),128))])),_:1}),d(s,{show:1==p(U),custom:""},{default:n((()=>[d(o,{class:"rounded-20 bg-white border-box font pb-3",style:{width:"600rpx"}},{default:n((()=>[d(o,{class:"py-2 text-center"},{default:n((()=>[d(l,{class:"font-40 font-weight-bold"},{default:n((()=>[u("产品信息确认")])),_:1})])),_:1}),d(o,{class:"py-2 px-4 font-32"},{default:n((()=>[d(o,{class:"flex align-center py-1"},{default:n((()=>[d(o,{class:""},{default:n((()=>[d(l,{class:"text-color-999"},{default:n((()=>[u("产品：")])),_:1})])),_:1}),d(o,{class:"flex text-ellipsis"},{default:n((()=>[d(l,{class:"font-weight-bold"},{default:n((()=>{var e;return[u(x(null==(e=p(G))?void 0:e.order_commodity_name),1)]})),_:1})])),_:1})])),_:1}),d(o,{class:"flex align-center py-1"},{default:n((()=>[d(o,{class:""},{default:n((()=>[d(l,{class:"text-color-999"},{default:n((()=>[u("规格：")])),_:1})])),_:1}),d(o,{class:"flex text-ellipsis"},{default:n((()=>[d(l,{class:"font-weight-bold"},{default:n((()=>{var e;return[u(x(null==(e=p(G))?void 0:e.order_spec_name),1)]})),_:1})])),_:1})])),_:1}),d(o,{class:"flex align-center py-1"},{default:n((()=>[d(o,{class:""},{default:n((()=>[d(l,{class:"text-color-999"},{default:n((()=>[u("纸张：")])),_:1})])),_:1}),d(o,{class:"flex text-ellipsis"},{default:n((()=>[d(l,{class:"font-weight-bold"},{default:n((()=>{var e;return[u(x(null==(e=p(G))?void 0:e.order_material_name),1)]})),_:1})])),_:1})])),_:1}),d(o,{class:"flex align-center py-2"},{default:n((()=>[d(r,{style:{width:"24rpx",height:"24rpx"},src:S,mode:"widthFix"}),d(o,{class:"ml-1 flex-1"},{default:n((()=>[d(l,{class:"text-warning font-24"},{default:n((()=>[u("核对产品信息，如有问题点击取消返回，核对无误点击确认")])),_:1})])),_:1})])),_:1})])),_:1}),d(o,{class:"px-5 flex align-center justify-center px-2"},{default:n((()=>[d(o,{onClick:t[1]||(t[1]=e=>U.value=0),class:"flex-1 flex align-center justify-center bg-info rounded-circle mr-2",style:{height:"80rpx"}},{default:n((()=>[d(l,{class:"text-white"},{default:n((()=>[u("取消")])),_:1})])),_:1}),d(o,{onClick:R,class:"flex-1 flex align-center justify-center linear-gradient rounded-circle ml-2",style:{height:"80rpx"}},{default:n((()=>[d(l,{class:"text-white"},{default:n((()=>[u("确定")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["show"])])),bottomBar:n((()=>[d(o,{class:"flex align-center justify-center text-ellipsis px-1",style:m([`background-color:${p(H).configs_content}; color:${p(H).configs_illustrate};font-size: ${p(H).configs_use||28}rpx;`,{width:"750rpx",height:"60rpx"}])},{default:n((()=>[d(l,{class:"text-ellipsis text-center"},{default:n((()=>{var e,t;return[u(x(null==(t=null==(e=p(G))?void 0:e.order_spec_info_obj)?void 0:t.spec_prompt),1)]})),_:1})])),_:1},8,["style"]),d(o,{class:"bg-white flex align-center justify-center px-2",style:{height:"120rpx"}},{default:n((()=>[d(o,{onClick:X,class:"flex-1 flex align-center justify-center bg-warning rounded-circle mr-1",style:{height:"90rpx"}},{default:n((()=>[d(l,{class:"text-white"},{default:n((()=>[u("上传图片("+x(p(Q))+"/"+x(p(q))+")",1)])),_:1})])),_:1}),d(o,{onClick:t[2]||(t[2]=e=>U.value=1),class:"flex-1 flex align-center justify-center linear-gradient rounded-circle ml-1",style:{height:"90rpx"}},{default:n((()=>[d(l,{class:"text-white"},{default:n((()=>[u("制作完成")])),_:1})])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-74350724"]]);export{L as default};