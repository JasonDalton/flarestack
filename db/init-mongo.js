db.createUser(
  {
    user: "flarestackman",
    pwd: "agoodsecret",
    roles: [
      {
        role: "readWrite",
        db: "flarestack-database"
      }
    ]
  }
)
