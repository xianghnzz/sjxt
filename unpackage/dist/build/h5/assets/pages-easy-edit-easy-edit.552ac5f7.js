import{r as e,t,aa as s,af as a,o as l,c as o,w as i,e as r,a as n,b as c,u as p,d,n as f,v as u,p as h,l as g,m as x,F as m,s as y,an as _,y as w,h as I,i as b,g as v,j as k,_ as j,Z as $,q as C}from"./index-855f89f9.js";import{_ as F,a as L}from"./cj.411c7ef3.js";import{a as M,o as P,r as B}from"./uni-app.es.8f4863ce.js";import{_ as T}from"./tui-modal.dd985726.js";import{_ as E}from"./tui-bottom-popup.df21a1c1.js";import{_ as U}from"./back_bai.3f7a0c49.js";import{_ as z}from"./close.041a1bd8.js";import{_ as H}from"./_plugin-vue_export-helper.1b428a4d.js";const q=H({__name:"easy-edit",setup(H){const q=e({configsInfo:{configs_value:""},bili:1,pageInfo:{pages_content:{imgList:[]}},activeItem:{},cropperInfo:{id:"",src:"",width:500,height:500,radius:30},showModal:0}),{activeItem:N,cropperInfo:Z,bili:A,pageInfo:D,showModal:J,configsInfo:O}=t(q);s((()=>y.state.userInfo));const S=s((()=>{let e=0;return 0==q.pageInfo.pages_content.imgList.length?0:(e=q.pageInfo.pages_content.imgList.reduce(((e,t)=>"photo"==t.type?e+1:e),0),e)})),G=s((()=>{let e=0;return 0==q.pageInfo.pages_content.imgList.length?0:(e=q.pageInfo.pages_content.imgList.reduce(((e,t)=>"photo"==t.type&&t.url?e+1:e),0),e)})),K=()=>{0!=G.value?1!=G.value?q.showModal=2:Q():d.showToast("请先上传图片")},Q=()=>{const e=q.pageInfo.pages_content.imgList.find((e=>""!=e.url));e?(R(e),q.showModal=1):q.showModal=2},R=e=>{q.activeItem=e,q.cropperInfo.id=e.id,q.cropperInfo.src=d.showImageUrl(e.url),q.cropperInfo.width=Math.ceil(d.mm2px(e.width*e.scale)),q.cropperInfo.height=Math.ceil(d.mm2px(e.height*e.scale)),e.radius>0?q.cropperInfo.radius=Math.ceil(d.mm2px(e.radius*e.scale)):q.cropperInfo.radius=0},V=()=>{""==q.activeItem.id?Q():q.showModal=1},W=()=>{_("updatePageInfo",q.pageInfo),d.goBack()},X=()=>{if(G.value>=S.value)return void d.showToast("图片位置已占满，请点击图片更换图片");const e=q.pictureNumber-G.value;w({count:e>9?9:e,sizeType:["original","compressed"],sourceType:["album"],success:async e=>{for(let t=0;t<e.tempFilePaths.length;t++){const s=await r.uploadFile({filePath:e.tempFilePaths[t],name:"file"});Y(s.data.url)}}})},Y=e=>{for(let t of q.pageInfo.pages_content.imgList)if("photo"==t.type&&""==t.url){t.url=e;break}},ee=e=>{r.addBase64({file:e.tempFilePath}).then((e=>{q.activeItem.url=e.data})),q.showModal=0};return M((()=>{})),P((e=>{if(r.getConfigsById({configs_id:104}).then((e=>{q.configsInfo=e.data})),console.log("info",e),e.pageInfo){q.pageInfo=JSON.parse(e.pageInfo);const t=q.pageInfo.pages_area_width,s=a(710);q.bili=t/s}})),(e,t)=>{const s=I,a=b,y=v,_=B(k("qf-image-cropper"),L),M=B(k("tui-modal"),T),P=B(k("tui-bottom-popup"),E),H=B(k("page"),j);return l(),o(H,{bgColor:"#fff",topColor:"#00AEEF",topHeight:88,bottomHeight:120,refresherEnabled:!1},{navBar:i((()=>[n(y,{class:"text-center flex align-center justify-center",style:{height:"88rpx"}},{default:i((()=>[n(s,{class:"font-36 text-white"},{default:i((()=>[c("简易编辑")])),_:1}),n(y,{onClick:t[0]||(t[0]=e=>p(d).goBack()),class:"position-absolute rounded-circle flex align-center justify-center",style:{width:"40rpx",height:"32rpx",left:"32rpx"}},{default:i((()=>[n(a,{style:{width:"40rpx",height:"32rpx"},src:U,mode:""})])),_:1})])),_:1})])),content:i((()=>[n(y,{class:"",style:{height:"100%"}},{default:i((()=>[n(y,{class:"flex align-center justify-center text-ellipsis px-1",style:f([`background-color:${p(O).configs_content}; color:${p(O).configs_illustrate};font-size: ${p(O).configs_use||28}rpx;`,{width:"750rpx",height:"60rpx"}])},{default:i((()=>[n(s,{class:"text-ellipsis text-center"},{default:i((()=>[c(u(p(O).configs_value),1)])),_:1})])),_:1},8,["style"]),n(y,{class:"flex align-center justify-center",style:{height:"calc(100% - 60rpx)"}},{default:i((()=>[n(y,{class:"position-relative flex align-center justify-center",style:{width:"710rpx"}},{default:i((()=>{var e,t;return[(null==(t=null==(e=p(D))?void 0:e.pages_content)?void 0:t.bgImg)?(l(),o(a,{key:0,class:"border",style:{width:"710rpx"},src:p(d).showImageUrl(p(D).pages_content.bgImg),mode:"widthFix"},null,8,["src"])):h("",!0),n(y,{class:"position-absolute top-0 left-0 right-0 bottom-0"},{default:i((()=>{var e,t;return[(l(!0),g(m,null,x(null==(t=null==(e=p(D))?void 0:e.pages_content)?void 0:t.imgList,((e,t)=>(l(),o(y,{key:t,class:""},{default:i((()=>["photo"==e.type?(l(),o(y,{key:0,onClick:$((e=>{return s=t,void w({count:1,sizeType:["original","compressed"],sourceType:["album"],success:e=>{console.log("res",e);const t=e.tempFilePaths[0];r.uploadFile({filePath:t,name:"file"}).then((e=>{q.pageInfo.pages_content.imgList[s].url=e.data.url}))}});var s}),["stop"]),class:"position-absolute border border-primary flex align-center justify-center overflow-hidden",style:f([{"background-color":"rgba(51, 102, 255, 0.2)"},`transform:scale(${e.scale}) rotate(${e.r||0}deg);border-radius: ${e.radius}px;top:${e.y/p(A)}px;left:${e.x/p(A)}px;width: ${e.width/p(A)}px; height:${e.height/p(A)}px;`])},{default:i((()=>[e.url?(l(),o(a,{key:0,style:f(`width: ${e.width/p(A)}px; height:${e.height/p(A)}px;`),src:p(d).showImageUrl(e.url),mode:"widthFix"},null,8,["style","src"])):(l(),o(s,{key:1,class:"text-primary font-40 font-weight-bold"},{default:i((()=>[c("+")])),_:1}))])),_:2},1032,["onClick","style"])):(l(),o(y,{key:1,class:"position-absolute"},{default:i((()=>[n(a,{class:"position-absolute",style:f(`transform:scale(${e.scale}) rotate(${e.r||0}deg);border-radius: ${e.radius}px;top:${e.y/p(A)}px;left:${e.x/p(A)}px;width: ${e.width/p(A)}px; height:${e.height/p(A)}px;`),src:p(d).showImageUrl(e.url),mode:""},null,8,["style","src"])])),_:2},1024))])),_:2},1024)))),128))]})),_:1})]})),_:1})])),_:1}),n(M,{show:1==p(J),custom:""},{default:i((()=>[n(y,{class:"position-relative",style:{width:"100vw",height:"100vh"}},{default:i((()=>[n(_,{src:p(Z).src,width:p(Z).width,height:p(Z).height,radius:p(Z).radius,onCrop:ee},null,8,["src","width","height","radius"])])),_:1})])),_:1},8,["show"]),n(P,{isFixed:"",zIndex:1002,maskZIndex:1001,show:2==p(J)},{default:i((()=>[n(y,{class:"py-3 px-3 flex align-center justify-between"},{default:i((()=>[n(s,{class:"font-32"},{default:i((()=>[c("选择要裁剪的图片")])),_:1}),n(a,{onClick:t[1]||(t[1]=e=>J.value=0),style:{width:"40rpx",height:"40rpx"},src:z,mode:""})])),_:1}),n(y,{class:"flex flex-wrap"},{default:i((()=>[(l(!0),g(m,null,x(p(D).pages_content.imgList,((e,t)=>(l(),g(m,null,[e.url?(l(),o(y,{onClick:t=>R(e),key:t,class:"m-2"},{default:i((()=>[n(y,{class:C(["rounded-20 overflow-hidden flex align-center justify-center border",p(Z).id==e.id?"border-primary":""]),style:{width:"208rpx",height:"208rpx"}},{default:i((()=>[n(a,{style:{width:"248rpx"},src:p(d).showImageUrl(e.url),mode:"widthFix"},null,8,["src"])])),_:2},1032,["class"])])),_:2},1032,["onClick"])):h("",!0)],64)))),256))])),_:1}),n(y,{class:"pt-2 pb-4 flex align-center justify-center px-2"},{default:i((()=>[n(y,{onClick:V,class:"flex-1 flex align-center justify-center linear-gradient rounded-circle",style:{height:"100rpx"}},{default:i((()=>[n(s,{class:"text-white"},{default:i((()=>[c("确认，下一步")])),_:1})])),_:1})])),_:1})])),_:1},8,["show"])])),_:1})])),bottomBar:i((()=>[n(y,{class:"bg-white flex align-center justify-center px-2",style:{height:"120rpx"}},{default:i((()=>[n(y,{onClick:K,class:"mr-2 flex align-center"},{default:i((()=>[n(a,{style:{width:"64rpx",height:"64rpx"},src:F,mode:""})])),_:1}),n(y,{class:"",style:{width:"100rpx"}}),n(y,{class:"flex-1 flex rounded-20 overflow-hidden",style:{height:"90rpx"}},{default:i((()=>[n(y,{onClick:X,class:"flex-1 flex align-center justify-center",style:{height:"90rpx","background-color":"#ED1F8C"}},{default:i((()=>[n(s,{class:"text-white"},{default:i((()=>[c("上传图片")])),_:1})])),_:1}),n(y,{onClick:W,class:"flex align-center justify-center bg-primary",style:{width:"200rpx",height:"90rpx"}},{default:i((()=>[n(s,{class:"text-white"},{default:i((()=>[c("完成")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-0b170503"]]);export{q as default};
