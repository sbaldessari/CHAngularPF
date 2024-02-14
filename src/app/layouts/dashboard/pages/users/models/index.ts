export interface User {
    id: string;    
    firstName: string;
    lastName: string;  
    role: string;  
    phone: string;
    email: string;
    password: string;    
    createdAt: Date;
    token: string;
}