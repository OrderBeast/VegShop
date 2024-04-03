import { useState } from 'react';

export interface ILogInData  {
    userName: string,
    password: string
  }

  
function LoginForm({afterSubmit} : {afterSubmit: (date: ILogInData) => void}) {
  const [formData, setFormData] = useState<ILogInData>({
    userName: '',
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
    console.log(formData);
    // Reset form fields after submission
    afterSubmit(formData)

    setFormData({
      userName: '',
      password: ''
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter your username"
            required
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
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
