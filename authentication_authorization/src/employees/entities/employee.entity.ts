export class Employee {
    id: string;
    username: string;
    password: string;
    role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
    createdAt: string;
}