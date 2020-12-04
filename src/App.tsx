import React from "react";
import useForm  from "./hooks/useForm";



const form: Form = {
  name: "my-name",
  surname: "My-surname",
  address: {
    street: {
      name: "my-street",
      people: 12
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
  const {Form, Field, useFieldGroup} = useForm(form)
  const ProductField = useFieldGroup<Product>("product")
  const AddressField = useFieldGroup<Address>("address")
  const StreetField = useFieldGroup<Street>("street")
  

  const onSubmit = (data: any) => {
    console.log(data)
  };

  return (
    <Form onSubmit={onSubmit} style={formStyle}>
      <Field name="name" placeholder="name" />
      <Field name="surname" placeholder="surname" />
      <StreetField name="name" placeholder="street name" />
      <StreetField name="people" placeholder="people number" />
      <AddressField name="city" placeholder="city" />
      <ProductField name="name" placeholder="Product name" />
      <ProductField name="price" placeholder="Price of the product" />
      <button type="submit">Validate</button>
    </Form>
  );
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};





