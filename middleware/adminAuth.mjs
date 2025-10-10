import User from "../models/userSchema.mjs";

export default async function adminAuth(req, res, next) {
 
  const id = req.user.id;

  try {
    
    const user = await User.findById(id).select("isAdmin");

    
    if (!user)
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

    
    if (user.isAdmin) {
      next();
    } else {
      throw new Error("Entry Denied!!!");
    }
  } catch (err) {
    console.error(err);
    res.status(403).json({ errors: [{ msg: err.message }] });
  }
}
