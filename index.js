const characterList = document.getElementById('characterList')
const searchBar = document.getElementById('searchBar')
const fragment = document.createDocumentFragment();
const labelNombre= document.getElementById('nombre')
const labelActor = document.getElementById('actor')
const labelCasa= document.getElementById('casa')
const labelPatronus= document.getElementById('patronus')
const select_list = document.getElementById('select1')
const select_list2 = select_list.value
const limpiarInput= document.getElementById('limpiarButton')


let data = []

const apiharry = async () => {
    try{
        const res = await fetch('http://hp-api.herokuapp.com/api/characters')
        data = await res.json()
        console.log(data)
        seleccionar()

    }catch(error){
        console.log(error)
    }
}


//-----pintar listados --------------//
const pintarCharacters = characters =>{

    
    const templateString = characters.map(characters =>{
                return `
            <li>
                <div class="datos">
                    <h2 class="entradas">${characters.name}</h2>
                    <p class="entradas">${characters.actor}</p>
                    <p class="entradas">${characters.house}</p>
                    <p class="entradas">${characters.patronus}</p>
                </div>
                    <img src="${characters.image}" alt="">
            </li>    
        `

        }).join('');   

    characterList.innerHTML = templateString;


}

const pintarCharacters2 = characters =>{

    
    const templateString = characters.map(characters =>{
                return `
            <li id="li2">
                <div class="datos2">
                    <h2 class="entradas2">${characters.name}</h2>
                    <p class="entradas2">${characters.actor}</p>
                    <p class="entradas2">${characters.house}</p>
                    <p class="entradas2">${characters.patronus}</p>
                </div>
              
            </li>    
        `

        }).join('');   

    characterList.innerHTML = templateString;


}


//-----------------------------------------//
apiharry()

searchBar.addEventListener('keyup', (e)=>{
    const escucha = e.target.value.toLowerCase()
    const filteredCharacters = data.filter(characters=>{
        return(
            characters.name.toLowerCase().includes(escucha) ||
            characters.house.toLowerCase().includes(escucha) ||
            characters.actor.toLowerCase().includes(escucha) 

        )


    })

    if(select_list.value === 'Cards'){
        pintarCharacters(filteredCharacters)
      }else if(select_list.value === 'List'){
 
        pintarCharacters2(filteredCharacters)
      }
   

})


characterList.addEventListener('click' , e=>{
    if(e.target.classList.contains('entradas')){
        //console.log(e.target.parentElement)
        llenarForm(e.target.parentElement)
    }
    
})
characterList.addEventListener('click' , e=>{
    if(e.target.classList.contains('entradas2')){
        //console.log(e.target.parentElement)
        llenarForm(e.target.parentElement)
    }
    
})



const llenarForm = e =>{

    const producto ={
        nombre: e.querySelector('h2').textContent,
        actor: e.querySelectorAll('p')[0].textContent,
        casa: e.querySelectorAll('p')[1].textContent,
        patronus: e.querySelectorAll('p')[2].textContent
    }
    
    labelNombre.value = producto.nombre
    labelActor.value = producto.actor
    labelCasa.value = producto.casa
    labelPatronus.value= producto.patronus

}

function seleccionar(){
    if(select_list.value === 'Cards'){
      console.log(select_list.value)
      pintarCharacters(data)
    }else if(select_list.value === 'List'){
        pintarCharacters2(data)

    }

}

limpiarInput.addEventListener('click' , ()=>{
    labelNombre.value = ""
    labelActor.value =""
    labelCasa.value = ""
    labelPatronus.value= ""

})