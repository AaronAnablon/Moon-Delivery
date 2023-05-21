import { url, setHeaders } from "../../slices/api";
import axios from "axios";

const sendMail = ({recipientEmail, subject, text}) => {

   axios.post(`${url}/email/send-email`, { recipientEmail, subject, text }, setHeaders())
 .then(response => {
   console.log(response.data.message);
 })
 .catch(error => {
   console.log('Error:', error);
 });
}

export default sendMail
