import '../css/loader.css';

function Loader(){
	return(
		<>
			<div className="loader-wrap">
				<div className="lds-roller">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</>
	);
}

export default Loader;