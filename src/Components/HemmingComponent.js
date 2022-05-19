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
    const handleSubmit = (code) => {
        // axios
        //     .post(`${baseUrl}`, {
        //         code: value,
        //     })
        //     .then(function (response) {
        //         setData(response.data);
        //         setModalShow(true);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        let myFunc = (num) => Number(num);
        let intArr = Array.from(String(code), myFunc);
        function prepare(arbitraryData) {
            var hammingOutput = [];
            hammingOutput[0] = 0;
            hammingOutput[1] = arbitraryData[0] ^ arbitraryData[1] ^ arbitraryData[3] ^ arbitraryData[4] ^ arbitraryData[6] ^ arbitraryData[8] ^ arbitraryData[10];
            hammingOutput[2] = arbitraryData[0] ^ arbitraryData[2] ^ arbitraryData[3] ^ arbitraryData[5] ^ arbitraryData[6] ^ arbitraryData[9] ^ arbitraryData[10];
            hammingOutput[3] = arbitraryData[0];
            hammingOutput[4] = arbitraryData[1] ^ arbitraryData[2] ^ arbitraryData[3] ^ arbitraryData[7] ^ arbitraryData[8] ^ arbitraryData[9] ^ arbitraryData[10];
            hammingOutput[5] = arbitraryData[1];
            hammingOutput[6] = arbitraryData[2];
            hammingOutput[7] = arbitraryData[3];
            hammingOutput[8] = arbitraryData[4] ^ arbitraryData[5] ^ arbitraryData[6] ^ arbitraryData[7] ^ arbitraryData[8] ^ arbitraryData[9] ^ arbitraryData[10];
            hammingOutput[9] = arbitraryData[4];
            hammingOutput[10] = arbitraryData[5];
            hammingOutput[11] = arbitraryData[6];
            hammingOutput[12] = arbitraryData[7];
            hammingOutput[13] = arbitraryData[8];
            hammingOutput[14] = arbitraryData[9];
            hammingOutput[15] = arbitraryData[10];
            return hammingOutput;
        }

        // take 16-bit hamming code, return index of single-bit error
        function find(hammingInput) {
            var xor = 0;
            for (var i = 0; i < hammingInput.length; i++) {
                if (hammingInput[i] == 1) {
                    xor ^= i;
                }
            }
            return xor;
        }

        // take 16-bit hamming code and bit to toggle, return 16-bit hamming code with toggled bit
        function toggle(hammingInput, errorIndex) {
            if (hammingInput[errorIndex]) {
                hammingInput[errorIndex] = 0;
            }
            else {
                hammingInput[errorIndex] = 1;
            }
            return hammingInput;
        }

        // take 16-bit hamming code, return 11-bit arbitrary data
        function extract(hammingInput) {
            return [hammingInput[3], hammingInput[5], hammingInput[6], hammingInput[7], hammingInput[9], hammingInput[10], hammingInput[11], hammingInput[12], hammingInput[13], hammingInput[14], hammingInput[15]];
        }

        let data = intArr;
        //   var data = [0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0];
        console.log('Arbitrary data: ' + data);
        let hammingCode = prepare(data);
        console.log('Hamming code of data: ' + hammingCode);
        let garbledMessage = toggle(hammingCode, 10);
        console.log('Garbled Hamming code: ' + garbledMessage);
        let index = find(garbledMessage);
        console.log('Index of error (detected by an algorithm): ' + index);
        let repaired = toggle(garbledMessage, index);
        console.log('Repaired Hamming code: ' + repaired);
        let recieved = extract(repaired);
        console.log('Error-corrected data recieved: ' + recieved);

       setData({first:data,second:garbledMessage,third:index,for:repaired,five:recieved});
        setModalShow(true);
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
            <Button variant="success" onClick={()=>handleSubmit(value)}>Ստանալ արդյունքը</Button>
            <MyVerticallyCenteredModal
                data={data}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    );
};

export default Code;
