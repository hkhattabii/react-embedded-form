import React from "react";
import useForm  from "./hooks/useForm";



const form: Form = {
  name: "Hamza",
  surname: "Khattabi",
  address: {
    street: {
      name: "my-street",
      people: 0
    },
    city: "my-city",
  },
  order: {
    product: {
      name: "My-product",
      price: 90,
    }
  }
}
interface Form {
  name: string,
  surname: string,
  address: Address,
  order: Order
}
interface Street {
  name: string,
  people: number
}
interface Address {
  street: Street
  city: string
}
interface Order {
  product: Product
}
interface Product {
  name: string[] | string,
  price: number
}


export default function App() {
  const {Form, Select, Checkbox, useFieldGroup} = useForm(form)
  const {SelectGroup, CheckboxGroup} = useFieldGroup<Product>("product")
  

  const onSubmit = (data: any) => {
    console.log(data)
  };

  return (
    <Form onSubmit={onSubmit} style={formStyle}>
      <Select name="name" placeholder="name" items={["Hamza", "Younes", "Soufiane"]} />
      <Checkbox name="surname" items={["Khattabi", "Chillah", "Ben Haddou"]} />
      <CheckboxGroup name="name" items={["My-product","Iphone 12 mini", "Iphone 12", "Iphone 12 Pro", "Iphone 12 PRO MAX" ]} />
      <SelectGroup name="price" placeholder="price" items={["100€", "200€", 300]}  />
      <button type="submit">validate</button>
    </Form>
  );
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};





