export async function handler(req, res) {
  const { id } = req.query;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  const userId = Number(id);

  if (req.method === "DELETE") {
    try {
      // Check if user exists before attempting to delete
      const userExists = await db.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }

      await db.user.delete({
        where: { id: userId },
      });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error); // Log the full error
      res
        .status(500)
        .json({ error: "Failed to delete user", details: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: req.body,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error); // Log the full error
      res
        .status(500)
        .json({ error: "Failed to update user", details: error.message });
    }
  } else {
    res.setHeader("Allow", ["DELETE", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
