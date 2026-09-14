const products=[
{name:"طقم ألوان خشب 24 لون",price:85,cat:"الأدوات المدرسية",tag:"جديد",icon:"🖍️"},
{name:"شنطة مدرسية للأطفال",price:320,cat:"الأدوات المدرسية",tag:"جديد",icon:"🎒"},
{name:"سيارة ريموت كنترول",price:250,cat:"الألعاب",tag:"الأكثر مبيعًا",icon:"🚗"},
{name:"طقم أدوات هندسية",price:65,cat:"الأدوات المدرسية",tag:"",icon:"📐"},
{name:"دبدوب صغير",price:180,cat:"الألعاب",tag:"جديد",icon:"🧸"},
{name:"كراسة مدرسية",price:25,cat:"الأدوات المدرسية",tag:"",icon:"📓"},
{name:"مكعبات تركيب",price:140,cat:"الألعاب",tag:"",icon:"🧱"},
{name:"مقلمة أطفال",price:75,cat:"الأدوات المدرسية",tag:"جديد",icon:"🖊️"},
{name:"كرة أطفال",price:90,cat:"الألعاب",tag:"عرض",icon:"⚽"},
{name:"ألوان فلوماستر",price:55,cat:"الأدوات المدرسية",tag:"عرض",icon:"🖌️"}
];
let cart=JSON.parse(localStorage.getItem("mamaZozoCart")||"[]"), currentFilter="الكل";
const grid=document.getElementById("productsGrid");
function render(){let q=document.getElementById("search").value.trim();let list=products.filter(p=>(currentFilter==="الكل"||p.cat===currentFilter||(currentFilter==="الجديد"&&p.tag==="جديد")||(currentFilter==="العروض"&&p.tag==="عرض"))&&(!q||p.name.includes(q)));grid.innerHTML=list.map((p,i)=>`<article class="product"><div class="pic">${p.icon}</div><div class="info">${p.tag?`<span class="tag">${p.tag}</span>`:""}<h3>${p.name}</h3><div class="price">${p.price} جنيه</div><button class="add" onclick="addToCart('${p.name}')">🛒 أضف للسلة</button></div></article>`).join("")||"<p>مفيش منتجات مطابقة للبحث.</p>";updateCart();}
function addToCart(name){let x=cart.find(i=>i.name===name);x?x.qty++:cart.push({name,qty:1});save();alert("تمت إضافة المنتج للسلة ✅");}
function save(){localStorage.setItem("mamaZozoCart",JSON.stringify(cart));updateCart();}
function updateCart(){document.getElementById("cartCount").textContent=cart.reduce((a,b)=>a+b.qty,0);}
function openCart(){document.getElementById("cartModal").classList.remove("hidden");let box=document.getElementById("cartItems");box.innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-row"><span>${x.name}<br><b>${products.find(p=>p.name===x.name).price*x.qty} جنيه</b></span><span class="qty"><button onclick="changeQty(${i},-1)">−</button>${x.qty}<button onclick="changeQty(${i},1)">+</button></span></div>`).join(""):"<p>السلة فاضية حاليًا.</p>";document.getElementById("cartTotal").textContent=cart.reduce((a,x)=>a+products.find(p=>p.name===x.name).price*x.qty,0);}
function closeCart(){document.getElementById("cartModal").classList.add("hidden")}
function changeQty(i,n){cart[i].qty+=n;if(cart[i].qty<=0)cart.splice(i,1);save();openCart();}
function checkout(){if(!cart.length)return alert("السلة فاضية.");alert("الخطوة التالية: هنضيف بيانات العميل ورقم واتساب المحل هنا.");}
function filterProducts(f){currentFilter=f;render();document.getElementById("products").scrollIntoView({behavior:"smooth"});}
document.getElementById("search").addEventListener("input",render);render();