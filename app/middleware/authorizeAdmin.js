// This middleware checks if the authenticated user has the 'ADMIN' role
export async function authorizeAdmin(request) {
  const user = request.user; // Assume user information is set by `authenticate` middleware

  if (user && user.role === "ADMIN") {
    return null; // No error, user is an admin
  }
  return {
    error: "Forbidden: You do not have permission to perform this action",
  }; // Not an admin
}
