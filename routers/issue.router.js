import express from 'express';
import Issue from '../models/issue.model';
import IssueController from '../controllers/issue.controller'

const app = express();
const issueRouter = express.Router();

issueRouter.get('', IssueController.getAll);
issueRouter.get('/details', IssueController.getAllIssuesWithDetails);
issueRouter.get('/:id', IssueController.getById);
issueRouter.get('/:id/details', IssueController.getIssueWithDetailsById);
issueRouter.post('/add', IssueController.add);
issueRouter.post('/update/:id', IssueController.update);
issueRouter.get('/delete/:id', IssueController.delete);

export default issueRouter;