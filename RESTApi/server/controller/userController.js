import { userModel } from "../models/userModel.js";

//@GET for getUsers from database
const getUser = async (req, res) => {
  const users = await userModel.find();

 users.password=undefined;
 return res.status(200).json({users})
};


//@POST for create a user in database
const createUser = async (req, res) => {
  const { name, email, country, age, password } = req.body;

  if (!name || !email || !country || !age || !password) {
    return res.status(401).json({ message: "Please fill all the fields" });
  }

  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(402).json({ message: "this email is already used" });
  }
 const newUser = await userModel.create({ name, email, country, age, password});

  if (newUser) {
    newUser.password=undefined;
    return res
      .status(200)
      .json({ message: "user created successfully", user: newUser });
  }
};

//@PUT edit user data in database
const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, country, age } = req.body;
  const user = await userModel.findOne({ _id: id });
  if (!user) return res.status(404).json({ message: "user not found" });

  const newUser = await userModel.updateOne(
    { _id: id },
    {
      $set: {
        name: name,
        email: email,
        password: password,
        country: country,
        age: age,
      },
    }
  );
  if (newUser)
    return res.status(200).json({ message: "user updated successfully" });
};

// @DELETE delete a user from the database
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await userModel.findOne({ _id: id });
  if (!user) return res.status(404).json({ message: "user not found" });
  const newUser = await userModel.deleteOne({ _id: id });
  if (newUser)
    return res.status(200).json({ message: "user deleted successfully " });
};

export { getUser, createUser,editUser ,deleteUser };
