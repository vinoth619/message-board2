const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const exhbs=require('express-handlebars')
const dbo= require('./db')
const objectID=dbo.objectID;
const path=require('path')

app.engine('hbs',exhbs.engine({layoutsDir:'views/',defaultLayout:'main',extname:'hbs'}));
app.set('view engine','hbs');
app.set('views','views')
app.use(bodyparser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))



app.get("/",async(req,res)=>{
    let database= await dbo.getDatabase()
    const collection=database.collection('informations')
    const cursor=collection.find({})
    let books= await cursor.toArray()
    let message='';
    let edit_id,edit_book;
    if(req.query.edit_id){
        edit_id=req.query.edit_id
    edit_book=await collection.findOne({_id: new objectID(edit_id)})
    }

    if(req.query.delete_id){
        let delete_id=req.query.delete_id;
         await collection.deleteOne({_id: new objectID(delete_id)})
        return  res.redirect('/')

    }
   
 res.render('main',{
        message,
        books,
        edit_id,
        edit_book,
        
        
        
    })
})

app.post("/new",async(req,res)=>{
    let date =new Date().toDateString()
    let time=new Date().toLocaleTimeString()


   
    let database= await dbo.getDatabase()
    const collection=database.collection('informations')
    let msg={username:req.body.username,message:req.body.message,day:date,times:time}
     collection.insertOne(msg)
     return res.redirect('/')

})

app.post("/update/:edit_id",async(req,res)=>{
    let date =new Date().toDateString()
    let time=new Date().toLocaleTimeString()
    let database= await dbo.getDatabase()
    const collection=database.collection('informations')
    let msg={username:req.body.username,message:req.body.message,day:date,times:time}
    let edit_id=req.params.edit_id
     collection.updateOne({_id: new objectID(edit_id)},{$set:msg})
     return res.redirect('/')

})

app.use((req,res)=>{
    res.send('<h1>404</h1>')
})


app.listen(3000,()=>{
    console.log("site is running 3000")
})
