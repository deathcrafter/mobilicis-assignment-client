import "./App.css";

import { useEffect, useState } from "react";

import { fetchJSON } from "./lib/fetchJSON";

interface User {
	_id: string;
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
	income: string;
	city: string;
	car: string;
	quote: string;
	phone_price: number;
}

const UserKeys = [
	{ key: "id", label: "ID" },
	{ key: "first_name", label: "First Name" },
	{ key: "last_name", label: "Last Name" },
	{ key: "email", label: "Email" },
	{ key: "gender", label: "Gender" },
	{ key: "income", label: "Income" },
	{ key: "city", label: "City" },
	{ key: "car", label: "Car" },
	{ key: "quote", label: "Quote" },
	{ key: "phone_price", label: "Phone Price" },
];

function Condition({ condition }: { condition: number }) {
	const [data, setData] = useState<User[]>();

	useEffect(() => {
		fetchJSON("/condition" + condition)
			.then(setData)
			.catch(console.error);
	}, []);

	return data ? (
		<table>
			<thead>
				<tr>
					{UserKeys.map(({ label }, index) => (
						<th key={label + index}>{label}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((user) => (
					<tr key={user._id}>
						{UserKeys.map(({ key }) => (
							<td key={user._id + "" + user.id}>
								<div>{(user as any)[key]}</div>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	) : (
		<div>Loading...</div>
	);
}

const CityKeys = [
	{ key: "_id", label: "City" },
	{ key: "count", label: "Count" },
	{ key: "average_income", label: "Average Income" },
];

function TopCities() {
	const [data, setData] = useState<{ _id: string; average_income: number; count: number }[]>();

	useEffect(() => {
		fetchJSON("/condition5").then(setData).catch(console.error);
	}, []);

	return data ? (
		<table>
			<thead>
				<tr>
					{CityKeys.map(({ label }, index) => (
						<th key={label + index}>{label}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((user) => (
					<tr key={user._id}>
						{CityKeys.map(({ key }, i) => (
							<td key={user._id + "" + i}>
								<div>{(user as any)[key]}</div>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	) : (
		<div>Loading...</div>
	);
}

function App() {
	return (
		<main>
			<nav>
				<a href="#condition-1">Condition 1</a>
				<a href="#condition-2">Condition 2</a>
				<a href="#condition-3">Condition 3</a>
				<a href="#condition-4">Condition 4</a>
				<a href="#condition-5">Condition 5</a>
			</nav>
			<section id="condition-1">
				<h2>Condition 1</h2>
				<h4>
					Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”
				</h4>
				<Condition condition={1} />
			</section>
			<hr />
			<section id="condition-2">
				<h2>Condition 2</h2>
				<h4>Male Users which have phone price greater than 10,000</h4>
				<Condition condition={2} />
			</section>
			<hr />
			<section id="condition-3">
				<h2>Condition 3</h2>
				<h4>
					Users whose last name starts with “M” and has a quote character length greater than 15 and
					email includes his/her last name
				</h4>
				<Condition condition={3} />
			</section>
			<hr />
			<section id="condition-4">
				<h2>Condition 4</h2>
				<h4>
					Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not
					include any digit
				</h4>
				<Condition condition={4} />
			</section>
			<hr />
			<section id="condition-5">
				<h2>Condition 5</h2>
				<h4>
					Show the data of top 10 cities which have the highest number of users and their average
					income
				</h4>
				<TopCities />
			</section>
		</main>
	);
}

export default App;
