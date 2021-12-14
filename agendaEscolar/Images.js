const images = {
    student: {
        uno: require('./data/imagenesAlumnos/1.jpg'),
        dos: require('./data/imagenesAlumnos/2.jpg'),
        tres: require('./data/imagenesAlumnos/3.jpg'),
        cuatro: require('./data/imagenesAlumnos/4.jpg'),
        cinco: require('./data/imagenesAlumnos/5.jpg'),
        seis: require('./data/imagenesAlumnos/6.jpg'),
        siete: require('./data/imagenesAlumnos/7.jpg'),
        ocho: require('./data/imagenesAlumnos/8.jpg'),
        nueve: require('./data/imagenesAlumnos/9.jpg'),
        diez: require('./data/imagenesAlumnos/10.jpg'),
    },
    educator: {
        uno: require('./data/imagenesEducadores/1.jpg'),
        dos: require('./data/imagenesEducadores/2.jpg'),
        tres: require('./data/imagenesEducadores/3.jpg'),
        cuatro: require('./data/imagenesEducadores/4.jpg'),
        cinco: require('./data/imagenesEducadores/5.jpg'),
    },
    menu: {
        uno: require('./data/imagenesMenu/1.png'),
        dos: require('./data/imagenesMenu/2.png'),
        tres: require('./data/imagenesMenu/3.png'),
        cuatro: require('./data/imagenesMenu/4.png'),
        cinco: require('./data/imagenesMenu/5.png'),
        seis: require('./data/imagenesMenu/6.png'),
        siete: require('./data/imagenesMenu/7.png'),
        ocho: require('./data/imagenesMenu/8.png'),
        nueve: require('./data/imagenesMenu/9.png'),
        diez: require('./data/imagenesMenu/10.png'),
        blanco: require('./data/imagenesMenu/blanco.jpeg'),
        carne: require('./data/imagenesMenu/carne.png'),
        manzana: require('./data/imagenesMenu/manzana.png'),
        menu: require('./data/imagenesMenu/menu.png'),
        verdura: require('./data/imagenesMenu/verdura.png'),
        vermenu: require('./data/imagenesMenu/vermenu.png'),
        yogur: require('./data/imagenesMenu/yogur.png'),
    },
    task: {
        microondas: require('./data/imagenesTareas/microondas.png'),
    },
};

export function getRequire(type, name){
    switch(type){
        case "student":
            switch(name){
                case "1.jpg":
                    return images.student.uno;
                case "2.jpg":
                    return images.student.dos;
                case "3.jpg":
                    return images.student.tres;
                case "4.jpg":
                    return images.student.cuatro;
                case "5.jpg":
                    return images.student.cinco;
                case "6.jpg":
                    return images.student.seis;
                case "7.jpg":
                    return images.student.siete;
                case "8.jpg":
                    return images.student.ocho;
                case "9.jpg":
                    return images.student.nueve;
                case "10.jpg":
                    return images.student.diez;
                default:
                    return images.student.uno;
            }
        case "educator":
            switch(name){
                case "1.jpg":
                    return images.educator.uno;
                case "2.jpg":
                    return images.educator.dos;
                case "3.jpg":
                    return images.educator.tres;
                case "4.jpg":
                    return images.educator.cuatro;
                case "5.jpg":
                    return images.educator.cinco;
                default:
                    return images.student.uno;
            }
        case "menu":

            break;
        case "task":

            break;
    }
}

export default images;