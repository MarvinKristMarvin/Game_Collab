import bcrypt from "bcrypt";

// Function to hash a password (convert it into a secure, irreversible string)
export const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    // Generate a random salt (a unique string added to the password for extra security)
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        // If there's an error during salt generation, reject the promise
        reject(err);
      }
      // Use the generated salt to hash the password
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          // If there's an error during hashing, reject the promise
          reject(err);
        }
        // If hashing is successful, resolve the promise with the hashed password
        resolve(hash);
      });
    });
  });
};

// Function to compare a plain password with a previously hashed password, this is used to check if a user's input matches their stored hashed password
export const comparePassword = (password: string, hashed: string) => {
  // Bcrypt.compare returns a promise that resolves to true if the passwords match or false otherwise
  return bcrypt.compare(password, hashed);
};
