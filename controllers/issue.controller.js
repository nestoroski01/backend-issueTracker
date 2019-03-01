import Issue from '../models/issue.model';
import mongoose from 'mongoose';

const IssueController = {
    getAll(req, res) {
        Issue.find((err, issues) => {
            if (err) {
                console.log(err);
            }
            else {
                res.json(issues);
            }
        });
    },

    getAllIssuesWithDetails(req, res) {
        Issue.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'reporter',
                    foreignField: '_id',
                    as: 'reporterDetails'
                },
            },
            {
                $unwind: '$reporterDetails'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'responsible',
                    foreignField: '_id',
                    as: 'responsibleDetails'
                }
            },
            {
                $unwind: '$responsibleDetails'
            },
        ]).exec((err, issues) => {
            if (err) {
                res.status(400).json('Failed to get the issues!');
                console.log(err);
            }
            else {
                res.status(200).json(issues);
            }
        })
    },

    getById(req, res) {
        Issue.findById(req.params.id, (err, issue) => {
            if (err) {
                res.status(400).json('Failed to get the issue!');
            }
            else {
                res.status(200).json(issue);
            }
        });
    },

    getIssueWithDetailsById(req, res) {
        Issue.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'responsible',
                    foreignField: '_id',
                    as: 'responsibleDetails'
                }
            },
            { $unwind: '$responsibleDetails' }
        ]).exec((err, issue) => {
            if (err) {
                res.status(400).json('Failed to get the issue!');
            }
            else {
                res.status(200).json(issue);
            }
        })
    },

    add(req, res) {
        let issue = new Issue(req.body);
        issue.save()
            .then(issue => {
                res.status(200).json(issue);
            })
            .catch(err => {
                res.status(400).json('Failed to add the new record!');
            });
    },

    update(req, res) {
        let issue = new Issue(req.body);
        Issue.findByIdAndUpdate(req.params.id, req.body, (err, issue) => {
            if (err) {
                console.log(err);
                res.status(400).json('Failed to update the record!');
            }
            else {
                res.status(200).json(issue);
            }
        });
    },

    delete(req, res) {
        Issue.findByIdAndRemove(req.params.id, (err, issue) => {
            if (err) {
                console.log(err);
                res.status(400).json('Failed to delete the record!');
            }
            else {
                res.status(200).json('Succesfully deleted the record!');
            }
        });
    },
}

export default IssueController;