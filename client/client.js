const form=document.querySelector('form')
const loading=document.querySelector('.loading')
const row=document.querySelector('.row')
const POST_URL="http://localhost:3000/mews"
isAlldata()
loading.style.display='none'
form.addEventListener("submit",(e)=>{
  e.preventDefault()
const formdata=new FormData(form)
const name=formdata.get("name")
const content=formdata.get("content")
const newdata={
  name,
  content
}
loading.style.display=''
form.style.display='none'
fetch(POST_URL, {
  method: "POST", // 
  body: JSON.stringify(newdata), 
  headers: {
    "Content-Type": "application/json" 
  }
}).then((res)=>res.json())
.then((data)=>{
  console.log(data)
  loading.style.display='none'
form.style.display=''


})

})
function isAlldata(){
  fetch(POST_URL, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => {
      let item = '';
      data.forEach(items => {
        item += `
          <div class="col-sm-6 mb-3 mb-sm-0">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${items.name}</h5>
                <p class="card-text">${items.content}</p>
                <a href="#" class="btn btn-primary">Like</a>
                 <a href="#" class="btn btn-primary">DisLike</a>
              </div>
            </div>
          </div>`;
      });
      row.innerHTML = item;
    })
    .catch(err => console.error('Error:', err));
  

}