export class User {
    constructor(id, name, email, password, code, role_id, id_number, phone_number = null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.code = code;
        this.role_id = role_id; // Role ID (reference to Role class)
        this.id_number = id_number;  // ID number (Cedula)
        this.phone_number = phone_number;  // Phone number (defaults to null)
    }
}
