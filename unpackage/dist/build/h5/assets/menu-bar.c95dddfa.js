import{o as e,c as t,w as a,l as i,F as s,m as n,a as c,q as o,b as l,v as r,d as m,i as u,h as d,g as h}from"./index-855f89f9.js";const g={__name:"menu-bar",props:{activeMenu:{type:[Number,String],default:"home"}},setup(g){const p=g,f=[{id:"home",iconPath:"/static/images/common/menu/home.png",activeIconPath:"/static/images/common/menu/home_active.png",title:"首页"},{id:"me",iconPath:"/static/images/common/menu/wd.png",activeIconPath:"/static/images/common/menu/wd_active.png",title:"我的"}];return(x,v)=>{const y=u,_=d,w=h;return e(),t(w,{class:"w-100 overflow-hidden border-box flex bg-white py-1",style:{height:"100rpx"}},{default:a((()=>[(e(),i(s,null,n(f,(e=>c(w,{key:e.id,class:"flex-1 flex align-start justify-center"},{default:a((()=>[c(w,{onClick:t=>{var a;(a=e.id)!=p.activeMenu&&m.reToPage(a)},class:"flex flex-column align-center justify-center"},{default:a((()=>[c(y,{src:g.activeMenu==e.id?e.activeIconPath:e.iconPath,style:{width:"48rpx",height:"48rpx"},mode:""},null,8,["src"]),c(_,{class:o(["font-20 transition-color",g.activeMenu==e.id?"text-primary":"text-color-ccc"]),style:{"margin-top":"4rpx"}},{default:a((()=>[l(r(e.title),1)])),_:2},1032,["class"])])),_:2},1032,["onClick"])])),_:2},1024))),64))])),_:1})}}};export{g as _};