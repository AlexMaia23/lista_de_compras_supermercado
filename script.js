document
  .getElementById("addItemForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addItem();
  });

document.getElementById("resetButton").addEventListener("click", function () {
  resetList();
});

function addItem() {
  var itemInput = document.getElementById("itemInput");
  var priceInput = document.getElementById("priceInput");
  var quantityInput = document.getElementById("quantityInput");
  var item = itemInput.value.trim();
  var price = parseFloat(priceInput.value.replace(",", ".")); // Substitui a vírgula por ponto
  var quantity = parseInt(quantityInput.value);
  if (item === "" || isNaN(price) || isNaN(quantity)) return;

  var ul = document.getElementById("itemList");
  var li = document.createElement("li");

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    updateTotal();
  });

  var label = document.createElement("label");
  label.textContent =
    item + " - R$" + price.toFixed(2) + " (" + quantity + "x)";

  li.appendChild(checkbox);
  li.appendChild(label);
  ul.appendChild(li);

  itemInput.value = "";
  priceInput.value = "";
  quantityInput.value = "";

  updateTotal();
}

function updateTotal() {
  var total = 0;
  var items = document.querySelectorAll("#itemList li");
  items.forEach(function (item) {
    var isChecked = item.querySelector("input[type=checkbox]").checked;
    var priceMatch = item.textContent.match(/\d+(\.\d+)?/); // Modificado para aceitar números decimais
    var quantityMatch = item.textContent.match(/\d+(?=x)/);
    if (priceMatch && quantityMatch) {
      var price = parseFloat(priceMatch[0]); // Alterado para parseFloat
      var quantity = parseInt(quantityMatch[0]);
      if (!isNaN(price) && !isNaN(quantity)) {
        if (!isChecked) {
          total += price * quantity;
        }
      }
    }
  });

  var totalDiv = document.getElementById("total");
  totalDiv.textContent = "Total: R$" + total.toFixed(2); // Formata o total com duas casas decimais
}

function resetList() {
  var ul = document.getElementById("itemList");
  ul.innerHTML = ""; // Limpa o conteúdo da lista
  updateTotal(); // Atualiza o total para refletir a lista vazia
}
