const Pet = () => {
  return React.createElement("div", {}, [
    React.createElement("h2", {}, "Tabby"),
    React.createElement("h3", {}, "Cat"),
    React.createElement("h3", {}, "Common Short Hair"),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", { id: "my-brand" }, "Adopt Me!"),
    React.createElement(Pet),
    React.createElement(Pet),
    React.createElement(Pet),
  ]);
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
