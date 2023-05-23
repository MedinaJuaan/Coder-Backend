const socket = io();

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("form-title").value;
  const description = document.getElementById("form-desc").value;
  const price = document.getElementById("form-price").value;
  const code = document.getElementById("form-code").value;
  const stock = document.getElementById("form-stock").value;
  const image = document.getElementById("form-imgurl").value;

  const newProduct = {
    title,
    description,
    price: parseInt(price),
    code,
    stock: parseInt(stock),
    image,
  };
  socket.emit("newProduct", newProduct);
  form.reset();
});

socket.on("arrayOfProducts", (products) => {
  const list = document.getElementById("product-list");
  let productList = "";
  products.forEach((p) => {
    productList += `<ul>
                    <img src=${p.image}>
                    <li>Nombre: ${p.title}</li>
                    <li>Descripción: ${p.description}</li>
                    <li>Precio: ${p.price}</li>
                    <li>Código: ${p.code}</li>
                    <li><button onclick="deleteProduct(${p.id})">Borrar</button></li>
                </ul>`;
  });
  list.innerHTML = productList;
});

deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};
