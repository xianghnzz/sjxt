import{o as t,c as e,w as a,a as l,q as s,n as o,b as n,v as i,p as d,l as u,F as r,m as c,k as p,Z as m,g as y,at as f}from"./index-855f89f9.js";import{_ as h}from"./_plugin-vue_export-helper.1b428a4d.js";const x=h({name:"tuiModal",emits:["click","cancel"],props:{show:{type:Boolean,default:!1},width:{type:String,default:""},backgroundColor:{type:String,default:""},padding:{type:String,default:"0rpx 0rpx"},radius:{type:String,default:"30rpx"},title:{type:String,default:""},content:{type:String,default:""},color:{type:String,default:"#999"},size:{type:Number,default:28},shape:{type:String,default:"square"},button:{type:Array,default:function(){return[{text:"取消",type:"red",plain:!0},{text:"确定",type:"red",plain:!1}]}},maskClosable:{type:Boolean,default:!0},fadeIn:{type:Boolean,default:!1},custom:{type:Boolean,default:!1},zIndex:{type:Number,default:201},maskZIndex:{type:Number,default:200}},data:()=>({}),methods:{handleClick(t){if(!this.show)return;const e=t.currentTarget.dataset;this.$emit("click",{index:Number(e.index)})},handleClickCancel(){this.maskClosable&&this.$emit("cancel")}}},[["render",function(h,x,k,b,g,_){const C=y,w=f;return t(),e(C,{class:s(["tui-modal__container",[k.show?"tui-modal-show":""]]),style:o({zIndex:k.zIndex}),onTouchmove:x[0]||(x[0]=m((()=>{}),["stop","prevent"]))},{default:a((()=>[l(C,{class:s(["tui-modal-box",[k.fadeIn||k.show?"tui-modal-normal":"tui-modal-scale",k.show?"tui-modal-show":""]]),style:o({width:k.width,padding:k.padding,borderRadius:k.radius,backgroundColor:k.backgroundColor,zIndex:k.zIndex+1})},{default:a((()=>[k.custom?(t(),e(C,{key:1},{default:a((()=>[p(h.$slots,"default",{},void 0,!0)])),_:3})):(t(),e(C,{key:0},{default:a((()=>[k.title?(t(),e(C,{key:0,class:"tui-modal-title"},{default:a((()=>[n(i(k.title),1)])),_:1})):d("",!0),l(C,{class:s(["tui-modal-content",[k.title?"":"tui-mtop"]]),style:o({color:k.color,fontSize:k.size+"rpx"})},{default:a((()=>[n(i(k.content),1)])),_:1},8,["class","style"]),l(C,{class:s(["tui-modalBtn-box",[2!=k.button.length?"tui-flex-column":""]])},{default:a((()=>[(t(!0),u(r,null,c(k.button,((l,o)=>(t(),e(w,{key:o,class:s(["tui-modal-btn",["tui-"+(l.type||"primary")+(l.plain?"-outline":""),2!=k.button.length?"tui-btn-width":"",k.button.length>2?"tui-mbtm":"","circle"==k.shape?"tui-circle-btn":""]]),"hover-class":"tui-"+(l.plain?"outline":l.type||"primary")+"-hover","data-index":o,onClick:_.handleClick},{default:a((()=>[n(i(l.text||"确定"),1)])),_:2},1032,["class","hover-class","data-index","onClick"])))),128))])),_:1},8,["class"])])),_:1}))])),_:3},8,["style","class"]),l(C,{class:s(["tui-modal-mask",[k.show?"tui-mask-show":""]]),style:o({zIndex:k.maskZIndex}),onClick:_.handleClickCancel},null,8,["class","style","onClick"])])),_:3},8,["class","style"])}],["__scopeId","data-v-571ac2cc"]]);export{x as _};