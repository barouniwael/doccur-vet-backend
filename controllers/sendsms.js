function getToken() {
    return new Promise((resolve, reject) => {
      const url = "https://api.orange.com/oauth/v3/token";
  
      const data = {
        grant_type: "client_credentials",
      };
  
      const auth = {
        username: "cQE7MbADtZRAP1vBriuopv9Ag9EfTbyc",
        password: "XH15Ir6rhoaGBQjP",
      };
  
      const options = {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify(data),
        auth: auth,
        url,
      };
  
      axios(options)
        .then((response) => {
          const responseData = response.data.access_token;
         
          return responseData
       
        })
        .catch((err) => {
          reject(err);
        });
    });
  }




   exports.sendsms =async (to,msg)=> {
    
    const accessToken = getToken()
   
    for (let i = 0; i < to.length; i++) {
      const recipientPhoneNumber = `216${to[i]}`; // Replace with the recipient's phone number
      const devPhoneNumber = "2160000"; // Replace with your dev phone number
      const url = `https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B${devPhoneNumber}/requests`;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };
    
      const data = {
        outboundSMSMessageRequest: {
          address: `tel:+${recipientPhoneNumber}`,
          senderAddress: `tel:+${devPhoneNumber}`,
          outboundSMSTextMessage: {
            message: msg,
          },
        },
      };
    
      try {
        const response = await axios.post(url, data, { headers });
        console.log("SMS sent successfully:", response.data);
      } catch (error) {
        console.error("Error sending SMS:", error.response.data);
      }
    };
     // Replace with your actual access token
   
  }