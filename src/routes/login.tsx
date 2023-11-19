import styled from "styled-components";
import React, {useState} from "react";
import {FirebaseError} from "firebase/app";
import {signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {auth} from "../firebase.ts";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0;
`
const Title = styled.h1`
  font-size: 42px
`
const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;

  &[type="submit"] {
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`
const Error = styled.span`
  font-weight: 600;
  color: tomato;
`

export default function CreateAccount() {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // 화면이 새로 고침 되지 않도록
        e.preventDefault()
        setError("")
        if (isLoading || email === "" || password === "") return
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (e) {
            // setError
            if (e instanceof FirebaseError)
                setError(e.message)
        } finally {
            setLoading(false)
        }
        console.log(name, email, password)
    }
    return <Wrapper>
        <Title>Log into VITTER</Title>
        <Form onSubmit={onSubmit}>
            <Input
                onChange={onChange}
                name="email"
                value={email}
                placeholder="Email"
                type="email"
                required
            />
            <Input
                onChange={onChange}
                name="password"
                value={password}
                placeholder="Password"
                type="password"
                required
            />
            <Input
                value={isLoading ? "Loading..." : "Log In"}
                type="submit"
            />
        </Form>
        {error != "" ? <Error>{error}</Error> : null}
    </Wrapper>
}