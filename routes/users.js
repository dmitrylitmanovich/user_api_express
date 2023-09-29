const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

/**
 * @swagger
 *   components:
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *             description: The user's Id.
 *             example: 65161b5e1c26ef7d109f2c57
 *           name:
 *             type: string
 *             description: The user's name.
 *             example: John Doe
 *           email:
 *             type: string
 *             description: The user's email.
 *             example: jd@example.com 
 *       newUser:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             description: The user's name.
 *             example: John Doe
 *           email:
 *             type: string
 *             description: The user's email.
 *             example: jd@example.com 
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
*/
router.get('/', usersController.index);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve an user by Id.
 *     description: Retrieve an user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
*/
router.get('/:userId', usersController.show);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create an user.
 *     description: Create an user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/newUser'   
 *     responses:
 *       201:
 *         description: Newly created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', usersController.create);

/**
 * @swagger
 * /api/users:
 *   put:
 *     summary: Update an user by Id.
 *     description: Update an user  by Id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/newUser'  
 *     responses:
 *       200:
 *         description: An updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
*/
router.put('/:userId', usersController.update);

/**
 * @swagger
 * /api/users:
 *   delete:
 *     summary: Remove an user.
 *     description: Remove an user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to remove.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User has been removed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User removed
*/
router.delete('/:userId', usersController.destroy);

module.exports = router;
