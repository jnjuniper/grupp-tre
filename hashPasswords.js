const bcrypt = require('bcrypt');
const db = require('better-sqlite3')('./db/admins.db');

const users = [
  { username: 'admin', plainTextPassword: 'admin' },
  { username: 'anton', plainTextPassword: 'anton' },
  { username: 'oliver', plainTextPassword: 'oliver' },
  { username: 'jonathan', plainTextPassword: 'jonathan' },
  { username: 'amro', plainTextPassword: 'amro' }
 // Lägg till fler användare här, kör kommando i terminalen "node hashPasswords.js" för att göra lösenorden funkar
];

users.forEach(user => {
  const hashedPassword = bcrypt.hashSync(user.plainTextPassword, 10);
  const result = db.prepare('UPDATE admins SET password = ? WHERE username = ?').run(hashedPassword, user.username);
  
  if (result.changes > 0) {
    console.log(`Lösenordet för användaren "${user.username}" är nu hashat.`);
  } else {
    console.log(`Kunde inte hitta användaren "${user.username}" i databasen.`);
  }
});
