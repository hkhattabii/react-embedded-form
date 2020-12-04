import React from "react";
import useForm from "./hooks/useForm";



const initialFormValue = {
  surname: "",
  client: {
    name: "tqt",
    address: "Ouoh"
  }
}


export default function App() {
  const {Form, Field} = useForm(initialFormValue)

  const onSubmit = (data: any) => {
    console.log(data)
  };

  return (
    <Form onSubmit={onSubmit} style={formStyle}>
      <Field name="surname" placeholder="surname" />
      <button type="submit">Validate</button>
    </Form>
  );
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};





