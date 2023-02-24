export interface IAuthResponse {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    linkCV: string;
    englishLevel: string;
    role: string;
    jwtToken: string;
}

export interface IAuthUser {
    email: string;
    password: string;
}

export interface IRegisterUser {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    linkCV: string;
    englishLevel: string;
    technicalSkills: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

export interface IRegisterUserResponse {
    message: string;
}