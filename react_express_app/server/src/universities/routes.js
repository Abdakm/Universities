const { Router } = require('express');
const controller = require('./controller');

const router = Router();

const mustLoggingin = (req, res, next) => {
    if(!req.session.user) return res.status(401).json({message: 'your not authentication'})
    next()
}

router.get('/', mustLoggingin, controller.getUniversities);
router.post('/add', controller.addUniversity);
router.get('/:id', controller.getUniversityById);
router.put('/:id', controller.editUniversity)
router.delete('/:id', controller.deleteUniversity);

module.exports = router;