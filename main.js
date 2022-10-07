const div = document.getElementById("div");
const caja = document.querySelector("#caja");

const buscarPokemon = async () => {
    const input = document.getElementById("input");
    const pokemon = input.value.toLowerCase();
    if(!pokemon) {
    //    return alert("Ingrese un Pokemon")
    return Swal.fire({
        title: 'Ingrese un Pokémon.',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })
    } 
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await res.json();
    console.log(data.id)
    
    const html = 
    ` 
    <div class="poke"> 
        <img  src="${data.sprites.other.home.front_default}"/>
        <h2>${data.name.toUpperCase()}</h2>
        <span class="exp">EXP: ${data.base_experience}</span>
        <div class="tipo-poke">
        ${data.types
          .map((tipo) => {
             return `<span class="${tipo.type.name} poke__type">${tipo.type.name}</span>`;
           })
           .join("")}
        </div>
        <p class="id-poke">#${data.id}</p>
        <p class="height">Altura: ${data.height / 10}m</p>
        <p class="weight">Peso: ${data.weight / 10}Kg</p>
    </div>
  `
    caja.innerHTML += html;
    input.value = ""
  } catch (error) {
    console.log(error)
    //return alert("Pokemon no encontrado")
    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Pokémon no encontrado',
      })
  }
}

const deleteAll = () => {
  caja.innerHTML = '';
}

// agregar el evento al boton
const btn = document.getElementById("btn");
const btnDelete = document.getElementById("btn-delete");
btn.addEventListener('click', buscarPokemon)
btnDelete.addEventListener('click', deleteAll)

