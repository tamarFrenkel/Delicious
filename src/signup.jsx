import React, {useState} from "react";
import { useForm } from "react-hook-form";
import './signup.css';

export default function signup(){

    const [name, setName] = useState(" ");

    const {
        register,
        handleSubmit,
        formState: {errors}
    }=useForm();

    const submitFunc = (data) =>{
        console.log('data', data);
        setName(data.userName);
    }

    return(<>

        <form onSubmit={handleSubmit(submitFunc)}>
            <input type="text" placeholder="enter your firstName" 
            {...register("userName", {required:{value:true, message:"we wait to your firstName"},
            pattern:{}})} />
            {errors.userName && <p>{errors.userName.message}</p> }

            <input type="text" placeholder="enter your lastName" 
            {...register("userLastName", {required:{value:true, message:"we wait to your lastName"},
            pattern:{}})} />
            {errors.userLastName && <p>{errors.userLastName.message}</p> }

            <input type="text" placeholder="enter your tz"
            {...register("tz", {required:{value:true, message:"we wait to your tz"},
                minLength:{value:8, message:"the tz doesnt realty"},
            pattern:{}})} />
            {errors.tz && <p>{errors.tz.message}</p> }

            <input type="number" placeholder="enter your phone"
            {...register("phone", {required:{value:true, message:"we wait to your phone"},
            pattern:{}})}  />
            {errors.phone && <p>{errors.phone.message}</p> }

            <input type="date" placeholder="enter your dirthDate"
            {...register("birthDate", {required:{value:false, message:"we wait to your birthDate"},
            pattern:{}})} />
            {errors.birthDate && <p>{errors.birthDate.message}</p> }

            <input type="email" placeholder="enter your Email"
            {...register("Email", {required:{value:true, message:"we wait to your Email"},
            pattern:{}})}  />
            {errors.Email && <p>{errors.Email.message}</p> }
            
            <input type="password" placeholder="enter your password"
            {...register("password", {required:{value:true, message:"we wait to your password"},
            pattern:{}})}  />
            {errors.password && <p>{errors.password.message}</p> }

            <input type="submit" value={signup} />
        </form>

        userName!="" && <h1>Hello to {userName}</h1>



    </>)
}