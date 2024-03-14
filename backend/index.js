const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();
app.use(cors());
app.use(express.json());

const userRoute = require('./routes/user.route')
const htmlRoute = require('./routes/html.route')
const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongo");
  } catch (error) {
    console.error("connection error:", error);
  }
};

app.use('/rapidops/api/users' , userRoute)
app.use('/rapidops/api/htmlFile' , htmlRoute)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});



// const express = require('express');
// const fs = require('fs');

// const app = express();
// const port = 3000;

// // File path
// const filePath = 'example.html'; // Change the file path to your HTML file

// // Create file
// const content = '<html><head><title>Example</title></head><body><p style="color:red; font-size:100px">Hello World</p><h1>This is an example HTML file</h1></body></html>';
// fs.writeFile(filePath, content, (err) => {
//   if (err) {
//     console.error('Error creating file:', err);
//     return;
//   }
//   console.log('File created successfully.');
// });

// // API endpoint to serve the HTML file
// app.get('/file', (req, res) => {
//   // Set content type to HTML
//   res.setHeader('Content-Type', 'text/html');

//   // Read file content
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading file:', err);
//       res.status(500).send('Error reading file');
//       return;
//     }
//     // Send file content in response
//     res.send(data);
//   });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });



// const cloudinary = require('cloudinary').v2;
// const fs = require('fs');

// // Configure Cloudinary with your credentials
// cloudinary.config({ 
//   cloud_name: 'aditya-cloud',
//   api_key: "257497453395613",
//   api_secret: "_O-UMeGD3WJ52netUnprfCiyzi0",
// });

// // Path to your HTML file
// const filePath = 'example.html';

// // Read the HTML file
// fs.readFile(filePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading file:', err);
//     return;
//   }
  
//   // Upload HTML file to Cloudinary
//   cloudinary.uploader.upload(filePath, { 
//     resource_type: 'raw', // Specify resource type as 'raw' for non-media files
//     public_id: 'file', // Public ID for the file
//     overwrite: true // Overwrite existing file with same public ID
//   })
//   .then(result => {
//     console.log('File uploaded successfully:', result);

//     // Construct the Cloudinary URL with transformation parameters
//     const transformedUrl = cloudinary.url(result.public_id, {
//       transformation: [
//         { fetch_format: 'html' }, // Transform to HTML format
//         { quality: 'auto' }, // Automatically optimize quality
//         { fetch_format: 'auto' }, // Automatically determine format
//       ],
//       flags: 'attachment:inline' // Set Content-Disposition header to "inline"
//     });
//     console.log('Transformed URL:', transformedUrl);
//   })
//   .catch(error => {
//     console.error('Error uploading file:', error);
//     console.log(error.message);
//     console.log(error.stack);
//   });
// });






// // const fetch = require('node-fetch');
// const express = require('express');
// // const fetch = require('node-fetch');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 3000;
// const NETLIFY_ACCESS_TOKEN = 'nfp_JmQaozP8zfAQyr4Dj6kGq2esXx4Dv5KQb69f';
// const NETLIFY_SITE_ID = '4c863e04-97e6-4978-b456-8d0d167bdbe24';

// // Middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Route to host HTML file
// app.post('/hostHTMLFile', async (req, res) => {
//   try {
//     const htmlContent = req.body.htmlContent;


//     // Retrieve the latest deploy ID
//     const deployId = await getLatestDeployId();
//     console.log(deployId);

//     // Upload HTML file to Netlify
//     // const fileId = await uploadHTMLFileToNetlify(htmlContent, deployId);
//     // console.log(fileId);

//     // // Generate URL for the uploaded file
//     // const fileUrl = `https://${NETLIFY_SITE_ID}.netlify.app/${fileId}`;

//     // res.json({ url: fileUrl });
//     res.json('completed');

//   } catch (error) {
//     console.error('Error hosting HTML file:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Upload HTML file to Netlify
// async function uploadHTMLFileToNetlify(htmlContent, deployId) {
//   console.log("coming in upload")

//   const response = await fetch(`https://api.netlify.com/api/v1/sites/${NETLIFY_SITE_ID}/deploys/${deployId}/files`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${NETLIFY_ACCESS_TOKEN}`,
//     },
//     body: JSON.stringify({
//       path: `file_${Date.now()}.html`, // Change the filename if needed
//       data: htmlContent,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to upload HTML file to Netlify');
//   }

//   const responseData = await response.json();
//   const fileId = responseData.id; // ID of the uploaded file
//   console.log(fileId);
//   return fileId;
// }

// // Retrieve the latest deploy ID
// async function getLatestDeployId() {
//   console.log("coming in deployId")
//   const response = await fetch(`https://api.netlify.com/api/v1/sites/4c863e04-97e6-4978-b456-8d0d167bdbe24/deploys`, {
//     headers: {
//       Authorization: `Bearer ${NETLIFY_ACCESS_TOKEN}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch deploys from Netlify');
//   }

//   const deploys = await response.json();
//   if (deploys.length === 0) {
//     throw new Error('No deploys found for the site');
//   }

//   // Get the deploy ID of the latest deploy
//   const latestDeploy = deploys[0];
//   const deployId = latestDeploy.id;
//   return deployId;
// }

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
