const cron = require('node-cron');
const sendEmail = require('../utils/nodeMailer');
const Html = require('../models/htmlCode.js')
const { getHtmlbyquery , updateHtmlById } = require('../repository/html.repo.js');
const { getUserByQuery } = require('../repository/user.repo.js');





function sendMailCronJob() {
    console.log('time started')
    cron.schedule('*/1 * * * *', async () => {

        try {
            let date = new Date().toLocaleDateString();
            console.log(date);
            const [cmonth, cday, cyear] = date.split('/').map(Number);
    const todayDate = `${cyear}-0${cmonth}-${cday}`;
    console.log(todayDate)
            const query = {
                publishDate: {
                    $eq: todayDate
                },
                status: {
                    $ne: "published"
                }// users.forEach(async (user) => {
            //     console.log(user)
            //     await sendEmail(user.email, 'hi user', 'code will get published soon');
            // });
            };
            const [err, htmls] = await getHtmlbyquery(query);
            console.log(htmls.length , 'length');

            let uidArray = [];
            for (let i in htmls) {
               
                
                console.log(htmls[i].uid);
                uidArray.push(htmls[i].uid)
            }

            let setUid = new Set(uidArray);
            uidArray = [...setUid];



            console.log(uidArray , 'uidarray')

            let query2 = { _id: { $in: uidArray } }

            const [err2, users] = await getUserByQuery(query2);
            console.log(users);

            const emailArray = [];
            const uidEmailMap = {}; 

            for (let i in users) {
                const { _id, email } = users[i];
    emailArray.push(email);
    uidEmailMap[_id] = email; 
            }

            const userHtmlInfo = {};
            console.log(emailArray)
            uidArray.forEach(async (uid) => {
                const userHtmls = htmls.filter(html => html.uid === uid);
            
                const userHtmlArray = [];
            
                userHtmls.forEach(html => {
                    const { publishDate, publishTime, endPoint, title } = html;
            
                    const htmlInfo = { publishDate, publishTime, endPoint, title };
            
                    userHtmlArray.push(htmlInfo);
                });
                const email = uidEmailMap[uid];
            
                userHtmlInfo[email] = userHtmlArray;
            
            });

            console.log(userHtmlInfo , 'object of info')


            for (const email in userHtmlInfo) {
                if (userHtmlInfo.hasOwnProperty(email)) {
                  console.log(email);
                  const htmlArray = userHtmlInfo[email];
                  const emailContent = htmlArray.map(html => `Publish Date: ${html.publishDate}, Publish Time: ${html.publishTime}, End Point: ${html.endPoint}, Title: ${html.title}`).join('\n\n');
                  await sendEmail(email, 'Hi User', emailContent);
                }
              }

            console.log('Emails sent successfully.');
        } catch (error) {
            console.error('Error sending emails:', error);
        }
    });
}

function changeStatus() {
    cron.schedule('*/1 * * * *', async () => {

        try {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const time = `${hours}:${minutes}`;

            const query = {};
            // const projection = { publishTime: 1, _id: 0 }; 
            const htmls = await Html.find(query);
            console.log(htmls);

            let publishTimes = [];
            for(let i in htmls){
                
                if(htmls[i].publishTime !== undefined){
                    let obj = {
                        id : htmls[i]._id,
                        
                    }
                    obj.publishTime = htmls[i].publishTime
                    publishTimes.push(obj)
                }
                
            }
            console.log(publishTimes)
            // console.log(publishTimes)

            let htmlIdtoUpdate = publishTimes.filter(html => html.publishTime == time)
            let idsToUpdate;
            if(htmlIdtoUpdate.length > 0){

                 idsToUpdate = htmlIdtoUpdate.map(obj => obj.id);

            }
            console.log(idsToUpdate);


            if(idsToUpdate){
                
                const updatehtmls = async (req, res) => {
                    try {
                        for (const id of idsToUpdate) {
                            const updatedHtml = await updateHtmlById(id, { status: "published", isPublished: true });
                            if (!updatedHtml) {
                                // return res.status(500).send('Error in updating html');
                                console.log('error in updating')
                            }
                            console.log('HTML updated successfully:', updatedHtml);
                            
                        }

                        // res.status(200).send('Updated HTMLs successfully');
                    } catch (error) {
                        console.error('Error in updatehtmls:', error);
                        res.status(500).send('Internal Server Error');
                    }
                };
                
                updatehtmls();
                
            }


        } catch (error) {
            console.error('Error changing status:', error);
        }
    });
}

module.exports = {
    sendMailCronJob,

    changeStatus
};
