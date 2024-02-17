import React, { useState } from 'react';

export default function SignupForm(){
  const [user, setUser]=useState({
    email:"",
    name:"",
    country:"",
    password:""
  })

  const[errors,setErrors]=useState({
    email:"",
    password:"",
    age:""
  });

  const isEmailValid=(email)=>{
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleInputChange=(event)=>{
    const{name,value}=event.target
    setUser(preData=>({...preData,[name]:value}))
    
    if(name=="email"){
      const isValid=isEmailValid(value)  // for check email formet 
      setErrors(preError=>({email:isValid? "": "Enter valid email"}))
    }


    if(name=="password"){
      setErrors(preErrors=>({...preErrors,password: value.length>=8 ? "" :" Password should more then 8 character"}))
    }

    if(name=="age"){
      setUser(preData=>({...preData,age:Math.abs(value)}))
      setErrors(preErrors=>({...preErrors,age:(value<=120 && value>0) ? "" :"Please enter valid age"}))
    }
  }


  const handleSubmit=(e)=>{
    e.preventDefault;
  }

  const{email, name, country, age, password}=user
  const isFormValid =email && name && country && age && password && !errors.email && !errors.password && !errors.age;
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-black rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" value={email} onChange={handleInputChange} className="form-input w-full" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={name} onChange={handleInputChange} className="form-input w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="country">Country:</label>
          <input type="text" name="country" id="country" value={country} onChange={handleInputChange} className="form-input w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="age">Age:</label>
          <input type="number" name="age" max={120} min={1} id="age" value={age} onChange={handleInputChange} className="form-input w-full" />
          {errors.age && <span className="text-red-500 text-xs">{errors.age}</span>}
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" value={password} onChange={handleInputChange} className="form-input w-full" />
          {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
        </div>
        <button type="submit" disabled={!isFormValid} className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${!isFormValid && 'opacity-50 cursor-not-allowed'}`}>Submit</button>
      </form>
    </div>
  );
};
