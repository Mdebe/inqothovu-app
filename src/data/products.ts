export type Product = {
  id: string;
  name: string;
  price: number;
  image: any;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Car Diffuser",
    price: 50,
    image: require("../../assets/images/hero.jpg"),
  },
  {
    id: "2",
    name: "House Diffuser",
    price: 200,
    image: require("../../assets/images/hero.jpg"),
  },
  {
    id: "3",
    name: "Roll-on Perfume",
    price: 30,
    image: require("../../assets/images/hero.jpg"),
  },
  {
    id: "4",
    name: "Luxury Perfume",
    price: 100,
    image: require("../../assets/images/hero.jpg"),
  },
];