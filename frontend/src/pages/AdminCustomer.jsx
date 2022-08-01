import React, { useState, useEffect } from "react";

import AdminNavbar from '../components/AdminNavbar';

const AdminCustomer = () => {
	let [user, setUser] = useState(null)

	return (
		<div>
			<AdminNavbar user={user}/>
		</div>
	);
}

export default AdminCustomer;