module.exports = class User {
    static users = [{ name: "Rishi", email: "avviare.rishi@gmail.com", password: "1", createdDate: "", lastActiveDate: '' }];
    constructor(name, email, password, lastActiveDate) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdDate = new Date().toLocaleDateString() + new Date().toLocaleTimeString();
        this.lastActiveDate = lastActiveDate
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