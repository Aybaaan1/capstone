import jwt from "jsonwebtoken"; // If you're using JWT for authentication

// This middleware checks if a user is authenticated
export async function authenticate(request) {
  try {
    // Extract the token from the Authorization header
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return { error: "Unauthorized" }; // No token found, return unauthorized error
    }

    // Verify the token and extract user info
    const user = jwt.verify(token, process.env.JWT_SECRET); // Replace `JWT_SECRET` with your secret key
    request.user = user; // Attach user information to the request
    return null; // No error, the user is authenticated
  } catch (error) {
    console.error("Authentication error:", error);
    return { error: "Unauthorized" }; // Token verification failed
  }
}
