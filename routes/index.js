var express = require('express');
var _ = require("underscore");
var router = express.Router();
var contentResource = require('./videoText.json');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var resoureces = [
	{uri: '/', name: 'index', extra: {title: 'Express'}},
	{
		uri: '/modles', name: 'modle-screen', extra: {title: 'Express'}, sub: [
		{uri: '/vid1', name: 'modle', extra: {video: 'www.youtube.com', videosrc: 'https://www.youtube.com/embed/AMjMFbhyhwY', content: contentResource.vid1}},
		{uri: '/vid2', name: 'modle', extra: {video: 'www.youtube.com', videosrc: '', content: contentResource.vid2}},
		{uri: '/vid3', name: 'modle', extra: {video: 'www.youtube.com', videosrc: '', content: contentResource.vid3}},
		{uri: '/vid4', name: 'modle', extra: {video: 'www.youtube.com', videosrc: '', content: contentResource.vid4}},
		{uri: '/vid5', name: 'modle', extra: {video: 'www.youtube.com', videosrc: '', content: contentResource.vid5}}
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