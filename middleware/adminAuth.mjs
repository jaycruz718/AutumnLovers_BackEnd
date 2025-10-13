import User from "../models/userSchema.mjs";

export default async function adminAuth(req, res, next) {
 
  const id = req.user.id;

  try {
    
    const user = await User.findById(id).select("isAdmin");

    
    if (!user)
      return res.status(401).json({ errors: [{ msg: "Unauthorized!" }] });

    
    if (user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ errors: [{ msg: "Access Denied!"}] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: [{ msg: "Server error" }] });
  }
}
