import React from 'react';
import { useState } from 'react';
import { cognitoUserInfo } from '../utils/userHelper';
import axios from 'axios';
import { create } from 'domain';
import { Alert, Snackbar } from '@mui/material';
const Admin = () => {
    const userInfo = cognitoUserInfo();
    const hostName = process.env.API_URL;
    const controller = process.env.API_CONTROLLER;

    const [email, setEmail] = useState("");

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [created, setCreated] = useState(false);
    const [uniqueId, setUnique] = useState("");
    React.useEffect(() => {
        (async () => {
            userInfo.then(user => {
                setEmail(user.attributes.email);
            });
        })();

        const intervalId = setInterval(() => {
            recurrence();
        }, 1000 * 3) // in milliseconds
        return () => clearInterval(intervalId);
    });

    const enviar = () => {
        var data = { name: name, lastName: lastName, uniqueId: "" };
        setCreated(false);
        axios.post(`${hostName}${controller}`, data).then(r => {
            console.log(r);
            var resultado = r.data;

            if (resultado.ok) {
                console.log(resultado);
                setUnique(resultado.data);
                recurrence();
            }
        }).catch(e => {
            console.log(e);
        });

    }

    const recurrence = () => {
        // console.log(uniqueId);
        if (uniqueId === "") {
            return;
        }
        axios.get(`${hostName}${controller}/${uniqueId}`).then(r => {
            console.log(r);
            var resultado = r.data;

            if (resultado.ok) {
                console.log(resultado);
                setCreated(true);
                setUnique("");
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setCreated(false);
    };

    return (<div>
        Login correcto! Bienvenido {email}

        <Snackbar open={uniqueId != ""} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                Registro creandose, favor espere
            </Alert>
        </Snackbar>

        <Snackbar open={created} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Registro creado exitosamente!
            </Alert>
        </Snackbar>
        <div>
            <h3>Crear cliente</h3>
            <div>
                <label>Nombre cliente</label>
                <input type="text" value={name} onChange={(event) => { setName(event.currentTarget.value) }} />
            </div>

            <div>
                <label>Apellido cliente</label>
                <input type="text" value={lastName} onChange={(event) => { setLastName(event.currentTarget.value) }} />
            </div>
            <div>
                <button onClick={enviar}>Crear cliente</button>
            </div>

        </div>
    </div>);
}

export default Admin;