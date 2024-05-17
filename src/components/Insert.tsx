import { useState, FormEvent } from 'react';
import axios from 'axios';

interface DataItem {
     id: number;
     name: string;
     age: number;
     email: string;
}

const Insert = () => {
     const [data, setData] = useState<DataItem[]>([]);
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [age, setAge] = useState<number | ''>('');

     const handleSubmit = async (event: FormEvent) => {
          event.preventDefault();
          try {
               const response = await axios.post<DataItem>('/api/data', { name, age, email });
               setData([...data, response.data]);
               setName('');
               setEmail('');
               setAge('');
          } catch (error) {
               console.error('Error submitting data:', error);
          }
     };

     return (
          <div className='p-10'>
               <form className="max-w-sm mx-auto bg-blue-400 p-10 rounded-lg" onSubmit={handleSubmit}>
                    <div className="mb-5">
                         <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your name
                         </label>
                         <input
                              type="text"
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              name="name"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="John Doe"
                              required
                         />
                    </div>
                    <div className="mb-5">
                         <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your age
                         </label>
                         <input
                              type="number"
                              value={age}
                              onChange={(e) => setAge(Number(e.target.value) || '')}
                              id="age"
                              name="age"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="0"
                              required
                         />
                    </div>
                    <div className="mb-5">
                         <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Your email
                         </label>
                         <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              id="email"
                              name="email"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="johndoe@gmail.com"
                              required
                         />
                    </div>
                    <button
                         type="submit"
                         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                         Submit
                    </button>
               </form>
          </div>
     );
};

export default Insert;
