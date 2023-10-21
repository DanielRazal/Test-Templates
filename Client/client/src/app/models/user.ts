export class User {
    id: string = "";
    userName: string = "";
    password: string = "";
}


export class UserLogin {
    user!: User;
    token: string = ""
}