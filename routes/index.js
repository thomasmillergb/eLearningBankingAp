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
	q1: [{type: 'radio', question: 'Money you borrow from a bank is a:', options: [{text: 'Deposit'}, {text: 'Loan'}, {text: 'Guarantee'}]},
		{type: 'radio', question: 'Money you store at the bank is:', options: [{text: 'Loan'}, {text: 'Interest'}, {text: 'Deposit'}]},
		{type: 'radio', question: 'What is a bank?', options: [{text: 'Financial Institution'}, {text: 'Charity'}, {text: 'Non-for-profit Organisation'}]}]
};

var resoureces = [
	{uri: '/', name: 'index', extra: {title: 'Express'}},
	{
		uri: '/modles', name: 'modle-screen', extra: {title: 'Express'}, sub: [
		{uri: '/vid1', name: 'modle', extra: {quiz: quiz.q1/*{q:quiz.q1}*/, video: 'www.youtube.com', videosrc: 'https://www.youtube.Wcom/embed/CqD3hnjZBTM', content: contentResource.vid1}},
		{uri: '/vid2', name: 'modle', extra: {video: 'www.youtube.com', videosrc: 'https://www.youtube.com/embed/smHxeRdf7oI', content: contentResource.vid2}},
		{uri: '/vid3', name: 'modle', extra: {video: 'www.youtube.com', videosrc: 'https://www.youtube.com/embed/ftDQOV6K158"', content: contentResource.vid3}},
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