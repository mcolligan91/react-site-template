const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(bodyParser.json());
app.disable('etag');

app.use('/favicon.ico', express.static('./favicon.ico'));

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);


//dashbaord 
app.get('/dashboard/', (req, res) => {
    let announcements = ['Example announcement 1', 'Example announcement 2', 'Example announcement 3', 'Example announcement 4'];

    let tasks = [
        {summary: 'Please submit your POS data for Organization A, January 2020.', date: '2/6/2020'},
        {summary: 'Please submit your POS data for Organization B, January 2020.', date: '2/6/2020'},
        {summary: 'Please submit your POS data for Organization C, January 2020.', date: '2/6/2020'},
        {summary: 'Please submit your POS data for Organization D, January 2020.', date: '2/5/2020'},
        {summary: 'Please submit your POS data for Organization E, January 2020.', date: '2/5/2020'},
        {summary: 'Please submit your POS data for Organization F, January 2020.', date: '2/5/2020'},
        {summary: 'Please submit your POS data for Organization G, January 2020.', date: '2/5/2020'},
        {summary: 'Please submit your POS data for Organization H, January 2020.', date: '2/5/2020'},
        {summary: 'Please submit your POS data for Organization I, January 2020.', date: '2/5/2020'},
        {summary: 'Please submit your POS data for Organization J, January 2020.', date: '2/5/2020'}
    ];

    let events = [
        {summary: 'User A added a new Branch.', date: '2/6/2020'},
        {summary: 'User A submitted POS data for December 2019.', date: '2/6/2020'},
        {summary: 'User B submitted POS data for December 2019.', date: '2/6/2020'},
        {summary: 'User C submitted POS data for December 2019.', date: '2/6/2020'},
        {summary: 'User D submitted POS data for December 2019.', date: '2/6/2020'},
        {summary: 'User E submitted POS data for December 2019.', date: '2/6/2020'},
        {summary: 'User F submitted POS data for December 2019.', date: '2/6/2020'},
        {summary: 'User G submitted POS data for December 2019.', date: '2/6/2020'},
        {summary: 'User H submitted POS data for December 2019.', date: '2/6/2020'},
        {summary: 'User I submitted POS data for December 2019.', date: '2/6/2020'}
    ];

    res.send(JSON.stringify({success: true, data: {announcements, tasks, events}}));

    // res.send(JSON.stringify({success: false, message: 'Error retrieving dashboard data.'}));
});

