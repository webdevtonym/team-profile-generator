// TODO: Write code to define and export the Employee class
class employee {
    constructor(name, id, email ){
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return 'Employee';
    }
}

