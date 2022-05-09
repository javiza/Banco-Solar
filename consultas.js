const { Pool} = require('pg');
const pool = new Pool({
    user: 'jona',
    host: 'localhost',
    password: '1234',
    database: 'banco_solar',
});
const insertar = async (datos) => {
    const consulta = {
        text: `INSERT INTO usuarios(nombre,balance) values ($1,$2) RETURNING *`,
        values:datos,
        rowMode: "array",
    };
    try{
        const resultado_consulta = await pool.query(consulta);
        return resultado_consulta
    }catch (err){
        console.error(err);
        return err;
    }
}
const consultar = async() => {
    try{
        const resultado = await pool.query(`SELECT * FROM usuarios`);
        console.info("filas: ", resultado.rowCount)
        return resultado.rows;
    }catch (err) {
        console.error(err);
        return err;
    }
}
const editar = async (datos) => {
    const consulta = {
        text: `UPDATE usuarios SET nombre=$2, balance=$3 WHERE id=$1 RETURNING *`,
        values: datos,
    }
    try{
        const resultado = await pool.query(consulta);
        return resultado;
    }catch (err) {
            console.error(err);
            return err;
        }
}
const eliminar = async(id) => {
    try {
        const resultado = await pool.query(`DELETE FROM usuarios WHERE id='${id}' RETURNING *`)
        console.info("eliminado: ", resultado.rowCount)
        return resultado.rowCount;
    }catch (err){
       console.error(err);
        return err;
    }
} 

 const transferencias = async(datos) =>{
     const actualiza = {
         text: `UPDATE usuarios SET nombre =$ 2 balance = balance - $3 WHERE nombre = $1 RETURNING *`,
         values: datos,
     };

     const inserta = {
         text: `INSERT INTO transferencias(emisor,receptor,monto,fecha) values($1,$2,$3,$4) RETURNING *`,
         values:datos,
         rowMode: "array",
     };
  
     try{
         await datos("BEGIN");
         const resultado = await datos(inserta);
         await datos(actualiza);
         await datos("COMMIT");
         console.info("La transaccion fue exitosa: ", resultado.rows[0]);
     } catch(ex){
         await datos("ROLLBACK");
         console.error(ex);
     }
 }


module.exports = {insertar,consultar, eliminar,editar,transferencias}