//manage data
let posData = [
    {
      "title": "2020",
      "content": [
        {
          "year": "2020",
          "month": "June",
          "status": 1,
          "id": 1
        },
        {
          "year": "2020",
          "month": "May",
          "status": 1,
          "id": 2
        },
        {
          "year": "2020",
          "month": "April",
          "status": 1,
          "id": 3
        },
        {
          "year": "2020",
          "month": "March",
          "status": 1,
          "id": 4
        },
        {
          "year": "2020",
          "month": "February",
          "status": 2,
          "id": 5
        },
        {
          "year": "2020",
          "month": "January",
          "status": 3,
          "id": 6
        }
      ]
    },
    {
      "title": "2019",
      "content": [
        {
          "year": "2019",
          "month": "December",
          "status": 1,
          "id": 7
        },
        {
          "year": "2019",
          "month": "November",
          "status": 1,
          "id": 8
        },
        {
          "year": "2019",
          "month": "October",
          "status": 1,
          "id": 9
        },
        {
          "year": "2019",
          "month": "September",
          "status": 1,
          "id": 10
        },
        {
          "year": "2019",
          "month": "August",
          "status": 1,
          "id": 11
        },
        {
          "year": "2019",
          "month": "July",
          "status": 1,
          "id": 12
        },
        {
          "year": "2019",
          "month": "June",
          "status": 1,
          "id": 13
        },
        {
          "year": "2019",
          "month": "May",
          "status": 1,
          "id": 14
        },
        {
          "year": "2019",
          "month": "April",
          "status": 1,
          "id": 15
        },
        {
          "year": "2019",
          "month": "March",
          "status": 1,
          "id": 16
        },
        {
          "year": "2019",
          "month": "February",
          "status": 2,
          "id": 17
        },
        {
          "year": "2019",
          "month": "January",
          "status": 3,
          "id": 18
        }
      ]
    },
    {
      "title": "2018",
      "content": [
        {
          "year": "2018",
          "month": "December",
          "status": 1,
          "id": 19
        },
        {
          "year": "2018",
          "month": "November",
          "status": 1,
          "id": 20
        },
        {
          "year": "2018",
          "month": "October",
          "status": 1,
          "id": 21
        },
        {
          "year": "2018",
          "month": "September",
          "status": 1,
          "id": 22
        },
        {
          "year": "2018",
          "month": "August",
          "status": 1,
          "id": 23
        },
        {
          "year": "2018",
          "month": "July",
          "status": 1,
          "id": 24
        },
        {
          "year": "2018",
          "month": "June",
          "status": 1,
          "id": 25
        },
        {
          "year": "2018",
          "month": "May",
          "status": 1,
          "id": 26
        },
        {
          "year": "2018",
          "month": "April",
          "status": 1,
          "id": 27
        },
        {
          "year": "2018",
          "month": "March",
          "status": 1,
          "id": 28
        },
        {
          "year": "2018",
          "month": "February",
          "status": 2,
          "id": 29
        },
        {
          "year": "2018",
          "month": "January",
          "status": 3,
          "id": 30
        }
      ]
    },
    {
      "title": "2017",
      "content": [
        {
          "year": "2017",
          "month": "December",
          "status": 1,
          "id": 31
        },
        {
          "year": "2017",
          "month": "November",
          "status": 1,
          "id": 32
        },
        {
          "year": "2017",
          "month": "October",
          "status": 1,
          "id": 33
        },
        {
          "year": "2017",
          "month": "September",
          "status": 1,
          "id": 34
        },
        {
          "year": "2017",
          "month": "August",
          "status": 1,
          "id": 35
        },
        {
          "year": "2017",
          "month": "July",
          "status": 1,
          "id": 36
        },
        {
          "year": "2017",
          "month": "June",
          "status": 1,
          "id": 37
        },
        {
          "year": "2017",
          "month": "May",
          "status": 1,
          "id": 38
        },
        {
          "year": "2017",
          "month": "April",
          "status": 1,
          "id": 39
        },
        {
          "year": "2017",
          "month": "March",
          "status": 1,
          "id": 40
        },
        {
          "year": "2017",
          "month": "February",
          "status": 2,
          "id": 41
        },
        {
          "year": "2017",
          "month": "January",
          "status": 3,
          "id": 42
        }
      ]
    },
    {
      "title": "2016",
      "content": [
        {
          "year": "2016",
          "month": "December",
          "status": 1,
          "id": 43
        },
        {
          "year": "2016",
          "month": "November",
          "status": 1,
          "id": 44
        },
        {
          "year": "2016",
          "month": "October",
          "status": 1,
          "id": 45
        },
        {
          "year": "2016",
          "month": "September",
          "status": 1,
          "id": 46
        },
        {
          "year": "2016",
          "month": "August",
          "status": 1,
          "id": 47
        },
        {
          "year": "2016",
          "month": "July",
          "status": 1,
          "id": 48
        },
        {
          "year": "2016",
          "month": "June",
          "status": 1,
          "id": 49
        },
        {
          "year": "2016",
          "month": "May",
          "status": 1,
          "id": 50
        },
        {
          "year": "2016",
          "month": "April",
          "status": 1,
          "id": 51
        },
        {
          "year": "2016",
          "month": "March",
          "status": 1,
          "id": 52
        },
        {
          "year": "2016",
          "month": "February",
          "status": 2,
          "id": 53
        },
        {
          "year": "2016",
          "month": "January",
          "status": 3,
          "id": 54
        }
      ]
    },
    {
      "title": "2015",
      "content": [
        {
          "year": "2015",
          "month": "December",
          "status": 1,
          "id": 55
        },
        {
          "year": "2015",
          "month": "November",
          "status": 1,
          "id": 56
        },
        {
          "year": "2015",
          "month": "October",
          "status": 1,
          "id": 57
        },
        {
          "year": "2015",
          "month": "September",
          "status": 1,
          "id": 58
        },
        {
          "year": "2015",
          "month": "August",
          "status": 1,
          "id": 59
        },
        {
          "year": "2015",
          "month": "July",
          "status": 1,
          "id": 60
        },
        {
          "year": "2015",
          "month": "June",
          "status": 1,
          "id": 61
        },
        {
          "year": "2015",
          "month": "May",
          "status": 1,
          "id": 62
        },
        {
          "year": "2015",
          "month": "April",
          "status": 1,
          "id": 63
        },
        {
          "year": "2015",
          "month": "March",
          "status": 1,
          "id": 64
        },
        {
          "year": "2015",
          "month": "February",
          "status": 2,
          "id": 65
        },
        {
          "year": "2015",
          "month": "January",
          "status": 3,
          "id": 66
        }
      ]
    }
  ];

