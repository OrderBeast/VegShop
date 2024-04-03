import { useState } from "react";

export interface IRegisterData  {
  userName: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
}

function RegisterForm({afterSubmit} : {afterSubmit: (date: IRegisterData) => void})  {
    const [formData, setFormData] = useState<IRegisterData>({
      userName: '',
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // You can handle form submission here, for example, by sending the data to a server

      afterSubmit(formData)

      // Reset form fields after submission
      setFormData({
        userName: '',
        email: '',
        firstName: '',
        lastName: '',
        password: ''
      });
    };
  
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  
  export default RegisterForm;
  
  
  