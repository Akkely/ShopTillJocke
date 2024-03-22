import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';


// axios.post('http://localhost:5000/carts/addProduct', {
//   userId: 1,
//   productId: 8,
//   amount: 2
// }).then(response => {
//   console.log(response.data);
// }).catch(error => {
//   console.error(error);
// });


export default axios;