const fs = require("fs");
const express = require("express");

const app = express();

// let readData = fs.readFileSync("./orders.json");

// let orders = JSON.parse(readData);

let orders = require("./orders.json");

app.get("/orders", (req, res, next) => {
  let result = [];
  let items = [];
  for (order in orders.orders) {
    for (item in orders.orders[order].items) {
      items += [
        orders.orders[order].items[item].name,
        orders.orders[order].items[item].price,
        orders.orders[order].items[item].total,
        " "
      ];
    }
    result += [
      orders.orders[order].customer,
      orders.orders[order].address.latitude,
      orders.orders[order].address.longitude,
      orders.orders[order].items.length,
      items,
      orders.orders[order].total,
      orders.orders[order].discount,
      orders.orders[order].totalAfterDiscount,
      " "
    ];
    items = [];
  }
  res.json({ result: result });
});

app.listen(8000);
