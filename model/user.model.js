export const user = class {
    constructor(name, email, password,) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdDate = new Date().toLocaleDateString() + new Date().toLocaleTimeString();
    }
}