app.get('/data/pos', (req, res) => {
    res.send(JSON.stringify({success: true, data: {posData}}));
});

app.get('/data/summary/:id', (req, res) => {
    let id = req.params.id;

    let data = {}
    for (let i = 0; i < posData.length; i++) {
        for (let j = 0; j < posData[i]['content'].length; j++) {
            if (parseInt(id) === posData[i]['content'][j]['id']) {
                data = posData[i]['content'][j];
                break;
            }
        }
    }

    let submissions = [
        {fileName: 'upload1.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''},
        {fileName: 'upload2.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''},
        {fileName: 'upload3.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''},
        {fileName: 'upload4.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''},
        {fileName: 'upload5.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''},
        {fileName: 'upload6.csv', status: 'Uploaded', recordsAmount: 423, totalQuantity: 983483437, notes: ''}
    ];

    let submissionNotes = [
        'Submitted by User A on 5/27/2020 10:23:46am'
    ];

    let reviewNotes = [
        'Uploaded by User A on 5/28/2020 10:19:23am',
        'Total Unique Branches: 110',
        'Number of New Products: 35467',
        'Number of New Customers: 2'
    ];

    let selectedSummary = {
        status: data.status,
        month: data.month,
        year: data.year,
        submissionData: submissions,
        submissionNotes: submissionNotes,
        reviewNotes: reviewNotes,
        submissionComments: [],            
    };

    res.send(JSON.stringify({success: true, data: {selectedSummary}}));
});


let branchData = [
    {id: 1, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 2, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 3, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 4, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 5, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 6, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 7, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 8, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 9, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 10, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 11, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 12, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 12, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 13, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 14, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 15, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 16, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 17, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 18, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 19, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'},
    {id: 20, branchId: 'Branch A', city: 'Los Angeles', state: 'California', zipCode: '90011', status: 'Open', dateAdded: '5/19/2020', details: 'Lorem ipsum'}
];

app.get('/data/branch', (req, res) => {
    res.send(JSON.stringify({success: true, data: {branchData}}));
});

app.post('/data/branch', (req, res) => {
    let newBranch = req.body;
    
    newBranch['id'] = branchData.length + 1;
    newBranch['dateAdded'] = new Date().toLocaleDateString();

    branchData.unshift(newBranch);

    res.send(JSON.stringify({success: true, data: {newBranch}}));
});

app.get('/data/product', (req, res) => {
    let productData = [
        {distributor: 'Distributor A', productIds: 150, invoicedProdCat: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat1: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat2: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat3: Math.floor(Math.random() * 100) + 1 + '%'},
        {distributor: 'Distributor B', productIds: 150, invoicedProdCat: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat1: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat2: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat3: Math.floor(Math.random() * 100) + 1 + '%'},
        {distributor: 'Distributor C', productIds: 150, invoicedProdCat: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat1: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat2: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat3: Math.floor(Math.random() * 100) + 1 + '%'},
        {distributor: 'Distributor D', productIds: 150, invoicedProdCat: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat1: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat2: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat3: Math.floor(Math.random() * 100) + 1 + '%'},
        {distributor: 'Distributor E', productIds: 150, invoicedProdCat: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat1: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat2: Math.floor(Math.random() * 100) + 1 + '%', invoicedProdSubCat3: Math.floor(Math.random() * 100) + 1 + '%'},
        
    ];

    let productUploadData = [
        {fileName: 'Product_v1.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
        {fileName: 'Product_v2.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
        {fileName: 'Product_v3.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
        {fileName: 'Product_v4.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
        {fileName: 'Product_v5.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
        {fileName: 'Product_v6.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
        {fileName: 'Product_v7.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
        {fileName: 'Product_v8.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'},
        {fileName: 'Product_v9.csv', productAmount: 1, prodCategoryAmount: 1, dateUploaded: '5/20/2020'}
    ];

    res.send(JSON.stringify({success: true, data: {productData, productUploadData}}));
});

//reporting
let reportTableStatus = {
	status: 1,
  	summary: `Report tables were last updated by User A on 6/1/2020`
};

app.get('/reporting/status', (req, res) => {
	res.send(JSON.stringify({success: true, data: {reportTableStatus}}));
});

app.put('/reporting/status', (req, res) => {
	let today = new Date().toLocaleDateString();

	reportTableStatus = {
		status: 2,
		  summary: `User A began updating the reporting tables on ${today}`
	};

	res.send(JSON.stringify({success: true, data: {reportTableStatus}}));
});

let salesData = [];

app.get('/reporting/sales-data', (req, res) => {
	let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

	let statesList = [];
	for (let i = 0; i < states.length; i++) {
		statesList.push({value: states[i], category: 'location'});
	}

	let queryFilterMenuData = [
		{
			title: 'Time Period',
			category: 'timePeriod',
			content: [
				{value: 2020, category: 'timePeriod'},
				{value: 2019, category: 'timePeriod'},
				{value: 2018, category: 'timePeriod'},
				{value: 2017, category: 'timePeriod'},
				{value: 2016, category: 'timePeriod'},
				{value: 2015, category: 'timePeriod'}
			],
			showAll: true,
			limitData: false
		},
		{
			title: 'Location',
			category: 'location',
			content: statesList,
			showAll: false,
			limitData: true
		},
		{
			title: 'Customer Segment',
			category: 'segment',
			content: [
				{value: 'Commercial', category: 'segment'},
				{value: 'Industrial', category: 'segment'},
				{value: 'Government', category: 'segment'},
				{value: 'Residential', category: 'segment'},
				{value: 'Utility', category: 'segment'},
				{value: 'Unclassified', category: 'segment'}
			],
			showAll: true,
			limitData: false
		}
	  ];

	  res.send(JSON.stringify({success: true, data: {queryFilterMenuData, salesData}}));
});

app.post('/reporting/sales-data', (req, res) => {
	setTimeout(() => {
		//load sales data
	}, 1000);

	res.send(JSON.stringify({success: true, data: {salesData}}));
})

//account
let userData = {
	firstName: 'Michael', 
	lastName: 'Colligan', 
	email: 'abc@gmail.com', 
	phone: '(123) 456-7890', 
	location: 'Washington, DC' 
}

app.get('/account/user', (req, res) => {
	res.send(JSON.stringify({success: true, data: {userData}}));
});

app.put('/account/user-information', (req, res) => {
	userData = req.body;
	res.send(JSON.stringify({success: true, data: {userData}}));
});

let passwordData = {};

app.put('/account/password-information', (req, res) => {
	passwordData = req.body;
	res.send(JSON.stringify({success: true, data: {passwordData}}));
});

let adminTableData = [
	{id: 1, name: 'User A', email: 'exampleA@gmail.com', phone: '(123) 456-7890'}, 
	{id: 2, name: 'User B', email: 'exampleB@gmail.com', phone: '(123) 456-7890'}, 
	{id: 3, name: 'User C', email: 'exampleC@gmail.com', phone: '(123) 456-7890'}
];

let adminId = adminTableData.length;

let orgData = {
	address: '123 Main Street', 
	phone: '(123) 456-7890', 
	email: 'abc@gmail.com', 
	website: 'example.com'
};

app.get('/account/organization', (req, res) => {
  res.send(JSON.stringify({success: true, data: {orgData, adminTableData}}));
});

app.post('/account/admin/', (req, res) => {
	let newAdmin = req.body;
		
	newAdmin['id'] = adminId;

	adminId = adminId + 1;

	adminTableData.unshift(newAdmin);

	res.send(JSON.stringify({success: true, data: {newAdmin}}));
});

app.put('/account/admin/', (req, res) => {
	let user = adminTableData.find(d => d.id === req.body.id);
	Object.assign(user, req.body);
		
	let newData = adminTableData;
	res.send(JSON.stringify({success: true, data: {newData}}));
});

app.delete('/account/admin/:id', (req, res) => {
	let id = parseInt(req.params.id);

	for (let i = 0; i < adminTableData.length; i++) {
		console.log(adminTableData[i]);
		if (adminTableData[i]['id'] === id) {
			adminTableData.splice(i, 1);
		}
	}
	res.send(JSON.stringify({success: true }));
});

app.put('/account/organization-information', (req, res) => {
	orgData = req.body;
	res.send(JSON.stringify({success: true, data: {orgData}}));
});

let userTableData = [
	{id: 1, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'}, {id: 2, name: 'User B', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 3, name: 'User C', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 4, name: 'User D', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 5, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 6, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 7, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 8, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 9, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 10, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 11, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 12, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 13, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 14, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'},{id: 15, name: 'User A', organization: 'Distributor A', email: 'abc@gmail.com', role: 'Admin', lastLogin: '5/20/2020'}
];

let userId = userTableData.length + 1;

let organizations = [
    {key: 'Distributor A', value: 'Distributor A', text: 'Distributor A'},
    {key: 'Distributor B', value: 'Distributor B', text: 'Distributor B'},
    {key: 'Distributor C', value: 'Distributor C', text: 'Distributor C'}
];

let userRoles = [
    {key: 'Admin', value: 'Admin', text: 'Admin'},
    {key: 'Site Admin', value: 'Site Admin', text: 'Site Admin'},
    {key: 'Data Analyst', value: 'Data Analyst', text: 'Data Analyst'}
];

app.get('/account/users', (req, res) => {
	res.send(JSON.stringify({success: true, data: {userTableData, organizations, userRoles}}));
});

app.post('/account/user', (req, res) => {
	let newUser = req.body;

	newUser['id'] = userId;
	newUser['lastLogin'] = null;

	userTableData.unshift(newUser);

	res.send(JSON.stringify({success: true, data: {newUser}}));
});

app.put('/account/users/', (req, res) => {
	let user = userTableData.find(d => d.id === req.body.id);
	Object.assign(user, req.body);
		
	let newData = userTableData;
	res.send(JSON.stringify({success: true, data: {newData}}));
});

app.delete('/account/users/:id', (req, res) => {
	let id = parseInt(req.params.id);

	for (let i = 0; i < userTableData.length; i++) {
		console.log(userTableData[i]);
		if (userTableData[i]['id'] === id) {
			userTableData.splice(i, 1);
		}
	}
	res.send(JSON.stringify({success: true }));
});



