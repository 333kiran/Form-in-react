import React, { useState, useEffect } from 'react';
import { Box ,styled} from '@mui/material';
import { FaFilter, FaPenAlt, FaTrashAlt } from 'react-icons/fa';

const Container = styled(Box)`
`;

const FormBox = styled(Box)`
 display:flex;
 flex-direction:column;
 margin:1rem 3rem;
`;
const TextBox = styled("input")({
    margin:'o.5rem 2rem',
    marginLeft:'0.5rem',
    marginTop:'2rem',
    width:'10rem',
    height:'2rem',
});
const TableStyle = styled('tr')({
    marginTop:'0.5rem',
    fontSize:"15px",
    color:'green',
})


function MyComponent({}) {
  const [data, setData] = useState([]); // table data
  const [filteredData, setFilteredData] = useState([]); // filtered table data
  const [currentPage, setCurrentPage] = useState(1); // current page number
  const [pageSize] = useState(5); // page size
  const [formValues, setFormValues] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' }); // form values
  const [editIndex, setEditIndex] = useState(-1); // index of the record being edited
  const [emailFilter, setEmailFilter] = useState(''); // email filter text

  useEffect(() => {
    // fetch data from API or local storage
    const fetchData = async () => {
      // example data
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setData(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  // calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // get the current page's data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  // handle form input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // handle form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editIndex !== -1) {
      // editing an existing record
      const newData = [...data];
      newData[editIndex] = { ...formValues };
      setData(newData);
      setFilteredData(newData);
      setEditIndex(-1);
    } else {
      // adding a new record
      setData([...data, { ...formValues }]);
      setFilteredData([...filteredData, { ...formValues }]);
    }
    setFormValues({ firstName: '', lastName: '', email: '', phoneNumber: '' });
  };

  // handle edit action
  const handleEdit = (index) => {
    setFormValues({ ...data[index] });
    setEditIndex(index);
  };

  // handle delete action
  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    setFilteredData(newData);
  };

  // handle email filter
  const handleEmailFilter = (event) => {
    const filterText = event.target.value;
    setEmailFilter(filterText);
    const filtered = data.filter((record) => record.email.includes(filterText));
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // get the current page's data
  const currentPageData = getCurrentPageData();

  return (
    <Container>
       <form onSubmit={handleFormSubmit} style={{margin:'1rem 1rem'}}>
       <FormBox> <label htmlFor="firstName">First Name</label >
        <input type="text" id="firstName" name="firstName" value={formValues.firstName} onChange={handleInputChange} required  
        />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" value={formValues.lastName} onChange={handleInputChange} required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email"/>

        <label htmlFor="phoneNumber">Phone Number</label>
    <input type="tel" id="phoneNumber" name="phoneNumber" value={formValues.phoneNumber} onChange={handleInputChange} required /> 

     <button type="submit" style={{marginTop:'1rem',background:'green',color:'white',border:'none'}}>{editIndex !== -1 ? 'Save' : 'Add'}</button></FormBox>
  </form> 
  <hr style={{marginLeft:"18px"}}/>
 <Box style={{display:'flex'}}>
    <FaFilter size="1.5rem" style={{margin:'2.4rem 0rem 1rem 2rem',padding:0}}/>
  <TextBox type="text" value={emailFilter} onChange={handleEmailFilter} placeholder="Filter by Email" />
  </Box>

  <table>
    <thead>
      <TableStyle>
        
        <th style={{paddingLeft:'15px',paddingRight:'15px'}}>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Actions</th>
      </TableStyle>
    </thead>
    <tbody>
      {currentPageData.map((record, index) => (
        <tr key={index}>
          <td>{record.firstName}</td>
          <td>{record.lastName}</td>
          <td>{record.email}</td>
          <td>{record.phoneNumber}</td>
          <td>
            <button onClick={() => handleEdit(index)} style={{background:"transparent",outline:'none',marginRight:'10px'}}><FaPenAlt color="blue" /></button>
            <button onClick={() => handleDelete(index)} style={{background:"transparent",outline:'none',border:'none'}}><FaTrashAlt color="red"/></button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <div style={{margin:"3rem auto 0 14rem"}}>
    {Array.from({ length: totalPages }).map((_, index) => (
      <button key={index} onClick={() => setCurrentPage(index + 1)} style={{color:'white',textAlign:'center', background:'green',border:'white',width:'2rem',height:'1.5rem',marginLeft:'1rem'}}>{index + 1}</button>
    ))}
  </div>
</Container>
);
}

export default MyComponent;
