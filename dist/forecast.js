"use strict";(self.webpackChunkweather_app=self.webpackChunkweather_app||[]).push([[438],{552:(e,a,s)=>{async function t(e){const a=document.getElementsByClassName("forecast-day"),s=await e;for(let e=0;e<a.length;e+=1){const t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][((new Date).getDay()+e+1)%7];a[e].innerHTML=`<h2>${t}</h2> <div class="forecast-temp"> ${s[e]}&#176; </div>`}}s.d(a,{Z:()=>t})}},e=>{e(e.s=552)}]);