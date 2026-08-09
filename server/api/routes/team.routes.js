const express = require('express');
const TeamController = require('../controllers/team.controller');
const authenticateAdmin = require('../middlewares/authenticate');
const router = express.Router();

router.get('/api/public/team', TeamController.getAllTeamMembers);
router.post('/api/admin/team', authenticateAdmin, TeamController.createTeamMember);
router.put('/api/admin/team/:id', authenticateAdmin, TeamController.updateTeamMember);
router.delete('/api/admin/team/:id', authenticateAdmin, TeamController.deleteTeamMember);

module.exports = router;
