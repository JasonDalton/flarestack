db.createUser(
  {
    user: "billtes",
    pwd: "thisisareallygoodsecret",
    roles: [
      {
        role: "readWrite",
        db: "flarestack-database"
      }
    ]
  }
)
