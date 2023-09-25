import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pdf from "react-to-pdf";
import "jspdf-autotable";


function CrudDetails(props) {
	const [crud, setCrud] = useState({});
const ref = React.createRef();
	const { _id } = useParams();
	const navigate = useNavigate();

	useEffect(
		function () {
			async function getCrudById() {
				try {
					const response = await axios.get(`/api/cruds/${_id}`);
					setCrud(response.data);
				} catch (error) {
					console.log("error", error);
				}
			}
			getCrudById();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props]
	);

	async function handleDelete() {
		try {
			await axios.delete(`/api/cruds/${_id}`);
			navigate("/cruds");
		} catch (error) {
			console.error(error);
		}
	}

// 	 function jsPdfGenerator () {
		
// 		const doc = new jsPDF({ unit: 'pt' }) // create jsPDF object
//   const pdfElement = document.getElementById('pdf') // HTML element to be converted to PDF

//   doc.html(pdfElement, {
//     callback: (pdf) => {
//       pdf.save('MyPdfFile.pdf')
//     },
//     margin: 32, // optional: page margin
//     // optional: other HTMLOptions
//   })
// 	}

	return (
		<div className="container">
			
			<div ref={ref}>
				
				<h1>Appointment Details</h1>

				<h3>
					
					<p>
						Doctor name: {crud.companyName}
					</p>
				</h3>
                        <p>
				<b>Patient Name</b>: {crud.description}
				</p>
			<p>
				<b>Phone</b>: <a href={`tel:+${crud.phone}`}> {crud.phone} </a>
			</p>

			<p>
				<b>Email</b>: {crud.email}
			</p>
			<p>
				<b>Time</b>: {crud.location}
			</p>
			<p>
				<b>Date</b> :
				<a href={` ${crud.link}`} target="_blank" rel="noreferrer">
					{crud.link}
				</a>
			</p>
			
				</div>
			<p>
				<small>
					<b>ID</b>: {crud._id}
				</small>
			</p>

			<div className="btn-group ">
			 <Pdf targetRef={ref} className="btn btn-outline-success my-2 my-sm-0" filename="Genaratereport.pdf">
					{({ toPdf }) =>
						<button  className="btn btn-danger" onClick={toPdf}>Generate Pdf</button>}
				</Pdf>
				

			</div>
			
			<hr />
		</div>
	);
}

export default CrudDetails;
