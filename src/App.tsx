import React from "react";
import useForm  from "./hooks/useForm";



const form: Form = {
  name: "My-Name",
  surname: "",
  address: {
    street: {
      name: "my-street",
      people: 0
    },
    city: "my-city",
  },
  order: {
    product: {
      name: "my-product",
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
  name: string,
  price: number
}


export default function App() {
  const {Form, Input, Select, useFieldGroup} = useForm(form)
  const {InputGroup, SelectGroup} = useFieldGroup<Product>("product")
  

  const onSubmit = (data: any) => {
    console.log(data)
  };

  return (
    <Form onSubmit={onSubmit} style={formStyle}>
      <Input name="name" placeholder={form.name} />
      <Select name="surname" placeholder="surname" items={["Khattabi", "Ben Haddou", "Chillah"]} />
      <InputGroup name="name" placeholder={form.order.product.name} />
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





