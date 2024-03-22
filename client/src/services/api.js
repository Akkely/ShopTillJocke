import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';


axios.post('http://localhost:5000/carts/addProduct', {
  userId: 3,
  productId: 5,
  amount: 1
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
export default axios;