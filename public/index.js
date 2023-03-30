const host = "http://localhost:80"


const renderReviewComponent = ({user, movie, rating, container}) => {

  const $reviewComponent = document.createElement("li");

  $reviewComponent.classList.add("review");

  $reviewComponent.innerHTML = `
                    <span class="user">Diego</span>
                    <span class="movie">Call me by your name</span>
                    <div class="stars-container">
                    </div>
              
  `;

  $reviewComponent.querySelector(".user").innerText = user;
  $reviewComponent.querySelector(".movie").innerText = movie;
  renderStars({rating, container: $reviewComponent.querySelector(".stars-container")})
  
  container.appendChild($reviewComponent)
}


const renderStars = ({rating, container}) => {
  const $starsFragment = document.createDocumentFragment();
  for(let i = 0; i < rating; i++){
    const $star = document.createElement("span");
    $star.classList.add("star")
    $starsFragment.appendChild($star)
  }
  container.appendChild($starsFragment)
}


const renderReviewList = (list) => {
  const $fragment = document.createDocumentFragment()
  list?.forEach(review => {
    renderReviewComponent({...review, container:$fragment})
  });
  document.querySelector(".reviews-list").appendChild($fragment)
}

const getReviews = async () => {
  try{
    const res = await fetch(`${host}/getReviews`)
    
    if(res.ok !== true) throw res

    const result = await res.json();
    
    renderReviewList(result)
  }catch(ex){
    alert("Ha ocurrido un error al obtener reviews.")
  }
}


document.querySelector("form").addEventListener("submit", async e => {
  e.preventDefault();

  const user = document.getElementById("txt-name").value;
  const movie = document.getElementById("txt-movie").value;
  const rating = document.getElementById("txt-rating").value;

  if(!(rating >= 0 && rating <= 5)) return alert("El rating debe ser entre 0 y 5.");
  console.log({user, movie, rating})
  try{
    const res = await fetch("/review", {
      method:"POST",
      body:JSON.stringify({user, movie, rating}),
      headers:{
        "Content-Type": "application/json"
      }
    });
    if(res?.ok !== true) throw res 
    //Inserción exitosa
    const $reviewsList = document.querySelector(".reviews-list")
    renderReviewComponent({user, movie, rating, container:$reviewsList})

    document.getElementById("txt-name").value = ""
    document.getElementById("txt-movie").value = ""
    document.getElementById("txt-rating").value = ""

  }catch(ex){
    alert("Ha ocurrido un error al insertar review.")
  }

})


getReviews()