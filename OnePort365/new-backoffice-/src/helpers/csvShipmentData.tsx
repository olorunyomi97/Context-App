import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getShipments } from "store/actions";

const csvShipmentData = (props: any) => {
	const { my_shipments, getShipments, loading } = props;
	const [filteredShipments, setFilteredShipments] = useState([]);
	console.log(my_shipments?.data?.data);

	useEffect(() => {
		setFilteredShipments(my_shipments?.data?.data);
	}, [my_shipments]);


	return (
		<div>
			csvShipmentData
		</div>
	)
}

// export default csvShipmentData;

const mapStateToProps = (state: any) => {
	const { my_shipments, error, loading } = state.shipments;
	return { my_shipments, error, loading };
};
export default connect(mapStateToProps, { getShipments })(csvShipmentData);
