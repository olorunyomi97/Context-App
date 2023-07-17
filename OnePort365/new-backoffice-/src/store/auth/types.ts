export interface IUserSignin {
  email: string;
  password: string;
}

export interface IUserSignUp {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  country_code: string;
  company_name: string;
  company_address: string;
  password: string;
}

export interface IValidatePhoneAndEmail {
  email: string;
  phone: string;
}

export interface IValidateEmailAndPassword {
  email: string;
  password: string;
}

export interface IUserForgotPassword {
  email: string; 
}
