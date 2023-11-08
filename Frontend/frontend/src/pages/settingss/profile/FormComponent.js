import React, { useState, useEffect } from "react";
import * as Form from "@radix-ui/react-form";

const FormComponent = ({ fullNameP, emailP, userNameP }) => {
  const [fullName, setfullName] = useState(fullNameP);
  const [email, setEmail] = useState(emailP);
  const [userName, setUserName] = useState(userNameP);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setfullName(storedUserData.fullName);
      setEmail(storedUserData.email);
      setUserName(storedUserData.userName);
    }
  }, []);

  const handleFullNameChange = (event) => {
    setfullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fullName);
    console.log(email);
    console.log(userName);
  };

  return (
    <Form.Root id="formset" onSubmit={handleSubmit} className="FormRoot">
      <Form.Field className="FormField" name="fullname">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className="FormLabel">Full Name</Form.Label>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid name
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            value={fullName}
            className="Input"
            type="text"
            onChange={handleFullNameChange}
            required
            style={{ height: "45px" }}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field className="FormField" name="email">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className="FormLabel">Email</Form.Label>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            value={email}
            className="Input"
            type="email"
            onChange={handleEmailChange}
            required
            style={{ height: "45px" }}
          />
        </Form.Control>
      </Form.Field>

      <Form.Field
        style={{ gridColumn: "span 2" }}
        className="FormField"
        name="username"
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <Form.Label className="FormLabel">User Name</Form.Label>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid username
          </Form.Message>
        </div>
        <Form.Control asChild>
          <input
            value={userName}
            className="Input"
            type="text"
            onChange={handleUserNameChange}
            required
            style={{ height: "45px" }}
          />
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <button id="submitbtn">Update Changes</button>
      </Form.Submit>
    </Form.Root>
  );
};

export default FormComponent;
