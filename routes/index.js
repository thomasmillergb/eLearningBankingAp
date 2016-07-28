var express = require('express');
var _ = require("underscore");
var router = express.Router();
var contentResource = require('./videoText.json');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var quiz =
{
	q1: [{type: 'radio', question: 'Money you borrow from a bank is a:', options: [{text: 'Deposit'}, {text: 'Loan', value: true}, {text: 'Guarantee'}]},
		{type: 'radio', question: 'Money you store at the bank is:', options: [{text: 'Loan'}, {text: 'Interest'}, {text: 'Deposit', value: true}]},
		{type: 'radio', question: 'What is a bank?', options: [{text: 'Financial Institution', value: true}, {text: 'Charity'}, {text: 'Non-for-profit Organisation'}]}],
	q2: [{type: 'radio', question: 'Which bank account has an interest-free overdraft?', options: [{text: 'Savings account'}, {text: 'Student account', value: true}, {text: 'Current account'}]},
		{type: 'radio', question: 'Darren has won the lottery and has received £100,000,000. Which account do you think would be best for him to deposit his money?', options: [{text: 'Savings account', value: true}, {text: 'Student account', value: false}, {text: 'Current account'}]},
		{type: 'radio', question: 'Which account would be most for day-to-day costs for a non-student?', options: [{text: 'Savings account'}, {text: 'Student account', value: false}, {text: 'Current account', value: true}]}],
	q3: [{type: 'radio', question: 'Which of the below is not a type of savings account?', options: [{text: '	Fixed-Rate Bonds'}, {text: '	Money Market Account', value: true}, {text: 'Cash ISAs'}]},
		{type: 'radio', question: 'Which type of savings account offers the highest interest rate?', options: [{text: '	Fixed-Rate Bonds'}, {text: '	Money Market Account'}, {text: '', value: true}]}]
};

var resoureces = [
	{uri: '/', name: 'index', extra: {title: 'Express'}},
	{
		uri: '/modles', name: 'modle-screen', extra: {title: 'Express'}, sub: [
		{uri: '/vid1', name: 'modle', extra: {quiz: quiz.q1, video: 'www.youtube.com', videosrc: 'https://www.youtube.com/embed/CqD3hnjZBTM', content: contentResource.vid1}},
		{uri: '/vid2', name: 'modle', extra: {quiz: quiz.q2, video: 'www.youtube.com', videosrc: 'https://www.youtube.com/embed/smHxeRdf7oI', content: contentResource.vid2}},
		{uri: '/vid3', name: 'modle', extra: {quiz: quiz.q3, video: 'www.youtube.com', videosrc: 'https://www.youtube.com/embed/ftDQOV6K158"', content: contentResource.vid3}},
	]
	},
	{uri: '/page', name: 'page1', extra: {}}
];


_.forEach(resoureces, addRoute);

function addRoute(resource, i) {
	if (resource.sub !== undefined && resource.sub.length !== 0) {
		var subResouces = _.map(resource.sub, function (sub) {
			sub.uri = resource.uri + sub.uri;
			return sub;
		});
		if (i === 1) {
			resource.extra.vids = resource.sub;
		}
	}
	router.get(resource.uri, function (req, res, next) {
		res.render(resource.name, resource.extra);
	});
	if (resource.sub !== undefined && resource.sub.length !== 0) {
		_.forEach(subResouces, addRoute);
	}

}


module.exports = router;