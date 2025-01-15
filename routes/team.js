const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const teamMembers = [
    {
      name: 'Amro Altai',
      age: 30,
      title: 'Developer Rockstar',
      skills: ['HTML', 'CSS', 'JavaScript'],
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
      email: 'amro.altai@hotmail.com',
      phone: '123-456-7890',
      image: 'https://cdn.vectorstock.com/i/500p/21/98/male-profile-picture-vector-1862198.jpg',
    },
    {
      name: 'Oliver Borys',
      age: 28,
      title: 'Figma Warrior',
      skills: ['HTML', 'CSS', 'JavaScript'],
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
      email: 'oliver.borys@outlook.com',
      phone: '987-654-3210',
      image: 'https://cdn.vectorstock.com/i/500p/21/98/male-profile-picture-vector-1862198.jpg',
    },
    {
      name: 'Jonathan Berglund',
      age: 26,
      title: 'Git Master',
      skills: ['HTML', 'CSS', 'JavaScript'],
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
      email: 'jonathan.berglund88@gmail.com',
      phone: '555-234-5678',
      image: 'https://cdn.vectorstock.com/i/500p/21/98/male-profile-picture-vector-1862198.jpg',
    },
    {
      name: 'Anton Lundin',
      age: 31,
      title: 'Scrum King',
      skills: ['HTML', 'CSS', 'JavaScript'],
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.',
      email: 'a.lundin14@outlook.com',
      phone: '555-987-6543',
      image: 'https://cdn.vectorstock.com/i/500p/21/98/male-profile-picture-vector-1862198.jpg',
    },
  ];

  res.render('team', { title: 'Team', teamMembers });
});

module.exports = router;
