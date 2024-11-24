import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("user.db");

/**
 * Initialize the database by creating tables if they don't exist.
 */
export const initializeDatabase = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL
        );`,
        [],
        () => {
          console.log("Database initialized successfully");
          resolve(); // Resolve the promise if successful
        },
        (_, error) => {
          console.error("Error initializing database:", error);
          reject(error); // Reject the promise on error
        }
      );
    });
  });
};

/**
 * Save a user's name to the database.
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @returns {Promise<void>}
 */
export const saveUserName = (firstName, lastName) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO users (first_name, last_name) VALUES (?, ?);",
          [firstName, lastName],
          (_, result) => {
            console.log("Data inserted:", result);
            resolve(result);
          },
          (_, error) => {
            console.error("Error inserting data:", error);
            reject(error);
          }
        );
      }
    );
  });
};
