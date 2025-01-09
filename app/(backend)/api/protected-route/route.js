import { getSession } from "next-auth/react"; // Assuming you're using next-auth for authentication

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "You need to be signed in." });
  }

  if (session.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "Forbidden: You don't have access to this page." });
  }

  // Proceed with the route logic
  res.status(200).json({ message: "Welcome to the admin page!" });
}
