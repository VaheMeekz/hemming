import React, { useState } from "react";
import {
    Button,
    Container,
    Form,
    FormControl,
    InputGroup,
    Modal,
} from "react-bootstrap";
import css from "./styles/code.module.css";
import axios from "axios";
import { baseUrl } from "./config/config";

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Արդյունք</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Հեմմինգի կոդը</h4>
                {props.data && props.data !== null && props.data.first}
                <hr />
                <h4>Կեղծված Հեմմինգի կոդը</h4>
                {props.data && props.data !== null && props.data.second}
                <hr />

                <h4>Սխալի ինդեքս</h4>
                {props.data && props.data !== null && props.data.third}
                <hr />

                <h4>Վերականգնված Հեմմինգի կոդը</h4>
                {props.data && props.data !== null && props.data.for}
                <hr />

                <h4>Ստացված կոդի ուղղման արդյունքում Հեմմինգի կոդը</h4>
                {props.data && props.data !== null && props.data.five}
                <hr />
            </Modal.Body>
        </Modal>
    );
}

const Code = () => {
    const [value, setValue] = useState("101010");
    const [data, setData] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);
    const handleSubmit = () => {
        axios
            .post(`${baseUrl}`, {
                code: value,
            })
            .then(function (response) {
                setData(response.data);
                setModalShow(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <Container className={css.input}>
            <Form.Label htmlFor="basic-url">
                Լրացրեք այբուբենից ընտրված բառը
            </Form.Label>
            <InputGroup size="sm" className="mb-3">
                <FormControl
                    placeholder="Բառ"
                    aria-describedby="inputGroup-sizing-sm"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </InputGroup>
            <Button variant="success" onClick={handleSubmit}>Ստանալ արդյունքը</Button>
            <MyVerticallyCenteredModal
                data={data}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    );
};

export default Code;
