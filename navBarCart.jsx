// Ex 3 - write out all items with their stock number
// provide a button and use onClick={moveToCart} to move 1 item into the Shopping Cart
// use React.useState to keep track of items in the Cart.
// use React.useState to keep track of Stock items
// list out the Cart items in another column
function NavBar({ stockitems }) {
  const [cart, setCart] = React.useState([]);
  const [stock, setStock] = React.useState(stockitems);
  const { Button } = ReactBootstrap;

  const moveToCart = e => {
    let [name, num] = e.target.innerHTML.split(":"); // innerHTML should be format name:3
    // use newStock = stock.map to find "name" and decrease number in stock by 1
    // only if instock is >=  do we move item to Cart and update stock
    
    let alreadyInCart = false;

    let newStock = stock.map((item, index) => {
      if (item.name == name && num > 0) {
        cart.forEach( (val, index) => {
          if (val.name == name) {
            cart[index].incart++;
            alreadyInCart = true;
          }
        });

        if (!alreadyInCart) {
          let newCart = [...cart, {"name":item.name, "incart":1}];
          setCart(newCart);
        }
        
        item.instock--;
      }
      return item;
    });
    setStock(newStock);
  };

  const updatedList = stock.map((item, index) => {
    return (
      <Button onClick={moveToCart} key={index}>
        {item.name}:{item.instock}
      </Button>
    );
  });

  const updatedCart = cart.map((item, index) => {
    return (
      <Button key={index}>
        {item.name}:{item.incart}
      </Button>
    );
  });
  

  // note that React needs to have a single Parent
  return (
    <>
      <ul style={{ listStyleType: "none" }}>{updatedList}</ul>
      <h1>Shopping Cart</h1>
      <ul style={{ listStyleType: "none" }}>{updatedCart}</ul>
    </>
  );
}


const menuItems = [
  { name: "apple", instock: 2 },
  { name: "pineapple", instock: 3 },
  { name: "pear", instock: 0 },
  { name: "peach", instock: 3 },
  { name: "orange", instock: 1 }
];


ReactDOM.render(
  <NavBar stockitems={menuItems} />,
  document.getElementById("root")
);
