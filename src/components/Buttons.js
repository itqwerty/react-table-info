function Buttons({getData}){
	const dataUrl = {
		'url_32' : 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
		'url_1000' : 'http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D',
	};

	return(
		<>
			<div className="buttons">
				<div className="col-auto">
					<button onClick = {()=> getData(dataUrl.url_32)} type="button" className="btn btn-primary">32</button>
				</div>
				<div className="col-auto">
					<button onClick = {()=> getData(dataUrl.url_1000)} type="button" className="btn btn-secondary">1000</button>
				</div>
			</div>
		</>
	);
}

export default Buttons;