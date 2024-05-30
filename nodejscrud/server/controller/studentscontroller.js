const mysql=require("mysql2");
const con=mysql.createPool({
    connectionLimit:10,
    port:3306,
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'nodecrud'
});

exports.view=(req,res)=>{ 
    con.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
            connection.query("SELECT * FROM users", (err, rows) => {
                connection.release();
                if (!err) {
                    res.render("home",{rows});
                } else {
                    console.log('Error in querying users:', err);
                }
            });
        }
    });
    
}

exports.adduser=(req,res)=>{
    res.render("adduser");
}

exports.save=(req,res)=>{
    con.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
           const [name,age,city]=[req.body.name,req.body.age,req.body.city];
            connection.query("INSERT INTO users (nam,age,city) VALUES(?,?,?)",[name,age,city], (err, rows) => {
                connection.release();
                if (!err) {
                    res.render("adduser",{msg:"success"});
                } else {
                    console.log('Error in querying users:', err);
                }
            });
            
        }
    });
    
}

exports.edituser=(req,res)=>{
    con.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
            let id=req.params.id;
            connection.query("SELECT * FROM users WHERE id=?",[id], (err, rows) => {
                connection.release();
                if (!err) {
                    res.render("edituser",{rows});
                } else {
                    console.log('Error in querying users:', err);
                }
            });
            
        }
    });
}

exports.edit=(req,res)=>{
    con.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
           const [name,age,city]=[req.body.name,req.body.age,req.body.city];
           let id=req.params.id;
            connection.query("UPDATE users set nam=?,age=?,city=? WHERE id=?",[name,age,city,id], (err, rows) => {
                connection.release();
                if (!err) {
                    
                    con.getConnection((err, connection) => {
                        if (err) {
                            console.log(err);
                        } else {
                            let id=req.params.id;
                            connection.query("SELECT * FROM users WHERE id=?",[id], (err, rows) => {
                                connection.release();
                                if (!err) {
                                    res.render("edituser",{rows,msg:"updated success"});
                                } else {
                                    console.log('Error in querying users:', err);
                                }
                            });
                            
                        }
                    });
                    
                } else {
                    console.log('Error in querying users:', err);
                }
            });
            
        }
    });
    
}


exports.delete=(req,res)=>{
    con.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        } else {
           let id=req.params.id;
            connection.query("DELETE FROM users WHERE id=?",[id], (err, rows) => {
                connection.release();
                if (!err) {
                    res.redirect("/");
                } else {
                    console.log('Error in querying users:', err);
                }
            });
            
        }
    });
}

