const express = require('express');
var cors = require('cors')
const catalystSDK = require('zcatalyst-sdk-node');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
	const catalyst = catalystSDK.initialize(req);
	res.locals.catalyst = catalyst;
	next();
});

app.get('/fetch', async (req, res) => {
	try {
		const { catalyst } = res.locals;
		const zcql = catalyst.zcql();

		const dataItems = await zcql.executeZCQLQuery(`SELECT ROWID,CREATORID,CREATEDTIME,MODIFIEDTIME,name,icon_code,category,redirect_url,is_icon FROM quick_access`)
			.then((item) => {
				let result = []
				let catdata = {}

				let data = item.map((elm) => {
					return elm.quick_access
				})

				for (let i = 0; i < data.length; i++) {
					const element = data[i];
					catdata[element.category] = catdata[element.category] == undefined ? { cat: element.category, data: [] } : catdata[element.category]
					catdata[element.category].data.push(element)
				}

				for (const key in catdata) {
					result.push(catdata[key])
				}

				return result
			});
		res.status(200).send({
			status: 'success',
			data: dataItems
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: 'Failed',
			message: "Internal Server Error",
			code: 500
		});
	}
});

app.get('/export', async (req, res) => {
	try {
		const { catalyst } = res.locals;
		const zcql = catalyst.zcql();

		const generateInsertQuery = async (data) => {
			const rows = data.map(
				(row) =>
					`('${row.name}', '${row.icon_code}', '${row.category}', '${row.redirect_url}', ${row.is_icon})`
			);
			return `
			INSERT INTO quick_access (name, icon_code, category, redirect_url, is_icon)
			VALUES ${rows.join(",\n")};
			`;
		};

		const dataItems = await zcql.executeZCQLQuery(`SELECT ROWID,CREATORID,CREATEDTIME,MODIFIEDTIME,name,icon_code,category,redirect_url,is_icon FROM quick_access`)
			.then(async (item) => {
				let result = []

				let data = item.map((elm) => {
					return elm.quick_access
				})

				// Generate the SQL query
				const sqlQuery = await generateInsertQuery(data);
				
				// File path to save the SQL query
				const filePath = 'insert_query.sql';

				// Write the query to the file
				fs.writeFile(filePath, sqlQuery, (err) => {
					if (err) {
						console.error('Error writing to file:', err);
					} else {
						console.log(`SQL query successfully written to ${filePath}`);
					}
				});

				return result
			});			
		res.status(200).send({
			status: 'success'
		});
	} catch (err) {
		console.log(err);
		res.status(500).send({
			status: 'Failed',
			message: "Internal Server Error",
			code: 500
		});
	}
});

module.exports = app;
