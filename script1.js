const gridContainer = document.querySelector(".grid-container");
const watcher = document.querySelector(".intersection-watcher");
let url = "http://127.0.0.1:8000/api/admin/shopify/all-products";
let page = 1;
let headersList = {
  "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY3MTE1Nzk2MiwibmJmIjoxNjcxMTU3OTYyLCJqdGkiOiJqUGtMNmQ4YWRqaGFISVNGIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.5_MNE0xzGJSPhRBIaloytMBDaJqa26IeF5geTbYKPZ4"
 }
 
 const loader = document.getElementById("loader");
const fetchData = async () => {
  
  
  let result = await fetch(url + "?page=" + page++ , { 
    method: "GET",
    headers: headersList
  }
  );
  
  // const result = await fetch(url);
  let data = await result.json()
  return (data.data);
};

const addContent = async () => {
  let data = await fetchData()
  data.forEach(post => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <div class="card-container">
    <h2>${post.title}</h2>
    <img style="width:100px;" src="${post.image.src}" alt="">
    <p>₱${post.variants[0].price}</p> 
    <button class="ato-cart" value="${post.variants[0].id}" > Add to Cart 
    <span class="material-symbols-outlined btn-icon" >
    add_circle
    </span>
    </div>
    </button> `;
    gridContainer.appendChild(card); 
  });
  loader.classList.remove("show");
};
//  <img style="width:100px;" src="${post.image.src}" alt="">
// <p>${post.variants[0].price}</p> 
const handleIntersect = entries => {
  // console.log(entries);
  loader.classList.add("show");
  if (entries[0].isIntersecting) {
    addContent();
  }
  
};

const options = {
  // root: null
  // threshold: 1
  // rootMargin: "-20% 0px"
}
new IntersectionObserver(handleIntersect, options).observe(watcher);


// Ancienne façon de faire peu performante
// window.addEventListener("scroll", () => {
  
//   console.log(document.body.getBoundingClientRect());
// })