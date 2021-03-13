// element li bch n7ottou fih products mte3na
productList = document.getElementsByClassName("product-list")[0]

// el fonction li bech traj3elna template mta3 el card
function ProductCard(id, image, category, name, price, color){
    var card  = document.createElement("div")
    
    card.className = "product-card"
    card.setAttribute('id',id)

    card.innerHTML = `
    <div class="product-tumb">
        <img src="${image}" alt="">
    </div>
    <div class="product-details">
        <span class="product-catagory"${category}</span>
        <h4><a href="">${name}</a></h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
        <div class="product-bottom-details">
            <div class="product-price">${price}$</div>
            <div class="product-color">COLOR: ${color}</div>
            <div class="product-links">
                <a class="remove" href=""><i class="fa fa-trash"></i></a>
                <a class="edit"  data-toggle="modal" data-target="#Updateform" href=""><i class="fa fa-edit"></i></a>
            </div>
        </div>
    </div>
    `
    // jibli el btn mta3 el remove w kiyenwel 3lih 5admali el fonction eli lde5el
    card.getElementsByClassName("remove")[0].addEventListener('click', function(e) {
        // preventDefault() bch ma trelodich el page
        e.preventDefault()
        // fase5 el card mel productList
        productList.removeChild(card)
      })

    // jibli el btn mta3 el edit w kiyenwel 3lih 5admali el fonction eli lde5el
    card.getElementsByClassName("edit")[0].addEventListener('click', function(e) {
        // preventDefault() bch ma trelodich el page
        e.preventDefault()
        // updateCard el parametre fihom el info mta3 el card mte3na bch yjiw nafshom fel form mta3 el update
        UpdateCard(id, image, category, name, price, color)
    })

    return card
}


function AddProduct(){
    // jibli el Addform wel value mta3 el inputs eli fih 
    var form = document.forms['Addform'];
    var name = form["name"].value
    var image = form["image"].value
    var category = form["category"].value
    var price = form["price"].value
    var color = form["color"].value
    var id = document.getElementsByClassName("product-card").length ++
    // a3mel card bel value hathoukom
    var card = ProductCard(id, image, category, name, price, color)
    // zidou lel productList
    productList.appendChild(card)

}

// el fonction eli bch t7oy el values mta3 el product fel update form w tupdati el product ki tenzel submit
function UpdateCard(id, image, category, name, price, color){
    // jib el form w badel el inputs values bel info mta3 el card
    var form = document.forms['Updateform'];
    form["name"].value = name
    form["image"].value = image
    form["category"].value = category
    form["price"].value = price
    form["color"].value = color

    // ki yenzel submit 5adem el fonction 
    btn = form.querySelector("button")
    btn.addEventListener("click", function(){
        // 3awed jib el form bel values el jdod
        var form = document.forms['Updateform'];
        var name = form["name"].value
        var image = form["image"].value
        var category = form["category"].value
        var price = form["price"].value
        var color = form["color"].value
        // jib el product eli 9a3ed nbadel fih
        // + a3mali card jdida 
        // + badel mta3 el card jdida bel 9dima
        var oldCard = document.getElementById(id)
        var newCard = ProductCard(id, image, category, name, price, color)
        productList.replaceChild(newCard, oldCard)
    })
}

// fetch : check this : https://youtu.be/cuEtnrL9-H0
// for quick promise (.then) video check this: https://youtu.be/RvYYCGs45L4
var products = fetch("clothes.json").then( response => response.json() )

// iteration 3al data mte3na
products.then(data => 
    data.forEach(product => {
        // a3mel card bkol produit jé mel data w zidou fel list
        var card = ProductCard(product.id, product.image, product.category, product.name, product.price, product.color)
        productList.appendChild(card)
    })
)