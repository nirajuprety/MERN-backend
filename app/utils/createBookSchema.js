function createAuthorSchema(name, value) {
  switch (name) {
    case "name":
      if (value === "") return "Name is required";
      else return false;
    case "price":
      if (value === "") return "Price is required";
      else return false;
    case "category":
      if (value === "") return "Category is required";
      else return false;
    case "author":
      if (value === "") return "Author is required";
      else return false;
    case "stock":
      if (value === "") return "Stock is required";
      else return false;
    case "image":
      if (value === "") return "Image is required";
      else return false;
    default:
      break;
  }
}

module.exports = createAuthorSchema;
