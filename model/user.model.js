let User = [{ name: "rishi", email: "avviare.rishi@gmail.com", password: "rishi@1234", createdDate: "" }]
export default User = class {
    static users = [];
    constructor(name, email, password,) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdDate = new Date().toLocaleDateString() + new Date().toLocaleTimeString();

    }

    static createUser(name, email, password) {
        const newUser = new User(name, email, password);
        User.users.push(newUser);
        return newUser;
    }

    static getUserByEmail(email) {
        return User.users.find(user => user.email === email)
    }

}