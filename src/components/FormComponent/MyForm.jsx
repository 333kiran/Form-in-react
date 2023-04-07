import React, { useState } from 'react';
import {Button,TextField,Select,MenuItem,FormControl,InputLabel,Box,styled, Typography } from "@mui/material";
import { Editor } from '@tinymce/tinymce-react';
import MyComponent from './RightComponent';

const Wrapper = styled(Box)`
 width:100vw;
 background:#878787;
 display:flex;
`;

const TableWrapper = styled(Box)`
 width:55vw;
 display:flex;
 background:#fff;
 margin:4rem 3rem;
border-radius:5px;
height:100vh;

`;

const  FormContainer = styled(Box)`
margin:4rem 3rem;
 width:40vw;
 border-radius:5px;
 background:#fff;
box-shadow: 0 2px 4px 0 rgb( 0 0 0/30%);

`;
const FormBox = styled("form")({
  display:'flex',
  flexDirection:'column',
  margin:'1rem 1rem',
})
 const InputBox = styled(TextField)`
  margin:0.5rem 2rem ;
 `;
 const FormControlBox = styled(FormControl)`
  margin:1rem 2rem;
 `;

 const DateBox = styled(Box)`
  display:flex;
  justify-content:space-evenly;
  color:green;
 `;
 const ButtonBox = styled(Box)`
  display:flex;
  padding-left:2rem;
  border-radius:5px;
  margin:1rem;
 `;

 const SubmitButton = styled(Button)`
  margin-right:2rem;
 `;
  const DescriptionBox = styled(Box)`
   margin:2rem;
  `;


const skills = ['HTML', 'CSS', 'React', 'TypeScript', 'CSS3', 'Javascript', 'JQuery'];

const MyForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [description, setDescription] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value.toLowerCase().replace(/[^a-z]/g, ''));
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value.replace(/\D/g, '').slice(0, 10));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value.toLowerCase().trim());
  };

  const handleSkillsChange = (event) => {
    setSelectedSkills(event.target.value);
  };

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
    setToDate('');
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };


  const handleDescriptionChange = (content) => {
    setDescription(content);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("form submitted successfully");
   
    // Reset form after submission
    setFirstName('');
    setLastName('');
    setUserName('');
    setPhoneNumber('');
    setEmail('');
    setSelectedSkills([]);
    setFromDate(null);
    setToDate(null);
    setDescription('');
  };


  const toMinDate = fromDate !== '' ? fromDate : new Date().toISOString().slice(0, 10); // minimum selectable date for the "To" picker

  return (
    <Wrapper>
      <FormContainer>
    <FormBox  onSubmit={handleSubmit}>
      <InputBox
        id="first-name"
        label="First Name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <InputBox
        id="last-name"
        label="Last Name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <InputBox
        id="user-name"
        label="User Name"
        value={userName}
        onChange={handleUserNameChange}
        required
        input="text"
        pattern="[a-z]+"
        />
        <InputBox
          id="phone-number"
          label="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          required
          inputProps={{ minLength: 10, maxLength: 10 }}
        />
        <InputBox
          id="email"
          label="Email"
          value={email}
          onChange={handleEmailChange}
          required
          type="email"
        />
        <FormControlBox >
          <InputLabel id="skills-label">Skills</InputLabel>
          <Select
            labelId="skills-label"
            id="skills"
            multiple
            value={selectedSkills}
            onChange={handleSkillsChange}
            required
          >
            {skills.map((skill) => (
              <MenuItem key={skill} value={skill}>
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControlBox>
        <Typography style={{marginLeft:'2rem',color:'maroon'}}>Choose Experience:</Typography>
        <DateBox>
          <Box>
          <label htmlFor="fromDate">From</label>
      <input type="date" id="fromDate" value={fromDate} onChange={handleFromDateChange} required />

         </Box>
         <Box>
         <label htmlFor="toDate">To</label>
      <input type="date" id="toDate" value={toDate} onChange={handleToDateChange} min={toMinDate} required />
 
         </Box>
          </DateBox>
          <DescriptionBox>
         <Editor 
          init={{
            height: 300,
            menubar: false,
           }} 
           onEditorChange={handleDescriptionChange}
          value={description}
          required
        /> 
        </DescriptionBox>
        <ButtonBox>
        <SubmitButton type="submit" variant="contained" color="primary">
          Submit
        </SubmitButton>
        <Button type="reset" variant="contained" color="secondary">
          Reset
        </Button>
        </ButtonBox>
      </FormBox>
      </FormContainer>
      <TableWrapper>
      <MyComponent/>
      </TableWrapper  >
      </Wrapper>
    
  )
          }

export default  MyForm;
