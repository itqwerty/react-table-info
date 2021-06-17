import React, {useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import IMask from 'imask';
import {
	selectCopyMainData,
	addStore,
	addCopyMainData,
} from '../store/storeSlice';

function AddString(){
	const [id, setId] = useState();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState();
	const [hide, setHide] = useState('hide');
	const [disabled, setDisabled] = useState('disabled');
	const dispatch = useDispatch();

	let сopyMainData = useSelector(selectCopyMainData).payload;

	const addRow = (event) => {
		event.preventDefault();
		let arrValue = {id, firstName, lastName, email, phone};
		let temp = сopyMainData.concat()
		temp.unshift(arrValue);
		dispatch(addCopyMainData(temp));
		dispatch(addStore(temp));
	}
	const refTel = useRef();
	const refMail = useRef();

	useEffect(()=>{
		if(id !== undefined && firstName !== undefined && lastName !== undefined && email !== undefined && phone !== undefined) setDisabled('');
		let tel = refTel.current;
		let maskOptions = {
    		mask: '(000)000-0000',
    		lazy: false
		} 
		let maskTel = new IMask(tel, maskOptions);
		setPhone(maskTel.value);

		let mail = refMail.current;
		let maskOptions2 = {    
	    	mask:function (value) {
	            if(/^[a-z0-9A-Z_-]+$/.test(value))
	                return true;
	            if(/^[a-z0-9A-Z_-]+@$/.test(value))
	                return true;
	            if(/^[a-z0-9A-Z_-]+@[a-z0-9-]+$/.test(value))
	                return true;
	            if(/^[a-z0-9A-Z_-]+@[a-z0-9-]+\.$/.test(value))
	                return true;
	            if(/^[a-z0-9A-Z_-]+@[a-z0-9-]+\.[a-z]{1,4}$/.test(value))
	                return true;
	            if(/^[a-z0-9A-Z_-]+@[a-z0-9-]+\.[a-z]{1,4}\.$/.test(value))
	                return true;
	            if(/^[a-z0-9A-Z_-]+@[a-z0-9-]+\.[a-z]{1,4}\.[a-z]{1,4}$/.test(value))
	                return true;
	            return false;
	        },
	    	lazy: false
		} 
		let maskMail = new IMask(mail, maskOptions2);

	}, [id, firstName, lastName, email, phone])

	const changetel = (event) => {
		setPhone(refTel.current.value);
	}

	const getFirstName = (event) => {
		if((event.charCode >= 1040 && event.charCode <= 1103) || (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)) {
			setFirstName(event.target.value);
			return true;
		};
		event.preventDefault();
	}
	const getLastName = (event) => {
		if((event.charCode >= 1040 && event.charCode <= 1103) || (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)) {
			setLastName(event.target.value);
			return true;
		};
		event.preventDefault();
	}

	const showHide = (event) => {
		event.target.classList.add('hide');
		setHide('');
	}
	
	return(
		<>
			<div className="col-md-12 text-center">
				<button onClick={(event) => showHide(event)} className="btn btn-primary mt-5" type="submit">Show Add form</button>
			</div>
			<form className={`row g-3 needs-validation mt-5 justify-content-between ${hide}`} noValidate>
				<div className="col-md-2">
			    	<label htmlFor="validationCustom01" className="form-label">id</label>
			    	<input onKeyPress={(event) => setId(event.target.value)} type="number" className="form-control" id="validationCustom01" required/>
			    	<div className="valid-feedback">
			      		Looks good!
			    	</div>
				</div>
				<div className="col-md-2">
			    	<label htmlFor="validationCustom02" className="form-label">firstName</label>
			    	<input onKeyPress={getFirstName} type="text" className="form-control" id="validationCustom02" required/>
			    	<div className="valid-feedback">
			      		Looks good!
			    	</div>
				</div>
				<div className="col-md-2">
				    <label htmlFor="validationCustomUsername" className="form-label">lastName</label>
				    <div className="input-group has-validation">
				    	
				    	<input onKeyPress={getLastName} type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
				    	<div className="invalid-feedback">
				      	Please choose a username.
				    	</div>
				    </div>
				</div>
				<div className="col-md-2">
				    <label htmlFor="validationCustom03" className="form-label">email</label>
				    <input ref={refMail} onChange={(event) => setEmail(event.target.value)} type="email" className="form-control" id="validationCustom03" required/>
				    <div className="invalid-feedback">
				     	Please provide a valid city.
				    </div>
				</div>

			  	<div className="col-md-2">
				    <label htmlFor="validationCustom05" className="form-label">phone</label>
				    <input ref={refTel} onKeyPress={changetel} type="tel" className="form-control" id="validationCustom05" required/>
				    <div className="invalid-feedback">
				     	Please provide a valid zip.
				    </div>
			  	</div>

			  	<div className="col-12 mt-5 text-center">
			    	<button onClick={addRow} className={`btn btn-primary ${disabled}`} type="submit">Add row</button>
			  	</div>
			</form>
		</>
	);
}

export default AddString;