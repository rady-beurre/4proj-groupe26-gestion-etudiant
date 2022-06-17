import React, { useRef, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

import {
	Grid
} from "@material-ui/core";

import PageTitle from "../../components/PageTitle";

import axios from 'axios';

export default function TypeContrat(props) {
	var datatableData = [];

	const [login, setLogin] = useState([]);
	useEffect(() => {
		fetch("http://localhost:8080/allTypeContrat")
			.then(res => res.json())
			.then(
				(data) => {
					setLogin(data.result);
				}
			)
	}, [])

	login.forEach(function(item, i) {
		datatableData[i] = [item.libelleTypeContrat]
	});

	const libelleRef = useRef();
	const [libelle, setLibelle] = useState('');
	const add = async (e) => {
		e.preventDefault();
		try {
			axios.post(
				'http://localhost:8080/addTypeContrat',
				JSON.stringify(
					{
						"libelleTypeContrat": libelle
					}
				),
				{
					headers: { 'Content-Type': 'application/json' }
				}
			).then(res => {
				window.location.reload(false);
			})
		}
		catch (err) {

		}
	}

	return (
		<>
			{localStorage.getItem('id_token') === "ADMIN" ? (
				<div>
					<PageTitle title="Ajouter un type de contrat" />
					<form onSubmit={add}>
						<div className='row ajout-type-acces'>
							<div className='col-sm-8'>
								<label>Libellé</label>
								<input type='text' className='form-control' ref={libelleRef} onChange={(e) => setLibelle(e.target.value)} value={libelle} required />
							</div>
							<div className='col-sm-4'>
								<label>&nbsp;</label>
								<button className='btn btn-secondary btn-block btn-sup'>Ajouter</button>
							</div>
						</div>
					</form>
					<br />
					<PageTitle title="Liste des types de contrat" />
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<MUIDataTable
								data={datatableData}
								columns={["LIBELLE"]}
								options={{
									selectableRows: 'none'
								}}
							/>
						</Grid>
					</Grid>
				</div>
			) : (
				<Redirect to={{ pathname: "/app/dashboard" }} />
			)}
		</>
	);
}