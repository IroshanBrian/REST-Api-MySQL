import { useState, useEffect } from 'react';
import axios from 'axios';

interface DataItem {
     id: number;
     name: string;
     age: number;
     email: string;
}

const Table = () => {
     const [data, setData] = useState<DataItem[]>([]);
     const [editingId, setEditingId] = useState<number | null>(null);
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [age, setAge] = useState(0);

     useEffect(() => {
          fetchData();
     }, [data]);

     const fetchData = async () => {
          try {
               const response = await axios.get<DataItem[]>('/api/data');
               setData(response.data);
          } catch (error) {
               console.error('Error fetching data:', error);
          }
     };

     const handleEdit = (item: DataItem) => {
          setEditingId(item.id);
          setName(item.name);
          setEmail(item.email);
          setAge(item.age);
     };

     const handleUpdate = async () => {
          if (editingId !== null) {
               try {
                    await axios.put(`/api/data/${editingId}`, { name, age, email });
                    setData(data.map(item => (item.id === editingId ? { ...item, name, age, email } : item)));
                    resetForm();
               } catch (error) {
                    console.error('Error updating data:', error);
               }
          }
     };

     const handleDelete = async (id: number) => {
          try {
               await axios.delete(`/api/data/${id}`);
               setData(data.filter(item => item.id !== id));
          } catch (error) {
               console.error('Error deleting data:', error);
          }
     };

     const resetForm = () => {
          setEditingId(null);
          setName('');
          setEmail('');
          setAge(0);
     };

     return (<div>
          <div className="shadow-md rounded-lg flex align-middle justify-center p-10">
               <table className="text-sm rounded-lg text-left rtl:text-right text-gray-500 dark:text-gray-400 sm:w-10">
                    <caption className="p-5 text-lg font-semibold text-center rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                         Users
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                         <tr>
                              <th scope="col" className="px-6 py-3">
                                   ID
                              </th>
                              <th scope="col" className="px-6 py-3">
                                   Name
                              </th>
                              <th scope="col" className="px-6 py-3">
                                   Email
                              </th>
                              <th scope="col" className="px-6 py-3">
                                   Age
                              </th>
                              <th scope="col" className="px-6 py-3">
                                   <span className="sr-only">Edit</span>
                              </th>
                              <th scope="col" className="px-6 py-3">
                                   <span className="sr-only">Delete</span>
                              </th>
                         </tr>
                    </thead>
                    <tbody>
                         {data.map(item => (
                              <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                   <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.id}
                                   </th>
                                   <td className="px-6 py-4">
                                        {item.name}
                                   </td>
                                   <td className="px-6 py-4">
                                        {item.email}
                                   </td>
                                   <td className="px-6 py-4">
                                        {item.age}
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleEdit(item)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                             Edit
                                        </button>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(item.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                             Delete
                                        </button>
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>

          {editingId !== null && (
               <div className="max-w-sm mx-auto mt-5 p">
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                         <div className="mb-5">
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                   Name
                              </label>
                              <input
                                   type="text"
                                   id="name"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required
                              />
                         </div>
                         <div className="mb-5">
                              <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                   Age
                              </label>
                              <input
                                   type="number"
                                   id="age"
                                   value={age}
                                   onChange={(e) => setAge(Number(e.target.value))}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required
                              />
                         </div>
                         <div className="mb-5">
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                   Email
                              </label>
                              <input
                                   type="email"
                                   id="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required
                              />
                         </div>
                         <button
                              type="submit"
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                         >
                              Update
                         </button>
                         <button
                              type="button"
                              onClick={resetForm}
                              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ml-2"
                         >
                              Cancel
                         </button>
                    </form>
               </div>
          )}
     </div>
     );
};

export default Table;
