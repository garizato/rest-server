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
//  google Client Id
// ========================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '262131609543-lsin6rt41fb5cl8nftnaod76m8o25cgg.apps.googleusercontent.com';
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