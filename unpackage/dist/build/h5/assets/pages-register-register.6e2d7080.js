import{r as e,t,o as l,c as a,w as s,a as o,u as r,d as c,b as n,e as u,f as d,h as m,i,g as f,I as p,_,j as h}from"./index-855f89f9.js";import{o as x,r as g}from"./uni-app.es.8f4863ce.js";import{_ as y}from"./back.66660d7b.js";import{f as b}from"./tui-validation.c5aa0c0a.js";import{_ as V}from"./_plugin-vue_export-helper.1b428a4d.js";const j=V({__name:"register",setup(V){const j=e({form:{custom_number:"",custom_password:"",custom_phone:"",custom_name:"",custom_id_card:""},rules:[{name:"custom_number",rule:["required"],msg:["请输入账号"]},{name:"custom_phone",rule:["required"],msg:["请输入手机号"]},{name:"custom_password",rule:["required"],msg:["请输入密码"]},{name:"custom_name",rule:["required"],msg:["请输入姓名"]},{name:"custom_id_card",rule:["required"],msg:["请输入身份证号"]}]}),{form:w}=t(j),k=()=>{const e=b.validation(j.form,j.rules);e?c.showToast(e):u.register(j.form).then((e=>{c.showToast(e.message),d("token","Bearer "+e.data.token),d("userInfo",JSON.stringify(e.data.userInfo)),c.reToPage("home")}))};return x((e=>{})),(e,t)=>{const u=m,d=i,x=f,b=p,V=g(h("page"),_);return l(),a(V,{bgColor:"#fff",refresherEnabled:!1,topFixed:"",topColor:"transparent"},{navBar:s((()=>[o(x,{class:"text-center flex align-center justify-center position-relative",style:{width:"750rpx",height:"88rpx"}},{default:s((()=>[o(u,{class:"font-36"}),o(x,{onClick:t[0]||(t[0]=e=>r(c).goBack()),class:"position-absolute rounded-circle flex align-center justify-center",style:{width:"40rpx",height:"32rpx",left:"32rpx"}},{default:s((()=>[o(d,{style:{width:"40rpx",height:"32rpx"},src:y,mode:""})])),_:1})])),_:1})])),content:s((()=>[o(x,{class:"p-6 login-bg",style:{"min-height":"100%"}},{default:s((()=>[o(x,{class:"pt-12 flex align-center justify-center"},{default:s((()=>[o(u,{class:"font-48 font-weight-bold"},{default:s((()=>[n("快速注册")])),_:1})])),_:1}),o(x,{class:"py-6"},{default:s((()=>[o(x,{class:"py-3 border-bottom flex align-center",style:{height:"100rpx"}},{default:s((()=>[o(b,{class:"font-32 flex-1",type:"text",modelValue:r(w).custom_number,"onUpdate:modelValue":t[1]||(t[1]=e=>r(w).custom_number=e),placeholder:"请输入账号","placeholder-style":"color: #ccc"},null,8,["modelValue"])])),_:1}),o(x,{class:"py-3 border-bottom flex align-center",style:{height:"100rpx"}},{default:s((()=>[o(b,{class:"font-32 flex-1",type:"text",modelValue:r(w).custom_password,"onUpdate:modelValue":t[2]||(t[2]=e=>r(w).custom_password=e),placeholder:"请输入手机号码","placeholder-style":"color: #ccc"},null,8,["modelValue"])])),_:1}),o(x,{class:"py-3 border-bottom flex align-center justify-center"},{default:s((()=>[o(b,{class:"font-32 flex-1",type:"text",modelValue:r(w).custom_phone,"onUpdate:modelValue":t[3]||(t[3]=e=>r(w).custom_phone=e),placeholder:"请输入密码","placeholder-style":"color: #ccc"},null,8,["modelValue"])])),_:1}),o(x,{class:"py-3 border-bottom flex align-center justify-center"},{default:s((()=>[o(b,{class:"font-32 flex-1",type:"text",modelValue:r(w).custom_name,"onUpdate:modelValue":t[4]||(t[4]=e=>r(w).custom_name=e),placeholder:"请输入姓名","placeholder-style":"color: #ccc"},null,8,["modelValue"])])),_:1}),o(x,{class:"py-3 border-bottom flex align-center justify-center"},{default:s((()=>[o(b,{class:"font-32 flex-1",type:"text",modelValue:r(w).custom_id_card,"onUpdate:modelValue":t[5]||(t[5]=e=>r(w).custom_id_card=e),placeholder:"请输入身份证号","placeholder-style":"color: #ccc"},null,8,["modelValue"])])),_:1})])),_:1}),o(x,{class:"pt-6 px-2"},{default:s((()=>[o(x,{onClick:k,class:"rounded-circle flex align-center justify-center linear-gradient",style:{height:"100rpx"}},{default:s((()=>[o(u,{class:"text-white font-32"},{default:s((()=>[n("立即注册")])),_:1})])),_:1})])),_:1}),o(x,{onClick:t[6]||(t[6]=e=>r(c).goBack()),class:"p-6 flex align-center justify-center font-26"},{default:s((()=>[o(u,{class:"text-color-666"},{default:s((()=>[n("已有账号，立即")])),_:1}),o(u,{class:"text-primary"},{default:s((()=>[n("登录")])),_:1})])),_:1})])),_:1})])),_:1})}}},[["__scopeId","data-v-433dc7fd"]]);export{j as default};