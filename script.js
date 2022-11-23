const gridContainer = document.querySelector(".grid-container");
const watcher = document.querySelector(".intersection-watcher");
let url = "http://127.0.0.1:8000/api/devprod/";
let page = 1;

const fetchData = async () => {

  // const result = await fetch(url + "?page="+ page++);
  const result = await fetch(url);
  const data = await result.json();

  // return (data.data);  
  return (data);  

};

const addContent = async () => {
  const data = await fetchData()
  data.forEach(post => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
    <div class="card-container">
    <h2>${post.title}</h2>
    <img style="width:100px;" src="${post.image.src}" alt="">
    <p>${post.variants[0].price}</p> 
    <button class="ato-cart"> Add to Cart 
    <span class="material-symbols-outlined btn-icon">
    add_circle
    </span>
    </div>
    </button> `;
    gridContainer.appendChild(card); 
  });
};

const handleIntersect = entries => {
  // console.log(entries);
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