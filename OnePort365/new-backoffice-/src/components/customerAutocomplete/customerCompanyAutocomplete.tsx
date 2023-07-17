import React, { FC, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { searchCustomer, getSingleCustomer } from "store/actions";
import AsyncSelect from 'react-select/async';
import { Controller } from "react-hook-form";


interface Props {
    control: object;
    name: string;
    id: string;
    label: string;
    isRequired: boolean;
    isDisabled: boolean;
    placeholder: string;
    icon: string;
    errors: object;
    defaultValue: string;
    options: any;
}

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];


const CustomerCompanyAutocomplete = (props:any) => {
    const params = useParams();
    const [selectedOption, setSelectedOption] = useState(null);
    

    const {defaultValue,isRequired,   options,
        control,
        name,
        id,
        label,
    
        isDisabled,
    
        placeholder,
        icon,
        errors,
       search_result} = props
    
    const formatSearchResult = (data:any) => {
        const formattedOptions:any = []

       if(data.length){
        data.map((customer: any) => {
            console.log(customer)
            formattedOptions.push({
                // @ts-ignore 
                value: customer._id,
                // @ts-ignore 
                label: `${customer.company_name}`,
                // @ts-ignore 
                // isdisabled: true
            })

            // formattedOptions.push({
            //     // @ts-ignore 
            //     value: customer._id,
            //     // @ts-ignore 
            //     label: <small> {customer.firstname} {customer.lastname} <br /> {customer.email} <br/> {customer.company_name} </small> ,
            //     // @ts-ignore 
            //     isdisabled: true,
            // })
            console.log(customer._id)
        })
       }
        return formattedOptions
    }


        const promiseOptions = (inputValue: string) =>
        new Promise<any>((resolve) => {
            setTimeout(() => {
            resolve(formatSearchResult(search_result));
            }, 1000);
        });

        useEffect(() => {
            if(params.id){
                props.getSingleCustomer(params.id);
            }
        },[getSingleCustomer]);

  

        const handleChange = (searchParam :string) => {
            props.searchCustomer(searchParam);
        }



    
    return (
        <div className="App">
             {/* // @ts-ignore  */}

             <Controller
                    //  @ts-ignore
                    control={control}
                    defaultValue={defaultValue}
                    name={name}
                    rules={{
                        required: isRequired ? true : false,
                    }}
                    render={({ field: { onChange, value } }) => (
                        <AsyncSelect 
                            cacheOptions 
                            defaultOptions 
                            defaultValue={defaultValue}
                            onChange={(val: any, p) => {
                                onChange(val);
                            }}
                            placeholder={placeholder}
                            name={name}
                            onInputChange={handleChange} 
                            loadOptions={promiseOptions} 
                        />
                    )} 
                />
           
             {/* @ts-ignore */}
            {errors[name] && (
                <div className="mt-2 error-text">
                    <p>{label ? label : name} is required.</p>
                </div>
            )}
             </div>
     
    );
}

const mapStateToProps = (state: any) => {
    const { single_customer, search_result, loading } = state.customers;
    return { single_customer, search_result, loading };
};

export default connect(mapStateToProps, { searchCustomer, getSingleCustomer,  })(CustomerCompanyAutocomplete);
