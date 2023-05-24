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
    productList += `<div id="product-list" class="row gx-5">
    <div class="container">
    <table class="table table-striped" id="product-list">
    <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Código</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="${p.image}" class="img-thumbnail" alt="..." />
            </td>
            <td>${p.title}</td>
            <td>${p.description}</td>
            <td>${p.price}</td>
            <td>${p.code}</td>
            <td>
              <button onclick="deleteProduct(${p.id})" class="btn btn-danger">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>`;
  });
  list.innerHTML = productList;
});

deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};
