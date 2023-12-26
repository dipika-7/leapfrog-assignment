var y=Object.defineProperty;var T=(t,e,n)=>e in t?y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var c=(t,e,n)=>(T(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const I="0123456789",B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",w=8;function C(t){const e=B+I;let n="";for(let s=0;s<t;s++)n+=e.charAt(Math.floor(Math.random()*e.length));return n}class b{constructor(e="",n=!1){c(this,"id");c(this,"value");c(this,"completed");c(this,"setValue",e=>{this.value=e});c(this,"getValue",()=>this.value);c(this,"setCompleted",e=>{this.completed=e});c(this,"getCompleted",()=>this.completed);c(this,"toogleCompleted",()=>{this.completed=!this.completed});this.id=C(w),this.value=e,this.completed=n}}class E{constructor(e){c(this,"list");c(this,"addTask",e=>(this.list.push(e),this.list));c(this,"getTaskById",e=>this.list.find(n=>n.id===e)||null);c(this,"getTaskByIndex",e=>this.list[e]||null);this.list=e||[]}}const a=document.getElementById("inputSection"),u=document.getElementById("icon"),m=document.getElementById("searchSection"),p=document.getElementById("completed-task"),f=document.getElementById("remaining-task"),h=document.getElementById("allTask"),g=document.getElementById("list"),d=new E,M=t=>{const e=new b(t);return d.addTask(e),e},k=t=>{const e=d.getTaskById(t);if(!e)throw new Error(`taskId  ${k} not found`);return e&&e.toogleCompleted(),e};function O(t,e=""){const n=t.list.filter(s=>s.value.toLowerCase().includes(e.toLowerCase()));return new E(n)}const l=t=>{if(!g)throw new Error("DOM element not found");g.innerHTML="",t.list.forEach(e=>{const n=document.createElement("div");n.className="task-item",n.style.borderBottom="1px solid black",g.appendChild(n);const s=document.createElement("li");s.style.padding="20px 0",n.appendChild(s),s.innerHTML=e.value;const o=document.createElement("div");n.appendChild(o);const r=document.createElement("input");r.type="checkbox",r.addEventListener("change",()=>{k(e.id)}),e.completed?r.checked=!0:r.checked=!1,o.appendChild(r);const i=document.createElement("button");i.innerHTML="Delete",i.setAttribute("class","btn"),i.addEventListener("click",()=>{x(t,e.id)}),o.appendChild(i)})},x=(t,e)=>{const n=t.list.findIndex(s=>s.id==e);t.list.splice(n,1),d.list.splice(n,1),l(t)};m==null||m.addEventListener("input",t=>{var s;const e=(s=t.target)==null?void 0:s.value,n=O(d,e);l(n)});const v=t=>{var n,s;((n=t.target)==null?void 0:n.value)!==""&&(M((s=t.target)==null?void 0:s.value),l(d),t.target.value="")};a==null||a.addEventListener("change",v);u==null||u.addEventListener("click",v);function L(t,e=!0){const n=t.list.filter(s=>s.completed===e);return new E(n)}p==null||p.addEventListener("click",()=>{const t=L(d,!0);l(t)});f==null||f.addEventListener("click",()=>{const t=L(d,!1);l(t)});h==null||h.addEventListener("click",()=>{l(d)});