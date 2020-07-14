// ========================================
//  PUERTO
// ========================================
process.env.PORT = process.env.PORT || 3000;

// ========================================
//  ENTORNO
// ========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ========================================
//  VENCIMIENTO DEL TOKEN
// ========================================
// 60 Segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ========================================
//  SEED DE AUTENTICACIÓN
// ========================================
process.env.SEED = process.env.SEED || 'SEED_DEV';


// ========================================
//  BASE DE DATOS
// ========================================
let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.MONGO_URI;
}

//urlBD = 'mongodb+srv://garizato:j5kYtsLDzpu7AQhe@cluster0.mbeol.mongodb.net/cafe';

process.env.URLDB = urlBD;