(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{TDBs:function(e,t,n){"use strict";n.r(t),n.d(t,"DashboardPageModule",(function(){return b}));var a=n("ofXK"),o=n("3Pt+"),r=n("TEn/"),l=n("tyNb"),i=n("mrSG"),c=n("fXoL"),d=n("hLxd"),s=n("e8h1"),u=n("Sy1n");const m=[{path:"",component:(()=>{class e{constructor(e,t,n,a,o,r){this.alertCtrl=e,this.loadingCtrl=t,this.ningiService=n,this.storage=a,this.app=o,this.navCtrl=r,this.chartOptions={responsive:!0},this.chartData=[],this.chartLabels=["dom","seg","ter","qua","quin","sex","sab"],this.totalBalance={value:0,class:""},this.totalCarteira={value:0,class:""},this.totalBradesco={value:0,class:""},this.totalBancoDoBrasil={value:0,class:""},this.totalSantander={value:0,class:""},this.prevWeekNingis={carteira:[],santander:[],bradesco:[],banco_do_brasil:[]};const l=this;this.storage.get("user").then(e=>{e?l.user=e:(l.navCtrl.navigateForward("/tabs/login"),l.storage.set("hideTbas",!0))})}ngOnInit(){this.getValores()}addNingi(e){return Object(i.a)(this,void 0,void 0,(function*(){var t;this.storage.get("user").then(e=>{t=e});const n=yield this.alertCtrl.create({cssClass:"my-custom-class",header:e,translucent:!0,message:"Digite o valor da opera\xe7\xe3o",inputs:[{name:"valor",type:"number",placeholder:"R$ 42,90",attributes:{autocomplete:"false",required:!0}}],buttons:[{text:"Cancelar"},{text:"Ok",handler:n=>Object(i.a)(this,void 0,void 0,(function*(){""!=n.valor?(this.ningi={user:t.email,value:parseFloat(n.valor),data_criacao:(new Date).getTime(),source:e,deletado:0,operation:"spend",photoURL:this.user.photoURL},yield this.saveNingi(),yield this.ngOnInit()):this.addNingi(e)}))}]});yield n.present().then(()=>{document.querySelector("ion-alert input").focus()})}))}saveNingi(){return Object(i.a)(this,void 0,void 0,(function*(){const e=yield this.loadingCtrl.create({message:"saving..."});yield e.present(),yield this.ningiService.addNingi(this.ningi).then(t=>Object(i.a)(this,void 0,void 0,(function*(){e.dismiss();const t=yield this.alertCtrl.create({message:"Saved!"});yield t.present(),setTimeout(()=>{t.dismiss()},500)})))}))}doRefresh(e){return Object(i.a)(this,void 0,void 0,(function*(){yield this.ngOnInit(),yield e.target.complete()}))}goTo(e){this.navCtrl.navigateForward(e)}ionViewDidEnter(){this.getValores(),this.app.loadUser()}getValores(){return Object(i.a)(this,void 0,void 0,(function*(){yield this.zerarValore();var e=this;yield this.ningiService.getNingis((function(t){return Object(i.a)(this,void 0,void 0,(function*(){e.totalBalance.value=0,e.totalCarteira.value=0,e.totalSantander.value=0,e.totalBradesco.value=0,e.totalBancoDoBrasil.value=0,t.forEach(t=>{if(t.value=parseFloat(t.value),"incomming"==t.operation){switch(t.source){case"carteira":e.totalCarteira.value=e.totalCarteira.value+t.value;break;case"santander":e.totalSantander.value=e.totalSantander.value+t.value;break;case"bradesco":e.totalBradesco.value=e.totalBradesco.value+t.value;break;case"banco_do_brasil":e.totalBancoDoBrasil.value=e.totalBancoDoBrasil.value+t.value}e.totalBalance.value=e.totalBalance.value+t.value}else{switch(t.source){case"carteira":e.totalCarteira.value=e.totalCarteira.value-t.value;break;case"santander":e.totalSantander.value=e.totalSantander.value-t.value;break;case"bradesco":e.totalBradesco.value=e.totalBradesco.value-t.value;break;case"banco_do_brasil":e.totalBancoDoBrasil.value=e.totalBancoDoBrasil.value-t.value}e.totalBalance.value=e.totalBalance.value-t.value}}),e.totalBalance.color=e.totalBalance.value<0?"danger":0==e.totalBalance.value?"warning":"success",e.totalCarteira.color=0==e.totalCarteira.value?"warning":e.totalCarteira.value<0?"danger":"success",e.totalBradesco.color=0==e.totalBradesco.value?"warning":e.totalBradesco.value<0?"danger":"success",e.totalSantander.color=0==e.totalSantander.value?"warning":e.totalSantander.value<0?"danger":"success",e.totalBancoDoBrasil.color=0==e.totalBancoDoBrasil.value?"warning":e.totalBancoDoBrasil.value<0?"danger":"success"}))}))}))}zerarValore(){this.totalCarteira.value=0,this.totalBradesco.value=0,this.totalSantander.value=0,this.totalBancoDoBrasil.value=0}copyObj(e){let t,n={};for(t in e)n[t]=e[t];return n}}return e.\u0275fac=function(t){return new(t||e)(c["\u0275\u0275directiveInject"](r.a),c["\u0275\u0275directiveInject"](r.Z),c["\u0275\u0275directiveInject"](d.a),c["\u0275\u0275directiveInject"](s.b),c["\u0275\u0275directiveInject"](u.a),c["\u0275\u0275directiveInject"](r.bb))},e.\u0275cmp=c["\u0275\u0275defineComponent"]({type:e,selectors:[["app-dashboard"]],decls:69,vars:35,consts:[["color","dark"],["slot","start",1,"menu-btn"],["manu","main-menu"],[1,"ion-text-center"],["slot","fixed",3,"ionRefresh"],["pager","true"],[3,"color"],[1,"banco","bg-wallet",3,"click"],[1,"banco","bg-bradesco",3,"click"],[1,"banco","bg-santander",3,"click"],[1,"banco","bg-banco_do_brasil",3,"click"],["vertical","bottom","horizontal","end","slot","fixed"],["color","dark","routerLink","/tabs/ningi-details","routerDirection","forward"],["name","add"]],template:function(e,t){1&e&&(c["\u0275\u0275elementStart"](0,"ion-header"),c["\u0275\u0275elementStart"](1,"ion-toolbar",0),c["\u0275\u0275elementStart"](2,"ion-buttons",1),c["\u0275\u0275element"](3,"ion-menu-button",2),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](4,"ion-title",3),c["\u0275\u0275text"](5,"Dashboard"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](6,"ion-content"),c["\u0275\u0275elementStart"](7,"ion-refresher",4),c["\u0275\u0275listener"]("ionRefresh",(function(e){return t.doRefresh(e)})),c["\u0275\u0275element"](8,"ion-refresher-content"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](9,"ion-slides",5),c["\u0275\u0275elementStart"](10,"ion-slide"),c["\u0275\u0275elementStart"](11,"ion-card"),c["\u0275\u0275elementStart"](12,"ion-card-content"),c["\u0275\u0275elementStart"](13,"ion-text",6),c["\u0275\u0275elementStart"](14,"h1"),c["\u0275\u0275text"](15),c["\u0275\u0275pipe"](16,"currency"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](17,"small"),c["\u0275\u0275text"](18,"Balan\xe7o Total"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](19,"ion-slide"),c["\u0275\u0275elementStart"](20,"ion-card"),c["\u0275\u0275elementStart"](21,"ion-card-content"),c["\u0275\u0275elementStart"](22,"ion-text",6),c["\u0275\u0275elementStart"](23,"h1"),c["\u0275\u0275text"](24),c["\u0275\u0275pipe"](25,"currency"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](26,"small"),c["\u0275\u0275text"](27,"Carteira"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](28,"ion-slide"),c["\u0275\u0275elementStart"](29,"ion-card"),c["\u0275\u0275elementStart"](30,"ion-card-content"),c["\u0275\u0275elementStart"](31,"ion-text",6),c["\u0275\u0275elementStart"](32,"h1"),c["\u0275\u0275text"](33),c["\u0275\u0275pipe"](34,"currency"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](35,"small"),c["\u0275\u0275text"](36,"Bradesco"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](37,"ion-slide"),c["\u0275\u0275elementStart"](38,"ion-card"),c["\u0275\u0275elementStart"](39,"ion-card-content"),c["\u0275\u0275elementStart"](40,"ion-text",6),c["\u0275\u0275elementStart"](41,"h1"),c["\u0275\u0275text"](42),c["\u0275\u0275pipe"](43,"currency"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](44,"small"),c["\u0275\u0275text"](45,"Santander"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](46,"ion-slide"),c["\u0275\u0275elementStart"](47,"ion-card"),c["\u0275\u0275elementStart"](48,"ion-card-content"),c["\u0275\u0275elementStart"](49,"ion-text",6),c["\u0275\u0275elementStart"](50,"h1"),c["\u0275\u0275text"](51),c["\u0275\u0275pipe"](52,"currency"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](53,"small"),c["\u0275\u0275text"](54,"Banco Do Brasil"),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](55,"ion-grid"),c["\u0275\u0275elementStart"](56,"ion-row"),c["\u0275\u0275elementStart"](57,"ion-col"),c["\u0275\u0275elementStart"](58,"div",7),c["\u0275\u0275listener"]("click",(function(){return t.addNingi("carteira")})),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](59,"ion-col"),c["\u0275\u0275elementStart"](60,"div",8),c["\u0275\u0275listener"]("click",(function(){return t.addNingi("bradesco")})),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](61,"ion-row"),c["\u0275\u0275elementStart"](62,"ion-col"),c["\u0275\u0275elementStart"](63,"div",9),c["\u0275\u0275listener"]("click",(function(){return t.addNingi("santander")})),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](64,"ion-col"),c["\u0275\u0275elementStart"](65,"div",10),c["\u0275\u0275listener"]("click",(function(){return t.addNingi("banco_do_brasil")})),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementStart"](66,"ion-fab",11),c["\u0275\u0275elementStart"](67,"ion-fab-button",12),c["\u0275\u0275element"](68,"ion-icon",13),c["\u0275\u0275elementEnd"](),c["\u0275\u0275elementEnd"]()),2&e&&(c["\u0275\u0275advance"](13),c["\u0275\u0275propertyInterpolate"]("color",t.totalBalance.color),c["\u0275\u0275advance"](2),c["\u0275\u0275textInterpolate"](c["\u0275\u0275pipeBind4"](16,10,t.totalBalance.value,"R$ ",!0,"1.2")),c["\u0275\u0275advance"](7),c["\u0275\u0275propertyInterpolate"]("color",t.totalCarteira.color),c["\u0275\u0275advance"](2),c["\u0275\u0275textInterpolate"](c["\u0275\u0275pipeBind4"](25,15,t.totalCarteira.value,"R$ ",!0,"1.2")),c["\u0275\u0275advance"](7),c["\u0275\u0275propertyInterpolate"]("color",t.totalBradesco.color),c["\u0275\u0275advance"](2),c["\u0275\u0275textInterpolate"](c["\u0275\u0275pipeBind4"](34,20,t.totalBradesco.value,"R$ ",!0,"1.2")),c["\u0275\u0275advance"](7),c["\u0275\u0275propertyInterpolate"]("color",t.totalSantander.color),c["\u0275\u0275advance"](2),c["\u0275\u0275textInterpolate"](c["\u0275\u0275pipeBind4"](43,25,t.totalSantander.value,"R$ ",!0,"1.2")),c["\u0275\u0275advance"](7),c["\u0275\u0275propertyInterpolate"]("color",t.totalBancoDoBrasil.color),c["\u0275\u0275advance"](2),c["\u0275\u0275textInterpolate"](c["\u0275\u0275pipeBind4"](52,30,t.totalBancoDoBrasil.value,"R$ ",!0,"1.2")))},directives:[r.t,r.W,r.h,r.D,r.V,r.o,r.E,r.F,r.O,r.N,r.i,r.j,r.S,r.s,r.H,r.n,r.q,r.r,r.fb,l.h,r.u],pipes:[a.c],styles:["ion-slides[_ngcontent-%COMP%]{height:170px}h1[_ngcontent-%COMP%], p[_ngcontent-%COMP%]{width:100%}h1[_ngcontent-%COMP%]{font-size:35px!important}small[_ngcontent-%COMP%]{font-size:1em}ion-input[_ngcontent-%COMP%]{border:solid;border-radius:5px}.w-70[_ngcontent-%COMP%]{width:70%}ion-slide[_ngcontent-%COMP%]   .bg-primary[_ngcontent-%COMP%]{background-color:#3880ff;color:#fff}ion-slide[_ngcontent-%COMP%]   .dashboard-values[_ngcontent-%COMP%]{border-radius:10px;padding:20px}.d-flex[_ngcontent-%COMP%]{display:flex}.banco[_ngcontent-%COMP%], .justify-content-center[_ngcontent-%COMP%]{justify-content:center}.banco[_ngcontent-%COMP%]{height:90px;width:120px;margin:auto;border-radius:10px;display:flex;align-items:center;text-align:center}.banco[_ngcontent-%COMP%]   ion-text[_ngcontent-%COMP%]{font-weight:500}.banco[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:50px!important}.fake-skeleton[_ngcontent-%COMP%]{width:60%}ion-card[_ngcontent-%COMP%]{padding:5px;width:80%;border-radius:10px}.bg-bradesco[_ngcontent-%COMP%]{background:url(bg-bradesco.81d731edab2aa60fe41f.jpg);background-size:cover;background-repeat:no-repeat;background-position:50%}.bg-santander[_ngcontent-%COMP%]{background:url(bg-santander.310762e807b6cd3be4f4.png);background-size:cover;background-repeat:no-repeat;background-position:50%}.bg-banco_do_brasil[_ngcontent-%COMP%]{background:url(bg-banco_do_brasil.51c51558382e7e5fa2f9.png);background-size:cover;background-repeat:no-repeat;background-position:50%}.bg-wallet[_ngcontent-%COMP%]{background:url(bg-wallet.2b983f5ddedc8ac2a9ad.jpg);background-size:cover;background-repeat:no-repeat;background-position:50%}.swiper-pagination[_ngcontent-%COMP%]{bottom:-2px}"]}),e})()}];let g=(()=>{class e{}return e.\u0275mod=c["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=c["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[l.i.forChild(m)],l.i]}),e})();var v=n("LPYB"),p=n("5eXZ");let b=(()=>{class e{}return e.\u0275mod=c["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=c["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[a.b,o.a,r.X,g,v.b,p.MomentModule]]}),e})()}}]);