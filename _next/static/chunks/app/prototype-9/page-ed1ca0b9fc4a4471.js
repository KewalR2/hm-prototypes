(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1925],{187:(e,t,r)=>{"use strict";r.d(t,{default:()=>i});var a=r(5155),s=r(2115);function i(){let[e,t]=(0,s.useState)("dark"),[r,i]=(0,s.useState)("default"),[l,n]=(0,s.useState)(!1);(0,s.useEffect)(()=>{let e=localStorage.getItem("theme"),r=localStorage.getItem("colorTheme");e?t(e):t(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),r&&i(r)},[]),(0,s.useEffect)(()=>{let t=document.documentElement;"dark"===e?t.classList.add("dark"):t.classList.remove("dark"),t.classList.remove("theme-blue","theme-green","theme-purple","theme-orange"),"default"!==r&&t.classList.add("theme-".concat(r)),localStorage.setItem("theme",e),localStorage.setItem("colorTheme",r)},[e,r]);let o=e=>{i(e),n(!1)};return(0,a.jsx)("div",{className:"relative",children:(0,a.jsxs)("div",{className:"flex gap-2",children:[(0,a.jsx)("button",{onClick:()=>{t("light"===e?"dark":"light")},className:"flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors","aria-label":"dark"===e?"Switch to light mode":"Switch to dark mode",children:"dark"===e?(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5",children:[(0,a.jsx)("circle",{cx:"12",cy:"12",r:"5"}),(0,a.jsx)("line",{x1:"12",y1:"1",x2:"12",y2:"3"}),(0,a.jsx)("line",{x1:"12",y1:"21",x2:"12",y2:"23"}),(0,a.jsx)("line",{x1:"4.22",y1:"4.22",x2:"5.64",y2:"5.64"}),(0,a.jsx)("line",{x1:"18.36",y1:"18.36",x2:"19.78",y2:"19.78"}),(0,a.jsx)("line",{x1:"1",y1:"12",x2:"3",y2:"12"}),(0,a.jsx)("line",{x1:"21",y1:"12",x2:"23",y2:"12"}),(0,a.jsx)("line",{x1:"4.22",y1:"19.78",x2:"5.64",y2:"18.36"}),(0,a.jsx)("line",{x1:"18.36",y1:"5.64",x2:"19.78",y2:"4.22"})]}):(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5",children:(0,a.jsx)("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})})}),(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("button",{onClick:()=>n(!l),className:"flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors","aria-label":"Change color theme",children:(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-5 h-5",children:[(0,a.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,a.jsx)("path",{d:"M16 12a4 4 0 1 1 -8 0"}),(0,a.jsx)("path",{d:"M12 16a4 4 0 1 1 0 -8"}),(0,a.jsx)("path",{d:"M12 8a4 4 0 1 1 0 8"})]})}),l&&(0,a.jsx)("div",{className:"absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700 animate-fade-in-up",children:(0,a.jsx)("ul",{children:[{id:"default",name:"Default",color:"#0070f3"},{id:"blue",name:"Blue",color:"#2563eb"},{id:"green",name:"Green",color:"#10b981"},{id:"purple",name:"Purple",color:"#8b5cf6"},{id:"orange",name:"Orange",color:"#f97316"}].map(e=>(0,a.jsx)("li",{children:(0,a.jsxs)("button",{onClick:()=>o(e.id),className:"flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ".concat(r===e.id?"text-primary font-medium":"text-gray-700 dark:text-gray-200"),children:[(0,a.jsx)("span",{className:"w-3 h-3 rounded-full mr-2",style:{backgroundColor:e.color}}),e.name,r===e.id&&(0,a.jsx)("svg",{className:"w-4 h-4 ml-auto",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 13l4 4L19 7"})})]})},e.id))})})]})]})})}},1531:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var a=r(5155),s=r(6874),i=r.n(s),l=r(5695),n=r(6413),o=r(187);function d(){(0,l.useRouter)();let e={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.2}}},t={hidden:{y:20,opacity:0},visible:{y:0,opacity:1,transition:{type:"spring",stiffness:100,damping:10}}},r={hidden:{scale:.95,opacity:0},visible:{scale:1,opacity:1,transition:{type:"spring",stiffness:100}},hover:{scale:1.03,boxShadow:"0 10px 25px rgba(0, 0, 0, 0.1)",transition:{type:"spring",stiffness:400,damping:10}}};return(0,a.jsxs)("div",{className:"min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800",children:[(0,a.jsx)("div",{className:"absolute top-4 right-4",children:(0,a.jsx)(o.default,{})}),(0,a.jsxs)("main",{className:"container mx-auto px-4 py-12",children:[(0,a.jsxs)(n.P.section,{className:"mb-20 text-center",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},children:[(0,a.jsx)(n.P.h1,{className:"text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500",initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{delay:.2,duration:.8},children:"Interactive Material Quotes"}),(0,a.jsx)(n.P.p,{className:"text-xl mb-10 max-w-3xl mx-auto text-gray-600 dark:text-gray-300",initial:{opacity:0},animate:{opacity:1},transition:{delay:.4,duration:.8},children:"A step-by-step guided approach to requesting quotes and tracking orders with beautiful animations and a modern UI experience."}),(0,a.jsxs)(n.P.div,{className:"flex flex-col sm:flex-row gap-4 justify-center",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.6,duration:.8},children:[(0,a.jsx)(i(),{href:"/prototype-9/questions",children:(0,a.jsx)(n.P.button,{className:"bg-primary hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all",whileHover:{scale:1.05},whileTap:{scale:.98},children:"Start a New Quote"})}),(0,a.jsx)(i(),{href:"/prototype-9/tracker",children:(0,a.jsx)(n.P.button,{className:"bg-transparent border-2 border-primary text-primary hover:bg-primary/5 font-bold py-4 px-8 rounded-lg text-lg transition-all",whileHover:{scale:1.05},whileTap:{scale:.98},children:"Track My Order"})})]})]}),(0,a.jsxs)(n.P.section,{className:"mb-20",variants:e,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.2},children:[(0,a.jsx)(n.P.h2,{className:"text-3xl font-bold mb-12 text-center",variants:t,children:"A Modern, Intuitive Experience"}),(0,a.jsxs)("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-8",children:[(0,a.jsxs)(n.P.div,{className:"bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700",variants:r,whileHover:"hover",children:[(0,a.jsx)("div",{className:"h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6",children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8 text-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,a.jsx)("h3",{className:"text-xl font-bold mb-3",children:"Step-by-Step Guidance"}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Intuitive question flow that simplifies the complex process of ordering construction materials."})]}),(0,a.jsxs)(n.P.div,{className:"bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700",variants:r,whileHover:"hover",children:[(0,a.jsx)("div",{className:"h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6",children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8 text-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 6v6m0 0v6m0-6h6m-6 0H6"})})}),(0,a.jsx)("h3",{className:"text-xl font-bold mb-3",children:"Fluid Animations"}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Smooth, engaging animations create a delightful user experience while moving through each step."})]}),(0,a.jsxs)(n.P.div,{className:"bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700",variants:r,whileHover:"hover",children:[(0,a.jsx)("div",{className:"h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6",children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8 text-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})}),(0,a.jsx)("h3",{className:"text-xl font-bold mb-3",children:"Progress Tracking"}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Clear visual indicators of your progress with the ability to revisit previous steps."})]}),(0,a.jsxs)(n.P.div,{className:"bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700",variants:r,whileHover:"hover",children:[(0,a.jsx)("div",{className:"h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6",children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8 text-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"})})}),(0,a.jsx)("h3",{className:"text-xl font-bold mb-3",children:"Transparent Pricing"}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Get real-time pricing updates as you make selections, with no hidden fees or surprises."})]}),(0,a.jsxs)(n.P.div,{className:"bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700",variants:r,whileHover:"hover",children:[(0,a.jsx)("div",{className:"h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6",children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8 text-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})})}),(0,a.jsx)("h3",{className:"text-xl font-bold mb-3",children:"Real-Time Order Tracking"}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Monitor your order status with live updates from quote to delivery with detailed timelines."})]}),(0,a.jsxs)(n.P.div,{className:"bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700",variants:r,whileHover:"hover",children:[(0,a.jsx)("div",{className:"h-14 w-14 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6",children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-8 w-8 text-primary",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})})}),(0,a.jsx)("h3",{className:"text-xl font-bold mb-3",children:"Mobile Optimized"}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Perfect experience on any device, whether you're in the office or at the construction site."})]})]})]}),(0,a.jsx)(n.P.section,{className:"mb-20",initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.8},children:(0,a.jsxs)("div",{className:"bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 text-white relative overflow-hidden",children:[(0,a.jsx)("div",{className:"absolute top-0 right-0 w-1/3 h-full opacity-10",children:(0,a.jsx)("svg",{viewBox:"0 0 100 100",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("path",{fill:"white",d:"M95.8,30.6c-5.5-9.6-13.5-17.9-23-23.7C63.7,2.5,53.5-0.3,43.2,0c-10.3,0.3-20.3,3.4-28.9,8.9 C5.7,14.4-0.5,21.2-3.6,29.5c-3.1,8.2-3.3,17.5-0.7,26c2.6,8.5,7.6,16.2,14.4,22.1c6.8,5.9,15.2,10.1,24.2,12 c9,1.9,18.4,1.5,27.1-1c8.7-2.5,16.6-7.1,23-13.1c6.4-6,11.5-13.5,14.7-21.8C102.4,45.4,101.3,40.1,95.8,30.6z"})})}),(0,a.jsxs)("div",{className:"relative z-10",children:[(0,a.jsx)("h2",{className:"text-3xl font-bold mb-8 text-center",children:"What Our Customers Say"}),(0,a.jsxs)("div",{className:"max-w-3xl mx-auto",children:[(0,a.jsx)("svg",{className:"h-12 w-12 text-white opacity-50 mb-4",fill:"currentColor",viewBox:"0 0 32 32",children:(0,a.jsx)("path",{d:"M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"})}),(0,a.jsx)("p",{className:"text-xl italic mb-6",children:"The question-based approach made ordering complex materials so much simpler. I could answer one thing at a time instead of facing an overwhelming form. The animations made the whole process actually enjoyable!"}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl",children:"JD"}),(0,a.jsxs)("div",{className:"ml-4",children:[(0,a.jsx)("p",{className:"font-bold",children:"John Dempsey"}),(0,a.jsx)("p",{className:"text-blue-100",children:"Site Manager, Constructex"})]})]})]})]})]})}),(0,a.jsxs)(n.P.section,{className:"mb-20",variants:e,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.1},children:[(0,a.jsx)(n.P.h2,{className:"text-3xl font-bold mb-12 text-center",variants:t,children:"How It Works"}),(0,a.jsxs)("div",{className:"grid md:grid-cols-4 gap-8 relative",children:[(0,a.jsxs)("div",{className:"hidden md:block absolute top-24 left-[calc(12.5%+2px)] right-[calc(12.5%+2px)] h-0.5 bg-blue-200 dark:bg-blue-900 z-0",children:[(0,a.jsx)("div",{className:"absolute left-[33%] top-0 h-2 w-2 rounded-full bg-blue-500 -mt-0.5"}),(0,a.jsx)("div",{className:"absolute left-[66%] top-0 h-2 w-2 rounded-full bg-blue-500 -mt-0.5"})]}),(0,a.jsxs)(n.P.div,{className:"relative z-10 flex flex-col items-center text-center",variants:t,children:[(0,a.jsx)("div",{className:"h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-6",children:"1"}),(0,a.jsx)("h3",{className:"text-xl font-bold mb-3",children:"Answer Questions"}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Simply answer step-by-step questions about your project needs."})]}),(0,a.jsxs)(n.P.div,{className:"relative z-10 flex flex-col items-center text-center",variants:t,children:[(0,a.jsx)("div",{className:"h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-6",children:"2"}),(0,a.jsx)("h3",{className:"text-xl font-bold mb-3",children:"Receive Quote"}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Get an instant, detailed quote based on your specific requirements."})]}),(0,a.jsxs)(n.P.div,{className:"relative z-10 flex flex-col items-center text-center",variants:t,children:[(0,a.jsx)("div",{className:"h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-6",children:"3"}),(0,a.jsx)("h3",{className:"text-xl font-bold mb-3",children:"Confirm Order"}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Review and confirm your order with transparent pricing and timeline."})]}),(0,a.jsxs)(n.P.div,{className:"relative z-10 flex flex-col items-center text-center",variants:t,children:[(0,a.jsx)("div",{className:"h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-6",children:"4"}),(0,a.jsx)("h3",{className:"text-xl font-bold mb-3",children:"Track Delivery"}),(0,a.jsx)("p",{className:"text-gray-600 dark:text-gray-300",children:"Monitor your order status with real-time updates and delivery tracking."})]})]})]}),(0,a.jsxs)(n.P.section,{className:"text-center py-12",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.8},children:[(0,a.jsx)("h2",{className:"text-3xl font-bold mb-6",children:"Ready to get started?"}),(0,a.jsx)("p",{className:"text-lg mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300",children:"Create your first quote in minutes with our interactive guided experience."}),(0,a.jsx)(i(),{href:"/prototype-9/questions",children:(0,a.jsx)(n.P.button,{className:"bg-primary hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all",whileHover:{scale:1.05,boxShadow:"0 10px 25px rgba(0, 0, 0, 0.1)"},whileTap:{scale:.98},children:"Start Now"})})]})]})]})}},4248:(e,t,r)=>{Promise.resolve().then(r.bind(r,1531))}},e=>{var t=t=>e(e.s=t);e.O(0,[6874,9651,8441,1684,7358],()=>t(4248)),_N_E=e.O()}]);