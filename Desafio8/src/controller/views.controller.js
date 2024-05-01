const { Router } = require('express')
const authMiddleware = require('../middleware/auth.middleware')



const ViewsRouter = Router()

ViewsRouter.get('/login', async (req, res) => {
    try {
     res.render ('login')   
    } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

ViewsRouter.get('/signup', async (req, res) => {
    try {
        res.render('signup');
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

ViewsRouter.get('/profile', authMiddleware, async (req, res) => {
    try {
        const { user } = req.session
        res.render ('profile')   
    } catch (error) {
        console.error ('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }})


module.exports = ViewsRouter
