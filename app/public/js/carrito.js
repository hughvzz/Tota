var carritoCava = [];
var sendSubtotal = null;
var sendTotal = null;

var printOrderBtns = function() {
  var newTr = $("<tr>").addClass("m-2 align-middle");
  var cancelarBtn = $("<button>").text("Cancelar").addClass("btn btn-sm btn-danger endBtn").attr("id", "cancelar");
  var comprarBtn = $("<button>").text("Comprar").addClass("btn btn-sm btn-success endBtn").attr("id", "comprar");
  var td1 = $("<td>").attr("colspan", "4").addClass("text-right");
  var td2 = $("<td>").addClass("text-center");
  td1.append(cancelarBtn);
  td2.append(comprarBtn);
  newTr.append(td1, td2);
  $("#tableCavaBody").append(newTr);
}

var printTotal = function(subtotal) {
  var total = subtotal * 1.16
  sendTotal = parseFloat(total);
  var newTr = $("<tr>").addClass("m-2 align-middle");
  var td1 = $("<td>").text("Total").attr("colspan", "3").addClass("text-right");
  var td2 = $("<td>").text("$" + total.toFixed(2)).addClass("text-center");
  var td3 = $("<td>").text("-").addClass("text-center");
  newTr.append(td1, td2, td3);
  $("#tableCavaBody").append(newTr);
  printOrderBtns();
};

var printSubtotal = function() {
  var subtotal = null;
  for (i = 0; i < carritoCava.length; i++) {
    subtotal += carritoCava[i].precio * carritoCava[i].cantidad;
  }
  var newTr = $("<tr>").addClass("m-2 align-middle");
  var td1 = $("<td>").text("Subtotal").attr("colspan", "3").addClass("text-right");
  var td2 = $("<td>").text("$" + subtotal.toFixed(2)).addClass("text-center");
  var td3 = $("<td>").text("-").addClass("text-center");
  newTr.append(td1, td2, td3);
  $("#tableCavaBody").append(newTr);
  sendSubtotal = parseFloat(subtotal);
  printTotal(subtotal);
};

var printCarrito = function() {
  $("#tableCavaBody").empty();
  for (i = 0; i < carritoCava.length; i++) {
    var subtotal = carritoCava[i].cantidad * carritoCava[i].precio;
    var total = (subtotal * 1.16).toFixed(2);
    carritoCava[i].subtotal = parseFloat(subtotal);
    carritoCava[i].total = parseFloat(total);
    var newTr = $("<tr>").addClass("m-2 align-middle");
    var td1 = $("<td>").text(i + 1).addClass("text-center");
    var menosBtn = $("<button>").text("-").addClass("btn btn-sm btn-danger menosBtn m-1 d-inline-block").attr("id", "menos-" + i);
    var inputDiv = $("<div>").addClass("input-group input-group-sm text-center col-3 d-inline-block");
    var cantInput = $("<input>").attr("type", "text").addClass("text-center form-control w-100 cantInput").val(carritoCava[i].cantidad);
    cantInput.attr("aria-describedby", "inputGroup-sizing-sm").attr("id", "input-" + i);
    var masBtn= $("<button>").text("+").addClass("btn btn-sm btn-success masBtn m-1 d-inline-block").attr("id","mas-" + i);
    var td2 = $("<td>").addClass("text-center");
    var td3 = $("<td>").text(carritoCava[i].nombre).addClass("text-center");
    var td4 = $("<td>").text("$" + subtotal.toFixed(2)).addClass("text-center");
    var td5 = $("<td>").addClass("text-center");
    var delBtn = $("<button>").text("X").addClass("btn btn-sm btn-danger delBtn").attr("id", "del-" + i);
    inputDiv.append(cantInput);
    td2.append(menosBtn, inputDiv, masBtn);
    td5.append(delBtn);
    newTr.append(td1, td2, td3, td4, td5);
    $("#tableCavaBody").append(newTr);
   
  }
  printSubtotal();
};

var clearCarrito = function() {
  $("#tableCavaBody").empty();
  carritoCava = [];
  sendSubtotal = null;
  sendTotal = null;
};

$(".card-body").on("click", ".prodBtn", function() {
  var exists = false;
  console.log(this);
  for (i = 0; i < carritoCava.length; i++) {
    if (this.id == carritoCava[i].id) {
      exists = true;
    }
  }
  if (!exists) {
    $.ajax({
      url: "api/prodbtn/" + this.id,
      method: "GET"
    }).then(function(objProd) {
      objProd.cantidad = 1;
      carritoCava.push(objProd);
      printCarrito();
    });
  }
});

$("#tableCavaBody").on("click", ".menosBtn", function(){
  var index = this.id.split("-")[1];
  if (carritoCava[index].cantidad > 1) {
    carritoCava[index].cantidad--;
    printCarrito();
  }
});

$("#tableCavaBody").on("click", ".masBtn", function(){
  var index = this.id.split("-")[1];
  carritoCava[index].cantidad++;
  printCarrito();
});

$("#tableCavaBody").on("keyup blur", ".cantInput", function(e) {
  var key = e.originalEvent.keyCode;
  if (key === 13 || e.type === "focusout") {
    var index = this.id.split("-")[1];
    var inputValue = this.value.replace(/[^\0-9]/ig, "").trim();
    inputValue = inputValue.replace(/ +/g, "");
    if (parseInt(inputValue) <= 0 || inputValue == "") {
      carritoCava[index].cantidad = 1;
      printCarrito();
    } else {
      carritoCava[index].cantidad = parseInt(inputValue);
      printCarrito();
    }
  }
});

$("#tableCavaBody").on("click", ".delBtn", function() {
  var index = this.id.split("-")[1];
  carritoCava.splice(index, 1);
  printCarrito();
});

$("#tableCavaBody").on("click", ".endBtn", function() {
  if (this.id === "comprar") {
    var sendObj = {
      carrito: carritoCava,
      subtotal: sendSubtotal,
      total: sendTotal
    };
    $.post("/api/nuevopedido", sendObj, function() {
      clearCarrito();
      window.location.href = "/micava";
    });
  } else {
    clearCarrito();
  }
});
