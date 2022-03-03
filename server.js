require("dotenv").config()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const express = require("express")
const { engine } = require("express-handlebars")
const jwt = require("jsonwebtoken")
const agentes = require("./data/agentes.json")

const { PORT, JWT_SECRET, JWT_TTL } = process.env

const app = express()

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => res.redirect("/login"))
app.get("/login", (req, res) => res.render("login", req))
app.get("/logout", (_, res) => res.clearCookie("token").redirect("/"))

app.post("/signIn", (req, res) => {
  try {
    const { email, password } = req.body
    const { nombre } = agentes.find(a => a.email == email && a.password == password)
    const token = jwt.sign({ nombre, email }, JWT_SECRET, { expiresIn: JWT_TTL })
    res.cookie("token", token).redirect("/_")
  } catch (err) {
    res.redirect("/login?bad=1")
  }
})

app.use("/_", (req, res, next) => {
  try {
    req.agente = jwt.verify(req.cookies.token, JWT_SECRET)
    next()
  } catch (err) {
    res.clearCookie("token").status(403).render("error", {
      ...req,
      title: "Error 403 - Acceso denegado",
      message: "no tiene permitido acceder a este recurso"
    })
  }
})

app.get("/_", (req, res) => {
  res.render("home", req)
})

app.use((req, res, _) => {
  res.status(404).render("error", {
    ...req,
    title: "Error 404 - No encontrado",
    message: "el recurso no existe"
  })
})

app.listen(PORT, () => {
  console.log(`escuchando en el puerto ${PORT}`)
})
